import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [mounted, setMounted] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Error al reproducir audio:', err))
    }
  }

  if (!mounted) return null

  return createPortal(
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 99999999,
      }}
    >
      <audio ref={audioRef} src="/photos/musica.mp3" loop />

      <button
        onClick={togglePlay}
        type="button"
        aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
        title={isPlaying ? 'Pausar música' : 'Reproducir música'}
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          backgroundColor: '#3d0d0b',
          color: '#e2c994',
          border: '2px solid #e2c994',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
          transition: 'transform 0.2s ease, background-color 0.2s ease',
          outline: 'none',
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.92)')}
        onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {isPlaying ? (
          /* ⏸️ Ícono de Pausa */
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          /* 🎵 / ▶️ Ícono de Play / Nota Musical para Reproducir o Reanudar */
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        )}
      </button>
    </div>,
    document.body
  )
}