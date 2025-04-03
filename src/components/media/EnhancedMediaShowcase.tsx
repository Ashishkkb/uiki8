
import React from "react";
import EnhancedMediaGallery, { MediaItem } from "./EnhancedMediaGallery";
import { CodeBlock } from "@/components/ui/code-highlight";

const mediaItems: MediaItem[] = [
  {
    id: "1",
    title: "Mountain Landscapes",
    description: "Beautiful mountain scenery captured during sunrise",
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&w=800&q=80",
    source: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&w=1200&q=80",
    tags: ["nature", "mountains", "landscape"],
    featured: true
  },
  {
    id: "2",
    title: "Cinematic Drone Footage",
    description: "Aerial footage of coastline captured with DJI Mavic 3",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1566837945700-30057527ade0?ixlib=rb-4.0.3&w=800&q=80",
    source: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    duration: "2:15",
    tags: ["aerial", "drone", "beach", "4K"],
    featured: true
  },
  {
    id: "3",
    title: "Ambient Music Collection",
    description: "Relaxing ambient music perfect for focus and meditation",
    type: "audio",
    thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&w=800&q=80",
    source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: "3:42",
    tags: ["ambient", "relaxing", "focus"]
  },
  {
    id: "4",
    title: "City at Night",
    description: "Urban cityscape with neon lights and reflections",
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&w=800&q=80",
    source: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&w=1200&q=80",
    tags: ["city", "night", "urban"]
  },
  {
    id: "5",
    title: "Product Demo Video",
    description: "Walkthrough of the latest features in our application",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&w=800&q=80",
    source: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    duration: "4:30",
    tags: ["product", "demo", "tutorial"]
  },
  {
    id: "6",
    title: "Interview Podcast",
    description: "Interview with leading industry experts on emerging technologies",
    type: "audio",
    thumbnail: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixlib=rb-4.0.3&w=800&q=80",
    source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: "25:12",
    tags: ["podcast", "interview", "technology"],
    featured: true
  },
  {
    id: "7",
    title: "Abstract Art Collection",
    description: "Modern abstract art pieces from emerging artists",
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&w=800&q=80",
    source: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&w=1200&q=80",
    tags: ["art", "abstract", "modern"]
  },
  {
    id: "8",
    title: "Nature Documentary",
    description: "Exploring the wonders of deep sea creatures",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1551244072-5d12893278ab?ixlib=rb-4.0.3&w=800&q=80",
    source: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    duration: "18:45",
    tags: ["documentary", "nature", "ocean"]
  }
];

const EnhancedMediaShowcase: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <div>
        <h1 className="text-4xl font-bold mb-6">Enhanced Media Gallery</h1>
        <p className="text-muted-foreground text-lg mb-8">
          A powerful, flexible media gallery component with multiple view modes, filtering, and a rich media viewer.
        </p>
        
        <div className="mb-10 p-6 border border-border rounded-lg bg-card/50">
          <h2 className="text-xl font-medium mb-4">Grid View</h2>
          <EnhancedMediaGallery 
            items={mediaItems} 
            title="Media Collection" 
            subtitle="Browse our curated selection of media content"
            viewMode="grid"
          />
        </div>
        
        <div className="mb-10 p-6 border border-border rounded-lg bg-card/50">
          <h2 className="text-xl font-medium mb-4">Carousel View</h2>
          <EnhancedMediaGallery 
            items={mediaItems} 
            title="Featured Media" 
            subtitle="Explore our highlighted content in an immersive carousel"
            viewMode="carousel"
            autoplay={true}
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Implementation</h2>
        <CodeBlock language="tsx">
{`import EnhancedMediaGallery, { MediaItem } from "./EnhancedMediaGallery";

const mediaItems: MediaItem[] = [
  {
    id: "1",
    title: "Mountain Landscapes",
    description: "Beautiful mountain scenery captured during sunrise",
    type: "image",
    thumbnail: "path/to/thumbnail.jpg",
    source: "path/to/fullsize.jpg",
    tags: ["nature", "mountains", "landscape"],
    featured: true
  },
  // More items...
];

// Grid view example
<EnhancedMediaGallery 
  items={mediaItems} 
  title="Media Collection" 
  subtitle="Browse our curated media content"
  viewMode="grid"
/>

// Carousel view example
<EnhancedMediaGallery 
  items={mediaItems} 
  title="Featured Media" 
  subtitle="Explore our highlighted content"
  viewMode="carousel"
  autoplay={true}
/>`}
        </CodeBlock>
      </div>
    </div>
  );
};

export default EnhancedMediaShowcase;
