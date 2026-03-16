"use client";

import { useMemo, useState } from "react";
import SingleBlog from "@/components/Blog/SingleBlog";
import {
  portfolioProjects,
  portfolioProjectTags,
} from "@/data/portfolioProjects";
import SectionTitle from "@/components/Blog/SectionTitel";
import Paragraph from "@/components/Blog/Paragraph";
import BlogTitle from "@/components/Blog/BlogTitel";

const tagButtonBaseClassName =
  "bg-primary rounded-full mb-2 md:mb-3 mr-1 md:mr-2 inline-flex items-center justify-center px-3 md:px-4 py-1 md:py-2 text-sm md:text-lg duration-300";

const AllProjectsContent = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) {
      return portfolioProjects;
    }

    return portfolioProjects.filter((project) =>
      project.tags.some((tag) => selectedTags.includes(tag)),
    );
  }, [selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((currentTags) =>
      currentTags.includes(tag)
        ? currentTags.filter((currentTag) => currentTag !== tag)
        : [...currentTags, tag],
    );
  };

  const resetFilters = () => {
    setSelectedTags([]);
  };

  return (
    <section className="relative overflow-hidden pb-16 pt-[120px] md:pb-[100px]">
      <div className="container">
        <div className="mx-auto mb-10 md:mb-14">
          <BlogTitle>
            All of my projects
          </BlogTitle>
          <Paragraph>
            Nice, you found the full list of my projects! I started working in game development during my studies in 2021. Here you’ll find games I worked on professionally, projects I did while studying at HdM in Stuttgart and the IT-University of Copenhagen, and also little side projects I created in my free time or during game jams.
          </Paragraph>
        </div>

        <div className="mb-10">
          <SectionTitle>
            Filter by tags
          </SectionTitle>
          <div className="text-sm text-body-color md:text-base mb-2">
            Showing {filteredProjects.length} of {portfolioProjects.length} projects
          </div>

          <div className="mb-4 flex flex-wrap">
            {portfolioProjectTags.map((tag) => {
              const isActive = selectedTags.includes(tag);

              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  aria-pressed={isActive}
                  className={`${tagButtonBaseClassName} ${
                    isActive
                      ? "text-white opacity-100"
                      : "text-black opacity-50 dark:text-white"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
          <p className="mb-2 text-sm text-body-color md:text-base">
            {selectedTags.length === 0
              ? "All tags are currently off. Showing every project until you enable a tag."
              : `${selectedTags.length} active tag${
                  selectedTags.length === 1 ? "" : "s"
                }`}
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mb-4 lg:mb-6 shadow-submit dark:shadow-submit-dark bg-primary hover:bg-primary/90 rounded-lg px-4 md:px-6 py-1 md:py-2 text-base leading-relaxed! text-black dark:text-white sm:text-md md:text-lg duration-300 cursor-pointer md:w-auto"
            >
              Reset all tags
          </button>
        </div>

        <div className="space-y-12">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <SingleBlog key={project.id} blog={project} />
            ))
          ) : (
            <div className="shadow-one rounded-xs border border-white/10 bg-dark px-6 py-10 text-center">
              <h3 className="mb-3 text-2xl font-bold text-black dark:text-white">
                No projects match the current filter
              </h3>
              <p className="mx-auto max-w-[700px] text-base leading-relaxed text-black dark:text-white md:text-lg">
                Try enabling different tags or reset the filter to show all
                projects again.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllProjectsContent;
