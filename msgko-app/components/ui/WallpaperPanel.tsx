'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, X, ZoomIn } from 'lucide-react'

const WALLPAPERS = [
  {
    id: 1,
    src: '/wallpaper/ChatGPT Image 9 Haz 2026 12_29_13.png',
    label: 'MSGKO Wallpaper 1',
  },
  {
    id: 2,
    src: '/wallpaper/ChatGPT Image 9 Haz 2026 12_29_20.png',
    label: 'MSGKO Wallpaper 2',
  },
  {
    id: 3,
    src: '/wallpaper/ChatGPT Image 9 Haz 2026 12_29_23.png',
    label: 'MSGKO Wallpaper 3',
  },
  {
    id: 4,
    src: '/wallpaper/ChatGPT Image 9 Haz 2026 12_29_27.png',
    label: 'MSGKO Wallpaper 4',
  },
  {
    id: 5,
    src: '/wallpaper/ChatGPT Image 9 Haz 2026 12_29_30.png',
    label: 'MSGKO Wallpaper 5',
  },
]

export function WallpaperPanel() {
  const [lightbox, setLightbox] = useState<string | null>(null)

  return (
    <>
      <div className="p-5 grid grid-cols-2 gap-3">
        {WALLPAPERS.map((wp, i) => (
          <motion.div
            key={wp.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden cursor-pointer"
            style={{
              aspectRatio: '16/9',
              background: '#0e0e14',
              border: '1px solid rgba(139,92,246,0.15)',
            }}
          >
            <img
              src={wp.src}
              alt={wp.label}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex items-center justify-center gap-2"
              style={{ background: 'rgba(7,7,11,0.65)', backdropFilter: 'blur(2px)' }}
            >
              {/* Büyüt */}
              <button
                type="button"
                onClick={() => setLightbox(wp.src)}
                className="w-9 h-9 flex items-center justify-center border border-white/20 bg-white/10 text-white hover:bg-purple-500/30 hover:border-purple-400/50 transition-all duration-200"
                aria-label="Büyüt"
              >
                <ZoomIn size={14} />
              </button>

              {/* İndir */}
              <a
                href={wp.src}
                download={wp.label + '.png'}
                className="w-9 h-9 flex items-center justify-center border border-white/20 bg-white/10 text-white hover:bg-purple-500/30 hover:border-purple-400/50 transition-all duration-200"
                aria-label="İndir"
                onClick={(e) => e.stopPropagation()}
              >
                <Download size={14} />
              </a>
            </div>

            {/* Alt etiket */}
            <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5"
              style={{ background: 'linear-gradient(to top, rgba(7,7,11,0.85), transparent)' }}
            >
              <p className="text-[0.6rem] font-semibold tracking-[0.1em] uppercase text-white/50">
                {wp.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <>
            <motion.div
              key="wp-lightbox-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[500] bg-black/90"
              style={{ backdropFilter: 'blur(8px)' }}
              onClick={() => setLightbox(null)}
            />
            <motion.div
              key="wp-lightbox-img"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[501] flex items-center justify-center p-6"
              onClick={() => setLightbox(null)}
            >
              <img
                src={lightbox}
                alt="Wallpaper"
                className="max-w-full max-h-full object-contain shadow-2xl"
                style={{ border: '1px solid rgba(139,92,246,0.25)' }}
              />
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center border border-white/20 bg-black/60 text-white hover:bg-white/10 transition-all duration-200"
                aria-label="Kapat"
              >
                <X size={16} />
              </button>
              {/* İndir butonu lightbox'ta */}
              <a
                href={lightbox}
                download="MSGKO-Wallpaper.png"
                className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 text-[0.75rem] font-bold tracking-[0.1em] uppercase border border-purple-500/40 bg-purple-500/15 text-purple-300 hover:bg-purple-500/25 hover:text-white transition-all duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <Download size={13} />
                İndir
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
