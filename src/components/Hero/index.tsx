import Link from "next/link";
import TagButton from "../Blog/TagButton";
import SingleBlog from "../Blog/SingleBlog";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden bg-#121723 pb-16 pt-[100px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[150px]"
      >
        <div className="container">
          <div className="mb-10 md:mb-20 flex flex-row items-center">
            <div className="w-70 min-w-[300px]  hidden xl:block mr-10">
               <img src="/images/portfolio/fabio_profile_picture.jpg" className="rounded-full"></img>
            </div>
            <div className="max-w-[900px] flex flex-col justify-items-center">
              <h1 className="mb-1 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  Fabio Mangiameli
              </h1>
              <h2 className="mb-4 text-xl italic leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight md:text-3xl md:leading-tight">
                  Engine Programmer
              </h2>
              <p className="mb-4 text-base leading-relaxed! text-black dark:text-white sm:text-lg md:text-xl">
                My name is Fabio Mangiameli. I currently study Game Technology at the IT University of Copenhagen. I also work as a game programmer for Chasing Carrots. I love game development and have a passion for programming. Have a look at the game projects I did during my studies and professional career.
              </p>
              <h2 className="mb-2 text-lg font-semibold leading-relaxed! text-black dark:text-white sm:text-xl md:text-2xl">
                  Proficient Programming Languages:
              </h2>
              <div className="mb-4">
                <TagButton text={"C++"}/>
                <TagButton text={"C#"}/>
                <TagButton text={"GDScript"}/>
                <TagButton text={"Blueprints"}/>
                <TagButton text={"TypeScript"}/>
              </div>
              <h2 className="mb-2 text-lg font-semibold leading-relaxed! text-black dark:text-white sm:text-xl md:text-2xl">
                  Tools I am experienced with:
              </h2>
              <div>
                <TagButton text={"Unreal Engine"}/>
                <TagButton text={"Godot"}/>
                <TagButton text={"Unity"}/>
                <TagButton text={"Git"}/>
                <TagButton text={"Perforce"}/>
                <TagButton text={"Tracy"}/>
                <TagButton text={"Codecks"}/>
                <TagButton text={"Jira"}/>
              </div>
            </div>
          </div>
          <h1 className="mb-4 md:mb-10 text-2xl font-bold leading-tight text-black dark:text-white sm:text-3xl sm:leading-tight md:text-4xl md:leading-tight">
            Engine Programming related Projects
          </h1>
          <div className="mb-12">
            <SingleBlog blog={{
              id: 0,
              title: "Game Programming for an unanounced Co-op Exploration Game",
              paragraph: "During the development of Halls of Torment, Chasing Carrots began prototyping a new title and I joined during the early stages, taking on a wide range of tasks. My main focus was building and iterating on core gameplay and technical systems while helping shape a stable multiplayer foundation for the project. The work required close collaboration, rapid prototyping, and solving practical engineering challenges to support the game’s direction.",
              src: "/images/projects/frozen-bulgur/FrozenBulgurShowCasePart2.mp4",
              tags: ["C++", "Godot", "GDScript", "Multiplayer", "Codecks"],
              keyPoints: [
                "Refactored Godot’s multiplayer networking with a custom C++ system supporting ENet and Epic Online Services. Integrated the architecture into the codebase and fixed a critical multi-mesh limitation in the EOS Godot extension.",
                "Optimized multiplayer systems to reduce crashes and disconnects by stress-testing under high latency and packet loss, identifying and fixing critical networking bugs.",
                "Implemented a player downed state and revive mechanic to enhance cooperative gameplay and failure recovery.",
                "Focused on game systems such as the room temperature system, electricity system and cruiser engine system",
              ],
              link: "/projects/coop-exploration",
              orga: "Chasing Carrots",
              game: "Unanounced Titel",
              date: "2024-2026",
              duration: "1.5 years",
            }}></SingleBlog>
          </div>
          <div className="mb-12">
            <SingleBlog blog={{
              id: 0,
              title: "Custom Multiplayer Networking in Godot",
              paragraph: "I replaced Godot’s built-in MultiplayerAPI with a custom networking layer that directly interfaces with MultiplayerPeer, improving flexibility, modularity, and authority handling. I also implemented full peer-to-peer network meshes using ENet and Epic Online Services, enabling low-latency client-to-client communication and support for features such as proximity voice chat. The system was integrated into the studio’s codebase, tested in gameplay sessions, and extended with a C++ fix to support multiple concurrent network meshes.",
              src: "/images/projects/godot-networking/GodotNetworkingShowCase.mp4",
              tags: ["C++", "Godot", "GDScript", "Codecks"],
              keyPoints: [
                "Refactored Godot’s multiplayer networking layer to remove reliance on the built-in MultiplayerAPI",
                "Designed and implemented the integration of the MultiplayerPeer into the custom Communication Line System in C++",
                "Implemented peer-to-peer network meshes for both ENet and Epic Online Services using GDScript",
                "Integrated and validated the new networking architecture into the existing code base",
                "Identified and resolved a critical multi-mesh limitation in the EOS Godot extension"
              ],
              link: "/projects/godot-networking",
              orga: "Chasing Carrots",
              game: "Unanounced Titel",
              date: "2025",
              duration: "4 Months",
            }}></SingleBlog>
          </div>
          <div className="mb-12">
            <SingleBlog blog={{
              id: 0,
              title: "Performance optimizations for Halls of Torment",
              paragraph: "Back in 2024, this was the first task I received after joining Chasing Carrots as a Game Programmer. Halls of Torment was still in early access and suffered from performance issues toward the end of a run. As a survivor-like game, it features a large number of entities and projectiles on screen during the final minutes, which heavily impacted performance. With the upcoming console release in mind, I was tasked with investigating these issues and migrating the project from the Optick profiler to Tracy.",
              src: "/images/projects/halls-of-torment/hot-ice-effect.mp4",
              tags: ["C++", "Godot", "GDScript", "Tracy", "Codecks"],
              keyPoints: [
                "Integrated Tracy into the custom C++ Godot engine build to enable deep runtime performance analysis",
                "Profiled heavy in-game scenarios with hundreds of active entities to identify real bottlenecks",
                "Implemented object pooling and spawning in seperate thread to reduce allocation overhead",
                "Introduced time slicing for the frost status effect, improving frame stability under load",
                "Added game object global position caching in C++ and exposed it to GDScript for gameplay systems"
              ],
              link: "/projects/halls-of-torment",
              orga: "Chasing Carrots",
              game: "Halls of Torment",
              date: "2024",
              duration: "2 Months",
            }}></SingleBlog>
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
        <div className="absolute right-0 top-0 z-[-1] opacity-30 lg:opacity-100">
          <svg
            width="450"
            height="556"
            viewBox="0 0 450 556"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="277"
              cy="63"
              r="225"
              fill="url(#paint0_linear_25:217)"
            />
            <circle
              cx="17.9997"
              cy="182"
              r="18"
              fill="url(#paint1_radial_25:217)"
            />
            <circle
              cx="76.9997"
              cy="288"
              r="34"
              fill="url(#paint2_radial_25:217)"
            />
            <circle
              cx="325.486"
              cy="302.87"
              r="180"
              transform="rotate(-37.6852 325.486 302.87)"
              fill="url(#paint3_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="184.521"
              cy="315.521"
              r="132.862"
              transform="rotate(114.874 184.521 315.521)"
              stroke="url(#paint4_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="356"
              cy="290"
              r="179.5"
              transform="rotate(-30 356 290)"
              stroke="url(#paint5_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="191.659"
              cy="302.659"
              r="133.362"
              transform="rotate(133.319 191.659 302.659)"
              fill="url(#paint6_linear_25:217)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_25:217"
                x1="-54.5003"
                y1="-178"
                x2="222"
                y2="288"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <radialGradient
                id="paint1_radial_25:217"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(17.9997 182) rotate(90) scale(18)"
              >
                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
              </radialGradient>
              <radialGradient
                id="paint2_radial_25:217"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(76.9997 288) rotate(90) scale(34)"
              >
                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
              </radialGradient>
              <linearGradient
                id="paint3_linear_25:217"
                x1="226.775"
                y1="-66.1548"
                x2="292.157"
                y2="351.421"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_25:217"
                x1="184.521"
                y1="182.159"
                x2="184.521"
                y2="448.882"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_25:217"
                x1="356"
                y1="110"
                x2="356"
                y2="470"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint6_linear_25:217"
                x1="118.524"
                y1="29.2497"
                x2="166.965"
                y2="338.63"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 z-[-1] opacity-30 lg:opacity-100">
          <svg
            width="364"
            height="201"
            viewBox="0 0 364 201"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
              stroke="url(#paint0_linear_25:218)"
            />
            <path
              d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24"
              stroke="url(#paint1_linear_25:218)"
            />
            <path
              d="M-53.1107 72.3303C-25.3401 66.4798 42.3965 64.9086 91.1783 105.427C152.155 156.076 170.59 162.093 205.333 166.607C240.076 171.12 278.718 183.657 303.889 212.24"
              stroke="url(#paint2_linear_25:218)"
            />
            <path
              d="M-98.1618 65.0889C-68.1416 60.0601 4.73364 60.4882 56.0734 102.431C120.248 154.86 139.905 161.419 177.137 166.956C214.37 172.493 255.575 186.165 281.856 215.481"
              stroke="url(#paint3_linear_25:218)"
            />
            <circle
              opacity="0.8"
              cx="214.505"
              cy="60.5054"
              r="49.7205"
              transform="rotate(-13.421 214.505 60.5054)"
              stroke="url(#paint4_linear_25:218)"
            />
            <circle cx="220" cy="63" r="43" fill="url(#paint5_radial_25:218)" />
            <defs>
              <linearGradient
                id="paint0_linear_25:218"
                x1="184.389"
                y1="69.2405"
                x2="184.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_25:218"
                x1="156.389"
                y1="69.2405"
                x2="156.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_25:218"
                x1="125.389"
                y1="69.2405"
                x2="125.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_25:218"
                x1="93.8507"
                y1="67.2674"
                x2="89.9278"
                y2="210.214"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_25:218"
                x1="214.505"
                y1="10.2849"
                x2="212.684"
                y2="99.5816"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <radialGradient
                id="paint5_radial_25:218"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(220 63) rotate(90) scale(43)"
              >
                <stop offset="0.145833" stopColor="white" stopOpacity="0" />
                <stop offset="1" stopColor="white" stopOpacity="0.08" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default Hero;
