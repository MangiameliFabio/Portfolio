export const cursePathfindingSnippet = `bool APathfindingGrid::GetPath(
\tint StartX,
\tint StartY,
\tint EndX,
\tint EndY,
\tTArray<FPfNode*>& Path,
\tbool Verbose)
{
\tTArray<FPfNode*> OpenList, ClosedList;
\tFPfNode* StartNode = &GetValue(StartX, StartY);
\tconst FPfNode* EndNode = &GetValue(EndX, EndY);

\tStartNode->G = 0;
\tStartNode->H = CalculateDistance(StartX, StartY, EndX, EndY);
\tStartNode->S = StartNode->H;
\tOpenList.Add(StartNode);

\twhile (OpenList.Num() > 0)
\t{
\t\tFPfNode* Current = GetLowestCostNode(OpenList);
\t\tif (Current == EndNode)
\t\t{
\t\t\tCalculatePath(Current, Path, Verbose);
\t\t\treturn true;
\t\t}

\t\tOpenList.Remove(Current);
\t\tClosedList.Add(Current);

\t\tTArray<FPfNode*> Neighbors = GetNeighbors(Current->X, Current->Y);
\t\tfor (FPfNode* Neighbor : Neighbors)
\t\t{
\t\t\tif (ClosedList.Contains(Neighbor) || !Neighbor->IsWalkable)
\t\t\t{
\t\t\t\tcontinue;
\t\t\t}

\t\t\tconst int TempGCost =
\t\t\t\tCurrent->G +
\t\t\t\tCalculateDistance(Current->X, Current->Y, Neighbor->X, Neighbor->Y) +
\t\t\t\tNeighbor->StaticHeat +
\t\t\t\tNeighbor->DynamicHeat;

\t\t\tif (TempGCost < Neighbor->G)
\t\t\t{
\t\t\t\tNeighbor->G = TempGCost;
\t\t\t\tNeighbor->H = CalculateDistance(
\t\t\t\t\tNeighbor->X,
\t\t\t\t\tNeighbor->Y,
\t\t\t\t\tEndNode->X,
\t\t\t\t\tEndNode->Y);
\t\t\t\tNeighbor->S = Neighbor->G + Neighbor->H;
\t\t\t\tNeighbor->CameFrom = Current;

\t\t\t\tif (!OpenList.Contains(Neighbor))
\t\t\t\t{
\t\t\t\t\tOpenList.Add(Neighbor);
\t\t\t\t}
\t\t\t}
\t\t}
\t}

\treturn false;
}`;

export const curseDynamicHeatSnippet = `void APathfindingGrid::GenerateDynamicHeatMap(float DeltaTime)
{
\tif (Delay <= 0)
\t{
\t\tfor (int x = 0; x < Width; ++x)
\t\t{
\t\t\tfor (int y = 0; y < Height; ++y)
\t\t\t{
\t\t\t\tGetValue(x, y).DynamicHeat = 0.f;
\t\t\t}
\t\t}

\t\tTArray Enemies(FPersistentWorldManager::GetEnemies());
\t\tfor (ABaseCharacter* Enemy : Enemies)
\t\t{
\t\t\tint X, Y;
\t\t\tif (Cast<AMolochPawn>(Enemy))
\t\t\t{
\t\t\t\tif (GetCoordinatesFromWorldPosition(Enemy->GetActorLocation(), X, Y))
\t\t\t\t{
\t\t\t\t\tGetValue(X, Y).DynamicHeat += 25.f;
\t\t\t\t\tfor (FPfNode* Neighbor : GetNeighbors(X, Y))
\t\t\t\t\t{
\t\t\t\t\t\tNeighbor->DynamicHeat += 25.f;
\t\t\t\t\t}
\t\t\t\t}
\t\t\t}
\t\t\telse if (GetCoordinatesFromWorldPosition(Enemy->GetActorLocation(), X, Y))
\t\t\t{
\t\t\t\tGetValue(X, Y).DynamicHeat += 10.f;
\t\t\t\tfor (FPfNode* Neighbor : GetNeighbors(X, Y))
\t\t\t\t{
\t\t\t\t\tNeighbor->DynamicHeat += 5.f;
\t\t\t\t}
\t\t\t}
\t\t}

\t\tDelay = 0.5f;
\t}

\tDelay -= DeltaTime;
}`;

export const curseEnemyStateSnippet = `void UDeprivedStateMachine::BeginPlay()
{
\tSuper::BeginPlay();

\tSelfRef = Cast<ADeprivedPawn>(GetOwner());
\tIdle = NewObject<UDeprivedIdle>();
\tRunning = NewObject<UDeprivedRunning>();
\tJumpAttack = NewObject<UDeprivedJumpAttack>();
\tRecover = NewObject<UDeprivedRecover>();
\tNormalAttack = NewObject<UDeprivedNormalAttack>();
\tFrenziedAttack = NewObject<UDeprivedFrenziedAttack>();
\tFeast = NewObject<UDeprivedFeast>();
\tFindStartLocation = NewObject<UFindStartLocation>();
}

void UDeprivedStateMachine::FindPathToPlayer(TArray<FVector>& Path) const
{
\tPath.Empty();
\tAPathfindingGrid* Grid = FPersistentWorldManager::PathfindingGrid;
\tif (!Grid)
\t{
\t\tUE_LOG(LogTemp, Error, TEXT("No Grid in Deprived State Machine"));
\t\treturn;
\t}

\tif (!Grid->GetPathWorldSpace(
\t\tSelfRef->GetActorLocation(),
\t\tPlayer->GetActorLocation(),
\t\tPath,
\t\tfalse))
\t{
\t\tPath.Empty();
\t}
}`;

export const curseTrapSnippet = `void UTrapComponent::BeginPlay()
{
\tSuper::BeginPlay();

\tTrapIsActive = false;
\tif (FPersistentWorldManager::TrapManager != nullptr)
\t{
\t\tFPersistentWorldManager::TrapManager->UpgradeTraptype.AddDynamic(
\t\t\tthis,
\t\t\t&UTrapComponent::CheckActivation);
\t\tFPersistentWorldManager::TrapManager->DeactivateTrapsOfType.AddDynamic(
\t\t\tthis,
\t\t\t&UTrapComponent::CheckDeactivation);
\t}
}

void UTrapComponent::CheckActivation(TEnumAsByte<ETrapTypes> OtherTrapType, int prio)
{
\tif (OtherTrapType == TrapType && prio >= Prio || OtherTrapType == ETrapTypes::All)
\t{
\t\tTrapIsActive = true;
\t}
}

void UTrapComponent::CheckDeactivation(
\tTEnumAsByte<ETrapTypes> OtherTrapType = ETrapTypes::All,
\tint prio = 0)
{
\tif (OtherTrapType == TrapType && prio <= Prio || OtherTrapType == ETrapTypes::All)
\t{
\t\tTrapIsActive = false;
\t}
}`;
