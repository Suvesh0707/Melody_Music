
import React, { createContext, useContext, useState, useEffect, useRef } from "react";

const AudioPlayerContext = createContext();

export function AudioPlayerProvider({ children }) {
  const [songs, setSongs] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);

  const audioRef = useRef(new Audio());

  const currentSong = currentIndex !== null ? songs[currentIndex] : null;

  function addSongs(newSongs) {
    setSongs((prevSongs) => {
      const allIds = new Set(prevSongs.map((s) => s._id));
      const filteredNewSongs = newSongs.filter((s) => !allIds.has(s._id));
      return [...prevSongs, ...filteredNewSongs];
    });
  }

  function playSong(song) {
    const index = songs.findIndex((s) => s._id === song._id);
    if (index !== -1) {
      setCurrentIndex(index);
      setIsPlaying(true);
    } else {
      addSongs([song]);
      setCurrentIndex(songs.length); 
      setIsPlaying(true);
    }
  }

  function togglePlayPause() {
    if (!currentSong) return;
    setIsPlaying((prev) => !prev);
  }

  function playNext() {
    if (songs.length === 0) return;
    setCurrentIndex((prev) => {
      if (prev === null || prev === songs.length - 1) return 0;
      return prev + 1;
    });
    setIsPlaying(true);
  }

  function playPrevious() {
    if (songs.length === 0) return;
    setCurrentIndex((prev) => {
      if (prev === null || prev === 0) return songs.length - 1;
      return prev - 1;
    });
    setIsPlaying(true);
  }

  useEffect(() => {
    if (!currentSong) {
      audioRef.current.pause();
      audioRef.current.src = "";
      setIsPlaying(false);
      return;
    }

    audioRef.current.src = currentSong.audioUrl;
    audioRef.current.load();

    if (isPlaying) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }

    const handleEnded = () => {
      playNext();
    };

    const handleWaiting = () => setIsBuffering(true);
    const handlePlaying = () => setIsBuffering(false);

    audioRef.current.addEventListener("ended", handleEnded);
    audioRef.current.addEventListener("waiting", handleWaiting);
    audioRef.current.addEventListener("playing", handlePlaying);

    return () => {
      audioRef.current.removeEventListener("ended", handleEnded);
      audioRef.current.removeEventListener("waiting", handleWaiting);
      audioRef.current.removeEventListener("playing", handlePlaying);
    };
  }, [currentSong, isPlaying]);

  return (
    <AudioPlayerContext.Provider
      value={{
        songs,
        addSongs,
        currentSong,
        isPlaying,
        isBuffering,
        playSong,
        togglePlayPause,
        playNext,
        playPrevious,
        audioRef,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  return useContext(AudioPlayerContext);
}
