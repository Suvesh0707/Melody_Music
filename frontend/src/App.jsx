import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Hero from './components/Hero';
import Navbar from './components/Navbar';
import NewlyReleaseSong from './components/NewlyReleaseSong';
import PopularArtists from './pages/PopularArtists';
import HindiSongs from './pages/HindiSongs';
import EnglishSongs from './pages/EnglishSongs';
import MarathiSongs from './pages/MarathiSongs';
import JoinOurPlatform from './pages/JoinOurPlatform';
import About from './pages/About';
import Playbar from './components/PlayBar';
import AfterSearch from './pages/AfterSearch';
import Login from './pages/Login'; 
import { AudioPlayerProvider } from './context/AudioPlayerContext';
import { useState } from 'react';
import Admin from './pages/Admin';

function MainPage({ isLoggedIn }) {
  return (
    <div style={{ maxHeight: '100vh', overflowY: 'auto', color: 'white', padding: '1rem' }}>
      <Navbar isLoggedIn={isLoggedIn} />
      <div id="app-content">
        <Hero />
        <NewlyReleaseSong isLoggedIn={isLoggedIn} />
        <PopularArtists />
        <HindiSongs />
        <MarathiSongs />
        <EnglishSongs />
        <JoinOurPlatform />
        <About />
        <Playbar />
      </div>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AudioPlayerProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/aftersearch" element={<AfterSearch />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </AudioPlayerProvider>
  );
}

export default App;
