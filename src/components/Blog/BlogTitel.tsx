const BlogTitle = ({ children }: { children: React.ReactNode }) => (
  <h1 className="border-body-color/20 border-b mb-4 md:mb-6 pb-4 md:pb-6 text-2xl font-bold leading-tight text-black dark:text-white sm:text-3xl sm:leading-tight md:text-4xl md:leading-tight">
    {children}
  </h1>
);

export default BlogTitle;