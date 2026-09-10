import { useState, useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import PhaseIntro from './components/PhaseIntro'
import PhaseEnvelope from './components/PhaseEnvelope'
import PhaseConfirmation from './components/PhaseConfirmation'
import PhaseLoading from './components/PhaseLoading'
import PhaseDashboard from './components/PhaseDashboard'
import PhaseSurprise from './components/PhaseSurprise'
import FloatingParticles from './components/FloatingParticles'

function App() {
  const [phase, setPhase] = useState('intro')
  const jamrudAudioRef = useRef(null)
  const brunoAudioRef = useRef(null)

  useEffect(() => {
    // Setup Audio
    const jamrud = new Audio('jamrud.mp3')
    jamrud.loop = true
    jamrudAudioRef.current = jamrud

    const bruno = new Audio('bruno.mp3')
    bruno.loop = true
    brunoAudioRef.current = bruno

    // Attempt autoplay
    const tryPlay = async () => {
      try {
        await jamrud.play()
      } catch (error) {
        console.log('Autoplay blocked. Menunggu interaksi pertama user...')
        const playOnInteract = () => {
          jamrud.play().catch(e => console.log('Still blocked', e))
          // Remove listener after first successful interaction
          document.removeEventListener('click', playOnInteract)
        }
        document.addEventListener('click', playOnInteract)
      }
    }

    tryPlay()

    return () => {
      jamrud.pause()
      bruno.pause()
    }
  }, [])

  const handleCandleBlown = () => {
    const jamrud = jamrudAudioRef.current
    const bruno = brunoAudioRef.current

    // Transisi Musik: Fade out Jamrud, Fade in Bruno
    if (jamrud) {
      let vol = 1
      const fadeOutInterval = setInterval(() => {
        if (vol > 0.1) {
          vol -= 0.1
          jamrud.volume = vol
        } else {
          clearInterval(fadeOutInterval)
          jamrud.pause()
          jamrud.currentTime = 0
          jamrud.volume = 1 // reset
        }
      }, 100)
    }

    if (bruno) {
      bruno.volume = 0
      bruno.play().catch(e => console.error("Error playing Bruno", e))
      let vol = 0
      const fadeInInterval = setInterval(() => {
        if (vol < 0.9) {
          vol += 0.1
          bruno.volume = vol
        } else {
          clearInterval(fadeInInterval)
          bruno.volume = 1
        }
      }, 100)
    }

    // Pindah ke phase surprise
    setPhase('surprise')
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-pink-300 via-purple-200 to-rose-300 animate-gradient-xy flex items-center justify-center overflow-hidden relative">
      <FloatingParticles />
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <PhaseIntro 
            key="intro" 
            onNext={() => setPhase('envelope')} 
          />
        )}
        {phase === 'envelope' && (
          <PhaseEnvelope 
            key="envelope" 
            onConfirm={() => setPhase('confirm')} 
          />
        )}
        {phase === 'confirm' && (
          <PhaseConfirmation 
            key="confirm" 
            onConfirm={() => setPhase('loading')} 
            onDecline={() => setPhase('envelope')}
          />
        )}
        {phase === 'loading' && (
          <PhaseLoading 
            key="loading" 
            onComplete={() => setPhase('dashboard')} 
          />
        )}
        {phase === 'dashboard' && (
          <PhaseDashboard 
            key="dashboard" 
            onCandleBlown={handleCandleBlown} 
          />
        )}
        {phase === 'surprise' && (
          <PhaseSurprise 
            key="surprise" 
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
