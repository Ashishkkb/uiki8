
import React, { useState, useEffect } from 'react';
import { ArrowUp, ChevronsUp, Backspace, CornerDownLeft, X, Languages, Maximize2, Minimize2, Keyboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

// Define keyboard layouts
const LAYOUTS = {
  standard: {
    default: [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
      ['numbers', 'space', 'enter']
    ],
    shift: [
      ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'],
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'backspace'],
      ['numbers', 'space', 'enter']
    ],
    numbers: [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      ['-', '/', ':', ';', '(', ')', '$', '&', '@', '"'],
      ['.', ',', '?', '!', "'", '\`', '~', '+', '='],
      ['#+=', '%', '*', '[', ']', '{', '}', '<', '>'],
      ['abc', 'space', 'enter']
    ]
  },
  compact: {
    default: [
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
      ['numbers', 'space', 'enter']
    ],
    shift: [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'backspace'],
      ['numbers', 'space', 'enter']
    ],
    numbers: [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      ['-', '/', ':', ';', '(', ')', '$', '&', '@'],
      ['#+=', '.', ',', '?', '!', "'", 'backspace'],
      ['abc', 'space', 'enter']
    ]
  },
  numpad: {
    default: [
      ['7', '8', '9'],
      ['4', '5', '6'],
      ['1', '2', '3'],
      ['0', '.', 'backspace'],
      ['enter']
    ]
  },
  phone: {
    default: [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['*', '0', '#'],
      ['enter']
    ]
  },
  emoji: {
    default: [
      ['😀', '😂', '😍', '🥰', '😊', '😎', '🤔', '😴', '🥺'],
      ['👍', '👎', '👏', '🙌', '🤝', '👋', '✌️', '🤞', '🖐️'],
      ['❤️', '🔥', '⭐', '🎉', '🎂', '🎁', '🏆', '🌈', '🍕'],
      ['abc', 'space', 'backspace']
    ]
  },
  symbols: {
    default: [
      ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'],
      ['~', '\`', '{', '}', '|', '\\\\', ':', ';', '"', "'", '<', '>'],
      ['₿', '€', '£', '¥', '₹', '§', '©', '®', '™', '°', '†', '‡'],
      ['abc', 'space', 'backspace']
    ]
  },
  math: {
    default: [
      ['π', '∑', '∫', '√', '∞', '≈', '≠', '≤', '≥', '±'],
      ['÷', '×', '−', '+', '=', '%', '(', ')', 'ⁿ', '²'],
      ['sin', 'cos', 'tan', 'log', 'ln', '|x|', 'e', 'lim', '∂', 'Δ'],
      ['abc', 'space', 'backspace']
    ]
  },
  programming: {
    default: [
      ['(', ')', '{', '}', '[', ']', '<', '>', '=', '?'],
      ['/', '\\\\', '|', '&', ';', ':', '.', ',', '_', '-'],
      ['if', 'for', 'const', 'let', 'var', 'function', '=>', 'return'],
      ['abc', 'space', 'backspace']
    ]
  },
  dvorak: {
    default: [
      ["'", ',', '.', 'p', 'y', 'f', 'g', 'c', 'r', 'l'],
      ['a', 'o', 'e', 'u', 'i', 'd', 'h', 't', 'n', 's'],
      ['shift', ';', 'q', 'j', 'k', 'x', 'b', 'm', 'w', 'v', 'z', 'backspace'],
      ['numbers', 'space', 'enter']
    ],
    shift: [
      ['"', '<', '>', 'P', 'Y', 'F', 'G', 'C', 'R', 'L'],
      ['A', 'O', 'E', 'U', 'I', 'D', 'H', 'T', 'N', 'S'],
      ['shift', ':', 'Q', 'J', 'K', 'X', 'B', 'M', 'W', 'V', 'Z', 'backspace'],
      ['numbers', 'space', 'enter']
    ]
  },
  gaming: {
    default: [
      ['Q', 'W', 'E', 'R', 'T', '1', '2', '3', '4', '5'],
      ['A', 'S', 'D', 'F', 'G', '6', '7', '8', '9', '0'],
      ['Z', 'X', 'C', 'V', 'B', 'ESC', 'CTRL', 'ALT', 'SHIFT'],
      ['space', 'enter', 'backspace']
    ]
  }
};

