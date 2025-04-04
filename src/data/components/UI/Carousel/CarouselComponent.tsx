
import React from 'react';
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CustomCarouselProps {
  items: React.ReactNode[];
  opts?: {
    align?: "start" | "center" | "end";
    loop?: boolean;
    dragFree?: boolean;
  };
  className?: string;
  contentClassName?: string;
  itemClassName?: string;
  showControls?: boolean;
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({
  items,
  opts = { align: "center", loop: true },
  className,
  contentClassName,
  itemClassName,
  showControls = true,
}) => {
  return (
    <Carousel className={cn("w-full", className)} opts={opts}>
      <CarouselContent className={contentClassName}>
        {items.map((item, index) => (
          <CarouselItem key={index} className={itemClassName}>
            {item}
          </CarouselItem>
        ))}
      </CarouselContent>
      
      {showControls && (
        <>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </>
      )}
    </Carousel>
  );
};

const CarouselDemo = () => {
  // Image carousel items
  const imageItems = [
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=60",
  ];
  
  const imageCarouselItems = imageItems.map((src, index) => (
    <div className="relative h-[250px] w-full overflow-hidden rounded-lg">
      <img
        src={src}
        alt={`Slide ${index + 1}`}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20 flex items-end">
        <div className="p-4 text-white">
          <h3 className="text-lg font-medium">Slide {index + 1}</h3>
          <p className="text-sm opacity-80">Image description here</p>
        </div>
      </div>
    </div>
  ));
  
  // Card carousel items
  const cardItems = [
    {
      title: "Web Development",
      description: "Build responsive and dynamic web applications with modern frameworks.",
      color: "bg-blue-500",
    },
    {
      title: "UI/UX Design",
      description: "Create beautiful and intuitive user interfaces that delight users.",
      color: "bg-purple-500",
    },
    {
      title: "Mobile Development",
      description: "Develop cross-platform mobile applications for iOS and Android.",
      color: "bg-green-500",
    },
    {
      title: "Cloud Services",
      description: "Leverage cloud platforms for scalable and reliable applications.",
      color: "bg-orange-500",
    },
    {
      title: "DevOps",
      description: "Streamline development and operations with automated workflows.",
      color: "bg-pink-500",
    },
  ];
  
  const cardCarouselItems = cardItems.map((item, index) => (
    <Card>
      <CardContent className="flex aspect-square items-center justify-center p-6">
        <div className="text-center space-y-2">
          <div className={`w-12 h-12 rounded-full ${item.color} mx-auto flex items-center justify-center text-white text-xl font-bold`}>
            {index + 1}
          </div>
          <h3 className="text-xl font-medium">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.description}</p>
        </div>
      </CardContent>
    </Card>
  ));
  
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Image Carousel</h3>
        <CustomCarousel
          items={imageCarouselItems}
          opts={{ loop: true }}
        />
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Card Carousel</h3>
        <CustomCarousel
          items={cardCarouselItems}
          opts={{ loop: true }}
          contentClassName="py-4"
          itemClassName="md:basis-1/2 lg:basis-1/3 pl-4"
        />
      </div>
    </div>
  );
};

export default CarouselDemo;
