import React, { useState, useCallback, useMemo } from 'react';
import { Check, Copy, TerminalSquare, Download, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

type SupportedLanguage = 
  | 'javascript' | 'typescript' | 'jsx' | 'tsx' 
  | 'html' | 'css' | 'json' | 'python' | 'ruby'
  | 'go' | 'rust' | 'java' | 'c' | 'cpp' | 'csharp'
  | 'php' | 'swift' | 'kotlin' | 'sql' | 'markdown'
  | 'yaml' | 'xml';

type ThemeType = 'light' | 'dark';

interface CodeEditorProps {
  initialCode?: string;
  language?: SupportedLanguage;
  theme?: ThemeType;
  height?: string;
  width?: string;
  readOnly?: boolean;
  showToolbar?: boolean;
  showLineNumbers?: boolean;
  onChange?: (code: string) => void;
  className?: string;
}

const THEME_STYLES = {
  dark: {
    background: 'bg-slate-900',
    text: 'text-slate-100',
    border: 'border-slate-700',
    toolbar: 'bg-slate-800'
  },
  light: {
    background: 'bg-slate-50',
    text: 'text-slate-900',
    border: 'border-slate-200',
    toolbar: 'bg-slate-100'
  }
} as const;

const FILE_EXTENSIONS: Record<SupportedLanguage, string> = {
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
  xml: '.xml'
};

const CodeEditor: React.FC<CodeEditorProps> = React.memo(({
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
  const [code, setCode] = useState<string>(initialCode);
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(language);
  const [copied, setCopied] = useState<boolean>(false);

  const themeStyles = THEME_STYLES[theme];

  const handleCodeChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    onChange?.(newCode);
  }, [onChange]);

  const handleCopyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  }, [code]);

  const handleDownloadCode = useCallback(() => {
    const extension = FILE_EXTENSIONS[selectedLanguage];
    const fileName = `code${extension}`;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [code, selectedLanguage]);

  const handleReset = useCallback(() => {
    setCode(initialCode);
    onChange?.(initialCode);
  }, [initialCode, onChange]);

  const handleLanguageChange = useCallback((value: string) => {
    setSelectedLanguage(value as SupportedLanguage);
  }, []);

  const lineNumbers = useMemo(() => {
    return code.split('\n').map((_, i) => (
      <div key={i} className="text-slate-500">
        {i + 1}
      </div>
    ));
  }, [code]);

  return (
    <div 
      className={cn(
        'rounded-md overflow-hidden border', 
        themeStyles.border,
        themeStyles.background,
        className
      )}
      style={{ width, height: height === 'auto' ? 'auto' : 'min-content' }}
    >
      {showToolbar && (
        <div className={cn("flex justify-between items-center px-4 py-2 border-b", themeStyles.toolbar, themeStyles.border)}>
          <div className="flex items-center gap-2">
            <TerminalSquare className="h-4 w-4" />
            <Select 
              value={selectedLanguage} 
              onValueChange={handleLanguageChange}
            >
              <SelectTrigger className="h-7 w-40 border-0 focus:ring-0">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(FILE_EXTENSIONS).map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </SelectItem>
                ))}
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
      <div className="relative" style={{ height: showToolbar ? `calc(${height} - 40px)` : height }}>
        {showLineNumbers && (
          <div 
            className={cn(
              "absolute top-0 left-0 bottom-0 w-10 border-r text-xs font-mono p-2 text-center overflow-hidden",
              themeStyles.toolbar,
              themeStyles.border
            )}
          >
            {lineNumbers}
          </div>
        )}
        <textarea
          className={cn(
            'w-full h-full resize-none p-3 font-mono text-sm focus:outline-none transition-colors duration-200',
            themeStyles.text,
            themeStyles.background,
            showLineNumbers ? 'pl-12' : 'pl-3'
          )}
          value={code}
          onChange={handleCodeChange}
          spellCheck={false}
          readOnly={readOnly}
          placeholder="Write your code here"
        />
      </div>
    </div>
  );
});

export default CodeEditor;
