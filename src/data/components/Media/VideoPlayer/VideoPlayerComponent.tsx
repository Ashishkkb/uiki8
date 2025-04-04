
import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Volume1, 
  SkipForward, 
  SkipBack, 
  Maximize, 
  Minimize,
  Settings,
  Video,
  X,
  Edit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface Annotation {
  id: string;
  time: number;
  position: { x: number; y: number };
  content: string;
  duration?: number;
}

interface VideoPlayerProps {
  src?: string;
  poster?: string;
  title?: string;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  width?: string;
  height?: string;
  className?: string;
  annotations?: Annotation[];
  showAnnotations?: boolean;
  allowAnnotationEditing?: boolean;
  markers?: { time: number; label: string }[];
  theme?: 'dark' | 'light' | 'minimal' | 'gradient';
  hiddenControls?: Array<'play' | 'volume' | 'seekbar' | 'time' | 'fullscreen' | 'settings'>;
}

const defaultAnnotations: Annotation[] = [
  { 
    id: '1', 
    time: 5, 
    position: { x: 20, y: 20 }, 
    content: 'Important detail here!',
    duration: 3
  },
  { 
    id: '2', 
    time: 10, 
    position: { x: 50, y: 60 }, 
    content: 'Notice this part of the video',
    duration: 4
  }
];

