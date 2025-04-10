
import React, { useState } from 'react';
import { Copy, Facebook, Linkedin, Mail, MoreHorizontal, Twitter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SocialShareProps {
  url?: string;
  title?: string;
  description?: string;
}

const SocialShareComponent: React.FC<SocialShareProps> = ({
  url = window.location.href,
  title = "Check this out!",
  description = "I found something interesting I wanted to share with you."
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = [
    {
      name: 'Twitter',
      icon: <Twitter className="h-4 w-4 mr-2" />,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'bg-[#1DA1F2] hover:bg-[#1a94da] text-white'
    },
    {
      name: 'Facebook',
      icon: <Facebook className="h-4 w-4 mr-2" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-[#1877F2] hover:bg-[#166fe5] text-white'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="h-4 w-4 mr-2" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'bg-[#0A66C2] hover:bg-[#085bb3] text-white'
    },
    {
      name: 'Email',
      icon: <Mail className="h-4 w-4 mr-2" />,
      url: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
      color: 'bg-gray-600 hover:bg-gray-700 text-white'
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      toast.success("URL copied to clipboard");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy URL");
    }
  };

  return (
    <div className="inline-flex flex-wrap gap-2 items-center">
      {shareLinks.slice(0, 3).map((platform) => (
        <Button
          key={platform.name}
          size="sm"
          className={`${platform.color}`}
          onClick={() => window.open(platform.url, '_blank')}
        >
          {platform.icon}
          <span className="hidden sm:inline">{platform.name}</span>
        </Button>
      ))}
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="outline">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {shareLinks.slice(3).map((platform) => (
            <DropdownMenuItem key={platform.name} onClick={() => window.open(platform.url, '_blank')}>
              {platform.icon}
              <span>{platform.name}</span>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem onClick={copyToClipboard}>
            <Copy className="h-4 w-4 mr-2" />
            <span>{isCopied ? "Copied!" : "Copy link"}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SocialShareComponent;
