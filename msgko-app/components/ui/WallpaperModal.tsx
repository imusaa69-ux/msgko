'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, X, ZoomIn, ArrowLeft } from 'lucide-react'

const WALLPAPERS = [
  { id: 1,  src: '/wallpaper/ChatGPT Image 9 Haz 2026 12_29_13.png', label: 'Wallpaper I' },
  { id: 2,  src: '/wallpaper/ChatGPT Image 9 Haz 2026 12_29_20.png', label: 'Wallpaper II' },
  { id: 3,  src: '/wallpaper/ChatGPT Image 9 Haz 2026 12_29_23.png', label: 'Wallpaper III' },
  { id: 4,  src: '/wallpaper/ChatGPT Image 9 Haz 2026 12_29_27.png', label: 'Wallpaper IV' },
  { id: 5,  src: '/wallpaper/ChatGPT Image 9 Haz 2026 12_29_30.png', label: 'Wallpaper V' },
  { id: 6,  src: '/wallpaper/ChatGPT Image 9 Haz 2026 19_52_34.png', label: 'Wallpaper VI' },
  { id: 7,  src: '/wallpaper/ChatGPT Image 9 Haz 2026 19_54_36.png', label: 'Wallpaper VII' },
  { id: 8,  src: '/wallpaper/ChatGPT Image 9 Haz 2026 19_56_00.png', label: 'Wallpaper VIII' },
  { id: 9,  src: '/wallpaper/ChatGPT Image 9 Haz 2026 19_57_36.png', label: 'Wallpaper IX' },
  { id: 10, src: '/wallpaper/ChatGPT Image 9 Haz 2026 19_59_30.png', label: 'Wallpaper X' },
  { id: 11, src: '/wallpaper/ChatGPT Image 9 Haz 2026 20_00_52.png', label: 'Wallpaper XI' },
  { id: 12, src: '/wallpaper/ChatGPT Image 9 Haz 2026 20_02_08.png', label: 'Wallpaper XII' },
  { id: 13, src: '/wallpaper/ChatGPT Image 9 Haz 2026 20_06_28.png', label: 'Wallpaper XIII' },
]

interface WallpaperModalProps {
  isOpen: boolean
  onClose: () => void
}

