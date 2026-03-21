export const enchantedMainLoopSnippet = `int main(int argc, char* args[])
{
\tbool success = true;
\tif (success && !ENGINE->gRenderer->init())
\t{
\t\tprintf("failed to initialize renderer\\n");
\t}

\tGAME->gGameManager = std::make_shared<GameManager>();
\tGAME->gGameManager->init();
\tconst auto gameClock = std::make_shared<GameClock>();
\tgameClock->init();

\tSDL_Event e;
\twhile (!ENGINE->gQuit)
\t{
\t\tgameClock->startTick();
\t\tENGINE->gQueueForDelete.clear();
\t\tENGINE->gSizeQueueForDelete = 0;

\t\twhile (SDL_PollEvent(&e) != 0)
\t\t{
\t\t\tif (e.type == SDL_QUIT)
\t\t\t{
\t\t\t\tENGINE->gQuit = true;
\t\t\t}
\t\t}

\t\tENGINE->notify(HANDLE_INPUT);

\t\tfor (int object = 0; object < ENGINE->gTotalObjects; ++object)
\t\t{
\t\t\tif (ENGINE->gObjectList[object] &&
\t\t\t\tENGINE->gObjectList[object]->shouldUpdate)
\t\t\t{
\t\t\t\tENGINE->gObjectList[object]->update();
\t\t\t}
\t\t}

\t\tENGINE->gRenderer->renderUpdate();
\t\tgameClock->endTick();
\t}

\treturn 0;
}`;

export const enchantedCommandInputSnippet = `Command* InputManager::handleInput()
{
\tconst Uint8* currentKeyStates = SDL_GetKeyboardState(NULL);

\tif (!disablePlayerInput && PLAYER)
\t{
\t\tPLAYER->stateMachine->stateEnum = IDLE;
\t\tif (currentKeyStates[SDL_SCANCODE_W]) buttonW->execute();
\t\tif (currentKeyStates[SDL_SCANCODE_A]) buttonA->execute();
\t\tif (currentKeyStates[SDL_SCANCODE_S]) buttonS->execute();
\t\tif (currentKeyStates[SDL_SCANCODE_D]) buttonD->execute();
\t\tif (currentKeyStates[SDL_SCANCODE_UP]) buttonUp->execute();
\t\tif (currentKeyStates[SDL_SCANCODE_LEFT]) buttonLeft->execute();
\t\tif (currentKeyStates[SDL_SCANCODE_DOWN]) buttonDown->execute();
\t\tif (currentKeyStates[SDL_SCANCODE_RIGHT]) buttonRight->execute();
\t}

\tif (currentKeyStates[SDL_SCANCODE_ESCAPE]) buttonESC->execute();
\tENGINE->notify(ALL_INPUTS_HANDLED);
\treturn nullptr;
}

void InputManager::init()
{
\tbuttonW = std::make_shared<MoveUpCommand>();
\tbuttonA = std::make_shared<MoveLeftCommand>();
\tbuttonS = std::make_shared<MoveDownCommand>();
\tbuttonD = std::make_shared<MoveRightCommand>();
\tbuttonLeft = std::make_shared<AimLeftCommand>();
\tbuttonDown = std::make_shared<AimDownCommand>();
\tbuttonUp = std::make_shared<AimUpCommand>();
\tbuttonRight = std::make_shared<AimRightCommand>();
\tbuttonESC = std::make_shared<CloseGameCommand>();
}`;

export const enchantedPathfindingSnippet = `bool Pathfinding::findPath(
\tVector& start,
\tVector& end,
\tstd::vector<Vector>& path,
\tconst Object* callingObject)
{
\tresetGrid();
\tAStarNode* nodeStart = vectorToNode(start);
\tAStarNode* nodeEnd = vectorToNode(end);

\tnodeStart->localGoal = 0.f;
\tnodeStart->globalGoal = heuristic(nodeStart, nodeEnd);

\tauto compareNodes = [](const AStarNode* a, const AStarNode* b)
\t{
\t\treturn a->globalGoal > b->globalGoal;
\t};
\tstd::priority_queue<AStarNode*, std::vector<AStarNode*>, decltype(compareNodes)>
\t\tpqOpenNodes(compareNodes);
\tpqOpenNodes.push(nodeStart);

\twhile (!pqOpenNodes.empty())
\t{
\t\tAStarNode* nodeCurrent = pqOpenNodes.top();
\t\tpqOpenNodes.pop();
\t\tnodeCurrent->visited = true;

\t\tfor (auto neighbour : nodeCurrent->neighbours)
\t\t{
\t\t\tif (neighbour->visited || (neighbour->blocked && neighbour->blockingObject != callingObject))
\t\t\t{
\t\t\t\tcontinue;
\t\t\t}

\t\t\tfloat possiblyLowerGoal =
\t\t\t\tnodeCurrent->localGoal + distance(nodeCurrent, neighbour);

\t\t\tif (possiblyLowerGoal < neighbour->localGoal)
\t\t\t{
\t\t\t\tneighbour->parent = nodeCurrent;
\t\t\t\tneighbour->localGoal = possiblyLowerGoal;
\t\t\t\tneighbour->globalGoal =
\t\t\t\t\tneighbour->localGoal + heuristic(neighbour, nodeEnd);
\t\t\t\tpqOpenNodes.push(neighbour);
\t\t\t}
\t\t}
\t}

\treturn false;
}`;
