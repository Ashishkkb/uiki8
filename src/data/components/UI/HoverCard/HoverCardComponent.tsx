
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CalendarDays, MapPin, Briefcase, Mail, Link } from "lucide-react";

interface CustomHoverCardProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  openDelay?: number;
  closeDelay?: number;
  className?: string;
}

const CustomHoverCard: React.FC<CustomHoverCardProps> = ({
  trigger,
  children,
  side = "bottom",
  align = "center",
  openDelay = 300,
  closeDelay = 200,
  className,
}) => {
  return (
    <HoverCard openDelay={openDelay} closeDelay={closeDelay}>
      <HoverCardTrigger asChild>
        <span className="cursor-pointer">{trigger}</span>
      </HoverCardTrigger>
      <HoverCardContent 
        side={side}
        align={align}
        className={className}
      >
        {children}
      </HoverCardContent>
    </HoverCard>
  );
};

const HoverCardDemo = () => {
  return (
    <div className="space-y-8">
      {/* User Profile Hover Card */}
      <div className="flex justify-center">
        <CustomHoverCard
          trigger={
            <Button variant="link">Sarah Johnson</Button>
          }
          className="w-80"
        >
          <div className="flex justify-between space-x-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">Sarah Johnson</h4>
              <p className="text-sm text-muted-foreground">Product Designer</p>
              <div className="flex items-center pt-2">
                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                <span className="text-xs text-muted-foreground">
                  Joined March 2023
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm">
              <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Design Lead at Acme Inc.</span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center text-sm">
              <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>sarah@example.com</span>
            </div>
          </div>
        </CustomHoverCard>
      </div>
      
      {/* Product Preview Hover Card */}
      <div className="flex justify-center">
        <CustomHoverCard
          trigger={
            <span className="text-primary underline decoration-dotted underline-offset-4">
              Premium Wireless Headphones
            </span>
          }
          side="right"
          align="start"
          className="w-96"
        >
          <div className="flex flex-col space-y-4">
            <div className="aspect-video rounded-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80" 
                alt="Headphones"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-base font-medium">Premium Wireless Headphones</h4>
                <Badge>New</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                High-quality noise-cancelling headphones with 30-hour battery life.
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-medium">$299.99</span>
                <Button size="sm">Add to Cart</Button>
              </div>
            </div>
          </div>
        </CustomHoverCard>
      </div>
      
      {/* Link Preview Hover Card */}
      <div className="flex justify-center">
        <CustomHoverCard
          trigger={
            <div className="flex items-center text-primary">
              <Link className="mr-1 h-4 w-4" />
              <span className="underline">Visit our documentation</span>
            </div>
          }
          side="top"
        >
          <div className="text-sm">
            <p className="font-medium">Documentation Portal</p>
            <p className="text-muted-foreground mt-1">
              Our comprehensive guide to using all features and APIs.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              https://docs.example.com
            </p>
          </div>
        </CustomHoverCard>
      </div>
    </div>
  );
};

export default HoverCardDemo;