export function WallpaperModal({ isOpen, onClose }: WallpaperModalProps) {
  const [lightbox, setLightbox] = useState<typeof WALLPAPERS[0] | null>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightbox) setLightbox(null)
        else onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, lightbox, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="wallpaper-page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[400] flex flex-col"
          style={{ background: '#07070B' }}
          role="dialog"
          aria-modal="true"
          aria-label="Wallpaper Galerisi"
        >
          {/* Mesh arka plan */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: `
              radial-gradient(ellipse 60% 50% at 20% 20%, rgba(109,40,217,0.10) 0%, transparent 60%),
              radial-gradient(ellipse 50% 60% at 80% 80%, rgba(236,72,153,0.07) 0%, transparent 55%),
              radial-gradient(ellipse 80% 40% at 50% 0%, rgba(7,7,11,0.9) 0%, transparent 50%)
            `
          }} />

          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.7), rgba(236,72,153,0.5), transparent)' }}
          />

          {/* ── Header ── */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5 flex-shrink-0"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          >
            {/* Geri butonu */}
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-200 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
              <span className="text-[0.78rem] font-medium tracking-[0.06em]">Geri Dön</span>
            </button>

            {/* Başlık */}
            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
              <p className="text-[0.62rem] font-bold tracking-[0.3em] uppercase mb-0.5"
                style={{ color: 'rgba(139,92,246,0.7)' }}>
                MSGKO.NET
              </p>
              <h1 className="text-[1.1rem] font-black tracking-[0.12em] uppercase text-white"
                style={{ fontFamily: 'var(--font-rajdhani), sans-serif' }}>
                Wallpaper
              </h1>
            </div>

            {/* Kapat */}
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center border border-white/[0.08] text-white/40 hover:border-purple-500/40 hover:text-white hover:bg-purple-500/10 transition-all duration-200"
              aria-label="Kapat"
            >
              <X size={15} />
            </button>
          </motion.header>

          {/* ── Alt bilgi şeridi ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative z-10 flex items-center justify-between px-6 md:px-12 py-3 flex-shrink-0"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}
          >
            <p className="text-[0.68rem] tracking-[0.06em] text-white/25">
              {WALLPAPERS.length} duvar kağıdı
            </p>
            <div className="flex items-center gap-1.5">
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#22c55e', boxShadow: '0 0 5px rgba(34,197,94,0.8)' }}
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <span className="text-[0.62rem] text-green-400/70 font-medium tracking-[0.08em] uppercase">Ücretsiz</span>
            </div>
          </motion.div>

          {/* ── Grid ── */}
          <div className="relative z-10 flex-1 overflow-y-auto px-6 md:px-12 py-8">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {WALLPAPERS.map((wp, i) => (
                <motion.div
                  key={wp.id}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative overflow-hidden cursor-pointer"
                  style={{
                    aspectRatio: '16/9',
                    background: '#0e0e14',
                    border: '1px solid rgba(139,92,246,0.14)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)'
                    e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.5), 0 0 32px rgba(139,92,246,0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139,92,246,0.14)'
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)'
                  }}
                  onClick={() => setLightbox(wp)}
                >
                  <img
                    src={wp.src}
                    alt={wp.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(to top, rgba(7,7,11,0.75) 0%, rgba(7,7,11,0.1) 50%, transparent 100%)' }}
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3"
                    style={{ background: 'rgba(7,7,11,0.45)', backdropFilter: 'blur(3px)' }}
                  >
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <div className="w-11 h-11 flex items-center justify-center border border-white/25 bg-white/10 text-white hover:bg-purple-500/35 hover:border-purple-400/60 transition-all duration-200"
                        onClick={(e) => { e.stopPropagation(); setLightbox(wp) }}>
                        <ZoomIn size={16} />
                      </div>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <a
                        href={wp.src}
                        download={wp.label + '.png'}
                        className="w-11 h-11 flex items-center justify-center border border-white/25 bg-white/10 text-white hover:bg-purple-500/35 hover:border-purple-400/60 transition-all duration-200"
                        onClick={(e) => e.stopPropagation()}
                        aria-label="İndir"
                      >
                        <Download size={16} />
                      </a>
                    </motion.div>
                  </div>

                  {/* Alt etiket */}
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-3">
                    <p className="text-[0.72rem] font-bold tracking-[0.16em] uppercase text-white/60 group-hover:text-white/85 transition-colors duration-200">
                      {wp.label}
                    </p>
                  </div>

                  {/* Top accent line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
                    style={{ background: 'linear-gradient(90deg, rgba(139,92,246,0.8), rgba(236,72,153,0.6))' }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Alt boşluk */}
            <div className="h-12" />
          </div>
        </motion.div>
      )}

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <>
            <motion.div
              key="lb-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[500] bg-black/95"
              style={{ backdropFilter: 'blur(12px)' }}
              onClick={() => setLightbox(null)}
            />
            <motion.div
              key="lb-content"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[501] flex flex-col items-center justify-center p-6 md:p-12"
              onClick={() => setLightbox(null)}
            >
              <img
                src={lightbox.src}
                alt={lightbox.label}
                className="max-w-full max-h-[80vh] object-contain"
                style={{
                  border: '1px solid rgba(139,92,246,0.3)',
                  boxShadow: '0 0 80px rgba(0,0,0,0.8), 0 0 40px rgba(139,92,246,0.1)',
                }}
              />

              {/* Lightbox alt bar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="flex items-center gap-4 mt-5"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-[0.72rem] font-bold tracking-[0.16em] uppercase text-white/40">
                  {lightbox.label}
                </p>
                <div className="w-px h-4 bg-white/10" />
                <a
                  href={lightbox.src}
                  download={lightbox.label + '.png'}
                  className="flex items-center gap-2 px-5 py-2.5 text-[0.75rem] font-bold tracking-[0.1em] uppercase border border-purple-500/40 bg-purple-500/15 text-purple-300 hover:bg-purple-500/25 hover:text-white transition-all duration-200"
                >
                  <Download size={13} />
                  İndir
                </a>
              </motion.div>
            </motion.div>

            {/* Kapat butonu */}
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="fixed top-5 right-5 z-[502] w-10 h-10 flex items-center justify-center border border-white/20 bg-black/60 text-white hover:bg-white/10 transition-all duration-200"
              aria-label="Kapat"
            >
              <X size={16} />
            </button>
          </>
        )}
      </AnimatePresence>
    </AnimatePresence>
  )
}
