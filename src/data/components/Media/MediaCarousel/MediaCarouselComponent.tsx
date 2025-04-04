
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt?: string;
  poster?: string;
  title?: string;
  description?: string;
}

interface MediaCarouselProps {
  items?: MediaItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showControls?: boolean;
  showDots?: boolean;
  animation?: 'fade' | 'slide' | 'zoom' | 'flip';
  height?: string;
  aspectRatio?: string;
  rounded?: string;
  darkMode?: boolean;
  showTitles?: boolean;
  effect?: 'none' | 'parallax' | 'blur' | 'grain';
}

const defaultItems: MediaItem[] = [
  {
    id: '1',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    alt: 'Mountain landscape',
    title: 'Mountain Vista',
    description: 'A beautiful mountain landscape with green valleys'
  },
  {
    id: '2',
    type: 'video',
    src: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
    poster: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256',
    alt: 'Sample video',
    title: 'Sample Video',
    description: 'A short sample video clip'
  },
  {
    id: '3',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    alt: 'Beach at sunset',
    title: 'Sunset Beach',
    description: 'Beautiful beach view during sunset'
  },
  {
    id: '4',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9',
    alt: 'City skyline',
    title: 'City Lights',
    description: 'Stunning view of a modern city skyline at night'
  },
  {
    id: '5',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
    alt: 'Forest landscape',
    title: 'Enchanted Forest',
    description: 'A mystical forest with tall trees and beautiful lighting'
  }
];

