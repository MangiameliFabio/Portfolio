import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

type CodeBlockProps = {
  code: string;
  language?: string;
  title?: string;
};

const CodeBlock = ({ code, language = "javascript", title }: CodeBlockProps) => (
  <>
    {title && (
      <p className="text-slate-400 mb-2 text-base leading-relaxed! sm:text-md md:text-lg">
        {title}
      </p>
    )}

    <div className="mb-4 rounded-xl overflow-hidden text-sm sm:text-base">
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "1rem",
          background: "#1e1e1e",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  </>
);

export default CodeBlock;
