export const physicsIntegrateion = `void JoltBody3D::simple_physics_step(const float p_step) {
	_integrate_forces(p_step, *jolt_body);

	JPH::MotionProperties *mp = jolt_body->GetMotionProperties();
	ERR_FAIL_NULL(mp);

	const JPH::Quat rotation = jolt_body->GetRotation();

	mp->ApplyForceTorqueAndDragInternal(rotation, {0.f,0.f,0.f}, p_step);

	mp->ResetForce();
	mp->ResetTorque();
}`

export const physicsResimulation = `func apply_physics_state_update(physics_frame:int, pos:Vector3, rot:Vector3, vel:Vector3, ang_vel:Vector3):
	global_position = pos
	global_rotation = rot
	linear_velocity = vel
	angular_velocity = ang_vel
	
	if not Global.CruiserPhysicsResimulation:
		return
	
	var state = PhysicsServer3D.body_get_direct_state(get_rid())
	if not state:
		return
	
	
	state.linear_velocity = vel
	state.angular_velocity = ang_vel
	
	var frame_offset : int = (GameTime.PhysicsFrame - physics_frame)
	if frame_offset > MAX_PHYSIC_STEP_OFFSET:
		push_warning("TankVehicle received a physics_state_update that was older than 250ms, will only resimulate 250ms.")
		frame_offset = MAX_PHYSIC_STEP_OFFSET
	if frame_offset > 0:
		for _i in frame_offset:
			# every physics frame that happened since the update has to be re-simulated
			_physics_process(get_physics_process_delta_time())

			# update treads for next step
			for tread in Treads:
				tread.force_shapecast_update()

			# integrate forces
			simple_physics_step()

			# update velocity based und direct body state
			linear_velocity = state.linear_velocity
			angular_velocity = state.angular_velocity

			# update rotation
			var angular_velocity_times_dt: Vector3 = angular_velocity * get_physics_process_delta_time()
			var angle: float = angular_velocity_times_dt.length()

			if angle != 0.0:
				var axis: Vector3 = angular_velocity_times_dt.normalized()
				var delta_rotation: Quaternion = Quaternion(axis, angle)
				var current_quat: Quaternion = Quaternion.from_euler(global_rotation)
				var new_quat: Quaternion = (delta_rotation * current_quat).normalized()
				global_rotation = new_quat.get_euler()

			# update position
			var collider : KinematicCollision3D = move_and_collide(linear_velocity * get_physics_process_delta_time())
			if collider:
				linear_velocity = Vector3.ZERO
				angular_velocity = Vector3.ZERO
				state.linear_velocity = Vector3.ZERO
				state.angular_velocity = Vector3.ZERO`