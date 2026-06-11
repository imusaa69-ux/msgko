'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, RefreshCw, AlertCircle, Bell } from 'lucide-react'

interface Announcement {
  title: string
  category: string
  date: string
  summary: string
  url: string
  thumbnailUrl: string | null
}

const CATEGORY_STYLES: Record<string, { bg: string; text: string; dot: string }> = {
  UPDATE:       { bg: 'rgba(245,158,11,0.15)',  text: 'rgba(251,191,36,0.9)',  dot: '#f59e0b' },
  EVENT:        { bg: 'rgba(34,197,94,0.12)',   text: 'rgba(74,222,128,0.9)',  dot: '#22c55e' },
  ANNOUNCEMENT: { bg: 'rgba(239,68,68,0.12)',   text: 'rgba(248,113,113,0.9)', dot: '#ef4444' },
  DUYURU:       { bg: 'rgba(148,163,184,0.1)',  text: 'rgba(148,163,184,0.8)', dot: '#94a3b8' },
}

function getCategoryStyle(cat: string) {
  return CATEGORY_STYLES[cat] ?? CATEGORY_STYLES['DUYURU']
}

function formatDateTR(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

function SkeletonCard() {
  return (
    <div className="px-5 py-4 border-b border-white/[0.04]">
      <div className="flex gap-3">
        <div className="flex-1 space-y-2">
          <div className="h-3 w-16 rounded-full animate-pulse" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <div className="h-4 w-full rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <div className="h-4 w-4/5 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.04)' }} />
          <div className="h-3 w-24 rounded animate-pulse mt-1" style={{ background: 'rgba(255,255,255,0.04)' }} />
        </div>
        <div className="w-16 h-12 rounded flex-shrink-0 animate-pulse" style={{ background: 'rgba(255,255,255,0.05)' }} />
      </div>
    </div>
  )
}

export function DuyurularPanel() {
  const [items, setItems] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchData = () => {
    setLoading(true)
    setError(false)
    fetch('/api/announcements')
      .then(r => {
        if (!r.ok) throw new Error()
        return r.json()
      })
      .then((data: Announcement[]) => {
        setItems(data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }

  useEffect(() => { fetchData() }, [])

  /* ── Yükleniyor ── */
  if (loading) return (
    <div className="flex flex-col">
      {Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  )

  /* ── Hata ── */
  if (error) return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 px-6 text-center">
      <div className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
        <AlertCircle size={22} className="text-red-400/70" />
      </div>
      <div>
        <p className="text-white/60 text-[0.82rem] font-medium">Duyurular şu anda yüklenemiyor.</p>
        <p className="text-white/25 text-[0.72rem] mt-1">Sunucuya ulaşılamıyor</p>
      </div>
      <button
        type="button"
        onClick={fetchData}
        className="flex items-center gap-2 px-4 py-2 text-[0.72rem] font-semibold tracking-[0.06em] uppercase transition-all duration-200 border border-amber-500/20 text-amber-400/60 hover:border-amber-500/50 hover:text-amber-300 hover:bg-amber-500/[0.06]"
      >
        <RefreshCw size={12} />
        Tekrar Dene
      </button>
    </div>
  )

  /* ── Boş ── */
  if (items.length === 0) return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 px-6 text-center">
      <Bell size={28} className="text-white/15" />
      <p className="text-white/35 text-[0.82rem]">Son 3 ayda yeni duyuru bulunamadı.</p>
    </div>
  )

  /* ── Liste ── */
  return (
    <div className="flex flex-col">
      {items.map((item, i) => {
        const style = getCategoryStyle(item.category)
        return (
          <motion.a
            key={`${item.url}-${i}`}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.28 }}
            aria-label={item.title}
            className="flex items-start gap-3 px-5 py-4 group transition-all duration-200 cursor-pointer border-b"
            style={{
              borderBottomColor: 'rgba(255,255,255,0.04)',
              background: 'transparent',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(245,158,11,0.03)'
              ;(e.currentTarget as HTMLElement).style.borderLeftColor = 'rgba(245,158,11,0.3)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'transparent'
              ;(e.currentTarget as HTMLElement).style.borderLeftColor = 'transparent'
            }}
          >
            {/* Sol — içerik */}
            <div className="flex-1 min-w-0">
              {/* Kategori badge */}
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[0.6rem] font-bold tracking-[0.1em] rounded-sm"
                  style={{ background: style.bg, color: style.text }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: style.dot }}
                  />
                  {item.category}
                </span>
                <span className="text-[0.65rem]" style={{ color: 'rgba(180,180,200,0.3)' }}>
                  {formatDateTR(item.date)}
                </span>
              </div>

              {/* Başlık */}
              <p
                className="text-[0.82rem] font-semibold leading-snug line-clamp-2 group-hover:text-white transition-colors duration-150"
                style={{ color: 'rgba(255,255,255,0.80)' }}
              >
                {/* [UPDATE] gibi prefix'i başlıktan gizle */}
                {item.title.replace(/^\[[^\]]+\]\s*/, '')}
              </p>

              {/* Özet */}
              {item.summary && (
                <p
                  className="text-[0.72rem] mt-1 line-clamp-2 leading-relaxed"
                  style={{ color: 'rgba(180,180,200,0.38)' }}
                >
                  {item.summary}
                </p>
              )}
            </div>

            {/* Sağ — thumbnail */}
            {item.thumbnailUrl ? (
              <div
                className="flex-shrink-0 overflow-hidden"
                style={{ width: '64px', height: '48px' }}
              >
                <img
                  src={item.thumbnailUrl}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  style={{ filter: 'brightness(0.8) saturate(0.9)' }}
                />
              </div>
            ) : (
              /* Thumbnail yoksa küçük ikon placeholder */
              <div
                className="flex-shrink-0 flex items-center justify-center"
                style={{
                  width: '48px',
                  height: '48px',
                  background: `${style.bg}`,
                  border: `1px solid ${style.dot}20`,
                }}
              >
                <Bell size={16} style={{ color: style.dot, opacity: 0.5 }} />
              </div>
            )}

            {/* Hover ok */}
            <ExternalLink
              size={12}
              className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-40 transition-opacity duration-200 text-amber-400"
            />
          </motion.a>
        )
      })}

      {/* Alt bilgi */}
      <div className="px-5 py-4 text-center">
        <p className="text-[0.65rem]" style={{ color: 'rgba(255,255,255,0.15)' }}>
          Veriler nttgame.com&apos;dan otomatik güncellenir · Her 60 dakikada bir
        </p>
      </div>
    </div>
  )
}
