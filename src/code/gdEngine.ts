export const turboChargerSnippet = `extends CompositeNodeModule

@export var RPMFactorCurve : Curve

var _owning_engine : CompositeNode

var _boost_charge : float = 0.0
var _max_boost_charge : float = 0.0
var _max_rpm : float = 0.0
var _next_update_time : float = 0.0
var _displayed_value_range : Vector2 = Vector2(0, 0.5)

func _ready_composite_node() -> void:
	register_data_updated_callback(&"BoostCharge", _update_boost_charge)
	register_data_updated_callback(&"OwnerID", _update_owning_engine_id)

func _process(_delta: float) -> void:
	if not _composite_node.IsAuthority(): return

	if GameTime.GameTime > _next_update_time:
		_next_update_time = GameTime.GameTime + 0.2

		if not _owning_engine: return

		if not _owning_engine.HasData(&"EngineRPM"):
			return
		var current_rpm : float = _owning_engine.GetData(&"EngineRPM")
		
		var boost_charge = _boost_charge * RPMFactorCurve.sample(inverse_lerp(0.0, _max_rpm, current_rpm))
		_owning_engine.SetData(&"BoostCharge", boost_charge)
		
		if is_zero_approx(_max_boost_charge):
			_max_boost_charge = _composite_node.GetData(&"MaxBoostCharge")
		
		var displayed_boost_charge = remap(boost_charge, 0, _max_boost_charge, _displayed_value_range.x, _displayed_value_range.y)
		_owning_engine.SetData(&"DisplayedBoostCharge", displayed_boost_charge)

func _update_owning_engine_id(id: int):
	if id == CompositeNode.INVALID_ID:
		if _owning_engine:
			_owning_engine.SetData(&"DisplayedBoostCharge", 0)
			_owning_engine = null
		return

	var slot : CompositeNode = CompositeNode.GetCompositeNodeByID(id)
	if not slot:
		return
	if not slot.ParentCompositeNode:
		return
	_owning_engine = slot.get_node(slot.ParentCompositeNode)

	if not _owning_engine:
		printerr("Parent path is invalid in %s" % name)
		return

	if _owning_engine.HasData(&"MaxRPM"):
		_max_rpm = _owning_engine.GetData(&"MaxRPM")

func _update_boost_charge(value: float):
	_boost_charge = value
`;

export const turboBoost = `if _engine_running.value:
		var new_max_rpm = MaxRPM * ((_boost_charge.value + _injection_flow_rate.value) / 2)
		if _vehicle_speed.value > ClutchEmulationSpeed:
			_targetRPM = lerpf(IdleRPM, new_max_rpm, _vehicle_speed.value / 40.0)
		else:
			_targetRPM = lerpf(IdleRPM, new_max_rpm, minf(1.0, absf(_throttle.value) + absf(_steering.value)))`

export const durabilityModule = `extends CompositeNodeModule

@export var WearFactor : float = 1
@export var WearFactorRandomVariation : float = 0.1
@export var DurabilityUpdateInterval : float = 0.25

@export var WornThreshold : float = 0.75
@export var DamagedThreshold : float = 0.35
@export var BrokenThreshold : float = 0
@export var TemperatureDamageCurve : Curve

var _attached_parent : CompositeNode = null
var _durability_timer : GameTime.IntervalTickTimer
var _durability : CompositeNodeValue

const ENGINE_RPM_FACTOR : float = 0.000001


func _ready_composite_node() -> void:
	_durability = create_non_synchronized_value(&"Durability")
	register_data_updated_callback(&"OwnerID", _set_attached_parent_id)
	if _composite_node.IsServer():
		_durability_timer = GameTime.get_interval_timer(DurabilityUpdateInterval)
		_durability_timer.tick.connect(_decrease_durability)


func _decrease_durability() -> void:
	if not _attached_parent:
		return
	if _durability.value and _durability.value > 0:
		var current_rpm = _attached_parent.GetData(&"EngineRPM")
		if current_rpm == null:
			return
	
		var engine_temperature = _attached_parent.GetData(&"EngineTemperature")
		if engine_temperature == null:
			return

		if not TemperatureDamageCurve:
			return
		var temperature_factor = TemperatureDamageCurve.sample(engine_temperature)
		var wear_factor := WearFactor
		if WearFactorRandomVariation != 0:
			wear_factor += randf_range(-WearFactorRandomVariation, WearFactorRandomVariation)
		_composite_node.CallFunctionOnAuthority(
			&"ChangeDurability",
			[-DurabilityUpdateInterval * current_rpm * ENGINE_RPM_FACTOR * wear_factor * (1 + temperature_factor)])


func _set_attached_parent_id(composite_id: int):
	if composite_id == CompositeNode.INVALID_ID:
		_attached_parent = null
		return
	var parent = CompositeNode.GetCompositeNodeByID(composite_id)
	
	_attached_parent = parent
`

