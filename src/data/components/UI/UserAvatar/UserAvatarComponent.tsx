
import React, { useMemo } from 'react';
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const userAvatarVariants = cva(
  "inline-flex items-center justify-center font-normal",
  {
    variants: {
      variant: {
        default: "",
        bordered: "ring-2 ring-background",
        outline: "ring-2 ring-muted",
      },
      size: {
        xs: "h-6 w-6 text-[10px]",
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
        xl: "h-16 w-16 text-lg",
        "2xl": "h-20 w-20 text-xl",
      },
      status: {
        online: "ring-2 ring-green-500",
        offline: "ring-2 ring-gray-400",
        away: "ring-2 ring-amber-500",
        busy: "ring-2 ring-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface UserAvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof userAvatarVariants> {
  user?: {
    name?: string;
    email?: string;
    image?: string;
  };
  fallback?: string;
  initials?: string;
  showStatus?: boolean;
  statusPosition?: 'top-right' | 'bottom-right';
  statusIndicator?: React.ReactNode;
  showBadge?: boolean;
  badgeContent?: React.ReactNode;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

const UserAvatarComponent: React.FC<UserAvatarProps> = ({
  user,
  fallback,
  initials,
  variant,
  size,
  status,
  className,
  showStatus,
  statusPosition = 'bottom-right',
  statusIndicator,
  showBadge = false,
  badgeContent,
  badgeVariant = 'default',
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

  const statusClasses = {
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
        className={cn(userAvatarVariants({ variant, size, status }), className)}
        {...props}
      >
        {user?.image ? (
          <AvatarImage
            src={user.image}
            alt={user.name || 'User'}
            loading="lazy"
          />
        ) : null}
        <AvatarFallback delayMs={600}>
          {computedInitials}
        </AvatarFallback>
      </Avatar>
      
      {showStatus && !statusIndicator && status && (
        <span 
          className={cn(
            "absolute block rounded-full ring-2 ring-background",
            getStatusColor(),
            statusPosition === 'top-right' ? "h-2.5 w-2.5" : "h-3 w-3",
            statusClasses[statusPosition]
          )}
        />
      )}
      
      {showStatus && statusIndicator && (
        <span 
          className={cn(
            "absolute",
            statusClasses[statusPosition]
          )}
        >
          {statusIndicator}
        </span>
      )}

      {showBadge && badgeContent && (
        <Badge 
          variant={badgeVariant} 
          className={cn(
            "absolute -top-2 -right-2",
            size === 'xs' || size === 'sm' ? 'text-[10px] px-1 h-4 min-w-4' : ''
          )}
        >
          {badgeContent}
        </Badge>
      )}
    </div>
  );
};

export default UserAvatarComponent;
