
import React from 'react';
import { ComponentItem } from "@/types/component";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const VideoPlayerDemo = () => {
  return (
    <div className="w-full max-w-xl mx-auto rounded-lg overflow-hidden border bg-card">
      <div className="relative aspect-video bg-muted">
        <div className="absolute inset-0 flex items-center justify-center">
          <Play className="w-12 h-12 text-white opacity-80" />
        </div>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Play className="h-4 w-4" />
            </Button>
            <span className="text-sm">00:12 / 03:45</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Volume2 className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Slider defaultValue={[33]} max={100} step={1} />
      </div>
    </div>
  );
};

const VideoPlayerComponentData: ComponentItem = {
  id: 410,
  name: "Video Player",
  category: "Media",
  framework: "React",
  description: "A custom video player with controls and timeline",
  code: `import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  controls?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  className,
  autoPlay = false,
  muted = false,
  controls = true,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(muted ? 0 : 1);
  const [isMuted, setIsMuted] = useState(muted);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (playing) {
      video.pause();
    } else {
      video.play();
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
    setVolume(video.muted ? 0 : volume || 1);
  };

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = value[0] / 100;
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleProgressChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = (value[0] / 100) * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(value[0]);
  };

  const toggleFullscreen = () => {
    const videoContainer = videoRef.current?.parentElement;
    if (!videoContainer) return;

    if (!document.fullscreenElement) {
      videoContainer.requestFullscreen().catch((err) => {
        console.error("Could not enable fullscreen mode:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return \`\${minutes.toString().padStart(2, "0")}:\${remainingSeconds.toString().padStart(2, "0")}\`;
  };

  return (
    <div className={cn("w-full overflow-hidden rounded-lg border bg-card", className)}>
      <div className="relative aspect-video bg-muted">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay={autoPlay}
          muted={muted}
          playsInline
          onClick={togglePlay}
        />
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="w-16 h-16 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/60 transition"
            >
              <Play className="w-8 h-8 text-white" />
            </button>
          </div>
        )}
      </div>
      {controls && (
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={togglePlay}>
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <span className="text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={toggleMute}>
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <div className="w-20 hidden sm:block">
                <Slider
                  value={[isMuted ? 0 : volume * 100]}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                />
              </div>
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={toggleFullscreen}>
                {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <Slider
            value={[progress]}
            max={100}
            step={0.1}
            onValueChange={handleProgressChange}
          />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;`,
  component: VideoPlayerDemo,
  tags: ["media", "video", "player", "controls"],
  fileSize: "5.3 KB",
  price: "Free",
  complexity: "complex",
  lastUpdated: "2023-12-14"
};

export default VideoPlayerComponentData;
