import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

export default function PhaseDashboard({ onCandleBlown }) {
  const [candleBlown, setCandleBlown] = useState(false)

  // Gentle confetti loop for only 3 seconds
  useEffect(() => {
    if (candleBlown) return

    const end = Date.now() + 3000 // 3 seconds max
    
    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ffb7b2', '#e2f0cb', '#b5ead7', '#ff9aa2']
      })
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ffb7b2', '#e2f0cb', '#b5ead7', '#ff9aa2']
      })

      if (Date.now() < end && !candleBlown) {
        requestAnimationFrame(frame)
      }
    }
    
    frame()
  }, [candleBlown])

  const handleBlowCandle = () => {
    if (candleBlown) return
    setCandleBlown(true)
    
    // Allow animation to play before transitioning
    setTimeout(() => {
      onCandleBlown()
    }, 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center w-full h-full"
    >
      {/* Beautiful Cake SVG and Candles */}
      <div className="relative mb-12">
        {/* Cake SVG */}
        <svg width="280" height="250" viewBox="0 0 240 200" className="drop-shadow-xl overflow-visible pt-10">
          <defs>
            <pattern id="candleStripe" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="4" height="8" fill="#ffecd6" />
              <rect x="4" width="4" height="8" fill="#e8a99e" />
            </pattern>
            <linearGradient id="flameGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="50%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#fef9c3" />
            </linearGradient>
          </defs>

          {/* Plate */}
          <ellipse cx="120" cy="185" rx="110" ry="15" fill="#cfd1d4" />
          <ellipse cx="120" cy="180" rx="100" ry="12" fill="#e5e6e8" />
          
          {/* Bottom Tier Base */}
          <path d="M 30,180 L 30,120 L 210,120 L 210,180 A 90,12 0 0,1 30,180 Z" fill="#ffe9a6" />
          
          {/* Bottom Tier Icing */}
          <path d="M 30,120 C 30,105 210,105 210,120 L 210,140 
                   Q 192,160 174,140 
                   Q 156,160 138,140 
                   Q 120,160 102,140 
                   Q 84,160 66,140 
                   Q 48,160 30,140 Z" fill="#f27d88" />

          {/* Cherries on Bottom Tier */}
          <circle cx="45" cy="120" r="5" fill="#e63946" />
          <circle cx="43" cy="118" r="1.5" fill="#fff" opacity="0.6" />
          <circle cx="82" cy="125" r="5" fill="#e63946" />
          <circle cx="80" cy="123" r="1.5" fill="#fff" opacity="0.6" />
          <circle cx="120" cy="127" r="5" fill="#e63946" />
          <circle cx="118" cy="125" r="1.5" fill="#fff" opacity="0.6" />
          <circle cx="158" cy="125" r="5" fill="#e63946" />
          <circle cx="156" cy="123" r="1.5" fill="#fff" opacity="0.6" />
          <circle cx="195" cy="120" r="5" fill="#e63946" />
          <circle cx="193" cy="118" r="1.5" fill="#fff" opacity="0.6" />

          {/* Top Tier Base */}
          <path d="M 60,120 L 60,65 L 180,65 L 180,120 A 60,8 0 0,1 60,120 Z" fill="#ffe9a6" />

          {/* Candles (Placed before Top Tier Icing so icing covers their base slightly) */}
          {/* Left Candle */}
          <g transform="translate(95, 72)">
            <rect x="-4" y="-25" width="8" height="25" fill="url(#candleStripe)" rx="1" stroke="#d4998e" strokeWidth="0.5" />
            <g className={candleBlown ? "opacity-0 scale-0 transition-all duration-500" : "animate-flicker"} style={{ transformOrigin: '0px -25px' }}>
              <path d="M 0 -26 Q 4 -32 0 -42 Q -4 -32 0 -26 Z" fill="url(#flameGrad)" />
            </g>
          </g>
          
          {/* Center Candle */}
          <g transform="translate(120, 65)">
            <rect x="-4" y="-30" width="8" height="30" fill="url(#candleStripe)" rx="1" stroke="#d4998e" strokeWidth="0.5" />
            <g className={candleBlown ? "opacity-0 scale-0 transition-all duration-500" : "animate-flicker"} style={{ transformOrigin: '0px -30px' }}>
              <path d="M 0 -31 Q 4 -37 0 -47 Q -4 -37 0 -31 Z" fill="url(#flameGrad)" />
            </g>
          </g>

          {/* Right Candle */}
          <g transform="translate(145, 72)">
            <rect x="-4" y="-25" width="8" height="25" fill="url(#candleStripe)" rx="1" stroke="#d4998e" strokeWidth="0.5" />
            <g className={candleBlown ? "opacity-0 scale-0 transition-all duration-500" : "animate-flicker"} style={{ transformOrigin: '0px -25px' }}>
              <path d="M 0 -26 Q 4 -32 0 -42 Q -4 -32 0 -26 Z" fill="url(#flameGrad)" />
            </g>
          </g>
          
          {/* Top Tier Icing */}
          <path d="M 60,65 C 60,50 180,50 180,65 L 180,85 
                   Q 160,105 140,85 
                   Q 120,105 100,85 
                   Q 80,105 60,85 Z" fill="#f27d88" />
        </svg>
      </div>

      <button
        onClick={handleBlowCandle}
        disabled={candleBlown}
        className={`px-8 py-3 rounded-full font-medium transition-all shadow-md text-lg z-30 ${
          candleBlown 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed scale-95'
            : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white hover:scale-105 active:scale-95 animate-pulse'
        }`}
      >
        Tiup dong lilinnya!
      </button>
    </motion.div>
  )
}
