"use client";

import BlogTitle from "@/components/Blog/BlogTitel";
import Paragraph from "@/components/Blog/Paragraph";
import SingleBlog from "@/components/Blog/SingleBlog";
import { gameJamProjects } from "@/data/portfolioProjects";

const GameJamsContent = () => {
  return (
    <section className="relative overflow-hidden pt-[120px] pb-16 md:pb-[100px]">
      <div className="container">
        <div className="mx-auto mb-10 md:mb-14">
          <BlogTitle>Game Jams</BlogTitle>
          <Paragraph>
            Game jams are where I like to test ideas quickly, build weird little
            systems under pressure, and finish projects that would probably
            never exist otherwise. This page collects the jam games from my
            portfolio in one place, while they also remain part of the main All
            Projects overview.
          </Paragraph>
          <Paragraph>
            These projects are usually small, but they are great snapshots of
            how I work with constraints: short timelines, limited content, fast
            iteration, and a strong need for clear gameplay communication.
          </Paragraph>
        </div>

        <div className="text-body-color mb-4 text-sm md:text-base">
          Showing {gameJamProjects.length} game jam project
          {gameJamProjects.length === 1 ? "" : "s"}
        </div>

        <div className="space-y-12">
          {gameJamProjects.map((project) => (
            <SingleBlog key={project.id} blog={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameJamsContent;