export const enginePartModule = `
extends CompositeNodeModule

@export var InfluencedValue : StringName
@export var InfluencedValueMax : float = 1
@export var InfluencedValueDetached : float = 0

@export var RepairFactorWorn : float = 0.9
@export var RepairFactorDamaged : float = 0.5
@export var RepairFactorBroken : float = 0

var _attached_parent : CompositeNode
var _influenced_value : CompositeNodeValue
var _influenced_value_max : CompositeNodeValue

var _repair_status : E.RepairStatus

func _ready_composite_node() -> void:
	register_data_updated_callback(&"OwnerID", _on_owner_id_changed)
	register_data_updated_callback(&"RepairStatus", _set_repair_status)
	
	_influenced_value = create_non_synchronized_value(InfluencedValue, InfluencedValueDetached)
	_influenced_value_max = create_non_synchronized_value("Max" + InfluencedValue, InfluencedValueMax)

func _on_owner_id_changed(owner_id: int):
	#Engine part got detached
	if owner_id == CompositeNode.INVALID_ID:
		if not _attached_parent: return
		if _attached_parent.HasData(InfluencedValue):
			_attached_parent.SetData(InfluencedValue, InfluencedValueDetached)
		return

	#Engine part got attached
	_attached_parent = CompositeNode.GetCompositeNodeByID(owner_id)
	if not _attached_parent: return

	# we have to set the data, even when the value doesn't exist (yet)
	var repair_status_factor = _get_repair_status_factor()
	_influenced_value.value = repair_status_factor #Safe value also in engine parts composite node so you can directly access it in other modules (e.g. AlternatorModule.gd)
	_attached_parent.SetData(InfluencedValue, repair_status_factor)
	

func _set_repair_status(new_status: E.RepairStatus):
	_repair_status = new_status
	if _attached_parent:
		var repair_status_factor = _get_repair_status_factor()
		_influenced_value.value = repair_status_factor #Save value also in engine parts composite node so you can directly access it in other modules (e.g. AlternatorModule.gd)
		_attached_parent.SetData(InfluencedValue, repair_status_factor)


func _get_repair_status_factor() -> float:
	match _repair_status:
		E.RepairStatus.Good:
			return InfluencedValueMax
		E.RepairStatus.Worn:
			return InfluencedValueMax * RepairFactorWorn
		E.RepairStatus.Damaged:
			return InfluencedValueMax * RepairFactorDamaged
		E.RepairStatus.Broken:
			return InfluencedValueMax * RepairFactorBroken
	return 0

`

export const tankModule = `extends CompositeNodeModule

@export var TankName : String = "Fuel Tank"
@export var CanBeRefueld : bool = true
@export var MaxFuel : float = 500.0
@export var InitialFuel : float = 500.0

var _fuel_level : CompositeNodeValue
var _can_be_refueld : CompositeNodeValue

func _ready_composite_node() -> void:
	_composite_node.SetData(&"ObjectName", TankName)
	_fuel_level = create_synchronized_value(&"FuelLevel", maxf(minf(InitialFuel, MaxFuel), 0.0), CompositeNode.OnChange, CompositeNode.HalfFloat)
	_can_be_refueld = create_non_synchronized_value(&"CanBeRefueld", CanBeRefueld)
	register_function(&"CheckIfEmpty", CheckIfEmpty)
	register_function(&"CheckIfFull", CheckIfFull)
	register_function(&"DecreaseFuelLevel", DecreaseFuelLevel)
	register_function(&"IncreaseFuelLevel", IncreaseFuelLevel)
	register_function(&"GetUsedFuelAmount", GetUsedFuelAmount)

func CheckIfEmpty():
	return _fuel_level.value <= 0.0

func CheckIfFull():
	return _fuel_level.value >= MaxFuel

func DecreaseFuelLevel(decrease_by : float):
	_fuel_level.value = maxf(_fuel_level.value - decrease_by, 0)
	
func IncreaseFuelLevel(increase_by : float):
	_fuel_level.value = minf(_fuel_level.value + increase_by, MaxFuel)

func GetUsedFuelAmount():
	return MaxFuel - _fuel_level.value`