const MediaCarousel: React.FC<MediaCarouselProps> = ({
  items = defaultItems,
  autoPlay = true,
  autoPlayInterval = 5000,
  showControls = true,
  showDots = true,
  animation = 'slide',
  height = '500px',
  aspectRatio = '16/9',
  rounded = 'rounded-xl',
  darkMode = true,
  showTitles = true,
  effect = 'none'
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(!autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoPaused, setIsVideoPaused] = useState(!autoPlay);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const dragThreshold = 50; // Minimum drag distance to trigger slide change
  
  const currentItem = items[currentIndex];
  const isVideo = currentItem.type === 'video';
  
  // Configure the refs array for all video elements
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, items.filter(item => item.type === 'video').length);
  }, [items]);
  
  // Handle auto play
  useEffect(() => {
    const startAutoPlay = () => {
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
      
      if (!isPaused) {
        autoPlayRef.current = setTimeout(() => {
          handleNext();
        }, autoPlayInterval);
      }
    };
    
    startAutoPlay();
    
    return () => {
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    };
  }, [currentIndex, isPaused, autoPlayInterval]);
  
  // Handle video playback
  useEffect(() => {
    const videoElements = videoRefs.current;
    
    // Pause all videos first
    videoElements.forEach(video => {
      if (video) {
        video.pause();
      }
    });
    
    // Get the current video if the current slide has one
    const currentVideoIndex = items.filter((item, idx) => item.type === 'video' && idx <= currentIndex).length - 1;
    
    if (isVideo && currentVideoIndex >= 0 && videoElements[currentVideoIndex]) {
      const currentVideo = videoElements[currentVideoIndex];
      if (currentVideo) {
        if (isVideoPaused) {
          currentVideo.pause();
        } else {
          currentVideo.play().catch(e => console.error("Video play error:", e));
        }
        currentVideo.muted = isMuted;
      }
    }
  }, [currentIndex, isVideo, isVideoPaused, isMuted, items]);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === ' ') togglePause();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPaused]);
  
  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % items.length);
  };
  
  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + items.length) % items.length);
  };
  
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };
  
  const togglePause = () => {
    setIsPaused(!isPaused);
    if (isVideo) {
      setIsVideoPaused(!isVideoPaused);
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  // Touch/swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    
    if (Math.abs(diff) > dragThreshold) {
      if (diff > 0) {
        // Swiped left, go next
        handleNext();
      } else {
        // Swiped right, go prev
        handlePrev();
      }
    }
  };
  
  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartX.current = e.clientX;
  };
  
  const handleMouseUp = (e: React.MouseEvent) => {
    const touchEndX = e.clientX;
    const diff = touchStartX.current - touchEndX;
    
    if (Math.abs(diff) > dragThreshold) {
      if (diff > 0) {
        // Dragged left, go next
        handleNext();
      } else {
        // Dragged right, go prev
        handlePrev();
      }
    }
  };
  
  const getAnimationVariants = () => {
    switch (animation) {
      case 'fade':
        return {
          enter: { opacity: 0 },
          center: { opacity: 1 },
          exit: { opacity: 0 }
        };
      case 'zoom':
        return {
          enter: { opacity: 0, scale: 0.8 },
          center: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.2 }
        };
      case 'flip':
        return {
          enter: { opacity: 0, rotateY: -90 },
          center: { opacity: 1, rotateY: 0 },
          exit: { opacity: 0, rotateY: 90 }
        };
      case 'slide':
      default:
        return {
          enter: (direction: number) => ({ 
            x: direction > 0 ? '100%' : '-100%', 
            opacity: 0 
          }),
          center: { x: 0, opacity: 1 },
          exit: (direction: number) => ({ 
            x: direction < 0 ? '100%' : '-100%', 
            opacity: 0 
          })
        };
    }
  };
  
  const variants = getAnimationVariants();
  const direction = useRef(0); // 1 for right, -1 for left
  
  // Update direction when changing slides
  useEffect(() => {
    direction.current = 1;
  }, [currentIndex]);
  
  const getEffectStyles = () => {
    switch (effect) {
      case 'parallax':
        return {
          bg: "before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-black/70",
          content: "translate-y-4 sm:translate-y-6"
        };
      case 'blur':
        return {
          bg: "before:absolute before:inset-0 before:backdrop-blur-sm",
          content: "backdrop-blur-none bg-black/50 p-4 rounded"
        };
      case 'grain':
        return {
          bg: "before:absolute before:inset-0 before:opacity-30 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]",
          content: "bg-black/40 p-4 backdrop-blur-sm rounded"
        };
      case 'none':
      default:
        return {
          bg: "before:absolute before:inset-0 before:bg-gradient-to-t before:from-black/70 before:to-transparent",
          content: ""
        };
    }
  };
  
  const effectStyles = getEffectStyles();
  
  return (
    <div
      className={`relative overflow-hidden ${rounded} ${darkMode ? 'bg-black' : 'bg-white'}`}
      style={{ height, aspectRatio }}
    >
      <div 
        className="w-full h-full relative"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <AnimatePresence initial={false} custom={direction.current}>
          <motion.div
            key={currentIndex}
            custom={direction.current}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity: { duration: 0.5 },
              x: { type: "spring", stiffness: 300, damping: 30 },
              scale: { duration: 0.5 },
              rotateY: { duration: 0.5 }
            }}
            className={`absolute top-0 left-0 w-full h-full overflow-hidden ${rounded}`}
          >
            {currentItem.type === 'image' ? (
              <img
                src={currentItem.src}
                alt={currentItem.alt || `Slide ${currentIndex + 1}`}
                className={`w-full h-full object-cover ${rounded}`}
              />
            ) : (
              <video
                ref={el => {
                  const videoIndex = items.filter((item, idx) => item.type === 'video' && idx <= currentIndex).length - 1;
                  if (videoIndex >= 0) videoRefs.current[videoIndex] = el;
                }}
                src={currentItem.src}
                poster={currentItem.poster}
                muted={isMuted}
                loop
                playsInline
                className={`w-full h-full object-cover ${rounded}`}
              />
            )}
            
            {/* Overlay and Title */}
            {showTitles && currentItem.title && (
              <div className={`absolute bottom-0 left-0 right-0 p-6 ${effectStyles.bg} before:z-0`}>
                <div className={`relative z-10 ${effectStyles.content}`}>
                  <h3 className="text-white text-xl font-semibold">{currentItem.title}</h3>
                  {currentItem.description && (
                    <p className="text-white/80 mt-2">{currentItem.description}</p>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        
        {/* Controls */}
        {showControls && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 h-10 w-10 z-10"
              onClick={handlePrev}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 h-10 w-10 z-10"
              onClick={handleNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            
            <div className="absolute bottom-4 right-4 flex gap-2 z-20">
              <Button
                variant="ghost"
                size="icon"
                className="text-white bg-black/30 hover:bg-black/50 h-9 w-9"
                onClick={togglePause}
              >
                {isPaused ? (
                  <Play className="h-5 w-5" />
                ) : (
                  <Pause className="h-5 w-5" />
                )}
              </Button>
              
              {isVideo && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white bg-black/30 hover:bg-black/50 h-9 w-9"
                  onClick={toggleMute}
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </Button>
              )}
            </div>
          </>
        )}
        
        {/* Dots navigation */}
        {showDots && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20">
            <div className="flex space-x-2">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentIndex 
                      ? 'bg-white scale-110' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  onClick={() => handleDotClick(idx)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaCarousel;
