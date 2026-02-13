const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="border-body-color/20 border-b mb-4 md:mb-6 py-4 md:py-6 text-xl font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight md:text-3xl md:leading-tight">
    {children}
  </h2>
);

export default SectionTitle;