
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { DeleteIcon, ChevronLeft, ArrowUp, ArrowDown, Space, Keyboard, Languages, Maximize2, Minimize2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface VirtualKeyboardProps {
  onKeyPress?: (key: string) => void;
  layout?: 'standard' | 'numeric' | 'compact' | 'phone' | 'emoji' | 'symbols' | 'math' | 'extended' | 'programming' | 'gaming' | 'dvorak';
  className?: string;
  variant?: 'default' | 'compact' | 'expanded';
  showNumericRow?: boolean;
  allowSpecialChars?: boolean;
  initialCaps?: boolean;
  darkMode?: boolean;
  theme?: string;
  showCloseButton?: boolean;
  alwaysVisible?: boolean;
  inputPlaceholder?: string;
  onClose?: () => void;
  onChange?: (value: string) => void;
  value?: string;
  onEnter?: (text: string) => void;
  language?: 'en' | 'es' | 'fr' | 'de' | 'ru' | 'ar' | 'zh';
  showTooltips?: boolean;
  transparentKeys?: boolean;
  animateKeys?: boolean;
  fullscreenMode?: boolean;
  showLanguageSelector?: boolean;
  showLayoutSelector?: boolean;
}

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  onKeyPress,
  layout = 'standard',
  className,
  variant = 'default',
  showNumericRow = true,
  allowSpecialChars = true,
  initialCaps = false,
  darkMode = false,
  theme = 'default',
  showCloseButton = false,
  alwaysVisible = true,
  inputPlaceholder,
  onClose,
  onChange,
  value,
  onEnter,
  language = 'en',
  showTooltips = false,
  transparentKeys = false,
  animateKeys = false,
  fullscreenMode = false,
  showLanguageSelector = false,
  showLayoutSelector = false,
}) => {
  const [capsLock, setCapsLock] = useState(initialCaps);
  const [shift, setShift] = useState(false);
  const [showSymbols, setShowSymbols] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const [currentLayout, setCurrentLayout] = useState(layout);
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [isFullscreen, setIsFullscreen] = useState(fullscreenMode);

  // Language layouts
  const languageLayouts = {
    en: {
      row1: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      row2: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      row3: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    },
    es: {
      row1: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      row2: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ'],
      row3: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    },
    fr: {
      row1: ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      row2: ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'],
      row3: ['w', 'x', 'c', 'v', 'b', 'n'],
    },
    de: {
      row1: ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'ü'],
      row2: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä'],
      row3: ['y', 'x', 'c', 'v', 'b', 'n', 'm'],
    },
    ru: {
      row1: ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х'],
      row2: ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
      row3: ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю'],
    },
    ar: {
      row1: ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج'],
      row2: ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك', 'ط'],
      row3: ['ئ', 'ء', 'ؤ', 'ر', 'لا', 'ى', 'ة', 'و', 'ز', 'ظ'],
    },
    zh: {
      row1: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      row2: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      row3: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    },
  };

  // Special layouts
  const emojiLayout = [
    ['😀', '😂', '😍', '🥰', '😊', '😎', '🤔', '😴', '🥺'],
    ['👍', '👎', '👏', '🙌', '🤝', '👋', '✌️', '🤞', '🖐️'],
    ['❤️', '🔥', '⭐', '🎉', '🎂', '🎁', '🏆', '🌈', '🍕'],
  ];

  const symbolsLayout = [
    ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'],
    ['~', '`', '{', '}', '|', '\\', ':', ';', '"', '\'', '<', '>'],
    ['₿', '€', '£', '¥', '₹', '§', '©', '®', '™', '°', '†', '‡'],
  ];

  const mathLayout = [
    ['π', '∑', '∫', '√', '∞', '≈', '≠', '≤', '≥', '±'],
    ['÷', '×', '−', '+', '=', '%', '(', ')', 'ⁿ', '²'],
    ['sin', 'cos', 'tan', 'log', 'ln', '|x|', 'e', 'lim', '∂', 'Δ'],
  ];

  const programmingLayout = [
    ['(', ')', '{', '}', '[', ']', '<', '>', '=', '?'],
    ['/', '\\', '|', '&', ';', ':', '.', ',', '_', '-'],
    ['function', 'const', 'let', 'var', 'if', 'else', 'return', '=>'],
  ];

  const dvorakLayout = {
    row1: ['\'', ',', '.', 'p', 'y', 'f', 'g', 'c', 'r', 'l'],
    row2: ['a', 'o', 'e', 'u', 'i', 'd', 'h', 't', 'n', 's'],
    row3: [';', 'q', 'j', 'k', 'x', 'b', 'm', 'w', 'v', 'z'],
  };

  const gamingLayout = [
    ['Q', 'W', 'E', 'R', 'T', '1', '2', '3', '4', '5'],
    ['A', 'S', 'D', 'F', 'G', '6', '7', '8', '9', '0'],
    ['Z', 'X', 'C', 'V', 'B', 'ESC', 'CTRL', 'ALT', 'SHIFT'],
  ];

  const handleKeyPress = useCallback((key: string) => {
    if (onKeyPress) {
      onKeyPress(key);
    }
    
    // Handle internal input if onChange is provided
    if (onChange) {
      let newValue = inputValue;
      
      if (key === 'Backspace') {
        newValue = inputValue.slice(0, -1);
      } else if (key === 'Enter') {
        if (onEnter) {
          onEnter(inputValue);
        }
        return;
      } else if (key === ' ') {
        newValue += ' ';
      } else if (key.length === 1) {
        newValue += key;
      } else if (key === 'ESC' || key === 'CTRL' || key === 'ALT' || key === 'SHIFT') {
        // Gaming keys - no action in text input
        return;
      }
      
      setInputValue(newValue);
      onChange(newValue);
    }
    
    // Reset shift after key press if active
    if (shift) {
      setShift(false);
    }
  }, [onKeyPress, shift, onChange, inputValue, onEnter]);

  const renderKey = (key: string, display?: React.ReactNode, className?: string) => {
    let keyToUse = key;
    let displayContent = display || key;
    
    // Handle case conversion based on caps and shift state
    if (key.length === 1 && key.match(/[a-z]/i)) {
      const isCaps = (capsLock && !shift) || (!capsLock && shift);
      keyToUse = isCaps ? key.toUpperCase() : key.toLowerCase();
      displayContent = keyToUse;
    }
    
    const keyButton = (
      <Button
        variant="outline"
        className={cn(
          "h-10 md:h-12 w-8 md:w-10 p-0",
          animateKeys && "transition-transform active:scale-90",
          transparentKeys && "bg-opacity-50 hover:bg-opacity-70",
          className
        )}
        onClick={() => handleKeyPress(keyToUse)}
      >
        {displayContent}
      </Button>
    );
    
    if (showTooltips) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {keyButton}
            </TooltipTrigger>
            <TooltipContent>
              <p>{key}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
    
    return keyButton;
  };

  const renderStandardLayout = () => {
    // Current language layout
    const currentLangLayout = languageLayouts[currentLanguage as keyof typeof languageLayouts] || languageLayouts.en;
    
    // Use Dvorak if selected
    const keyboardLayout = currentLayout === 'dvorak' ? dvorakLayout : currentLangLayout;
    
    // Number row
    const numberRow = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const shiftedNumberRow = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];
    
    const renderNumberRow = () => {
      const rowToUse = shift ? shiftedNumberRow : numberRow;
      return (
        <div className="flex justify-center space-x-1 my-1">
          {rowToUse.map(key => renderKey(key))}
        </div>
      );
    };
    
    return (
      <div className="space-y-1">
        {showNumericRow && renderNumberRow()}
        
        <div className="flex justify-center space-x-1 my-1">
          {keyboardLayout.row1.map(key => renderKey(key))}
        </div>
        <div className="flex justify-center space-x-1 my-1 px-4">
          {keyboardLayout.row2.map(key => renderKey(key))}
        </div>
        <div className="flex justify-center space-x-1 my-1">
          <Button
            variant="outline"
            className={cn(
              "h-10 md:h-12 w-12 md:w-16",
              animateKeys && "transition-transform active:scale-90"
            )}
            onClick={() => {
              setShift(!shift);
            }}
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
          
          {keyboardLayout.row3.map(key => renderKey(key))}
          
          <Button
            variant="outline"
            className={cn(
              "h-10 md:h-12 w-12 md:w-16",
              animateKeys && "transition-transform active:scale-90"
            )}
            onClick={() => {
              handleKeyPress('Backspace');
            }}
          >
            <DeleteIcon className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex justify-center space-x-1 my-1">
          <Button
            variant="outline"
            className={cn(
              "h-10 md:h-12 w-16 md:w-20",
              animateKeys && "transition-transform active:scale-90"
            )}
            onClick={() => {
              setCapsLock(!capsLock);
            }}
            data-state={capsLock ? 'on' : 'off'}
          >
            CAPS
          </Button>
          
          {allowSpecialChars && (
            <Button
              variant="outline"
              className={cn(
                "h-10 md:h-12 w-16 md:w-20",
                animateKeys && "transition-transform active:scale-90"
              )}
              onClick={() => setShowSymbols(!showSymbols)}
              data-state={showSymbols ? 'on' : 'off'}
            >
              {showSymbols ? 'ABC' : '!@#'}
            </Button>
          )}
          
          <Button
            variant="outline"
            className={cn(
              "h-10 md:h-12 w-32 md:w-48",
              animateKeys && "transition-transform active:scale-90"
            )}
            onClick={() => handleKeyPress(' ')}
          >
            <Space className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            className={cn(
              "h-10 md:h-12 w-16 md:w-20",
              animateKeys && "transition-transform active:scale-90"
            )}
            onClick={() => handleKeyPress('Enter')}
          >
            Enter
          </Button>
        </div>
      </div>
    );
  };
  
  const renderNumericLayout = () => {
    const numPad = [
      ['7', '8', '9'],
      ['4', '5', '6'],
      ['1', '2', '3'],
      ['0', '.', ',']
    ];
    
    return (
      <div className="grid grid-cols-3 gap-2">
        {numPad.map((row, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            {row.map(key => renderKey(key, undefined, "w-full"))}
          </React.Fragment>
        ))}
        <Button
          variant="outline"
          className={cn(
            "h-10 md:h-12 col-span-2",
            animateKeys && "transition-transform active:scale-90"
          )}
          onClick={() => handleKeyPress(' ')}
        >
          <Space className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className={cn(
            "h-10 md:h-12",
            animateKeys && "transition-transform active:scale-90"
          )}
          onClick={() => handleKeyPress('Backspace')}
        >
          <DeleteIcon className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  const renderPhoneLayout = () => {
    const phonePad = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['*', '0', '#']
    ];
    
    return (
      <div className="grid grid-cols-3 gap-2">
        {phonePad.map((row, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            {row.map(key => renderKey(key, undefined, "w-full"))}
          </React.Fragment>
        ))}
        <Button
          variant="outline"
          className={cn(
            "h-10 md:h-12 col-span-3",
            animateKeys && "transition-transform active:scale-90"
          )}
          onClick={() => handleKeyPress('Enter')}
        >
          Call
        </Button>
      </div>
    );
  };

  const renderCompactLayout = () => {
    // This is a smaller version with just essential keys
    return (
      <div className="space-y-1">
        <div className="flex justify-center space-x-1 my-1">
          {['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'].map(key => renderKey(key))}
        </div>
        <div className="flex justify-center space-x-1 my-1">
          {['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'].map(key => renderKey(key))}
        </div>
        <div className="flex justify-center space-x-1 my-1">
          <Button
            variant="outline"
            className="h-10 w-10"
            onClick={() => setShift(!shift)}
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
          {['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(key => renderKey(key))}
          <Button
            variant="outline"
            className="h-10 w-10"
            onClick={() => handleKeyPress('Backspace')}
          >
            <DeleteIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-center space-x-1 my-1">
          <Button
            variant="outline"
            className="h-10 w-20"
            onClick={() => handleKeyPress('123')}
          >
            123
          </Button>
          <Button
            variant="outline"
            className="h-10 w-40"
            onClick={() => handleKeyPress(' ')}
          >
            <Space className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-10 w-20"
            onClick={() => handleKeyPress('Enter')}
          >
            Enter
          </Button>
        </div>
      </div>
    );
  };

  const renderSpecialLayout = (layout: string[][]) => {
    return (
      <div className="space-y-1">
        {layout.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex justify-center space-x-1 my-1">
            {row.map((key, keyIndex) => renderKey(key, undefined, 
              key.length > 3 ? "text-xs p-0 w-auto min-w-16" : undefined))}
          </div>
        ))}
        <div className="flex justify-center space-x-1 my-1">
          <Button
            variant="outline"
            className="h-10 md:h-12 w-20"
            onClick={() => setCurrentLayout('standard')}
          >
            ABC
          </Button>
          <Button
            variant="outline"
            className="h-10 md:h-12 w-32"
            onClick={() => handleKeyPress(' ')}
          >
            <Space className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-10 md:h-12 w-20"
            onClick={() => handleKeyPress('Enter')}
          >
            Enter
          </Button>
        </div>
      </div>
    );
  };

  const getCurrentLayout = () => {
    switch (currentLayout) {
      case 'standard':
      case 'dvorak':
        return renderStandardLayout();
      case 'numeric':
        return renderNumericLayout();
      case 'phone':
        return renderPhoneLayout();
      case 'compact':
        return renderCompactLayout();
      case 'emoji':
        return renderSpecialLayout(emojiLayout);
      case 'symbols':
        return renderSpecialLayout(symbolsLayout);
      case 'math':
        return renderSpecialLayout(mathLayout);
      case 'programming':
        return renderSpecialLayout(programmingLayout);
      case 'gaming':
        return renderSpecialLayout(gamingLayout);
      default:
        return renderStandardLayout();
    }
  };
  
  const renderInputField = () => {
    if (inputPlaceholder && onChange) {
      return (
        <div className="relative mb-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (onChange) onChange(e.target.value);
            }}
            className={cn(
              "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2",
              darkMode ? "bg-slate-800 text-white border-slate-700" : "bg-white border-slate-300"
            )}
            placeholder={inputPlaceholder}
          />
        </div>
      );
    }
    return null;
  };
  
  const renderLayoutSelector = () => {
    if (!showLayoutSelector) return null;
    
    return (
      <div className="mb-2">
        <Select value={currentLayout} onValueChange={(value: any) => setCurrentLayout(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select layout" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="standard">Standard</SelectItem>
            <SelectItem value="compact">Compact</SelectItem>
            <SelectItem value="numeric">Numeric</SelectItem>
            <SelectItem value="phone">Phone</SelectItem>
            <SelectItem value="emoji">Emoji</SelectItem>
            <SelectItem value="symbols">Symbols</SelectItem>
            <SelectItem value="math">Math</SelectItem>
            <SelectItem value="programming">Programming</SelectItem>
            <SelectItem value="dvorak">Dvorak</SelectItem>
            <SelectItem value="gaming">Gaming</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  };
  
  const renderLanguageSelector = () => {
    if (!showLanguageSelector) return null;
    
    return (
      <div className="mb-2 ml-2">
        <Select value={currentLanguage} onValueChange={(value: any) => setCurrentLanguage(value)}>
          <SelectTrigger className="w-[120px]">
            <Languages className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Spanish</SelectItem>
            <SelectItem value="fr">French</SelectItem>
            <SelectItem value="de">German</SelectItem>
            <SelectItem value="ru">Russian</SelectItem>
            <SelectItem value="ar">Arabic</SelectItem>
            <SelectItem value="zh">Chinese</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  };
  
  const renderControls = () => {
    return (
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          {renderLayoutSelector()}
          {renderLanguageSelector()}
        </div>
        
        <div className="flex items-center">
          {showCloseButton && onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 ml-1"
            >
              <span className="sr-only">Close</span>
              <X className="h-4 w-4" />
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="h-8 w-8 p-0 ml-1"
          >
            <span className="sr-only">{isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}</span>
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    );
  };
  
  return (
    <div className={cn(
      "p-2 border rounded-lg shadow-sm bg-background transition-all",
      darkMode ? "bg-slate-900 text-white" : "",
      isFullscreen ? "fixed inset-0 z-50 rounded-none" : "",
      className
    )}>
      {renderInputField()}
      {(showLayoutSelector || showLanguageSelector || showCloseButton) && renderControls()}
      {getCurrentLayout()}
    </div>
  );
};

export default VirtualKeyboard;
