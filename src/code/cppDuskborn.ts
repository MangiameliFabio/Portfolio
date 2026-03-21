export const movementStateSnippet = `bool UPlayerGroundMovement::HandleAction(const EInputs Input, const EInputEvent Event)
{
\tSuper::HandleAction(Input, Event);
\tif (!ValidateState()) { return false; }

\tswitch (Input)
\t{
\tcase EInputs::ACTION:
\t\tif (Event == IE_Pressed && PLAYER->ActiveProsthesis->CanUsePrimary && !PLAYER->BlockPrimaryAttack)
\t\t{
\t\t\tSTATE_MACHINE->CombatStateTransition(
\t\t\t\tPLAYER->ActiveProsthesis->GetPrimaryAttackState());
\t\t\treturn true;
\t\t}
\t\tbreak;
\tcase EInputs::JUMP:
\t\tif (Event == IE_Pressed)
\t\t{
\t\t\tif (PLAYER->GetCurrentJetPackFuel() > 0.f && PLAYER->GetCharacterMovement()->IsFalling())
\t\t\t{
\t\t\t\tSTATE_MACHINE->StateTransition(STATE_MACHINE->JetPackState);
\t\t\t\treturn true;
\t\t\t}

\t\t\tif (PLAYER->CanJump())
\t\t\t{
\t\t\t\tPLAYER->Jump();
\t\t\t\treturn true;
\t\t\t}
\t\t}
\t\tbreak;
\tcase EInputs::SECONDARY_ACTION:
\t\tif (Event == IE_Pressed && PLAYER->FindGrapplingPoint())
\t\t{
\t\t\tSTATE_MACHINE->StateTransition(STATE_MACHINE->GrapplingState);
\t\t\treturn true;
\t\t}
\t\tbreak;
\tcase EInputs::SPRINT:
\t\tif (Event == IE_Pressed && PLAYER->GetHorizontalVelocity().Length() > 0.f)
\t\t{
\t\t\tSTATE_MACHINE->DisableCombatState();
\t\t\tSTATE_MACHINE->StateTransition(STATE_MACHINE->SprintState);
\t\t\treturn true;
\t\t}
\t\tbreak;
\tcase EInputs::DASH:
\t\tif (Event == IE_Pressed && PLAYER->CanDash)
\t\t{
\t\t\tSTATE_MACHINE->StateTransition(STATE_MACHINE->DashState);
\t\t\treturn true;
\t\t}
\t\tbreak;
\tcase EInputs::ABILITY_SWAP:
\t\tif (Event == IE_Pressed && PLAYER->ProsthesisSwap())
\t\t{
\t\t\treturn true;
\t\t}
\t\tbreak;
\tdefault:
\t\tbreak;
\t}

\treturn false;
}`;

export const grapplingHookSetupSnippet = `void AGrapplingHook::SetupGrapplingHook(
\tconst FVector& GrapplingLocation,
\tconst FVector& PlayerLocation,
\tconst FVector& StartVelocity,
\tUPrimitiveComponent* NewGrappledComponent)
{
\tif (NewGrappledComponent)
\t{
\t\tGrappledComponent = NewGrappledComponent;
\t\tHook->AttachToComponent(
\t\t\tGrappledComponent,
\t\t\tFAttachmentTransformRules::SnapToTargetNotIncludingScale);
\t}
\telse
\t{
\t\tHook->SetWorldLocation(
\t\t\tGrapplingLocation,
\t\t\tfalse,
\t\t\tnullptr,
\t\t\tETeleportType::ResetPhysics);
\t}

\tPlayerAttachmentSphere->SetWorldLocation(
\t\tPlayerLocation,
\t\tfalse,
\t\tnullptr,
\t\tETeleportType::ResetPhysics);

\tPhysicsConstraint->SetWorldLocation(GrapplingLocation);
\tPhysicsConstraint->SetConstrainedComponents(
\t\tPlayerAttachmentSphere,
\t\t"None",
\t\tHook,
\t\t"None");

\tPlayerAttachmentSphere->SetSimulatePhysics(false);
\tPlayerAttachmentSphere->SetSimulatePhysics(true);
\tPlayerAttachmentSphere->SetAllPhysicsLinearVelocity(StartVelocity);
}`;

