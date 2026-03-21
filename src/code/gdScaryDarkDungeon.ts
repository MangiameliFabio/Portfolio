export const scaryEnemySnippet = `func _ready():
\thitbox.connect("body_entered", hitbox_body_entered)
\tplayer_detection.connect("body_entered", player_detection_area_body_entered)
\tplayer_detection.connect("body_exited", player_detection_area_body_exited)
\tdamage_detection.connect("body_entered", damage_detection_area_body_entered)
\tdamage_detection.connect("body_exited", damage_detection_area_body_exited)

func follow_player(delta):
\tface_direction.look_at(follow_target.global_transform.origin, Vector3.UP)
\trotate_y(deg_to_rad(face_direction.rotation.y * TURN_SPEED))
\tnavigation_agent.set_target_position(follow_target.global_transform.origin)
\tvelocity = (
\t\tnavigation_agent.get_next_path_position() - transform.origin
\t).normalized() * SPEED * delta
\tmove_and_slide()

func take_damage(amount: int):
\tsound_effects.start_sound("GOT_HIT", true, 0.8, 1.2)
\thealth_points -= amount
\thit.emit()
\tstate_machine.transition_to("Hit")

func die():
\tis_active = false
\tin_combat = false
\tis_dead = true
\tset_process(false)
\tset_physics_process(false)
\ton_died.emit()
\tstate_machine.transition_to("Inactive")`;

export const scaryDialogueAudioSnippet = `func _on_dialogue_box_who_is_talking(var_name):
\tmatch (var_name):
\t\tplayer.name:
\t\t\tset_stream(load(
\t\t\t\t"res://audio/player_dialog/animalese (" +
\t\t\t\tstr(current_player_dialog) +
\t\t\t\t").wav"))
\t\t\tplay()
\t\t\tif(current_player_dialog < max_dialog_player):
\t\t\t\tcurrent_player_dialog += 1
\t\t\telse:
\t\t\t\tcurrent_player_dialog = 0
\t\tfairy.name:
\t\t\tset_stream(load(
\t\t\t\t"res://audio/fairy_dialog/animalese (" +
\t\t\t\tstr(current_fairy_dialog) +
\t\t\t\t").wav"))
\t\t\tplay()
\t\t\tif(current_fairy_dialog < max_dialog_fairy):
\t\t\t\tcurrent_fairy_dialog += 1
\t\t\telse:
\t\t\t\tcurrent_fairy_dialog = 0

func _on_dialogue_box_dialogue_skiped():
\tstop()`;

export const scaryDoorSignalSnippet = `func open_door():
\ttween_left = get_tree().create_tween()
\ttween_right = get_tree().create_tween()

\ttween_left.tween_property(
\t\t%LeftDoor,
\t\t"rotation_degrees",
\t\tVector3(0, open_rotation, 0),
\t\tduration)
\ttween_right.tween_property(
\t\t%RightDoor,
\t\t"rotation_degrees",
\t\tVector3(0, -open_rotation, 0),
\t\tduration)

func _on_dialogue_box_dialogue_signal(value):
\tmatch(value):
\t\t"big_door":
\t\t\topen_door()
\t\t\t$AudioStreamPlayer3D.play()`;
