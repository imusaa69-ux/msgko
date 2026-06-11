'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, ExternalLink } from 'lucide-react'
import { NAV_ITEMS } from '@/lib/data'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  onYoutubeOpen?: () => void
  onInstagramOpen?: () => void
  onIletisimOpen?: () => void
  onAsasOpen?: () => void
  onDuyurularOpen?: () => void
}

export function MobileMenu({
  isOpen,
  onClose,
  onYoutubeOpen,
  onInstagramOpen,
  onIletisimOpen,
  onAsasOpen,
  onDuyurularOpen,
}: MobileMenuProps) {
  const pathname = usePathname()

  const handleAsas = () => {
    onClose()
    setTimeout(() => onAsasOpen?.(), 150)
  }

  const handleYoutube = () => {
    onClose()
    setTimeout(() => onYoutubeOpen?.(), 150)
  }

  const handleInstagram = () => {
    onClose()
    setTimeout(() => onInstagramOpen?.(), 150)
  }

  const handleDuyurular = () => {
    onClose()
    setTimeout(() => onDuyurularOpen?.(), 150)
  }

  const handleIletisim = () => {
    onClose()
    setTimeout(() => onIletisimOpen?.(), 150)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="mob-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[199] bg-black/70"
            style={{ backdropFilter: 'blur(6px)' }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="mob-panel"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 h-full z-[200] flex flex-col w-72"
            style={{
              background: 'rgba(7,7,11,0.97)',
              borderLeft: '1px solid rgba(139,92,246,0.15)',
              boxShadow: '-20px 0 60px rgba(0,0,0,0.6)',
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigasyon menüsü"
          >
            {/* Left glow line */}
            <div className="absolute top-0 left-0 bottom-0 w-px pointer-events-none"
              style={{ background: 'linear-gradient(180deg, transparent, rgba(139,92,246,0.5) 30%, rgba(236,72,153,0.4) 70%, transparent)' }}
            />

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.05]">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="MSG"
                  width={36}
                  height={36}
                  className="h-9 w-auto"
                  style={{ mixBlendMode: 'screen' }}
                />
                <div>
                  <p className="text-[0.75rem] font-bold tracking-[0.12em] uppercase text-white/90">MSG</p>
                  <p className="text-[0.55rem] tracking-[0.18em] uppercase text-purple-500/60">Knight Online</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center border border-white/[0.08] text-white/40 hover:border-pink-500/40 hover:text-white transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
                aria-label="Kapat"
              >
                <X size={14} />
              </button>
            </div>

            {/* Scrollable nav content */}
            <nav className="flex-1 px-4 py-5 overflow-y-auto flex flex-col gap-1" aria-label="Mobil navigasyon">

              {/* ── Sayfa Linkleri ── */}
              <p className="text-[0.58rem] font-bold tracking-[0.22em] uppercase px-3 mb-2"
                style={{ color: 'rgba(139,92,246,0.5)' }}>
                Sayfalar
              </p>

              {NAV_ITEMS.map((item, i) => {
                const isActive = pathname === item.href
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center justify-between px-3 py-3 transition-all duration-200 border-l-2 ${
                        isActive
                          ? 'border-purple-500/70 bg-purple-500/[0.07] text-white'
                          : 'border-transparent text-white/50 hover:border-purple-500/30 hover:bg-white/[0.03] hover:text-white/85'
                      }`}
                    >
                      <span className="text-[0.85rem] font-medium tracking-[0.04em]">{item.label}</span>
                      <ChevronRight size={13} className="text-white/20" />
                    </Link>
                  </motion.div>
                )
              })}

              {/* ── Karakter Linkleri ── */}
              <div className="mt-4">
                <p className="text-[0.58rem] font-bold tracking-[0.22em] uppercase px-3 mb-2"
                  style={{ color: 'rgba(139,92,246,0.5)' }}>
                  Karakterler
                </p>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    type="button"
                    onClick={handleAsas}
                    className="w-full flex items-center justify-between px-3 py-3 mb-1 border-l-2 border-transparent text-white/50 hover:border-purple-500/30 hover:bg-white/[0.03] hover:text-white/85 transition-all duration-200"
                  >
                    <span className="flex items-center gap-2.5 text-[0.85rem] font-medium tracking-[0.04em]">
                      <span className="flex items-center justify-center w-5 h-5 rounded-sm"
                        style={{ background: 'rgba(109,40,217,0.2)', border: '1px solid rgba(139,92,246,0.25)' }}>
                        <img src="/assassian-icon.png" alt="" className="w-4 h-4 object-contain"
                          style={{ mixBlendMode: 'screen', filter: 'brightness(1.3) contrast(1.1) drop-shadow(0 0 4px rgba(139,92,246,0.4))' }} />
                      </span>
                      Asas Eğitimleri
                    </span>
                    <ChevronRight size={13} className="text-white/20" />
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href="/kategoriler/okcu"
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-3 mb-1 border-l-2 border-transparent text-white/50 hover:border-purple-500/30 hover:bg-white/[0.03] hover:text-white/85 transition-all duration-200"
                  >
                    <span className="flex items-center gap-2.5 text-[0.85rem] font-medium tracking-[0.04em]">
                      <span className="flex items-center justify-center w-5 h-5 rounded-sm"
                        style={{ background: 'rgba(109,40,217,0.2)', border: '1px solid rgba(139,92,246,0.25)' }}>
                        <img src="/archer-icon.png" alt="" className="w-4 h-4 object-contain"
                          style={{ filter: 'brightness(1.2) drop-shadow(0 0 3px rgba(139,92,246,0.4))' }} />
                      </span>
                      Okçu Eğitimleri
                    </span>
                    <ChevronRight size={13} className="text-white/20" />
                  </Link>
                </motion.div>
              </div>

              {/* ── Sosyal Medya ── */}
              <div className="mt-4">
                <p className="text-[0.58rem] font-bold tracking-[0.22em] uppercase px-3 mb-2"
                  style={{ color: 'rgba(139,92,246,0.5)' }}>
                  Sosyal Medya
                </p>

                {/* YouTube butonu */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    type="button"
                    onClick={handleYoutube}
                    className="w-full flex items-center justify-between px-3 py-3 mb-1 border-l-2 border-transparent text-white/50 hover:border-red-500/40 hover:bg-red-500/[0.05] hover:text-white/85 transition-all duration-200 group"
                  >
                    <span className="flex items-center gap-2.5 text-[0.85rem] font-medium tracking-[0.04em]">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full transition-all duration-200 group-hover:scale-110"
                        style={{ background: 'rgba(255,68,68,0.15)', border: '1px solid rgba(255,68,68,0.25)' }}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" className="text-red-400">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </span>
                      <span className="group-hover:text-red-300 transition-colors duration-200">Youtube</span>
                    </span>
                    <ExternalLink size={11} className="text-white/15 group-hover:text-red-400/50 transition-colors" />
                  </button>
                </motion.div>

                {/* Instagram butonu */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    type="button"
                    onClick={handleInstagram}
                    className="w-full flex items-center justify-between px-3 py-3 mb-1 border-l-2 border-transparent text-white/50 hover:border-pink-500/40 hover:bg-pink-500/[0.05] hover:text-white/85 transition-all duration-200 group"
                  >
                    <span className="flex items-center gap-2.5 text-[0.85rem] font-medium tracking-[0.04em]">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full transition-all duration-200 group-hover:scale-110"
                        style={{ background: 'rgba(236,72,153,0.15)', border: '1px solid rgba(236,72,153,0.25)' }}>
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                          className="text-pink-400">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                        </svg>
                      </span>
                      <span className="group-hover:text-pink-300 transition-colors duration-200">Instagram</span>
                    </span>
                    <ExternalLink size={11} className="text-white/15 group-hover:text-pink-400/50 transition-colors" />
                  </button>
                </motion.div>

                {/* Duyurular butonu */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    type="button"
                    onClick={handleDuyurular}
                    className="w-full flex items-center justify-between px-3 py-3 mb-1 border-l-2 border-transparent text-white/50 hover:border-amber-500/40 hover:bg-amber-500/[0.05] hover:text-white/85 transition-all duration-200 group"
                  >
                    <span className="flex items-center gap-2.5 text-[0.85rem] font-medium tracking-[0.04em]">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full transition-all duration-200 group-hover:scale-110"
                        style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.25)' }}>
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                          className="text-amber-400">
                          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                        </svg>
                      </span>
                      <span className="group-hover:text-amber-300 transition-colors duration-200">Duyurular</span>
                    </span>
                    <ExternalLink size={11} className="text-white/15 group-hover:text-amber-400/50 transition-colors" />
                  </button>
                </motion.div>
              </div>

            </nav>

            {/* Footer CTA — İletişim */}
            <div className="px-4 pb-6 pt-3 border-t border-white/[0.05] space-y-2.5">
              <button
                type="button"
                onClick={handleIletisim}
                className="flex items-center justify-center gap-2 w-full py-3 text-[0.75rem] font-bold tracking-[0.1em] uppercase border border-purple-500/25 bg-purple-500/[0.07] text-purple-300/80 hover:border-purple-500/60 hover:bg-purple-500/[0.15] hover:text-white transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
              >
                İletişim
              </button>

              <a
                href="https://www.youtube.com/@musaagll"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-3 text-[0.75rem] font-bold tracking-[0.1em] uppercase border border-red-500/20 bg-red-500/[0.07] text-red-300/80 hover:border-red-500/40 hover:bg-red-500/[0.13] hover:text-white transition-all duration-200"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                YouTube Kanalı
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
