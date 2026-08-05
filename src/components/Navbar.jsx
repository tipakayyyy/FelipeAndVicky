import { useState } from 'react'
import { COUPLE } from '../constants'
import { MenuIcon, CloseIcon } from './icons.jsx'

const LINKS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'historia', label: 'Historia' },
  { id: 'gran-dia', label: 'El gran día' },
  { id: 'galeria', label: 'Galería' },
  { id: 'musica', label: 'Música' },
  { id: 'asistencia', label: 'Asistencia' },
  { id: 'informacion', label: 'Regalos' },
]

export default function Navbar({ activeSection }) {
  const [open, setOpen] = useState(false)

  const handleNavigate = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
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

      {open && (
        <div className="navbar-mobile-menu">
          {LINKS.map((link) => (
            <button
              key={link.id}
              className={
                'navbar-mobile-link' + (activeSection === link.id ? ' is-active' : '')
              }
              onClick={() => handleNavigate(link.id)}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </>
  )
}
