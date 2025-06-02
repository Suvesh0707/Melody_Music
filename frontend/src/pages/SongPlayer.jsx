import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SongPlayer({ isLoggedIn, currentSong }) {
  const [playedCount, setPlayedCount] = useState(() => {
    const saved = localStorage.getItem('playedSongs');
    return saved ? parseInt(saved, 10) : 0;
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentSong) return;

    if (isLoggedIn) {
      return;
    }

    if (playedCount >= 10) {
      alert('You have reached the free limit of 10 songs. Please log in to continue listening.');
      navigate('/login');
      return;
    }

    setPlayedCount((count) => {
      const newCount = count + 1;
      localStorage.setItem('playedSongs', newCount);
      return newCount;
    });
  }, [currentSong, isLoggedIn, playedCount, navigate]);

  return (
    <div>
      <p>Now playing: {currentSong?.title || 'Select a song'}</p>
    </div>
  );
}

export default SongPlayer;