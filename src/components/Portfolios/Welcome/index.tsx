import { featuredPortfolioProjects } from "@/data/portfolioProjects";
import PortfolioBottomDecoration from "../PortfolioBottomDecoration";
import PortfolioTopDecoration from "../PortfolioTopDecoration";
import TagButton from "../../Blog/TagButton";
import SingleBlog from "../../Blog/SingleBlog";

const Welcome = () => {
  return (
    <>
      <section
        id="home"
        className="bg-#121723 relative z-10 overflow-hidden pt-[50px] pb-16 md:pb-[100px] lg:pt-[80px]"
      >
        <div className="container">
          <div className="mb-10 flex flex-row items-center md:mb-20">
            <div className="mr-10 hidden w-70 min-w-[300px] xl:block">
              <img
                src="/images/fabio_profile_picture.jpg"
                className="rounded-full"
              ></img>
            </div>
            <div className="flex max-w-[900px] flex-col justify-items-center">
              <h1 className="mb-1 text-3xl leading-tight font-bold text-black sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight dark:text-white">
                Fabio Mangiameli
              </h1>
              <p className="mb-4 text-base leading-relaxed! text-black sm:text-lg md:text-xl dark:text-white">
                My name is Fabio Mangiameli. I currently study Game Technology
                at the IT University of Copenhagen. I also work as a game
                programmer for Chasing Carrots. I love game development and have
                a passion for programming. Have a look at the game projects I
                did during my studies and professional career.
              </p>
              <h2 className="mb-2 text-lg leading-relaxed! font-semibold text-black sm:text-xl md:text-2xl dark:text-white">
                Proficient Programming Languages:
              </h2>
              <div className="mb-4">
                <TagButton text={"C++"} />
                <TagButton text={"C#"} />
                <TagButton text={"GDScript"} />
                <TagButton text={"Blueprints"} />
                <TagButton text={"TypeScript"} />
              </div>
              <h2 className="mb-2 text-lg leading-relaxed! font-semibold text-black sm:text-xl md:text-2xl dark:text-white">
                Tools I am experienced with:
              </h2>
              <div>
                <TagButton text={"Unreal Engine"} />
                <TagButton text={"Godot"} />
                <TagButton text={"Unity"} />
                <TagButton text={"Git"} />
                <TagButton text={"Perforce"} />
                <TagButton text={"Tracy"} />
                <TagButton text={"Codecks"} />
                <TagButton text={"Jira"} />
              </div>
            </div>
          </div>
          <h1 className="mb-4 text-2xl leading-tight font-bold text-black sm:text-3xl sm:leading-tight md:mb-10 md:text-4xl md:leading-tight dark:text-white">
            My favourite projects
          </h1>
          {featuredPortfolioProjects.map((project) => (
            <div key={project.id} className="mb-12">
              <SingleBlog blog={project} />
            </div>
          ))}
        </div>
        <PortfolioTopDecoration />
        <PortfolioBottomDecoration />
      </section>
    </>
  );
};

export default Welcome;
