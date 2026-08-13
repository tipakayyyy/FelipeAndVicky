import React, { useState } from 'react'

export default function InvitationOpening({
  onComplete,
  coupleNames = 'Felipe & Victoria',
  weddingDate = '07 . 11 . 2026',
  photoSrc = '/photos/preboda.jpeg' // Reemplaza con la ruta real de tu foto
}) {
  // Pasos: 'welcome' | 'envelope' | 'opening' | 'fade-out'
  const [step, setStep] = useState('welcome')

  const handleOpenEnvelope = () => {
    if (step !== 'envelope') return
    setStep('opening')

    // Espera 2.5 segundos de animación fluida antes de hacer el fade-out hacia la invitación
    setTimeout(() => {
      setStep('fade-out')
      setTimeout(() => {
        if (onComplete) onComplete()
      }, 700) // Duración de la transición fade-out
    }, 2500)
  }

  return (
    <div className={`opening-overlay ${step === 'fade-out' ? 'is-fading' : ''}`}>
      <style>{`
        /* ==========================================
           CONTENEDOR GLOBAL DE LA APERTURA
        ========================================== */
        .opening-overlay {
          position: fixed;
          inset: 0;
          z-index: 999999;
          background-color: #162C22;
          color: #F6F1E8;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          font-family: 'Cormorant Garamond', Georgia, serif;
          opacity: 1;
          transition: opacity 700ms ease-in-out, visibility 700ms ease-in-out;
        }

        .opening-overlay.is-fading {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        /* ==========================================
           1 y 2. PANTALLA DE BIENVENIDA CON FOTO
        ========================================== */
        .welcome-screen {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 40px 24px;
          box-sizing: border-box;
          animation: fadeIn 600ms ease-out forwards;
        }

        .welcome-card-wrapper {
          flex: 1;
          width: 100%;
          max-width: 480px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }

        .prewedding-photo-container {
          width: 100%;
          max-height: 58vh;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(223, 195, 138, 0.3);
          position: relative;
        }

        .prewedding-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .welcome-messages {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .welcome-subtitle {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.8rem;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #DFC38A;
          margin: 0;
          font-weight: 400;
        }

        .welcome-title {
          font-size: 2.1rem;
          font-weight: 500;
          color: #F6F1E8;
          margin: 0;
          letter-spacing: 1px;
        }

        .btn-open-welcome {
          background-color: transparent;
          color: #DFC38A;
          border: 1px solid #DFC38A;
          padding: 14px 32px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          border-radius: 40px;
          cursor: pointer;
          transition: all 300ms ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          margin-top: 8px;
          outline: none;
        }

        .btn-open-welcome:active,
        .btn-open-welcome:hover {
          background-color: #DFC38A;
          color: #162C22;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(223, 195, 138, 0.3);
        }

        /* ==========================================
           3 y 4. SOBRE DIGITAL E INTERACCIÓN
        ========================================== */
        .envelope-screen {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px;
          box-sizing: border-box;
          animation: fadeIn 600ms ease-out forwards;
        }

        .envelope-wrapper {
          position: relative;
          width: 320px;
          height: 220px;
          perspective: 1000px;
          margin-bottom: 30px;
        }

        @media (min-width: 600px) {
          .envelope-wrapper {
            width: 420px;
            height: 280px;
          }
        }

        /* Cuerpo del sobre (Vino oscuro) */
        .envelope-body {
          position: absolute;
          inset: 0;
          background: #4A1218; /* Vino elegante */
          border-radius: 8px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(223, 195, 138, 0.25);
          overflow: visible;
        }

        /* Textura sutil */
        .envelope-body::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(223, 195, 138, 0.08), transparent 70%);
          pointer-events: none;
          border-radius: 8px;
        }

        /* Solapa inferior y laterales (Pliegues del sobre) */
        .envelope-pocket {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
        }

        .envelope-pocket-left {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 50%;
          background: #3B0E13;
          clip-path: polygon(0 0, 0 100%, 100% 50%);
        }

        .envelope-pocket-right {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 50%;
          background: #3B0E13;
          clip-path: polygon(100% 0, 100% 100%, 0 50%);
        }

        .envelope-pocket-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60%;
          background: #420F15;
          clip-path: polygon(0 100%, 100% 100%, 50% 0);
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
        }

        /* Solapa superior móvil */
        .envelope-flap {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 55%;
          background: #54151B;
          clip-path: polygon(0 0, 100% 0, 50% 100%);
          transform-origin: top center;
          transition: transform 800ms cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 4;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }

        .envelope-wrapper.is-open .envelope-flap {
          transform: rotateX(180deg);
          z-index: 1;
        }

        /* Tarjeta interna que emerge */
        .envelope-card {
          position: absolute;
          left: 5%;
          right: 5%;
          top: 10px;
          bottom: 10px;
          background: #FDFBF7;
          color: #162C22;
          border-radius: 6px;
          padding: 20px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          border: 1px solid #DFC38A;
          z-index: 2;
          transition: transform 1000ms cubic-bezier(0.25, 1, 0.5, 1);
        }

        .envelope-wrapper.is-open .envelope-card {
          transform: translateY(-90px);
        }

        @media (min-width: 600px) {
          .envelope-wrapper.is-open .envelope-card {
            transform: translateY(-120px);
          }
        }

        .card-names {
          font-size: 1.6rem;
          font-weight: 600;
          color: #162C22;
          margin: 0;
          line-height: 1.2;
        }

        .card-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.1rem;
          color: #8B1E2B;
          margin: 6px 0;
        }

        .card-date {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 2px;
          color: #C6A15B;
          margin: 0;
          font-weight: 500;
        }

        /* Sello de cera interactivo */
        .wax-seal {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -20%);
          width: 58px;
          height: 58px;
          background: radial-gradient(circle, #A52A3A 0%, #7A1B27 100%);
          border-radius: 50%;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.25);
          border: 2px solid #DFC38A;
          transition: transform 300ms ease, opacity 400ms ease;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }

        .wax-seal:hover {
          transform: translate(-50%, -20%) scale(1.08);
        }

        .wax-seal-monogram {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #DFC38A;
          letter-spacing: 1px;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        }

        .envelope-wrapper.is-open .wax-seal {
          opacity: 0;
          transform: translate(-50%, -20%) scale(0.5);
          pointer-events: none;
        }

        .envelope-hint {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.78rem;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #DFC38A;
          opacity: 0.85;
          margin: 0;
          animation: pulse 2s infinite ease-in-out;
        }

        /* ==========================================
           ANIMACIONES
        ========================================== */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.03); }
        }
      `}</style>

      {/* PASO 1: FOTO DE PREBODA + PANTALLA DE BIENVENIDA */}
      {step === 'welcome' && (
        <div className="welcome-screen">
          <div className="welcome-card-wrapper">
            <div className="prewedding-photo-container">
              <img
                src={photoSrc}
                alt="Preboda Save the Date"
                className="prewedding-photo"
              />
            </div>

            <div className="welcome-messages">
              <p className="welcome-subtitle">Tenemos algo muy especial que compartir contigo</p>
              <h2 className="welcome-title">Nuestra Invitación</h2>
            </div>

            <button
              type="button"
              className="btn-open-welcome"
              onClick={() => setStep('envelope')}
            >
              ABRIR INVITACIÓN
            </button>
          </div>
        </div>
      )}

      {/* PASO 2 Y 3: SOBRE DIGITAL INTERACTIVO */}
      {(step === 'envelope' || step === 'opening' || step === 'fade-out') && (
        <div className="envelope-screen">
          <div className={`envelope-wrapper ${step !== 'envelope' ? 'is-open' : ''}`}>
            {/* Cuerpo base */}
            <div className="envelope-body" />

            {/* Tarjeta interna */}
            <div className="envelope-card">
              <h3 className="card-names">{coupleNames}</h3>
              <p className="card-tagline">Nos casamos</p>
              <p className="card-date">{weddingDate}</p>
            </div>

            {/* Pliegues inferiores/laterales */}
            <div className="envelope-pocket">
              <div className="envelope-pocket-left" />
              <div className="envelope-pocket-right" />
              <div className="envelope-pocket-bottom" />
            </div>

            {/* Solapa superior */}
            <div className="envelope-flap" />

            {/* Sello de cera de apertura */}
            <div
              className="wax-seal"
              onClick={handleOpenEnvelope}
              role="button"
              aria-label="Toca el sello para abrir la invitación"
              tabIndex={0}
            >
              <span className="wax-seal-monogram">F&amp;V</span>
            </div>
          </div>

          <p className="envelope-hint">
            {step === 'envelope' ? 'Toca el sello para abrir' : 'Abriendo...'}
          </p>
        </div>
      )}
    </div>
  )
}