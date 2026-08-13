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
            z-index: 9999;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background-color: #f2efda; /* Beige / Crema */
            border: 1px solid #C6A15B; /* Borde dorado fino */
            color: #C6A15B;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
            margin: 0;
            padding: 0;
            outline: none;
            -webkit-appearance: none;
            
            /* 🛡️ CORRECCIÓN CLAVE PARA MÓVILES (WEBKIT):
               Evita el desfasamiento y renderizado en doble capa */
            isolation: isolate;
            transform: translateZ(0);
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            box-sizing: border-box;
            transition: background-color 300ms ease, transform 300ms ease, box-shadow 300ms ease;
          }

          /* Efecto Hover solo en computadoras (para evitar bugs de toque en móviles) */
          @media (hover: hover) {
            .music-player-btn:hover {
              transform: scale(1.08) translateZ(0);
              background-color: #6B1F2A; /* Vino al pasar el mouse */
              border-color: #C6A15B;
              color: #FDF8F4;
            }
          }

          /* Estado de toque en celular */
          .music-player-btn:active {
            transform: scale(0.95) translateZ(0);
          }

          /* Estado cuando está sonando la música */
          .music-player-btn.playing {
            background-color: #2e482f; /* Verde bosque */
            color: #FAF7F2;
            box-shadow: 0 0 0 3px rgba(198, 161, 91, 0.3), 0 6px 20px rgba(0, 0, 0, 0.3);
          }

          /* Microinteracción de la nota musical */
          .music-icon {
            font-size: 1.15rem;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            line-height: 1;
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
              transform: scale(1.15) rotate(10deg);
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