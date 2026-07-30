import { useState } from 'react'
import BackgroundScene from './components/BackgroundScene'
import Experience from './components/Three/Model/Experience'
import LandingPage from './components/LandingPage'
import HeroSection from './components/Main/HeroSection'
import './App.css'

function App() {
  const [showModel, setShowModel] = useState(false);
  return (
      <div>
        <LandingPage setShowModel={setShowModel}/>
      <HeroSection/>
       <BackgroundScene/>
       <Experience showModel={showModel}/>
      </div>
  )
} 

export default App
