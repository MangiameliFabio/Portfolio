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
  scaryDialogueAudioSnippet,
  scaryDoorSignalSnippet,
  scaryEnemySnippet,
} from "@/code/gdScaryDarkDungeon";

export const metadata: Metadata = {
  title: "Scary Dark Dungeon",
  description: "A narrative horror jam game built in Godot 4.",
};

const BlogPage = () => {
  return (
    <>
      <section className="pt-[50px] md:pb-[100px] lg:pt-[80px]">
        <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="mb-10 w-full md:mb-50 lg:w-8/12">
              <ProjectBlogHeader projectLink="/projects/scary-dark-dungeon" />

              <Roles roles={["Game Designer", "Gameplay Programmer"]}></Roles>

              <Paragraph>
                Scary Dark Dungeon was created during miniBeansjam 9 with the
                theme &quot;We are not alone&quot;. You play John, a confused
                farmer boy who fell into a dungeon and now has to find his way
                out. Compared to Crunch Time, this jam was much more focused on
                atmosphere, dialogue, and light adventure pacing. The project
                mixes exploration, environmental progression, and an eerie
                companion-driven story setup.
              </Paragraph>

              <Paragraph>
                My work on this project centered on level and story design,
                dialogue implementation, sound, and enemy behavior. I reused my
                state machine generator plugin for the enemy logic and combined
                it with Godot 4 navigation, combat, and animation control. On
                the narrative side, I also experimented with animalese-style
                dialogue sounds to make conversations feel more alive without
                needing full voice acting.
              </Paragraph>

              <BlogLink
                title="Check out the Repository: "
                link="https://github.com/zwietabak/beansjam23"
                linkName="Source code"
              />
              <BlogLink
                title="Play the build: "
                link="https://fabiomangiameli.itch.io/scary-dark-dungeon"
                linkName="Itch.io"
              />
              <BlogLink
                title="Watch the walkthrough: "
                link="https://drive.google.com/file/d/1U4cUO2n9wXgaAV6KUcL_lidTCazxMjWr/view?usp=drive_link"
                linkName="Video walkthrough"
              />

              <ImageBlock
                src="/images/projects/scary-dark-dungeon/SDD_scene_1.gif"
                caption="The project leaned much more into mood, pacing, and guided progression than pure combat."
                height={420}
              />

              <TableOfContents />

              <SectionTitle>
                Building atmosphere through dialogue and sound
              </SectionTitle>

              <Paragraph>
                A big part of Scary Dark Dungeon is the feeling that the world
                is talking back to the player. I used the `dialogue_nodes`
                plugin as the framework for the conversations, then added an
                audio dialog manager that cycles through pre-generated
                animalese-style sounds depending on who is currently speaking.
              </Paragraph>

              <CodeBlock code={scaryDialogueAudioSnippet} language="gdscript" />

              <Paragraph>
                I liked this solution because it is lightweight but expressive.
                The dialogue box emits who is currently talking, and the audio
                manager reacts by loading the next matching sample for either
                John or the fairy companion. That made conversations feel much
                more animated without forcing the project into full voice-over
                production during a short jam.
              </Paragraph>

              <BulletList
                title="The presentation work on this project included:"
                items={[
                  "dialogue implementation with dialogue_nodes",
                  "animalese-style dialogue sounds",
                  "general sound implementation and ambience",
                  "story and level progression that framed the player-companion relationship",
                ]}
              />

              <SectionTitle>
                Enemy encounters with state-machine logic
              </SectionTitle>

              <Paragraph>
                Even though the project is more atmospheric than action-heavy,
                it still needed enemies that could detect the player, follow,
                attack, react to damage, and cleanly leave combat again. I used
                my state machine generator plugin here as well, then wired the
                runtime logic into a 3D enemy controller built on Godot 4&apos;s
                navigation and character systems.
              </Paragraph>

              <CodeBlock code={scaryEnemySnippet} language="gdscript" />

              <Paragraph>
                The enemy controller owns detection areas, damage areas,
                navigation, state transitions, and combat reactions. It is a
                good example of why I like state machines for gameplay work:
                they provide a clear place for events like detection, attack
                windows, getting hit, and death without forcing everything into
                one oversized update function.
              </Paragraph>

              <ImageBlock
                src="/images/projects/scary-dark-dungeon/SDD_scene_2.gif"
                caption="Enemy pressure and environmental progression work together to keep the player moving."
                height={420}
              />

              <SectionTitle>
                Using signals to drive world progression
              </SectionTitle>

              <Paragraph>
                I also wanted the environment to respond directly to narrative
                beats. One small but effective example is the big door. Dialogue
                signals trigger a door-opening sequence and sound playback,
                turning story progression into something that visibly changes
                the space around the player.
              </Paragraph>

              <CodeBlock code={scaryDoorSignalSnippet} language="gdscript" />

              <Paragraph>
                This is a small system, but it captures a lot of what I enjoy
                about jam development. The code is short, the effect is clear,
                and it ties together environment art, animation, sound, and
                narrative progression in a way the player understands
                immediately.
              </Paragraph>

              <Paragraph>
                Scary Dark Dungeon was a nice contrast to my more system-heavy
                projects. It reminded me that not every interesting technical
                decision has to be large or abstract. Sometimes a project is
                successful because a few focused systems, like dialogue audio,
                enemy behavior, and environmental signals, work together to sell
                a strong mood.
              </Paragraph>

              <ImageBlock
                src="/images/projects/scary-dark-dungeon/SSD_Screenshot_4.png"
                caption="The jam's visual direction and progression beats were built to support a compact but memorable atmosphere."
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
