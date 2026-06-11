import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Bell, Clock, Eye } from 'lucide-react'

interface AnnouncementDetail {
  id: string
  title: string
  category: string
  date: string
  content: string
  imageUrl: string | null
  readCount: string
}

const CATEGORY_STYLES: Record<string, { bg: string; border: string; text: string; dot: string; label: string }> = {
  GÜNCELLEME:   { bg: 'rgba(245,158,11,0.10)', border: 'rgba(245,158,11,0.3)', text: 'rgba(251,191,36,0.95)', dot: '#f59e0b', label: 'Güncelleme' },
  'PATCH NOTES':{ bg: 'rgba(245,158,11,0.10)', border: 'rgba(245,158,11,0.3)', text: 'rgba(251,191,36,0.95)', dot: '#f59e0b', label: 'Güncelleme' },
  ETKİNLİK:    { bg: 'rgba(34,197,94,0.10)',  border: 'rgba(34,197,94,0.3)',  text: 'rgba(74,222,128,0.95)', dot: '#22c55e', label: 'Etkinlik'   },
  DUYURU:       { bg: 'rgba(239,68,68,0.10)',  border: 'rgba(239,68,68,0.3)',  text: 'rgba(248,113,113,0.95)',dot: '#ef4444', label: 'Duyuru'     },
}

function getCatStyle(cat: string) {
  return CATEGORY_STYLES[cat] ?? CATEGORY_STYLES['DUYURU']
}

async function getDetail(id: string): Promise<AnnouncementDetail | null> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  try {
    const res = await fetch(`${base}/api/announcements/${id}`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params
  const detail = await getDetail(id)
  return {
    title: detail?.title ?? 'Duyuru',
    description: detail?.title ?? 'Knight Online duyurusu',
  }
}

export default async function DuyuruDetayPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const detail = await getDetail(id)
  if (!detail) notFound()

  const style = getCatStyle(detail.category)

  return (
    <main
      className="min-h-screen pt-24 pb-16 px-4 md:px-8"
      style={{ background: '#07070B' }}
    >
      {/* Arka plan parıltısı */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 50% 40% at 20% 10%, rgba(245,158,11,0.05) 0%, transparent 60%),
          radial-gradient(ellipse 40% 50% at 80% 90%, rgba(245,158,11,0.03) 0%, transparent 55%)
        `
      }} />

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* Geri butonu */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-8 text-white/40 hover:text-white transition-colors duration-200 group"
        >
          <ArrowLeft
            size={15}
            className="group-hover:-translate-x-0.5 transition-transform duration-200"
          />
          <span className="text-[0.78rem] font-medium tracking-[0.06em]">Ana Sayfaya Dön</span>
        </Link>

        {/* Üst accent çizgisi */}
        <div
          className="h-px w-full mb-8"
          style={{ background: `linear-gradient(90deg, ${style.dot}88, transparent)` }}
        />

        {/* Kategori + tarih */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.65rem] font-bold tracking-[0.1em] rounded-sm"
            style={{ background: style.bg, color: style.text, border: `1px solid ${style.border}` }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: style.dot }} />
            {style.label}
          </span>

          {detail.readCount && (
            <span className="flex items-center gap-1 text-[0.65rem]" style={{ color: 'rgba(255,255,255,0.25)' }}>
              <Eye size={11} />
              {detail.readCount} okunma
            </span>
          )}

          <span className="flex items-center gap-1 text-[0.65rem]" style={{ color: 'rgba(255,255,255,0.25)' }}>
            <Clock size={11} />
            Knight Online
          </span>
        </div>

        {/* Başlık */}
        <h1
          className="text-2xl md:text-3xl font-bold leading-snug mb-8"
          style={{ color: 'rgba(255,255,255,0.92)' }}
        >
          {/* [TAG] prefix'ini gizle */}
          {detail.title.replace(/^\[[^\]]+\]\s*/, '')}
        </h1>

        {/* İçerik */}
        <div
          className="announcement-content prose-invert"
          dangerouslySetInnerHTML={{ __html: detail.content }}
        />

        {/* Alt çizgi */}
        <div
          className="h-px w-full mt-12 mb-8"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        />

        {/* Geri dön linki */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/35 hover:text-white transition-colors duration-200 group text-[0.8rem]"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
            Ana Sayfaya Dön
          </Link>

          <div className="flex items-center gap-1.5 text-[0.62rem]" style={{ color: 'rgba(255,255,255,0.18)' }}>
            <Bell size={10} />
            Kaynak: nttgame.com
          </div>
        </div>
      </div>
    </main>
  )
}
