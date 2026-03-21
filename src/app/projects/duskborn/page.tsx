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
  enemySpawnSnippet,
  grapplingHookSetupSnippet,
  itemFactorySnippet,
  movementStateSnippet,
  prosthesisSwapSnippet,
  triggerSnippet,
} from "@/code/cppDuskborn";

export const metadata: Metadata = {
  title: "Duskborn",
  description: "Gameplay programming and technical leadership on Duskborn.",
};

const BlogPage = () => {
  return (
    <>
      <section className="pt-[50px] md:pb-[100px] lg:pt-[80px]">
        <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="mb-10 w-full md:mb-50 lg:w-8/12">
              <ProjectBlogHeader projectLink="/projects/duskborn" />

              <Roles roles={["Game Programmer", "Tech Lead"]}></Roles>

              <Paragraph>
                Duskborn is a third-person shooter roguelite built in Unreal
                Engine 5.1 during the game development lecture at Hochschule der
                Medien. The setup was intentionally close to a real production:
                18 students worked across different departments, with shared
                milestone planning, separate responsibilities, and a dedicated
                engineering team. My main roles were game programmer and tech
                lead. In the course README the role is called Head of
                Engineering, and in practice that meant leading a team of three
                programmers while also owning a large slice of the gameplay
                implementation myself.
              </Paragraph>

              <Paragraph>
                Because the original project was developed in Perforce, the
                public GitHub repository is a curated code showcase rather than
                the full production history. Even so, it captures the systems I
                was most involved in: player movement, the grappling hook,
                modular prostheses, a trigger-and-effect upgrade framework, the
                Destructor enemy, and encounter spawning. This post follows the
                same spirit as my other project pages and focuses on the
                engineering decisions that made those features work together.
              </Paragraph>

              <BlogLink
                title="Play on Steam: "
                link="https://store.steampowered.com/app/2474900/Duskborn/"
                linkName="Duskborn"
              />
              <BlogLink
                title="Check out the Repository: "
                link="https://github.com/MangiameliFabio/Duskborn"
                linkName="Public code showcase"
              />
              <BlogLink
                title="Play the release I worked on: "
                link="https://github.com/MangiameliFabio/Duskborn/releases/tag/Build"
                linkName="GitHub release"
              />
              <BlogLink
                title="Watch the walkthrough: "
                link="https://drive.google.com/file/d/1FfdXbqWHlRajfGuDcEFj04kqFZ-m8qsq/view?usp=drive_link"
                linkName="Video walkthrough"
              />

              <ImageBlock
                src="/images/projects/duskborn/Duskborn_Grappling.gif"
                caption="Traversal in Duskborn combines sprinting, grappling, dashing, and jetpack movement."
                height={420}
              />

              <TableOfContents />

              <SectionTitle>
                Running a student project like production
              </SectionTitle>

              <Paragraph>
                One of the things that made Duskborn special was how strongly it
                tried to mirror an actual studio workflow. The team was split
                into departments, milestone goals were discussed across leads,
                and engineering had to balance feature delivery with keeping the
                pipeline usable for everyone else. My responsibility was not
                only to write gameplay code, but also to create enough structure
                that the rest of the engineering work could move smoothly.
              </Paragraph>

              <BulletList
                title="On the tech lead side, that meant:"
                items={[
                  "leading a team of three programmers",
                  "organizing weekly engineering meetings",
                  "creating and distributing Jira tasks",
                  "maintaining the Perforce depot and onboarding material",
                  "working with the other department heads to define milestone goals",
                ]}
              />

              <Paragraph>
                I liked that split a lot. It forced me to think beyond my own
                tasks and look at the project as a system: how work is broken
                down, how teammates get unblocked, and how code should be
                structured so designers and artists can keep moving. That same
                mindset also shaped the gameplay systems I implemented. I tried
                to build tools and abstractions that could support iteration
                instead of solving only the immediate case.
              </Paragraph>

              <SectionTitle>Building the player controller</SectionTitle>

              <SubsectionTitel>
                State-driven traversal and combat
              </SubsectionTitel>

              <Paragraph>
                The player in Duskborn can sprint, dash, grapple, hover with a
                jetpack, attack, switch prostheses, and chain those actions
                together in different combinations. That quickly becomes messy
                if every input directly checks every other possible condition. I
                handled that by routing input through state objects. The current
                movement state decides what an input means, and the combat state
                can run alongside it when the player is attacking.
              </Paragraph>

              <CodeBlock code={movementStateSnippet} language="cpp" />

              <Paragraph>
                This is a small excerpt from the ground movement state, but it
                shows the key idea well. The same input can lead to very
                different outcomes depending on context. Jump may become a
                normal jump or transition into the jetpack state. Secondary
                action may do nothing or enter grappling. Sprint, dash, and
                prosthesis swap are all explicit state transitions. That kept
                the controller readable while still giving the player a lot of
                freedom.
              </Paragraph>

              <SubsectionTitel>
                A grappling hook with physics, not teleportation
              </SubsectionTitel>

              <Paragraph>
                The grappling hook was one of the mechanics I enjoyed the most.
                Instead of faking the motion as a straight pull, I used a
                separate hook actor with a physics constraint and a player
                attachment sphere. That made it possible to support swinging,
                pulling, and grappling onto moving enemies while still keeping
                the movement grounded in physical rules.
              </Paragraph>

              <CodeBlock code={grapplingHookSetupSnippet} language="cpp" />

              <Paragraph>
                The setup function creates the connection between player and
                hook, optionally attaches the hook to an enemy component, and
                resets the physics state so the swing starts from the current
                player momentum. Combined with the grappling state logic, this
                gave us a movement system where rope length, pull direction,
                dash, and jetpack fuel all interact instead of living in
                isolation.
              </Paragraph>

              <ImageBlock
                src="/images/projects/duskborn/Duskborn_Grappling.gif"
                caption="The grappling hook supported both traversal and combat repositioning."
                height={420}
              />

              <SectionTitle>
                Modular prostheses and combat abilities
              </SectionTitle>

              <Paragraph>
                Duskborn&apos;s combat is built around replaceable arm
                prostheses. Each prosthesis comes with its own attacks, special
                ability, animation setup, cooldowns, and damage behavior. My
                goal was to make those arms feel like real gameplay modules
                instead of one-off scripts. The player spawns both prostheses at
                runtime, attaches them to the correct sockets, and swaps which
                one is active through a shared controller flow.
              </Paragraph>

              <CodeBlock code={prosthesisSwapSnippet} language="cpp" />

              <Paragraph>
                That foundation made it much easier to support different combat
                identities. A rifle prosthesis could expose ranged states and
                cooldown logic, while the sword prosthesis could own combo and
                skewer behavior, yet both still fit into the same player-side
                input pipeline. It also gave UI and animation a single place to
                react whenever the active arm changed.
              </Paragraph>

              <ImageBlock
                src="/images/projects/duskborn/Duskborn_WalkerFight.gif"
                caption="Combat encounters were built around quick weapon swaps and aggressive movement."
                height={420}
              />

              <SectionTitle>An upgrade system built for designers</SectionTitle>

              <Paragraph>
                Another major task was the upgrade system. The game combines
                effect parts and trigger parts into items, which lets players
                build synergies over the course of a run. I wanted the framework
                to separate the reusable engineering layer from the actual
                gameplay content, so that specific effects could later be
                authored more easily without rewriting the whole system.
              </Paragraph>

              <CodeBlock code={itemFactorySnippet} language="cpp" />

              <Paragraph>
                The item factory is the assembly step. It creates the runtime
                item, spawns the corresponding effect actor, initializes it with
                trigger-specific scaling, and registers the item with the
                trigger manager. From there, the observer pattern takes over.
              </Paragraph>

              <CodeBlock code={triggerSnippet} language="cpp" />

              <Paragraph>
                Triggers collect subscribers and notify equipped items once a
                condition is fulfilled. Some fire immediately, others first fill
                a threshold and then enter an active update loop. That gave us a
                flexible framework for conditions like damage thresholds,
                critical hits, or state-based bonuses, while keeping the
                concrete item logic decoupled from the player controller.
              </Paragraph>

              <SectionTitle>Encounter scripting and enemy pacing</SectionTitle>

              <SubsectionTitel>
                Spawn rules that respect the player
              </SubsectionTitel>

              <Paragraph>
                I also worked on encounter flow, including the enemy spawn
                system and the Destructor enemy. For spawning, an important
                requirement was fairness. Enemies should appear often enough to
                keep the level alive, but not pop into existence right in front
                of the player or inside occupied spaces. The spawn logic checks
                several conditions before allowing a new enemy into the world.
              </Paragraph>

              <CodeBlock code={enemySpawnSnippet} language="cpp" />

              <Paragraph>
                The combination of global enemy limits, min and max player
                distance, overlap checks, and field-of-view checks helped keep
                encounters believable. It is a small piece of code, but it has a
                big effect on how polished moment-to-moment gameplay feels.
                Spawn systems are often invisible when they work well, and that
                was exactly the goal here.
              </Paragraph>

              <SubsectionTitel>The Destructor enemy</SubsectionTitel>

              <Paragraph>
                On the enemy side I implemented the Destructor, a stationary
                threat that tracks the player with its rotating platform and
                cannon before firing a beam attack. I liked this task because it
                mixed several disciplines: state logic, aiming, spawned damage
                objects, timing, VFX, and audio. It was a good example of the
                kind of gameplay programming I enjoy most, where behavior only
                comes together once several systems cooperate cleanly.
              </Paragraph>

              <ImageBlock
                src="/images/projects/duskborn/Duskborn_Boss.jpg"
                caption="Boss and encounter work in Duskborn combined behavior logic, presentation, and pacing."
                height={420}
              />

              <Paragraph>
                Duskborn mattered a lot to me because it was one of the first
                times I had to bridge hands-on gameplay programming and team
                leadership at the same time. I was writing movement, combat, and
                upgrade code, but I was also thinking about task ownership,
                engineering communication, and how to keep the technical side of
                a multi-discipline project moving forward. That combination is
                still a big part of how I like to work today.
              </Paragraph>

              <ImageBlock
                src="/images/projects/duskborn/Duskborn_Bottom_Abyss.png"
                caption="The project's vertical spaces were a big reason traversal mechanics mattered so much."
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
