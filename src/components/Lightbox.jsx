import { useEffect, useCallback } from 'react'
import { CloseIcon, ChevronLeft, ChevronRight } from './icons.jsx'

export default function Lightbox({ items, activeIndex, onClose, onNavigate }) {
  const item = items[activeIndex]

  const goPrev = useCallback(() => {
    if (activeIndex > 0) onNavigate(activeIndex - 1)
  }, [activeIndex, onNavigate])

  const goNext = useCallback(() => {
    if (activeIndex < items.length - 1) onNavigate(activeIndex + 1)
  }, [activeIndex, items.length, onNavigate])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, goPrev, goNext])

  if (!item) return null

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Cerrar">
        <CloseIcon width="16" height="16" />
      </button>

      {activeIndex > 0 && (
        <button
          className="lightbox-nav lightbox-prev"
          onClick={(e) => { e.stopPropagation(); goPrev() }}
          aria-label="Foto anterior"
        >
          <ChevronLeft width="20" height="20" />
        </button>
      )}

      {activeIndex < items.length - 1 && (
        <button
          className="lightbox-nav lightbox-next"
          onClick={(e) => { e.stopPropagation(); goNext() }}
          aria-label="Foto siguiente"
        >
          <ChevronRight width="20" height="20" />
        </button>
      )}

      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        {item.media_type === 'video' ? (
          <video src={item.media_url} controls autoPlay playsInline />
        ) : (
          <img src={item.media_url} alt={item.caption || `Foto de ${item.name}`} />
        )}

        <div className="lightbox-info">
          {item.caption && <span className="lightbox-caption">{item.caption}</span>}
          <span className="lightbox-name">— {item.name}</span>
        </div>
      </div>
    </div>
  )
}
