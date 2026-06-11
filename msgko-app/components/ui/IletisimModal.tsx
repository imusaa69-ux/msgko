'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface IletisimModalProps {
  isOpen: boolean
  onClose: () => void
}

export function IletisimModal({ isOpen, onClose }: IletisimModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (isOpen) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="iletisim-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[300]"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="iletisim-modal"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[301] w-[92vw] max-w-[400px]"
            style={{
              background: 'rgba(10,10,18,0.97)',
              border: '1px solid rgba(139,92,246,0.22)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03)',
            }}
            role="dialog"
            aria-modal="true"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.7), rgba(236,72,153,0.5), transparent)' }}
            />

            {/* Kapat */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center border border-white/[0.08] text-white/35 hover:border-purple-500/40 hover:text-white hover:bg-purple-500/10 transition-all duration-200"
              aria-label="Kapat"
            >
              <X size={13} />
            </button>

            <div className="px-8 py-9">
              {/* Başlık */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="mb-7"
              >
                <p className="text-[0.6rem] font-bold tracking-[0.28em] uppercase mb-1.5"
                  style={{ color: 'rgba(139,92,246,0.7)' }}>
                  MSGKO.NET
                </p>
                <h2 className="text-[1.3rem] font-black tracking-[0.1em] uppercase text-white"
                  style={{ fontFamily: 'var(--font-rajdhani), sans-serif' }}>
                  İletişim
                </h2>
                <p className="text-[0.72rem] mt-1.5" style={{ color: 'rgba(180,180,200,0.35)' }}>
                  Sosyal medya veya e-posta ile ulaşabilirsin.
                </p>
              </motion.div>

              {/* Instagram */}
              <motion.a
                href="https://www.instagram.com/msgclip"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-4 px-4 py-4 mb-3 group transition-all duration-250"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  transition: 'border-color 0.25s, background 0.25s, box-shadow 0.25s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(236,72,153,0.35)'
                  e.currentTarget.style.background = 'rgba(236,72,153,0.06)'
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(236,72,153,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* İkon */}
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(131,58,180,0.2), rgba(253,29,29,0.15), rgba(252,176,69,0.15))',
                    border: '1px solid rgba(236,72,153,0.25)',
                  }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(240,130,180,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[0.62rem] font-semibold tracking-[0.16em] uppercase mb-0.5"
                    style={{ color: 'rgba(180,180,200,0.4)' }}>Instagram</p>
                  <p className="text-[0.88rem] font-semibold text-white/85 group-hover:text-white transition-colors">@msgclip</p>
                </div>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  className="text-white/20 group-hover:text-pink-400/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0">
                  <path d="M7 17L17 7M17 7H7M17 7v10"/>
                </svg>
              </motion.a>

              {/* Gmail */}
              <motion.a
                href="mailto:imusaagll@gmail.com"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-4 px-4 py-4 group"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  transition: 'border-color 0.25s, background 0.25s, box-shadow 0.25s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139,92,246,0.35)'
                  e.currentTarget.style.background = 'rgba(139,92,246,0.06)'
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(139,92,246,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* İkon */}
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(139,92,246,0.12)',
                    border: '1px solid rgba(139,92,246,0.25)',
                  }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[0.62rem] font-semibold tracking-[0.16em] uppercase mb-0.5"
                    style={{ color: 'rgba(180,180,200,0.4)' }}>E-Posta</p>
                  <p className="text-[0.88rem] font-semibold text-white/85 group-hover:text-white transition-colors truncate">imusaagll@gmail.com</p>
                </div>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  className="text-white/20 group-hover:text-purple-400/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0">
                  <path d="M7 17L17 7M17 7H7M17 7v10"/>
                </svg>
              </motion.a>

              {/* Alt çizgi */}
              <div className="mt-6 pt-5 flex items-center justify-center gap-1.5"
                style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(139,92,246,0.4)' }} />
                <p className="text-[0.6rem] tracking-[0.1em] uppercase" style={{ color: 'rgba(139,92,246,0.4)' }}>
                  MSGKO.NET
                </p>
                <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(139,92,246,0.4)' }} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
