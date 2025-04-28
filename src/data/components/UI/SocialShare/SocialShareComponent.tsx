
import React, { useState } from 'react';
import { Copy, Facebook, Linkedin, Twitter, MoreHorizontal, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SocialShareComponentProps {
  url?: string;
  title?: string;
  description?: string;
  twitterHandle?: string;
  showLabel?: boolean;
  className?: string;
}

const SocialShareComponent: React.FC<SocialShareComponentProps> = ({ 
  url = window.location.href,
  title = "Check this out!",
  description = "",
  twitterHandle = "",
  showLabel = true,
  className = "",
}) => {
  const [copied, setCopied] = useState(false);
  
  // Sanitize inputs to prevent XSS
  const sanitizeValue = (value: string): string => {
    return value
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\\/g, '\\\\')
      .replace(/\//g, '\\/');
  };

  const encodedUrl = encodeURIComponent(sanitizeValue(url));
  const encodedTitle = encodeURIComponent(sanitizeValue(title));
  const encodedDescription = encodeURIComponent(sanitizeValue(description));
  const encodedTwitterHandle = twitterHandle ? encodeURIComponent(sanitizeValue(twitterHandle)) : '';

  const shareLinks = [
    {
      name: 'Twitter',
      icon: <Twitter className="h-4 w-4 mr-2" />,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}${encodedTwitterHandle ? `&via=${encodedTwitterHandle}` : ''}`,
      ariaLabel: "Share on Twitter"
    },
    {
      name: 'Facebook',
      icon: <Facebook className="h-4 w-4 mr-2" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
      ariaLabel: "Share on Facebook"
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="h-4 w-4 mr-2" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
      ariaLabel: "Share on LinkedIn"
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("URL copied to clipboard");
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
      toast.error("Failed to copy URL");
    }
  };

  // Security: Open links in a new tab with security attributes
  const handleShareClick = (shareUrl: string, name: string) => {
    try {
      const shareWindow = window.open(
        shareUrl, 
        `Share on ${name}`, 
        'width=600,height=400,noopener,noreferrer'
      );
      
      if (shareWindow) {
        shareWindow.focus();
      }
      
      toast.success(`Opened ${name} share dialog`);
    } catch (error) {
      console.error(`Failed to open ${name} share dialog`, error);
      toast.error(`Failed to share on ${name}`);
    }
  };

  return (
    <div className={`inline-flex gap-2 items-center ${className}`}>
      {shareLinks.map((platform) => (
        <Button
          key={platform.name}
          size="sm"
          variant="outline"
          onClick={() => handleShareClick(platform.url, platform.name)}
          aria-label={platform.ariaLabel}
          className="focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {platform.icon}
          {showLabel && <span className="hidden sm:inline">{platform.name}</span>}
        </Button>
      ))}
      
      <Button 
        size="sm" 
        variant="outline" 
        onClick={copyToClipboard}
        aria-label="Copy link to clipboard"
        className="focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        {copied ? 
          <CheckCircle className="h-4 w-4 mr-2 text-green-500" /> :
          <Copy className="h-4 w-4 mr-2" />
        }
        {showLabel && <span className="hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>}
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            size="sm" 
            variant="outline"
            aria-label="More sharing options"
            className="focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => {
            window.open(`mailto:?subject=${encodedTitle}&body=${encodedDescription}%20${encodedUrl}`);
          }}>
            Email
          </DropdownMenuItem>
          <DropdownMenuItem onClick={copyToClipboard}>
            Copy link
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SocialShareComponent;
