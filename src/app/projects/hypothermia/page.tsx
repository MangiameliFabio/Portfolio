import Image from "next/image";
import { Metadata } from "next";
import SectionTitle from "@/components/Blog/SectionTitel";
import VideoBlock from "@/components/Blog/VideoBlock";
import Paragraph from "@/components/Blog/Paragraph";
import BlogLink from "@/components/Blog/BlogLink";
import CodeBlock from "@/components/Blog/CodeBlock";
import { coroutineSnippet, behaviourSnippet, searchSnippet } from "@/code/gdNeighbour";

import SubsectionTitel from "@/components/Blog/SubsectionTitel";
import TableOfContents from "@/components/Blog/TableOfContents";
import Roles from "@/components/Blog/Roles";
import ProjectBlogHeader from "@/components/Blog/ProjectBlogHeader";
import PageStyling from "@/components/Common/PageStyling";
import { durabilityModule, enginePartModule, fuelTransferModule, tankModule, turboBoost, turboChargerSnippet } from "@/code/gdEngine";
import { characterTemperature, connectionTemperature, roomTemperature, temperatureSource } from "@/code/gdTemperature";
import { batteryModule } from "@/code/gdBattery";
import { knockout, knockoutMover } from "@/code/gdKnockout";


export const metadata: Metadata = {
  title: "Project - Hypothermia",
  description: "Game and Network Programming",
};

