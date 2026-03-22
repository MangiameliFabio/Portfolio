import Link from "next/link";
import PortfolioBottomDecoration from "../PortfolioBottomDecoration";
import PortfolioTopDecoration from "../PortfolioTopDecoration";
import TagButton from "../../Blog/TagButton";
import SingleBlog from "../../Blog/SingleBlog";

const Gameplay = () => {
  return (
    <>
      <section
        id="home"
        className="bg-#121723 relative z-10 overflow-hidden pt-[50px] pb-16 md:pb-[100px] lg:pt-[80px]"
      >
        <div className="container">
          <div className="mb-10 flex flex-row items-center md:mb-20">
            <div className="mr-10 hidden w-70 min-w-[300px] xl:block">
              <img
                src="/images/fabio_profile_picture.jpg"
                className="rounded-full"
              ></img>
            </div>
            <div className="flex max-w-[900px] flex-col justify-items-center">
              <h1 className="mb-1 text-3xl leading-tight font-bold text-black sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight dark:text-white">
                Fabio Mangiameli
              </h1>
              <h2 className="mb-4 text-xl leading-tight text-black italic sm:text-2xl sm:leading-tight md:text-3xl md:leading-tight dark:text-white">
                Gameplay Programmer
              </h2>
              <p className="mb-4 text-base leading-relaxed! text-black sm:text-lg md:text-xl dark:text-white">
                My name is Fabio Mangiameli. I currently study Game Technology
                at the IT University of Copenhagen. I also work as a game
                programmer for Chasing Carrots. I love game development and have
                a passion for programming. Have a look at the game projects I
                did during my studies and professional career.
              </p>
              <h2 className="mb-2 text-lg leading-relaxed! font-semibold text-black sm:text-xl md:text-2xl dark:text-white">
                Proficient Programming Languages:
              </h2>
              <div className="mb-4">
                <TagButton text={"C++"} />
                <TagButton text={"C#"} />
                <TagButton text={"GDScript"} />
                <TagButton text={"Blueprints"} />
                <TagButton text={"TypeScript"} />
              </div>
              <h2 className="mb-2 text-lg leading-relaxed! font-semibold text-black sm:text-xl md:text-2xl dark:text-white">
                Tools I am experienced with:
              </h2>
              <div>
                <TagButton text={"Unreal Engine"} />
                <TagButton text={"Godot"} />
                <TagButton text={"Unity"} />
                <TagButton text={"Git"} />
                <TagButton text={"Perforce"} />
                <TagButton text={"Tracy"} />
                <TagButton text={"Codecks"} />
                <TagButton text={"Jira"} />
              </div>
            </div>
          </div>
          <h1 className="mb-4 text-2xl leading-tight font-bold text-black sm:text-3xl sm:leading-tight md:mb-10 md:text-4xl md:leading-tight dark:text-white">
            Gameplay Programming related Projects
          </h1>
          <div className="mb-12">
            <SingleBlog
              blog={{
                id: 0,
                title:
                  "Game Programming for an unanounced Co-op Exploration Game",
                paragraph:
                  "During the development of Halls of Torment, Chasing Carrots began prototyping a new title and I joined during the early stages, taking on a wide range of tasks. My main focus was building and iterating on core gameplay and technical systems while helping shape a stable multiplayer foundation for the project. The work required close collaboration, rapid prototyping, and solving practical engineering challenges to support the game’s direction.",
                src: "/images/projects/hypothermia/hypothermiaShowCasePart2.mp4",
                tags: ["C++", "Godot", "GDScript", "Multiplayer", "Codecks"],
                keyPoints: [
                  "Refactored Godot’s multiplayer networking with a custom C++ system supporting ENet and Epic Online Services. Integrated the architecture into the codebase and fixed a critical multi-mesh limitation in the EOS Godot extension.",
                  "Optimized multiplayer systems to reduce crashes and disconnects by stress-testing under high latency and packet loss, identifying and fixing critical networking bugs.",
                  "Implemented a player downed state and revive mechanic to enhance cooperative gameplay and failure recovery.",
                  "Focused on game systems such as the room temperature system, electricity system and cruiser engine system",
                ],
                link: "/projects/hypothermia",
                orgaType: "Company",
                orgaName: "Chasing Carrots",
                game: "Unanounced Titel",
                date: "2024-2026",
                duration: "1.5 years",
                teamSize: "10",
              }}
            ></SingleBlog>
          </div>
          <div className="mb-12">
            <SingleBlog
              blog={{
                id: 0,
                title:
                  "Duskborn - Gameplay Programming and Technical Leadership",
                paragraph:
                  "Duskborn is a third-person shooter roguelite developed in Unreal Engine 5.1 during a university production course designed to mirror a real studio pipeline. I worked as both Game Programmer and Head of Engineering, leading a three-person engineering team while implementing major gameplay features such as player traversal, modular prostheses, the upgrade framework, and encounter systems.",
                src: "/images/projects/duskborn/Duskborn_Grappling.gif",
                tags: [
                  "C++",
                  "Unreal Engine",
                  "Blueprints",
                  "Perforce",
                  "Jira",
                  "Confluence",
                ],
                keyPoints: [
                  "Led a three-person engineering team, organized weekly meetings, and coordinated tasks and milestones with the other department leads.",
                  "Implemented the player controller with sprinting, dashing, jetpack movement, and a physics-driven grappling hook.",
                  "Built a modular prosthesis system with swappable combat abilities and shared animation and cooldown logic.",
                  "Created an observer-driven upgrade framework that combines trigger parts and effect parts into reusable items.",
                  "Implemented the Destructor enemy and encounter spawning rules to improve pacing and avoid unfair pop-in.",
                ],
                link: "/projects/duskborn",
                orgaType: "University",
                orgaName: "Hochschule der Medien",
                game: "Duskborn",
                date: "2023",
                duration: "1 semester",
                teamSize: "18",
              }}
            ></SingleBlog>
          </div>
          <div className="mb-12">
            <SingleBlog
              blog={{
                id: 0,
                title: "Custom Multiplayer Networking in Godot",
                paragraph:
                  "I replaced Godot’s built-in MultiplayerAPI with a custom networking layer that directly interfaces with MultiplayerPeer, improving flexibility, modularity, and authority handling. I also implemented full peer-to-peer network meshes using ENet and Epic Online Services, enabling low-latency client-to-client communication and support for features such as proximity voice chat. The system was integrated into the studio’s codebase, tested in gameplay sessions, and extended with a C++ fix to support multiple concurrent network meshes.",
                src: "/images/projects/godot-networking/GodotNetworkingShowCase.mp4",
                tags: ["C++", "Godot", "GDScript", "Codecks"],
                keyPoints: [
                  "Refactored Godot’s multiplayer networking layer to remove reliance on the built-in MultiplayerAPI",
                  "Designed and implemented the integration of the MultiplayerPeer into the custom Communication Line System in C++",
                  "Implemented peer-to-peer network meshes for both ENet and Epic Online Services using GDScript",
                  "Integrated and validated the new networking architecture into the existing code base",
                  "Identified and resolved a critical multi-mesh limitation in the EOS Godot extension",
                ],
                link: "/projects/godot-networking",
                orgaType: "Company",
                orgaName: "Chasing Carrots",
                game: "Unanounced Titel",
                date: "2025",
                duration: "4 Months",
                teamSize: "10",
              }}
            ></SingleBlog>
          </div>
          <div className="mb-12">
            <SingleBlog
              blog={{
                id: 0,
                title: "Performance optimizations for Halls of Torment",
                paragraph:
                  "Back in 2024, this was the first task I received after joining Chasing Carrots as a Game Programmer. Halls of Torment was still in early access and suffered from performance issues toward the end of a run. As a survivor-like game, it features a large number of entities and projectiles on screen during the final minutes, which heavily impacted performance. With the upcoming console release in mind, I was tasked with investigating these issues and migrating the project from the Optick profiler to Tracy.",
                src: "/images/projects/halls-of-torment/hot-ice-effect.mp4",
                tags: ["C++", "Godot", "GDScript", "Tracy", "Codecks"],
                keyPoints: [
                  "Integrated Tracy into the custom C++ Godot engine build to enable deep runtime performance analysis",
                  "Profiled heavy in-game scenarios with hundreds of active entities to identify real bottlenecks",
                  "Implemented object pooling and spawning in seperate thread to reduce allocation overhead",
                  "Introduced time slicing for the frost status effect, improving frame stability under load",
                  "Added game object global position caching in C++ and exposed it to GDScript for gameplay systems",
                ],
                link: "/projects/halls-of-torment",
                orgaType: "Company",
                orgaName: "Chasing Carrots",
                game: "Halls of Torment",
                date: "2024",
                duration: "2 Months",
                teamSize: "10",
              }}
            ></SingleBlog>
          </div>
          {/* <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[800px] text-center">
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  Free and Open-Source Next.js Template for Startup & SaaS
                </h1>
                <p className="mb-12 text-base leading-relaxed! text-body-color dark:text-body-color-dark sm:text-lg md:text-xl">
                  Startup is free Next.js template for startups and SaaS
                  business websites comes with all the essential pages,
                  components, and sections you need to launch a complete
                  business website, built-with Next 16.x and Tailwind CSS.
                </p>
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link
                    href="https://nextjstemplates.com/templates/saas-starter-startup"
                    className="rounded-xs bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                  >
                    🔥 Get Pro
                  </Link>
                  <Link
                    href="https://github.com/NextJSTemplates/startup-nextjs"
                    className="inline-block rounded-xs bg-black px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-black/90 dark:bg-white/10 dark:text-white dark:hover:bg-white/5"
                  >
                    Star on GitHub
                  </Link>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <PortfolioTopDecoration />
        <PortfolioBottomDecoration />
      </section>
    </>
  );
};

export default Gameplay;
