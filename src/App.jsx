import { useState, memo } from 'react'
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

// Memoize children that don't depend on showModel/landingComplete
// so App's state updates don't cascade into re-rendering them.
const MemoBackgroundScene = memo(BackgroundScene);
const MemoHeroSection = memo(HeroSection);
const MemoWhySection = memo(WhySection);
const MemoCredibility = memo(Credibility);
const MemoCarousel = memo(Carousel);
const MemoBoldTransition = memo(BoldTransition);
const MemoWhiteBackground = memo(WhiteBackground);
const MemoLandingPage = memo(LandingPage);

function App() {
  const [showModel, setShowModel] = useState(false);
  const [landingComplete, setLandingComplete] = useState(false);
  useLenis();
  return (
      <div>
        <MemoLandingPage setShowModel={setShowModel} setLandingComplete={setLandingComplete}/>
        <MemoBackgroundScene/>
       <Experience showModel={showModel}/>
       <MemoHeroSection/>
       <MemoWhySection/>
       <MemoCredibility/>
       <MemoCarousel/>
       {/* Invisible marker — CameraRig ScrollTrigger ends here */}
       <div id="camera-rig-scroll-end" />
       <MemoBoldTransition/>
       <MemoWhiteBackground/>
    
      </div>
  )
} 

export default App