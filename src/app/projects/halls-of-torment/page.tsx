import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rewriting Godot’s Multiplayer Layer",
  description: "Custom multiplayer networking architecture in Godot",
};

const tags = ["C++", "GDScript", "Godot", "Tracy"];

const BlogPage = () => {
  return (
    <section className="pt-[150px] pb-[120px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4 lg:w-8/12">
            <div>

              <h1 className="border-body-color/20 border-b mb-10 pb-4 text-3xl font-bold sm:text-4xl text-black dark:text-white">
                Performance optimizations for Halls of Torment
              </h1>

              <div className="z-20 mb-6 flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-primary rounded-full px-4 py-2 text-sm font-semibold text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Meta */}
              <div className="border-body-color/10 mb-10 border-b pb-4">
                <div className="mb-6 flex flex-wrap items-center">
                  <div className="border-body-color/20 border-r pr-5 mr-5">
                    <p className="text-sm text-slate-400">Organization</p>
                    <h4 className="font-medium text-white">
                      Chasing Carrots
                    </h4>
                  </div>

                  <div className="border-body-color/20 border-r px-5 mr-5">
                    <p className="text-sm text-slate-400">Game</p>
                    <h4 className="font-medium text-white">
                      Halls of Torment
                    </h4>
                  </div>

                  <div className="border-body-color/20 border-r px-5 mr-5">
                    <p className="text-sm text-slate-400">Date</p>
                    <h4 className="font-medium text-white">2024</h4>
                  </div>

                  <div className="px-5">
                    <p className="text-sm text-slate-400">Duration</p>
                    <h4 className="font-medium text-white">2 Months</h4>
                  </div>
                </div>
              </div>

              <p className="text-slate-400 mb-5 text-lg leading-relaxed">
                When I joined Chasing Carrots in 2024 as a Game Programmer, my very first assignment was performance. Halls of Torment was still in early access and nearing its console push, and the team had a clear concern: late-game runs were struggling.

                As a survivor-like game, the final minutes can fill the screen with hnudreds of active entities, projectiles, effects, and status systems. On PC this already caused frame instability. For consoles, this wasn’t just a polish issue, it was a release blocker.
              </p>

              <p className="text-slate-400 mb-2 text-lg leading-relaxed">
                My task where the following:
              </p>

              <ul className="text-slate-400 mb-5 list-disc list-inside space-y-2">
                <li>Migrate profiling infrastructure from Optick to Tracy</li>
                <li>Identify and resolve the major runtime bottlenecks in heavy gameplay scenarios</li>
                <li>Migrate project to Godot version 4.3</li>
              </ul>

              <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                This became a deep dive into engine-level performance work.
              </p>

              <SectionTitle>Integrating Tracy</SectionTitle>

              <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                Before optimizing anything, I first needed better visibility into runtime behavior.

                I integrated Tracy directly into our custom C++ Godot engine build, adjusting existing profiling markers and adding a dedicated profiling trigger. Halls of Torment includes an automated debug player that can run full game runs using predefined ability builds. To test the game, it is then executed with accelerated speed and automatically trigger Tracy once a specific in-game time threshold was reached. Around the 25-minute mark, where performance issues were most noticeable.

                At that moment, Tracy launched as a background process, recorded a 5-second capture window, and saved the profiling trace for analysis. This allowed me to consistently gather comparable performance samples from late-game scenarios without manual intervention.

                With this pipeline in place, I focused on recording character builds that generated extreme projectile counts near the end of a run. The captured traces revealed issues in the following cases:
              </p>

              <ImageBlock src={"/images/projects/halls-of-torment/ProfilerScreenshot.png"} caption={"Tracy profiling view with in game screenshot of the frame"} height={400}/>

              <p className="text-slate-400 mb-2 text-lg leading-relaxed">
                The captured traces revealed issues in the following cases:
              </p>

              <ul className="text-slate-400 mb-5 list-disc list-inside space-y-2">
                <li>Excessive allocations during gemstone cluster spawning</li>
                <li>Expensive per-frame status effect updates</li>
                <li>Repeated global position calculations for frequently accessed objects</li>
              </ul>

              <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                These weren’t catastrophic individually, but compounded under load, they created spikes and instability.

                The optimization work that followed targeted exactly those hot paths.
              </p>

              <SectionTitle>Object Pooling and Threading</SectionTitle>

              <p className="text-slate-400 mb-5 text-lg leading-relaxed">
              Allocating new memory is always a source of performance hits in games. While it is not possible to completely prevent runtime allocations, the overhead can be reduced. During profiling I detected that spawning props had a noticeably high function runtime. In Halls of Torment, props are destructible level objects that drop loot when the player interacts with them. The issue was that these props were being respawned frequently. When players left an area and later returned, the spawning logic triggered again. This did not only recreate the prop itself but also the loot attached to it, multiplying the cost.

              In Godot, instantiating objects can happen in a worker thread, but attaching them to the scene tree must happen on the main thread. I reduced the spawning overhead by moving the instantiation of props and their loot into a worker thread. To further improve performance, destroyed props were added to an object pool instead of freeing their memory, allowing them to be reused.
              </p>

              <p className="text-slate-400 mb-10 text-lg leading-relaxed">
              Another system that was not using object pooling was gemstone spawning and clustering. Gems are picked up by the player to gain experience. When the item “Gem Vortex” is used, all gems on the map are attracted to the player at once, which causes a large number of gems to spawn and can lead to lag spikes.
              Therfore I modified the spawn behavoir of gem stones to use an object pool as well.
              </p> 

              <VideoBlock src={"/images/projects/halls-of-torment/hot-clustering.mp4"} caption="Showcasing the clustering of gem stones"/>

              <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                When too many gems are located in a small area, they are replaced by a cluster object. While investigating this system, I found that clustering could be triggered multiple times in parallel. This caused several clusters to be instantiated even though only one was actually used. I changed the behavior so only a single cluster can be created per event, which further improved overall performance.
              </p>

              <SectionTitle>Time Slicing the Frost Status Effect</SectionTitle>
              
              <p className="text-slate-400 mb-10 text-lg leading-relaxed">
              In Halls of Torment, enemies afflicted with the status effect “Frost” store incoming damage and later release it as a Frost Wave. During runs with the Norseman I noticed heavy lag spikes whenever many Frost Waves were triggered at the same time. The issue came from the Frost Wave behaving like a chain reaction. One wave could immediately trigger additional waves, and in extreme situations a single Frost Wave was able to cascade across 50 enemies in the same frame.

              To solve this, I implemented time slicing for the Frost effect. A Frost Wave can no longer trigger another wave during the same frame. Instead, the follow-up trigger is deferred to the next frame. This spreads the workload over time and significantly reduces frame spikes.

              An interesting side effect is that the chain reaction is now more readable visually. Instead of one large Frost explosion that was often hidden by lag, players can clearly see the reaction propagate across enemies, which actually improves the feel of the effect.
              </p>

              <VideoBlock src={"/images/projects/halls-of-torment/hot-ice-effect.mp4"} caption="Norseman gameplay stacking frost status effects"/>

              <SectionTitle>Global Position Caching</SectionTitle>
              
              <p className="text-slate-400 mb-5 text-lg leading-relaxed">
                When using GDScript there is always some overhead as a tradeoff. Because of how game objects are structured in Halls of Torment, accessing an object’s global position required multiple GDScript calls. The position itself was not stored directly on the game object, but on a separate position provider. Whenever another node needed the position, it first had to ask the game object, which then queried its position provider and returned the value back to the caller. This indirection added unnecessary overhead, especially when repeated thousands of times per frame.
              </p>

              <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                To reduce redundant computation, I implemented a global position cache in C++. Position providers now write their updated transforms directly into this cache, which is exposed to GDScript. Systems that need object positions can read precomputed values instead of triggering repeated transform lookups.

                This was a relatively small architectural change, but multiplied across thousands of objects each frame, it resulted in meaningful performance savings.
              </p>

              <SectionTitle>Updating Godot to 4.3</SectionTitle>
              
              <p className="text-slate-400 mb-5 text-lg leading-relaxed"> Engine updates can always introduce a lot of bugs into a project. But when using a relatively young engine like Godot, major updates also add many useful features. In this case, our lead programmer wanted to take advantage of performance improvements and bug fixes in the engine code. Version 4.3 fixed several issues in resource loading, which Halls of Torment relies on heavily. Because of that, our custom Godot fork needed to be merged with the new version. </p> 
              
              <p className="text-slate-400 mb-10 text-lg leading-relaxed"> My task was to migrate the Halls of Torment project to this new version. The project is fairly large, so there were many places where things could break. When I first launched the game with the updated engine, I was met with errors across different parts of the codebase. Some deprecated function calls had to be replaced, editor scenes needed adjustments, and there were many smaller fixes required to make everything compatible again.

              This process was very insightful because it forced me to explore areas of the codebase I had not touched before and gave me a broader understanding of the game’s architecture. It strengthened my ability to read unfamiliar code and understand complex systems.

              </p>


            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-6 text-2xl font-bold text-black dark:text-white">
    {children}
  </h2>
);

interface ImageBlockProps {
  src: string;       // image source path
  alt?: string;      // alt text (optional)
  caption: string;   // caption text
  height?: number;   // optional height
}

const ImageBlock: React.FC<ImageBlockProps> = ({
  src,
  alt = "Image",
  caption,
  height = 400,
}) => (
  <figure className="my-3 flex flex-col items-center mb-10">
    <Image
      src={src}
      alt={alt}
      width={0}
      height={0}
      sizes="100vw"
      style={{ height: `${height}px` }}
      className="w-auto rounded-md object-contain mx-5"
    />
    <figcaption className="mt-3 text-center text-sm italic text-gray-500 dark:text-gray-400">
      {caption}
    </figcaption>
  </figure>
);

interface VideoBlockProps {
  src: string;
  poster?: string; // optional poster image
  caption?: string;
  height?: number;
}

const VideoBlock: React.FC<VideoBlockProps> = ({
  src,
  poster,
  caption,
  height = 400,
}) => (
  <figure className="my-3 flex flex-col items-center mb-10">
    <video
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      style={{ height: `${height}px` }}
      className="w-auto rounded-md object-contain mx-5"
    />
    {caption && (
      <figcaption className="mt-3 text-center text-sm italic text-gray-500 dark:text-gray-400">
        {caption}
      </figcaption>
    )}
  </figure>
);

export default BlogPage;
