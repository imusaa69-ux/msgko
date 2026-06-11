'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollDetect } from '@/hooks/useScrollDetect'
import { useMobileMenu } from '@/hooks/useMobileMenu'
import { MobileMenu } from './MobileMenu'
import { IletisimModal } from '@/components/ui/IletisimModal'
import { AsasModal } from '@/components/ui/AsasModal'
import { KarakterlerDropdown } from '@/components/ui/KarakterlerDropdown'
import { SearchBar } from '@/components/ui/SearchBar'
import { SidePanel } from '@/components/ui/SidePanel'
import { YoutubePanel } from '@/components/ui/YoutubePanel'
import { InstagramPanel } from '@/components/ui/InstagramPanel'
import { DuyurularModal } from '@/components/ui/DuyurularModal'
import { WallpaperModal } from '@/components/ui/WallpaperModal'
import { NAV_ITEMS } from '@/lib/data'

const NAV_BUTTON_CLASS =
  'relative flex items-center h-[60px] px-4 text-[0.82rem] font-medium tracking-[0.04em] transition-colors duration-200 group text-[#C8C8D8]/50 hover:text-white'

export function Navbar() {
  const pathname = usePathname()
  const isScrolled = useScrollDetect(20)
  const { isOpen, openMenu, closeMenu } = useMobileMenu()
  const [wsMovieOpen, setWsMovieOpen] = useState(false)
  const [iletisimOpen, setIletisimOpen] = useState(false)
  const [youtubeOpen, setYoutubeOpen] = useState(false)
  const [asasModalOpen, setAsasModalOpen] = useState(false)
  const [wallpaperOpen, setWallpaperOpen] = useState(false)
  const [duyurularOpen, setDuyurularOpen] = useState(false)

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="h-px w-full transition-all duration-500"
          style={{
            background: isScrolled
              ? 'linear-gradient(90deg, transparent, rgba(139,92,246,0.7), rgba(236,72,153,0.5), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
          }}
        />

        <div
          className="h-16 flex items-center justify-between px-6 md:px-8 transition-all duration-500"
          style={{
            background: isScrolled ? 'rgba(7,7,11,0.92)' : 'rgba(7,7,11,0.55)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: isScrolled ? '0 4px 32px rgba(0,0,0,0.45), 0 1px 0 rgba(139,92,246,0.08)' : 'none',
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group" aria-label="Ana Sayfa">
            <div className="relative">
              <div
                className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none scale-150"
                style={{ background: 'rgba(139,92,246,0.45)' }}
              />
              <Image
                src="/logo.png"
                alt="MSG Knight Online"
                width={64}
                height={64}
                className="relative w-12 h-12 md:w-14 md:h-14 object-contain transition-all duration-300 group-hover:scale-105 group-hover:brightness-125"
                style={{ mixBlendMode: 'screen', filter: 'brightness(1.5) contrast(1.1)' }}
                priority
              />
            </div>
            {/* Yazı — hem mobil hem masaüstü */}
            <div className="flex flex-col">
              <span className="text-[0.82rem] font-black tracking-[0.14em] uppercase leading-none text-white/95 group-hover:text-white transition-colors duration-200">
                MSGKO
                <span className="text-purple-400/80">.NET</span>
              </span>
              <span className="text-[0.5rem] tracking-[0.2em] uppercase leading-none mt-0.5 text-white/30">
                Knight Online
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center" aria-label="Ana navigasyon">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative flex items-center h-16 px-4 text-[0.82rem] font-medium tracking-[0.04em] transition-colors duration-200 group ${
                    isActive ? 'text-white' : 'text-[#C8C8D8]/50 hover:text-white'
                  }`}
                >
                  <span className="absolute inset-x-1 inset-y-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-sm bg-white/[0.04]" />
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                      style={{ background: 'linear-gradient(90deg, rgba(139,92,246,0.9), rgba(236,72,153,0.8))' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}

            <div className="w-px h-5 mx-1 bg-white/[0.08]" />
            <div className="flex items-center h-16 px-1"><KarakterlerDropdown /></div>
            <div className="w-px h-5 mx-1 bg-white/[0.08]" />

            {/* YouTube nav button */}
            <button type="button" onClick={() => setYoutubeOpen(true)} className={NAV_BUTTON_CLASS}>
              <span className="absolute inset-x-1 inset-y-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-sm bg-red-500/[0.06]" />
              <span className="relative z-10 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"
                  className="text-red-500/60 group-hover:text-red-400 transition-colors duration-200 flex-shrink-0">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="text-[#C8C8D8]/50 group-hover:text-red-300 transition-colors duration-200">Youtube</span>
              </span>
            </button>

            {/* Instagram nav button */}
            <button type="button" onClick={() => setWsMovieOpen(true)} className={NAV_BUTTON_CLASS}>
              <span className="absolute inset-x-1 inset-y-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-sm bg-pink-500/[0.06]" />
              <span className="relative z-10 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(236,72,153,0.15)', border: '1px solid rgba(236,72,153,0.25)' }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    className="text-pink-400 transition-colors duration-200">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </span>
                <span className="text-[#C8C8D8]/50 group-hover:text-pink-300 transition-colors duration-200">Instagram</span>
              </span>
            </button>

            {/* Duyurular nav button */}
            <button type="button" onClick={() => setDuyurularOpen(true)} className={NAV_BUTTON_CLASS}>
              <span className="absolute inset-x-1 inset-y-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-sm bg-amber-500/[0.06]" />
              <span className="relative z-10 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.25)' }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    className="text-amber-400 transition-colors duration-200">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                  </svg>
                </span>
                <span className="text-[#C8C8D8]/50 group-hover:text-amber-300 transition-colors duration-200">Duyurular</span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => setWallpaperOpen(true)}
              className="relative flex items-center h-9 px-5 ml-1 text-[0.78rem] font-semibold tracking-[0.08em] uppercase transition-all duration-300 border text-purple-300/70 border-purple-500/20 bg-purple-500/[0.04] hover:border-purple-500/50 hover:bg-purple-500/[0.12] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5 opacity-70" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
              </svg>
              Wallpaper
            </button>

            <button
              type="button"
              onClick={() => setIletisimOpen(true)}
              className="relative flex items-center h-9 px-5 ml-2 text-[0.78rem] font-semibold tracking-[0.08em] uppercase transition-all duration-300 border text-purple-300/80 border-purple-500/30 bg-purple-500/[0.06] hover:border-purple-500/70 hover:bg-purple-500/[0.18] hover:text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
            >
              İletişim
            </button>
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block"><SearchBar /></div>
            <button
              type="button"
              onClick={openMenu}
              className="md:hidden flex items-center justify-center w-9 h-9 border border-white/10 text-white/60 hover:border-purple-500/40 hover:text-white hover:bg-purple-500/10 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
              aria-label="Menüyü aç"
              aria-expanded={isOpen}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>

        <div className="h-px transition-all duration-500"
          style={{
            background: isScrolled
              ? 'linear-gradient(90deg, transparent, rgba(139,92,246,0.15), transparent)'
              : 'transparent',
          }}
        />
      </motion.header>

      <MobileMenu
        isOpen={isOpen}
        onClose={closeMenu}
        onYoutubeOpen={() => setYoutubeOpen(true)}
        onInstagramOpen={() => setWsMovieOpen(true)}
        onIletisimOpen={() => setIletisimOpen(true)}
        onAsasOpen={() => setAsasModalOpen(true)}
        onDuyurularOpen={() => setDuyurularOpen(true)}
      />
      <IletisimModal isOpen={iletisimOpen} onClose={() => setIletisimOpen(false)} />
      <AsasModal isOpen={asasModalOpen} onClose={() => setAsasModalOpen(false)} />

      {/* Wallpaper Modal */}
      <WallpaperModal isOpen={wallpaperOpen} onClose={() => setWallpaperOpen(false)} />

      {/* YouTube Side Panel */}
      <SidePanel
        isOpen={youtubeOpen}
        onClose={() => setYoutubeOpen(false)}
        title="YouTube"
        subtitle="@musaagll"
        accentColor="#ff4444"
        externalUrl="https://www.youtube.com/@musaagll/videos"
        externalLabel="YouTube Kanalına Git"
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(255,80,80,0.9)">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        }
      >
        <YoutubePanel />
      </SidePanel>

      {/* Instagram Side Panel */}
      <SidePanel
        isOpen={wsMovieOpen}
        onClose={() => setWsMovieOpen(false)}
        title="Instagram"
        subtitle="@msgclip"
        accentColor="#833ab4"
        externalUrl="https://www.instagram.com/msgclip"
        externalLabel="Instagram'da Takip Et"
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(167,112,246,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
        }
      >
        <InstagramPanel />
      </SidePanel>

      {/* Duyurular Modal (tam ekran, WallpaperModal gibi) */}
      <DuyurularModal isOpen={duyurularOpen} onClose={() => setDuyurularOpen(false)} />

    </>
  )
}
