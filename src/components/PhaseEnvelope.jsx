import { useState } from 'react'
import { motion } from 'framer-motion'

export default function PhaseEnvelope({ onConfirm }) {
  const [isShaking, setIsShaking] = useState(false)
  const [shakeKey, setShakeKey] = useState(0)

  const handleDecline = () => {
    setIsShaking(true)
    setShakeKey(prev => prev + 1)
    setTimeout(() => setIsShaking(false), 500) // Reset shake after animation
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center z-10 w-full max-w-md px-4"
    >
      <div className="relative mb-12 flex justify-center items-center h-48 w-full mt-4">
        {/* Gift Box Container */}
        <motion.div 
          key={shakeKey}
          animate={isShaking ? { x: [-10, 10, -10, 10, -5, 5, 0] } : { y: [0, -10, 0] }}
          transition={isShaking ? { duration: 0.5 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-40 h-40 group cursor-pointer"
        >
          {/* Box Shadow */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-black/20 rounded-full blur-md"></div>
          
          {/* Main Box */}
          <div className="absolute bottom-0 w-40 h-32 bg-gradient-to-br from-rose-400 to-pink-600 rounded-xl shadow-lg border border-pink-500 overflow-hidden">
            {/* Ribbons */}
            <div className="absolute left-1/2 -translate-x-1/2 w-8 h-full bg-gradient-to-b from-amber-300 to-yellow-500 shadow-sm"></div>
            <div className="absolute top-1/2 -translate-y-1/2 w-full h-8 bg-gradient-to-r from-amber-300 to-yellow-500 shadow-sm"></div>
          </div>
          
          {/* Lid */}
          <div className="absolute -top-2 -left-2 w-44 h-12 bg-gradient-to-br from-rose-300 to-pink-500 rounded-lg shadow-md border border-pink-400 z-10 transition-transform group-hover:-translate-y-2 group-hover:rotate-2">
            <div className="absolute left-1/2 -translate-x-1/2 w-9 h-full bg-gradient-to-b from-amber-300 to-yellow-500"></div>
            
            {/* Bow */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-full flex justify-center z-20">
              <div className="w-12 h-12 border-8 border-yellow-400 rounded-full absolute -left-4 top-2 rotate-12 skew-x-12 shadow-sm"></div>
              <div className="w-12 h-12 border-8 border-yellow-400 rounded-full absolute -right-4 top-2 -rotate-12 -skew-x-12 shadow-sm"></div>
              <div className="w-8 h-8 bg-amber-500 rounded-full absolute top-6 z-30 shadow-md"></div>
            </div>
          </div>
          
          {/* Tag */}
          <motion.div 
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-12 -right-12 w-16 h-20 bg-amber-50 border-2 border-amber-200 rounded-md shadow-md z-0 flex items-center justify-center origin-top-left rotate-12"
          >
            <div className="absolute -top-2 left-2 w-2 h-2 bg-gray-800 rounded-full"></div>
            <span className="text-xl font-bold text-rose-500">For you!</span>
          </motion.div>
        </motion.div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/50 w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 drop-shadow-sm">
          Ada kado spesial, apakah benar ini orangnya?
        </h1>

        <div className="flex gap-4 justify-center">
          <button 
            onClick={onConfirm}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2"
          >
            <span>🎁</span> Iya, Buka!
          </button>
          <button 
            onClick={handleDecline}
            className="px-8 py-3 bg-white hover:bg-gray-50 text-gray-700 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-md border border-gray-200"
          >
            Bukan
          </button>
        </div>
      </div>
    </motion.div>
  )
}
