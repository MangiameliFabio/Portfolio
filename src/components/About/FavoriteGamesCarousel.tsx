"use client";

import { useState } from "react";

type FavoriteGame = {
  title: string;
  note: string;
  imageSrc?: string;
};

const favoriteGames: FavoriteGame[] = [
  {
    title: "God of War",
    note:
      "The God of War games are one of my favorite series. I will always have a special connection to them because when I was around 14, I played God of War: Ghost of Sparta on my PSP and got really hooked on one of the unlockables. It was a behind the scenes video showing how the game was made and what the development process looked like. That was probably one of the first times I thought, wow, that is such a cool job. The two newer games especially pulled me all the way in, and I absolutely devoured them.",
    imageSrc: "/images/games/god-of-war.jpg",
  },
  {
    title: "Hunt Showdown",
    note:
      "Hunt is my favorite first person shooter. I have had some of the most intense gunfights in the Bayou, and also some really nerve wracking moments where you are just sneaking around, waiting for another player to make the first move. To me, Hunt has outstanding game design. So much of the game works through its audio, and you really have to listen carefully to understand a situation. Every weapon feels different and offers its own unique kind of gunplay. I always enjoy coming back to it for a few rounds with my friends.",
    imageSrc: "/images/games/hunt.avif",
  },
  {
    title: "The Finals",
    note:
      "Right now, The Finals is the game I play most when I am gaming with my friends. In my opinion, Embark brought a really fresh energy to the competitive FPS space and turned it into an absolute dopamine fest on screen. The Finals also fascinates me on a technical level. That kind of physical destruction, while also having to stay synchronized and performant, is just completely insane. I would love at some point to look behind the curtains at embark and learn how they managed to achive this technical masterpiece.",
    imageSrc: "/images/games/finals.jpg",
  },
  {
    title: "The Witcher",
    note:
      "I have played all three Witcher games, and even though I got stuck in the first one back then and never finished it, I should probably give it another chance. For me, especially the second and third games are incredible RPGs. They create a world you can completely lose yourself in. Whether you are standing on the cliffs of Skellige or riding through the streets of Oxenfurt, the world feels incredibly dynamic and full of life at every corner. Blood and Wine is probably one of the best DLCs ever made and I cant wait to play The Witcher 4!",
    imageSrc: "/images/games/witcher.jpg",
  },
  {
    title: "Stardew Valley",
    note:
      "Compared to the other games on this list, this one is probably a complete change of pace. But what can I say, Stardew Valley completely pulled me into its world and really warmed my heart. It is probably my go to recommendation for someone who has never really played games before, because to me it touches so many different genres at once. It is a farming sim, dungeon crawler, and dating sim all in one, and the whole world feels incredibly cozy, with every character shaping your experience in some way. I really have to take my hat off to ConcernedApe for what he created as a solo developer. That is not something many people can pull off.",
    imageSrc: "/images/games/stardew.jpg",
  },
];

const FavoriteGamesCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const previousGame = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? favoriteGames.length - 1 : currentIndex - 1,
    );
  };

  const nextGame = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === favoriteGames.length - 1 ? 0 : currentIndex + 1,
    );
  };

  const activeGame = favoriteGames[activeIndex];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-two backdrop-blur-sm md:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="mt-2 text-2xl font-bold text-white">
            Games that inspire me!
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={previousGame}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-primary hover:text-primary"
            aria-label="Show previous game"
          >
            {"<"}
          </button>
          <button
            type="button"
            onClick={nextGame}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-primary hover:text-primary"
            aria-label="Show next game"
          >
            {">"}
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 rounded-2xl border border-white/10 bg-[#161d2a] p-6 md:grid-cols-[0.9fr_1.1fr] md:p-8">
        <div className="relative min-h-[305px] overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-primary/20 via-[#1e2635] to-[#0f1420]">
          {activeGame.imageSrc ? (
            <img
              src={activeGame.imageSrc}
              alt={`${activeGame.title} key art`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full min-h-[280px] flex-col justify-end bg-[radial-gradient(circle_at_top_left,_rgba(74,108,247,0.45),_transparent_45%),linear-gradient(160deg,_rgba(255,255,255,0.08),_rgba(8,12,20,0.96))] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Game Art
              </p>
              <h4 className="mt-3 text-3xl font-bold text-white">
                {activeGame.title}
              </h4>
              <p className="mt-3 max-w-xs text-sm leading-6 text-body-color-dark">
                Add a local image path or URL in the carousel data to show the
                game artwork here.
              </p>
            </div>
          )}
        </div>

        <div>
          <h4 className="mt-5 text-3xl font-bold text-white">
            {activeGame.title}
          </h4>

          <p className="mt-4 max-w-2xl text-base leading-8 text-body-color-dark">
            {activeGame.note}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {favoriteGames.map((game, index) => (
          <button
            key={game.title}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              index === activeIndex
                ? "border-primary bg-primary text-white"
                : "border-white/10 bg-white/5 text-body-color-dark hover:border-primary hover:text-white"
            }`}
            aria-label={`Show ${game.title}`}
          >
            {game.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FavoriteGamesCarousel;
