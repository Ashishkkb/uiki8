import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { DeleteIcon, ChevronLeft, ArrowUp, ArrowDown, Space } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VirtualKeyboardProps {
  onKeyPress?: (key: string) => void;
  layout?: 'standard' | 'numeric';
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
}) => {
  const [capsLock, setCapsLock] = useState(initialCaps);
  const [shift, setShift] = useState(false);
  const [showSymbols, setShowSymbols] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');

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
    
    return (
      <Button
        variant="outline"
        className={cn("h-10 md:h-12 w-8 md:w-10 p-0", className)}
        onClick={() => handleKeyPress(keyToUse)}
      >
        {displayContent}
      </Button>
    );
  };

  const renderStandardLayout = () => {
    // Number row
    const numberRow = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const shiftedNumberRow = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];
    const symbolsRow1 = ['~', '`', '|', '•', '√', 'π', '÷', '×', '¶', '∆'];
    const symbolsRow2 = ['£', '¢', '€', '¥', '©', '®', '™', '℅', '[', ']'];
    const symbolsRow3 = ['{', '}', '\\', ':', ';', '"', '\'', '<', '>', '?'];
    
    // Letter rows
    const row1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
    const row2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
    const row3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
    
    const renderNumberRow = () => {
      if (showSymbols) {
        return (
          <div className="flex justify-center space-x-1 my-1">
            {symbolsRow1.map(key => renderKey(key))}
          </div>
        );
      }
      
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
        
        {showSymbols ? (
          <>
            <div className="flex justify-center space-x-1 my-1">
              {symbolsRow2.map(key => renderKey(key))}
            </div>
            <div className="flex justify-center space-x-1 my-1">
              {symbolsRow3.map(key => renderKey(key))}
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center space-x-1 my-1">
              {row1.map(key => renderKey(key))}
            </div>
            <div className="flex justify-center space-x-1 my-1 px-4">
              {row2.map(key => renderKey(key))}
            </div>
            <div className="flex justify-center space-x-1 my-1">
              <Button
                variant="outline"
                className="h-10 md:h-12 w-12 md:w-16"
                onClick={() => {
                  setShift(!shift);
                }}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              
              {row3.map(key => renderKey(key))}
              
              <Button
                variant="outline"
                className="h-10 md:h-12 w-12 md:w-16"
                onClick={() => {
                  handleKeyPress('Backspace');
                }}
              >
                <DeleteIcon className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
        
        <div className="flex justify-center space-x-1 my-1">
          <Button
            variant="outline"
            className="h-10 md:h-12 w-16 md:w-20"
            onClick={() => {
              setCapsLock(!capsLock);
            }}
          >
            CAPS
          </Button>
          
          {allowSpecialChars && (
            <Button
              variant="outline"
              className="h-10 md:h-12 w-16 md:w-20"
              onClick={() => setShowSymbols(!showSymbols)}
              data-state={showSymbols ? 'on' : 'off'}
            >
              {showSymbols ? 'ABC' : '!@#'}
            </Button>
          )}
          
          <Button
            variant="outline"
            className="h-10 md:h-12 w-32 md:w-48"
            onClick={() => handleKeyPress(' ')}
          >
            <Space className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            className="h-10 md:h-12 w-16 md:w-20"
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
          className="h-10 md:h-12 col-span-2"
          onClick={() => handleKeyPress(' ')}
        >
          <Space className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-10 md:h-12"
          onClick={() => handleKeyPress('Backspace')}
        >
          <DeleteIcon className="h-4 w-4" />
        </Button>
      </div>
    );
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
  
  const renderCloseButton = () => {
    if (showCloseButton && onClose) {
      return (
        <div className="flex justify-end mb-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-6 w-6 p-0"
          >
            <span className="sr-only">Close</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className={cn(
      "p-2 border rounded-lg shadow-sm bg-background",
      darkMode ? "bg-slate-900 text-white" : "",
      className
    )}>
      {renderInputField()}
      {renderCloseButton()}
      {layout === 'standard' ? renderStandardLayout() : renderNumericLayout()}
    </div>
  );
};

export default VirtualKeyboard;
