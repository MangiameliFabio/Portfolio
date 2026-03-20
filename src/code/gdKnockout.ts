export const incapacitatedLogic = `extends CompositeNodeModule

var _represented_player_id : CompositeNodeValue
var _needed_slot_type : CompositeNodeValue
var _current_owner : CompositeNode

@export var PrimaryInteractionText : String = "loot"
@export var IncapacitatedMesh : MeshInstance3D


func _ready_composite_node() -> void:
	_needed_slot_type = create_non_synchronized_value(&"AttachmentType", &"BedSlot")
	_represented_player_id = create_synchronized_value(&"RepresentedPlayerID", CompositeNode.INVALID_ID, CompositeNode.OnChange, CompositeNode.U32)
	
	register_data_updated_callback(&"OwnerID", on_owner_changed)
	register_data_updated_callback(&"RepresentedPlayerID", on_represented_character_changed)
	
	register_function(&"FreeIncapacitatedCharacter", FreeIncapacitatedCharacter)
	register_function(&"CanUsePrimaryAction", CanUsePrimaryAction)
	register_function(&"StartInteraction", StartInteraction)
	_composite_node.SetData(&"PrimaryVerb", PrimaryInteractionText)


func FreeIncapacitatedCharacter() -> bool:
	if _composite_node.IsAuthority():
		_composite_node.CallFunction(&"RemoveFromOwner", [])

	if _composite_node.IsServer():
		SpawnManager.destroy_spawned(_composite_node)
		return true
	printerr("[IncapacitatedLogic.gd] FreeIncapacitatedCharacter should only be called if we are the server and authority")
	return false


func random_upward_force():
	var throwing_force = Vector3.UP.rotated(Vector3.RIGHT, deg_to_rad(randf_range(-30, 30)))
	throwing_force = throwing_force.rotated(Vector3.FORWARD, deg_to_rad(randf_range(-30, 30)))
	throwing_force *= 2
	return throwing_force


func on_owner_changed(owner_id: int) -> void:
	if not _composite_node.IsAuthority():
		return
	#if _current_owner:
		#_current_owner.UnregisterDataUpdatedCallback(&"EnvironmentsSwapped", on_environment_swapped)
	
	if owner_id == CompositeNode.INVALID_ID:
		_current_owner = null
		return


func on_represented_character_changed(character_id: int) -> void:
	if character_id == CompositeNode.INVALID_ID:
		return
	var character = CompositeNode.GetCompositeNodeByID(character_id)
	var character_mesh : MeshInstance3D = character.CallFunction(&"GetCharacterMesh", [])
	
	if not character_mesh:
		printerr("[IncapacitatedLogic.gd] Was not able to get character mesh")
		return
	
	if not IncapacitatedMesh:
		printerr("[IncapacitatedLogic.gd] IncapacitawtedMesh is not defined")
		return

	IncapacitatedMesh.mesh = character_mesh.mesh.duplicate()
`

export const knockout = `extends CompositeNodeModule

@export var CollisionShapes : Array[CollisionShape3D]

var _unconscious : CompositeNodeValue
var _incapacitated_body_id : CompositeNodeValue

func _ready_composite_node() -> void:
	_unconscious = create_synchronized_value(&"Unconscious", false, CompositeNode.OnChange, CompositeNode.U8)
	_incapacitated_body_id = create_synchronized_value(&"IncapacitatedBodyID", CompositeNode.INVALID_ID, CompositeNode.OnChange, CompositeNode.U32)

	register_data_updated_callback(&"Unconscious", on_unconscious_changed)
	register_function(&"RespawnAtPosition", RespawnAtPosition)
	register_function(&"KnockOutCharacter", KnockOutCharacter)

func KnockOutCharacter():
	if _unconscious.value: return #Character is already unconscious
	_unconscious.value = true


func RespawnAtPosition(transform: Transform3D, forward_dir: Vector3) -> bool:
	var incapacicated_character : CompositeNode = CompositeNode.GetCompositeNodeByID(_incapacitated_body_id.value)
	if is_instance_valid(incapacicated_character):
		var answer = incapacicated_character.CallFunctionOnAuthority(&"FreeIncapacitatedCharacter", [])
		if not answer.has_value(): await answer.ValueWasSet

	_unconscious.value = false
	return _composite_node.CallFunction(&"TeleportTo", [transform, forward_dir])


func on_unconscious_changed(unconscious: bool):
	if unconscious:
		for shape in CollisionShapes:
			shape.disabled = true
		
		if _composite_node.IsAuthority():
			#Check if our character is currently occupying an object
			var occupying_composite_id : Variant = _composite_node.GetData(&"OccupyingCompositeID")
			if occupying_composite_id != null and occupying_composite_id != CompositeNode.INVALID_ID:
				var occupying_node : CompositeNode = CompositeNode.GetCompositeNodeByID(occupying_composite_id)
				if occupying_node != null:
					occupying_node.CallFunction(&"Vacate", [])
			
			_composite_node.SetData(&"PlayerInteractionMode", E.PlayerInteractionMode.Incapacitated)
			_composite_node.CallFunction(&"HolsterInHandObject", [])
		
		if _composite_node.IsServer():
			var pos : Vector3 = _composite_node.CallFunction(&"GetFocusPoint", [])
			var rot : Vector3 = _composite_node.GetData(&"VisibleThingsRotation")
			var incapacicated_character : CompositeNode = SpawnManager.spawn(&"IncapacitatedCharacter", pos, rot, _composite_node.GetServerID())
			if not incapacicated_character:
				printerr("Could not spawn incapacicated character")
				return
			
			incapacicated_character.SetData(&"RepresentedPlayerID", _composite_node.CompositeID)
			_composite_node.SetDataOnAuthority(&"IncapacitatedBodyID", incapacicated_character.CompositeID)
	else:
		if _composite_node.IsAuthority():
			_composite_node.SetData(&"PlayerInteractionMode", E.PlayerInteractionMode.FirstPerson)
		for shape in CollisionShapes:
			shape.disabled = false
`

export const knockoutMover = `extends CompositeNodeModuleArea3D

@export var KnockOutVelocity : float = 5

func _ready_composite_node() -> void:
	body_entered.connect(on_body_entered)

func on_body_entered(body: Node3D):
	if not _composite_node.IsAuthority():
		return
	
	var body_composite_node := CompositeNode.GetCompositeNodeInParents(body)
	if not body_composite_node: return
	
	var current_mover_velocity : Vector3 = _composite_node.CallFunction(&"GetPointVelocity", [body.global_position])
	if not current_mover_velocity:
		return
		
	if current_mover_velocity.length_squared() > KnockOutVelocity * KnockOutVelocity:
		body_composite_node.CallFunctionOnAuthority(&"KnockOutCharacter", [])
	
`