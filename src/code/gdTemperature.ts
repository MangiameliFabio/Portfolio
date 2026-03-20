export const temperatureSource = `extends Node
class_name TemperatureSource

@export var CurrentRoom : Room
@export var ExchangeSpeed : float = 1.0:
	set(value): _current_exchange_speed = value
@export var StartTemperature : float = 0

var _room_temp_node : Node
var _current_temperature : float = 0.0

@onready var _current_exchange_speed : float = ExchangeSpeed

func _ready() -> void:
	await get_tree().process_frame
	_room_temp_node = CurrentRoom.get_meta(&"RoomTemperature")
	
	if _room_temp_node:
		_room_temp_node.temperature_sources.push_back(self)

func set_current_temperature(new_temp : float):
	_current_temperature = new_temp

func get_current_temperature() -> float:
	return _current_temperature

func get_exchange_speed() -> float:
	return _current_exchange_speed
`

export const roomTemperature = `extends Node

@export var RoomName : String = ""
@export var VolumeCoefficient : float = 1
@export var IsOutsideRoom : bool

var temperature_sources : Array[TemperatureSource]

var _room_temperatue : float = 20
var _check_timer : float = 0.0
var _check_wait_time : float = 0.2
var _time_last_check : float = 0.0
var _composite_node : CompositeNode

func _ready() -> void:
	_composite_node = CompositeNode.GetCompositeNodeInParents(self)
	_composite_node.RegisterCallback("init_authority", init_authority)

	_composite_node.SetupDataMultiplayerSynchronization("%s_Temperature" % RoomName,
		CompositeNode.DataSynchronizationMode.LowFrequency,
		CompositeNode.DataSynchronizationType.S16)

	var parent_node : Node = get_parent()
	parent_node.set_meta(&"RoomTemperature", self)

	_time_last_check = GameTime.GameTime

func init_authority(_player_id:int) -> void:
	if _composite_node.IsAuthority():
		_composite_node.SetData("%s_Temperature" % RoomName, _room_temperatue)
	else:
		_composite_node.RegisterDataUpdatedCallback("%s_Temperature" % RoomName, on_temperature_update)

func _exit_tree() -> void:
	if not _composite_node.IsAuthority():
		_composite_node.UnregisterDataUpdatedCallback("%s_Temperature" % RoomName, on_temperature_update)

func _process(delta: float) -> void:
	if not _composite_node.IsAuthority():
		return

	if _check_timer <= _check_wait_time:
		_check_timer += delta
		return
	_check_timer = 0.0

	var check_delta_time = GameTime.GameTime - _time_last_check

	var sum = 0
	for source in temperature_sources:
		var temperature = source.get_current_temperature()
		var temp_diff = temperature - _room_temperatue
		var temp_change = check_delta_time * source.get_exchange_speed() * temp_diff
		if absf(temp_change) > absf(temp_diff):
			temp_change = temp_diff
		sum += temp_change / VolumeCoefficient
	_room_temperatue += sum
	_composite_node.SetData("%s_Temperature" % RoomName, _room_temperatue)

	_time_last_check = GameTime.GameTime

func on_temperature_update(newTemperature: float):
	if _composite_node.IsAuthority():
		return
	_room_temperatue = newTemperature

func get_room_temperature():
	if _composite_node.IsAuthority():
		return _room_temperatue as int
	return _room_temperatue

`
export const characterTemperature = `extends CompositeNodeModule

@export var FreezingScaleStart : float = 1.0
@export var FreezingScaleEnd : float = 0
@export var CoolingDownSpeedFactor : float = 5
@export var WarmingUpSpeedFactor : float = 15
##Temperature required for the player to start warming up again in °C.
@export var TemperatureThreshold : float = 10.0
@export var MovmentReductionCurve : Curve
@export var CanFreeze : bool = true

var _unconscious : bool = false

var _freeze_speed_reduction : CompositeNodeValue
var _freezing_state : CompositeNodeValue

func _ready_composite_node() -> void:
	_freeze_speed_reduction = create_synchronized_value(&"FreezeSpeedReduction", 1.0, CompositeNode.OnChange, CompositeNode.HalfFloat)
	_freezing_state = create_non_synchronized_value(&"FreezingState", 1.0)
	register_data_updated_callback(&"Unconscious", on_unconscious_changed)

func _process(delta: float) -> void:
	if not _composite_node.IsAuthority(): return
	if not CanFreeze: return

	var current_room := PlayerRoomProvider.LocalPlayerRoom

	if not current_room.has_meta(&"RoomTemperature"):
		printerr("Room has no temperature in CharacterTemperatureModel")
		return

	var room_temperature = current_room.get_meta(&"RoomTemperature").get_room_temperature()
	var offset_temperature = room_temperature - TemperatureThreshold
	
	var curr_freezing_state = _freezing_state.value
	if not curr_freezing_state:
		return

	#Check if player is getting warmer or colder and adjust speed factor
	if offset_temperature >= 0.0:
		curr_freezing_state += offset_temperature * 0.0001 * WarmingUpSpeedFactor * delta
	else:
		curr_freezing_state += offset_temperature * 0.0001 * CoolingDownSpeedFactor * delta

	curr_freezing_state = clamp(curr_freezing_state, FreezingScaleEnd, FreezingScaleStart)

	if not _unconscious and curr_freezing_state <= FreezingScaleEnd:
		_unconscious = true
		_composite_node.SetData(&"Unconscious", _unconscious)
		_composite_node.CallFunction(&"KnockOutCharacter", [])

	var speed_reduction = MovmentReductionCurve.sample(1 - curr_freezing_state)
	_freezing_state.value = curr_freezing_state
	_freeze_speed_reduction.value = speed_reduction

func on_unconscious_changed(unconscious: bool):
	if not unconscious:
		_freeze_speed_reduction.value = MovmentReductionCurve.sample(0)
		_freezing_state.value = FreezingScaleStart
		_unconscious = false

`

