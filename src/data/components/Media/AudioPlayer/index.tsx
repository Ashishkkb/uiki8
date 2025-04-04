
import React from 'react';
import { ComponentItem } from "@/types/component";
import AudioPlayer from './AudioPlayerComponent';

const AudioPlayerComponentItem: ComponentItem = {
  id: 107,
  name: "Audio Player with Visualizer",
  description: "Feature-rich audio player with waveform visualization and playback controls",
  category: "Media",
  framework: "React",
  language: "TypeScript",
  tags: ["Audio", "Player", "Visualizer", "Controls", "Music"],
  isNew: true,
  component: () => <AudioPlayer />,
  code: `import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

interface AudioPlayerProps {
  src?: string;
  title?: string;
  artist?: string;
  cover?: string;
  showVisualizer?: boolean;
  visualizerColor?: string;
  visualizerType?: 'bars' | 'circle' | 'wave';
  theme?: 'dark' | 'light' | 'gradient';
  autoPlay?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src = 'https://demo.twilio.com/docs/classic.mp3',
  title = 'Audio Track',
  artist = 'Artist Name',
  cover = 'https://placehold.co/400x400/6d28d9/ffffff?text=♪',
  showVisualizer = true,
  visualizerColor = '#7c3aed',
  visualizerType = 'bars',
  theme = 'dark',
  autoPlay = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [visualizerData, setVisualizerData] = useState<number[]>(Array(30).fill(0));
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const animationRef = useRef<number>();
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    // Set audio properties
    audio.volume = volume;
    audio.muted = isMuted;
    
    // Initialize audio context and analyzer for visualizer
    if (showVisualizer && !audioContextRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaElementSource(audio);
      
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      
      analyser.fftSize = 64;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;
      audioContextRef.current = audioContext;
    }
    
    // Get audio duration
    const setAudioData = () => {
      if (audio) {
        setDuration(audio.duration);
      }
    };
    
    // Event listeners
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
    
    // Set event listeners
    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    
    // Cleanup
    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (audioContextRef.current) {
        // audioContextRef.current.close();
      }
    };
  }, [volume, isMuted, showVisualizer]);
  
  useEffect(() => {
    // Auto-play if enabled
    if (autoPlay) {
      togglePlay();
    }
  }, [autoPlay]);
  
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    } else {
      audio.play();
      if (showVisualizer) {
        updateVisualizer();
      }
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const updateVisualizer = () => {
    if (!analyserRef.current || !dataArrayRef.current) return;
    
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    const data = [...dataArrayRef.current].slice(0, 30).map(value => value / 255);
    setVisualizerData(data);
    
    animationRef.current = requestAnimationFrame(updateVisualizer);
  };
  
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };
  
  const onProgressChange = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };
  
  const skip = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        Math.max(audioRef.current.currentTime + seconds, 0),
        duration
      );
    }
  };
  
  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return \`\${minutes.toString().padStart(2, '0')}:\${seconds.toString().padStart(2, '0')}\`;
  };
  
  // Theme-based styles
  const getThemeStyles = () => {
    switch (theme) {
      case 'light':
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-900',
          secondary: 'text-gray-600',
          accent: 'bg-indigo-600',
          button: 'bg-indigo-600 hover:bg-indigo-700 text-white',
        };
      case 'gradient':
        return {
          bg: 'bg-gradient-to-br from-purple-600 to-blue-500',
          text: 'text-white',
          secondary: 'text-gray-200',
          accent: 'bg-pink-500',
          button: 'bg-pink-500 hover:bg-pink-600 text-white',
        };
      case 'dark':
      default:
        return {
          bg: 'bg-gray-900',
          text: 'text-white',
          secondary: 'text-gray-400',
          accent: 'bg-violet-600',
          button: 'bg-violet-600 hover:bg-violet-700 text-white',
        };
    }
  };
  
  const styles = getThemeStyles();
  
  return (
    <div className={\`w-full rounded-xl overflow-hidden shadow-lg \${styles.bg} p-6\`}>
      <audio ref={audioRef} src={src} />
      
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Cover Art */}
        <div className="relative w-40 h-40 flex-shrink-0 rounded-lg overflow-hidden shadow-lg">
          <img 
            src={cover} 
            alt={\`\${title} by \${artist}\`} 
            className="w-full h-full object-cover"
          />
          {isPlaying && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            </div>
          )}
        </div>
        
        {/* Player Controls */}
        <div className="flex-1 w-full">
          <div className="mb-4">
            <h3 className={\`text-xl font-bold \${styles.text}\`}>{title}</h3>
            <p className={\`\${styles.secondary}\`}>{artist}</p>
          </div>
          
          {/* Visualizer */}
          {showVisualizer && (
            <div className="h-16 mb-4 flex items-end justify-center gap-1">
              {visualizerType === 'bars' && visualizerData.map((level, index) => (
                <motion.div
                  key={index}
                  className="w-2 rounded-t"
                  style={{ backgroundColor: visualizerColor }}
                  animate={{ height: \`\${Math.max(4, level * 64)}px\` }}
                  transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                />
              ))}
              
              {visualizerType === 'circle' && (
                <div className="relative w-16 h-16">
                  {visualizerData.map((level, index) => {
                    const angle = (index / visualizerData.length) * Math.PI * 2;
                    const x = Math.cos(angle) * (30 + level * 20);
                    const y = Math.sin(angle) * (30 + level * 20);
                    
                    return (
                      <motion.div
                        key={index}
                        className="absolute w-1.5 h-1.5 rounded-full"
                        style={{ 
                          backgroundColor: visualizerColor,
                          left: '50%',
                          top: '50%',
                          x, 
                          y 
                        }}
                      />
                    );
                  })}
                </div>
              )}
              
              {visualizerType === 'wave' && (
                <svg 
                  width="100%" 
                  height="64" 
                  viewBox="0 0 100 30"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d={\`M 0 15 \${visualizerData.map((level, i) => {
                      const x = (i / (visualizerData.length - 1)) * 100;
                      const y = 15 - (level * 15);
                      return \`L \${x} \${y}\`;
                    }).join(' ')} L 100 15 Z\`}
                    fill={visualizerColor}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                  />
                </svg>
              )}
            </div>
          )}
          
          {/* Progress Bar */}
          <div className="mb-4">
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={0.1}
              onValueChange={onProgressChange}
              className="mb-2"
            />
            <div className="flex justify-between text-sm">
              <span className={styles.secondary}>{formatTime(currentTime)}</span>
              <span className={styles.secondary}>{formatTime(duration)}</span>
            </div>
          </div>
          
          {/* Playback Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => skip(-10)}
                className={\`\${styles.text}\`}
              >
                <SkipBack className="h-5 w-5" />
              </Button>
              
              <Button
                variant="secondary"
                size="icon"
                onClick={togglePlay}
                className="h-12 w-12 rounded-full shadow-md flex items-center justify-center bg-white text-gray-900 hover:bg-gray-100"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6 ml-0.5" />
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => skip(10)}
                className={\`\${styles.text}\`}
              >
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Volume Control */}
            <div className="flex items-center gap-2 w-1/3">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className={\`\${styles.text}\`}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>
              
              <Slider
                value={[isMuted ? 0 : volume]}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;`
};

export default AudioPlayerComponentItem;
