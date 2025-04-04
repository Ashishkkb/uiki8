import React from 'react';
import { ComponentItem } from "@/types/component";
import CodeEditor from './CodeEditorComponent';

const initialJSCode = `// A simple JavaScript function
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Test the function
console.log(greet('World'));

// Define an object
const user = {
  name: 'John Doe',
  age: 30,
  isActive: true,
  hobbies: ['reading', 'coding', 'music']
};

// Object destructuring
const { name, age } = user;

// Loop through hobbies
user.hobbies.forEach(hobby => {
  console.log(\`\${name} enjoys \${hobby}\`);
});`;

const CodeEditorComponentItem: ComponentItem = {
  id: 152,
  name: "Code Editor",
  description: "Interactive code editor with syntax highlighting, multiple language support, and copy/download functionality",
  category: "Form",
  framework: "React",
  language: "TypeScript",
  tags: ["Code", "Editor", "Syntax", "Development", "Form"],
  isNew: true,
  component: () => (
    <div className="max-w-3xl mx-auto">
      <CodeEditor 
        initialCode={initialJSCode}
        language="javascript"
        theme="dark"
        height="300px"
        showToolbar={true}
        showLineNumbers={true}
      />
    </div>
  ),
  code: `import React, { useState } from 'react';
import { Check, Copy, TerminalSquare, Download, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  theme?: 'light' | 'dark';
  height?: string;
  width?: string;
  readOnly?: boolean;
  showToolbar?: boolean;
  showLineNumbers?: boolean;
  onChange?: (code: string) => void;
  className?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode = '// Write your code here',
  language = 'javascript',
  theme = 'dark',
  height = '300px',
  width = '100%',
  readOnly = false,
  showToolbar = true,
  showLineNumbers = true,
  onChange,
  className,
}) => {
  const [code, setCode] = useState(initialCode);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [copied, setCopied] = useState(false);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    
    if (onChange) {
      onChange(newCode);
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleDownloadCode = () => {
    const extension = getFileExtension(selectedLanguage);
    const fileName = \`code\${extension}\`;
    const blob = new Blob([code], { type: 'text/plain' });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setCode(initialCode);
    
    if (onChange) {
      onChange(initialCode);
    }
  };

  const getBackgroundColor = () => {
    return theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50';
  };

  const getTextColor = () => {
    return theme === 'dark' ? 'text-slate-100' : 'text-slate-900';
  };

  const getBorderColor = () => {
    return theme === 'dark' ? 'border-slate-700' : 'border-slate-200';
  };

  const getToolbarBg = () => {
    return theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100';
  };

  const getFileExtension = (lang: string): string => {
    const extensions: Record<string, string> = {
      javascript: '.js',
      typescript: '.ts',
      jsx: '.jsx',
      tsx: '.tsx',
      html: '.html',
      css: '.css',
      json: '.json',
      python: '.py',
      ruby: '.rb',
      go: '.go',
      rust: '.rs',
      java: '.java',
      c: '.c',
      cpp: '.cpp',
      csharp: '.cs',
      php: '.php',
      swift: '.swift',
      kotlin: '.kt',
      sql: '.sql',
      markdown: '.md',
      yaml: '.yaml',
      xml: '.xml',
    };

    return extensions[lang] || '.txt';
  };

  return (
    <div 
      className={cn(
        'rounded-md overflow-hidden border', 
        getBorderColor(),
        getBackgroundColor(),
        className
      )}
      style={{ width, height: height === 'auto' ? 'auto' : 'min-content' }}
    >
      {showToolbar && (
        <div className={\`flex justify-between items-center px-4 py-2 border-b \${getToolbarBg()} \${getBorderColor()}\`}>
          <div className="flex items-center gap-2">
            <TerminalSquare className="h-4 w-4" />
            <Select 
              value={selectedLanguage} 
              onValueChange={(value) => setSelectedLanguage(value)}
            >
              <SelectTrigger className="h-7 w-40 border-0 focus:ring-0">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="jsx">JSX</SelectItem>
                <SelectItem value="tsx">TSX</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
                <SelectItem value="css">CSS</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="ruby">Ruby</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="php">PHP</SelectItem>
                <SelectItem value="sql">SQL</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={handleReset} title="Reset">
              <RefreshCcw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleCopyCode} title="Copy code">
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={handleDownloadCode} title="Download code">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      <div className="relative" style={{ height: showToolbar ? \`calc(\${height} - 40px)\` : height }}>
        {showLineNumbers && (
          <div 
            className={\`absolute top-0 left-0 bottom-0 w-10 \${getToolbarBg()} border-r \${getBorderColor()} text-xs font-mono p-2 text-center overflow-hidden\`}
          >
            {code.split('\\n').map((_, i) => (
              <div key={i} className="text-slate-500">
                {i + 1}
              </div>
            ))}
          </div>
        )}
        <textarea
          className={cn(
            'w-full h-full resize-none p-3 font-mono text-sm focus:outline-none',
            getTextColor(),
            getBackgroundColor(),
            showLineNumbers ? 'pl-12' : 'pl-3'
          )}
          value={code}
          onChange={handleCodeChange}
          spellCheck={false}
          readOnly={readOnly}
          style={{ 
            tabSize: 2,
            minHeight: showToolbar ? \`calc(\${height} - 40px)\` : height
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;`
};

export default CodeEditorComponentItem;
