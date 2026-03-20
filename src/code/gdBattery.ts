export const batteryModule = `extends CompositeNodeModule

@export var MaxBatteryLevel : float = 1000
@export var MaxVoltage : float = 12
@export var MaxAmpereConsumption : float = 100

@export var VoltageDropCurve : Curve
@export var AmpereDropCurve : Curve

var _battery_level : CompositeNodeValue
var _battery_max_voltage : CompositeNodeValue
var _battery_voltage : CompositeNodeValue
var _ampere_consumption : CompositeNodeValue
var _battery_charging_rate : CompositeNodeValue
var _ampere_net_current : CompositeNodeValue

var _battery_voltage_internal : float

func _ready_composite_node() -> void:
	_battery_voltage = create_synchronized_value(
		&"BatteryVoltage", MaxVoltage,
		CompositeNode.DataSynchronizationMode.OnChange,
		CompositeNode.DataSynchronizationType.HalfFloat)
	_battery_voltage_internal = MaxVoltage

	_ampere_consumption = create_non_synchronized_value(&"AmpereConsumption", 0)
	_battery_max_voltage = create_non_synchronized_value(&"BatteryMaxVoltage", MaxVoltage)
	_battery_charging_rate = create_non_synchronized_value(&"BatteryChargingRate", 0)
	
	_battery_level = create_synchronized_value(&"BatteryLevel",MaxBatteryLevel, CompositeNode.OnChange, CompositeNode.HalfFloat)
	_ampere_net_current = create_synchronized_value(&"DisplayAmpereNetCurrent", 0, CompositeNode.LowFrequency, CompositeNode.HalfFloat)


func _process(delta: float) -> void:
	if not _composite_node.IsAuthority(): return

	var consumption = _ampere_consumption.value
	var battery_level = _battery_level.value
	var charging_rate = _battery_charging_rate.value

	if battery_level >= 0 and consumption > 0:
		battery_level -= consumption * delta
		battery_level = clamp(battery_level, 0, MaxBatteryLevel)

	if battery_level < MaxBatteryLevel and charging_rate > 0:
		battery_level += charging_rate * delta
		battery_level = clamp(battery_level, 0, MaxBatteryLevel)

	_battery_level.value = battery_level
	_battery_voltage_internal =  MaxVoltage \
			* VoltageDropCurve.sample(remap(battery_level, 0, MaxBatteryLevel, 0, 1)) \
			* AmpereDropCurve.sample(remap(consumption, 0, MaxAmpereConsumption, 0, 1))
	# we only want to update the actual BatteryVoltage DataValue when it has
	# changed enough. otherwise there will be oscilations and it will change all the time
	if _battery_voltage_internal <= 0.1:
		_battery_voltage_internal = 0.0
	if absf(_battery_voltage_internal - _battery_voltage.value) > 0.1:
		_battery_voltage.value = _battery_voltage_internal

	_ampere_net_current.value = _battery_charging_rate.value - _ampere_consumption.value
`