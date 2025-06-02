
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
    setSongs((prevSongs) => {
      const allIds = new Set(prevSongs.map((s) => s._id));
      if (!allIds.has(song._id)) {
        const updatedSongs = [...prevSongs, song];
        setCurrentIndex(updatedSongs.length - 1); 
        setIsPlaying(true);
        return updatedSongs;
      }
      return prevSongs;
    });
  }
}


  const pauseSong = () => {
  if (audioRef.current) {
    audioRef.current.pause();
    setIsPlaying(false);
  }
};


  function togglePlayPause() {
    if (!currentSong) return;
    setIsPlaying((prev) => !prev);
  }

  function playNext() {
  if (songs.length === 0) return;
  setCurrentIndex((prev) => {
    const nextIndex = prev === null || prev === songs.length - 1 ? 0 : prev + 1;
    return nextIndex;
  });
  setIsPlaying(true);
}

function playPrevious() {
  if (songs.length === 0) return;
  setCurrentIndex((prev) => {
    const prevIndex = prev === null || prev === 0 ? songs.length - 1 : prev - 1;
    return prevIndex;
  });
  setIsPlaying(true);
}
 useEffect(() => {
  if (currentIndex === null || !songs[currentIndex]) return;

  const song = songs[currentIndex];
  audioRef.current.src = song.audioUrl;
  audioRef.current.load();

  if (isPlaying) {
    audioRef.current.play().catch(() => {
      setIsPlaying(false);
    });
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
}, [currentIndex, isPlaying]);

  return (
    <AudioPlayerContext.Provider
      value={{
        songs,
        addSongs,
        currentSong,
        isPlaying,
        isBuffering,
        playSong,
        pauseSong,
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