// Language mappings
const LANGUAGE_LAYOUTS = {
  en: {row1: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], row2: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], row3: ['z', 'x', 'c', 'v', 'b', 'n', 'm']},
  es: {row1: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], row2: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ'], row3: ['z', 'x', 'c', 'v', 'b', 'n', 'm']},
  fr: {row1: ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], row2: ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'], row3: ['w', 'x', 'c', 'v', 'b', 'n']},
  de: {row1: ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'ü'], row2: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä'], row3: ['y', 'x', 'c', 'v', 'b', 'n', 'm']},
  ru: {row1: ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х'], row2: ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'], row3: ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю']},
  ar: {row1: ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج'], row2: ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك', 'ط'], row3: ['ئ', 'ء', 'ؤ', 'ر', 'لا', 'ى', 'ة', 'و', 'ز', 'ظ']},
  zh: {row1: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], row2: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], row3: ['z', 'x', 'c', 'v', 'b', 'n', 'm']}
};

interface VirtualKeyboardProps {
  onKeyPress?: (key: string) => void;
  onEnter?: (text: string) => void;
  value?: string;
  onChange?: (value: string) => void;
  layout?: 'standard' | 'compact' | 'numpad' | 'phone' | 'emoji' | 'symbols' | 'math' | 'programming' | 'dvorak' | 'gaming';
  darkMode?: boolean;
  theme?: 'default' | 'minimal' | 'rounded';
  showCloseButton?: boolean;
  inputClassName?: string;
  className?: string;
  onClose?: () => void;
  alwaysVisible?: boolean;
  inputPlaceholder?: string;
  showLayoutSelector?: boolean;
  showLanguageSelector?: boolean;
  language?: 'en' | 'es' | 'fr' | 'de' | 'ru' | 'ar' | 'zh';
  showTooltips?: boolean;
  transparentKeys?: boolean;
  animateKeys?: boolean;
  fullscreenMode?: boolean;
}

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  onKeyPress,
  onEnter,
  value = '',
  onChange,
  layout = 'standard',
  darkMode = false,
  theme = 'default',
  showCloseButton = true,
  inputClassName,
  className,
  onClose,
  alwaysVisible = true,
  inputPlaceholder = 'Type something...',
  showLayoutSelector = false,
  showLanguageSelector = false,
  language = 'en',
  showTooltips = false,
  transparentKeys = false,
  animateKeys = false,
  fullscreenMode = false
}) => {
  const [currentLayout, setCurrentLayout] = useState<string>(layout);
  const [currentView, setCurrentView] = useState<string>('default');
  const [inputValue, setInputValue] = useState<string>(value);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [currentLanguage, setCurrentLanguage] = useState<string>(language);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(fullscreenMode);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Get current keyboard layout based on selected layout and view (default, shift, numbers)
  const getKeyboardView = () => {
    if (LAYOUTS[currentLayout as keyof typeof LAYOUTS]) {
      const layoutViews = LAYOUTS[currentLayout as keyof typeof LAYOUTS];
      return layoutViews[currentView as keyof typeof layoutViews] || layoutViews.default;
    }
    return LAYOUTS.standard.default;
  };

  const handleKeyPress = (key: string) => {
    if (onKeyPress) {
      onKeyPress(key);
    }

    let newValue = inputValue;

    switch (key) {
      case 'backspace':
        newValue = inputValue.slice(0, -1);
        break;
      case 'enter':
        if (onEnter) {
          onEnter(inputValue);
        }
        return;
      case 'shift':
        setCurrentView(currentView === 'shift' ? 'default' : 'shift');
        return;
      case 'numbers':
        setCurrentView('numbers');
        return;
      case 'abc':
        setCurrentView('default');
        return;
      case 'space':
        newValue += ' ';
        break;
      case 'ESC':
      case 'CTRL':
      case 'ALT':
      case 'SHIFT':
        // Gaming keys - no action in text input
        return;
      default:
        if (key.length > 3 && ['sin', 'cos', 'tan', 'log', 'ln', 'if', 'for', 'var', 'let', 'const', 'function', '=>', 'return'].includes(key)) {
          // Programming/math functions
          newValue += key + ' ';
        } else {
          newValue += key;
        }
    }

    setInputValue(newValue);
    
    if (onChange) {
      onChange(newValue);
    }
    
    // Reset shift after typing a character if it's on
    if (currentView === 'shift' && key.length === 1) {
      setCurrentView('default');
    }
  };

  const getButtonClassName = (key: string) => {
    const baseClasses = cn(
      "flex items-center justify-center rounded select-none transition-colors",
      darkMode 
        ? "bg-slate-800 text-white hover:bg-slate-700" 
        : "bg-slate-100 text-slate-900 hover:bg-slate-200",
      theme === 'default' ? "border" : "",
      theme === 'rounded' ? "rounded-full" : "rounded",
      animateKeys && "transition-transform active:scale-90",
      transparentKeys && "bg-opacity-50 hover:bg-opacity-70",
      key === 'backspace' || key === 'enter' || key === 'shift' || key === 'space' || key === 'numbers' || key === 'abc'
        ? "font-medium" 
        : ""
    );

    switch (key) {
      case 'space':
        return cn(baseClasses, "col-span-3 px-12 py-3");
      case 'enter':
        return cn(baseClasses, "col-span-2 px-4 py-3", 
          darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600 text-white"
        );
      case 'backspace':
        return cn(baseClasses, "px-4 py-3");
      case 'shift':
      case 'numbers':
      case 'abc':
      case 'ESC':
      case 'CTRL':
      case 'ALT':
      case 'SHIFT':
        return cn(baseClasses, "col-span-2 px-4 py-3");
      default:
        return cn(
          baseClasses, 
          key.length > 3 ? "px-2 py-3 text-xs" : "px-3 py-3 min-w-10",
        );
    }
  };

  const renderKeyContent = (key: string) => {
    switch (key) {
      case 'backspace':
        return <Backspace className="h-4 w-4" />;
      case 'enter':
        return <CornerDownLeft className="h-4 w-4" />;
      case 'shift':
        return currentView === 'shift' ? <ChevronsUp className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />;
      case 'space':
        return 'Space';
      case 'numbers':
        return '123';
      case 'abc':
        return 'ABC';
      default:
        return key;
    }
  };

  const renderLayoutSelector = () => {
    if (!showLayoutSelector) return null;
    
    return (
      <div className="mb-2">
        <Select value={currentLayout} onValueChange={(value) => {
          setCurrentLayout(value);
          setCurrentView('default');
        }}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select layout" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="standard">Standard</SelectItem>
            <SelectItem value="compact">Compact</SelectItem>
            <SelectItem value="numpad">Numeric</SelectItem>
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
    if (!showLanguageSelector || !['standard', 'compact', 'dvorak'].includes(currentLayout)) return null;
    
    return (
      <div className="mb-2 ml-2">
        <Select value={currentLanguage} onValueChange={(value) => setCurrentLanguage(value)}>
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

  const showKeyboard = alwaysVisible || isFocused;

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Optional input field */}
      {inputPlaceholder && (
        <div className="relative mb-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (onChange) onChange(e.target.value);
            }}
            onFocus={() => setIsFocused(true)}
            className={cn(
              "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2",
              darkMode ? "bg-slate-800 text-white border-slate-700 focus:ring-blue-600" : "bg-white border-slate-300 focus:ring-blue-500",
              inputClassName
            )}
            placeholder={inputPlaceholder}
          />
        </div>
      )}

      {/* Virtual Keyboard */}
      {showKeyboard && (
        <div className={cn(
          "p-2 rounded-lg shadow-lg transition-all", 
          darkMode ? "bg-slate-900" : "bg-white border",
          theme === 'minimal' ? "shadow-sm" : "shadow-lg",
          isFullscreen ? "fixed inset-0 z-50 rounded-none" : ""
        )}>
          {(showLayoutSelector || showLanguageSelector || showCloseButton) && renderControls()}
          
          <div className="grid gap-1">
            {getKeyboardView().map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-1">
                {row.map((key, keyIndex) => {
                  const keyButton = (
                    <button
                      key={`${rowIndex}-${keyIndex}`}
                      className={getButtonClassName(key)}
                      onClick={() => handleKeyPress(key)}
                    >
                      {renderKeyContent(key)}
                    </button>
                  );

                  if (showTooltips && key.length > 1 && !['space', 'enter', 'shift', 'numbers', 'abc', 'backspace'].includes(key)) {
                    return (
                      <TooltipProvider key={`${rowIndex}-${keyIndex}`}>
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
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualKeyboard;
