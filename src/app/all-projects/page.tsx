import PageStyling from "@/components/Common/PageStyling";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Projects",
  description: "This page show cases all projects",
  // other metadata
};

const AllProjects = () => {
  return (
    <>
      <PageStyling/>
    </>
  );
};

export default AllProjects;
