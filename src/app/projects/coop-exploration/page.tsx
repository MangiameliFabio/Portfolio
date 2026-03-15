import Image from "next/image";
import { Metadata } from "next";
import BlogTitle from "@/components/Blog/BlogTitel";
import SectionTitle from "@/components/Blog/SectionTitel";
import ImageBlock from "@/components/Blog/ImageBlock";
import VideoBlock from "@/components/Blog/VideoBlock";
import Statistics from "@/components/Blog/Statistics";
import TagButton from "@/components/Blog/TagButton";
import Paragraph from "@/components/Blog/Paragraph";
import BlogLink from "@/components/Blog/BlogLink";
import BulletList from "@/components/Blog/BulletList";
import CodeBlock from "@/components/Blog/CodeBlock";
import { coroutineSnippet, behaviourSnippet, searchSnippet } from "@/code/gdScriptSnippets";
import SubsectionTitel from "@/components/Blog/SubsectionTitel";
import TableOfContents from "@/components/Blog/TableOfContents";
import Roles from "@/components/Blog/Roles";
import PageStyling from "@/components/Common/PageStyling";
import { getPortfolioProjectByLink } from "@/data/portfolioProjects";


export const metadata: Metadata = {
  title: "Custom Multiplayer Networking in Godot",
  description: "Custom Multiplayer Networking in Godot",
};

const tags = getPortfolioProjectByLink("/projects/coop-exploration")?.tags ?? [];

