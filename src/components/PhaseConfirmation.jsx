import { motion } from 'framer-motion'

export default function PhaseConfirmation({ onConfirm, onDecline }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center z-10"
    >
      <div className="relative bg-white shadow-xl rounded-lg w-80 h-48 flex items-center justify-center mb-8 border border-gray-100">
        {/* Envelope open illustration */}
        <div className="absolute -top-[90px] w-0 h-0 border-l-[160px] border-r-[160px] border-b-[100px] border-l-transparent border-r-transparent border-b-pink-100 rounded-t-lg drop-shadow-sm z-0 origin-bottom"></div>
        <div className="absolute bottom-0 w-0 h-0 border-l-[160px] border-r-[160px] border-b-[100px] border-l-transparent border-r-transparent border-b-pink-50 rounded-b-lg z-20"></div>
        <div className="bg-pink-50 border border-pink-100 w-64 h-32 absolute bottom-2 z-10 shadow-sm flex items-center justify-center">
            <span className="text-3xl">👀</span>
        </div>
      </div>

      <motion.h1 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold text-gray-800 mb-8 text-center drop-shadow-sm"
      >
        Apakah anda yakin?
      </motion.h1>

      <div className="flex gap-4">
        <button 
          onClick={onConfirm}
          className="px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-medium transition-transform hover:scale-105 active:scale-95 shadow-md"
        >
          Iya
        </button>
        <button 
          onClick={onDecline}
          className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full font-medium transition-transform hover:scale-105 active:scale-95 shadow-sm"
        >
          Tidak
        </button>
      </div>
    </motion.div>
  )
}
