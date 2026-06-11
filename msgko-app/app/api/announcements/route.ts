import { NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

export const revalidate = 3600

export interface Announcement {
  id: string            // news_detail ID, örn. "1353"
  title: string
  category: string
  date: string          // ISO 8601
  summary: string
  sourceUrl: string     // orijinal nttgameonline.com URL'si (kullanılmaz — iç rotaya yönlendiriyoruz)
  thumbnailUrl: string | null
}

const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
  'Accept-Charset': 'utf-8',
}

const MORE_PAGES = 4

const MONTH_MAP: Record<string, number> = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
  jan: 0, feb: 1, mar: 2, apr: 3, jun: 5, jul: 6, aug: 7,
  sep: 8, oct: 9, nov: 10, dec: 11,
  // Türkçe ay adları (site bazen Türkçe verebilir)
  ocak: 0, şubat: 1, mart: 2, nisan: 3, mayıs: 4, haziran: 5,
  temmuz: 6, ağustos: 7, eylül: 8, ekim: 9, kasım: 10, aralık: 11,
}

function buildDate(day: string, month: string): string {
  const d = parseInt(day, 10)
  const m = MONTH_MAP[month.toLowerCase().replace('ı', 'i').replace('ş', 's').replace('ğ', 'g')] ?? 0
  const now = new Date()
  let year = now.getFullYear()
  const candidate = new Date(year, m, d)
  if (candidate > now) year -= 1
  return new Date(year, m, d).toISOString()
}

function isWithin3Months(isoDate: string): boolean {
  const date = new Date(isoDate)
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - 90)
  return date >= cutoff
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

function extractId(url: string): string {
  // https://www.nttgameonline.com/knight/tr/news/news_detail/1353/1 → "1353"
  const m = url.match(/news_detail\/(\d+)/)
  return m ? m[1] : url
}

function extractSourceUrl(onclick: string): string | null {
  const m = onclick.match(/window\.location\.href\s*=\s*['"]([^'"]+)['"]/)
  return m ? m[1] : null
}

function parseNewsHtml(html: string): Announcement[] {
  const $ = cheerio.load(html)
  const items: Announcement[] = []

  $('dl.news_list').each((_, el) => {
    const $dl = $(el)

    const day   = $dl.find('dt.date span.day').text().trim()
    const month = $dl.find('dt.date span.month').text().trim()
    const isoDate = day && month ? buildDate(day, month) : new Date().toISOString()
    if (!isWithin3Months(isoDate)) return

    const onclick = $dl.attr('onclick') ?? ''
    const sourceUrl = extractSourceUrl(onclick) ?? ''
    if (!sourceUrl) return

    const id = extractId(sourceUrl)
    const title = $dl.find('li.title').text().trim()
    if (!title) return

    const summary = $dl.find('li.article').text().trim().slice(0, 300)
    const category = extractCategory(title)

    items.push({ id, title, category, date: isoDate, summary, sourceUrl, thumbnailUrl: null })
  })

  return items
}

async function fetchHtml(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: HEADERS,
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    // UTF-8 olarak doğru decode et
    const buf = await res.arrayBuffer()
    const html = new TextDecoder('utf-8').decode(buf)
    if (html.includes('Just a moment') || html.includes('_cf_chl_opt')) return null
    return html
  } catch {
    return null
  }
}

export async function GET() {
  // Türkçe haber sayfası
  const mainHtml = await fetchHtml('https://www.nttgameonline.com/knight/tr/news')
  if (!mainHtml) {
    return NextResponse.json({ error: 'Duyurular şu anda alınamıyor.' }, { status: 503 })
  }

  const all: Announcement[] = parseNewsHtml(mainHtml)

  for (let page = 2; page <= MORE_PAGES + 1; page++) {
    const moreHtml = await fetchHtml(
      `https://www.nttgameonline.com/knight/tr/news/getmoreNews/${page}`
    )
    if (!moreHtml) break
    const moreItems = parseNewsHtml(moreHtml)
    if (moreItems.length === 0) break
    all.push(...moreItems)
    const oldest = moreItems.at(-1)
    if (oldest && !isWithin3Months(oldest.date)) break
  }

  if (all.length === 0) return NextResponse.json([], { status: 200 })

  all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const seen = new Set<string>()
  const unique = all.filter(item => {
    if (seen.has(item.id)) return false
    seen.add(item.id)
    return true
  })

  return NextResponse.json(unique, {
    headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
  })
}
