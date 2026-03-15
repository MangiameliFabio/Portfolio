"use client";

import { useState } from "react";

type FavoriteGame = {
  title: string;
  year: string;
  genre: string;
  note: string;
  imageSrc?: string;
};

const favoriteGames: FavoriteGame[] = [
  {
    title: "Outer Wilds",
    year: "2019",
    genre: "Exploration Puzzle",
    note:
      "A masterclass in curiosity-driven design. It made me appreciate how powerful discovery and environmental storytelling can be.",
    imageSrc: "",
  },
  {
    title: "Hades",
    year: "2020",
    genre: "Action Roguelike",
    note:
      "I love how polished the combat feels while the narrative keeps moving forward run after run. It is a great example of mechanics and story supporting each other.",
    imageSrc: "",
  },
  {
    title: "Portal 2",
    year: "2011",
    genre: "Puzzle Platformer",
    note:
      "Its puzzle design is incredibly clean. Every mechanic is introduced with confidence and expanded without wasting the player's time.",
    imageSrc: "",
  },
  {
    title: "Deep Rock Galactic",
    year: "2020",
    genre: "Co-op Shooter",
    note:
      "A huge inspiration for teamwork and replayability. The way it encourages cooperation without overcomplicating things is brilliant.",
    imageSrc: "",
  },
  {
    title: "Celeste",
    year: "2018",
    genre: "Precision Platformer",
    note:
      "It shows how responsive controls, strong level design, and emotional clarity can come together to create something really memorable.",
    imageSrc: "",
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
            Games that shaped my taste
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
        <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-primary/20 via-[#1e2635] to-[#0f1420]">
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
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {activeGame.year}
            </span>
            <span className="rounded-full border border-[#959CB133] bg-[#959CB11A] px-3 py-1 text-sm font-medium text-[#959CB1]">
              {activeGame.genre}
            </span>
          </div>

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
