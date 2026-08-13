import React, { useState } from 'react'

export default function InfoSection() {
  const [copiedBcp, setCopiedBcp] = useState(false)
  const [copiedCci, setCopiedCci] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const BCP_ACCOUNT = '191-12345678-0-99'
  const CCI_ACCOUNT = '002-191-0012345678099-52'

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text)
    if (type === 'bcp') {
      setCopiedBcp(true)
      setTimeout(() => setCopiedBcp(false), 2000)
    } else {
      setCopiedCci(true)
      setTimeout(() => setCopiedCci(false), 2000)
    }
  }

  const toggleMusic = () => {
    setIsPlaying(!isPlaying)
    const audio = document.querySelector('audio')
    if (audio) {
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play().catch(() => {})
      }
    }
  }

  return (
    <section className="info-editorial-section">
      <style>{`
        /* IMPORTACIÓN DE FUENTES EDITORIALES PREMIUM */
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&display=swap');

        .info-editorial-section {
          background-color: #F8F3EA;
          background-image: 
            radial-gradient(circle at 10% 10%, rgba(201, 164, 92, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 90% 90%, rgba(90, 15, 27, 0.03) 0%, transparent 40%);
          padding: 70px 20px 90px 20px;
          font-family: 'Montserrat', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
        }

        /* ILUSTRACIONES BOTÁNICAS SUTILES DEL FONDO DE PÁGINA */
        .bg-botanical-left {
          position: absolute;
          top: 0;
          left: 0;
          width: 200px;
          opacity: 0.18;
          pointer-events: none;
        }

        .bg-botanical-right {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 220px;
          opacity: 0.18;
          pointer-events: none;
        }

        /* HEADER PRINCIPAL DE LA SECCIÓN */
        .main-header {
          text-align: center;
          margin-bottom: 38px;
          max-width: 650px;
          position: relative;
          z-index: 2;
        }

        .main-eyebrow {
          color: #C9A45C;
          font-size: 0.72rem;
          letter-spacing: 4px;
          text-transform: uppercase;
          font-weight: 600;
          display: block;
          margin-bottom: 8px;
        }

        .main-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2.7rem;
          font-weight: 400;
          color: #4A1119;
          margin: 0;
          line-height: 1.15;
          letter-spacing: -0.5px;
        }

        .title-calligraphy {
          font-family: 'Great Vibes', cursive;
          font-size: 4rem;
          font-weight: 400;
          color: #173B32;
          display: block;
          margin-top: -6px;
          margin-bottom: 8px;
          line-height: 1;
        }

        /* SEPARADOR ORNAMENTAL DORADO */
        .ornamental-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 10px;
        }

        .ornamental-line {
          height: 1px;
          width: 50px;
          background: linear-gradient(90deg, transparent, #C9A45C, transparent);
        }

        /* CONTENEDOR GRID PRINCIPAL CON ALINEACIÓN PERFECTA DE ALTURA */
        .cards-grid-container {
          max-width: 1020px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          align-items: stretch;
          position: relative;
          z-index: 2;
        }

        /* ============================================================ */
        /* TARJETA 1: CÓDIGO DE VESTIMENTA (BURGUNDY REDISEÑADA) */
        /* ============================================================ */
        .card-burgundy {
          background: linear-gradient(150deg, #5A0F1B 0%, #3D0A12 100%);
          border-radius: 26px;
          padding: 28px 24px 22px 24px;
          color: #FBF8F2;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 16px 40px rgba(61, 10, 18, 0.22);
          border: 1px solid rgba(201, 164, 92, 0.32);
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
        }

        /* VESTIGIO BOTÁNICO DELICADO EN ESQUINA SUPERIOR DERECHA */
        .card-botanical-corner {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 80px;
          height: 80px;
          opacity: 0.2;
          pointer-events: none;
        }

        .card-inner-border {
          position: absolute;
          inset: 8px;
          border: 1px solid rgba(201, 164, 92, 0.12);
          border-radius: 20px;
          pointer-events: none;
        }

        /* HEADER DE TARJETA VINO */
        .card-header-compact {
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .card-eyebrow-gold {
          color: #D8BC7A;
          font-size: 0.65rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 600;
          display: block;
          margin-bottom: 4px;
        }

        .card-title-light {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.95rem;
          font-weight: 400;
          color: #FBF8F2;
          margin: 0;
          line-height: 1.1;
        }

        /* DAMAS Y CABALLEROS - MÁXIMA COMPACTACIÓN PARA MANTENER LA ALTURA */
        .dress-code-compact-body {
          margin: 12px 0 16px 0;
          position: relative;
          z-index: 2;
        }

        .dress-flex-container {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 12px;
        }

        .dress-vertical-line {
          width: 1px;
          height: 80px;
          background: linear-gradient(180deg, transparent, rgba(201, 164, 92, 0.35), transparent);
        }

        .dress-column {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .dress-icon-gold-circle {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          border: 1px solid rgba(201, 164, 92, 0.8);
          background: rgba(201, 164, 92, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
          color: #D8BC7A;
          box-shadow: inset 0 0 10px rgba(201, 164, 92, 0.08);
        }

        .dress-column-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.45rem;
          color: #FBF8F2;
          margin: 0 0 2px 0;
          font-weight: 400;
        }

        .dress-column-desc {
          font-size: 0.75rem;
          color: rgba(251, 248, 242, 0.82);
          line-height: 1.35;
          margin: 0;
          font-weight: 300;
          max-width: 160px;
        }

        /* CÁPSULA "RESERVADOS PARA LA NOVIA" MÁS GRANDE Y FONDO MÁS CLARO */
        .reserved-capsule-compact {
          background: rgba(251, 248, 242, 0.12); /* Fondo más claro translúcido */
          backdrop-filter: blur(4px);
          border: 1px solid rgba(201, 164, 92, 0.4);
          border-radius: 18px;
          padding: 16px 14px 14px 14px;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .reserved-eyebrow {
          color: #FBF8F2;
          font-size: 0.65rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 12px;
          display: block;
          text-shadow: 0 1px 3px rgba(0,0,0,0.4);
        }

        .swatches-row {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          gap: 6px;
        }

        .swatch-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        /* CÍRCULOS DE COLOR MÁS GRANDES (32px) CON BORDES DEFINIDOS */
        .swatch-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.35);
          transition: transform 200ms ease;
        }

        .swatch-circle:hover {
          transform: scale(1.08);
        }

        .swatch-label {
          font-size: 0.72rem;
          color: #FBF8F2;
          font-weight: 400;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        }

        /* ============================================================ */
        /* TARJETA 2: MESA DE REGALOS (CREMA / IVORY) */
        /* ============================================================ */
        .card-cream {
          background: #FBF8F2;
          border-radius: 26px;
          padding: 28px 24px 22px 24px;
          color: #4A1119;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 14px 35px rgba(90, 15, 27, 0.07);
          border: 1px solid rgba(201, 164, 92, 0.38);
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
        }

        .card-title-dark {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.95rem;
          font-weight: 400;
          color: #4A1119;
          margin: 0;
          line-height: 1.1;
        }

        .gifts-intro-block {
          text-align: center;
          margin: 8px 0 14px 0;
        }

        .gifts-heart-msg {
          font-size: 0.88rem;
          font-weight: 600;
          color: #4A1119;
          margin: 0 0 4px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .gifts-subtext {
          font-size: 0.76rem;
          color: #5F5550;
          line-height: 1.38;
          margin: 0;
          font-weight: 300;
        }

        .gift-options-stack {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .gift-inner-card {
          background: #F3EBDD;
          border: 1px solid rgba(201, 164, 92, 0.25);
          border-radius: 16px;
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .gift-card-header {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .gift-icon-gold-bg {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(201, 164, 92, 0.45);
          background: #FBF8F2;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #B99145;
          flex-shrink: 0;
        }

        .gift-card-text {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .gift-card-title {
          font-size: 0.68rem;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          font-weight: 600;
          color: #4A1119;
          margin: 0 0 2px 0;
        }

        .gift-card-sub {
          font-size: 0.74rem;
          color: #5F5550;
          margin: 0;
          font-weight: 300;
        }

        .btn-burgundy-premium {
          background: #5A0F1B;
          color: #FBF8F2;
          border: 1px solid #6B1724;
          padding: 10px 18px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 250ms ease;
          box-shadow: 0 3px 10px rgba(90, 15, 27, 0.15);
        }

        .btn-burgundy-premium:hover {
          background: #6B1724;
          transform: translateY(-1px);
        }

        .bank-buttons-grid {
          display: flex;
          gap: 8px;
          width: 100%;
        }

        .btn-cream-outline {
          flex: 1;
          background: #FBF8F2;
          color: #4A1119;
          border: 1px solid rgba(201, 164, 92, 0.55);
          padding: 8px 12px;
          border-radius: 18px;
          font-size: 0.75rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          transition: all 250ms ease;
        }

        .btn-cream-outline:hover {
          background: #F8F3EA;
          border-color: #B99145;
        }

        /* BOTÓN FLOTANTE DE MÚSICA */
        .floating-music-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #5A0F1B;
          color: #D8BC7A;
          border: 1px solid #C9A45C;
          box-shadow: 0 6px 20px rgba(67, 11, 20, 0.28);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 99;
          transition: all 250ms ease;
        }

        .floating-music-btn:hover {
          transform: scale(1.06);
          background: #6B1724;
        }

        @media (max-width: 900px) {
          .info-editorial-section {
            padding: 50px 16px 70px 16px;
          }

          .main-title {
            font-size: 2rem;
          }

          .title-calligraphy {
            font-size: 3rem;
          }

          .cards-grid-container {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .card-burgundy, .card-cream {
            padding: 24px 18px;
            border-radius: 22px;
          }

          .dress-flex-container {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .dress-vertical-line {
            width: 70%;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(201, 164, 92, 0.45), transparent);
          }

          .bank-buttons-grid {
            flex-direction: column;
          }
        }
      `}</style>

      {/* ILUSTRACIONES BOTÁNICAS SUTILES DEL FONDO DE PÁGINA */}
      <svg className="bg-botanical-left" viewBox="0 0 200 200" fill="none">
        <path d="M20,180 Q80,100 160,20 M60,140 Q100,110 120,70 M40,160 Q70,120 80,90" stroke="#C9A45C" strokeWidth="1" strokeLinecap="round"/>
        <circle cx="160" cy="20" r="2.5" fill="#C9A45C"/>
        <circle cx="120" cy="70" r="2" fill="#C9A45C"/>
      </svg>

      <svg className="bg-botanical-right" viewBox="0 0 200 200" fill="none">
        <path d="M180,180 Q100,100 20,20 M140,140 Q100,70 80,30 M160,160 Q120,90 90,60" stroke="#C9A45C" strokeWidth="1" strokeLinecap="round"/>
        <circle cx="20" cy="20" r="2.5" fill="#C9A45C"/>
        <circle cx="80" cy="30" r="2" fill="#C9A45C"/>
      </svg>

      {/* HEADER DE LA SECCIÓN */}
      <header className="main-header">
        <span className="main-eyebrow">
          ✦ DETALLES IMPORTANTES ✦
        </span>
        <h2 className="main-title">
          Información para nuestros
          <span className="title-calligraphy">Invitados</span>
        </h2>

        <div className="ornamental-divider">
          <div className="ornamental-line" />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A45C" strokeWidth="1.2">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="rgba(201, 164, 92, 0.2)" />
          </svg>
          <div className="ornamental-line" />
        </div>
      </header>

      {/* GRID DE TARJETAS */}
      <div className="cards-grid-container">

        {/* 1. TARJETA CÓDIGO DE VESTIMENTA */}
        <div className="card-burgundy">
          <div className="card-inner-border" />

          {/* VECOR BOTÁNICO ELEGANTE EN ESQUINA */}
          <svg className="card-botanical-corner" viewBox="0 0 100 100" fill="none">
            <path d="M90 10 C65 15, 30 35, 15 90" stroke="rgba(201, 164, 92, 0.4)" strokeWidth="1" />
            <path d="M78 16 C84 10, 90 12, 88 18 C82 24, 76 22, 78 16 Z" fill="rgba(201, 164, 92, 0.25)" stroke="rgba(201, 164, 92, 0.35)" strokeWidth="0.8" />
            <path d="M60 28 C66 22, 72 24, 70 30 C64 36, 58 34, 60 28 Z" fill="rgba(201, 164, 92, 0.25)" stroke="rgba(201, 164, 92, 0.35)" strokeWidth="0.8" />
            <path d="M42 44 C48 38, 54 40, 52 46 C46 52, 40 50, 42 44 Z" fill="rgba(201, 164, 92, 0.25)" stroke="rgba(201, 164, 92, 0.35)" strokeWidth="0.8" />
          </svg>

          {/* ENCABEZADO DE TARJETA */}
          <header className="card-header-compact">
            <span className="card-eyebrow-gold">✦ DRESS CODE ✦</span>
            <h3 className="card-title-light">Código de Vestimenta</h3>
            <div className="ornamental-divider" style={{ marginTop: '6px' }}>
              <div className="ornamental-line" style={{ width: '35px' }} />
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#C9A45C">
                <path d="M12 2L15 12L12 22L9 12Z" />
              </svg>
              <div className="ornamental-line" style={{ width: '35px' }} />
            </div>
          </header>

          {/* DAMAS & CABALLEROS */}
          <div className="dress-code-compact-body">
            <div className="dress-flex-container">
              
              {/* DAMAS */}
              <div className="dress-column">
                <div className="dress-icon-gold-circle">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 3L8 8h8l-2-5Z" />
                    <path d="M8 8c0 0 1.5 1 4 1s4-1 4-1" />
                    <path d="M8 8l-3.5 13c2.5 0.8 12.5 0.8 15 0L16 8" />
                    <path d="M12 9v12" strokeDasharray="1 2.5" />
                  </svg>
                </div>
                <h4 className="dress-column-title">Damas</h4>
                <p className="dress-column-desc">
                  Luzcan su belleza con tacones y vestidos largos.
                </p>
              </div>

              {/* DIVISOR VERTICAL CORTO */}
              <div className="dress-vertical-line" />

              {/* CABALLEROS */}
              <div className="dress-column">
                <div className="dress-icon-gold-circle">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 3l3 2.5h6l3-2.5v18H6V3z" />
                    <path d="M9 5.5l3 5.5 3-5.5" />
                    <path d="M11 6.5h2v2h-2z" fill="currentColor" fillOpacity="0.6" />
                    <path d="M12 11v10" />
                  </svg>
                </div>
                <h4 className="dress-column-title">Caballeros</h4>
                <p className="dress-column-desc">
                  Destaquen su elegancia con trajes en tonos oscuros.
                </p>
              </div>

            </div>
          </div>

          {/* CÁPSULA "RESERVADOS PARA LA NOVIA" CON COLORES GRANDES Y FONDO CLARO */}
          <div className="reserved-capsule-compact">
            <span className="reserved-eyebrow">
              ✦ RESERVADOS PARA LA NOVIA ✦
            </span>
            <div className="swatches-row">
              
              <div className="swatch-group">
                <div className="swatch-circle" style={{ backgroundColor: '#FFFFFF', border: '1.5px solid #D8BC7A' }} />
                <span className="swatch-label">Blanco</span>
              </div>

              <div className="swatch-group">
                <div className="swatch-circle" style={{ backgroundColor: '#F5F2E9', border: '1.5px solid #D8BC7A' }} />
                <span className="swatch-label">Ivory</span>
              </div>

              <div className="swatch-group">
                <div className="swatch-circle" style={{ backgroundColor: '#5A0F1B', border: '1.5px solid #D8BC7A' }} />
                <span className="swatch-label">Vino</span>
              </div>

              <div className="swatch-group">
                <div className="swatch-circle" style={{ backgroundColor: '#121E2B', border: '1.5px solid #D8BC7A' }} />
                <span className="swatch-label">Azul Noche</span>
              </div>

              <div className="swatch-group">
                <div className="swatch-circle" style={{ backgroundColor: '#C9A45C', border: '1.5px solid #FFFFFF' }} />
                <span className="swatch-label">Dorado</span>
              </div>

            </div>
          </div>
        </div>

        {/* 2. TARJETA MESA DE REGALOS (CREMA) */}
        <div className="card-cream">
          
          <header className="card-header-compact">
            <span className="card-eyebrow-gold" style={{ color: '#B99145' }}>✦ MESA DE REGALOS ✦</span>
            <h3 className="card-title-dark">Aportes & Regalo</h3>
            <div className="ornamental-divider" style={{ marginTop: '6px' }}>
              <div className="ornamental-line" style={{ width: '35px' }} />
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#B99145">
                <path d="M12 2L15 12L12 22L9 12Z" />
              </svg>
              <div className="ornamental-line" style={{ width: '35px' }} />
            </div>
          </header>

          <div className="gifts-intro-block">
            <p className="gifts-heart-msg">
              Tu presencia es nuestro mejor regalo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#5A0F1B">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </p>
            <p className="gifts-subtext">
              Si deseas tener un detalle con nosotros, ponemos a tu disposición las siguientes opciones:
            </p>
          </div>

          <div className="gift-options-stack">
            
            {/* TARJETA CRÉDITO */}
            <div className="gift-inner-card">
              <div className="gift-card-header">
                <div className="gift-icon-gold-bg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="3" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                    <line x1="6" y1="15" x2="10" y2="15" />
                  </svg>
                </div>
                <div className="gift-card-text">
                  <span className="gift-card-title">TARJETA DE CRÉDITO / DÉBITO</span>
                  <span className="gift-card-sub">Plataforma segura e inmediata en línea</span>
                </div>
              </div>

              <button 
                className="btn-burgundy-premium"
                onClick={() => window.open('https://link.mercadopago.com.pe/bodadefelipeyvicky', '_blank')}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
                Aporta con Tarjeta en Línea
              </button>
            </div>

            {/* TRANSFERENCIA BANCARIA */}
            <div className="gift-inner-card">
              <div className="gift-card-header">
                <div className="gift-icon-gold-bg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18" />
                    <path d="M3 10h18" />
                    <path d="M5 6l7-3 7 3" />
                    <path d="M6 10v8" />
                    <path d="M10 10v8" />
                    <path d="M14 10v8" />
                    <path d="M18 10v8" />
                  </svg>
                </div>
                <div className="gift-card-text">
                  <span className="gift-card-title">TRANSFERENCIA BANCARIA</span>
                  <span className="gift-card-sub">Titulares: Felipe & Vicky</span>
                </div>
              </div>

              <div className="bank-buttons-grid">
                <button 
                  className="btn-cream-outline"
                  onClick={() => handleCopy(BCP_ACCOUNT, 'bcp')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B99145" strokeWidth="1.5">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  {copiedBcp ? '¡Copiado!' : 'Copiar BCP'}
                </button>

                <button 
                  className="btn-cream-outline"
                  onClick={() => handleCopy(CCI_ACCOUNT, 'cci')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B99145" strokeWidth="1.5">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  {copiedCci ? '¡Copiado!' : 'Copiar CCI'}
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* BOTÓN FLOTANTE DE MÚSICA */}
      <button 
        className="floating-music-btn" 
        onClick={toggleMusic}
        title={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      </button>

    </section>
  )
}