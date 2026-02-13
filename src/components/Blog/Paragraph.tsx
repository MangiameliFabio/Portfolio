const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p className="text-slate-400 text-base leading-relaxed! sm:text-md md:text-lg mb-3 md:mb-4">
    {children}
  </p>
);

export default Paragraph;