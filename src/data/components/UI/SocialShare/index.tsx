
import { ComponentItem } from "@/types/component";
import SocialShareComponent from "./SocialShareComponent";

const SocialShareComponentItem: ComponentItem = {
  id: 202,
  name: "Social Share",
  description: "Easily share content across popular social media platforms",
  category: "UI",
  component: SocialShareComponent,
  code: `import React from 'react';
import { Copy, Facebook, Linkedin, Twitter, MoreHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const SocialShare = ({ 
  url = window.location.href,
  title = "Check this out!" 
}) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'Twitter',
      icon: <Twitter className="h-4 w-4 mr-2" />,
      url: \`https://twitter.com/intent/tweet?url=\${encodedUrl}&text=\${encodedTitle}\`,
    },
    {
      name: 'Facebook',
      icon: <Facebook className="h-4 w-4 mr-2" />,
      url: \`https://www.facebook.com/sharer/sharer.php?u=\${encodedUrl}\`,
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="h-4 w-4 mr-2" />,
      url: \`https://www.linkedin.com/sharing/share-offsite/?url=\${encodedUrl}\`,
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("URL copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy URL");
    }
  };

  return (
    <div className="inline-flex gap-2 items-center">
      {shareLinks.map((platform) => (
        <Button
          key={platform.name}
          size="sm"
          variant="outline"
          onClick={() => window.open(platform.url, '_blank')}
        >
          {platform.icon}
          <span className="hidden sm:inline">{platform.name}</span>
        </Button>
      ))}
      
      <Button size="sm" variant="outline" onClick={copyToClipboard}>
        <Copy className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Copy</span>
      </Button>
    </div>
  );
};`,
  framework: "React",
  isNew: true,
  tags: ["social", "share", "buttons", "media"]
};

export default SocialShareComponentItem;
