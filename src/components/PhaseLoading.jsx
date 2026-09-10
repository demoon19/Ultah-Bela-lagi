import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function PhaseLoading({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 bg-gradient-to-br from-pink-300 to-purple-300 flex flex-col items-center justify-center z-50"
    >
      <div className="text-8xl mb-8 animate-heartbeat filter drop-shadow-lg">
        💖
      </div>
      
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-2xl md:text-3xl font-medium text-white text-center px-6 drop-shadow-md"
      >
        Baiklah kalau anda memang pacar dwg...
      </motion.h2>
    </motion.div>
  )
}
