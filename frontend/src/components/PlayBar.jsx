import React, { useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaEllipsisH,
  FaVolumeUp,
} from "react-icons/fa";
import { useAudioPlayer } from "../context/AudioPlayerContext";

function Playbar() {
  const {
    currentSong,
    isPlaying,
    togglePlayPause,
    playNext,
    playPrevious,
    audioRef, 
  } = useAudioPlayer();

  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

  const updateProgress = () => {
    if (audio.duration) {
      setProgress((audio.currentTime / audio.duration) * 100);
    }
  };

    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, [audioRef, currentSong]);

  const handleSeekChange = (e) => {
    const audio = audioRef.current;
    const seekToPercent = Number(e.target.value);
    if (audio && audio.duration) {
      audio.currentTime = (seekToPercent / 100) * audio.duration;
      setProgress(seekToPercent);
    }
  };

  const handleVolumeChange = (e) => {
    const audio = audioRef.current;
    const vol = Number(e.target.value);
    setVolume(vol);
    if (audio) audio.volume = vol / 100;
  };

  const totalDuration = currentSong?.duration || 0;
  const currentTime = totalDuration ? (progress / 100) * totalDuration : 0;

  const formatTime = (sec) =>
    `${Math.floor(sec / 60)}:${Math.floor(sec % 60).toString().padStart(2, "0")}`;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#1a1a1a] text-white px-4 md:px-8 pt-3 pb-3 z-50 shadow-inner flex flex-col">
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleSeekChange}
        className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer mb-3"
        style={{
          background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${progress}%, #374151 ${progress}%, #374151 100%)`,
        }}
        aria-label="Seekbar"
      />
      <div className="grid grid-cols-[minmax(200px,300px)_auto_minmax(200px,300px)] items-center w-full">
        <div className="flex items-center gap-3 truncate">
          <img
            src={currentSong?.coverImageUrl || "https://via.placeholder.com/50"}
            alt={currentSong?.title || "No song"}
            className="w-12 h-12 rounded object-cover"
          />
          <div className="flex flex-col truncate">
            <p className="font-semibold text-sm truncate">
              {currentSong?.title || "No song selected"}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {currentSong?.artistName || ""}
            </p>
          </div>
        </div>

        <div className="flex justify-center space-x-8 text-2xl">
          <FaStepBackward
            className="cursor-pointer hover:text-pink-500"
            onClick={playPrevious}
          />
          {isPlaying ? (
            <FaPause
              className="cursor-pointer hover:text-pink-500"
              onClick={togglePlayPause}
            />
          ) : (
            <FaPlay
              className="cursor-pointer hover:text-pink-500"
              onClick={togglePlayPause}
            />
          )}
          <FaStepForward
            className="cursor-pointer hover:text-pink-500"
            onClick={playNext}
          />
        </div>

        <div className="flex items-center space-x-4 justify-end text-xs text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <FaEllipsisH className="cursor-pointer hover:text-pink-500" />
          <div className="flex items-center space-x-2">
            <FaVolumeUp />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 cursor-pointer"
              aria-label="Volume"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Playbar;
