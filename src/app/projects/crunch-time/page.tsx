import { Metadata } from "next";
import SectionTitle from "@/components/Blog/SectionTitel";
import Paragraph from "@/components/Blog/Paragraph";
import BlogLink from "@/components/Blog/BlogLink";
import BulletList from "@/components/Blog/BulletList";
import CodeBlock from "@/components/Blog/CodeBlock";
import TableOfContents from "@/components/Blog/TableOfContents";
import Roles from "@/components/Blog/Roles";
import ImageBlock from "@/components/Blog/ImageBlock";
import GameEmbed from "@/components/Blog/GameEmbed";
import ProjectBlogHeader from "@/components/Blog/ProjectBlogHeader";
import PageStyling from "@/components/Common/PageStyling";
import {
  crunchElevatorSnippet,
  crunchPlayerSnippet,
  crunchStateMachineGeneratorSnippet,
} from "@/code/gdCrunchTime";

export const metadata: Metadata = {
  title: "Crunch Time",
  description: "A 48-hour jam game about keeping office workers awake.",
};

const BlogPage = () => {
  return (
    <>
      <section className="pt-[50px] md:pb-[100px] lg:pt-[80px]">
        <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="mb-10 w-full md:mb-50 lg:w-8/12">
              <ProjectBlogHeader projectLink="/projects/crunch-time" />

              <Roles roles={["Gameplay Programmer"]}></Roles>

              <Paragraph>
                Crunch Time was built during BeansJam 2022 around the theme
                &quot;We have to stay awake&quot;. You play as an intern in a
                late-night office and try to keep your coworkers productive by
                delivering the drinks they ask for, all while punching the
                Sandman whenever he shows up to ruin the shift. It is a small
                and silly premise, but it worked very well for a jam because it
                created immediate time pressure, clear goals, and lots of room
                for humorous interactions.
              </Paragraph>

              <Paragraph>
                I worked on the programming side together with another
                programmer, while the third teammate focused on visuals. My main
                contributions were player and Sandman logic, the elevator
                mechanic, sound integration, UI work, and the state machine
                generator plugin we used to speed up character logic. For a
                48-hour jam, getting iteration speed right mattered just as much
                as the actual features.
              </Paragraph>

              <BlogLink
                title="Check out the Repository: "
                link="https://github.com/MangiameliFabio/Crunch_Time"
                linkName="Source code"
              />
              <BlogLink
                title="Play the latest build: "
                link="https://github.com/MangiameliFabio/Crunch_Time/releases/tag/Build"
                linkName="GitHub release"
              />
              <BlogLink
                title="Play in the browser: "
                link="https://zwietabak.itch.io/crunch-time"
                linkName="Itch.io"
              />
              <BlogLink
                title="Watch the walkthrough: "
                link="https://drive.google.com/file/d/17bCTvuVgCx2NhOgqbx8xps5Kz3wg85nf/view?usp=drive_link"
                linkName="Video walkthrough"
              />

              <GameEmbed
                src="/webbuilds/CrunchTime/index.html"
                title="Crunch Time web build"
                description="This local Godot web build is embedded directly on the page. If audio or focus feels odd, click into the game first or switch to fullscreen."
              />

              <ImageBlock
                src="/images/projects/crunch-time/Crunch_Time.gif"
                caption="The jam loop was all about juggling worker needs, inventory, and a very rude Sandman."
                height={420}
              />

              <TableOfContents />

              <SectionTitle>Designing for a 48-hour jam</SectionTitle>

              <Paragraph>
                Jam projects need a gameplay loop that can be understood almost
                immediately. Crunch Time succeeds because everything feeds the
                same core idea: workers ask for coffee or cola, you fetch the
                right item, and you stop the Sandman before he puts people to
                sleep. That gave us a structure where every new feature made the
                same central loop more chaotic instead of fragmenting it.
              </Paragraph>

              <BulletList
                title="The programming tasks I focused on were:"
                items={[
                  "player character logic",
                  "Sandman behavior",
                  "the elevator mechanic",
                  "sound implementation",
                  "UI implementation",
                ]}
              />

              <SectionTitle>Player logic and slapstick combat</SectionTitle>

              <Paragraph>
                The player needed to feel responsive while also reflecting what
                they were currently carrying. Coffee pots, cola crates, and the
                attack animation all change the visual presentation, and the hit
                ray needs to line up with the current facing direction so
                punching the Sandman feels fair.
              </Paragraph>

              <CodeBlock code={crunchPlayerSnippet} language="gdscript" />

              <Paragraph>
                The player script checks whether the attack ray currently hits a
                Sandman, flips sprites based on movement direction, and swaps
                textures depending on the object in hand. It is simple code, but
                it does a lot of work for readability. In a jam, small feedback
                wins like this are often what make a game feel finished.
              </Paragraph>

              <SectionTitle>The elevator as level glue</SectionTitle>

              <Paragraph>
                The office only works if the player can move quickly between its
                floors. The elevator is the main pacing device because it forces
                little moments of commitment. Once you trigger a move, input is
                briefly locked, collisions are adjusted, and the platform tweens
                to its new floor before handing control back.
              </Paragraph>

              <CodeBlock code={crunchElevatorSnippet} language="gdscript" />

              <Paragraph>
                I liked this mechanic because it is both spatial navigation and
                time management. The player has to decide when it is worth going
                upstairs or downstairs, and that turns a very small map into a
                much more interesting juggling problem.
              </Paragraph>

              <ImageBlock
                src="/images/projects/crunch-time/Crunch_Time_Zoomed_In.gif"
                caption="Small office interactions became much more readable once movement and floor switching felt reliable."
                height={420}
              />

              <SectionTitle>
                Faster iteration with a state machine generator
              </SectionTitle>

              <Paragraph>
                For character logic in Crunch Time I used a Godot plugin I had
                built for generating state machine boilerplate. That was
                especially useful in a game jam, because every bit of repeated
                setup work you can automate turns directly into more time for
                tuning the actual game.
              </Paragraph>

              <CodeBlock
                code={crunchStateMachineGeneratorSnippet}
                language="gdscript"
              />

              <Paragraph>
                The plugin adds a small editor dock that can generate the state
                machine node, the base state, and new states directly into the
                project tree from templates. It is not a huge system, but it is
                exactly the kind of productivity tool that pays off under time
                pressure. Crunch Time ended up placing seventh out of 65
                submissions, and the ability to move quickly definitely helped.
              </Paragraph>

              <ImageBlock
                src="/images/projects/crunch-time/Crunch_Time_Menu.PNG"
                caption="Even the UI and presentation were built around making the office chaos readable at a glance."
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
