import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [mounted, setMounted] = useState(false)
  const audioRef = useRef(null)

  // Nos aseguramos de que el navegador ya cargó el DOM
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

  // createPortal inyecta el botón directamente en el <body>
  return createPortal(
    <div
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 99999999,
      }}
    >
      <audio ref={audioRef} src="/cancion.mp3" loop />

      <button
        onClick={togglePlay}
        type="button"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: '#3d0d0b',
          color: '#f9f6f0',
          border: '2px solid #e2c994',
          padding: '14px 24px',
          borderRadius: '50px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          cursor: 'pointer',
          fontSize: '15px',
          fontWeight: 'bold',
        }}
      >
        <span>{isPlaying ? '⏸' : '🎵'}</span>
        <span>{isPlaying ? 'Pausar música' : 'Música'}</span>
      </button>
    </div>,
    document.body
  )
}