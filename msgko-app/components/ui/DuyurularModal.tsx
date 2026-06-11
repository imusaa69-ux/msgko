'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowLeft, ExternalLink, RefreshCw, AlertCircle, Bell } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Announcement {
  id: string
  title: string
  category: string
  date: string
  summary: string
  sourceUrl: string
  thumbnailUrl: string | null
}

interface DuyurularModalProps {
  isOpen: boolean
  onClose: () => void
}

const CATEGORY_STYLES: Record<string, { bg: string; border: string; text: string; dot: string; label: string }> = {
  GÜNCELLEME:    { bg: 'rgba(245,158,11,0.10)', border: 'rgba(245,158,11,0.25)', text: 'rgba(251,191,36,0.95)', dot: '#f59e0b', label: 'Güncelleme' },
  'PATCH NOTES': { bg: 'rgba(245,158,11,0.10)', border: 'rgba(245,158,11,0.25)', text: 'rgba(251,191,36,0.95)', dot: '#f59e0b', label: 'Güncelleme' },
  ETKİNLİK:     { bg: 'rgba(34,197,94,0.10)',  border: 'rgba(34,197,94,0.25)',  text: 'rgba(74,222,128,0.95)', dot: '#22c55e', label: 'Etkinlik'   },
  DUYURU:        { bg: 'rgba(239,68,68,0.10)',  border: 'rgba(239,68,68,0.25)',  text: 'rgba(248,113,113,0.95)',dot: '#ef4444', label: 'Duyuru'     },
}

function getCatStyle(cat: string) {
  return CATEGORY_STYLES[cat] ?? CATEGORY_STYLES['DUYURU']
}

function formatDateTR(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('tr-TR', {
      day: 'numeric', month: 'long', year: 'numeric',
    })
  } catch { return iso }
}

function SkeletonCard() {
  return (
    <div className="p-5 rounded-lg border border-white/[0.05]"
      style={{ background: 'rgba(255,255,255,0.02)' }}>
      <div className="flex gap-4">
        <div className="flex-1 space-y-2.5">
          <div className="h-5 w-20 rounded-full animate-pulse" style={{ background: 'rgba(255,255,255,0.07)' }} />
          <div className="h-5 w-full rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.05)' }} />
          <div className="h-4 w-4/5 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.04)' }} />
          <div className="h-3 w-28 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.03)' }} />
        </div>
        <div className="w-24 h-16 rounded flex-shrink-0 animate-pulse" style={{ background: 'rgba(255,255,255,0.04)' }} />
      </div>
    </div>
  )
}

