import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function FloatingParticles() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.2 + 0.4,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 10,
      type: Math.random() > 0.6 ? '✨' : (Math.random() > 0.5 ? '💖' : '🌸')
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, x: `${p.x}vw`, y: '110vh', rotate: 0 }}
          animate={{ 
            opacity: [0, 0.6, 0.6, 0],
            y: '-10vh',
            rotate: 360,
            x: `${p.x + (Math.random() * 20 - 10)}vw`
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute drop-shadow-md"
          style={{ fontSize: `${p.size}rem` }}
        >
          {p.type}
        </motion.div>
      ))}
    </div>
  )
}
