
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialProps {
  quote: string;
  author: {
    name: string;
    title?: string;
    avatar?: string;
    initials?: string;
  };
  rating?: number;
  className?: string;
  variant?: 'default' | 'bordered' | 'highlight';
}

const FeaturedTestimonialComponent: React.FC<TestimonialProps> = ({
  quote = "",
  author = { name: "Anonymous" }, // Provide default author
  rating = 5,
  className,
  variant = 'default'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'bordered':
        return "border border-muted rounded-lg p-6";
      case 'highlight':
        return "bg-primary/5 border border-primary/10 rounded-lg p-6";
      case 'default':
      default:
        return "bg-muted/50 rounded-lg p-6";
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={cn(
          "h-4 w-4",
          i < rating ? "text-amber-500 fill-amber-500" : "text-muted-foreground"
        )}
      />
    ));
  };

  return (
    <div className={cn(
      getVariantClasses(),
      "relative",
      className
    )}>
      <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/10" />
      
      {rating > 0 && (
        <div className="flex items-center gap-1 mb-4">
          {renderStars()}
        </div>
      )}
      
      <blockquote className="text-base sm:text-lg font-medium leading-relaxed mb-6">
        "{quote}"
      </blockquote>
      
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 border">
          {author?.avatar ? (
            <AvatarImage src={author.avatar} alt={author.name} />
          ) : null}
          <AvatarFallback className="bg-primary/10 text-primary">
            {author?.initials || author?.name?.split(' ').map(n => n[0]).join('') || 'A'}
          </AvatarFallback>
        </Avatar>
        
        <div>
          <div className="font-medium">{author?.name || 'Anonymous'}</div>
          {author?.title && (
            <div className="text-sm text-muted-foreground">{author.title}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedTestimonialComponent;