const BlogPage = () => {
  return (
    <>
      <section className="pt-[50px] md:pb-[100px] lg:pt-[80px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full lg:w-8/12 mb-10 md:mb-50">
                <BlogTitle>
                  Custom Multiplayer Networking in Godot
                </BlogTitle>

                <div className="z-20 mb-2 md:mb-6 flex flex-wrap">
                  {tags.map((tag, index) => (
                    <TagButton key={index} text={tag}/>
                  ))}
                </div>

                <div className="border-body-color/20  border-b md:border-none mb-2 md:mb-6">
                <Statistics
                  stat={{
                    orgaType: "Company",
                    orgaName: "Chasing Carrots",
                    game: "Unanounced Titel",
                    date: "2025",
                    duration: "1.5 years",
                    teamSize: "10"
                  }}/>
                </div>

                <Roles roles={["Game Programmer", "Engine Programmer", "Network Programmer"]}></Roles>

                <Paragraph>
                  The longest time during my work at Chasing Carrots I was assigned to an unannounced title. It’s a cooperative exploration game where players step into the role of Arctic researchers and pilot a massive cruiser across a white frozen wasteland, searching for and investigating mysterious anomalies.

                  The project went through many iterations. At the beginning of our prototyping phase, the original idea was very different from what it eventually became. Here I want to talk about the steps I went through and how I was able to support and accompany the project’s development, from the first prototype all the way to the MVP.

                  The project is still in development, with an early access release currently planned for the end of 2026.
                </Paragraph>

                <BlogLink title="Chasing Carrots custom Godot fork: " link="https://github.com/ChasingCarrots/godot/commits/frozen_bulgur/?author=MangiameliFabio" linkName="My commits"/>

                <VideoBlock src={"/images/projects/frozen-bulgur/FrozenBulgurShowCasePart1.mp4"} startTime={20}/>

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

                <VideoBlock src="/images/projects/frozen-bulgur/EnemyAI.mp4" controls={true} muted={false} autoPlay={false}/>

                <Paragraph>
                  An issue that came up quickly during development with coroutines was the challenge of debugging. Because coroutines are used, stepping through the code with a debugger becomes more difficult. At every await keyword, the debugger logically jumps to a different point in the code base. This sometimes made it hard to determine exactly which state caused an error and what needed to be fixed. Visibility is key here. A tool that could show the current state of the AI would make debugging much easier. This is where a Godot extension called{" "}
                  <a className="underline" href="https://github.com/limbonaut/limboai">Limbo AI</a> {" "}
                  came in. It adds behavior trees and a visual editor to Godot. Ultimately, the coroutines I implemented are nothing other than a behavior tree, so we wanted to try this tool as well.
                </Paragraph>

                <Paragraph>
                  With some effort, I was able to transfer the current AI behavior controlled by coroutines to a Limbo AI behavior tree and restored the previous behavior of the Landlord. As shown in the following video, the debug menu displays which state within the behavior tree the AI is currently in. This makes it easy to trace problems and spot potential bugs.
                </Paragraph>

                <VideoBlock src="/images/projects/frozen-bulgur/LimboAI.mp4" caption="Limbo AI debug menu within Godot showing Landlord behavior"></VideoBlock>

                <Paragraph>
                  After completing the implementation in Limbo AI, I presented my findings to our engineering lead. It was decided that future AI in the game would be implemented using Limbo AI. In the current state of the project, Limbo AI is also in use for enemies within the anomalies.
                </Paragraph>

                <SubsectionTitel>
                  Burglars need an Inventory
                </SubsectionTitel>

                <Paragraph>
                  Another task was the implementation of a simple inventory system. It allowed players to pick up items, store them in one of the inventory slots, and throw them away to free up a slot. It was important to create a synchronized system so that other players could see which item someone was holding in their hand or which item they had just thrown away. I also implemented a placeholder UI to visualize which items were stored in the inventory and which slot was currently active.
                </Paragraph>

                <VideoBlock src={"/images/projects/frozen-bulgur/InventorySystem.mp4"} ></VideoBlock>

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
                  <VideoBlock src={"/images/projects/frozen-bulgur/SecurityDoor.mp4"}></VideoBlock>
                  <VideoBlock src={"/images/projects/frozen-bulgur/DoorCode.mp4"}></VideoBlock>
                </div>

                <Paragraph>
                  Players had to use their walkie talkies to communicate the door code so that another player could open the door and start looting the main objective, stealing the gold ingots. Both the security terminal and the door were placed along the landlord’s default patrol path. Because of that, players had to stay alert and carefully time their actions to avoid getting caught.
                </Paragraph>

                <Paragraph>
                  Another idea were traps. Small obstacles scattered around the level to make things a bit more difficult for the players. I was tasked with implementing a bear trap. As mentioned before, noise was meant to play a bigger role in the game, so the bear trap would not only stun the player and deal damage, it would also attract nearby enemies because of the loud sound it created.
                </Paragraph>

                <VideoBlock src={"/images/projects/frozen-bulgur/BearTrap.mp4"}></VideoBlock>

                <Paragraph>
                  In this showcase I increased the damage so the player would immediately die for demonstration purposes. In the actual prototype, the player would get stuck and another teammate had to help release them from the trap. These small traps created a lot of funny situations during playtests. It was hilarious to run from the landlord while the only thing you could hear was your colleague stepping into a bear trap with a loud snap.
                </Paragraph>

                <SubsectionTitel>
                  The Most Important Team Member: The Truck
                </SubsectionTitel>

                <Paragraph>
                  As professional burglars, of course we needed a reliable truck. We wanted to experiment with having this kind of base entity inside the level, something that felt more meaningful than just a storage space for collected loot. So we decided to give the truck a bit more purpose. I implemented an interactable laptop inside the truck. Once used, it opened a window where players could analyze the building layout and gather information about important locations within the level.
                </Paragraph>

                <VideoBlock src={"/images/projects/frozen-bulgur/LaptopTruck.mp4"}></VideoBlock>

                <Paragraph>
                  Through this task I played more around with UI implementation, espacially in a 3D environment. The laptop screen is a viewport texture using a canvas object to display the UI.
                  The same UI is also dispayed during the starting sequence of the game where additional informations can be bought for money. In this case I enabled all informations for showcasing purposes which can be seen  under "Location Information".
                </Paragraph>

                <Paragraph>
                  I highlighted some of the key tasks I worked on during the prototyping phase, but there were additional systems as well. For example, I implemented the logic for handling player death. This included applying Godot ragdoll physics, spawning a spectator camera, and monitoring the lose conditions. I also created a scoreboard that was shown at the end of the level once either the win or lose condition was fulfilled. Going into full detail on all of that would probably go beyond the scope of this blog post.
                </Paragraph>

                <SectionTitle>Implementation of Gameplay Logic</SectionTitle>
                <SubsectionTitel>Engine System</SubsectionTitel>
                <SubsectionTitel>Electrical Power System</SubsectionTitel>
                <SubsectionTitel>Knocking out Players</SubsectionTitel>
                <SectionTitle>Implementation of Networking Features</SectionTitle>
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
