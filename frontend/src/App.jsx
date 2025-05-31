import React from 'react'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import NewlyReleaseSong from './components/NewlyReleaseSong'
import PopularArtists from './pages/PopularArtists'
import HindiSongs from './pages/HindiSongs'
import EnglishSongs from './pages/EnglishSongs'
import MarathiSongs from './pages/MarathiSongs'
import JoinOurPlatform from './pages/JoinOurPlatform'
import About from './pages/About'
import Playbar from './components/PlayBar'
import { AudioPlayerProvider } from './context/AudioPlayerContext'

function App() {

  return (
    <div>
      <AudioPlayerProvider>
      <Navbar/>
      <Hero />
      <NewlyReleaseSong/>
      <PopularArtists/>
      <HindiSongs/>
      <MarathiSongs/>
      <EnglishSongs/>
      <JoinOurPlatform/>
      <About/>
      <Playbar/>
      </AudioPlayerProvider>
    </div>
  )
}

export default App