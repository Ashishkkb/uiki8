
import React from 'react';
import { ComponentItem } from "@/types/component";
import VideoGalleryComponent from './VideoGalleryComponent';

const demoVideos = [
  {
    id: '1',
    title: 'Ocean Waves',
    description: 'Calming ocean waves on a sunny day',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '2',
    title: 'Mountain View',
    description: 'Beautiful mountain landscapes',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '3',
    title: 'City Lights',
    description: 'Night time city with beautiful lights',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-lights-of-times-square-at-night-in-new-york-city-4823-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '4',
    title: 'Aerial Beach',
    description: 'Beautiful beach view from above',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beach-4014-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
  },
];

const VideoGalleryComponentItem: ComponentItem = {
  id: 201,
  name: "Video Gallery",
  description: "Advanced video gallery with thumbnails and playback controls",
  category: "Media",
  framework: "React",
  language: "TypeScript",
  tags: ["Video", "Media", "Gallery", "Playback", "Interactive"],
  isNew: true,
  component: () => (
    <div className="w-full max-w-4xl mx-auto">
      <VideoGalleryComponent videos={demoVideos} />
    </div>
  ),
  code: `import React, { useState, useRef } from 'react';
import { Play, Pause, Maximize, Skip, Volume2, VolumeX } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface Video {
  id: string;
  title: string;
  description?: string;
  src: string;
  thumbnail: string;
}

interface VideoGalleryProps {
  videos: Video[];
  autoplay?: boolean;
  showControls?: boolean;
  className?: string;
}

const VideoGallery: React.FC<VideoGalleryProps> = ({
  videos = [],
  autoplay = false,
  showControls = true,
  className = '',
}) => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const activeVideo = videos[activeVideoIndex];
  
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };
  
  const handleProgressChange = (value: number[]) => {
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = (value[0] / 100) * videoRef.current.duration;
      setProgress(value[0]);
    }
  };
  
  const handleVolumeChange = (value: number[]) => {
    if (videoRef.current) {
      const volumeValue = value[0] / 100;
      videoRef.current.volume = volumeValue;
      setVolume(value[0]);
      setIsMuted(volumeValue === 0);
    }
  };
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const handleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch(err => {
          console.error(\`Error attempting to enable fullscreen: \${err.message}\`);
        });
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };
  
  const handleVideoEnd = () => {
    if (activeVideoIndex < videos.length - 1) {
      setActiveVideoIndex(activeVideoIndex + 1);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      setProgress(0);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    }
  };
  
  const selectVideo = (index: number) => {
    setActiveVideoIndex(index);
    setProgress(0);
    setIsPlaying(true);
    
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };
  
  return (
    <div className={cn("w-full flex flex-col", className)}>
      <div 
        ref={containerRef} 
        className="relative w-full aspect-video bg-black rounded-lg overflow-hidden"
      >
        <video
          ref={videoRef}
          src={activeVideo.src}
          poster={activeVideo.thumbnail}
          className="w-full h-full object-cover"
          autoPlay={autoplay}
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnd}
          onClick={handlePlayPause}
        />
        
        {showControls && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex flex-col gap-2">
              <Slider 
                value={[progress]} 
                min={0} 
                max={100} 
                step={0.1}
                onValueChange={handleProgressChange}
                className="w-full"
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-white hover:bg-white/20" 
                    onClick={handlePlayPause}
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-white hover:bg-white/20" 
                      onClick={toggleMute}
                    >
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </Button>
                    
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={handleVolumeChange}
                      className="w-24"
                    />
                  </div>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white/20" 
                  onClick={handleFullscreen}
                >
                  <Maximize size={18} />
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <div className="absolute top-0 left-0 p-4">
          <h3 className="text-white text-lg font-medium drop-shadow-md">{activeVideo.title}</h3>
          {activeVideo.description && (
            <p className="text-white/80 text-sm drop-shadow-md">{activeVideo.description}</p>
          )}
        </div>
      </div>
      
      {videos.length > 1 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-4">
          {videos.map((video, index) => (
            <div 
              key={video.id}
              className={cn(
                "relative aspect-video rounded-md overflow-hidden cursor-pointer transition-all", 
                activeVideoIndex === index ? "ring-2 ring-primary" : "hover:opacity-80"
              )}
              onClick={() => selectVideo(index)}
            >
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Play size={24} className="text-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-xs font-medium truncate">{video.title}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoGallery;`
};

export default VideoGalleryComponentItem;
