import React, { useState } from 'react'

const NAV_ITEMS = [
  {
    id: 'inicio',
    label: 'INICIO',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    )
  },
  {
    id: 'historia',
    label: 'NUESTRA HISTORIA',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    )
  },
  {
    id: 'galeria',
    label: 'GALERÍA',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
    )
  },
  {
    id: 'gran-dia',
    label: 'EL GRAN DÍA',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    )
  },
  {
    id: 'asistencia',
    label: 'RSVP',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    )
  },
  {
    id: 'informacion',
    label: 'REGALOS',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 12 20 22 4 22 4 12"/>
        <rect x="2" y="7" width="20" height="5"/>
        <line x1="12" y1="22" x2="12" y2="7"/>
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
      </svg>
    )
  }
]

export default function Navbar({ activeSection }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMobileOpen(false)
    }
  }

  return (
    <>
      <style>{`
        /* BARRA LATERAL RECTA Y FIJA (62px) */
        .sidebar-mockup-nav {
          position: fixed !important;
          left: 0 !important;
          top: 0 !important;
          height: 100vh !important;
          width: 62px !important;
          z-index: 1000 !important;
          background-color: #162C22;
          border-right: 1px solid rgba(198, 161, 91, 0.25);
          border-radius: 0 !important;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 14px 0 8px 0;
          box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
          user-select: none;
          overflow: hidden;
        }

        .sidebar-logo {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.25rem;
          font-weight: 600;
          color: #DFC38A;
          letter-spacing: 1.5px;
          cursor: pointer;
          transition: transform 200ms ease;
          padding-bottom: 2px;
        }

        .sidebar-logo:hover {
          transform: scale(1.06);
        }

        .sidebar-menu {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
          flex: 1;
          width: 100%;
          padding: 4px 0;
        }

        .sidebar-item {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          color: rgba(224, 215, 200, 0.6);
          transition: all 200ms ease;
          position: relative;
          width: 100%;
          padding: 2px 0;
        }

        .sidebar-item-icon {
          width: 15px;
          height: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sidebar-item-icon svg {
          width: 100%;
          height: 100%;
        }

        .sidebar-item-label {
          writing-mode: vertical-rl;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.52rem;
          letter-spacing: 1.8px;
          font-weight: 500;
          text-transform: uppercase;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .active-dot {
          width: 5px;
          height: 5px;
          background-color: #9B222A;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 6px rgba(155, 34, 42, 0.9);
        }

        .sidebar-item:hover {
          color: #DFC38A;
        }

        .sidebar-item.active {
          color: #F6F1E8;
        }

        .sidebar-botanical-bottom {
          width: 42px;
          height: 38px;
          opacity: 0.35;
          pointer-events: none;
          color: #DFC38A;
        }

        /* MENÚ MÓVIL */
        .mobile-nav-trigger {
          display: none;
          position: fixed;
          top: 16px;
          left: 16px;
          z-index: 1001;
          background-color: #162C22;
          border: 1px solid rgba(198, 161, 91, 0.35);
          color: #DFC38A;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 6px 18px rgba(0,0,0,0.2);
        }

        .mobile-menu-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background-color: rgba(22, 44, 34, 0.98);
          backdrop-filter: blur(12px);
          z-index: 1000;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 24px;
        }

        .mobile-menu-overlay.open {
          display: flex;
        }

        .mobile-nav-link {
          background: none;
          border: none;
          color: #E0D7C8;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.7rem;
          letter-spacing: 2px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: color 200ms ease;
        }

        .mobile-nav-link.active {
          color: #DFC38A;
        }

        @media (max-width: 900px) {
          .sidebar-mockup-nav {
            display: none !important;
          }
          .mobile-nav-trigger {
            display: flex;
          }
        }
      `}</style>

      {/* BARRA DESKTOP */}
      <nav className="sidebar-mockup-nav" aria-label="Navegación lateral">
        <div className="sidebar-logo" onClick={() => scrollToSection('inicio')}>
          F&V
        </div>

        <div className="sidebar-menu">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                onClick={() => scrollToSection(item.id)}
                aria-label={item.label}
              >
                <div className="sidebar-item-icon">{item.icon}</div>
                <div className="sidebar-item-label">
                  {isActive && <span className="active-dot" />}
                  {item.label}
                </div>
              </button>
            )
          })}
        </div>

        <svg
          className="sidebar-botanical-bottom"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M50 90 C50 65, 25 40, 20 15" />
          <path d="M50 90 C50 60, 75 35, 80 10" />
          <path d="M30 55 C20 48, 15 52, 20 60 C25 60, 30 55, 30 55 Z" fill="currentColor" fillOpacity="0.25"/>
          <path d="M70 55 C80 48, 85 52, 80 60 C75 60, 70 55, 70 55 Z" fill="currentColor" fillOpacity="0.25"/>
        </svg>
      </nav>

      {/* BOTÓN MÓVIL */}
      <button
        className="mobile-nav-trigger"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Abrir menú"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          {mobileOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 8h16M4 16h16" />}
        </svg>
      </button>

      {/* OVERLAY MÓVIL */}
      <div className={`mobile-menu-overlay ${mobileOpen ? 'open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => scrollToSection(item.id)}
          >
            <span style={{ width: 18, height: 18, display: 'inline-block' }}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </>
  )
}