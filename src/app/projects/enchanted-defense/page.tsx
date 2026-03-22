import { Metadata } from "next";
import SectionTitle from "@/components/Blog/SectionTitel";
import Paragraph from "@/components/Blog/Paragraph";
import BlogLink from "@/components/Blog/BlogLink";
import BulletList from "@/components/Blog/BulletList";
import CodeBlock from "@/components/Blog/CodeBlock";
import TableOfContents from "@/components/Blog/TableOfContents";
import Roles from "@/components/Blog/Roles";
import ImageBlock from "@/components/Blog/ImageBlock";
import ProjectBlogHeader from "@/components/Blog/ProjectBlogHeader";
import PageStyling from "@/components/Common/PageStyling";
import {
  enchantedCommandInputSnippet,
  enchantedMainLoopSnippet,
  enchantedPathfindingSnippet,
} from "@/code/cppEnchantedDefense";
import Links from "@/components/Blog/Links";

export const metadata: Metadata = {
  title: "Enchanted Defense",
  description: "A custom C++ engine project built with SDL2.",
};

const BlogPage = () => {
  return (
    <>
      <section className="pt-[50px] md:pb-[100px] lg:pt-[80px]">
        <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="mb-10 w-full md:mb-50 lg:w-8/12">
              <ProjectBlogHeader projectLink="/projects/enchanted-defense" />

              <Roles roles={["Game Programmer", "Engine Programmer"]}></Roles>

              <Paragraph>
                Enchanted Defense started as a learning project. I wanted to get
                closer to the internals of a game engine, so instead of using an
                existing engine I built a small one myself in C++ with SDL2 and
                then used it to make a top-down shooter. The project is heavily
                inspired by the LazyFoo SDL tutorial series, but it gradually
                grew into a playground for architecture patterns, tooling, and
                debugging helpers.
              </Paragraph>

              <Paragraph>
                What I like about this project is that it sits right between
                gameplay code and engine code. Building the game forced me to
                think about update loops, rendering, input routing, animation
                state handling, UI, pathfinding, and debugging support all at
                once. It was one of the clearest examples of how much a game can
                teach you when you own the underlying framework as well.
              </Paragraph>

              <Links>
                <BlogLink
                  title="Check out the Repository: "
                  link="https://github.com/MangiameliFabio/Enchanted-Defense"
                  linkName="Source code"
                />
                <BlogLink
                  title="Play the latest build: "
                  link="https://github.com/MangiameliFabio/Enchanted-Defense/releases/tag/Build"
                  linkName="GitHub release"
                />
                <BlogLink
                  title="Watch the walkthrough: "
                  link="https://drive.google.com/file/d/1DcSH0mLjfLbaEGVx8fJEFSZSX3N4aQHp/view?usp=drive_link"
                  linkName="Video walkthrough"
                />
              </Links>

              <ImageBlock
                src="/images/projects/enchanted-defense/Enchated_Defense.gif"
                caption="Enchanted Defense was both a game project and a way to explore engine architecture."
                height={420}
              />

              <TableOfContents />

              <SectionTitle>Owning the whole game loop</SectionTitle>

              <Paragraph>
                The biggest difference when working on a custom engine is that
                the usual invisible infrastructure becomes your own
                responsibility. Initialization, timing, the object update loop,
                rendering, shutdown, and optional profiling all had to be wired
                together manually. That work made the rest of the game possible.
              </Paragraph>

              <CodeBlock code={enchantedMainLoopSnippet} language="cpp" />

              <Paragraph>
                The main loop is intentionally straightforward. Initialize the
                engine systems, hand control over to the game manager, poll SDL
                events, notify the input layer, update active objects, render,
                and end the tick. There is nothing particularly flashy about it,
                but writing it yourself changes how you think about engine
                behavior. You stop taking the frame lifecycle for granted.
              </Paragraph>

              <SectionTitle>
                Using programming patterns as real tools
              </SectionTitle>

              <Paragraph>
                One of my goals with Enchanted Defense was to learn common game
                programming patterns by actually using them in a complete game
                rather than only reading about them. The command pattern was one
                of the most useful examples because it helped separate raw input
                from player behavior.
              </Paragraph>

              <CodeBlock code={enchantedCommandInputSnippet} language="cpp" />

              <Paragraph>
                The input manager polls SDL keyboard state and delegates actions
                to command objects instead of hard-coding all behavior inline.
                That kept the player logic cleaner and made it easier to expand
                the set of supported actions. The same project also uses
                observer-style notifications, animation state machines, and a
                prototype-style spawner for enemies, so the architecture became
                a practical study in patterns rather than an academic one.
              </Paragraph>

              <BulletList
                title="Some of the systems I explored in the project:"
                items={[
                  "a singleton-backed global engine and game state",
                  "observer-style notifications for gameplay events",
                  "state machines for animation switching",
                  "UI widgets and scene transitions inside the same custom framework",
                ]}
              />

              <SectionTitle>Gameplay systems inside the engine</SectionTitle>

              <Paragraph>
                Building a custom engine only becomes meaningful when gameplay
                systems can make real use of it. For Enchanted Defense, that
                included enemies navigating the level, shooting, colliding, and
                reacting to the player. I also experimented with a pathfinding
                grid that could bias navigation using per-node heat values.
              </Paragraph>

              <CodeBlock code={enchantedPathfindingSnippet} language="cpp" />

              <Paragraph>
                This pathfinding code is still quite compact, but it already
                shows several ideas that would later reappear in larger
                projects: grid conversion between world and node space, A*
                search, avoidance of blocked tiles, and extra cost terms that
                can steer behavior without fully forbidding movement. That kind
                of small experiment was exactly why I built the project in the
                first place.
              </Paragraph>

              <Paragraph>
                Enchanted Defense gave me a much more grounded understanding of
                what an engine actually does for a game. Even simple features
                become more instructive when you have to support them yourself.
                It is still one of the projects I think back to whenever I want
                to remind myself how useful low-level curiosity can be for
                gameplay programming.
              </Paragraph>

              <ImageBlock
                src="/images/projects/enchanted-defense/Enchanted_Defense_Menu.png"
                caption="The project also included custom UI and scene management inside the same engine codebase."
                height={420}
              />
            </div>
          </div>
        </div>
      </section>

      <PageStyling />
    </>
  );
};

export default BlogPage;
