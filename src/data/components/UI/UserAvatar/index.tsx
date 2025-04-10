
import { ComponentItem } from "@/types/component";
import UserAvatarComponent from "./UserAvatarComponent";

const UserAvatarComponentItem: ComponentItem = {
  id: 212,
  name: "User Avatar",
  description: "An enhanced avatar component with status indicators and customization options",
  category: "UI",
  component: () => (
    <div className="flex flex-wrap gap-6 items-end">
      <UserAvatarComponent 
        user={{ name: "John Doe" }} 
        size="md"
        status="online"
        showStatus={true}
      />
      <UserAvatarComponent 
        user={{ name: "Sarah Wilson", image: "https://i.pravatar.cc/300?img=28" }} 
        size="lg"
        variant="bordered"
        showBadge={true}
        badgeContent="3"
      />
      <UserAvatarComponent 
        user={{ name: "Alex Johnson" }} 
        size="xl"
        status="busy"
        showStatus={true}
        statusPosition="top-right"
      />
      <UserAvatarComponent 
        initials="MK"
        size="2xl"
        variant="outline"
      />
    </div>
  ),
  code: `import React, { useMemo } from 'react';
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const UserAvatar = ({
  user,
  fallback,
  initials,
  variant = 'default', // 'default', 'bordered', 'outline'
  size = 'md', // 'xs', 'sm', 'md', 'lg', 'xl', '2xl'
  status, // 'online', 'offline', 'away', 'busy'
  showStatus = false,
  statusPosition = 'bottom-right',
  showBadge = false,
  badgeContent,
  badgeVariant = 'default',
  className,
  ...props
}) => {
  const computedInitials = useMemo(() => {
    // If explicit initials are provided, use those
    if (initials) return initials;
    
    // If user has a name, get initials from the name
    if (user?.name) {
      return user.name
        .split(' ')
        .map(part => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
    }
    
    // If user has email but no name, use first letter of email
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    
    // Fallback to provided fallback or default
    return fallback || '?';
  }, [initials, user, fallback]);

  // Size classes
  const sizeClasses = {
    xs: "h-6 w-6 text-[10px]",
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg",
    "2xl": "h-20 w-20 text-xl",
  };

  // Variant classes
  const variantClasses = {
    default: "",
    bordered: "ring-2 ring-background",
    outline: "ring-2 ring-muted",
  };

  // Status classes
  const statusClasses = {
    online: "ring-2 ring-green-500",
    offline: "ring-2 ring-gray-400",
    away: "ring-2 ring-amber-500",
    busy: "ring-2 ring-red-500",
  };

  // Status indicator position
  const statusPositionClasses = {
    'top-right': '-top-0.5 -right-0.5',
    'bottom-right': '-bottom-0.5 -right-0.5',
  };

  const getStatusColor = () => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-400';
      case 'away': return 'bg-amber-500';
      case 'busy': return 'bg-red-500';
      default: return '';
    }
  };

  return (
    <div className="relative inline-flex">
      <Avatar
        className={cn(
          sizeClasses[size],
          variantClasses[variant],
          status ? statusClasses[status] : "",
          className
        )}
        {...props}
      >
        {user?.image && <AvatarImage src={user.image} alt={user.name || 'User'} />}
        <AvatarFallback>{computedInitials}</AvatarFallback>
      </Avatar>
      
      {showStatus && status && (
        <span 
          className={cn(
            "absolute block rounded-full ring-2 ring-background",
            getStatusColor(),
            "h-3 w-3",
            statusPositionClasses[statusPosition]
          )}
        />
      )}

      {showBadge && badgeContent && (
        <Badge 
          variant={badgeVariant} 
          className="absolute -top-2 -right-2"
        >
          {badgeContent}
        </Badge>
      )}
    </div>
  );
};`,
  framework: "React",
  isNew: true,
  tags: ["avatar", "user", "profile", "status", "badge"]
};

export default UserAvatarComponentItem;
