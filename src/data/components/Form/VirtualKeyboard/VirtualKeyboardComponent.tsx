import React, { useState, useCallback, useMemo } from 'react';
import { ArrowUp, ChevronsUp, Delete, CornerDownLeft, X, Languages, Maximize2, Minimize2, Keyboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

type KeyboardLayout = 
  | 'standard' | 'compact' | 'numpad' | 'phone' 
  | 'emoji' | 'symbols' | 'math' | 'programming' 
  | 'dvorak' | 'gaming';

type KeyboardLanguage = 'en' | 'es' | 'fr' | 'de' | 'ru' | 'ar' | 'zh';
type KeyboardView = 'default' | 'shift' | 'numbers';
type KeyboardTheme = 'default' | 'minimal' | 'rounded';

interface VirtualKeyboardProps {
  onKeyPress?: (key: string) => void;
  onEnter?: (text: string) => void;
  value?: string;
  onChange?: (value: string) => void;
  layout?: KeyboardLayout;
  darkMode?: boolean;
  theme?: KeyboardTheme;
  showCloseButton?: boolean;
  inputClassName?: string;
  className?: string;
  onClose?: () => void;
  alwaysVisible?: boolean;
  inputPlaceholder?: string;
  showLayoutSelector?: boolean;
  showLanguageSelector?: boolean;
  language?: KeyboardLanguage;
  showTooltips?: boolean;
  transparentKeys?: boolean;
  animateKeys?: boolean;
  fullscreenMode?: boolean;
}

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
      ['1', '2', '3', '+', '-'],
      ['4', '5', '6', '*', '/'],
      ['7', '8', '9', '(', ')'],
      ['0', '.', ',', 'backspace'],
      ['abc', 'space', 'enter']
    ]
  }
} as const;

const LANGUAGE_LAYOUTS = {
  en: LAYOUTS.standard,
  es: {
    default: [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ'],
      ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
      ['numbers', 'space', 'enter']
    ]
  }
} as const;

const THEME_STYLES = {
  dark: {
    background: 'bg-slate-900',
    button: {
      base: 'bg-slate-800 text-white hover:bg-slate-700',
      special: 'bg-blue-600 hover:bg-blue-700 text-white'
    },
    border: 'border-slate-700'
  },
  light: {
    background: 'bg-white',
    button: {
      base: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
      special: 'bg-blue-500 hover:bg-blue-600 text-white'
    },
    border: 'border-slate-200'
  }
} as const;

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = React.memo(({
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
  const [currentLayout, setCurrentLayout] = useState<KeyboardLayout>(layout);
  const [currentView, setCurrentView] = useState<KeyboardView>('default');
  const [inputValue, setInputValue] = useState<string>(value);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [currentLanguage, setCurrentLanguage] = useState<KeyboardLanguage>(language);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(fullscreenMode);

  const themeStyles = THEME_STYLES[darkMode ? 'dark' : 'light'];

  const getKeyboardView = useCallback(() => {
    const layoutData = LANGUAGE_LAYOUTS[currentLanguage]?.[currentView] || 
                      LAYOUTS[currentLayout]?.[currentView] || 
                      LAYOUTS.standard.default;
    return layoutData;
  }, [currentLanguage, currentLayout, currentView]);

  const handleKeyPress = useCallback((key: string) => {
    if (onKeyPress) {
      onKeyPress(key);
    }

    let newValue = inputValue;

    switch (key) {
      case 'backspace':
        newValue = inputValue.slice(0, -1);
        break;
      case 'enter':
        onEnter?.(inputValue);
        return;
      case 'shift':
        setCurrentView(prev => prev === 'shift' ? 'default' : 'shift');
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
      default:
        newValue += key;
    }

    setInputValue(newValue);
    onChange?.(newValue);
  }, [inputValue, onChange, onEnter, onKeyPress]);

  const getButtonClassName = useCallback((key: string) => {
    const baseClasses = cn(
      "transition-all rounded font-medium",
      themeStyles.button.base,
      theme === 'rounded' && "rounded-full",
      animateKeys && "transition-transform active:scale-90",
      transparentKeys && "bg-opacity-50 hover:bg-opacity-70"
    );

    switch (key) {
      case 'space':
        return cn(baseClasses, "col-span-3 px-12 py-3");
      case 'enter':
        return cn(baseClasses, "col-span-2 px-4 py-3", themeStyles.button.special);
      case 'backspace':
      case 'shift':
      case 'numbers':
      case 'abc':
        return cn(baseClasses, "col-span-2 px-4 py-3");
      default:
        return cn(
          baseClasses, 
          key.length > 3 ? "px-2 py-3 text-xs" : "px-3 py-3 min-w-10",
        );
    }
  }, [theme, animateKeys, transparentKeys, themeStyles.button]);

  const renderKeyContent = useCallback((key: string) => {
    switch (key) {
      case 'backspace':
        return <Delete className="h-4 w-4" />;
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
  }, [currentView]);

  const renderControls = () => (
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center">
        {showLayoutSelector && (
          <Select value={currentLayout} onValueChange={(value) => setCurrentLayout(value as KeyboardLayout)}>
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
        )}

        {showLanguageSelector && ['standard', 'compact', 'dvorak'].includes(currentLayout) && (
          <Select value={currentLanguage} onValueChange={(value) => setCurrentLanguage(value as KeyboardLanguage)}>
            <SelectTrigger className="w-[120px] ml-2">
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
        )}
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
          <span className="sr-only">
            {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          </span>
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );

  const showKeyboard = alwaysVisible || isFocused;

  return (
    <div className={cn("flex flex-col", className)}>
      {inputPlaceholder && (
        <div className="relative mb-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              onChange?.(e.target.value);
            }}
            onFocus={() => setIsFocused(true)}
            className={cn(
              "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2",
              darkMode 
                ? "bg-slate-800 text-white border-slate-700 focus:ring-blue-600" 
                : "bg-white border-slate-300 focus:ring-blue-500",
              inputClassName
            )}
            placeholder={inputPlaceholder}
          />
        </div>
      )}

      {showKeyboard && (
        <div className={cn(
          "p-2 rounded-lg shadow-lg transition-all", 
          themeStyles.background,
          theme === 'minimal' ? "shadow-sm" : "shadow-lg",
          isFullscreen ? "fixed inset-0 z-50 rounded-none" : "",
          "border",
          themeStyles.border
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
});

VirtualKeyboard.displayName = "VirtualKeyboard";

export default VirtualKeyboard;
