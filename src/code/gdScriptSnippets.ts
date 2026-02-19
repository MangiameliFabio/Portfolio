export const coroutineSnippet = 
`while true:
    run_cool_logic()
    await get_tree().process_frame`;

export const behaviourSnippet = 
`func _ready():
    if multiplayer.is_server():
        _handle_behaviour()

func _handle_behaviour():
    while true:
        if target:
            await chase_target_routine()
        elif search_in_area:
            await search_area_routine()
        elif Sensor.check_for_recently_heared_noise():
            await handle_noise_routine()
        else:
            await idle_routine()

        await get_tree().process_frame`;

export const searchSnippet =
`func search_area_routine():
    Sensor.is_detecting = false

    var timer := get_tree().create_timer(search_time)

    while true:
        detect_player()

        if target:
            return

        if timer.time_left <= 0:
            Sensor.noise_heared = false
            search_in_area = false
            set_aggressive.rpc(false)
            return

        await get_tree().process_frame`;
