
import React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface AvatarComponentProps {
  src?: string;
  fallback?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'away' | 'busy' | 'none';
  shape?: 'circle' | 'square';
  bordered?: boolean;
  withInfo?: boolean;
  name?: string;
  role?: string;
}

const AvatarPreview = ({
  src = "",
  fallback = "JD",
  alt = "User avatar",
  size = 'md',
  status = 'none',
  shape = 'circle',
  bordered = false,
  withInfo = false,
  name = "John Doe",
  role = "Product Designer"
}: AvatarComponentProps) => {
  
  const sizeClasses = {
    xs: "h-6 w-6 text-xs",
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg"
  };
  
  const statusClasses = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-amber-500",
    busy: "bg-red-500",
    none: "hidden"
  };
  
  const getStatusSize = () => {
    switch (size) {
      case 'xs': return 'h-1.5 w-1.5';
      case 'sm': return 'h-2 w-2';
      case 'md': return 'h-2.5 w-2.5';
      case 'lg': return 'h-3 w-3';
      case 'xl': return 'h-3.5 w-3.5';
      default: return 'h-2.5 w-2.5';
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Generate sample images and user data for the gallery
  const sampleUsers = [
    { name: "Alex Johnson", role: "Developer", src: "https://i.pravatar.cc/150?img=1", status: "online" },
    { name: "Sarah Williams", role: "Designer", src: "https://i.pravatar.cc/150?img=5", status: "busy" },
    { name: "Michael Chen", role: "Product Manager", src: "https://i.pravatar.cc/150?img=3", status: "away" },
    { name: "Emma Garcia", role: "Marketing", fallback: "EG", status: "offline" }
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Individual avatar with customizable props */}
      <div className="flex flex-wrap gap-6 justify-center">
        <div className="relative">
          <Avatar 
            className={cn(
              sizeClasses[size],
              shape === 'square' ? 'rounded-md' : 'rounded-full',
              bordered && 'ring-2 ring-background border border-border'
            )}
          >
            <AvatarImage src={src} alt={alt} />
            <AvatarFallback>{fallback || getInitials(name)}</AvatarFallback>
          </Avatar>
          {status !== 'none' && (
            <span 
              className={cn(
                "absolute bottom-0 right-0 block rounded-full ring-2 ring-white",
                statusClasses[status],
                getStatusSize()
              )}
            />
          )}
        </div>
        
        {withInfo && (
          <div className="flex items-center gap-3">
            <Avatar className={cn(sizeClasses[size])}>
              <AvatarImage src={src} alt={alt} />
              <AvatarFallback>{fallback || getInitials(name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{name}</p>
              <p className="text-xs text-muted-foreground">{role}</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Avatar sizes */}
      <div className="border rounded-lg p-6">
        <h3 className="text-sm font-medium mb-4">Avatar Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Avatar className="h-6 w-6 text-xs">
            <AvatarImage src={src} alt={alt} />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
          <Avatar className="h-8 w-8 text-xs">
            <AvatarImage src={src} alt={alt} />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
          <Avatar className="h-10 w-10 text-sm">
            <AvatarImage src={src} alt={alt} />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
          <Avatar className="h-12 w-12 text-base">
            <AvatarImage src={src} alt={alt} />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
          <Avatar className="h-16 w-16 text-lg">
            <AvatarImage src={src} alt={alt} />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      {/* User gallery example */}
      <div className="border rounded-lg p-6">
        <h3 className="text-sm font-medium mb-4">User Gallery</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sampleUsers.map((user, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.src} alt={user.name} />
                  <AvatarFallback>{user.fallback || getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <span 
                  className={cn(
                    "absolute bottom-0 right-0 block rounded-full ring-2 ring-white h-2.5 w-2.5",
                    statusClasses[user.status as keyof typeof statusClasses]
                  )}
                />
              </div>
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.role}</p>
              </div>
              {user.status === 'online' && (
                <Badge variant="outline" className="ml-auto text-xs bg-green-50 text-green-700 border-green-200">
                  Active
                </Badge>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvatarPreview;
