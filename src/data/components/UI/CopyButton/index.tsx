
import { ComponentItem } from "@/types/component";
import CopyButtonComponent from "./CopyButtonComponent";

const CopyButtonComponentItem: ComponentItem = {
  id: 65,
  name: "Copy Button",
  category: "UI",
  framework: "React",
  description: "A button component that copies text to the clipboard with visual feedback and optional toast notifications.",
  component: CopyButtonComponent,
  price: "Free",
  language: "TypeScript",
  previewBg: "light",
  tags: ["UI", "button", "copy", "clipboard", "utility"],
  isNew: true,
  fileSize: "1.9kb",
  complexity: "simple",
  lastUpdated: "2025-04-06",
  author: "Lovable UI",
  code: `import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface CopyButtonProps {
  value: string;
  onCopy?: () => void;
  className?: string;
  successDuration?: number;
  variant?: 'default' | 'secondary' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showText?: boolean;
  text?: {
    copy: string;
    copied: string;
  };
  showToast?: boolean;
  toastMessage?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({
  value,
  onCopy,
  className,
  successDuration = 2000,
  variant = 'outline',
  size = 'sm',
  showText = true,
  text = {
    copy: "Copy",
    copied: "Copied!",
  },
  showToast = true,
  toastMessage = "Copied to clipboard"
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      
      if (showToast) {
        toast.success(toastMessage);
      }
      
      if (onCopy) {
        onCopy();
      }
      
      setTimeout(() => {
        setIsCopied(false);
      }, successDuration);
    } catch (error) {
      console.error("Failed to copy text:", error);
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={copyToClipboard}
      className={cn(
        "group transition-all",
        isCopied && "bg-green-100 text-green-700 border-green-200 hover:bg-green-200 hover:text-green-800",
        className
      )}
      disabled={isCopied}
    >
      {isCopied ? (
        <Check className="h-3.5 w-3.5 text-green-600" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
      {showText && (
        <span className="ml-1.5">
          {isCopied ? text.copied : text.copy}
        </span>
      )}
    </Button>
  );
};

export default CopyButton;`,
};

export default CopyButtonComponentItem;
