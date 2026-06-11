'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface YTVid {
  id: string
  title: string
  thumbnail: string
  duration: string
  publishedAt: string
  views: number
  youtubeUrl: string
  isShort?: boolean
}

function fmtDur(iso: string): string {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!m) return ''
  const h = parseInt(m[1] || '0'), mn = parseInt(m[2] || '0'), s = parseInt(m[3] || '0')
  return h > 0
    ? `${h}:${String(mn).padStart(2, '0')}:${String(s).padStart(2, '0')}`
    : `${mn}:${String(s).padStart(2, '0')}`
}

function fmtViews(n: number): string {
  if (n < 1000) return String(n)
  if (n < 1_000_000) return `${(n / 1000).toFixed(1)}B`
  return `${(n / 1_000_000).toFixed(1)}M`
}

type Tab = 'videos' | 'shorts'

export function YoutubePanel() {
  const [videos, setVideos] = useState<YTVid[]>([])
  const [shorts, setShorts] = useState<YTVid[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<Tab>('videos')

  useEffect(() => {
    fetch('/api/youtube?maxResults=20')
      .then(r => r.json())
      .then(d => {
        setVideos(d.videos ?? [])
        setShorts(d.shorts ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-40 gap-1.5">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-1 h-6 rounded-full"
          style={{ background: 'rgba(255,80,80,0.6)' }}
          animate={{ scaleY: [1, 2, 1] }}
          transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
        />
      ))}
    </div>
  )

  const activeList = tab === 'videos' ? videos : shorts
  const hasVideos = videos.length > 0
  const hasShorts = shorts.length > 0

  return (
    <div className="flex flex-col h-full">

      {/* Tab bar — sadece iki tip de varsa göster */}
      {(hasVideos || hasShorts) && (
        <div className="flex items-center gap-1 px-5 pt-1 pb-3"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <button
            type="button"
            onClick={() => setTab('videos')}
            className="relative flex items-center gap-1.5 px-3 py-1.5 text-[0.72rem] font-semibold tracking-[0.06em] uppercase transition-all duration-200"
            style={{ color: tab === 'videos' ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)' }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Videolar
            {hasVideos && (
              <span className="text-[0.6rem] px-1 py-0.5 rounded-sm"
                style={{ background: 'rgba(255,68,68,0.15)', color: 'rgba(255,120,120,0.7)' }}>
                {videos.length}
              </span>
            )}
            {tab === 'videos' && (
              <motion.div
                layoutId="yt-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                style={{ background: 'rgba(255,68,68,0.7)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>

          <button
            type="button"
            onClick={() => setTab('shorts')}
            className="relative flex items-center gap-1.5 px-3 py-1.5 text-[0.72rem] font-semibold tracking-[0.06em] uppercase transition-all duration-200"
            style={{ color: tab === 'shorts' ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)' }}
          >
            {/* Shorts ikonu */}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.77 10.32l-1.2-.5L18 9.06a3.74 3.74 0 0 0-3.5-6.06l-1.12.32.1-1.3a3.74 3.74 0 0 0-6.7-2.16L5.5 1.77l-.32-1.12A3.74 3.74 0 0 0-.06 4.15l.32 1.12L-.45 5a3.74 3.74 0 0 0 2.16 6.7l1.3-.1-.32 1.12a3.74 3.74 0 0 0 6.06 3.5l.76-1.44.5 1.2a3.74 3.74 0 0 0 6.7-2.16l-.1-1.3 1.12.32A3.74 3.74 0 0 0 19.8 8.5l-2.03 1.82zM10 14.5l-2-1.16V9.66L10 8.5l2 1.16v3.68L10 14.5z"/>
            </svg>
            Shorts
            {hasShorts && (
              <span className="text-[0.6rem] px-1 py-0.5 rounded-sm"
                style={{ background: 'rgba(255,68,68,0.15)', color: 'rgba(255,120,120,0.7)' }}>
                {shorts.length}
              </span>
            )}
            {tab === 'shorts' && (
              <motion.div
                layoutId="yt-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                style={{ background: 'rgba(255,68,68,0.7)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        </div>
      )}

      {/* Liste */}
      {activeList.length === 0 ? (
        <div className="flex items-center justify-center h-40">
          <p className="text-[0.82rem]" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {tab === 'shorts' ? 'Shorts bulunamadı' : 'Video bulunamadı'}
          </p>
        </div>
      ) : tab === 'shorts' ? (
        /* ── Shorts — 2 sütun grid, büyük thumbnail ── */
        <div className="grid grid-cols-2 gap-2 p-4">
          {activeList.map((v, i) => (
            <motion.a
              key={v.id}
              href={`https://www.youtube.com/shorts/${v.id}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              className="group flex flex-col overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Thumbnail — 16:9 tam genişlik */}
              <div className="relative w-full overflow-hidden bg-[#1a1a1a]"
                style={{ aspectRatio: '16/9' }}>
                {v.thumbnail ? (
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, #1a1a2e, #07070B)' }} />
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)' }} />
                {/* Shorts rozeti */}
                <div className="absolute top-1.5 left-1.5 flex items-center gap-1 px-1.5 py-0.5"
                  style={{ background: 'rgba(255,30,30,0.9)', backdropFilter: 'blur(4px)' }}>
                  <svg width="7" height="7" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  <span className="text-[0.52rem] font-bold tracking-wider text-white">SHORT</span>
                </div>
                {/* Görüntülenme */}
                {v.views > 0 && (
                  <span className="absolute bottom-1.5 right-1.5 text-[0.58rem] font-semibold text-white/70">
                    {fmtViews(v.views)}
                  </span>
                )}
              </div>
              {/* Başlık */}
              <div className="px-2 py-2">
                <p className="text-[0.72rem] font-medium leading-snug line-clamp-2 group-hover:text-white transition-colors duration-150"
                  style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {v.title}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      ) : (
        /* ── Videolar — yatay liste ── */
        <div className="flex flex-col">
          {activeList.map((v, i) => (
            <motion.a
              key={v.id}
              href={v.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              className="flex items-start gap-3 px-5 py-3.5 group transition-colors duration-150 hover:bg-white/[0.04]"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
            >
              {/* Thumbnail */}
              <div className="relative flex-shrink-0 overflow-hidden bg-[#1a1a1a]"
                style={{ width: '112px', aspectRatio: '16/9' }}>
                {v.thumbnail && (
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                {v.duration && (
                  <span className="absolute bottom-1 right-1 bg-black/90 text-white text-[0.58rem] font-bold px-1 py-0.5">
                    {fmtDur(v.duration)}
                  </span>
                )}
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-[0.8rem] font-medium leading-snug line-clamp-2 group-hover:text-white transition-colors duration-150"
                  style={{ color: 'rgba(255,255,255,0.8)' }}>
                  {v.title}
                </p>
                {v.views > 0 && (
                  <p className="text-[0.68rem] mt-1.5" style={{ color: 'rgba(180,180,200,0.35)' }}>
                    {fmtViews(v.views)} görüntülenme
                  </p>
                )}
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </div>
  )
}
