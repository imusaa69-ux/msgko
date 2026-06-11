'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { OkcuModal } from '@/components/ui/OkcuModal'
import { AsasModal } from '@/components/ui/AsasModal'

// Premium stats
const STATS = [
  { value: '120+', label: 'Eğitim Videosu', sub: 've büyüyor' },
  { value: '15K+', label: 'Toplam İzlenme', sub: 'organik' },
  { value: '2026', label: 'Meta Güncel', sub: 'aktif sezon' },
]

// Ticker bant içeriği
const TICKER_ITEMS = [
  { icon: null, text: 'Asas Rehberi',  img: '/assassian-icon.png' },
  { icon: null, text: 'Okçu Rehberi',  img: '/archer-icon.png' },
  { icon: null, text: 'Priest Rehberi', img: '/dreadshield.png' },
  { icon: null, text: 'Mage Rehberi',  img: '/staffwoe.png' },
  { icon: '🛡️', text: 'WS Taktikleri', img: null },
  { icon: '🎮', text: "Knight Online'a Dair Her Şey", img: null },
  // Döngü için tekrar
  { icon: null, text: 'Asas Rehberi',  img: '/assassian-icon.png' },
  { icon: null, text: 'Okçu Rehberi',  img: '/archer-icon.png' },
  { icon: null, text: 'Priest Rehberi', img: '/dreadshield.png' },
  { icon: null, text: 'Mage Rehberi',  img: '/staffwoe.png' },
  { icon: '🛡️', text: 'WS Taktikleri', img: null },
  { icon: '🎮', text: "Knight Online'a Dair Her Şey", img: null },
  // İkinci tekrar — kesintisiz döngü
  { icon: null, text: 'Asas Rehberi',  img: '/assassian-icon.png' },
  { icon: null, text: 'Okçu Rehberi',  img: '/archer-icon.png' },
  { icon: null, text: 'Priest Rehberi', img: '/dreadshield.png' },
  { icon: null, text: 'Mage Rehberi',  img: '/staffwoe.png' },
  { icon: '🛡️', text: 'WS Taktikleri', img: null },
  { icon: '🎮', text: "Knight Online'a Dair Her Şey", img: null },
]