export const prosthesisSwapSnippet = `bool APlayerCharacter::CreateProstheses()
{
\tFActorSpawnParameters SpawnParams;
\tSpawnParams.Owner = this;
\tSpawnParams.Instigator = GetInstigator();

\tLeftProsthesis = GetWorld()->SpawnActor<AProsthesis>(
\t\tLeftProsthesisClass,
\t\tFVector(0, 0, 0),
\t\tFRotator(0, 0, 0),
\t\tSpawnParams);
\tLeftProsthesis->Init(this);
\tLeftProsthesis->AttachProsthesis(GetMesh(), "LeftShoulderSocket");

\tRightProsthesis = GetWorld()->SpawnActor<AProsthesis>(
\t\tRightProsthesisClass,
\t\tFVector(0, 0, 0),
\t\tFRotator(0, 0, 0),
\t\tSpawnParams);
\tRightProsthesis->Init(this);
\tRightProsthesis->AttachProsthesis(GetMesh(), "RightShoulderSocket");

\tActiveProsthesis = LeftProsthesis;
\tActiveProsthesis->IsActive = true;
\tInactiveProsthesis = RightProsthesis;
\tProsthesisSwapUI.Broadcast();
\treturn true;
}

bool APlayerCharacter::ProsthesisSwap()
{
\tif (!DisableProsthesisSwap)
\t{
\t\tSTATE_MACHINE->DisableCombatState();
\t\tActiveProsthesis->IsActive = false;

\t\tif (ActiveProsthesis == LeftProsthesis)
\t\t{
\t\t\tActiveProsthesis = RightProsthesis;
\t\t\tInactiveProsthesis = LeftProsthesis;
\t\t}
\t\telse
\t\t{
\t\t\tActiveProsthesis = LeftProsthesis;
\t\t\tInactiveProsthesis = RightProsthesis;
\t\t}

\t\tActiveProsthesis->IsActive = true;
\t\tProsthesisSwapUI.Broadcast();
\t\treturn true;
\t}

\treturn false;
}`;

export const itemFactorySnippet = `UItem* AItemFactory::CreateItem(UEffectPart* EffectPart, UTriggerPart* TriggerPart)
{
\tUItem* NewItem = NewObject<UItem>();
\tif (EffectPart == nullptr || TriggerPart == nullptr)
\t{
\t\tLog::Print("Effect or Trigger null");
\t\treturn nullptr;
\t}

\tAEffect* Effect = nullptr;
\tif (TRIGGER_MANAGER)
\t{
\t\tFActorSpawnParameters SpawnParams;
\t\tSpawnParams.Owner = PLAYER;

\t\tEffect = GetWorld()->SpawnActor<AEffect>(
\t\t\tEffectPart->EffectClass,
\t\t\tFVector::Zero(),
\t\t\tFRotator::ZeroRotator,
\t\t\tSpawnParams);

\t\tEffect->Init(
\t\t\tTRIGGER_MANAGER->FindTrigger(TriggerPart->Type)->EffectScale);
\t}

\tif (!Effect)
\t{
\t\tLog::Print("No effect found");
\t\treturn nullptr;
\t}

\tNewItem->Init(EffectPart, TriggerPart, Effect);
\tTRIGGER_MANAGER->AddItem(NewItem);
\tPLAYER->AddItem(NewItem);
\treturn NewItem;
}`;

export const triggerSnippet = `void UTrigger::NotifySubscribers(AActor* EffectInstigator, const FVector* Location)
{
\tfor (int i = 0; i < Subscriber.Num(); ++i)
\t{
\t\tif (Subscriber[i]->IsEquipped)
\t\t{
\t\t\tSubscriber[i]->ActivateEffect(EffectInstigator, Location);
\t\t}
\t}
}

void UTrigger::FillThreshold(float Amount)
{
\tif (!Active)
\t{
\t\tCurrentThreshold += Amount;
\t\tif (CurrentThreshold >= ThreshHold)
\t\t{
\t\t\tif (!ShouldUpdate)
\t\t\t{
\t\t\t\tconst FVector Location = PLAYER->GetActorLocation();
\t\t\t\tNotifySubscribers(PLAYER, &Location);
\t\t\t}
\t\t\telse
\t\t\t{
\t\t\t\tCurrentTriggerFrequency = TriggerFrequency;
\t\t\t\tActivate();
\t\t\t}
\t\t}
\t}
}`;

export const enemySpawnSnippet = `void AEnemySpawn::SpawnUpdate()
{
\tif (
\t\tGameModeRef->CheckIfEnemyCanSpawn(EnemyType) &&
\t\tCheckDistance() &&
\t\t!CheckForCharactersAtSpawn() &&
\t\t!Helper::CheckIfLocationIsInFOV(GetWorld(), GetActorLocation()))
\t{
\t\tSpawnEnemy();
\t}
}

bool AEnemySpawn::CheckDistance() const
{
\tconst float CurrentDistanceToPlayer = FVector::Dist(
\t\tGetActorLocation(),
\t\tPLAYER->GetActorLocation());

\treturn CurrentDistanceToPlayer < MaxDistanceToPlayer
\t\t&& CurrentDistanceToPlayer > MinDistanceToPlayer;
}`;
