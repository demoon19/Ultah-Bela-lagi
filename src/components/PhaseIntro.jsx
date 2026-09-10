import { motion } from 'framer-motion'

export default function PhaseIntro({ onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center p-6 text-center z-10 max-w-lg"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.2 
        }}
        className="text-6xl mb-6 drop-shadow-md"
      >
        ✨
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-2xl md:text-3xl font-semibold text-gray-800 mb-10 leading-relaxed drop-shadow-sm"
      >
        Hallo yang disana, ini ada kado spesial buat <span className="text-pink-600 font-bold">Bela Setiya Ambarwati</span> untuk ulang tahun ke 23 nya nih!
      </motion.h1>

      <motion.button 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        onClick={onNext}
        className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full font-medium transition-transform hover:scale-105 active:scale-95 shadow-md text-lg flex items-center gap-2"
      >
        <span>🎁</span> Buka Kado Spesial
      </motion.button>
    </motion.div>
  )
}
