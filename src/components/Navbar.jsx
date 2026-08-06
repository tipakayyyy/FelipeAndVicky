import { useState } from 'react'
import { COUPLE } from '../constants'
import { MenuIcon, CloseIcon } from './icons.jsx'
import MusicPlayer from './MusicPlayer.jsx' // 👈 1. Importamos el reproductor aquí

// 1. Lista de opciones del menú (sin la opción "Música")
const LINKS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'historia', label: 'Historia' },
  { id: 'gran-dia', label: 'El gran día' },
  { id: 'galeria', label: 'Galería' },
  { id: 'asistencia', label: 'Asistencia' },
  { id: 'informacion', label: 'Regalos' },
]

export default function Navbar({ activeSection }) {
  const [open, setOpen] = useState(false)

  const handleNavigate = (id) => {
    setOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Navegación lateral fija — solo desktop */}
      <nav className="side-nav" aria-label="Navegación principal">
        <button
          className="side-nav-logo"
          onClick={() => handleNavigate('inicio')}
          aria-label="Ir al inicio"
        >
          {COUPLE.initials}
        </button>

        <ol className="side-nav-links">
          {LINKS.map((link, i) => (
            <li key={link.id}>
              <button
                className={
                  'side-nav-link' + (activeSection === link.id ? ' is-active' : '')
                }
                onClick={() => handleNavigate(link.id)}
              >
                <span className="side-nav-index">
                  {String(i + 1).padStart(2, '0')}
                  <span className="side-nav-dot" aria-hidden="true" />
                </span>
                <span className="side-nav-label">{link.label}</span>
              </button>
            </li>
          ))}
        </ol>
      </nav>

      {/* Navegación móvil — hamburguesa */}
      <nav className="mobile-nav">
        <button
          className="mobile-nav-logo"
          onClick={() => handleNavigate('inicio')}
          aria-label="Ir al inicio"
        >
          {COUPLE.initials}
        </button>

        <button
          className="navbar-burger"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          {open ? <CloseIcon width="20" height="20" /> : <MenuIcon width="20" height="20" />}
        </button>
      </nav>

      {/* Fondo transparente para cerrar el menú al hacer clic en cualquier otra parte */}
      {open && (
        <div 
          className="navbar-backdrop"
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 40,
            backgroundColor: 'rgba(0, 0, 0, 0.3)'
          }}
        />
      )}

      {/* Menú móvil desplegable */}
      {open && (
        <div className="navbar-mobile-menu" style={{ zIndex: 50 }}>
          {LINKS.map((link, i) => (
            <button
              key={link.id}
              className={
                'navbar-mobile-link' + (activeSection === link.id ? ' is-active' : '')
              }
              onClick={() => handleNavigate(link.id)}
            >
              <span style={{ opacity: 0.6, marginRight: '10px' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              {link.label}
            </button>
          ))}
        </div>
      )}

      {/* 🎵 2. AHORA SÍ: El reproductor se renderiza de forma independiente */}
      <MusicPlayer />
    </>
  )
}
