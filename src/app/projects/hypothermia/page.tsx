import { Metadata } from "next";
import BlogLink from "@/components/Blog/BlogLink";
import CodeBlock from "@/components/Blog/CodeBlock";
import Paragraph from "@/components/Blog/Paragraph";
import ProjectBlogHeader from "@/components/Blog/ProjectBlogHeader";
import Roles from "@/components/Blog/Roles";
import SectionTitle from "@/components/Blog/SectionTitel";
import SubsectionTitel from "@/components/Blog/SubsectionTitel";
import TableOfContents from "@/components/Blog/TableOfContents";
import VideoBlock from "@/components/Blog/VideoBlock";
import PageStyling from "@/components/Common/PageStyling";
import { batteryModule } from "@/code/gdBattery";
import { chunkReceiver, chunkSender } from "@/code/cppChunking";
import {
  durabilityModule,
  enginePartModule,
  fuelTransferModule,
  tankModule,
  turboBoost,
  turboChargerSnippet,
} from "@/code/gdEngine";
import {
  behaviourSnippet,
  coroutineSnippet,
  searchSnippet,
} from "@/code/gdNeighbour";
import {
  characterTemperature,
  connectionTemperature,
  roomTemperature,
  temperatureSource,
} from "@/code/gdTemperature";
import { knockout, knockoutMover } from "@/code/gdKnockout";
import { physicsIntegrateion, physicsResimulation } from "@/code/cppPhysics";
import Links from "@/components/Blog/Links";

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
            <div className="mb-10 w-full md:mb-50 lg:w-8/12">
              <ProjectBlogHeader projectLink="/projects/hypothermia" />

              <Roles
                roles={[
                  "Game Programmer",
                  "Network Programmer",
                ]}
              ></Roles>

              <Paragraph>
                For the longest time during my work at Chasing Carrots I was
                assigned to Hypothermia. It&apos;s a cooperative
                exploration game where players step into the role of Arctic
                researchers and pilot a massive cruiser across a white frozen
                wasteland, searching for and investigating mysterious anomalies.
              </Paragraph>

              <Paragraph>
                The project went through many iterations. At the beginning of
                our prototyping phase, the original idea was very different from
                what it eventually became. Here I want to talk about the steps I
                went through and how I was able to support and accompany the
                project&apos;s development, from the first prototype all the way
                to the MVP. Hypothermia is still in development, with an early access
                release currently planned for the end of 2026.
              </Paragraph>

              <VideoBlock
                src={
                  "/images/projects/hypothermia/HypothermiaShowCasePart1.mp4"
                }
              />

              <Links>
                <BlogLink
                  title="Chasing Carrots custom Godot fork: "
                  link="https://github.com/ChasingCarrots/godot/commits/frozen_bulgur/?author=MangiameliFabio"
                  linkName="My commits"
                />
              </Links>

              <TableOfContents />

              <SectionTitle>Prototyping</SectionTitle>

              <Paragraph>
                The project started during the Global Game Jam in 2024. My
                colleagues explored the feasibility of using Godot to build a
                cooperative burglar game with proximity voice chat. Players
                would need to collaborate to sneak into mansions or museums,
                steal high-value objects and bring them back to their truck. We
                especially wanted to experiment with noise and how it could lead
                to detection. Enemy AI reacted to sound events such as running
                footsteps or falling objects, but also to players talking to
                each other. The long-term goal was for the game to become a
                tense but humorous stealth experience.
              </Paragraph>

              <SubsectionTitel>Enemy NPC implementation</SubsectionTitel>

              <Paragraph>
                When I joined the project, my task was to refactor the enemy AI,
                which was a landlord roaming the property. In the current state
                the landlord was only able to follow a noise or detect a player
                and walk towards them. I was asked to
                implement an attack state and refactor the AI logic to use
                coroutines. The reason for this was that Godot provides a very
                accessible way to work with coroutines and we wanted to
                evaluate how manageable more complex gameplay logic would be.
                With a simple while loop and the await keyword, it is possible
                to write code that runs once every frame. This structure allows
                us to build layered and more complex AI behavior.
              </Paragraph>

              <CodeBlock code={coroutineSnippet} />

              <Paragraph>
                A major advantage of this approach is readability. The logic can
                be read directly from the code. Our AI will chase a target if
                one exists. Otherwise it will begin searching for the target. If
                it is neither chasing nor searching, the AI will listen for
                noises or fall back to its idle behavior.
              </Paragraph>

              <CodeBlock code={behaviourSnippet} />

              <Paragraph>
                Inside the coroutine functions we define the individual
                behaviors. In this example, the routine handles searching an
                area after the AI loses sight of its target. The AI will search
                for a fixed amount of time defined by `search_time` and will
                abort the coroutine early if a target is found or the timer runs
                out.
              </Paragraph>

              <CodeBlock code={searchSnippet} />

              <Paragraph>
                With this, the refactor for our first enemy, the Landlord, was
                done and he was able to roam, detect players and attack them.
                We even recorded voice lines to give our landlord some
                personality.
              </Paragraph>

              <VideoBlock
                src="/images/projects/hypothermia/EnemyAI.mp4"
                controls={true}
                muted={false}
                autoPlay={false}
              />

              <Paragraph>
                An issue that came up quickly during development with coroutines
                was the challenge of debugging. Because coroutines are used,
                stepping through the code with a debugger becomes more
                difficult. At every await keyword, the debugger logically jumps
                to a different point in the codebase. This sometimes made it
                hard to determine exactly which state caused an error and what
                needed to be fixed. Visibility is key here. A tool that could
                show the current state of the AI would make debugging much
                easier. This is where a Godot extension called{" "}
                <a
                  className="underline"
                  href="https://github.com/limbonaut/limboai"
                >
                  Limbo AI
                </a>{" "}
                came in. It adds behavior trees and a visual editor to Godot.
                Ultimately, the coroutines I implemented are nothing other than
                a behavior tree, so we wanted to try this tool as well.
              </Paragraph>

              <Paragraph>
                With some effort, I was able to transfer the current AI behavior
                controlled by coroutines to Limbo AI and
                restored the previous behavior of the Landlord. As shown in the
                following video, the debug menu displays which state within the
                behavior tree the AI is currently in. This makes it easy to
                trace problems and spot potential bugs.
              </Paragraph>

              <VideoBlock
                src="/images/projects/hypothermia/LimboAI.mp4"
                caption="Limbo AI debug menu within Godot showing Landlord behavior"
              ></VideoBlock>

              <Paragraph>
                After completing the implementation in Limbo AI, I presented my
                findings to our tech lead. It was decided that future AI
                in the game would be implemented using Limbo AI.
              </Paragraph>

              <SubsectionTitel>Inventory System</SubsectionTitel>

              <Paragraph>
                Another task was the implementation of a simple inventory
                system. It allowed players to pick up items, store them in one
                of the inventory slots and throw them away to free up a slot.
                It was important to create a synchronized system so that other
                players could see which item someone was holding in their hand
                or which item they had just thrown away. I also implemented a
                placeholder UI to visualize which items were stored in the
                inventory and which slot was currently active.
              </Paragraph>

              <VideoBlock
                src={"/images/projects/hypothermia/InventorySystem.mp4"}
              ></VideoBlock>

              <Paragraph>
                Another important aspect was handling larger objects like the TV
                shown in the video clip. Large objects were defined as
                non-storable in the inventory. I implemented it in a way that
                any item currently held in the player&apos;s hand would
                automatically be holstered when picking up a large object. If
                the player switched the active inventory slot, the large object
                would be dropped. Parts of this inventory system are still in
                use, although it was refactored in later iterations.
              </Paragraph>

              <SubsectionTitel>Creating a Challenge</SubsectionTitel>

              <Paragraph>
                With the AI in place and the ability to store items, we were
                able to properly test the prototype. But we quickly realized it
                was not enough. While it was fun trying to avoid the landlord,
                we were missing a clear objective, a challenge the players
                needed to overcome. We also wanted to actively encourage
                collaboration, so I implemented a first obstacle tied to the
                main loot. It was a security door with a periodically changing
                access code.
              </Paragraph>

              <div className="sm:flex">
                <VideoBlock
                  src={"/images/projects/hypothermia/SecurityDoor.mp4"}
                ></VideoBlock>
                <VideoBlock
                  src={"/images/projects/hypothermia/DoorCode.mp4"}
                ></VideoBlock>
              </div>

              <Paragraph>
                Players had to use their walkie-talkies to communicate the door
                code so that another player could open the door and start
                looting the main objective, stealing the gold ingots. Both the
                security terminal and the door were placed along the
                landlord&apos;s default patrol path. Because of that, players
                had to stay alert and carefully time their actions to avoid
                getting caught.
              </Paragraph>

              <Paragraph>
                Another idea was traps. Small obstacles scattered around the
                level to make things a bit more difficult for the players. I was
                tasked with implementing a bear trap. As mentioned before, noise
                was meant to play a bigger role in the game, so the bear trap
                would not only stun the player and deal damage, it would also
                attract nearby enemies because of the loud sound it created.
              </Paragraph>

              <VideoBlock
                src={"/images/projects/hypothermia/BearTrap.mp4"}
              ></VideoBlock>

              <Paragraph>
                In this showcase I increased the damage so the player would
                immediately die for demonstration purposes. In the actual
                prototype, the player would get stuck and another teammate had
                to help release them from the trap. These small traps created a
                lot of funny situations during playtests. It was hilarious to
                run from the landlord while the only thing you could hear was
                your colleague stepping into a bear trap with a loud snap.
              </Paragraph>

              <SubsectionTitel>Planning the heist</SubsectionTitel>

              <Paragraph>
                As professional burglars, of course we needed a reliable truck.
                We wanted to experiment with having this kind of base entity
                inside the level, something that felt more meaningful than just
                a storage space for collected loot. So we decided to give the
                truck a bit more purpose. I implemented an interactable laptop
                inside the truck. Once used, it opened a window where players
                could analyze the building layout and gather information about
                important locations within the level.
              </Paragraph>

              <VideoBlock
                src={"/images/projects/hypothermia/LaptopTruck.mp4"}
              ></VideoBlock>

              <Paragraph>
                Through this task I played more around with UI implementation,
                especially in a 3D environment. The laptop screen is a viewport
                texture using a canvas object to display the UI. The same UI is
                also displayed during the starting sequence of the game where
                additional information can be bought for money. In this case I
                enabled all information for showcasing purposes, which can be
                seen under &quot;Location Information&quot;.
              </Paragraph>

              <Paragraph>
                I highlighted some of the key tasks I worked on during the
                prototyping phase, but there were additional systems as well.
                For example, I implemented the logic for handling player death.
                This included applying Godot ragdoll physics, spawning a
                spectator camera and monitoring the lose conditions. I also
                created a scoreboard that was shown at the end of the level once
                either the win condition or the lose condition was fulfilled.
                Going into full detail on all of that would probably go beyond
                the scope of this blog post.
              </Paragraph>

              <SectionTitle>Gameplay Programming Tasks</SectionTitle>

              <Paragraph>
                During the prototyping phase, our project leads came up with a
                new direction for the game. It kept some similar features, but
                the setting changed completely. Instead of burglars, the players
                became Arctic explorers uncovering the secrets of a frozen
                desert. This was also a time when a lot changed in my own life,
                because I started my master&apos;s degree and moved to
                Copenhagen. As a result, I went from working full-time to
                part-time and started working remotely.
              </Paragraph>

              <Paragraph>
                My gameplay programming tasks included implementing the
                cruiser&apos;s engine, its electrical power setup and a
                temperature mechanic that allowed heat to move between rooms.
                Another major part of my work was the player damage logic,
                including knockout and revive mechanics. I also worked on item
                storage and created a synchronized solution for how and where
                items are kept.
              </Paragraph>

              <Paragraph>
                In the following sections, I want to talk about three gameplay
                features that influenced each other but can also be used
                separately. They all came together inside the cruiser, but an
                important part of the game design was that they should also work
                in other contexts. There could, for example, be other engines
                somewhere else in the world, maybe inside a broken cruiser and
                the electrical setup also needed to be reusable in different
                situations. Because of that, I tried to build these modules in a
                way where they did not need to know where they were being used,
                but would always behave consistently.
              </Paragraph>

              <SubsectionTitel>Engine System</SubsectionTitel>

              <Paragraph>
                There was already an existing engine module implemented by our
                tech lead and it exposed a lot of different engine stats. At
                that point, though, many of them were not really being used yet.
                The idea was that the engine should feel like an object in the
                world that needs constant maintenance. My task was to add engine
                parts that introduced new values which influence the engine and 
                are repairable when broken.
              </Paragraph>

              <Paragraph>
                Every engine part is tied to a specific value and directly
                affects how the engine behaves. Parts like the turbocharger increase
                the maximum rpm of the engine but the effect is redeuced depending on the
                turbocharger durability. Others, like the fuel pump, cause the whole engine
                to fail when they break. The engine cooler, on the other hand, is needed 
                to remain a stable engine temperature. This means with less durability
                the engine will start to increase temperature and because is also tied to 
                the temperature system the whole room around the engine will get hotter.
              </Paragraph>

              <Paragraph>
                As an example, here is the code for the turbocharger:
              </Paragraph>

              <CodeBlock code={turboChargerSnippet} />

              <Paragraph>
                "BoostCharge" is the specific value influenced by the
                turbocharger. In the real world, turbochargers generate boost
                based on the amount of exhaust gas the engine produces, so there
                is a direct relationship with RPM. More RPM creates more boost,
                and more boost increases RPM in return. What I found especially
                interesting about this implementation was that it created an
                actual feeling of turbo lag. In real engines, turbo lag happens
                when there is not enough exhaust gas for the turbocharger to
                deliver its full power. We can see a direct relation to my turbocharger implementation
                because in the beginnen the RPM is low and later with a bigger RPM the boost charge
                will increase. The effect of the boost charge on the engine RPM is implemented as follows:
              </Paragraph>

              <CodeBlock code={turboBoost} />

              <Paragraph>
                In total, I worked on five different engine parts, each with its
                own impact on the engine. But of course, we also needed some
                more gameplay around it. This is where the repair mechanic came
                in. A part&apos;s durability always has a direct impact on its
                specific value. For example, a turbocharger with 25% durability
                left has a reduced maximum boost charge.
              </Paragraph>

              <Paragraph>
                The engine parts consist of several different modules and I am
                only showing the ones here that are relevant to the overall
                engine behavior. To apply the durability penalty to a part, I
                created a more general module that is shared across all the
                different engine parts.
              </Paragraph>

              <CodeBlock code={enginePartModule}></CodeBlock>

              <Paragraph>
                This code also handles what happens when an engine part is
                detached. As described earlier, the engine should not work when
                a part like the fuel pump is missing. To actively decrease part
                durability over time, another module is used that periodically
                lowers the quality of an engine part based on RPM and engine
                temperature.
              </Paragraph>

              <CodeBlock code={durabilityModule} />

              <Paragraph>
                To repair an engine part, the player first has to detach it from
                the engine. Since missing parts directly affect engine behavior,
                the engine also needs to react when a component is removed. Once
                detached, the part can be picked up and placed on the workbench,
                which opens the repair UI. After the repair is finished, the
                player can pick up the part again and reattach it to the engine.
                To support this workflow, I reused an existing attachment system
                and used it for both the workbench and the engine itself.
              </Paragraph>

              <VideoBlock
                src={"/images/projects/hypothermia/EngineRepair.mp4"}
              />

              <Paragraph>
                Of course, the engine also needs fuel to run. Part of my work
                was to add refueling to the cruiser&apos;s tank and make sure
                the engine shuts down once that tank is empty. Players can store
                fuel canisters in the cruiser and later use them to transport
                fuel from depots or other tanks in the world. To support that, I
                split the system into two reusable modules: one for storing fuel
                and one for transferring it.
              </Paragraph>

              <Paragraph>
                The fuel storage module is intentionally simple. It keeps track
                of the current fuel level, checks whether a tank is empty or
                full and provides helper functions for increasing or decreasing
                the amount of fuel. That made it easy to plug the same logic
                into different objects while also giving the engine a clear
                source of truth for whether it is still able to run.
              </Paragraph>

              <CodeBlock code={tankModule} />

              <Paragraph>
                The transfer module is a bit more involved because it connects
                directly to our interaction system. It needs to support two
                player actions, filling a tank and pumping fuel out of a tank.
                This is what allows a fuel canister to act as a bridge between
                different fuel sources in the world. In practice, that means the
                same system can be used to move fuel into the cruiser, take fuel
                back out again, or connect other compatible tanks without
                building a separate solution for each case.
              </Paragraph>

              <CodeBlock code={fuelTransferModule} />

              <Paragraph>
                With these two modules in place, players can use fuel canisters
                to keep the cruiser running, but they can also use the exact
                same mechanics in other contexts. That was an important goal
                throughout this feature, because the engine systems were
                designed to work not only inside the cruiser but anywhere else
                in the game world where similar machinery might appear.
              </Paragraph>

              <VideoBlock src={"/images/projects/hypothermia/Fueling.mp4"} />

              <Paragraph>
                Another important detail is that the complete engine logic is
                calculated on the server. Clients only receive the specific
                values they need for feedback, UI, or interactions inside the
                cruiser. This keeps the behavior consistent for all players in
                multiplayer while still allowing the engine to feel responsive
                and readable from the client side.
              </Paragraph>

              <Paragraph>
                Taken together, the engine became much more than a simple object
                that can be switched on and off. Fuel, detachable parts,
                durability and temperature all influence each other, which
                makes the cruiser feel like a machine that players have to
                understand and maintain over time. That interplay was what made
                the system interesting to build, because each individual
                mechanic is useful on its own, but together they create a much
                stronger gameplay loop.
              </Paragraph>

              <SubsectionTitel>Temperature System</SubsectionTitel>

              <Paragraph>
                A big part of the game takes place in the endless cold of
                Antarctica, so temperature plays an important role throughout
                the whole experience. Because of that, I was tasked with
                implementing a system that allows heat sources in the game to
                directly affect the spaces around them. A good example is the
                cruiser, where the engine acts as a heat source and warms up the
                engine room. The system can then transfer heat from one room to
                another, which makes it possible to gradually warm up the whole
                cruiser. The player character is also affected by the
                temperature of the room they are currently in. If they stay in
                the cold for too long, they slowly freeze and eventually get
                knocked out, so they have to search shelter in a warm area.
              </Paragraph>

              <Paragraph>
                I started by creating heat sources with a shared base class that
                other heat sources could inherit from. This base class stores
                the current temperature of the source, its exchange rate and a
                reference to the room the source is affecting.
              </Paragraph>

              <CodeBlock code={temperatureSource} />

              <Paragraph>
                To handle temperature exchange between rooms, I implemented room
                doors as heat sources. I called this module{" "}
                <code>ConnectionTemperatureSource</code>, since it is
                specifically used for transferring heat between connected
                spaces. The module stores a reference to another room, reads
                that room&apos;s current temperature and uses it to influence
                the temperature of the room it belongs to. The connection can
                also be configured with a float value that defines how much heat
                is allowed to pass through. This made it possible to support
                doors that are fully open, fully closed, or somewhere in
                between.
              </Paragraph>

              <CodeBlock code={connectionTemperature} />

              <Paragraph>
                To actually apply temperature to a room, I implemented a room
                temperature module. This module stores references to all heat
                sources inside the room and periodically updates the current
                room temperature based on those sources and the room&apos;s
                volume coefficient. That coefficient lets bigger rooms change
                temperature more slowly than smaller ones. One example of a heat
                source here is the engine, which produces heat based on its RPM.
                If the engine cooler is broken, it produces even more heat, but
                that also puts additional strain on the other engine parts and
                reduces their durability.
              </Paragraph>

              <CodeBlock code={roomTemperature} />

              <Paragraph>
                Finally, I needed to connect the temperature system to the
                player so it would have a real gameplay impact. The player has a
                freezing state that tracks how far the freezing process has
                progressed. Depending on the current temperature of the room the
                player is currently in, I decrease or increase the freezing
                state. Based on that value, the character receives a movement
                speed penalty. I implemented this by defining a freeze speed
                reduction that is sampled through a curve using the current
                freezing state as input.
              </Paragraph>

              <CodeBlock code={characterTemperature} />

              <SubsectionTitel>Electricity System</SubsectionTitel>

              <Paragraph>
                We need power, so I was tasked with implementing a small
                electricity system for the game. Electricity affects objects
                such as light sources and the engine ignition button, which
                means the system needed to be flexible enough to support
                different kinds of gameplay interactions. To generate power, I
                implemented an alternator that produces electricity and feeds it
                into a battery. That battery can then be charged or discharged
                depending on what is currently connected to it.
              </Paragraph>

              <Paragraph>
                A key part of the system was making batteries reusable across
                different objects. The cruiser, for example, needs its own
                battery, but portable equipment such as the player&apos;s
                flashlights also relies on one. Because of that, I structured
                the system around three simple building blocks: electricity
                producers, electricity consumers and batteries that store the
                energy. Producers and consumers are fairly lightweight, since
                they mainly contribute a value that increases or decreases the
                battery load and that value can also be changed dynamically
                during gameplay.
              </Paragraph>

              <CodeBlock code={batteryModule} />

              <Paragraph>
                The battery itself is responsible for tracking all active
                producers and consumers and periodically updating its current
                charge based on their combined values. In addition to that, I
                introduced a voltage value that makes it possible to detect when
                the system is overloaded. If too many consumers are active at
                the same time, the voltage drops and connected devices can start
                to fail. This gave the whole setup a more believable behavior
                and made electricity feel like an actual gameplay system rather
                than just a simple on and off switch.
              </Paragraph>

              <SubsectionTitel>Player Knockout & Revive</SubsectionTitel>

              <Paragraph>
                Fail states matter because they give the game real tension and make 
                success feel earned. In our game, players fail when every character 
                in the team has been knocked out and there is no way to bring them back.
                I worked on several parts of that system. When a character is knocked 
                out, they are replaced by a new mesh representing their unconscious 
                body, which other players can pick up and carry. I also implemented 
                a spectator camera so knocked-out players can continue following 
                the match by switching between their active teammates. To complete 
                the loop, I created a revive mechanic tied to the cruiser bunk bed, 
                allowing characters to respawn and rejoin the game.
              </Paragraph>

              <Paragraph>
                I implemented a function and registered it on the player
                character so a character can be knocked out from anywhere in the
                codebase. If the character is not already unconscious, the
                function sets the unconscious boolean to true. The actual
                knockout logic is then handled through a callback that is
                triggered when this value changes. This includes disabling the
                player character, spawning the knocked out body mesh and
                switching the player camera to the spectator camera through the player
                interaction mode.
              </Paragraph>

              <CodeBlock code={knockout} />

              <Paragraph>
                As an example, this is the code the cruiser uses to run over
                player characters. It uses a simple collision shape that knocks
                out the hit player based on the current velocity of the
                referenced physics object.
              </Paragraph>

              <CodeBlock code={knockoutMover} />

              <Paragraph>
                With this logic in place, I was able to drive over the character
                and knock them out during gameplay. This was useful because it
                let me properly test the full knockout flow in an actual game
                situation instead of only triggering it manually through code.
                It also helped show that the knockout state worked correctly
                when caused by a moving gameplay object like the cruiser, which
                made the whole feature feel much more grounded in the game.
              </Paragraph>

              <VideoBlock src={"/images/projects/hypothermia/DriveOver.mp4"} />

              <Paragraph>
                One of the design constraints we have for the game is that a
                player is never truly dead. As long as there is another player
                who can still revive them, the body can be rescued. Players can
                pick up the unconscious body and carry it back to the cruiser to
                respawn them, or use a medkit to revive them on the spot. I
                implemented a function which can be used to respawn the player
                at a specific position, which can also be seen in the code block
                above. To revive the player in the cruiser, the unconscious body
                gets attached to the bunk bed and after a duration of 5 seconds
                the player respawns.
              </Paragraph>

              <VideoBlock src={"/images/projects/hypothermia/Revive.mp4"} />

              <SectionTitle>Networking Tasks</SectionTitle>

              <Paragraph>
                While I really enjoy developing gameplay mechanics and designing
                game systems, networking technology definitely also became a big
                interest of mine. Most of my favorite games are multiplayer
                games or at least support co-op in some form. As soon as I felt
                more confident working on high-level synchronized systems, I
                wanted to dig deeper and started focusing more on the networking
                side of Hypothermia.
              </Paragraph>

              <SubsectionTitel>Physics Synchronization</SubsectionTitel>

              <Paragraph>
                One of my first networking tasks was fixing a bug in our physics
                synchronization. In Hypothermia we have three different kinds of
                physics objects that need synchronized state: player characters,
                pickup objects and the cruiser. The cruiser in particular was
                causing trouble. Even when standing still the cruiser was twitching
                up and down. Our state synchronization works by having
                the authority calculate the current physics state of an object
                and then send that state to the other clients.
              </Paragraph>

              <Paragraph>
                Because there is always a delay between sending a state packet
                and receiving it, the missing physics steps get resimulated on
                the clients. After digging into the cruiser issue, I found out
                that the more physics steps the cruiser had to resimulate, the
                bigger the jump became. And if we really push it and try to
                resimulate more than 100 steps, which can happen during a big
                lag spike, we start getting some very interesting behavior...
              </Paragraph>

              <VideoBlock src="/images/projects/hypothermia/CruiserBackflip.mp4" />

              <Paragraph>
                Probably a good mechanic for one of the Tony Hawk games, but not
                really feasible for Hypothermia. The problem was that our
                resimulation only applied the physics step of the object itself
                and not a full physics engine step, because doing that properly
                every time would of course be way too expensive. But that also
                meant gravity was not being integrated during resimulation, so
                we started accumulating a strong upward force which caused the
                jumping.
              </Paragraph>

              <Paragraph>
                The actual implementation of the fix was only a few lines of
                code, but getting there was much more of a research task. Since
                we are using Jolt as the physics engine, I had to go through the
                codebase and figure out what a normal physics step actually
                looks like and what exactly we were missing in our resimulation
                step.
              </Paragraph>

              <CodeBlock code={physicsIntegrateion} />

              <Paragraph>
                I implemented a new method directly within the Jolt source code
                and called it <code>simple_physics_step</code>. The most
                important part here is <code>_integrate_forces</code>. It is a
                member function of <code>JoltBody3D</code> and updates linear
                and angular velocity based on damping and gravity. With{" "}
                <code>simple_physics_step</code> I created a function that can
                be called from GDScript to get a much better result during
                physics resimulation.
              </Paragraph>

              <CodeBlock code={physicsResimulation} />

              <Paragraph>
                Inside our GDScript code I could now call this new function and
                integrate the missing forces. That made the physics resimulation
                much more stable and stopped the cruiser from bouncing around,
                even during heavy lag spikes.
              </Paragraph>

              <Paragraph>
                The state synchronization in the project is inspired by the{" "}
                <a
                  className="underline"
                  href="https://gafferongames.com/post/state_synchronization/"
                >
                  State Synchronization Article
                </a>{" "}
                by Glenn Fiedler. Since he does not really go into frame
                resimulation, I also wanted to test how the game feels without
                using it at all.
              </Paragraph>

              <div className="flex">
                <VideoBlock
                  src="/images/projects/hypothermia/PhysicsNoResimulation.mp4"
                  caption="No physics step resimulation, smoother movement of the player on the right"
                />
                <VideoBlock
                  src="/images/projects/hypothermia/PhysicsResimulation.mp4"
                  caption="With physics step resimulation, jerky movement of the player on the right"
                />
              </div>

              <Paragraph>
                Resimulation gives a more accurate representation of the server
                state, but especially with faster movement you can also clearly
                see how much jerkier it looks. Our current network setup is a
                mesh, so clients have authority over their own player character
                and are the ones calculating the current physics state and
                sending it to the other connected peers.
              </Paragraph>

              <Paragraph>
                The cruiser, on the other hand, is handled by the client that is
                hosting the game. That means other clients controlling the
                cruiser can feel the movement lagging a bit behing, because they first have to send
                their input to the authority, then the physics state gets
                calculated there and only after that gets sent back. Therefore,
                with the physics resimulation we get a more accurate result of the current
                cruiser position. We have not fully decided yet whether resimulation feels better or not,
                so I added toggle buttons to our settings menu to enable and
                disable it for better testing.
              </Paragraph>

              <SubsectionTitel>Godot Multiplayer Refactor</SubsectionTitel>

              <Paragraph>
                Creating multiplayer games in Godot is still something fairly
                new and there are not that many shipped examples yet. The
                default networking implementation is a fast and accessible way
                to get a multiplayer project running, but for our project it
                relied on features we did not want to build around, especially
                things like <code>MultiplayerSynchronizer</code> and{" "}
                <code>MultiplayerSpawner</code>. Because of that, we decided to
                refactor the networking layer and that became one of the tasks
                I was responsible for.
              </Paragraph>

              <Paragraph>
                The main goal was to move away from relying so heavily on
                Godot&apos;s default <code>MultiplayerAPI</code> and build a
                setup that gives us more direct control over authority, message
                routing and peer-to-peer communication. I ended up working on a
                custom networking layer around our Communication Line System,
                direct <code>MultiplayerPeer</code> access and mesh support for
                both gameplay and voice chat. That work changed a lot under the
                hood, but for the project the most important result was simply
                that we had more control and a better foundation for the kind of
                co-op game we were building.
              </Paragraph>

              <Paragraph>
                Since that refactor grew into a much bigger task on its own, I
                wrote a separate breakdown in my{" "}
                <a className="underline" href="/projects/godot-networking">
                  Custom Multiplayer Networking in Godot
                </a>{" "}
                project page. There I go much deeper into the actual
                architecture, the mesh implementation and the problems I had to
                solve while changing that part of the engine.
              </Paragraph>

              <SubsectionTitel>Late Joining & Package Chunking</SubsectionTitel>

              <Paragraph>
                Late joining is important for Hypothermia because players need
                to be able to reconnect after a disconnect or a game crash.
                Earlier in development this already worked, but as the project
                kept growing, that feature needed maintenance to keep working
                reliably. So I started digging into why late joining had broken
                down and fixed the issues one by one.
              </Paragraph>

              <Paragraph>
                Some of the bugs were relatively small on their own, but
                together they made reconnecting very unreliable. Pickups could
                for example be synchronized as if they were already in a
                player&apos;s hand, but never actually get attached visually.
                Another issue came from scene loading. During loading the game
                process was paused, which meant the <code>MultiplayerPeer</code>{" "}
                stopped polling and could trigger a disconnect right in the
                middle of the connection flow. Late joining mostly failed
                because of a lot of problems like that stacking on top of each
                other.
              </Paragraph>

              <Paragraph>
                The biggest issue showed up when reconnecting through Epic
                Online Services. EOS only allows packets up to 1170 bytes, but
                for a reconnect I need to send the full current game state as a
                one-time packet. Once the project became larger, that packet
                could exceed the limit, so I needed a way to split it up and
                still reconstruct it correctly on the other side.
              </Paragraph>

              <Paragraph>
                To solve that, I implemented packet slicing based on Glenn
                Fiedler&apos;s article{" "}
                <a
                  className="underline"
                  href="https://gafferongames.com/post/sending_large_blocks_of_data/"
                >
                  Sending Large Blocks of Data
                </a>
                . The basic idea is to detect packets that are too large, treat
                them as a chunk and split that chunk into smaller slices. Those
                slices are then sent individually and recreated by the receiver
                once all of them arrived. The important part here is
                reliability. If a chunk is split into 256 slices, even a small
                packet loss rate gives you a very high chance of losing the
                whole reconstructed packet, because every single slice matters.
                Glenn also shows how to build custom reliability, but in my case
                I did not need to reimplement that part because Godot already
                provides reliable packet delivery. So I could focus on slicing
                and reassembling the chunk.
              </Paragraph>

              <Paragraph>
                On the sender side, I first calculate how many slices are needed
                and check that the packet still stays within the limits I
                defined for chunked data. After that, the packet is split into
                equally sized slices, with only the last slice being smaller if
                needed. Each slice gets its own metadata, including the chunk
                id, the total number of slices, the current slice index and the
                size of the contained data, before it is sent to the target
                peer.
              </Paragraph>

              <CodeBlock code={chunkSender} language="cpp" />

              <Paragraph>
                On the receiving side, I created a <code>ChunkReceiver</code>
                that collects slices until a full chunk can be rebuilt. One
                important detail here is that I do not just key the data by
                chunk id, but by a combination of sender peer id and chunk id.
                That way multiple chunk transfers can exist at the same time
                without colliding. The receiver stores which slices already
                arrived, ignores duplicates and only knows the final total
                packet size once the last slice has been received. As soon as
                all slices are there, the rebuilt packet is passed back into the
                normal <code>process_packet</code> flow, so the rest of the
                networking code can handle it like any other packet.
              </Paragraph>

              <CodeBlock code={chunkReceiver} language="cpp" />

              <SubsectionTitel>Connection Stability</SubsectionTitel>

              <Paragraph>
                In our playtests we suffered more and more from disconnects,
                especially during the connection phase of the clients. To detect
                these problems and find potential solutions, I tried to stress
                test the game. I used a third-party tool called{" "}
                <a className="underline" href="https://jagt.github.io/clumsy/">
                  Clumsy
                </a>
                . With this tool I was able to test under heavy lag, packet
                loss, or out of order packets.
              </Paragraph>

              <Paragraph>
                With this setup in place, I started cleaning up the
                initialization process during the connection phase. There was
                still some leftover code from our prototyping phase, so I
                removed parts that were no longer needed and adjusted the order
                in which clients get initialized. We also had issues with forced
                disconnects. In some cases the host would crash when a client
                tried to leave, so I worked on stabilizing that flow and also
                implemented the option to leave the game scene and return to the
                lobby UI while keeping all players in the lobby.
              </Paragraph>

              <Paragraph>
                This is still an ongoing task and I always keep an eye on
                potential networking issues during development. Over time I
                managed to reduce the number of disconnects during playtests,
                and we can already test the game with noticeably fewer
                networking problems than before.
              </Paragraph>

              <Paragraph>
                The lobby UI itself also became part of my stability work. There
                was no proper exception handling for wrong IP addresses or
                invalid Epic IDs when trying to connect. I added handling for
                those cases and also implemented the ability to disconnect from
                the lobby UI and reconnect again afterwards.
              </Paragraph>
            </div>
          </div>
        </div>
      </section>

      <PageStyling />
    </>
  );
};

export default BlogPage;
