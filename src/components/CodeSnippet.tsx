
import React from "react";
import { ClipboardCopy } from "lucide-react";
import { toast } from "sonner";

interface CodeSnippetProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({
  code,
  language = "jsx",
  showLineNumbers = false,
  showCopyButton = true,
}) => {
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };

  return (
    <div className="relative bg-gray-900 text-gray-100 rounded-md overflow-hidden">
      {showCopyButton && (
        <button
          className="absolute top-2 right-2 p-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
          onClick={handleCopyCode}
          aria-label="Copy code"
        >
          <ClipboardCopy size={16} />
        </button>
      )}
      
      <pre className={`p-4 overflow-x-auto ${showCopyButton ? 'pr-10' : ''}`}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeSnippet;
