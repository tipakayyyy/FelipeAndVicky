import { useEffect, useRef, useState } from 'react'
import BotanicalCorner from '../BotanicalCorner.jsx'
import { COUPLE, COUPLE_PHOTOS } from '../../constants'
import { ChevronLeft, ChevronRight } from '../icons.jsx'

const AUTOPLAY_MS = 6000

export default function Home() {
  const photos = COUPLE_PHOTOS.hero.filter(Boolean)
  const hasPhotos = photos.length > 0
  const [index, setIndex] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => {
    if (!hasPhotos || photos.length < 2) return
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(timerRef.current)
  }, [hasPhotos, photos.length])

  const goTo = (i) => {
    clearInterval(timerRef.current)
    setIndex((i + photos.length) % photos.length)
  }

  const scrollToStory = () => {
    document.getElementById('historia')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="inicio" className="home-hero">
      {hasPhotos && (
        <div className="hero-carousel" aria-hidden="true">
          {photos.map((src, i) => (
            <div
              key={src}
              className={'hero-slide' + (i === index ? ' is-active' : '')}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
          <div className="hero-overlay" />
        </div>
      )}

      <BotanicalCorner className="botanical botanical-left" />
      <BotanicalCorner className="botanical botanical-right" flip />

      <div className="home-hero-inner">
        <div className="eyebrow">{COUPLE.dateShort}</div>
        <h1 className="home-title">
          Felipe<span className="amp script">&amp;</span>Victoria
        </h1>
        <p className="home-tagline script">Nos casamos</p>
        <div className="hero-rule" aria-hidden="true" />
        <p className="home-sub">Queremos compartir este día tan especial contigo.</p>
      </div>

      {hasPhotos && photos.length > 1 && (
        <div className="hero-arrows">
          <button className="hero-arrow" aria-label="Foto anterior" onClick={() => goTo(index - 1)}>
            <ChevronLeft width="20" height="20" />
          </button>
          <div className="hero-dots">
            {photos.map((src, i) => (
              <button
                key={src}
                className={'hero-dot' + (i === index ? ' is-active' : '')}
                aria-label={`Ir a la foto ${i + 1}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <button className="hero-arrow" aria-label="Foto siguiente" onClick={() => goTo(index + 1)}>
            <ChevronRight width="20" height="20" />
          </button>
        </div>
      )}

      <button className="hero-scroll-cue" aria-label="Ir a la siguiente sección" onClick={scrollToStory}>
        ↓
      </button>
    </section>
  )
}
