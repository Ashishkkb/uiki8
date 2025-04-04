
import React, { useState, KeyboardEvent } from 'react';
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface TagInputProps {
  label?: string;
  placeholder?: string;
  defaultTags?: string[];
  maxTags?: number;
  onChange?: (tags: string[]) => void;
  className?: string;
}

const TagInput: React.FC<TagInputProps> = ({
  label = "Tags",
  placeholder = "Type and press Enter",
  defaultTags = [],
  maxTags = 10,
  onChange,
  className
}) => {
  const [tags, setTags] = useState<string[]>(defaultTags);
  const [inputValue, setInputValue] = useState("");
  
  const handleAddTag = () => {
    if (inputValue.trim() === "" || tags.length >= maxTags) return;
    
    // Prevent duplicate tags
    if (!tags.includes(inputValue.trim())) {
      const newTags = [...tags, inputValue.trim()];
      setTags(newTags);
      if (onChange) onChange(newTags);
    }
    
    setInputValue("");
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    if (onChange) onChange(newTags);
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      const newTags = [...tags];
      newTags.pop();
      setTags(newTags);
      if (onChange) onChange(newTags);
    }
  };
  
  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label>{label}</Label>}
      
      <div className="flex flex-wrap gap-2 p-2 bg-background border border-input rounded-md min-h-[38px]">
        {tags.map((tag, i) => (
          <Badge key={i} variant="secondary" className="px-2 py-1 gap-1">
            {tag}
            <button
              type="button"
              onClick={() => handleRemoveTag(tag)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleAddTag}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[120px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-7"
        />
      </div>
      
      {maxTags && (
        <p className="text-xs text-muted-foreground mt-1">
          {tags.length} of {maxTags} tags used
        </p>
      )}
    </div>
  );
};

export default TagInput;