export function DuyurularModal({ isOpen, onClose }: DuyurularModalProps) {
  const router = useRouter()
  const [items, setItems]     = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(false)
  const [filter, setFilter]   = useState<string>('ALL')

  const fetchData = () => {
    setLoading(true)
    setError(false)
    fetch('/api/announcements')
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then((data: Announcement[]) => { setItems(data); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }

  useEffect(() => {
    if (isOpen) fetchData()
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (isOpen) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const cats = ['ALL', ...Array.from(new Set(items.map(i => i.category))).filter(Boolean)]
  const filtered = filter === 'ALL' ? items : items.filter(i => i.category === filter)

  const handleCardClick = (id: string) => {
    onClose()
    router.push(`/duyurular/${id}`)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="duyurular-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[400] flex flex-col"
          style={{ background: '#07070B' }}
          role="dialog"
          aria-modal="true"
          aria-label="Duyurular"
        >
          {/* Arka plan parıltıları */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: `
              radial-gradient(ellipse 55% 45% at 15% 15%, rgba(245,158,11,0.07) 0%, transparent 60%),
              radial-gradient(ellipse 45% 55% at 85% 85%, rgba(245,158,11,0.04) 0%, transparent 55%)
            `
          }} />

          {/* Üst accent */}
          <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.7), rgba(251,191,36,0.4), transparent)' }}
          />

          {/* ── Header ── */}
          <motion.header
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5 flex-shrink-0"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          >
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 text-white/45 hover:text-white transition-colors duration-200 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
              <span className="text-[0.78rem] font-medium tracking-[0.06em]">Geri Dön</span>
            </button>

            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
              <p className="text-[0.58rem] font-bold tracking-[0.3em] uppercase mb-0.5"
                style={{ color: 'rgba(245,158,11,0.65)' }}>
                KNIGHT ONLINE
              </p>
              <h1 className="text-[1.05rem] font-black tracking-[0.14em] uppercase flex items-center gap-2.5"
                style={{ color: 'rgba(255,255,255,0.95)' }}>
                <Bell size={16} style={{ color: 'rgba(245,158,11,0.8)' }} />
                DUYURULAR
              </h1>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center border border-white/[0.08] text-white/40 hover:border-amber-500/40 hover:text-white hover:bg-amber-500/10 transition-all duration-200"
              aria-label="Kapat"
            >
              <X size={15} />
            </button>
          </motion.header>

          {/* ── Filtre şeridi ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-6 md:px-12 py-3 flex-shrink-0"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}
          >
            <p className="text-[0.65rem] tracking-[0.06em]" style={{ color: 'rgba(255,255,255,0.22)' }}>
              Son 3 ay · nttgame.com/knight
            </p>

            {!loading && !error && cats.length > 1 && (
              <div className="flex items-center gap-1.5">
                {cats.map((cat, ci) => {
                  const s = cat === 'ALL' ? null : getCatStyle(cat)
                  const active = filter === cat
                  return (
                    <button
                      key={`cat-${cat}-${ci}`}
                      type="button"
                      onClick={() => setFilter(cat)}
                      className="px-2.5 py-1 text-[0.62rem] font-bold tracking-[0.08em] uppercase transition-all duration-200"
                      style={{
                        background: active ? (s ? s.bg : 'rgba(255,255,255,0.07)') : 'transparent',
                        border: `1px solid ${active ? (s ? s.border : 'rgba(255,255,255,0.2)') : 'rgba(255,255,255,0.08)'}`,
                        color: active ? (s ? s.text : 'rgba(255,255,255,0.9)') : 'rgba(255,255,255,0.35)',
                      }}
                    >
                      {cat === 'ALL' ? 'Tümü' : getCatStyle(cat).label}
                    </button>
                  )
                })}
              </div>
            )}
          </motion.div>

          {/* ── İçerik ── */}
          <div className="relative z-10 flex-1 overflow-y-auto px-6 md:px-12 py-8">
            <div className="max-w-4xl mx-auto">

              {/* Yükleniyor */}
              {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
              )}

              {/* Hata */}
              {!loading && error && (
                <div className="flex flex-col items-center justify-center gap-5 py-24 text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)' }}>
                    <AlertCircle size={24} className="text-red-400/60" />
                  </div>
                  <div>
                    <p className="text-white/55 text-[0.9rem] font-semibold">Duyurular şu anda yüklenemiyor.</p>
                    <p className="text-white/22 text-[0.75rem] mt-1.5">Sunucuya ulaşılamıyor</p>
                  </div>
                  <button
                    type="button"
                    onClick={fetchData}
                    className="flex items-center gap-2 px-5 py-2.5 text-[0.75rem] font-semibold tracking-[0.07em] uppercase border border-amber-500/25 text-amber-400/60 hover:border-amber-500/55 hover:text-amber-300 hover:bg-amber-500/[0.07] transition-all duration-200"
                  >
                    <RefreshCw size={13} />
                    Tekrar Dene
                  </button>
                </div>
              )}

              {/* Boş */}
              {!loading && !error && filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-3 py-24">
                  <Bell size={32} className="text-white/12" />
                  <p className="text-white/28 text-[0.85rem]">Son 3 ayda yeni duyuru bulunamadı.</p>
                </div>
              )}

              {/* Kart grid */}
              {!loading && !error && filtered.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filtered.map((item, i) => {
                    const s = getCatStyle(item.category)
                    return (
                      <motion.button
                        key={`announcement-${item.id}-${i}`}
                        type="button"
                        onClick={() => handleCardClick(item.id)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 + i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        aria-label={item.title}
                        className="group flex gap-4 p-5 rounded-lg transition-all duration-250 cursor-pointer text-left w-full"
                        style={{
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                        }}
                        onMouseEnter={e => {
                          const el = e.currentTarget as HTMLElement
                          el.style.background = s.bg
                          el.style.borderColor = s.border
                          el.style.boxShadow = `0 8px 30px rgba(0,0,0,0.3), 0 0 0 1px ${s.border}`
                        }}
                        onMouseLeave={e => {
                          const el = e.currentTarget as HTMLElement
                          el.style.background = 'rgba(255,255,255,0.02)'
                          el.style.borderColor = 'rgba(255,255,255,0.06)'
                          el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)'
                        }}
                      >
                        {/* Sol — içerik */}
                        <div className="flex-1 min-w-0 flex flex-col gap-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[0.6rem] font-bold tracking-[0.1em] rounded-sm"
                              style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}` }}>
                              <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
                              {s.label}
                            </span>
                            <span className="text-[0.65rem]" style={{ color: 'rgba(180,180,200,0.28)' }}>
                              {formatDateTR(item.date)}
                            </span>
                          </div>

                          <p className="text-[0.88rem] font-semibold leading-snug line-clamp-2 group-hover:text-white transition-colors duration-150"
                            style={{ color: 'rgba(255,255,255,0.82)' }}>
                            {item.title.replace(/^\[[^\]]+\]\s*/, '')}
                          </p>

                          {item.summary && (
                            <p className="text-[0.75rem] leading-relaxed line-clamp-2"
                              style={{ color: 'rgba(180,180,200,0.38)' }}>
                              {item.summary}
                            </p>
                          )}

                          <div className="flex items-center gap-1 mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <ExternalLink size={11} style={{ color: s.dot }} />
                            <span className="text-[0.62rem] font-medium" style={{ color: s.text }}>
                              Devamını Oku
                            </span>
                          </div>
                        </div>

                        {/* Sağ — thumbnail veya icon */}
                        {item.thumbnailUrl ? (
                          <div className="flex-shrink-0 overflow-hidden rounded-sm"
                            style={{ width: '88px', height: '64px' }}>
                            <img
                              src={item.thumbnailUrl}
                              alt=""
                              aria-hidden="true"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                              style={{ filter: 'brightness(0.75) saturate(0.8)' }}
                            />
                          </div>
                        ) : (
                          <div className="flex-shrink-0 flex items-center justify-center rounded-sm"
                            style={{ width: '64px', height: '64px', background: s.bg, border: `1px solid ${s.border}` }}>
                            <Bell size={20} style={{ color: s.dot, opacity: 0.45 }} />
                          </div>
                        )}
                      </motion.button>
                    )
                  })}
                </div>
              )}

              {/* Alt kaynak notu */}
              {!loading && !error && filtered.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-10 flex flex-col items-center gap-4"
                >
                  <p className="text-[0.65rem] text-center" style={{ color: 'rgba(255,255,255,0.15)' }}>
                    Veriler nttgame.com&apos;dan otomatik güncellenir · Her 60 dakikada bir yenilenir
                  </p>
                </motion.div>
              )}

              <div className="h-12" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
