import React, { useState, useRef } from 'react'

export default function MusicPlayer({ audioSrc = '/photos//musica.mp3' }) {
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
        .then(() => {
          setIsPlaying(true)
        })
        .catch((error) => {
          console.log('Error al reproducir audio:', error)
        })
    }
  }

  return (
    <>
      {/* Archivo de audio de fondo */}
      <audio ref={audioRef} src={audioSrc} loop preload="auto" />

      {/* Botón flotante discreto */}
      <button
        className={`music-player-btn ${isPlaying ? 'playing' : ''}`}
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pausar música de fondo' : 'Reproducir música de fondo'}
        title={isPlaying ? 'Pausar música' : 'Reproducir música'}
      >
        <style>{`
          /* =========================================================
             REPRODUCTOR DE MÚSICA FLOTANTE EDITORIAL
          ========================================================= */
          .music-player-btn {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 999;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background-color: #f2efda; /* Verde bosque principal */
            border: 1px solid #C6A15B; /* Borde dorado fino */
            color: #C6A15B;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22);
            backdrop-filter: blur(8px);
            transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
          }

          .music-player-btn:hover {
            transform: scale(1.08);
            background-color: #6B1F2A; /* Acento vino al pasar el mouse */
            border-color: #C6A15B;
            color: #FDF8F4;
          }

          /* Estado cuando está sonando la música */
          .music-player-btn.playing {
            background-color: #2e482f;
            box-shadow: 0 0 0 4px rgba(198, 161, 91, 0.25), 0 8px 24px rgba(0, 0, 0, 0.25);
          }

          /* Microinteracción de la nota musical */
          .music-icon {
            font-size: 1.15rem;
            display: inline-block;
            transition: transform 300ms ease;
          }

          .music-player-btn.playing .music-icon {
            animation: musicPulse 2.5s infinite ease-in-out;
          }

          @keyframes musicPulse {
            0%, 100% {
              transform: scale(1) rotate(0deg);
            }
            50% {
              transform: scale(1.18) rotate(10deg);
            }
          }

          @media (max-width: 650px) {
            .music-player-btn {
              bottom: 20px;
              right: 20px;
              width: 44px;
              height: 44px;
            }
            .music-icon {
              font-size: 1rem;
            }
          }
        `}</style>

        <span className="music-icon">
          {isPlaying ? '⏸' : '🎵'}
        </span>
      </button>
    </>
  )
}