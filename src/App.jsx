import { useState } from 'react'
import BackgroundScene from './components/overlays/BackgroundScene'
import Experience from './components/Three/Model/Experience'
import LandingPage from './components/overlays/LandingPage.jsx'
import WhySection from './components/Main/Home/WhySection.jsx'
import Credibility from './components/Main/Home/Credibility.jsx'
import Carousel from './components/Main/Home/Carousel.jsx'
import BoldTransition from './components/Main/Home/BoldTransition.jsx'
import { useLenis } from './lib/useLenis.js'
import './App.css'
import HeroSection from './components/Main/Home/HeroSection.jsx'
import WhiteBackground from './components/Main/Home/WhiteBg.jsx/WhiteBackground.jsx'


function App() {
  const [showModel, setShowModel] = useState(false);
  const [landingComplete, setLandingComplete] = useState(false);
  useLenis();
  return (
      <div>
        <LandingPage setShowModel={setShowModel} setLandingComplete={setLandingComplete}/>
        <BackgroundScene/>
       <Experience showModel={showModel}/>
       <HeroSection/>
       <WhySection/>
       <Credibility/>
       <Carousel/>
       {/* Invisible marker — CameraRig ScrollTrigger ends here */}
       <div id="camera-rig-scroll-end" />
       <BoldTransition/>
       <WhiteBackground/>
    
      </div>
  )
} 

export default App
