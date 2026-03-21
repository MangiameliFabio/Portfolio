import BlogTitle from "./BlogTitel";
import Statistics from "./Statistics";
import TagButton from "./TagButton";
import { getPortfolioProjectByLinkOrThrow } from "@/data/portfolioProjects";

type ProjectBlogHeaderProps = {
  projectLink: string;
};

const ProjectBlogHeader = ({ projectLink }: ProjectBlogHeaderProps) => {
  const project = getPortfolioProjectByLinkOrThrow(projectLink);

  return (
    <>
      <BlogTitle>{project.title}</BlogTitle>

      <div className="z-20 mb-2 flex flex-wrap md:mb-6">
        {project.tags.map((tag, index) => (
          <TagButton key={index} text={tag} />
        ))}
      </div>

      <Statistics stat={project} />
    </>
  );
};

export default ProjectBlogHeader;
