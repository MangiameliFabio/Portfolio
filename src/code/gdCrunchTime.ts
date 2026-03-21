export const crunchPlayerSnippet = `func _process(delta):
\tif $RayCast2D.enabled and $RayCast2D.get_collider() and ($RayCast2D.get_collider().owner is Sandman):
\t\t$RayCast2D.get_collider().owner.init_delete()
\t\t$AudioStreamPlayer.play()

\tif Input.get_action_strength("move_left"):
\t\t$Sprite_Idle.set_flip_h(true)
\t\t$Sprite_Run.set_flip_h(true)
\t\t$Sprite_Attack.set_flip_h(true)
\t\t$RayCast2D.scale.x = -1

\tif Input.get_action_strength("move_right"):
\t\t$Sprite_Idle.set_flip_h(false)
\t\t$Sprite_Run.set_flip_h(false)
\t\t$Sprite_Attack.set_flip_h(false)
\t\t$RayCast2D.scale.x = 1

\tif WorldManager.cola_crate_ammount <= 0 and WorldManager.coffee_can_ammount <= 0:
\t\tchange_texture_normal()

func change_texture_coffee_pot():
\t$Sprite_Idle.set_texture(CoffeePotTextureIdle)
\t$Sprite_Run.set_texture(CoffeePotTextureRun)
\t$Sprite_Attack.set_texture(CoffeePotTextureAttack)

func change_texture_crate():
\t$Sprite_Idle.set_texture(CrateTextureIdle)
\t$Sprite_Run.set_texture(CrateTextureRun)
\t$Sprite_Attack.set_texture(CrateTextureAttack)`;

export const crunchElevatorSnippet = `func _process(delta):
\tif Input.is_action_pressed("ui_up") and enable_input and !(current_floor >= floors):
\t\tmove_up()
\t\tcollision_left.disabled = false
\t\tcollision_right.disabled = false
\t\tenable_input = false

\tif Input.is_action_pressed("ui_down") and enable_input and current_floor > 1:
\t\tmove_down()
\t\tcollision_left.disabled = false
\t\tcollision_right.disabled = false
\t\tenable_input = false

func move_up():
\tget_tree().get_root().set_disable_input(true)
\tvar duration = distance.length() / speed
\ttween.interpolate_property(
\t\tplatform,
\t\t"position",
\t\tcurrent_position,
\t\tdistance * current_floor,
\t\tduration,
\t\tTween.TRANS_LINEAR,
\t\tTween.EASE_IN_OUT)
\ttween.start()
\tcurrent_position = distance * current_floor
\tcurrent_floor += 1

func _on_Tween_tween_all_completed():
\tenable_input = true
\tget_tree().get_root().set_disable_input(false)
\tcollision_left.disabled = true
\tcollision_right.disabled = true`;

export const crunchStateMachineGeneratorSnippet = `tool
extends EditorPlugin

func _enter_tree():
\tdock = preload("res://addons/state_machine_generator/state_machine_generator_dock.tscn").instance()
\tstate_machine_button = dock.get_node("AddStateMachineButton")
\tstate_button = dock.get_node("HBoxContainer/AddStateButton")
\tstate_line = dock.get_node("HBoxContainer/StateLine")

\tstate_machine_button.connect("pressed", self, "add_state_machine")
\tstate_button.connect("pressed", self, "add_state")
\tstate_line.connect("text_changed", self, "change_state_name")
\tadd_control_to_dock(DOCK_SLOT_RIGHT_UL, dock)

func add_state_machine():
\tcreate_directory()
\tvar state_machine_node = Node.new()
\tstate_machine_node.name = root_object.name + "StateMachine"
\tcreate_state_machine()
\tcreate_base_state()
\tstate_machine_node.set_script(
\t\tload("res://StateMachines/" + root_object.name + "/" + root_object.name + "_State_Machine" + ".gd"))
\troot_object.add_child(state_machine_node)
\tstate_machine_node.set_owner(root_object)

func add_state():
\tvar state_node = Node.new()
\tstate_node.name = state_name
\tcreate_state()
\tstate_node.set_script(
\t\tload("res://StateMachines/" + root_object.name + "/States/" + root_object.name + "_" + state_name + ".gd"))
\troot_object.get_node(root_object.name + "StateMachine").add_child(state_node)
\tstate_node.set_owner(root_object)`;
