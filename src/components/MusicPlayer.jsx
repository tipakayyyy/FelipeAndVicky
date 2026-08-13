import React, { useState, useRef } from 'react'

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
        .catch(() => {})
    }
  }

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 999999 }}>
      <audio ref={audioRef} src="/photos/musica.mp3" loop preload="auto" />
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: isPlaying ? '#162C22' : '#F6F1E8',
          color: isPlaying ? '#DFC38A' : '#162C22',
          border: '2px solid #DFC38A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '20px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
          outline: 'none',
          padding: 0,
          margin: 0
        }}
      >
        {isPlaying ? '⏸' : '🎵'}
      </button>
    </div>
  )
}