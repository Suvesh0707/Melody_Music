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
import Admin from './pages/Admin';

import { AudioPlayerProvider } from './context/AudioPlayerContext';
import { UserProvider } from './context/UserContext';  // Import your UserProvider

function MainPage() {
  return (
    <div style={{ maxHeight: '100vh', overflowY: 'auto', color: 'white', padding: '1rem' }}>
      <Navbar />
      <div id="app-content">
        <Hero />
        <NewlyReleaseSong />
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
  return (
    <UserProvider>
      <AudioPlayerProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/aftersearch" element={<AfterSearch />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
      </AudioPlayerProvider>
    </UserProvider>
  );
}

export default App;