export const fuelTransferModule = `extends CompositeNodeModule

@export var FuelingRate : float = 1.0

var _currently_interacting_composite : CompositeNode
var _finish_fueling_at_gametime : float = 0.0
var _total_refueling_time : float = 0.0
var _last_game_time : float = 0.0
var _current_action_type : E.PlayerActionType = E.PlayerActionType.None

var _other_tank_node : CompositeNode

func _ready_composite_node() -> void:
	register_function(&"StartInteraction", StartInteraction)
	register_function(&"UpdateInteraction", UpdateInteraction)
	register_function(&"EndInteraction", EndInteraction)
	register_function(&"CanUsePrimaryInteraction", CanUsePrimaryInteraction)
	register_function(&"CanUseSecondaryInteraction", CanUseSecondaryInteraction)
	register_function(&"GetPrimaryActionText", GetPrimaryActionText)
	register_function(&"GetSecondaryActionText", GetSecondaryActionText)

func CheckIfFuelCanBeTransfered(other_tank_node: CompositeNode, action_type: E.PlayerActionType) -> bool:
	match action_type:
		E.PlayerActionType.PrimaryInHandAction:
			if other_tank_node.CallFunction(&"CheckIfFull", []) \
				 || _composite_node.CallFunction(&"CheckIfEmpty", []):
				return false
		E.PlayerActionType.SecondaryInHandAction:
			if _composite_node.CallFunction(&"CheckIfFull", []) \
				 || other_tank_node.CallFunction(&"CheckIfEmpty", []):
				return false
	return true

func CanUsePrimaryInteraction(interacted_with_composite_node : CompositeNode) -> bool:
	if _can_be_refueld(interacted_with_composite_node):
		_other_tank_node = interacted_with_composite_node
		return true
	return false

func CanUseSecondaryInteraction(interacted_with_composite_node : CompositeNode) -> bool:
	return _can_be_refueld(interacted_with_composite_node)

func GetPrimaryActionText() -> Variant:
	if _other_tank_node:
		var tank_name : String
		if _other_tank_node.HasFunction(&"GetItemName"):
			tank_name = _other_tank_node.CallFunction(&"GetItemName", [])
		if not name: return
		return "refill %s" % tank_name.to_lower()
	return null

func GetSecondaryActionText() -> Variant:
	if _other_tank_node:
		var tank_name : String
		if _other_tank_node.HasFunction(&"GetItemName"):
			tank_name = _other_tank_node.CallFunction(&"GetItemName", [])
		if not name: return
		return "pump fuel from %s" % tank_name.to_lower()
	return null

func StartInteraction(_ray_start:Vector3, _ray_end:Vector3, other_tank_node:CompositeNode, action_type: E.PlayerActionType):
		var missing_fuel : float = 0.0
		var remaining_fuel : float = 0.0
		
		if not CheckIfFuelCanBeTransfered(other_tank_node , action_type):
			return
		_currently_interacting_composite = other_tank_node
		_current_action_type = action_type

		match action_type:
			E.PlayerActionType.PrimaryInHandAction:
				missing_fuel = other_tank_node.CallFunction(&"GetUsedFuelAmount", [])
				remaining_fuel = _composite_node.GetData(&"FuelLevel")
			E.PlayerActionType.SecondaryInHandAction:
				missing_fuel = _composite_node.CallFunction(&"GetUsedFuelAmount", [])
				remaining_fuel = other_tank_node.GetData(&"FuelLevel")
		
		var fuel_delta = missing_fuel if (missing_fuel < remaining_fuel) else remaining_fuel
		
		_total_refueling_time = fuel_delta / FuelingRate
		_finish_fueling_at_gametime = GameTime.GameTime + _total_refueling_time
		
		_last_game_time = GameTime.GameTime

func UpdateInteraction(_ray_start:Vector3, _ray_end:Vector3, _world_relative_mov:Vector3) -> bool:
	if is_instance_valid(_currently_interacting_composite):
		if not CheckIfFuelCanBeTransfered(_currently_interacting_composite, _current_action_type):
			return false
		
		var time_delta = GameTime.GameTime - _last_game_time
		var fueling_amount = FuelingRate * time_delta
		
		match _current_action_type:
			E.PlayerActionType.PrimaryInHandAction:
				_currently_interacting_composite.CallFunctionOnAuthority(&"IncreaseFuelLevel", [fueling_amount])
				_composite_node.CallFunctionOnAuthority(&"DecreaseFuelLevel", [fueling_amount])
			E.PlayerActionType.SecondaryInHandAction:
				_composite_node.CallFunctionOnAuthority(&"IncreaseFuelLevel", [fueling_amount])
				_currently_interacting_composite.CallFunctionOnAuthority(&"DecreaseFuelLevel", [fueling_amount])
				
		UI.HUD_set_progress_indicator((_finish_fueling_at_gametime - GameTime.GameTime) / _total_refueling_time)
		_last_game_time = GameTime.GameTime
		return true
	return false

func EndInteraction() -> void:
	UI.HUD_set_progress_indicator(0)
	_currently_interacting_composite = null
	_current_action_type = E.PlayerActionType.None
	_other_tank_node = null

func _can_be_refueld(other_node : CompositeNode) -> bool:
	if is_instance_valid(other_node):
		var can_be_refueld = other_node.GetData(&"CanBeRefueld")
		if not can_be_refueld:
			return false
		return true
	return false
`
