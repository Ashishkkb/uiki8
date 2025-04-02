
import React from "react";
import { ClipboardCopy } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "@/hooks/useTheme";

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
  const { theme } = useTheme();
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };

  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100';
  const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const buttonBg = theme === 'dark' ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300';

  return (
    <div className={`relative ${bgColor} ${textColor} rounded-md overflow-hidden transition-colors duration-200`}>
      {showCopyButton && (
        <button
          className={`absolute top-2 right-2 p-1 rounded-md ${buttonBg} transition-colors`}
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
