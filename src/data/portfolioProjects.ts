import { Blog } from "@/types/blog";

export const portfolioProjects: Blog[] = [
  {
    id: 1,
    title: "Game Programming for an unanounced Co-op Exploration Game",
    paragraph:
      "During the development of Halls of Torment, Chasing Carrots began prototyping a new title and I joined during the early stages, taking on a wide range of tasks. My main focus was building and iterating on core gameplay and technical systems while helping shape a stable multiplayer foundation for the project. The work required close collaboration, rapid prototyping, and solving practical engineering challenges to support the game's direction.",
    src: "/images/projects/frozen-bulgur/FrozenBulgurShowCasePart2.mp4",
    tags: ["C++", "Godot", "GDScript", "Multiplayer", "Codecks"],
    keyPoints: [
      "Refactored Godot's multiplayer networking with a custom C++ system supporting ENet and Epic Online Services. Integrated the architecture into the codebase and fixed a critical multi-mesh limitation in the EOS Godot extension.",
      "Optimized multiplayer systems to reduce crashes and disconnects by stress-testing under high latency and packet loss, identifying and fixing critical networking bugs.",
      "Implemented a player downed state and revive mechanic to enhance cooperative gameplay and failure recovery.",
      "Focused on game systems such as the room temperature system, electricity system and cruiser engine system",
    ],
    link: "/projects/coop-exploration",
    orgaType: "Company",
    orgaName: "Chasing Carrots",
    game: "Unanounced Titel",
    date: "2024-2026",
    duration: "1.5 years",
    teamSize: "10",
  },
  {
    id: 2,
    title: "Custom Multiplayer Networking in Godot",
    paragraph:
      "I replaced Godot's built-in MultiplayerAPI with a custom networking layer that directly interfaces with MultiplayerPeer, improving flexibility, modularity, and authority handling. I also implemented full peer-to-peer network meshes using ENet and Epic Online Services, enabling low-latency client-to-client communication and support for features such as proximity voice chat. The system was integrated into the studio's codebase, tested in gameplay sessions, and extended with a C++ fix to support multiple concurrent network meshes.",
    src: "/images/projects/godot-networking/GodotNetworkingShowCase.mp4",
    tags: ["C++", "Godot", "GDScript", "Codecks"],
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
    game: "Unanounced Titel",
    date: "2025",
    duration: "4 Months",
    teamSize: "10",
  },
  {
    id: 3,
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
  },
];

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

export const portfolioProjectTags = Array.from(
  new Set(portfolioProjects.flatMap((project) => project.tags)),
).sort();