export function HeroSection() {
  const [okcuOpen, setOkcuOpen] = useState(false)
  const [asasOpen, setAsasOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePos({ x, y })
  }, [])

  // Scroll parallax
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const logoY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '7%'])

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-[96svh] md:min-h-[96vh] flex items-center overflow-hidden mt-16"
        aria-label="Hero bölümü"
        onMouseMove={handleMouseMove}
      >
        {/* Base */}
        <div className="absolute inset-0 bg-[#07070B]" />

        {/* Background video */}
        <motion.div className="absolute inset-0" style={{ y: videoY }}>
          <video
            className="w-full h-full object-cover opacity-25"
            src="/bg-video.mp4"
            autoPlay loop muted playsInline aria-hidden="true"
          />
        </motion.div>

        {/* Atmospheric mesh gradients */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `
            radial-gradient(ellipse 65% 75% at 85% 50%, rgba(109,40,217,0.14) 0%, transparent 55%),
            radial-gradient(ellipse 45% 55% at 15% 85%, rgba(236,72,153,0.07) 0%, transparent 50%),
            radial-gradient(ellipse 90% 50% at 50% 0%, rgba(7,7,11,0.85) 0%, transparent 45%)
          `
        }} />

        {/* Noise texture overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '128px 128px',
          }}
        />

        {/* MSG Logo — right side, parallax + mouse */}
        <motion.div
          className="absolute right-[8%] md:right-[6%] top-1/2 w-[55%] md:w-[48%] max-w-[640px] pointer-events-none select-none"
          style={{
            y: logoY,
            translateY: '-50%',
            x: mousePos.x * -22,
          }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 scale-90"
            style={{
              background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(109,40,217,0.22) 0%, rgba(139,92,246,0.12) 35%, transparent 65%)',
              filter: 'blur(40px)',
            }}
          />
          <div className="absolute inset-0 scale-75"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(236,72,153,0.1) 0%, transparent 60%)',
              filter: 'blur(24px)',
            }}
          />
          <motion.img
            src="/logo.png"
            alt=""
            className="relative w-full h-auto"
            style={{
              mixBlendMode: 'screen',
              filter: 'brightness(1.4) contrast(1.08) drop-shadow(0 0 40px rgba(139,92,246,0.5)) drop-shadow(0 0 80px rgba(109,40,217,0.25))',
              opacity: 0.52,
              x: mousePos.x * -8,
              y: mousePos.y * -8,
            }}
          />
        </motion.div>

        {/* Left gradient — text readability */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(108deg, rgba(7,7,11,0.98) 28%, rgba(7,7,11,0.8) 52%, rgba(7,7,11,0.12) 100%)' }}
        />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #07070B 0%, rgba(7,7,11,0.6) 60%, transparent 100%)' }}
        />

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(109,40,217,0.5) 30%, rgba(139,92,246,0.7) 50%, rgba(236,72,153,0.45) 70%, transparent 100%)' }}
        />

        {/* Content */}
        <motion.div
          className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-8 w-full py-20"
          style={{ y: contentY }}
        >
          <div className="max-w-[560px]">

            {/* Status tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2.5 mb-6"
            >
              <div className="flex items-center gap-2 px-3 py-1.5"
                style={{
                  background: 'rgba(109,40,217,0.12)',
                  border: '1px solid rgba(139,92,246,0.28)',
                  backdropFilter: 'blur(8px)',
                }}>
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-purple-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                />
                <span className="text-[0.67rem] font-bold tracking-[0.24em] uppercase text-purple-400">
                  Knight Online
                </span>
              </div>
              <div className="h-px flex-1 max-w-[60px]"
                style={{ background: 'linear-gradient(90deg, rgba(139,92,246,0.4), transparent)' }}
              />
            </motion.div>

            {/* H1 */}
            <div className="mb-6">
              {/* Satır 1: KNIGHT ONLINE — yan yana */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-baseline gap-[0.15em] flex-wrap"
              >
                <span
                  className="uppercase leading-[0.9] tracking-[-0.02em] text-white"
                  style={{
                    fontFamily: 'var(--font-rajdhani), sans-serif',
                    fontSize: 'clamp(2.2rem, 5.2vw, 5.2rem)',
                    fontWeight: 900,
                  }}
                >
                  KNIGHT
                </span>
                <span
                  className="uppercase leading-[0.9] tracking-[-0.02em]"
                  style={{
                    fontFamily: 'var(--font-rajdhani), sans-serif',
                    fontSize: 'clamp(2.2rem, 5.2vw, 5.2rem)',
                    fontWeight: 900,
                    color: 'white',
                  }}
                >
                  ONLINE
                </span>
              </motion.div>

              {/* Satır 2: GELİŞİM REHBERİ — yan yana, gradient */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-baseline gap-[0.4em] flex-wrap"
              >
                <span
                  className="uppercase leading-[0.9] tracking-[-0.02em] text-transparent bg-clip-text"
                  style={{
                    fontFamily: 'var(--font-rajdhani), sans-serif',
                    fontSize: 'clamp(2.2rem, 5.2vw, 5.2rem)',
                    fontWeight: 900,
                    backgroundImage: 'linear-gradient(125deg, #e0d7ff 0%, #a78bfa 30%, #8b5cf6 50%, #ec4899 75%, #f59e0b 100%)',
                  }}
                >
                  GELİŞİM
                </span>
                <span
                  className="uppercase leading-[0.9] tracking-[-0.02em] text-transparent bg-clip-text"
                  style={{
                    fontFamily: 'var(--font-rajdhani), sans-serif',
                    fontSize: 'clamp(2.2rem, 5.2vw, 5.2rem)',
                    fontWeight: 900,
                    backgroundImage: 'linear-gradient(125deg, #a78bfa 0%, #ec4899 55%, #fb923c 100%)',
                  }}
                >
                  REHBERİ
                </span>
              </motion.div>

              {/* Accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.65, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mt-3 h-[2px] origin-left max-w-[360px]"
                style={{ background: 'linear-gradient(90deg, rgba(139,92,246,0.7), rgba(236,72,153,0.4), transparent)' }}
              />
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
              className="text-[1rem] md:text-[1.05rem] leading-[1.8] mb-9 max-w-[480px]"
              style={{ color: 'rgba(200,200,216,0.62)' }}
            >
              Her savaş yeni bir deneyim, her eğitim daha büyük bir{' '}
              <span className="text-purple-300 font-semibold">gelişim fırsatıdır.</span>{' '}
              Ustalığa giden yolda ihtiyacın olan tüm bilgiler, güncel meta analizleri ve
              profesyonel eğitim içerikleri burada seni bekliyor.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-3 mb-14"
            >
              {/* ASAS — primary */}
              <motion.button
                onClick={() => setAsasOpen(true)}
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="group relative inline-flex items-center gap-3 px-7 py-4 text-[0.82rem] font-bold tracking-[0.12em] uppercase text-white overflow-hidden sm:w-auto w-full justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(109,40,217,1) 0%, rgba(124,58,237,0.95) 50%, rgba(139,92,246,0.9) 100%)',
                  border: '1px solid rgba(139,92,246,0.55)',
                  boxShadow: '0 4px 24px rgba(109,40,217,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
                  transition: 'box-shadow 0.35s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(109,40,217,0.65), 0 0 60px rgba(139,92,246,0.15), inset 0 1px 0 rgba(255,255,255,0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(109,40,217,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(108deg, transparent 25%, rgba(255,255,255,0.14) 50%, transparent 75%)' }} />
                <div className="absolute bottom-0 left-4 right-4 h-px opacity-40"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)' }} />
                <img src="/assassian-icon.png" alt="" className="relative w-7 h-7 object-contain flex-shrink-0"
                  style={{ mixBlendMode: 'screen', filter: 'brightness(1.3) contrast(1.1) drop-shadow(0 2px 8px rgba(0,0,0,0.6))' }} />
                <span className="relative z-10">Asas Eğitimleri</span>
                <svg className="relative z-10 w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </motion.button>

              {/* OKÇU — secondary */}
              <motion.button
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                onClick={() => setOkcuOpen(true)}
                className="group relative inline-flex items-center gap-3 px-7 py-4 text-[0.82rem] font-bold tracking-[0.12em] uppercase text-white overflow-hidden sm:w-auto w-full justify-center"
                style={{
                  background: 'rgba(7,7,11,0.6)',
                  border: '1px solid rgba(139,92,246,0.3)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
                  backdropFilter: 'blur(8px)',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139,92,246,0.65)'
                  e.currentTarget.style.background = 'rgba(109,40,217,0.18)'
                  e.currentTarget.style.boxShadow = '0 10px 36px rgba(0,0,0,0.45), 0 0 28px rgba(139,92,246,0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)'
                  e.currentTarget.style.background = 'rgba(7,7,11,0.6)'
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.35)'
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: 'linear-gradient(135deg, rgba(109,40,217,0.1), rgba(139,92,246,0.06))' }} />
                <img src="/archer-icon.png" alt="" className="relative w-7 h-7 object-contain flex-shrink-0"
                  style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.6))' }} />
                <span className="relative z-10">Okçu Eğitimleri</span>
                <svg className="relative z-10 w-3.5 h-3.5 opacity-40 group-hover:opacity-80 group-hover:translate-x-0.5 transition-all duration-200"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-7 sm:gap-9 flex-wrap"
            >
              {STATS.map((stat, i) => (
                <div key={i} className="group cursor-default">
                  <div className="flex items-baseline gap-0.5">
                    <span
                      className="font-black leading-none tracking-[-0.03em] transition-all duration-300"
                      style={{
                        fontFamily: 'var(--font-rajdhani), sans-serif',
                        fontSize: 'clamp(1.7rem, 3.5vw, 2.2rem)',
                        background: 'linear-gradient(135deg, #ffffff 0%, rgba(196,181,253,0.85) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-[0.7rem] font-semibold tracking-[0.07em] text-white/65 mt-0.5 leading-none">{stat.label}</p>
                  <p className="text-[0.6rem] tracking-[0.1em] uppercase mt-0.5 leading-none" style={{ color: 'rgba(139,92,246,0.55)' }}>{stat.sub}</p>
                </div>
              ))}

              {/* Separator */}
              <div className="hidden sm:block w-px h-12 bg-white/[0.07]" />

              {/* Live indicator */}
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-sm"
                style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)' }}>
                <motion.div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: '#22c55e', boxShadow: '0 0 6px rgba(34,197,94,0.8)' }}
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <span className="text-[0.64rem] text-green-400 font-semibold tracking-[0.1em] uppercase">Canlı</span>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-8 hidden md:flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
            >
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-purple-500/35 to-transparent" />
            </motion.div>
          </motion.div>

        </motion.div>
      </section>

      {/* ─── Ticker Bandı ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden"
        style={{
          background: 'rgba(10,10,18,0.88)',
          borderTop: '1px solid rgba(139,92,246,0.18)',
          borderBottom: '1px solid rgba(139,92,246,0.10)',
          backdropFilter: 'blur(12px)',
        }}
        aria-label="İçerik kategorileri"
      >
        {/* Sol fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, rgba(10,10,18,1) 0%, transparent 100%)' }}
        />
        {/* Sağ fade */}
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(270deg, rgba(10,10,18,1) 0%, transparent 100%)' }}
        />

        {/* Kayan içerik — kesintisiz sonsuz döngü */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex items-center shrink-0 gap-0"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{ willChange: 'transform' }}
          >
            {TICKER_ITEMS.map((item, i) => (
              <div key={i} className="flex items-center shrink-0">
                {/* İtem */}
                <div className="flex items-center gap-2.5 px-7 py-3.5 group cursor-default">
                  {item.img ? (
                    <img
                      src={item.img}
                      alt={item.text}
                      className="w-4 h-4 object-contain shrink-0"
                      style={{ mixBlendMode: 'screen', filter: 'brightness(1.3) contrast(1.1) drop-shadow(0 0 3px rgba(139,92,246,0.4))' }}
                      aria-hidden="true"
                    />
                  ) : (
                    <span className="text-[0.95rem] leading-none shrink-0" aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  <span
                    className="text-[0.78rem] font-semibold tracking-[0.07em] uppercase whitespace-nowrap transition-colors duration-200"
                    style={{ color: 'rgba(200,190,240,0.55)' }}
                  >
                    {item.text}
                  </span>
                </div>
                {/* Ayırıcı */}
                <div className="flex items-center shrink-0 gap-1.5 px-1">
                  <div className="w-px h-3.5" style={{ background: 'rgba(139,92,246,0.2)' }} />
                  <div className="w-1 h-1 rotate-45" style={{ background: 'rgba(139,92,246,0.35)' }} aria-hidden="true" />
                  <div className="w-px h-3.5" style={{ background: 'rgba(139,92,246,0.2)' }} />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <OkcuModal isOpen={okcuOpen} onClose={() => setOkcuOpen(false)} />
      <AsasModal isOpen={asasOpen} onClose={() => setAsasOpen(false)} />
    </>
  )
}
