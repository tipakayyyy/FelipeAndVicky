import React, { useState, useEffect, useRef } from 'react'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    // Intenta iniciar la música al primer toque en cualquier parte de la pantalla
    const handleFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Si el navegador bloquea el auto-play, el invitado usará el botón directo
          })
      }
    }

    window.addEventListener('click', handleFirstInteraction, { once: true })
    window.addEventListener('touchstart', handleFirstInteraction, { once: true })

    return () => {
      window.removeEventListener('click', handleFirstInteraction)
      window.removeEventListener('touchstart', handleFirstInteraction)
    }
  }, [])

  const togglePlay = (e) => {
    e.stopPropagation()
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Error de reproducción:', err))
    }
  }

  // Estilos base compartidos
  const buttonStyle = {
    // Estructura (Círculo perfecto)
    borderRadius: '50%',
    width: '54px',
    height: '54px',
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
    // Interacción
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    outline: 'none',

    // --- ESTÉTICA CLARA Y DORADA (El gran cambio) ---
    // Sombra más suave para fondo claro
    boxShadow: isPlaying 
      ? '0 6px 20px rgba(212, 163, 115, 0.4)' 
      : '0 6px 16px rgba(0, 0, 0, 0.08)',
    
    // Estado: Pausado (Color Claro) vs Reproduciendo (Invertido)
    backgroundColor: isPlaying ? '#d4a373' : '#ffffff', // Fondo: Dorado al reproducir, Blanco al pausar
    color: isPlaying ? '#ffffff' : '#d4a373',            // Icono: Blanco al reproducir, Dorado al pausar
    border: isPlaying ? 'none' : '2px solid #e3dad1',   // Borde muy suave solo cuando está pausado
  }

  return (
    <>
      <audio ref={audioRef} src="/photos/musica.mp3" loop preload="auto" />

      {/* Botón flotante MINIMALISTA */}
      <div style={{ position: 'fixed', bottom: '25px', right: '25px', zIndex: 9999 }}>
        <button
          onClick={togglePlay}
          // aria-label sigue siendo necesario para accesibilidad aunque no tenga texto visual
          aria-label={isPlaying ? "Pausar música de fondo" : "Reproducir música de fondo"}
          style={buttonStyle}
        >
          {/* ÚNICAMENTE EL SÍMBOLO, MÁS GRANDE Y CENTRADO */}
          <span style={{ fontSize: '1.5rem', display: 'flex', marginTop: '1px' }}>
            {isPlaying ? '⏸️' : '🎵'}
          </span>
        </button>
      </div>
    </>
  )
}
