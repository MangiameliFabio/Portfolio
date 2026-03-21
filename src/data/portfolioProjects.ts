import { Blog } from "@/types/blog";

export const portfolioProjects: Blog[] = [
  {
    id: 1,
    title: "Hypothermia - Game and Network Programming",
    paragraph:
      "During the development of Halls of Torment, Chasing Carrots began prototyping a new title and I joined during the early stages, taking on a wide range of tasks. My main focus was building and iterating on core gameplay and technical systems while helping shape a stable multiplayer foundation for the project. The work required close collaboration, rapid prototyping, and solving practical engineering challenges to support the game's direction.",
    src: "/images/projects/frozen-bulgur/FrozenBulgurShowCasePart2.mp4",
    tags: ["C++", "Godot", "GDScript", "Multiplayer", "Codecks", "Git"],
    keyPoints: [
      "Refactored Godot's multiplayer networking with a custom C++ system supporting ENet and Epic Online Services. Integrated the architecture into the codebase and fixed a critical multi-mesh limitation in the EOS Godot extension.",
      "Optimized multiplayer systems to reduce crashes and disconnects by stress-testing under high latency and packet loss, identifying and fixing critical networking bugs.",
      "Implemented a player downed state and revive mechanic to enhance cooperative gameplay and failure recovery.",
      "Focused on game systems such as the room temperature system, electricity system and cruiser engine system",
    ],
    link: "/projects/coop-exploration",
    orgaType: "Company",
    orgaName: "Chasing Carrots",
    game: "Hypothermia",
    date: "2024-2026",
    duration: "1.5 years",
    teamSize: "10",
  },
  {
    id: 2,
    title: "Hypothermia - Custom Multiplayer Networking in Godot",
    paragraph:
      "I replaced Godot's built-in MultiplayerAPI with a custom networking layer that directly interfaces with MultiplayerPeer, improving flexibility, modularity, and authority handling. I also implemented full peer-to-peer network meshes using ENet and Epic Online Services, enabling low-latency client-to-client communication and support for features such as proximity voice chat. The system was integrated into the studio's codebase, tested in gameplay sessions, and extended with a C++ fix to support multiple concurrent network meshes.",
    src: "/images/projects/godot-networking/GodotNetworkingShowCase.mp4",
    tags: ["C++", "Godot", "GDScript", "Multiplayer", "Codecks", "Git"],
    keyPoints: [
      "Refactored Godot's multiplayer networking layer to remove reliance on the built-in MultiplayerAPI",
      "Designed and implemented the integration of the MultiplayerPeer into the custom Communication Line System in C++",
      "Implemented peer-to-peer network meshes for both ENet and Epic Online Services using GDScript",
      "Integrated and validated the new networking architecture into the existing code base",
      "Identified and resolved a critical multi-mesh limitation in the EOS Godot extension",
    ],
    link: "/projects/godot-networking",
    orgaType: "Company",
    orgaName: "Chasing Carrots",
    game: "Hypothermia",
    date: "2025",
    duration: "4 Months",
    teamSize: "10",
  },
  {
    id: 3,
    title: "Halls of Torment - Performance optimizations and Profiling",
    paragraph:
      "Back in 2024, this was the first task I received after joining Chasing Carrots as a Game Programmer. Halls of Torment was still in early access and suffered from performance issues toward the end of a run. As a survivor-like game, it features a large number of entities and projectiles on screen during the final minutes, which heavily impacted performance. With the upcoming console release in mind, I was tasked with investigating these issues and migrating the project from the Optick profiler to Tracy.",
    src: "/images/projects/halls-of-torment/hot-ice-effect.mp4",
    tags: ["C++", "Godot", "GDScript", "Tracy", "Codecks", "Git"],
    keyPoints: [
      "Integrated Tracy into the custom C++ Godot engine build to enable deep runtime performance analysis",
      "Profiled heavy in-game scenarios with hundreds of active entities to identify real bottlenecks",
      "Implemented object pooling and spawning in seperate thread to reduce allocation overhead",
      "Introduced time slicing for the frost status effect, improving frame stability",
      "Added game object global position caching in C++ and exposed it to GDScript for gameplay systems",
    ],
    link: "/projects/halls-of-torment",
    orgaType: "Company",
    orgaName: "Chasing Carrots",
    game: "Halls of Torment",
    date: "2024",
    duration: "2 Months",
    teamSize: "10",
  },
  {
    id: 4,
    title: "Enchanted Defense - Building a Game in a Custom Engine",
    paragraph:
      "Enchanted Defense is a top-down shooter I built in a custom C++ engine with SDL2 to learn more about game engine internals. The project became a practical playground for update loops, rendering, input routing, animation state machines, and reusable gameplay patterns such as command, observer, and prototype-style spawning.",
    src: "/images/projects/enchanted-defense/Enchated_Defense.gif",
    tags: ["C++", "SDL 2", "Piskel", "Git"],
    keyPoints: [
      "Built a small custom game engine and used it to ship a complete top-down shooter prototype.",
      "Implemented the main loop, scene management, rendering, UI, and debugging helpers.",
      "Used patterns such as command, observer, and state machines in concrete gameplay systems.",
      "Experimented with grid pathfinding and heat values to influence enemy movement.",
    ],
    link: "/projects/enchanted-defense",
    orgaType: " - ",
    orgaName: "Personal Project",
    game: "Enchanted Defense",
    date: "2023-2024",
    duration: "Side project",
    teamSize: "Solo",
  },
  {
    id: 5,
    title: "Duskborn - Gameplay Programming and Technical Leadership",
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
    duration: "4 Months",
    teamSize: "18",
  },
  {
    id: 6,
    title: "Curse of Immortality - Enemy AI and Combat Systems",
    paragraph:
      "Curse of Immortality is a roguelite dungeon crawler where I focused on enemy behavior, combat systems, and AI support code. My work included logic for multiple enemy types, a heat-based extension to the custom pathfinding system, and arena traps that had to integrate cleanly into the shared damage and encounter flow.",
    src: "/images/projects/curse-of-immortality/Curse_of_Immortality_Fight.gif",
    tags: ["C++", "Unreal Engine", "Blueprints", "Git", "Confluence"],
    keyPoints: [
      "Implemented behavior for multiple enemy archetypes with state-machine driven combat logic.",
      "Extended custom pathfinding with static and dynamic heat maps so enemies could avoid dangerous or crowded routes.",
      "Integrated arena traps into the same combat flow as enemies and player damage systems.",
      "Worked on gameplay code in Unreal Engine 5.0 using both C++ and Blueprint-facing systems.",
    ],
    link: "/projects/curse-of-immortality",
    orgaType: "University",
    orgaName: "Hochschule der Medien",
    game: "Curse of Immortality",
    date: "2023",
    duration: "3 Months",
    teamSize: "5",
  },
  {
    id: 7,
    title: "Crunch Time",
    paragraph:
      "Crunch Time was created during BeansJam 2022 and turns late-night office work into a fast little resource-management game. I worked on gameplay programming, including the player and Sandman behavior, the elevator mechanic, sound, UI, and a small state machine generator plugin that helped speed up iteration during the jam.",
    src: "/images/projects/crunch-time/Crunch_Time.gif",
    tags: ["Godot", "GDScript", "Git", "Game Jam"],
    keyPoints: [
      "Built the player gameplay loop around carrying items, delivering drinks, and punching the Sandman.",
      "Implemented the elevator mechanic that ties the whole office layout together.",
      "Handled sound and UI implementation during a 48-hour jam schedule.",
      "Used a custom Godot state machine generator plugin to speed up character-logic iteration.",
    ],
    link: "/projects/crunch-time",
    orgaType: "Game Jam",
    orgaName: "BeansJam 2022",
    game: "Crunch Time",
    date: "2022",
    duration: "48 hours",
    teamSize: "3",
  },
  {
    id: 8,
    title: "Scary Dark Dungeon",
    paragraph:
      "Scary Dark Dungeon was created during miniBeansjam 9 as a compact atmospheric adventure with exploration, dialogue, and light combat. My work focused on level and story design, dialogue implementation, sound, and enemy behavior built with my Godot state machine workflow.",
    src: "/images/projects/scary-dark-dungeon/SDD_scene_1.gif",
    tags: ["Godot", "GDScript", "Git", "Game Jam"],
    keyPoints: [
      "Implemented dialogue flow and animalese-style dialogue sounds to strengthen atmosphere without full voice acting.",
      "Built enemy behavior with a reusable state machine setup in Godot 4.",
      "Connected story progression to environment interactions such as door events and signals.",
      "Worked on sound and level progression to support the game's moody pacing.",
    ],
    link: "/projects/scary-dark-dungeon",
    orgaType: "Game Jam",
    orgaName: "miniBeansjam 9",
    game: "Scary Dark Dungeon",
    date: "2023",
    duration: "48 hours",
    teamSize: "3",
  },
];

export const featuredPortfolioProjects = portfolioProjects
  .filter((project) => !project.tags.includes("Game Jam"))
  .slice(0, 5);

export const gameJamProjects = portfolioProjects.filter((project) =>
  project.tags.includes("Game Jam"),
);

export const getPortfolioProjectsByTags = (tags: string[]) => {
  if (tags.length === 0) {
    return portfolioProjects;
  }

  return portfolioProjects.filter((project) =>
    tags.every((tag) => project.tags.includes(tag)),
  );
};

export const getPortfolioProjectByLink = (link: string) =>
  portfolioProjects.find((project) => project.link === link);

export const getPortfolioProjectByLinkOrThrow = (link: string) => {
  const project = getPortfolioProjectByLink(link);

  if (!project) {
    throw new Error(`Portfolio project not found for link: ${link}`);
  }

  return project;
};

export const portfolioProjectTags = Array.from(
  new Set(portfolioProjects.flatMap((project) => project.tags)),
).sort();