const BlogPage = () => {
  return (
    <>
      <section className="pt-[50px] md:pb-[100px] lg:pt-[80px]">
        <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full lg:w-8/12 mb-10 md:mb-50">
                <ProjectBlogHeader projectLink="/projects/hypothermia" />

                <Roles roles={["Game Programmer", "Engine Programmer", "Network Programmer"]}></Roles>

                <Paragraph>
                  The longest time during my work at Chasing Carrots I was assigned to an unannounced title. It’s a cooperative exploration game where players step into the role of Arctic researchers and pilot a massive cruiser across a white frozen wasteland, searching for and investigating mysterious anomalies.

                  The project went through many iterations. At the beginning of our prototyping phase, the original idea was very different from what it eventually became. Here I want to talk about the steps I went through and how I was able to support and accompany the project’s development, from the first prototype all the way to the MVP.

                  The project is still in development, with an early access release currently planned for the end of 2026.
                </Paragraph>

                <BlogLink title="Chasing Carrots custom Godot fork: " link="https://github.com/ChasingCarrots/godot/commits/frozen_bulgur/?author=MangiameliFabio" linkName="My commits"/>

                <VideoBlock src={"/images/projects/hypothermia/hypothermiaShowCasePart1.mp4"} startTime={20}/>

                <TableOfContents />

                <SectionTitle>Prototyping</SectionTitle>

                <Paragraph>
                  The project started during the Global Game Jam in 2024. My colleagues explored the feasibility of using Godot to build a cooperative burglar game with proximity voice chat. Players would need to collaborate to sneak into mansions or museums, steal high value objects, and bring them back to their truck. We especially wanted to experiment with noise and how it could lead to detection. Enemy AI reacted to sound events such as running footsteps or falling objects, but also to players talking to each other. The long term goal was for the game to become a tense but humorous stealth experience.
                </Paragraph>

                <SubsectionTitel>A very concernd Landlord</SubsectionTitel>

                <Paragraph>
                  When I joined the project, my task was to refactor the enemy AI, which was a landloard roaming the property. In the current state the landlord was only able to follow a noise or detect a player via ray cast and walk towards the player. I was asked to implement an attack state and refactor the AI logic to use coroutines. The reason for this was that Godot provides a very accessible way to work with coroutines, and we wanted to evaluate how manageable more complex gameplay logic would be. With a simple while loop and the await keyword, it is possible to write code that runs once every frame. This structure allows us to build layered and more complex AI behavior. 
                </Paragraph>

                <CodeBlock code={coroutineSnippet}/>

                <Paragraph>
                  A major advantage of this approach is readability. The logic can be read directly from the code. Our AI will chase a target if one exists. Otherwise it will begin searching for the target. If it is neither chasing nor searching, the AI will listen for noises or fall back to its idle behavior.
                </Paragraph>

                <CodeBlock code={behaviourSnippet}/>

                <Paragraph>
                  Inside the coroutine functions we define the individual behaviors. In this example, the routine handles searching an area after the AI loses sight of its target. The AI will search for a fixed amount of time defined by "search_time" and will abort the coroutine early if a target is found or the timer runs out.
                </Paragraph>

                <CodeBlock code={searchSnippet}/>

                <Paragraph>
                  With this the refactor for our first enemy, the Landlord was done and was able to roam, detect players and attack them. We even recorded voice lines to give our landloard some personality.
                </Paragraph>

                <VideoBlock src="/images/projects/hypothermia/EnemyAI.mp4" controls={true} muted={false} autoPlay={false}/>

                <Paragraph>
                  An issue that came up quickly during development with coroutines was the challenge of debugging. Because coroutines are used, stepping through the code with a debugger becomes more difficult. At every await keyword, the debugger logically jumps to a different point in the code base. This sometimes made it hard to determine exactly which state caused an error and what needed to be fixed. Visibility is key here. A tool that could show the current state of the AI would make debugging much easier. This is where a Godot extension called{" "}
                  <a className="underline" href="https://github.com/limbonaut/limboai">Limbo AI</a> {" "}
                  came in. It adds behavior trees and a visual editor to Godot. Ultimately, the coroutines I implemented are nothing other than a behavior tree, so we wanted to try this tool as well.
                </Paragraph>

                <Paragraph>
                  With some effort, I was able to transfer the current AI behavior controlled by coroutines to a Limbo AI behavior tree and restored the previous behavior of the Landlord. As shown in the following video, the debug menu displays which state within the behavior tree the AI is currently in. This makes it easy to trace problems and spot potential bugs.
                </Paragraph>

                <VideoBlock src="/images/projects/hypothermia/LimboAI.mp4" caption="Limbo AI debug menu within Godot showing Landlord behavior"></VideoBlock>

                <Paragraph>
                  After completing the implementation in Limbo AI, I presented my findings to our engineering lead. It was decided that future AI in the game would be implemented using Limbo AI. In the current state of the project, Limbo AI is also in use for enemies within the anomalies.
                </Paragraph>

                <SubsectionTitel>
                  Burglars need an Inventory
                </SubsectionTitel>

                <Paragraph>
                  Another task was the implementation of a simple inventory system. It allowed players to pick up items, store them in one of the inventory slots, and throw them away to free up a slot. It was important to create a synchronized system so that other players could see which item someone was holding in their hand or which item they had just thrown away. I also implemented a placeholder UI to visualize which items were stored in the inventory and which slot was currently active.
                </Paragraph>

                <VideoBlock src={"/images/projects/hypothermia/InventorySystem.mp4"} ></VideoBlock>

                <Paragraph>
                  Another important aspect was handling larger objects like the TV shown in the video clip. Large objects were defined as non storable in the inventory. I implemented it in a way that any item currently held in the player’s hand would automatically be holstered when picking up a large object. If the player switched the active inventory slot, the large object would be dropped.
                  Parts of this inventory system are still in use although in later iteration, it was refactored.
                </Paragraph>

                <SubsectionTitel>
                  Creating a Challange
                </SubsectionTitel>

                <Paragraph>
                  With the AI in place and the ability to store items, we were able to properly test the prototype. But we quickly realized it was not enough. While it was fun trying to avoid the landlord, we were missing a clear objective, a challenge the players needed to overcome. We also wanted to actively encourage collaboration, so I implemented a first obstacle tied to the main loot. It was a security door with a periodically changing access code.
                </Paragraph>

                <div className="sm:flex">
                  <VideoBlock src={"/images/projects/hypothermia/SecurityDoor.mp4"}></VideoBlock>
                  <VideoBlock src={"/images/projects/hypothermia/DoorCode.mp4"}></VideoBlock>
                </div>

                <Paragraph>
                  Players had to use their walkie talkies to communicate the door code so that another player could open the door and start looting the main objective, stealing the gold ingots. Both the security terminal and the door were placed along the landlord’s default patrol path. Because of that, players had to stay alert and carefully time their actions to avoid getting caught.
                </Paragraph>

                <Paragraph>
                  Another idea were traps. Small obstacles scattered around the level to make things a bit more difficult for the players. I was tasked with implementing a bear trap. As mentioned before, noise was meant to play a bigger role in the game, so the bear trap would not only stun the player and deal damage, it would also attract nearby enemies because of the loud sound it created.
                </Paragraph>

                <VideoBlock src={"/images/projects/hypothermia/BearTrap.mp4"}></VideoBlock>

                <Paragraph>
                  In this showcase I increased the damage so the player would immediately die for demonstration purposes. In the actual prototype, the player would get stuck and another teammate had to help release them from the trap. These small traps created a lot of funny situations during playtests. It was hilarious to run from the landlord while the only thing you could hear was your colleague stepping into a bear trap with a loud snap.
                </Paragraph>

                <SubsectionTitel>
                  The Truck
                </SubsectionTitel>

                <Paragraph>
                  As professional burglars, of course we needed a reliable truck. We wanted to experiment with having this kind of base entity inside the level, something that felt more meaningful than just a storage space for collected loot. So we decided to give the truck a bit more purpose. I implemented an interactable laptop inside the truck. Once used, it opened a window where players could analyze the building layout and gather information about important locations within the level.
                </Paragraph>

                <VideoBlock src={"/images/projects/hypothermia/LaptopTruck.mp4"}></VideoBlock>

                <Paragraph>
                  Through this task I played more around with UI implementation, espacially in a 3D environment. The laptop screen is a viewport texture using a canvas object to display the UI.
                  The same UI is also dispayed during the starting sequence of the game where additional informations can be bought for money. In this case I enabled all informations for showcasing purposes which can be seen  under "Location Information".
                </Paragraph>

                <Paragraph>
                  I highlighted some of the key tasks I worked on during the prototyping phase, but there were additional systems as well. For example, I implemented the logic for handling player death. This included applying Godot ragdoll physics, spawning a spectator camera, and monitoring the lose conditions. I also created a scoreboard that was shown at the end of the level once either the win or lose condition was fulfilled. Going into full detail on all of that would probably go beyond the scope of this blog post.
                </Paragraph>

                <SectionTitle>Implementation of Gameplay Logic</SectionTitle>

                <Paragraph>
                 During the prototyping phase, our project leads came up with a new direction for the game. It kept some similar features, but the setting changed completely. Instead of burglars, the players became arctic explorers uncovering the secrets of a frozen desert. This was also a time when a lot changed in my own life, because I started my master's degree and moved to Copenhagen. As a result, I went from working full time to part time and started working remotely.
                </Paragraph>

                <Paragraph>
                  My gameplay programming tasks included implementing the cruiser's engine, its electrical power setup, and a temperature mechanic that allowed heat to move between rooms. Another major part of my work was the player damage logic, including knockout and revive mechanics. I also worked on item storage and created a synchronized solution for how and where items are kept.
                </Paragraph>

                <Paragraph>
                  In the following sections, I want to talk about three gameplay features that influenced each other but can also be used separately. They all came together inside the cruiser, but an important part of the game design was that they should also work in other contexts. There could, for example, be other engines somewhere else in the world, maybe inside a broken cruiser, and the electrical setup also needed to be reusable in different situations. Because of that, I tried to build these modules in a way where they did not need to know where they were being used, but would always behave consistently.
                </Paragraph>

                <SubsectionTitel>Engine System</SubsectionTitel>

                <Paragraph>
                  There was already an existing engine module implemented by our tech lead, and it exposed a lot of different engine stats. At that point, though, many of them were not really being used yet. The idea was that the engine should feel like an object in the world that needs constant maintenance. My task was to add engine parts that introduced new values and made use of existing ones like engine RPM.
                </Paragraph>

                <Paragraph>
                  Every engine part is tied to a specific value and directly affects how the engine behaves. Parts like the turbocharger reduce the engine's maximum RPM depending on their durability. Others, like the fuel pump, cause the whole engine to fail when they break. The engine cooler, on the other hand, raises the temperature of the engine which leads to more damage and is also tied to the temperature system which will increase the temperature in the room.
                </Paragraph>

                <Paragraph>
                  As an example here the code for the turbo charger:
                </Paragraph>

                <CodeBlock code={turboChargerSnippet}  />

                <Paragraph>
                  BoostCharge is the specific value influenced by the turbocharger. In the real world, turbochargers generate boost based on the amount of exhaust gas the engine produces, so there is a direct relationship with RPM. More RPM creates more boost, and more boost increases RPM in return. What I found especially interesting about this implementation was that it created an actual feeling of turbo lag. In real engines, turbo lag happens when there is not enough exhaust gas for the turbocharger to deliver its full power. The effect on the engine RPM is implemented as follows:
                </Paragraph>

                <CodeBlock code={turboBoost}/>

                <Paragraph>
                  In total, I worked on five different engine parts, each with its own impact on the engine. But of course, we also needed some more gameplay around it. This is where the repair mechanic came in. A part's durability always has a direct impact on its specific value. For example, a turbocharger with 25% durability left has a reduced maximum boost charge.
                </Paragraph>
                
                <Paragraph>
                  The engine parts consist of several different modules, and I am only showing the ones here that are relevant to the overall engine behavior. To apply the durability penalty to a part, I created a more general module that is shared across all the different engine parts.
                </Paragraph>

                <CodeBlock code={enginePartModule}></CodeBlock>
                  
                <Paragraph>
                  This code also handles what happens when an engine part is detached. As described earlier, the engine should not work when a part like the fuel pump is missing. To actively decrease part durability over time, another module is used that periodically lowers the quality of an engine part based on RPM and engine temperature.
                </Paragraph>

                <CodeBlock code={durabilityModule}/>

                <Paragraph>
                  To repair an engine part, the player first has to detach it from the engine. Since missing parts directly affect engine behavior, the engine also needs to react when a component is removed. Once detached, the part can be picked up and placed on the workbench, which opens the repair UI. After the repair is finished, the player can pick up the part again and reattach it to the engine. To support this workflow, I reused an existing attachment system and used it for both the workbench and the engine itself.
                </Paragraph>

                <VideoBlock src={"/images/projects/hypothermia/EngineRepair.mp4"}/>

                <Paragraph>
                  Of course, the engine also needs fuel to run. Part of my work was to add refueling to the cruiser's tank and make sure the engine shuts down once that tank is empty. Players can store fuel canisters in the cruiser and later use them to transport fuel from depots or other tanks in the world. To support that, I split the system into two reusable modules: one for storing fuel and one for transferring it.
                </Paragraph>

                <Paragraph>
                  The fuel storage module is intentionally simple. It keeps track of the current fuel level, checks whether a tank is empty or full, and provides helper functions for increasing or decreasing the amount of fuel. That made it easy to plug the same logic into different objects while also giving the engine a clear source of truth for whether it is still able to run.
                </Paragraph>

                <CodeBlock code={tankModule}/>

                <Paragraph>
                  The transfer module is a bit more involved because it connects directly to our interaction system. It needs to support two player actions, filling a tank and pumping fuel out of a tank. This is what allows a fuel canister to act as a bridge between different fuel sources in the world. In practice, that means the same system can be used to move fuel into the cruiser, take fuel back out again, or connect other compatible tanks without building a separate solution for each case.
                </Paragraph>

                <CodeBlock code={fuelTransferModule}/>

                <Paragraph>
                  With these two modules in place, players can use fuel canisters to keep the cruiser running, but they can also use the exact same mechanics in other contexts. That was an important goal throughout this feature, because the engine systems were designed to work not only inside the cruiser but anywhere else in the game world where similar machinery might appear.
                </Paragraph>

                <VideoBlock src={"/images/projects/hypothermia/Fueling.mp4"}/>

                <Paragraph>
                  Another important detail is that the complete engine logic is calculated on the server. Clients only receive the specific values they need for feedback, UI, or interactions inside the cruiser. This keeps the behavior consistent for all players in multiplayer while still allowing the engine to feel responsive and readable from the client side.
                </Paragraph>

                <Paragraph>
                  Taken together, the engine became much more than a simple object that can be switched on and off. Fuel, detachable parts, durability, and temperature all influence each other, which makes the cruiser feel like a machine that players have to understand and maintain over time. That interplay was what made the system interesting to build, because each individual mechanic is useful on its own, but together they create a much stronger gameplay loop.
                </Paragraph>

                <SubsectionTitel>Temperature System</SubsectionTitel>

                <Paragraph>
                  A big part of the game takes place in the endless cold of Antarctica, so temperature plays an important role throughout the whole experience. Because of that, I was tasked with implementing a system that allows heat sources in the game to directly affect the spaces around them.
                  A good example is the cruiser, where the engine acts as a heat source and warms up the engine room. The system can then transfer heat from one room to another, which makes it possible to gradually warm up the whole cruiser. The player character is also affected by the temperature of the room they are currently in. If they stay in the cold for too long, they slowly freeze and eventually get knocked out.
                </Paragraph>

                <Paragraph>
                  I started by creating heat sources with a shared base class that other heat sources could inherit from. This base class stores the current temperature of the source, its exchange rate, and a reference to the room the source is affecting.
                </Paragraph>

                <CodeBlock code={temperatureSource} />

                <Paragraph>
                  To handle temperature exchange between rooms, I implemented room doors as heat sources. I called this module <code>ConnectionTemperatureSource.gd</code>, since it is specifically used for transferring heat between connected spaces. The module stores a reference to another room, reads that room&apos;s current temperature, and uses it to influence the temperature of the room it belongs to. The connection can also be configured with a float value that defines how much heat is allowed to pass through. This made it possible to support doors that are fully open, fully closed, or somewhere in between.
                </Paragraph>

                <CodeBlock code={connectionTemperature} />

                <Paragraph>
                  To actually apply temperature to a room, I implemented a room temperature module. This module stores references to all heat sources inside the room and periodically updates the current room temperature based on those sources and the room&apos;s volume coefficient. That coefficient lets bigger rooms change temperature more slowly than smaller ones. One example of a heat source here is the engine, which produces heat based on its RPM. If the engine cooler is broken, it produces even more heat, but that also puts additional strain on the other engine parts and reduces their durability.
                </Paragraph>

                <CodeBlock code={roomTemperature} />

                <Paragraph>
                  Finally, I needed to connect the temperature system to the player so it would have a real gameplay impact. The player has a freezing state that tracks how far the freezing process has progressed. Depending on the current temperature of the room the player is currently in, I decrease or increase the freezing state. Based on that value, the character receives a movement speed penalty. I implemented this by defining a freeze speed reduction that is sampled through a curve using the current freezing state as input.
                </Paragraph>

                <CodeBlock code={characterTemperature} />

                <SubsectionTitel>Electrical Power System</SubsectionTitel>

                <Paragraph>
                  We need power, so I was tasked with implementing a small electricity system for the game. Electricity affects objects such as light sources and the engine ignition button, which means the system needed to be flexible enough to support different kinds of gameplay interactions. To generate power, I implemented an alternator that produces electricity and feeds it into a battery. That battery can then be charged or discharged depending on what is currently connected to it.
                </Paragraph>

                <Paragraph>
                  A key part of the system was making batteries reusable across different objects. The cruiser, for example, needs its own battery, but portable equipment such as the player’s flash lights also relies on one. Because of that, I structured the system around three simple building blocks: electricity producers, electricity consumers, and batteries that store the energy. Producers and consumers are fairly lightweight, since they mainly contribute a value that increases or decreases the battery load, and that value can also be changed dynamically during gameplay.
                </Paragraph>

                <CodeBlock code={batteryModule}/>

                <Paragraph>
                  The battery itself is responsible for tracking all active producers and consumers and periodically updating its current charge based on their combined values. In addition to that, I introduced a voltage value that makes it possible to detect when the system is overloaded. If too many consumers are active at the same time, the voltage drops and connected devices can start to fail. This gave the whole setup a more believable behavior and made electricity feel like an actual gameplay system rather than just a simple on and off switch.
                </Paragraph>

                <SubsectionTitel>Knocking out Players</SubsectionTitel>

                <Paragraph>
                  Fail states are an important part of many games because they create actual challenge. In our game, that fail state happens when all player characters have been knocked out and can no longer be revived. I implemented several features around player knockouts, including the knockout event itself, spawning a new mesh that represents the knocked out character and can be picked up by other players, a spectator camera for knocked out players that switches between active teammates so they can still follow what is happening, and a revive mechanic in the cruiser bunk bed that respawns the character.
                </Paragraph>

                <Paragraph>
                  I implemented a function and registered it on the player character so a character can be knocked out from anywhere in the codebase. If the character is not already unconscious, the function sets the unconscious boolean to true. The actual knockout logic is then handled through a callback that is triggered when this value changes. This includes disabling the player character, spawning the knocked out body mesh, and switching the player to the spectator camera through the player interaction mode.
                </Paragraph>

                <CodeBlock code={knockout}/>

                <Paragraph>
                  As an example, this is the code the cruiser uses to run over player characters. It uses a simple collision shape that knocks out the hit player based on the current velocity of the referenced physics object.
                </Paragraph>

                <CodeBlock code={knockoutMover}/>

                <Paragraph>
                  With this logic in place, I was able to drive over the character and knock them out during gameplay. This was useful because it let me properly test the full knockout flow in an actual game situation instead of only triggering it manually through code. It also helped show that the knockout state worked correctly when caused by a moving gameplay object like the cruiser, which made the whole feature feel much more grounded in the game.
                </Paragraph>

                <VideoBlock src={"/images/projects/hypothermia/DriveOver.mp4"} />

                <Paragraph>
                  One of the design constraints we have for the game is that a player is never truly dead. As long as there is another player who can still revive them, the body can be rescued. Players can pick up the unconscious body and carry it back to the cruiser to respawn them, or use a medkit to revive them on the spot. I implemented a function which can be used to respawn the player at a specific position, which can also be seen in the code block above. To revive the player in the cruiser, the unconscious body gets attached to the bunk bed and after a duration of 5 seconds the player respawns.
                </Paragraph>


                <VideoBlock src={"/images/projects/hypothermia/Revive.mp4"} />

                <SectionTitle>Implementation of Networking Features</SectionTitle>

                <Paragraph>
                  While I really enjoy the development of gameplay mechanics and designing game systems, networking technologies definetly also sparked my interest. Propably most of my favorite games are multiplayer games or support coop gameplay. As soon as I was more confident in programming high level synchronised systems I wanted to dig deeper and started to focus more on the networking side of Hypothermia.
                </Paragraph>

                <SubsectionTitel>Physics Synchronization</SubsectionTitel>

                

                <SubsectionTitel>Godot Multiplayer Refactor</SubsectionTitel>
                <SubsectionTitel>Multiplayer Stability</SubsectionTitel>
                <SubsectionTitel>Package Chunking</SubsectionTitel>


              </div>
            </div>
          </div>
      </section>

      <PageStyling/>
    </>
  );
};

export default BlogPage;
