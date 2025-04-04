
import React, { useState, useEffect } from 'react';
import { ArrowUp, ChevronsUp, Backspace, CornerDownLeft, X } from 'lucide-react';
import { cn } from '@/lib/utils';

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
      ['.', ',', '?', '!', "'", '`', '~', '+', '='],
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
  }
};

interface VirtualKeyboardProps {
  onKeyPress?: (key: string) => void;
  onEnter?: (text: string) => void;
  value?: string;
  onChange?: (value: string) => void;
  layout?: 'standard' | 'compact' | 'numpad' | 'phone';
  darkMode?: boolean;
  theme?: 'default' | 'minimal' | 'rounded';
  showCloseButton?: boolean;
  inputClassName?: string;
  className?: string;
  onClose?: () => void;
  alwaysVisible?: boolean;
  inputPlaceholder?: string;
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
}) => {
  const [currentLayout, setCurrentLayout] = useState<string>('default');
  const [inputValue, setInputValue] = useState<string>(value);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const getKeyboardView = () => LAYOUTS[layout as keyof typeof LAYOUTS][currentLayout as keyof (typeof LAYOUTS)[typeof layout]];

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
        setCurrentLayout(currentLayout === 'shift' ? 'default' : 'shift');
        return;
      case 'numbers':
        setCurrentLayout('numbers');
        return;
      case 'abc':
        setCurrentLayout('default');
        return;
      case 'space':
        newValue += ' ';
        break;
      default:
        newValue += key;
    }

    setInputValue(newValue);
    
    if (onChange) {
      onChange(newValue);
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
        return cn(baseClasses, "col-span-2 px-4 py-3");
      default:
        return cn(baseClasses, "px-3 py-3 min-w-10");
    }
  };

  const renderKeyContent = (key: string) => {
    switch (key) {
      case 'backspace':
        return <Backspace className="h-4 w-4" />;
      case 'enter':
        return <CornerDownLeft className="h-4 w-4" />;
      case 'shift':
        return currentLayout === 'shift' ? <ChevronsUp className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />;
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

  const showKeyboard = alwaysVisible || isFocused;

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Optional input field */}
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

      {/* Virtual Keyboard */}
      {showKeyboard && (
        <div className={cn(
          "mt-2 p-2 rounded-lg shadow-lg", 
          darkMode ? "bg-slate-900" : "bg-white border",
          theme === 'minimal' ? "shadow-sm" : "shadow-lg"
        )}>
          {showCloseButton && (
            <div className="flex justify-end mb-1">
              <button
                className={cn(
                  "p-1 rounded-md",
                  darkMode ? "hover:bg-slate-800" : "hover:bg-slate-100"
                )}
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          
          <div className="grid gap-1">
            {getKeyboardView().map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-1">
                {row.map((key, keyIndex) => (
                  <button
                    key={`${rowIndex}-${keyIndex}`}
                    className={getButtonClassName(key)}
                    onClick={() => handleKeyPress(key)}
                  >
                    {renderKeyContent(key)}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualKeyboard;
