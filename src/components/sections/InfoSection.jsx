import React, { useState } from 'react'

// =========================================================
// 🌿 ÍCONOS AUXILIARES
// =========================================================
const CopyIcon = ({ color = 'currentColor', size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

const CardIcon = ({ color = 'currentColor', size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="3" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
)

// =========================================================
// 💌 MESA DE REGALOS COMPLETA
// =========================================================
export function GiftRegistryCard() {
  const [toastMessage, setToastMessage] = useState(null)

  const paymentLink = 'https://link.mercadopago.com.pe/bodadefelipeyvicky'
  const bankData = {
    bcpAccount: '19130049472000',
    cciAccount: '00219113004947200059'
  }

  const handleOpenMercadoPago = () => {
    const width = 500
    const height = 700
    const left = window.screen.width / 2 - width / 2
    const top = window.screen.height / 2 - height / 2

    window.open(
      paymentLink,
      'MercadoPagoCheckout',
      `toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=${width}, height=${height}, top=${top}, left=${left}`
    )
  }

  const handleCopy = (textToCopy, label) => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setToastMessage(`✓ ${label} copiado`)
      setTimeout(() => setToastMessage(null), 3000)
    })
  }

  return (
    <div className="gift-card-container">
      
      {/* BLOQUE 1: ENCABEZADO */}
      <div>
        <div className="dc-header-ornament">
          <span className="line"></span>
          <span> ✦ </span>
          <span className="line"></span>
        </div>
        <p className="gift-subtitle">✦ MESA DE REGALOS ✦</p>
        <h3 className="gift-headline">Aportes & Regalo de Bodas</h3>
        <div className="dc-header-divider">
          <span className="line-small"></span>
          <span style={{ fontSize: '8px' }}>❖</span>
          <span className="line-small"></span>
        </div>
      </div>

      {/* BLOQUE 2: MENSAJE PRINCIPAL */}
      <p className="gift-description">
        Tu presencia es nuestro mejor regalo. Si deseas hacernos un presente, puedes realizarlo a través de los siguientes medios:
      </p>

      {/* BLOQUE 3: PAGO EN LÍNEA (CONTENEDOR OSCURO) */}
      <div className="gift-subcard">
        <h5 className="gift-subcard-title">💳 PAGO CON TARJETA DE CRÉDITO / DÉBITO</h5>
        <p className="gift-subcard-text">Plataforma segura e inmediata en línea</p>
        <button
          type="button"
          className="luxury-btn-gold"
          onClick={handleOpenMercadoPago}
        >
          <CardIcon color="#3D0D0B" size={19} />
          <span>Pagar con Tarjeta en Línea</span>
        </button>
      </div>

      {/* BLOQUE 4: TRANSFERENCIA BANCARIA (CONTENEDOR OSCURO) */}
      <div className="gift-subcard">
        <h5 className="gift-subcard-title">🏦 TRANSFERENCIA BANCARIA DIRECTA</h5>
        <p className="gift-subcard-text">Titulares: Felipe & Vicky</p>
        
        <div className="transfer-grid">
          <button
            type="button"
            className="luxury-btn-primary"
            onClick={() => handleCopy(bankData.bcpAccount, 'Número BCP')}
          >
            <CopyIcon color="#FAF7F2" size={15} />
            <span>Copiar BCP</span>
          </button>

          <button
            type="button"
            className="luxury-btn-primary"
            onClick={() => handleCopy(bankData.cciAccount, 'CCI')}
          >
            <CopyIcon color="#FAF7F2" size={15} />
            <span>Copiar CCI</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="luxury-toast">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}

// =========================================================
// 🌟 SECCIÓN COMPLETA DE INFORMACIÓN
// =========================================================
export default function InfoSection() {
  const avoidColors = [
    { name: 'Blanco', hex: '#FFFFFF' },
    { name: 'Ivory', hex: '#F5EFE6' },
    { name: 'Vino', hex: '#5C1622' },
    { name: 'Azul Noche', hex: '#162238' },
    { name: 'Dorado', hex: '#C8A15A' }
  ]

  return (
    <section id="informacion" className="info-section-main">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

        .info-section-main {
          background-color: #FAF7F2;
          width: 100%;
          padding: 70px 20px;
          display: flex;
          justify-content: center;
          box-sizing: border-box;
          font-family: 'Montserrat', sans-serif;
        }

        .info-wrapper {
          max-width: 1080px;
          width: 100%;
        }

        .section-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .section-header .tag {
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 3.5px;
          color: #C8A15A !important;
          font-weight: 600;
          display: block;
          margin-bottom: 6px;
        }

        .section-header .title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2.8rem;
          font-weight: 300;
          color: #2C1810 !important;
          margin: 0;
        }

        .section-header .title-italic {
          color: #4B0F18 !important;
          font-style: italic;
        }

        /* GRID BALANCEADO CON ALINEACIÓN PERFECTA */
        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
          align-items: stretch;
        }

        /* TARJETA 1: CÓDIGO DE VESTIMENTA */
        .dress-code-luxury-card {
          background-color: #4B0F18;
          border: 1px solid rgba(200, 161, 90, 0.35);
          border-radius: 32px;
          padding: 40px 32px;
          color: #FDF8F4;
          box-shadow: 0 20px 45px rgba(61, 13, 11, 0.25);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 20px;
          box-sizing: border-box;
          text-align: center;
          height: 100%;
        }

        .dc-header-ornament {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: #C8A15A;
          font-size: 11px;
          margin-bottom: 6px;
        }

        .dc-header-ornament .line {
          height: 1px;
          width: 50px;
          background: linear-gradient(90deg, transparent, #C8A15A);
        }
        .dc-header-ornament .line:last-child {
          background: linear-gradient(90deg, #C8A15A, transparent);
        }

        .dc-subtitle {
          color: #C8A15A;
          font-size: 0.8rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 500;
          margin-bottom: 4px;
        }

        .dc-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.5rem;
          font-weight: 400;
          color: #FDF8F4;
          margin: 0;
          line-height: 1.1;
        }

        .dc-header-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 8px;
          color: #C8A15A;
        }

        .dc-header-divider .line-small {
          height: 1px;
          width: 35px;
          background-color: #C8A15A;
          opacity: 0.6;
        }

        .dc-columns-wrapper {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 12px;
        }

        .dc-column {
          padding: 4px;
          transition: transform 250ms ease;
        }

        .dc-column:hover .dc-outline-icon {
          transform: scale(1.06);
        }

        .dc-icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-bottom: 8px;
          color: #C8A15A;
        }

        .dc-outline-icon {
          width: 78px;
          height: 78px;
          transition: transform 250ms ease;
        }

        .dc-column-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.75rem;
          font-weight: 400;
          margin: 0 0 4px 0;
          color: #FDF8F4;
        }

        .dc-column-text {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.82);
          line-height: 1.4;
          margin: 0;
          font-weight: 300;
        }

        .dc-vertical-divider {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          color: #C8A15A;
          opacity: 0.4;
        }

        .dc-vertical-line {
          width: 1px;
          height: 50px;
          background-color: #C8A15A;
        }

        .dc-reserved-container {
          background-color: #57141F;
          border: 1px solid rgba(200, 161, 90, 0.3);
          border-radius: 20px;
          padding: 18px 14px;
        }

        .dc-reserved-title {
          color: #C8A15A;
          font-size: 0.76rem;
          letter-spacing: 1.5px;
          font-weight: 600;
          margin: 0 0 12px 0;
          text-transform: uppercase;
        }

        .dc-colors-row {
          display: flex;
          justify-content: space-around;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .dc-color-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          transition: transform 250ms ease;
        }

        .dc-color-item:hover {
          transform: translateY(-3px);
        }

        .dc-color-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1.5px solid #C8A15A;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }

        .dc-color-name {
          font-size: 0.74rem;
          color: rgba(255, 255, 255, 0.82);
          font-weight: 400;
        }

        .dc-adults-container {
          background-color: #57141F;
          border: 1px solid rgba(200, 161, 90, 0.35);
          border-radius: 20px;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          text-align: left;
        }

        .dc-no-kids-svg {
          width: 68px;
          height: 68px;
          flex-shrink: 0;
          transition: transform 250ms ease;
        }

        .dc-adults-container:hover .dc-no-kids-svg {
          transform: scale(1.05);
        }

        .dc-adults-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          color: #C8A15A;
          margin: 0 0 2px 0;
          letter-spacing: 1px;
          font-weight: 600;
        }

        .dc-adults-text {
          font-size: 0.84rem;
          color: rgba(255, 255, 255, 0.82);
          line-height: 1.4;
          margin: 0;
          font-weight: 300;
        }

        /* TARJETA 2: MESA DE REGALOS (ESTRUCTURA REDISEÑADA) */
        .gift-card-container {
          background-color: #4B0F18;
          border: 1px solid rgba(200, 161, 90, 0.35);
          border-radius: 32px;
          padding: 40px 32px;
          box-shadow: 0 20px 45px rgba(61, 13, 11, 0.25);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 18px;
          box-sizing: border-box;
          position: relative;
          height: 100%;
          text-align: center;
        }

        .gift-subtitle {
          color: #C8A15A !important;
          font-size: 0.8rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 500;
          margin-bottom: 4px;
          display: block;
        }

        .gift-headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.5rem;
          font-weight: 400;
          color: #FDF8F4 !important;
          margin: 0;
          line-height: 1.1;
        }

        .gift-description {
          color: rgba(255, 255, 255, 0.85) !important;
          font-size: 0.88rem;
          line-height: 1.5;
          margin: 0 auto;
          font-weight: 300;
        }

        /* Tarjetas Oscuras dentro de Mesa de Regalos */
        .gift-subcard {
          background-color: #57141F;
          border: 1px solid rgba(200, 161, 90, 0.3);
          border-radius: 20px;
          padding: 18px 18px;
          text-align: center;
        }

        .gift-subcard-title {
          color: #C8A15A;
          font-size: 0.76rem;
          letter-spacing: 1.2px;
          font-weight: 600;
          margin: 0 0 4px 0;
          text-transform: uppercase;
        }

        .gift-subcard-text {
          font-size: 0.82rem;
          color: rgba(255, 255, 255, 0.75);
          margin: 0 0 12px 0;
          font-weight: 300;
        }

        .transfer-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          width: 100%;
        }

        .luxury-btn-gold {
          width: 100%;
          height: 48px;
          background-color: #C8A15A !important;
          color: #3D0D0B !important;
          border: none;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
          transition: all 250ms ease;
        }

        .luxury-btn-gold:hover {
          background-color: #D8B26B !important;
          transform: translateY(-2px);
        }

        .luxury-btn-primary {
          width: 100%;
          height: 44px;
          background-color: #4B0F18 !important;
          color: #FAF7F2 !important;
          border: 1px solid rgba(200, 161, 90, 0.35);
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 250ms ease;
        }

        .luxury-btn-primary:hover {
          background-color: #5C1521 !important;
          border-color: #C8A15A;
          transform: translateY(-2px);
        }

        .luxury-toast {
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #57141F;
          color: #FAF7F2;
          padding: 10px 22px;
          border-radius: 30px;
          font-size: 0.82rem;
          font-weight: 500;
          box-shadow: 0 10px 25px rgba(0,0,0,0.4);
          border: 1px solid #C8A15A;
          z-index: 10;
          white-space: nowrap;
        }

        /* RESPONSIVE MÓVIL */
        @media (max-width: 680px) {
          .dress-code-luxury-card, .gift-card-container {
            padding: 30px 18px;
            border-radius: 24px;
            height: auto;
          }

          .dc-columns-wrapper {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .dc-vertical-divider {
            flex-direction: row;
            justify-content: center;
          }

          .dc-vertical-line {
            width: 60px;
            height: 1px;
          }

          .dc-adults-container {
            flex-direction: column;
            text-align: center;
            padding: 18px 14px;
          }

          .transfer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="info-wrapper">
        {/* ENCABEZADO DE SECCIÓN */}
        <div className="section-header">
          <span className="tag">Detalles Importantes</span>
          <h2 className="title">
            Información para nuestros <span className="title-italic">Invitados</span>
          </h2>
          <div style={{ width: '40px', height: '1px', backgroundColor: '#4B0F18', margin: '12px auto 0' }} />
        </div>

        <div className="grid-container">
          
          {/* ================= 1. CÓDIGO DE VESTIMENTA ================= */}
          <div className="dress-code-luxury-card">
            
            {/* BLOQUE 1: ENCABEZADO */}
            <div>
              <div className="dc-header-ornament">
                <span className="line"></span>
                <span> ✦ </span>
                <span className="line"></span>
              </div>
              <p className="dc-subtitle">✦ DRESS CODE ✦</p>
              <h3 className="dc-title">Código de Vestimenta</h3>
              <div className="dc-header-divider">
                <span className="line-small"></span>
                <span style={{ fontSize: '8px' }}>❖</span>
                <span className="line-small"></span>
              </div>
            </div>

            {/* BLOQUE 2: DAMAS Y CABALLEROS */}
            <div className="dc-columns-wrapper">
              {/* Damas */}
              <div className="dc-column">
                <div className="dc-icon-box">
                  <span style={{ fontSize: '9px' }}>✦</span>
                  <svg className="dc-outline-icon" viewBox="0 0 100 100" fill="none" stroke="#C8A15A">
                    <circle cx="50" cy="50" r="46" strokeWidth="1.5" />
                    <path d="M42 26 L46 38 L36 80 H64 L54 38 L58 26 Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M42 26 C46 31, 54 31, 58 26" strokeWidth="1.5"/>
                    <path d="M46 38 C48 55, 38 75, 36 80" strokeWidth="1.5"/>
                    <path d="M54 38 C52 55, 62 75, 64 80" strokeWidth="1.5"/>
                  </svg>
                  <span style={{ fontSize: '9px' }}>✦</span>
                </div>
                <h4 className="dc-column-title">Damas</h4>
                <p className="dc-column-text">
                  Luzcan su belleza con tacones y vestidos largos.
                </p>
              </div>

              {/* Línea vertical */}
              <div className="dc-vertical-divider">
                <span className="dc-vertical-line"></span>
                <span style={{ fontSize: '8px', margin: '4px 0' }}>❖</span>
                <span className="dc-vertical-line"></span>
              </div>

              {/* Caballeros */}
              <div className="dc-column">
                <div className="dc-icon-box">
                  <span style={{ fontSize: '9px' }}>✦</span>
                  <svg className="dc-outline-icon" viewBox="0 0 100 100" fill="none" stroke="#C8A15A">
                    <circle cx="50" cy="50" r="46" strokeWidth="1.5" />
                    <path d="M30 35 L40 28 L50 36 L60 28 L70 35 L68 78 L32 78 Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M40 28 L47 50 L50 78" strokeWidth="1.5"/>
                    <path d="M60 28 L53 50 L50 78" strokeWidth="1.5"/>
                    <polygon points="44,32 50,35 44,38" fill="#C8A15A"/>
                    <polygon points="56,32 50,35 56,38" fill="#C8A15A"/>
                    <circle cx="50" cy="35" r="1.5" fill="#C8A15A"/>
                  </svg>
                  <span style={{ fontSize: '9px' }}>✦</span>
                </div>
                <h4 className="dc-column-title">Caballeros</h4>
                <p className="dc-column-text">
                  Destaquen su elegancia con trajes en tonos oscuros.
                </p>
              </div>
            </div>

            {/* BLOQUE 3: COLORES RESERVADOS */}
            <div className="dc-reserved-container">
              <h5 className="dc-reserved-title">
                🚫 RESERVADOS PARA LA NOVIA & NOVIO:
              </h5>
              <div className="dc-colors-row">
                {avoidColors.map((item, idx) => (
                  <div key={idx} className="dc-color-item">
                    <div 
                      className="dc-color-circle" 
                      style={{ backgroundColor: item.hex }} 
                    />
                    <span className="dc-color-name">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* BLOQUE 4: SOLO ADULTOS */}
            <div className="dc-adults-container">
              <svg className="dc-no-kids-svg" viewBox="0 0 100 100" fill="none" stroke="#C8A15A">
                <circle cx="50" cy="50" r="44" strokeWidth="3" />
                <line x1="20" y1="80" x2="80" y2="20" strokeWidth="3.5" />
                <circle cx="38" cy="38" r="5" fill="#C8A15A" />
                <path d="M32 60 V48 C32 44, 44 44, 44 48 V60" strokeWidth="2.5" />
                <circle cx="62" cy="38" r="5" fill="#C8A15A" />
                <path d="M56 60 V48 C56 44, 68 44, 68 48 V60" strokeWidth="2.5" />
              </svg>

              <div>
                <h4 className="dc-adults-title">SOLO ADULTOS.</h4>
                <p className="dc-adults-text">
                  Por esta vez no aceptaremos la presencia de niños y/o adolescentes en la fiesta.
                </p>
              </div>
            </div>

          </div>

          {/* ================= 2. MESA DE REGALOS (SIMÉTRICA) ================= */}
          <GiftRegistryCard />

        </div>
      </div>
    </section>
  )
}