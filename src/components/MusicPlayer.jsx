import { useState, useRef } from 'react'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

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

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 999999, /* Fuerza a que flotará por encima de TODO */
      }}
    >
      {/* 🎵 Tu archivo de música en public/cancion.mp3 */}
      <audio ref={audioRef} src="/cancion.mp3" loop />

      <button
        onClick={togglePlay}
        type="button"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#3d0d0b',
          color: '#f9f6f0',
          border: '1.5px solid #e2c994',
          padding: '12px 20px',
          borderRadius: '50px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600',
        }}
      >
        <span style={{ fontSize: '16px' }}>{isPlaying ? '⏸' : '🎵'}</span>
        <span>{isPlaying ? 'Pausar música' : 'Música'}</span>
      </button>
    </div>
  )
}