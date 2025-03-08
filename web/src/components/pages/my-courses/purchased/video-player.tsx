"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  Settings,
} from "lucide-react";
import { VideoProps } from "@/interfaces/videos.interface";
import { ListVideos } from "./list-videos";

const VideoPlayer = ({
  data,
  dataById,
}: {
  data: VideoProps[];
  dataById: VideoProps;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (videoRef.current && dataById.video_url) {
      videoRef.current.load();
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [dataById]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (playerRef.current) {
      if (!document.fullscreenElement) {
        playerRef.current.requestFullscreen().catch((err) => {
          console.error(
            `Error attempting to enable fullscreen: ${err.message}`
          );
        });
      } else {
        document.exitFullscreen();
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = Number.parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const skipTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{dataById.title}</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3 order-1">
          <div
            ref={playerRef}
            className="relative overflow-hidden rounded-xl shadow-2xl bg-black"
            onMouseMove={handleMouseMove}
          >
            <video
              ref={videoRef}
              className="w-full aspect-video"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onClick={togglePlay}
            >
              <source
                src={
                  dataById.video_url ??
                  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                }
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                <button
                  onClick={togglePlay}
                  className="w-20 h-20 flex items-center justify-center rounded-full bg-orange-500 text-white transition-transform hover:scale-110"
                >
                  <Play className="w-10 h-10 fill-white" />
                </button>
              </div>
            )}

            <div
              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 transition-opacity duration-300 ${
                showControls ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="mb-2 flex items-center">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 rounded-full appearance-none bg-gray-600 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500"
                  style={{
                    background: `linear-gradient(to right, #f97316 ${
                      (currentTime / duration) * 100
                    }%, #4b5563 ${(currentTime / duration) * 100}%)`,
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={togglePlay}
                    className="text-white hover:text-orange-500 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6" />
                    )}
                  </button>

                  <button
                    onClick={() => skipTime(-10)}
                    className="text-white hover:text-orange-500 transition-colors"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => skipTime(10)}
                    className="text-white hover:text-orange-500 transition-colors"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={toggleMute}
                      className="text-white hover:text-orange-500 transition-colors"
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-20 h-1 rounded-full appearance-none bg-gray-600 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500"
                      style={{
                        background: `linear-gradient(to right, #f97316 ${
                          (isMuted ? 0 : volume) * 100
                        }%, #4b5563 ${(isMuted ? 0 : volume) * 100}%)`,
                      }}
                    />
                  </div>

                  <div className="text-white text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button className="text-white hover:text-orange-500 transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>

                  <button
                    onClick={toggleFullscreen}
                    className="text-white hover:text-orange-500 transition-colors"
                  >
                    {isFullscreen ? (
                      <Minimize className="w-5 h-5" />
                    ) : (
                      <Maximize className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-orange-50 rounded-xl border border-orange-100">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-orange-800">
                  About this lesson
                </h2>
                <p className="mt-2 text-gray-700">
                  In this video, you'll learn how to implement the Compound
                  Component pattern in React. This pattern allows you to create
                  components with a flexible and intuitive API while maintaining
                  encapsulation of component logic.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xl">
                  4.8
                </div>
                <span className="mt-1 text-sm text-orange-700">Rating</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <div className="px-3 py-1 bg-orange-200 text-orange-800 rounded-full text-sm">
                Advanced
              </div>
              <div className="px-3 py-1 bg-orange-200 text-orange-800 rounded-full text-sm">
                45 minutes
              </div>
              <div className="px-3 py-1 bg-orange-200 text-orange-800 rounded-full text-sm">
                React
              </div>
            </div>
          </div>
        </div>
        <ListVideos data={data} />
      </div>
    </div>
  );
};

export { VideoPlayer };
