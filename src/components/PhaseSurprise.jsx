import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

// Constants for customization
const PHOTOS = [
  '1.jpeg',
  '2.jpeg',
  '3.jpeg',
  '4.jpeg',
  '5.jpeg',
  '6.jpeg'
]

const MESSAGE = '"Semoga di umur kamu yang ke 23 ini semua yang kamu harapin bisa terkabul yaa. Ayo kita wujudkan gaji 2 digit itu dan rayakan hal lainnya bareng bareng terus! Maaf ya aku masih belum bisa ada di situ buat ngerayain ini"\nI love you! ❤️'

export default function PhaseSurprise() {
  
  useEffect(() => {
    // Big Confetti Burst
    const duration = 1500
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7']
      })
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7']
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    
    // Initial big burst
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      zIndex: 100
    })
    
    frame()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center bg-gray-900/10"
    >
      {/* Background Falling Photos */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Render multiple batches of photos for a continuous effect */}
        {[...Array(4)].map((_, batchIndex) => (
          PHOTOS.map((src, i) => (
            <FallingPhoto key={`${batchIndex}-${i}`} src={src} />
          ))
        ))}
      </div>

      {/* Greeting Overlay */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1, type: 'spring' }}
        className="relative z-50 bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-2xl max-w-md w-[90%] text-center border border-white/50"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-500 mb-6 pb-2">
          Selamat Ulang Tahun Sayang!
        </h1>
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed italic whitespace-pre-line">
          {MESSAGE}
        </p>
      </motion.div>
    </motion.div>
  )
}

function FallingPhoto({ src }) {
  // Randomize initial positions, sizes, and animation parameters for a cinematic look
  const randomStartX = Math.floor(Math.random() * 120) - 10 // Allow starting slightly off-screen
  const randomEndX = randomStartX + (Math.floor(Math.random() * 40) - 20) // Drift left/right
  
  // Make the duration slightly faster so they appear sooner
  const duration = Math.random() * 10 + 10 // 10-20s falling
  
  // drastically reduce delay so the first images appear almost immediately
  const delay = Math.random() * 4 
  
  const startRotation = Math.random() * 60 - 30
  const endRotation = startRotation + (Math.random() * 180 - 90)
  const scale = Math.random() * 0.5 + 0.5 // 0.5 to 1.0 for depth perception
  const blur = scale < 0.7 ? 'blur-[2px]' : '' // Fake depth of field

  return (
    <motion.div
      initial={{ 
        // start much closer to the top of the screen so they are visible right away
        y: '-10vh', 
        x: `${randomStartX}vw`, 
        rotate: startRotation,
        scale: scale,
        opacity: 0
      }}
      animate={{ 
        y: '120vh', 
        x: `${randomEndX}vw`, 
        rotate: endRotation,
        opacity: [0, 0.8, 0.8, 0]
      }}
      transition={{ 
        delay: delay, 
        duration: duration,
        repeat: Infinity,
        ease: 'linear'
      }}
      className={`absolute bg-white p-2 md:p-3 pb-8 md:pb-12 rounded-sm shadow-2xl border border-gray-100 w-24 md:w-32 lg:w-40 ${blur}`}
    >
      <img src={src} alt="Memory" className="w-full h-auto object-cover rounded-sm aspect-square bg-gray-200" />
    </motion.div>
  )
}