const defaultMarkers = [
  { time: 5, label: 'Introduction' },
  { time: 20, label: 'Key point' },
  { time: 35, label: 'Summary' }
];

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src = 'https://samplelib.com/lib/preview/mp4/sample-30s.mp4',
  poster = 'https://images.unsplash.com/photo-1535016120720-40c646be5580',
  title = 'Advanced Video Player',
  controls = true,
  autoPlay = false,
  loop = false,
  muted = false,
  width = '100%',
  height = 'auto',
  className = '',
  annotations = defaultAnnotations,
  showAnnotations = true,
  allowAnnotationEditing = true,
  markers = defaultMarkers,
  theme = 'dark',
  hiddenControls = []
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(muted ? 0 : 0.7);
  const [isMuted, setIsMuted] = useState(muted);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(false);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isAddingAnnotation, setIsAddingAnnotation] = useState(false);
  const [newAnnotationPosition, setNewAnnotationPosition] = useState({ x: 0, y: 0 });
  const [newAnnotationText, setNewAnnotationText] = useState('');
  const [activeAnnotations, setActiveAnnotations] = useState<Annotation[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [showBigPlayButton, setShowBigPlayButton] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Initialize video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    // Set initial states
    video.volume = volume;
    video.muted = isMuted;
    video.playbackRate = playbackRate;
    video.loop = loop;
    
    // Event handlers
    const onLoadedMetadata = () => {
      setDuration(video.duration);
    };
    
    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      checkForActiveAnnotations();
    };
    
    const onEnded = () => {
      setIsPlaying(false);
      setShowBigPlayButton(true);
    };
    
    const onPlay = () => {
      setIsPlaying(true);
      setShowBigPlayButton(false);
    };
    
    const onPause = () => {
      setIsPlaying(false);
    };
    
    // Add event listeners
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    
    // If autoplay is enabled, try to play
    if (autoPlay) {
      video.play().catch(e => {
        console.error('Autoplay failed:', e);
        setShowBigPlayButton(true);
      });
    }
    
    // Cleanup
    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onEnded);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, [autoPlay, loop, volume, isMuted, playbackRate]);
  
  // Check for active annotations based on current time
  const checkForActiveAnnotations = () => {
    if (!showAnnotations) return;
    
    const currentActiveAnnotations = annotations.filter(
      (ann) => currentTime >= ann.time && currentTime <= (ann.time + (ann.duration || 3))
    );
    
    setActiveAnnotations(currentActiveAnnotations);
  };
  
  // Handle play/pause toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(e => console.error('Play failed:', e));
    }
  };
  
  // Handle seek
  const handleSeek = (value: number[]) => {
    if (!videoRef.current) return;
    const newTime = value[0];
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    if (!videoRef.current) return;
    const newVolume = value[0];
    
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    
    if (newVolume === 0) {
      videoRef.current.muted = true;
      setIsMuted(true);
    } else if (isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
    }
  };
  
  // Toggle mute
  const toggleMute = () => {
    if (!videoRef.current) return;
    
    const newMutedState = !isMuted;
    videoRef.current.muted = newMutedState;
    setIsMuted(newMutedState);
  };
  
  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(err => {
        console.error(`Error attempting to exit fullscreen: ${err.message}`);
      });
    }
  };
  
  // Format time for display (mm:ss)
  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Skip forward/backward
  const skip = (seconds: number) => {
    if (!videoRef.current) return;
    
    const newTime = Math.min(Math.max(0, currentTime + seconds), duration);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  // Jump to specific marker
  const jumpToMarker = (time: number) => {
    if (!videoRef.current) return;
    
    videoRef.current.currentTime = time;
    setCurrentTime(time);
    
    if (!isPlaying) {
      togglePlay();
    }
  };
  
  // Handle change playback rate
  const changePlaybackRate = (rate: number) => {
    if (!videoRef.current) return;
    
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
  };
  
  // Show/hide controls based on mouse movement
  const handleMouseMove = () => {
    setIsControlsVisible(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setIsControlsVisible(false);
      }
    }, 3000);
  };
  
  // Handle click on video to add annotation
  const handleVideoClick = (e: React.MouseEvent) => {
    if (isAddingAnnotation && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setNewAnnotationPosition({ x, y });
      setNewAnnotationText('');
      setIsAddingAnnotation(false);
      
      // Add annotation logic here
      console.log('Added annotation at', { x, y, time: currentTime });
    } else if (!isControlsVisible) {
      setIsControlsVisible(true);
    } else {
      togglePlay();
    }
  };
  
  // Get the theme styles
  const getThemeStyles = () => {
    switch (theme) {
      case 'light':
        return {
          container: 'bg-white',
          controls: 'bg-white/90 text-gray-900',
          seekbar: 'bg-gray-200',
          progress: 'bg-blue-500',
          button: 'hover:bg-gray-200 text-gray-700'
        };
      case 'minimal':
        return {
          container: 'bg-transparent',
          controls: 'bg-transparent text-white',
          seekbar: 'bg-white/20',
          progress: 'bg-white/80',
          button: 'hover:bg-white/20 text-white'
        };
      case 'gradient':
        return {
          container: 'bg-gradient-to-br from-purple-900 to-blue-900',
          controls: 'bg-gradient-to-r from-purple-800/90 to-blue-800/90 text-white',
          seekbar: 'bg-white/20',
          progress: 'bg-gradient-to-r from-purple-500 to-blue-500',
          button: 'hover:bg-white/20 text-white'
        };
      case 'dark':
      default:
        return {
          container: 'bg-black',
          controls: 'bg-black/90 text-white',
          seekbar: 'bg-gray-700',
          progress: 'bg-primary',
          button: 'hover:bg-gray-800 text-white'
        };
    }
  };
  
  const themeStyles = getThemeStyles();
  
  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden group',
        themeStyles.container,
        className
      )}
      style={{ width, height }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setIsControlsVisible(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-contain cursor-pointer"
        onClick={handleVideoClick}
        playsInline
      />
      
      {/* Big Play Button (when video is not playing) */}
      {showBigPlayButton && (
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
          onClick={togglePlay}
        >
          <div className="bg-black/50 p-8 rounded-full">
            <Play className="h-12 w-12 text-white" />
          </div>
        </div>
      )}
      
      {/* Active Annotations */}
      {showAnnotations && activeAnnotations.map((ann) => (
        <motion.div
          key={ann.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute z-20 max-w-xs bg-black/80 text-white p-3 rounded-md shadow-lg pointer-events-none"
          style={{ 
            left: `${ann.position.x}%`, 
            top: `${ann.position.y}%`,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className="text-sm">{ann.content}</div>
          <div className="absolute bottom-0 left-1/2 transform translate-y-full -translate-x-1/2 border-8 border-transparent border-t-black/80" />
        </motion.div>
      ))}
      
      {/* Video Controls */}
      <AnimatePresence>
        {(isControlsVisible || !isPlaying) && controls && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'absolute bottom-0 left-0 right-0 p-3 flex flex-col gap-2 z-30',
              themeStyles.controls
            )}
          >
            {/* Title Bar */}
            <div className="flex items-center justify-between mb-auto">
              {title && <h3 className="text-sm font-medium">{title}</h3>}
              
              {/* Add Annotation Button */}
              {allowAnnotationEditing && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={themeStyles.button}
                  onClick={() => setIsAddingAnnotation(!isAddingAnnotation)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  {isAddingAnnotation ? 'Cancel' : 'Add Annotation'}
                </Button>
              )}
            </div>
            
            {/* Progress Bar */}
            {!hiddenControls.includes('seekbar') && (
              <div className="w-full relative">
                {/* Marker indicators */}
                <div className="absolute inset-0 flex items-center">
                  {markers.map((marker, idx) => (
                    <div 
                      key={idx}
                      className="absolute w-1 h-3 bg-yellow-500 cursor-pointer hover:h-4 transition-all"
                      style={{ left: `${(marker.time / duration) * 100}%` }}
                      onClick={() => jumpToMarker(marker.time)}
                      title={marker.label}
                    />
                  ))}
                </div>
                
                <Slider
                  value={[currentTime]}
                  max={duration || 100}
                  step={0.1}
                  onValueChange={handleSeek}
                  className={cn('h-1.5', themeStyles.seekbar)}
                />
                
                {/* Buffer indicator */}
                <div 
                  className="absolute top-0 left-0 h-1.5 bg-white/30 pointer-events-none" 
                  style={{ 
                    width: `${videoRef.current?.buffered.length ? 
                      (videoRef.current.buffered.end(videoRef.current.buffered.length - 1) / duration) * 100 : 0}%` 
                  }}
                />
                
                {/* Hover preview tooltip */}
                <div className="absolute -top-8 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs hidden hover:block">
                  00:15
                </div>
              </div>
            )}
            
            {/* Control Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Play/Pause Button */}
                {!hiddenControls.includes('play') && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className={themeStyles.button}
                    onClick={togglePlay}
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </Button>
                )}
                
                {/* Skip Backward/Forward */}
                {!hiddenControls.includes('play') && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={themeStyles.button}
                      onClick={() => skip(-10)}
                    >
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className={themeStyles.button}
                      onClick={() => skip(10)}
                    >
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  </>
                )}
                
                {/* Volume Control */}
                {!hiddenControls.includes('volume') && (
                  <div className="relative flex items-center"
                    onMouseEnter={() => setShowVolumeControl(true)}
                    onMouseLeave={() => setShowVolumeControl(false)}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className={themeStyles.button}
                      onClick={toggleMute}
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="h-5 w-5" />
                      ) : volume < 0.5 ? (
                        <Volume1 className="h-5 w-5" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
                      )}
                    </Button>
                    
                    <AnimatePresence>
                      {showVolumeControl && (
                        <motion.div
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: 80, opacity: 1 }}
                          exit={{ width: 0, opacity: 0 }}
                          className="overflow-hidden ml-1"
                        >
                          <Slider
                            value={[isMuted ? 0 : volume]}
                            max={1}
                            step={0.01}
                            onValueChange={handleVolumeChange}
                            className="w-20"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
                
                {/* Time Display */}
                {!hiddenControls.includes('time') && (
                  <div className="text-xs ml-2">
                    <span>{formatTime(currentTime)}</span>
                    <span className="mx-1">/</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {/* Settings Menu */}
                {!hiddenControls.includes('settings') && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={themeStyles.button}
                      >
                        <Settings className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={() => changePlaybackRate(0.5)}>
                        {playbackRate === 0.5 && "✓ "}0.5x Speed
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => changePlaybackRate(1)}>
                        {playbackRate === 1 && "✓ "}Normal Speed
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => changePlaybackRate(1.5)}>
                        {playbackRate === 1.5 && "✓ "}1.5x Speed
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => changePlaybackRate(2)}>
                        {playbackRate === 2 && "✓ "}2x Speed
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
                
                {/* Fullscreen Button */}
                {!hiddenControls.includes('fullscreen') && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className={themeStyles.button}
                    onClick={toggleFullscreen}
                  >
                    {isFullscreen ? (
                      <Minimize className="h-5 w-5" />
                    ) : (
                      <Maximize className="h-5 w-5" />
                    )}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoPlayer;
