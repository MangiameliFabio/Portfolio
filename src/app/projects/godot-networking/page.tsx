import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rewriting Godot’s Multiplayer Layer",
  description: "Custom multiplayer networking architecture in Godot",
};

const tags = ["C++", "GDScript", "Godot"];

const BlogPage = () => {
  return (
    <section className="pt-[150px] pb-[120px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4 lg:w-8/12">
            <div>

              <h1 className="border-body-color/20 border-b mb-10 pb-4 text-3xl font-bold sm:text-4xl text-black dark:text-white">
                Custom Multiplayer Networking in Godot
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
                      Unannounced Title
                    </h4>
                  </div>

                  <div className="border-body-color/20 border-r px-5 mr-5">
                    <p className="text-sm text-slate-400">Date</p>
                    <h4 className="font-medium text-white">2025</h4>
                  </div>

                  <div className="px-5">
                    <p className="text-sm text-slate-400">Duration</p>
                    <h4 className="font-medium text-white">4 Months</h4>
                  </div>
                </div>
              </div>

              <p className="text-slate-400 mb-5 text-lg leading-relaxed">
                I spent four months deep inside multiplayer networking in Godot while working with Chasing Carrots on their upcoming co-op project. The goal was simple.
                Can we replace Godot’s built-in multiplayer layer with a custom system that gives us more control, more flexibility, and better support for peer to peer features?
                This post is about what we needed, how I implemented it, and how it went. For most parts the code was written in C++, as I worked inside the Godot Engine source code and the Epic Online Services Godot extension. I learned a lot about debugging foreign code and how to navigate in large code bases.
              </p>

              <div className="text-slate-400 border-body-color/10 mb-10">
                <span>Download full report: </span>
                <a
                  href="/files/Fabio_Mangiameli_Report_Individual_Project.pdf"
                  download
                  style={{textDecoration: "underline", cursor: "pointer" }}
                >
                  Fabio_Mangiameli_Report_Individual_Project.pdf
                </a>
              </div>

              <SectionTitle>The problem with the default model</SectionTitle>

              <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                Godot’s multiplayer stack is great for getting started. You can spin up a networked prototype in minutes. RPCs are easy. Synchronization is built in. For small projects, it is honestly hard to beat.
                The trouble starts when a project grows.
                Our game already had a classic client to server architecture. Every client talked to a single server peer. If one client wanted to send data to another, the packet went through the server first. That extra hop adds latency and increases server load. For gameplay it is manageable. For voice chat and fast input updates it is not ideal.
              </p>

              <ImageBlock src={"/images/projects/godot-networking/ClientServer.png"} caption={"Original client to server setup"} height={300}/>
              
              <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                We also wanted to move away from heavy reliance on Godot specific helpers like MultiplayerSpawner and MultiplayerSynchronizer. They work, but they push you toward a very specific architecture. The studio needed something more modular and closer to the transport layer.
              </p>
              <ImageBlock src={"/images/projects/godot-networking/GodotNetworking.png"} caption={"Godot default multiplayer architecture"} height={400}/>

              <SectionTitle>The Communication Line System</SectionTitle>

              <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                The answer was a custom framework we call the Communication Line System, or CLS. Instead of building on top of Godot’s RPC layer, CLS talks directly to the MultiplayerPeer. It acts as a lightweight message routing system that lives alongside the engine rather than inside the default MultiplayerAPI.
              </p>

              <ImageBlock src={"/images/projects/godot-networking/CommunicationLineSystem.png"} caption={"Communication Line System architecture"} />
                
              <p className="text-slate-400 mb-2 text-lg leading-relaxed">A few design goals guided the system:</p>
               
              <ul className="text-slate-400 mb-5 list-disc list-inside space-y-2">
                <li>Multiple independent CommunicationLineSystems can exist at once</li>
                <li>Packages can be filtered using bitmasks</li>
                <li>Authority is handled explicitly</li>
                <li>Networking code does not depend on scene structure</li>
              </ul>

              <p className="text-slate-400 mb-10 text-lg leading-relaxed">Instead of sprinkling RPC calls across dozens of scripts, we route everything through structured communication lines. That makes it easier to reason about what travels over the network and who is allowed to send it.</p>

              <SectionTitle>Refactoring away from MultiplayerAPI</SectionTitle>

              <p className="text-slate-400 mb-5 text-lg leading-relaxed">
                The first real task was ripping out our dependency on Godot’s MultiplayerAPI. Previously, the Communication Line System still used the API internally to access the peer and poll data. I rewired it so CLS owns a direct reference to the MultiplayerPeer. Polling is now handled inside our own code, using a stripped down version of Godot’s internal networking loop. Authority was another big change. Godot assigns authority by peer ID. We replaced that with a bitmask based system. The first bit represents authority. Messages can be filtered by checking these bits, which makes routing flexible and cheap.
              </p>

              <p className="text-slate-400 mb-2 text-lg leading-relaxed">I exposed new helper functions to GDScript so gameplay code can ask:</p>

              <ul className="text-slate-400 mb-5 list-disc list-inside space-y-2">
                <li>is this peer the authority</li>
                <li>who currently holds authority</li>
                <li>is this peer the server</li>
              </ul>

              <p className="text-slate-400 mb-10 text-lg leading-relaxed">Once that was done, I migrated a full test project. Every RPC call was replaced with CommunicationLine calls. All MultiplayerSpawner and MultiplayerSynchronizer usage was removed. The test scene synchronized dozens of data types at regular intervals and displayed them in a debugging window. If anything desynced, it would show immediately. After the refactor, the scene behaved identically to the old implementation. That was the first big milestone.</p>
              
              <VideoBlock src={"/images/projects/godot-networking/GodotNetworkingShowCase.mp4"} caption="Showcase: Test project to check networking capabilities"/>

              <SectionTitle>Building a peer to peer mesh</SectionTitle>

              <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                The next step was building full network meshes. In a mesh, every client is directly connected to every other client. You still keep a logical server for authority and coordination, but data does not need to bounce through it.
              </p>

              <ImageBlock src={"/images/projects/godot-networking/Mesh.png"} caption={"Network mesh setup"} />

              <p className="text-slate-400 mb-5 text-lg leading-relaxed">
                This matters a lot for proximity voice chat. Audio packets can travel directly between players. That reduces latency and removes unnecessary server load.
              </p>

              <p className="text-slate-400 mb-2 text-lg leading-relaxed">I implemented meshes for two backends:</p>

              <ul className="text-slate-400 mb-10 list-disc list-inside space-y-2">
                <li>ENet for fast local testing</li>
                <li>Epic Online Services for shipping</li>
              </ul>

              <h4 className="mb-6 text-xl font-bold text-black dark:text-white">
                ENet mesh
              </h4>

              <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                ENet does not give you discovery for free. I had to build a signaling server that hands out IP addresses, ports, and peer IDs. Each peer to peer link needs its own port. You cannot reuse a single port for multiple ENet hosts. The signaling server tracks which ports are in use and distributes them safely.
              </p>

              <ImageBlock src={"/images/projects/godot-networking/ENetMesh.png"} caption={"Connection sequence for an ENet mesh"} />

              <p className="text-slate-400 mb-10 text-lg leading-relaxed">Once both clients open their hosts and acknowledge the connection, we register the link with Godot using add_mesh_peer. At that point the engine recognizes the peer and CLS can route messages normally. Testing confirmed that clients could send packets directly to each other without touching the server. That was the proof that the mesh actually worked.</p>

              <h4 className="mb-6 text-xl font-bold text-black dark:text-white">
                EOS mesh
              </h4>

              <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                EOS handles discovery internally, so the setup is cleaner. Clients log in, exchange user IDs, and call add_mesh_peer using those IDs. In practice, everything worked until I tried running two meshes in parallel. One mesh for gameplay. One mesh for voice chat. The second mesh silently failed on one client. The connection request never showed up. Debug tools confirmed that one side believed the peer existed and the other side did not.
              </p>

              <ImageBlock src={"/images/projects/godot-networking/EOSMesh.png"} caption={"Connection sequence for an EOS mesh"} />

              <p className="text-slate-400 mb-10 text-lg leading-relaxed">After days of stepping through the EOS extension code, I found that the request was likely being swallowed inside the SDK. I could not fix the root cause, so I implemented a workaround. The client repeatedly sends connection requests until confirmation arrives or retries run out. It is not pretty, but it works. Both meshes now register correctly, and voice chat came back to life.</p>

              <SectionTitle>Integration and real playtests</SectionTitle>

              <p className="text-slate-400 mb-5 text-lg leading-relaxed">
                The final step was merging everything into the main project. This was less glamorous than the research work. 
              </p>

              <p className="text-slate-400 mb-2 text-lg leading-relaxed">
                It was a long cleanup pass:
              </p>

              <ul className="text-slate-400 mb-5 list-disc list-inside space-y-2">
                <li>replacing every remaining RPC</li>
                <li>removing MultiplayerAPI helpers</li>
                <li>rewriting authority checks</li>
                <li>Rewriting CLS initialization</li>

              </ul>

              <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                Once integrated, the team ran a full studio play session. Everyone connected and completed a full run. Compared to earlier builds, the connection felt more stable and responsive. It is not perfect yet. Later tests still revealed disconnect issues. We cannot say for sure whether those are caused by the new architecture or by unrelated systems. What matters is that the foundation is now flexible enough to debug and extend properly.
              </p>

              <SectionTitle>What this actually changed</SectionTitle>

              <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                The biggest win is not raw performance. It is control. We now own our networking layer. We can run multiple meshes. We can route messages without fighting the engine. We can build features like proximity voice chat without bending the architecture into strange shapes. The cost is complexity. A custom system always carries maintenance overhead. But for a cooperative multiplayer game that depends heavily on networking, the tradeoff is worth it. Future work will focus on stress testing. We want to see how the system behaves under heavy packet loss, latency spikes, and large amounts of synchronized data. The current implementation is a strong foundation, not a finished solution.
              </p>

              <SectionTitle>Final thoughts</SectionTitle>

              <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                This project forced me to read and modify large chunks of engine code, debug third party extensions, and design networking architecture that survives real production constraints. It was frustrating at times, especially when a bug hid for days before revealing itself. It was also one of the most rewarding technical deep dives I have done. The game is still in development, but I am glad that part of its foundation now carries my fingerprints. If nothing else, it proved that Godot is flexible enough to support a fully custom multiplayer layer when a project demands it. And sometimes, that is exactly what you need.
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
