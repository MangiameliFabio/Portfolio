import { Metadata } from "next";
import SectionTitle from "@/components/Blog/SectionTitel";
import SubsectionTitel from "@/components/Blog/SubsectionTitel";
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
  curseDynamicHeatSnippet,
  curseEnemyStateSnippet,
  cursePathfindingSnippet,
  curseTrapSnippet,
} from "@/code/cppCurseOfImmortality";

export const metadata: Metadata = {
  title: "Curse of Immortality",
  description: "Enemy AI and combat systems for Curse of Immortality.",
};

const BlogPage = () => {
  return (
    <>
      <section className="pt-[50px] md:pb-[100px] lg:pt-[80px]">
        <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="mb-10 w-full md:mb-50 lg:w-8/12">
              <ProjectBlogHeader projectLink="/projects/curse-of-immortality" />

              <Roles roles={["Game Programmer", "AI Programmer"]}></Roles>

              <Paragraph>
                Curse of Immortality is a roguelite dungeon crawler in which the
                player survives arena encounters against a variety of enemy
                types and bosses. This project came before Duskborn and was
                another university production where I focused on enemy behavior,
                combat systems, and AI support code. The public source
                repository is centered on the code I contributed, especially the
                AI folder and related gameplay systems.
              </Paragraph>

              <Paragraph>
                My work covered six enemy archetypes with their own behavior
                logic, animation and attack handling, plus arena traps that had
                to plug into the same combat rules as the rest of the game. I
                also extended our custom pathfinding with a heat system, so
                enemies could reason about danger and not just the shortest
                route. That combination of state-based AI and systemic combat
                work made the project a very good training ground for later
                gameplay programming.
              </Paragraph>

              <BlogLink
                title="Check out the Source Code: "
                link="https://github.com/Vel0X/CurseOfImmortality/tree/main/Source/CurseOfImmortality/AI"
                linkName="AI source folder"
              />
              <BlogLink
                title="Play the latest build: "
                link="https://github.com/Vel0X/CurseOfImmortality/releases/tag/Build"
                linkName="GitHub release"
              />
              <BlogLink
                title="Watch the walkthrough: "
                link="https://drive.google.com/file/d/10kXytsdueNGs8n9KKJV5QznltHu23VWF/view?usp=drive_link"
                linkName="Video walkthrough"
              />

              <ImageBlock
                src="/images/projects/curse-of-immortality/Curse_of_Immortality_Fight.gif"
                caption="The project focused heavily on readable enemy behaviors inside a confined arena."
                height={420}
              />

              <TableOfContents />

              <SectionTitle>
                Enemy behavior built from state machines
              </SectionTitle>

              <Paragraph>
                Most of my work in Curse of Immortality lived inside enemy
                behavior. The game needed a roster of different opponents that
                all followed the same broad conventions while still feeling
                distinct in combat. I handled that by building each enemy around
                a state machine. The states were small and specialized, while
                the controller owned the high-level transitions and pathfinding
                helpers.
              </Paragraph>

              <CodeBlock code={curseEnemyStateSnippet} language="cpp" />

              <Paragraph>
                This excerpt from the Deprived enemy shows the pattern well. The
                state machine creates all of the enemy&apos;s states up front
                and exposes focused helpers like finding a path to the player or
                to a random reachable point. That kept each concrete state
                simpler, because it could focus on deciding what to do next
                rather than rebuilding navigation logic every time.
              </Paragraph>

              <BulletList
                title="Across the project, that approach helped with:"
                items={[
                  "enemy-specific attack and recovery states",
                  "shared movement and path-following helpers",
                  "clear transitions between idle, chase, attack, and special phases",
                  "animation and effects that could be triggered from predictable state boundaries",
                ]}
              />

              <SectionTitle>Heat-based pathfinding</SectionTitle>

              <Paragraph>
                One of the more interesting technical additions was a heat map
                on top of our grid-based pathfinding. I wanted enemies to care
                not only about whether a tile was walkable, but also about how
                risky or crowded it was. That made it possible to discourage
                certain routes without hard-blocking them entirely.
              </Paragraph>

              <CodeBlock code={cursePathfindingSnippet} language="cpp" />

              <Paragraph>
                During path search, each node adds both static and dynamic heat
                to its travel cost. Static heat marks dangerous or undesirable
                level areas. Dynamic heat comes from the current world state,
                mostly other enemies and especially big threats like Moloch. The
                result is still an A* path, but now it naturally prefers less
                dangerous routes.
              </Paragraph>

              <CodeBlock code={curseDynamicHeatSnippet} language="cpp" />

              <Paragraph>
                The dynamic map is recalculated over time. Regular enemies add a
                modest penalty to their tile and neighbors, while large enemies
                project much stronger heat forward. That was useful both for AI
                readability and for combat feel, because it reduced awkward
                crowding and helped enemies spread out more believably.
              </Paragraph>

              <SubsectionTitel>Why this mattered in play</SubsectionTitel>

              <Paragraph>
                Arena combat gets messy very quickly when many enemies all pick
                the exact same shortest path. The heat layer gave us a softer
                form of control. Instead of forbidding behavior outright, it
                nudged the AI toward better choices and made the encounters feel
                more intentional.
              </Paragraph>

              <ImageBlock
                src="/images/projects/curse-of-immortality/Curse_of_Immortality_Combat.png"
                caption="The AI systems had to stay readable even when multiple enemies and projectiles overlapped."
                height={420}
              />

              <SectionTitle>Integrating arena traps into combat</SectionTitle>

              <Paragraph>
                Another task was wiring arena traps into the damage and combat
                flow. Traps needed to activate and deactivate based on arena
                conditions, priority rules, and trap type, while still behaving
                like part of the same gameplay ecosystem rather than a separate
                minigame bolted on afterward.
              </Paragraph>

              <CodeBlock code={curseTrapSnippet} language="cpp" />

              <Paragraph>
                The trap component subscribes itself to trap-manager delegates
                on begin play. From that point on it can react to global
                activation or deactivation events without the arena needing to
                hard-code knowledge about each individual trap instance. I liked
                this setup because it scales well when you start mixing
                different trap priorities and encounter rules.
              </Paragraph>

              <Paragraph>
                Curse of Immortality was an important project for me because it
                was where I first spent serious time thinking about enemy AI as
                a production problem, not just an isolated behavior script. It
                taught me a lot about state machines, combat readability, and
                how much better encounters feel when supporting systems like
                pathfinding and traps are designed with the AI in mind from the
                start.
              </Paragraph>

              <ImageBlock
                src="/images/projects/curse-of-immortality/Curse_of_Immortality_Boss.gif"
                caption="Boss encounters pushed the same AI and combat foundations into larger, more staged fights."
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
