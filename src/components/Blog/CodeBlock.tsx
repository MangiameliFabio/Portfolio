import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import cpp from "react-syntax-highlighter/dist/esm/languages/prism/cpp";
import gdscript from "react-syntax-highlighter/dist/esm/languages/prism/gdscript";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

SyntaxHighlighter.registerLanguage("cpp", cpp);
SyntaxHighlighter.registerLanguage("gdscript", gdscript);
SyntaxHighlighter.registerLanguage("javascript", javascript);

type CodeBlockProps = {
  code: string;
  language?: string;
  title?: string;
};

const CodeBlock = ({ code, language = "gdscript", title }: CodeBlockProps) => (
  <>
    {title && (
      <p className="text-slate-400 mb-2 text-base leading-relaxed! sm:text-md md:text-lg">
        {title}
      </p>
    )}

    <div className="mb-4 overflow-hidden rounded-xl text-sm sm:text-base">
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "1rem",
          background: "#1e1e1e",
          maxHeight: "500px",
          overflow: "auto",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  </>
);

export default CodeBlock;
