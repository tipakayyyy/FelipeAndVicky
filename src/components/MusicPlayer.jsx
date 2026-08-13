import React, { useState, useRef } from 'react'

export default function MusicPlayer({ audioSrc = '/photos/musica.mp3' }) {
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
        .catch((error) => console.log('Error al reproducir audio:', error))
    }
  }

  return (
    <>
      <audio ref={audioRef} src={audioSrc} loop preload="auto" />

      <button
        type="button"
        className={`music-btn-clean ${isPlaying ? 'is-playing' : ''}`}
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
      >
        <style>{`
          .music-btn-clean {
            position: fixed !important;
            bottom: 20px !important;
            right: 20px !important;
            z-index: 99999 !important;
            width: 46px !important;
            height: 46px !important;
            border-radius: 50% !important;
            background-color: #f2efda !important;
            border: 1.5px solid #C6A15B !important;
            color: #C6A15B !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            margin: 0 !important;
            padding: 0 !important;
            outline: none !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25) !important;
            -webkit-tap-highlight-color: transparent !important;
            -webkit-appearance: none !important;

            /* 🛡️ ELIMINA EL BUG DE WEBKIT EN IPHONE */
            transform: none !important;
            transition: background-color 0.2s ease, color 0.2s ease !important;
          }

          /* 🖱️ SOLO aplica hover en computadoras con mouse (Ignorado en celulares) */
          @media (hover: hover) and (pointer: fine) {
            .music-btn-clean:hover {
              background-color: #6B1F2A !important;
              color: #FDF8F4 !important;
            }
          }

          /* Estado cuando la música está sonando */
          .music-btn-clean.is-playing {
            background-color: #2e482f !important;
            color: #FAF7F2 !important;
          }

          .music-btn-icon {
            font-size: 1.05rem;
            line-height: 1;
            pointer-events: none;
          }
        `}</style>

        <span className="music-btn-icon">
          {isPlaying ? '⏸' : '🎵'}
        </span>
      </button>
    </>
  )
}