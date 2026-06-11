'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FOOTER_COLUMNS, SOCIAL_LINKS } from '@/lib/data'

function SocialIcon({ platform }: { platform: string }) {
  switch (platform) {
    case 'youtube':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    case 'instagram':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      )
    default: return null
  }
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden" aria-label="Site footer">
      <div className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 80% at 10% 100%, rgba(139,92,246,0.06) 0%, transparent 50%),
            radial-gradient(ellipse 40% 60% at 90% 0%, rgba(236,72,153,0.04) 0%, transparent 50%),
            linear-gradient(180deg, #0E0E14 0%, #07070B 100%)
          `
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), rgba(236,72,153,0.4), transparent)' }}
      />

      <div className="relative max-w-[1280px] mx-auto px-8 pt-16 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-12 pb-14 border-b border-white/[0.05]">

          {/* Col 1 */}
          <div>
            <div className="mb-5">
              <Image
                src="/logo.png"
                alt="MSG"
                width={64}
                height={64}
                className="h-16 w-auto"
                style={{ mixBlendMode: 'screen' }}
              />

              <a
                href="https://msgko.net"
                className="inline-flex items-center gap-1.5 mt-1.5 group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="w-1 h-1 rounded-full bg-purple-500/50 group-hover:bg-purple-400/80 transition-colors duration-200" />
                <span className="text-[0.62rem] tracking-[0.1em] text-white/25 group-hover:text-purple-400/60 transition-colors duration-200">
                  msgko.net
                </span>
              </a>
            </div>
            <p className="text-[0.78rem] leading-[1.8] mb-6 max-w-[220px] text-white/40">
              Knight Online için asas ve okçu karakterlerine özel en kapsamlı eğitim videoları burada.
            </p>
            <div className="flex gap-2.5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 flex items-center justify-center border border-white/[0.07] bg-white/[0.02] text-white/40 hover:border-purple-500/40 hover:text-purple-400 hover:bg-purple-500/[0.08] transition-all duration-200"
                >
                  <SocialIcon platform={social.platform} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 & 3 */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-[0.72rem] font-bold tracking-[0.2em] uppercase mb-6 text-white/90">
                {col.heading}
              </h3>
              <nav className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="group flex items-center gap-2 text-[0.76rem] text-white/40 hover:text-white/90 transition-all duration-200 hover:pl-1"
                  >
                    <span className="w-1 h-1 rounded-full flex-shrink-0 bg-purple-500/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}

          {/* Col 4 */}
          <div>
            <h3 className="text-[0.72rem] font-bold tracking-[0.2em] uppercase mb-6 text-white/90">
              İLETİŞİM
            </h3>
            <p className="text-[0.76rem] leading-[1.8] mb-6 text-white/40">
              Bizimle iletişime geçmek için sosyal medya hesaplarımızdan bize ulaşabilirsiniz.
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href="https://www.instagram.com/msgclip"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between px-4 py-3 border border-purple-700/30 bg-purple-700/[0.05] hover:border-purple-500/60 hover:bg-purple-700/[0.12] transition-all duration-200"
                aria-label="Instagram"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-1 h-5" style={{ background: 'linear-gradient(180deg, #833ab4, #fd1d1d, #fcb045)' }} />
                  <span className="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-white">INSTAGRAM</span>
                </div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  className="text-white/40 group-hover:text-white/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">
                  <path d="M7 17L17 7M17 7H7M17 7v10"/>
                </svg>
              </a>

              <a
                href="mailto:imusaagll@gmail.com"
                className="group flex items-center justify-between px-4 py-3 border border-white/[0.06] bg-white/[0.02] hover:border-purple-500/30 hover:bg-purple-500/[0.05] transition-all duration-200"
                aria-label="Gmail"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-1 h-5" style={{ background: 'linear-gradient(180deg, #a78bfa, #7c3aed)' }} />
                  <span className="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-white">GMAİL</span>
                </div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  className="text-white/40 group-hover:text-white/70 transition-colors duration-200">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5">
          <div className="flex items-center gap-3">
            <p className="text-[0.68rem] tracking-[0.08em] text-white/[0.18]">
              © {new Date().getFullYear()} MSG Knight Online
            </p>
            <span className="text-white/[0.08]">·</span>
            <a
              href="https://msgko.net"
              className="text-[0.68rem] tracking-[0.06em] text-purple-500/40 hover:text-purple-400/70 transition-colors duration-200"
            >
              msgko.net
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500/70 animate-pulse" style={{ animationDuration: '3s' }} />
            <p className="text-[0.62rem] tracking-[0.1em] uppercase text-purple-500/50">Kiro.dev ile geliştirildi</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
