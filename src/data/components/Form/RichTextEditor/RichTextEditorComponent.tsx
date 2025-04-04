
import React, { useState } from 'react';
import { 
  Bold, Italic, Underline, Strikethrough, Link, AlignLeft, AlignCenter, 
  AlignRight, AlignJustify, List, ListOrdered, Heading1, Heading2, 
  Image, Code, Quote, Undo, Redo
} from 'lucide-react';
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type Format = 'bold' | 'italic' | 'underline' | 'strikethrough' | 'link' | 'alignLeft' | 
  'alignCenter' | 'alignRight' | 'alignJustify' | 'bulletList' | 'numberedList' | 
  'h1' | 'h2' | 'image' | 'code' | 'quote';

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
  const editorRef = React.useRef<HTMLDivElement>(null);

  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    updateHtml();
    updateSelectedFormats();
  };

  const updateHtml = () => {
    if (editorRef.current) {
      const newHtml = editorRef.current.innerHTML;
      setHtml(newHtml);
      
      if (onChange) {
        onChange(newHtml);
      }
    }
  };

  const updateSelectedFormats = () => {
    const formats: Format[] = [];
    
    if (document.queryCommandState('bold')) formats.push('bold');
    if (document.queryCommandState('italic')) formats.push('italic');
    if (document.queryCommandState('underline')) formats.push('underline');
    if (document.queryCommandValue('formatBlock') === 'h1') formats.push('h1');
    if (document.queryCommandValue('formatBlock') === 'h2') formats.push('h2');
    if (document.queryCommandValue('formatBlock') === 'blockquote') formats.push('quote');
    // Add more format checks as needed
    
    setSelectedFormats(formats);
  };

  const handleLinkInsert = () => {
    if (linkUrl) {
      executeCommand('createLink', linkUrl);
      setLinkUrl('');
    }
  };

  const handleImageInsert = () => {
    if (imageUrl) {
      const imgHtml = `<img src="${imageUrl}" alt="${imageAlt}" style="max-width: 100%;" />`;
      executeCommand('insertHTML', imgHtml);
      setImageUrl('');
      setImageAlt('');
    }
  };

  const handleEditorBlur = () => {
    if (onBlur && editorRef.current) {
      onBlur(editorRef.current.innerHTML);
    }
  };

  const toggleFormat = (format: Format) => {
    switch (format) {
      case 'bold':
        executeCommand('bold');
        break;
      case 'italic':
        executeCommand('italic');
        break;
      case 'underline':
        executeCommand('underline');
        break;
      case 'strikethrough':
        executeCommand('strikeThrough');
        break;
      case 'alignLeft':
        executeCommand('justifyLeft');
        break;
      case 'alignCenter':
        executeCommand('justifyCenter');
        break;
      case 'alignRight':
        executeCommand('justifyRight');
        break;
      case 'alignJustify':
        executeCommand('justifyFull');
        break;
      case 'bulletList':
        executeCommand('insertUnorderedList');
        break;
      case 'numberedList':
        executeCommand('insertOrderedList');
        break;
      case 'h1':
        executeCommand('formatBlock', '<h1>');
        break;
      case 'h2':
        executeCommand('formatBlock', '<h2>');
        break;
      case 'code':
        executeCommand('formatBlock', '<pre>');
        break;
      case 'quote':
        executeCommand('formatBlock', '<blockquote>');
        break;
      // Link and image are handled separately
    }
  };

  const handleFormatChange = (format: string) => {
    if (format === 'p') {
      executeCommand('formatBlock', '<p>');
    } else if (format === 'h1') {
      executeCommand('formatBlock', '<h1>');
    } else if (format === 'h2') {
      executeCommand('formatBlock', '<h2>');
    } else if (format === 'h3') {
      executeCommand('formatBlock', '<h3>');
    } else if (format === 'quote') {
      executeCommand('formatBlock', '<blockquote>');
    } else if (format === 'code') {
      executeCommand('formatBlock', '<pre>');
    }
  };

  const renderToolbar = () => (
    <div className={cn("flex flex-wrap gap-1 p-1 border-b bg-muted/30", toolbarClassName)}>
      <Select onValueChange={handleFormatChange}>
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
        <ToggleGroupItem 
          value="bold" 
          aria-label="Toggle bold"
          onClick={() => toggleFormat('bold')}
          data-state={selectedFormats.includes('bold') ? 'on' : 'off'}
        >
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="italic" 
          aria-label="Toggle italic"
          onClick={() => toggleFormat('italic')}
          data-state={selectedFormats.includes('italic') ? 'on' : 'off'}
        >
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="underline" 
          aria-label="Toggle underline"
          onClick={() => toggleFormat('underline')}
          data-state={selectedFormats.includes('underline') ? 'on' : 'off'}
        >
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="strikethrough" 
          aria-label="Toggle strikethrough"
          onClick={() => toggleFormat('strikethrough')}
        >
          <Strikethrough className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
      
      <Separator orientation="vertical" className="h-8" />
      
      <ToggleGroup type="single">
        <ToggleGroupItem 
          value="alignLeft" 
          aria-label="Align left"
          onClick={() => toggleFormat('alignLeft')}
        >
          <AlignLeft className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="alignCenter" 
          aria-label="Align center"
          onClick={() => toggleFormat('alignCenter')}
        >
          <AlignCenter className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="alignRight" 
          aria-label="Align right"
          onClick={() => toggleFormat('alignRight')}
        >
          <AlignRight className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="alignJustify" 
          aria-label="Align justify"
          onClick={() => toggleFormat('alignJustify')}
        >
          <AlignJustify className="h-4 w-4" />
        </ToggleGroupItem>
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
              <p className="text-sm text-muted-foreground">
                Enter the URL you want to link to.
              </p>
            </div>
            <div className="grid gap-2">
              <Input 
                id="link" 
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
              <p className="text-sm text-muted-foreground">
                Enter the image URL and optional alt text.
              </p>
            </div>
            <div className="grid gap-2">
              <Input 
                id="imageUrl" 
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg" 
              />
              <Input 
                id="imageAlt" 
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
          editorClassName
        )}
        contentEditable={!readOnly}
        dangerouslySetInnerHTML={{ __html: html || '' }}
        onInput={updateHtml}
        onBlur={handleEditorBlur}
        onMouseUp={updateSelectedFormats}
        onKeyUp={updateSelectedFormats}
        style={{ 
          minHeight, 
          maxHeight: maxHeight !== 'none' ? maxHeight : undefined,
          overflowY: 'auto'
        }}
        placeholder={placeholder}
      />
      
      {toolbarPosition === 'bottom' && !readOnly && renderToolbar()}
    </div>
  );
};

export default RichTextEditor;