export const connectionTemperature = `extends TemperatureSource

@export var ConnectedRoom : Room
@export var ConnectedToOutside : bool

## A value of 1 means the connection is fully permeable when closed and therfore dosen't change exchange speed. 
## A value of 0.1 will reduce the exchange speed by 90%
@export var ClosedPermeability : float = 1.0

var _composite_node : CompositeNode
var _room_connection : RoomConnection 

func _ready() -> void:
	await super._ready()
	
	_room_connection = get_parent()
	if not _room_connection:
		printerr("Connection Temperature Source needs to be child pf a room connection! %s" % get_path())
		return

	_composite_node = CompositeNode.GetCompositeNodeInParents(self)
	
	if ConnectedToOutside:
		ConnectedRoom = Room.OutsideRoom
	_composite_node.RegisterDataUpdatedCallback(_room_connection.ClosedByDataValue, on_door_value_changed, true)

func _exit_tree() -> void:
	if not is_instance_valid(_room_connection):
		return
	_composite_node.UnregisterDataUpdatedCallback(_room_connection.ClosedByDataValue, on_door_value_changed)

func get_current_temperature():
	if not is_instance_valid(ConnectedRoom):
		printerr("[%s] ConnectionTemperatureSource needs to be connected to a room" % get_parent().name)
		return
	
	if not ConnectedRoom.has_meta(&"RoomTemperature"):
		printerr("ConnectionTemperatureSource needs to be connected to a room with temperature")
		return
	var room_temp = ConnectedRoom.get_meta(&"RoomTemperature").get_room_temperature()
	
	return room_temp

func on_door_value_changed(value : float):
	if value <= 0.0:
		_current_exchange_speed = ExchangeSpeed
	else:
		_current_exchange_speed = ExchangeSpeed * ClosedPermeability
`