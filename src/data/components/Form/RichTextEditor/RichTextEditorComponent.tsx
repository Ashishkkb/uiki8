import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Bold, Italic, Underline, Strikethrough, Link, AlignLeft, AlignCenter, 
  AlignRight, AlignJustify, List, ListOrdered, Heading1, Heading2, 
  Image, Code, Quote, Undo, Redo
} from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type Format = 
  | 'bold' | 'italic' | 'underline' | 'strikethrough' 
  | 'link' | 'alignLeft' | 'alignCenter' | 'alignRight' 
  | 'alignJustify' | 'bulletList' | 'numberedList' 
  | 'h1' | 'h2' | 'h3' | 'quote' | 'code';

type BlockFormat = 'p' | 'h1' | 'h2' | 'h3' | 'quote' | 'code';

interface RichTextEditorProps {
  initialHtml?: string;
  onChange?: (html: string) => void;
  onBlur?: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
  maxHeight?: string;
  className?: string;
  editorClassName?: string;
  toolbarClassName?: string;
  readOnly?: boolean;
  toolbarPosition?: 'top' | 'bottom';
}

const COMMAND_MAP: Record<Format, { command: string; value?: string }> = {
  bold: { command: 'bold' },
  italic: { command: 'italic' },
  underline: { command: 'underline' },
  strikethrough: { command: 'strikeThrough' },
  alignLeft: { command: 'justifyLeft' },
  alignCenter: { command: 'justifyCenter' },
  alignRight: { command: 'justifyRight' },
  alignJustify: { command: 'justifyFull' },
  bulletList: { command: 'insertUnorderedList' },
  numberedList: { command: 'insertOrderedList' },
  h1: { command: 'formatBlock', value: '<h1>' },
  h2: { command: 'formatBlock', value: '<h2>' },
  h3: { command: 'formatBlock', value: '<h3>' },
  quote: { command: 'formatBlock', value: '<blockquote>' },
  code: { command: 'formatBlock', value: '<pre>' },
  link: { command: 'createLink' }
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialHtml = '',
  onChange,
  onBlur,
  placeholder = 'Write something...',
  minHeight = '200px',
  maxHeight = '500px',
  className,
  editorClassName,
  toolbarClassName,
  readOnly = false,
  toolbarPosition = 'top',
}) => {
  const [html, setHtml] = useState(initialHtml);
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [selectedFormats, setSelectedFormats] = useState<Format[]>([]);
  const [isEmpty, setIsEmpty] = useState(initialHtml === '');
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      if (isEmpty) {
        editorRef.current.setAttribute('data-placeholder', placeholder);
      } else {
        editorRef.current.removeAttribute('data-placeholder');
      }
    }
  }, [isEmpty, placeholder]);

  const executeCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    updateHtml();
    updateSelectedFormats();
  }, []);

  const updateHtml = useCallback(() => {
    if (editorRef.current) {
      const newHtml = editorRef.current.innerHTML;
      setHtml(newHtml);
      setIsEmpty(newHtml === '' || newHtml === '<br>');
      onChange?.(newHtml);
    }
  }, [onChange]);

  const updateSelectedFormats = useCallback(() => {
    const formats: Format[] = [];
    Object.entries(COMMAND_MAP).forEach(([format, { command }]) => {
      if (document.queryCommandState(command)) {
        formats.push(format as Format);
      }
    });
    setSelectedFormats(formats);
  }, []);

  const handleEditorBlur = useCallback(() => {
    if (editorRef.current) {
      onBlur?.(editorRef.current.innerHTML);
    }
  }, [onBlur]);

  const toggleFormat = useCallback((format: Format) => {
    const { command, value } = COMMAND_MAP[format];
    executeCommand(command, value);
  }, [executeCommand]);

  const handleBlockFormatChange = useCallback((format: BlockFormat) => {
    if (format === 'p') {
      executeCommand('formatBlock', '<p>');
    } else {
      const { command, value } = COMMAND_MAP[format as Format];
      executeCommand(command, value);
    }
  }, [executeCommand]);

  const handleLinkInsert = useCallback(() => {
    if (linkUrl) {
      executeCommand('createLink', linkUrl);
      setLinkUrl('');
    }
  }, [linkUrl, executeCommand]);

  const handleImageInsert = useCallback(() => {
    if (imageUrl) {
      const imgHtml = `<img src="${imageUrl}" alt="${imageAlt}" style="max-width: 100%;" />`;
      executeCommand('insertHTML', imgHtml);
      setImageUrl('');
      setImageAlt('');
    }
  }, [imageUrl, imageAlt, executeCommand]);

  const renderToolbar = () => (
    <div className={cn("flex flex-wrap gap-1 p-1 border-b bg-muted/30", toolbarClassName)}>
      <Select onValueChange={handleBlockFormatChange}>
        <SelectTrigger className="h-8 w-[130px]">
          <SelectValue placeholder="Paragraph" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="p">Paragraph</SelectItem>
          <SelectItem value="h1">Heading 1</SelectItem>
          <SelectItem value="h2">Heading 2</SelectItem>
          <SelectItem value="h3">Heading 3</SelectItem>
          <SelectItem value="quote">Quote</SelectItem>
          <SelectItem value="code">Code</SelectItem>
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="h-8" />

      <ToggleGroup type="multiple">
        {['bold', 'italic', 'underline', 'strikethrough'].map((format) => (
          <ToggleGroupItem
            key={format}
            value={format}
            aria-label={`Toggle ${format}`}
            onClick={() => toggleFormat(format as Format)}
            data-state={selectedFormats.includes(format as Format) ? 'on' : 'off'}
          >
            {format === 'bold' && <Bold className="h-4 w-4" />}
            {format === 'italic' && <Italic className="h-4 w-4" />}
            {format === 'underline' && <Underline className="h-4 w-4" />}
            {format === 'strikethrough' && <Strikethrough className="h-4 w-4" />}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <Separator orientation="vertical" className="h-8" />

      <ToggleGroup type="single">
        {['alignLeft', 'alignCenter', 'alignRight', 'alignJustify'].map((format) => (
          <ToggleGroupItem
            key={format}
            value={format}
            aria-label={format.replace('align', 'Align ')}
            onClick={() => toggleFormat(format as Format)}
          >
            {format === 'alignLeft' && <AlignLeft className="h-4 w-4" />}
            {format === 'alignCenter' && <AlignCenter className="h-4 w-4" />}
            {format === 'alignRight' && <AlignRight className="h-4 w-4" />}
            {format === 'alignJustify' && <AlignJustify className="h-4 w-4" />}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <Separator orientation="vertical" className="h-8" />

      <ToggleGroup type="single">
        <ToggleGroupItem
          value="bulletList"
          aria-label="Bullet list"
          onClick={() => toggleFormat('bulletList')}
        >
          <List className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="numberedList"
          aria-label="Numbered list"
          onClick={() => toggleFormat('numberedList')}
        >
          <ListOrdered className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>

      <Separator orientation="vertical" className="h-8" />

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Link className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Insert Link</h4>
              <p className="text-sm text-muted-foreground">Enter the URL you want to link to.</p>
            </div>
            <div className="grid gap-2">
              <Input
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
            <Button size="sm" onClick={handleLinkInsert}>Insert Link</Button>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Image className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Insert Image</h4>
              <p className="text-sm text-muted-foreground">Enter the image URL and optional alt text.</p>
            </div>
            <div className="grid gap-2">
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              <Input
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="Alt text (optional)"
              />
            </div>
            <Button size="sm" onClick={handleImageInsert}>Insert Image</Button>
          </div>
        </PopoverContent>
      </Popover>

      <Separator orientation="vertical" className="h-8" />

      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => executeCommand('undo')}>
        <Undo className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => executeCommand('redo')}>
        <Redo className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <div className={cn("border rounded-md overflow-hidden", className)}>
      {toolbarPosition === 'top' && !readOnly && renderToolbar()}
      
      <div
        ref={editorRef}
        className={cn(
          "p-3 focus:outline-none",
          readOnly ? "bg-muted/30" : "",
          isEmpty ? "before:content-[attr(data-placeholder)] before:text-muted-foreground before:pointer-events-none" : "",
          editorClassName
        )}
        contentEditable={!readOnly}
        dangerouslySetInnerHTML={{ __html: html }}
        onInput={updateHtml}
        onBlur={handleEditorBlur}
        onMouseUp={updateSelectedFormats}
        onKeyUp={updateSelectedFormats}
        style={{
          minHeight,
          maxHeight: maxHeight !== 'none' ? maxHeight : undefined,
          overflowY: 'auto'
        }}
      />
      
      {toolbarPosition === 'bottom' && !readOnly && renderToolbar()}
    </div>
  );
};

export default React.memo(RichTextEditor);
