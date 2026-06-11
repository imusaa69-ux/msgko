import { NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

export const revalidate = 3600

const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8',
}

export interface AnnouncementDetail {
  id: string
  title: string
  category: string
  date: string
  content: string   // ham HTML içerik
  imageUrl: string | null
  readCount: string
}

function extractCategory(title: string): string {
  const m = title.match(/^\[([^\]]+)\]/)
  if (!m) return 'ETKİNLİK'
  const raw = m[1].toUpperCase()
  if (raw.includes('GÜNCELLEME') || raw.includes('PATCH') || raw.includes('UPDATE')) return 'GÜNCELLEME'
  if (raw.includes('ETKİNLİK') || raw.includes('EVENT')) return 'ETKİNLİK'
  if (raw.includes('DUYURU') || raw.includes('ANNOUNCEMENT')) return 'DUYURU'
  return raw
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ error: 'Geçersiz ID' }, { status: 400 })
  }

  // Önce Türkçe dene, yoksa İngilizce
  const urls = [
    `https://www.nttgameonline.com/knight/tr/news/news_detail/${id}/1`,
    `https://www.nttgameonline.com/knight/en/news/news_detail/${id}/1`,
  ]

  let html: string | null = null
  for (const url of urls) {
    try {
      const res = await fetch(url, {
        headers: HEADERS,
        signal: AbortSignal.timeout(8000),
        next: { revalidate: 3600 },
      })
      if (!res.ok) continue
      const buf = await res.arrayBuffer()
      const text = new TextDecoder('utf-8').decode(buf)
      if (text.includes('Just a moment') || text.includes('_cf_chl_opt')) continue
      html = text
      break
    } catch { continue }
  }

  if (!html) {
    return NextResponse.json({ error: 'Duyuru bulunamadı.' }, { status: 404 })
  }

  const $ = cheerio.load(html)

  const title = $('li.title').first().text().trim()
  const readCount = $('li.count').text().replace('Okundu :', '').replace('Read :', '').trim()

  // Ana içerik
  const $contentEl = $('p.news_detail_article')

  // Tüm dış linkleri kendi domaine göre düzenle — nttgameonline.com linklerini iç route'a çevir
  $contentEl.find('a[href]').each((_, el) => {
    const $a = $(el)
    const href = $a.attr('href') ?? ''
    const m = href.match(/news_detail\/(\d+)/)
    if (m) {
      $a.attr('href', `/duyurular/${m[1]}`)
      $a.removeAttr('target')
    } else if (href.startsWith('http') && !href.includes('msgko')) {
      $a.attr('target', '_blank')
      $a.attr('rel', 'noopener noreferrer')
    }
  })

  // İçerikteki görsellerin src'lerini doğrudan kullan (nttgame CDN'i public)
  $contentEl.find('img').each((_, el) => {
    const $img = $(el)
    const src = $img.attr('src') ?? ''
    if (src && !src.startsWith('http')) {
      $img.attr('src', `https://image.nttgame.com${src}`)
    }
  })

  const content = $contentEl.html() ?? ''

  // İlk görsel
  const firstImg = $contentEl.find('img').first().attr('src') ?? null

  return NextResponse.json({
    id,
    title,
    category: extractCategory(title),
    date: new Date().toISOString(), // liste sayfasından gelecek, burada placeholder
    content,
    imageUrl: firstImg,
    readCount,
  } satisfies AnnouncementDetail, {
    headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
  })
}
