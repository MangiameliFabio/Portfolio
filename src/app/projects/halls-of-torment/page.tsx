import { Metadata } from "next";
import Statistics from "@/components/Blog/Statistics";
import TagButton from "@/components/Blog/TagButton";
import SectionTitle from "@/components/Blog/SectionTitel";
import BlogTitle from "@/components/Blog/BlogTitel";
import Paragraph from "@/components/Blog/Paragraph";
import BulletList from "@/components/Blog/BulletList";
import ImageBlock from "@/components/Blog/ImageBlock";
import VideoBlock from "@/components/Blog/VideoBlock";
import Roles from "@/components/Blog/Roles";
import TableOfContents from "@/components/Blog/TableOfContents";
import { getPortfolioProjectByLink } from "@/data/portfolioProjects";

export const metadata: Metadata = {
  title: "Performance optimizations for Halls of Torment",
  description: "Performance optimizations for Halls of Torment",
};

const tags = getPortfolioProjectByLink("/projects/halls-of-torment")?.tags ?? [];

const BlogPage = () => {
  return (
    <section className="pt-[50px] md:pb-[100px] lg:pt-[80px]">
      <div className="container">
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-8/12 mb-10 md:mb-50">
              <BlogTitle>
                Performance optimizations for Halls of Torment
              </BlogTitle>

              <div className="z-20 mb-2 md:mb-6 flex flex-wrap">
                {tags.map((tag, index) => (
                  <TagButton key={index} text={tag}/>
                ))}
              </div>

              {/* Meta */}
              <div className="border-body-color/20  border-b md:border-none mb-2 md:mb-6">
              <Statistics
                stat={{
                  orgaType: "Company",
                  orgaName: "Chasing Carrots",
                  game: "Halls of Torment",
                  date: "2024",
                  duration: "2 Month",
                  teamSize: "10"
                }}/>
              </div>

              <Roles roles={["Game Programmer", "Engine Programmer"]}></Roles>

              <Paragraph>
                When I joined Chasing Carrots in 2024 as a Game Programmer, my very first assignment was performance. Halls of Torment was still in early access and nearing its console push, and the team had a clear concern: late-game runs were struggling.

                As a survivor-like game, the final minutes can fill the screen with hundreds of active entities, projectiles, effects, and status systems. On PC this already caused frame instability. For consoles, this wasn’t just a polish issue, it was a release blocker.
              </Paragraph>

              <BulletList 
                title={"My task where the following:"} 
                items={[
                  "Migrate profiling infrastructure from Optick to Tracy",
                  "Identify and resolve the major runtime bottlenecks in heavy gameplay scenarios",
                  "Migrate project to Godot version 4.3"
                ]}/>

              <Paragraph>
                This became a deep dive into engine-level performance work.
              </Paragraph>

              <TableOfContents />

              <SectionTitle>Integrating Tracy</SectionTitle>

              <Paragraph>
                Before optimizing anything, I first needed better visibility into runtime behavior.

                I integrated Tracy directly into our custom C++ Godot engine build, adjusting existing profiling markers and adding a dedicated profiling trigger. Halls of Torment includes an automated debug player that can run full game runs using predefined ability builds. To test the game, it is then executed with accelerated speed and automatically trigger Tracy once a specific in-game time threshold was reached. Around the 25-minute mark, where performance issues were most noticeable.

                At that moment, Tracy launched as a background process, recorded a 5-second capture window, and saved the profiling trace for analysis. This allowed me to consistently gather comparable performance samples from late-game scenarios without manual intervention.

                With this pipeline in place, I focused on recording character builds that generated extreme projectile counts near the end of a run. The captured traces revealed issues in the following cases:
              </Paragraph>

              <ImageBlock src={"/images/projects/halls-of-torment/ProfilerScreenshot.png"} caption={"Tracy profiling view with in game screenshot of the frame"} height={400}/>

              <BulletList 
                title={"The captured traces revealed issues in the following cases:"} 
                items={[
                  "Excessive allocations during gemstone cluster spawning",
                  "Expensive per-frame status effect updates",
                  "Repeated global position calculations for frequently accessed objects"
                ]}/>

              <Paragraph>
                These weren’t catastrophic individually, but compounded under load, they created spikes and instability.

                The optimization work that followed targeted exactly those hot paths.
              </Paragraph>

              <SectionTitle>Object Pooling and Threading</SectionTitle>

              <Paragraph>
              Allocating new memory is always a source of performance hits in games. While it is not possible to completely prevent runtime allocations, the overhead can be reduced. During profiling I detected that spawning props had a noticeably high function runtime. In Halls of Torment, props are destructible level objects that drop loot when the player interacts with them. The issue was that these props were being respawned frequently. When players left an area and later returned, the spawning logic triggered again. This did not only recreate the prop itself but also the loot attached to it, multiplying the cost.

              In Godot, instantiating objects can happen in a worker thread, but attaching them to the scene tree must happen on the main thread. I reduced the spawning overhead by moving the instantiation of props and their loot into a worker thread. To further improve performance, destroyed props were added to an object pool instead of freeing their memory, allowing them to be reused.
              </Paragraph>

              <Paragraph>
              Another system that was not using object pooling was gemstone spawning and clustering. Gems are picked up by the player to gain experience. When the item “Gem Vortex” is used, all gems on the map are attracted to the player at once, which causes a large number of gems to spawn and can lead to lag spikes.
              Therfore I modified the spawn behavoir of gem stones to use an object pool as well.
              </Paragraph> 

              <VideoBlock src={"/images/projects/halls-of-torment/hot-clustering.mp4"} caption="Showcasing the clustering of gem stones"/>

              <Paragraph>
                When too many gems are located in a small area, they are replaced by a cluster object. While investigating this system, I found that clustering could be triggered multiple times in parallel. This caused several clusters to be instantiated even though only one was actually used. I changed the behavior so only a single cluster can be created per event, which further improved overall performance.
              </Paragraph>

              <SectionTitle>Time Slicing the Frost Status Effect</SectionTitle>
              
              <Paragraph>
              In Halls of Torment, enemies afflicted with the status effect “Frost” store incoming damage and later release it as a Frost Wave. During runs with the Norseman I noticed heavy lag spikes whenever many Frost Waves were triggered at the same time. The issue came from the Frost Wave behaving like a chain reaction. One wave could immediately trigger additional waves, and in extreme situations a single Frost Wave was able to cascade across 50 enemies in the same frame.

              To solve this, I implemented time slicing for the Frost effect. A Frost Wave can no longer trigger another wave during the same frame. Instead, the follow-up trigger is deferred to the next frame. This spreads the workload over time and significantly reduces frame spikes.

              An interesting side effect is that the chain reaction is now more readable visually. Instead of one large Frost explosion that was often hidden by lag, players can clearly see the reaction propagate across enemies, which actually improves the feel of the effect.
              </Paragraph>

              <VideoBlock src={"/images/projects/halls-of-torment/hot-ice-effect.mp4"} caption="Norseman gameplay stacking frost status effects"/>

              <SectionTitle>Global Position Caching</SectionTitle>
              
              <Paragraph>
                When using GDScript there is always some overhead as a tradeoff. Because of how game objects are structured in Halls of Torment, accessing an object’s global position required multiple GDScript calls. The position itself was not stored directly on the game object, but on a separate position provider. Whenever another node needed the position, it first had to ask the game object, which then queried its position provider and returned the value back to the caller. This indirection added unnecessary overhead, especially when repeated thousands of times per frame.
              </Paragraph>

              <Paragraph>
                To reduce redundant computation, I implemented a global position cache in C++. Position providers now write their updated transforms directly into this cache, which is exposed to GDScript. Systems that need object positions can read precomputed values instead of triggering repeated transform lookups.

                This was a relatively small architectural change, but multiplied across thousands of objects each frame, it resulted in meaningful performance savings.
              </Paragraph>

              <SectionTitle>Updating Godot to 4.3</SectionTitle>
              
              <Paragraph> 
                Engine updates can always introduce a lot of bugs into a project. But when using a relatively young engine like Godot, major updates also add many useful features. In this case, our lead programmer wanted to take advantage of performance improvements and bug fixes in the engine code. Version 4.3 fixed several issues in resource loading, which Halls of Torment relies on heavily. Because of that, our custom Godot fork needed to be merged with the new version. 
              </Paragraph> 
              
              <Paragraph> 
                My task was to migrate the Halls of Torment project to this new version. The project is fairly large, so there were many places where things could break. When I first launched the game with the updated engine, I was met with errors across different parts of the codebase. Some deprecated function calls had to be replaced, editor scenes needed adjustments, and there were many smaller fixes required to make everything compatible again.

                This process was very insightful because it forced me to explore areas of the codebase I had not touched before and gave me a broader understanding of the game’s architecture. It strengthened my ability to read unfamiliar code and understand complex systems.
              </Paragraph>

          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
