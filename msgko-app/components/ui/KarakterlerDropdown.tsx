'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { CokYakindaModal } from './CokYakindaModal'

const KARAKTERLER = [
  { label: 'Assassian', icon: null, img: '/assassian-icon.png' },
  { label: 'Archer',    icon: null, img: '/archer-icon.png' },
  { label: 'Priest',    icon: null, img: '/dreadshield.png' },
  { label: 'Magician',  icon: null, img: '/staffwoe.png' },
]

export function KarakterlerDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [activeKarakter, setActiveKarakter] = useState<{ label: string; icon: string; img: string | null } | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <>
      <div ref={ref} className="relative">
        {/* Trigger */}
        <button
          type="button"
          onClick={() => setDropdownOpen((p) => !p)}
          className="relative flex items-center gap-1 text-[0.85rem] font-medium tracking-[0.03em] pb-0.5 text-[#D8D8D8] hover:text-white transition-colors duration-200 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
        >
          Karakterler
          <ChevronDown
            size={13}
            className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
          />
          <span className="absolute -bottom-0.5 left-0 h-px bg-white w-0 group-hover:w-full transition-all duration-250" />
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-full left-0 mt-2 z-50 overflow-hidden"
              style={{
                minWidth: '180px',
                background: 'rgba(7,7,11,0.97)',
                border: '1px solid rgba(139,92,246,0.2)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.03), 0 16px 40px rgba(0,0,0,0.6)',
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)' }}
              />

              {KARAKTERLER.map((k, i) => (
                <button
                  key={k.label}
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false)
                    setActiveKarakter({ label: k.label, icon: k.icon ?? '', img: k.img })
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-[0.82rem] font-medium transition-colors duration-150 hover:bg-[#2A2A2A] group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
                  style={{
                    color: 'rgba(200,200,216,0.6)',
                    borderBottom: i < KARAKTERLER.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  }}
                >
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}>
                    {k.img ? (
                      <Image
                        src={k.img}
                        alt={k.label}
                        width={24}
                        height={24}
                        className="object-contain"
                        style={{ mixBlendMode: 'screen', filter: 'brightness(1.3) contrast(1.1) drop-shadow(0 0 6px rgba(139,92,246,0.4))' }}
                      />
                    ) : (
                      <span className="text-xs">{k.icon}</span>
                    )}
                  </div>
                  <span className="group-hover:text-white transition-colors">{k.label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <CokYakindaModal
        isOpen={activeKarakter !== null}
        onClose={() => setActiveKarakter(null)}
        title={activeKarakter?.label ?? ''}
        icon={activeKarakter?.icon ?? ''}
        img={activeKarakter?.img ?? null}
      />
    </>
  )
}
