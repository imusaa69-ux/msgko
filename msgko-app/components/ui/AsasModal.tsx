'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock } from 'lucide-react'

interface AsasModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AsasModal({ isOpen, onClose }: AsasModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (isOpen) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="asas-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 z-[300] backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            key="asas-modal"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[301] w-[90vw] max-w-md bg-[#111111] border border-white/[0.08] shadow-[0_24px_64px_rgba(0,0,0,0.8)]"
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 text-[#999999] hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
              aria-label="Kapat"
            >
              <X size={18} />
            </button>

            <div className="px-10 py-12 flex flex-col items-center text-center">
              <div className="w-16 h-16 border border-white/[0.08] bg-[#2A2A2A] flex items-center justify-center mb-6">
                <img
                  src="/assassian-icon.png"
                  alt="Asas"
                  className="w-10 h-10 object-contain"
                  style={{ mixBlendMode: 'screen', filter: 'brightness(1.3) contrast(1.1)' }}
                />
              </div>
              <h2 className="text-white font-extrabold text-xl tracking-[0.1em] uppercase mb-3">
                Asas Eğitimleri
              </h2>
              <div className="flex items-center gap-2 text-amber-400 mb-4">
                <Clock size={16} />
                <span className="text-lg font-bold tracking-[0.15em] uppercase">Çok Yakında</span>
              </div>
              <p className="text-[#999999] text-[0.82rem] leading-relaxed">
                Asas eğitim videoları hazırlanıyor. Kısa sürede burada olacak.
              </p>
              <div className="mt-8 w-full h-px bg-white/[0.06]" />
              <button
                type="button"
                onClick={onClose}
                className="mt-6 text-[0.75rem] text-[#666] hover:text-white transition-colors tracking-[0.08em] uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
              >
                Kapat
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
