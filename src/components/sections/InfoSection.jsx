import React, { useState } from 'react'

// =========================================================
// 🖼️ CONFIGURACIÓN DE IMÁGENES OPCIONALES
// =========================================================
// Remplaza null por la ruta de tu foto si deseas cambiar el vector por foto
const customImages = {
  woman: null,       // ej: '/photos/dama.jpg'
  man: '/photos/caballero.jpeg',         // ej: '/photos/caballero.jpg'
  giftBanner: '/photos/foto-pareja.jpeg'   // ej: '/photos/foto-pareja.jpg'
}

// =========================================================
// 🌿 ORNAMENTOS Y VECTORIALES
// =========================================================
const BotanicalBranch = ({ color = '#D4A373', width = 110 }) => (
  <svg width={width} height="22" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 12C30 12 40 12 60 12C80 12 90 12 120 12" stroke={color} strokeWidth="0.75" strokeDasharray="2 2" />
    <circle cx="60" cy="12" r="3" fill={color} />
    <path d="M48 12C45 8 40 7 36 9C38 12 42 13 48 12Z" fill={color} opacity="0.85" />
    <path d="M52 12C50 16 46 18 42 16C43 13 47 11 52 12Z" fill={color} opacity="0.85" />
    <path d="M72 12C75 8 80 7 84 9C82 12 78 13 72 12Z" fill={color} opacity="0.85" />
    <path d="M68 12C70 16 74 18 78 16C77 13 73 11 68 12Z" fill={color} opacity="0.85" />
  </svg>
)

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

const WomanSilhouette = ({ color = '#FAF7F2', height = 52 }) => (
  <svg height={height} viewBox="0 0 100 200" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M50 12 C38 12 33 24 33 38 C33 46 38 52 38 52 C42 46 44 44 50 44 C56 44 58 46 62 52 C62 52 67 46 67 38 C67 24 62 12 50 12 Z" />
    <circle cx="50" cy="32" r="15" />
    <path d="M37 56 C29 56 24 62 24 72 L24 102 C24 107 28 110 32 110 L34 110 L22 154 C21 157 23 160 27 160 L73 160 C77 160 79 157 78 154 L66 110 L68 110 C72 110 76 107 76 102 L76 72 C76 62 71 56 63 56 Z" />
    <rect x="41" y="162" width="7" height="30" rx="3.5" />
    <rect x="52" y="162" width="7" height="30" rx="3.5" />
  </svg>
)

const ManSilhouette = ({ color = '#FAF7F2', height = 52 }) => (
  <svg height={height} viewBox="0 0 100 200" fill={color} xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="28" r="17" />
    <path d="M26 56 C20 56 16 62 16 72 L16 108 C16 113 20 116 24 116 L31 116 L31 184 C31 189 35 192 40 192 L44 192 C49 192 52 189 52 184 L52 126 L49 126 L49 184 C49 189 52 192 56 192 L60 192 C69 192 69 184 L69 116 L76 116 C80 116 84 113 84 108 L84 72 C84 62 80 56 74 56 Z" />
    <polygon points="50,56 42,56 46,74 50,88 54,74 58,56" fill="#4A121A" />
    <polygon points="50,60 47,66 50,84 53,66" fill={color} />
    <polygon points="46,56 54,56 50,62" fill={color} />
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
      <div>
        {customImages.giftBanner ? (
          <div className="card-image-header">
            <img src={customImages.giftBanner} alt="Mesa de Regalos" />
          </div>
        ) : (
          <div style={{ textAlign: 'center', marginBottom: '6px' }}>
            <BotanicalBranch color="#D4A373" width={110} />
          </div>
        )}

        <span className="gift-subtitle">✧ MESA DE REGALOS ✧</span>
        <h3 className="gift-headline">Aportes & Regalo de Bodas</h3>

        <p className="gift-description">
          Tu presencia es nuestro mejor regalo. Si deseas hacernos un presente, puedes realizarlo con tarjeta de crédito/débito o vía transferencia bancaria.
        </p>

        <div className="gift-divider" />

        <div className="gift-buttons-wrapper">
          <button
            type="button"
            className="luxury-btn-gold"
            onClick={handleOpenMercadoPago}
          >
            <CardIcon color="#FFFFFF" size={19} />
            <span>Pagar con Tarjeta en Línea</span>
          </button>

          <div className="transfer-grid">
            <button
              type="button"
              className="luxury-btn-primary"
              onClick={() => handleCopy(bankData.bcpAccount, 'Número BCP')}
            >
              <CopyIcon color="#FAF7F2" size={16} />
              <span>Copiar cuenta BCP</span>
            </button>

            <button
              type="button"
              className="luxury-btn-primary"
              onClick={() => handleCopy(bankData.cciAccount, 'CCI')}
            >
              <CopyIcon color="#FAF7F2" size={16} />
              <span>Copiar CCI</span>
            </button>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <span style={{ fontSize: '0.78rem', color: '#DCD3C9', fontStyle: 'italic', letterSpacing: '0.3px' }}>
          Titulares: Felipe & Vicky
        </span>
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
  const dressCodeData = {
    women: 'Luzcan su belleza con tacones y vestidos largos.',
    men: 'Destaquen su elegancia con trajes en tonos oscuros.',
    avoidColors: [
      { name: 'Blanco', hex: '#ffffff' },
      { name: 'Ivory', hex: '#f5efe6' },
      { name: 'Vino', hex: '#6b1d24' },
      { name: 'Azul Noche', hex: '#1b2a4a' },
      { name: 'Dorado', hex: '#b8860b' }
    ]
  }

  return (
    <section id="informacion" style={{ backgroundColor: '#FAF7F2', width: '100%', padding: '70px 20px', display: 'flex', justifyContent: 'center', boxSizing: 'border-box' }}>
      <style>{`
        .info-wrapper {
          max-width: 1080px;
          width: 100%;
          font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
        }

        .section-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .section-header .tag {
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 3.5px;
          color: #B8895E !important;
          font-weight: 700;
          display: block;
          margin-bottom: 6px;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .section-header .title {
          font-size: 2.5rem;
          font-weight: 300;
          color: #2C1810 !important;
          margin: 0;
        }

        .section-header .title-italic {
          color: #8A2B32 !important;
          font-style: italic;
        }

        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 28px;
          align-items: stretch;
        }

        /* CONTENEDORES PRINCIPALES COMPACTOS */
        .gift-card-container, .dress-card-container {
          background-color: #4A121A !important;
          border: 1px solid #6E1F27 !important;
          border-radius: 26px;
          padding: 30px 24px;
          box-shadow: 0 18px 40px rgba(44, 24, 16, 0.12);
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-sizing: border-box;
          position: relative;
        }

        .card-image-header {
          width: 100%;
          height: 165px;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 14px;
          border: 1px solid rgba(212, 163, 115, 0.3);
        }

        .card-image-header img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .gift-subtitle {
          display: block;
          text-align: center;
          font-size: 0.72rem;
          letter-spacing: 3px;
          color: #D4A373 !important;
          font-weight: 600;
          margin-bottom: 4px;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .gift-headline {
          font-size: 1.85rem;
          font-weight: 400;
          color: #FAF7F2 !important;
          text-align: center;
          margin: 0 0 10px 0;
          letter-spacing: -0.2px;
        }

        .gift-description {
          color: #E8DACB !important;
          font-size: 0.94rem;
          line-height: 1.55;
          text-align: center;
          margin: 0 auto;
          max-width: 420px;
          font-weight: 300;
        }

        .gift-divider {
          width: 40px;
          height: 1px;
          background-color: #D4A373;
          margin: 18px auto;
          opacity: 0.5;
        }

        /* BOTONES */
        .gift-buttons-wrapper {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }

        .transfer-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          width: 100%;
        }

        .luxury-btn-gold {
          width: 100%;
          height: 50px;
          background-color: #C4966B !important;
          color: #FFFFFF !important;
          border: none;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 600;
          font-family: system-ui, -apple-system, sans-serif;
          letter-spacing: 0.3px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 0 18px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
          transition: all 250ms ease;
        }

        .luxury-btn-gold:hover {
          background-color: #B08156 !important;
          transform: translateY(-2px);
        }

        .luxury-btn-primary {
          width: 100%;
          height: 48px;
          background-color: #330B10 !important;
          color: #FAF7F2 !important;
          border: 1px solid rgba(212, 163, 115, 0.35);
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 500;
          font-family: system-ui, -apple-system, sans-serif;
          letter-spacing: 0.2px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 12px;
          transition: all 250ms ease;
        }

        .luxury-btn-primary:hover {
          background-color: #24070A !important;
          border-color: #D4A373;
          transform: translateY(-2px);
        }

        /* TOAST */
        .luxury-toast {
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #24070A;
          color: #FAF7F2;
          padding: 10px 22px;
          border-radius: 30px;
          font-size: 0.8rem;
          font-family: system-ui, -apple-system, sans-serif;
          font-weight: 500;
          box-shadow: 0 10px 25px rgba(0,0,0,0.4);
          border: 1px solid #D4A373;
          z-index: 10;
          white-space: nowrap;
        }

        /* SUBCARD DE DAMAS/CABALLEROS CON IMÁGENES AMPLIADAS */
        .inner-subcard {
          background-color: rgba(0, 0, 0, 0.22);
          border-radius: 18px;
          padding: 14px 12px;
          text-align: center;
          border: 1px solid rgba(212, 163, 115, 0.22);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .subcard-img {
          width: 100%;
          height: 165px; /* 👈 IMAGENES MÁS GRANDES Y VISIBLES */
          object-fit: cover;
          border-radius: 14px;
          margin-bottom: 12px;
          border: 1px solid rgba(212, 163, 115, 0.25);
        }

        @media (max-width: 640px) {
          .gift-card-container, .dress-card-container {
            padding: 24px 18px;
            border-radius: 22px;
          }

          .gift-headline {
            font-size: 1.65rem;
          }

          .transfer-grid {
            grid-template-columns: 1fr;
          }

          .subcard-img {
            height: 140px;
          }
        }
      `}</style>

      <div className="info-wrapper">
        
        {/* ENCABEZADO */}
        <div className="section-header">
          <span className="tag">Detalles Importantes</span>
          <h2 className="title">
            Información para nuestros <span className="title-italic">Invitados</span>
          </h2>
          <div style={{ width: '40px', height: '1px', backgroundColor: '#8A2B32', margin: '12px auto 0' }} />
        </div>

        <div className="grid-container">
          
          {/* CÓDIGO DE VESTIMENTA */}
          <div className="dress-card-container">
            <div>
              <div style={{ textAlign: 'center', marginBottom: '6px' }}>
                <BotanicalBranch color="#D4A373" width={110} />
              </div>
              <span className="gift-subtitle">✧ DRESS CODE ✧</span>
              <h3 className="gift-headline" style={{ marginBottom: '18px' }}>
                Código de Vestimenta
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                
                {/* DAMAS */}
                <div className="inner-subcard">
                  {customImages.woman ? (
                    <img src={customImages.woman} alt="Damas" className="subcard-img" />
                  ) : (
                    <div style={{ height: '65px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '4px 0 8px 0' }}>
                      <WomanSilhouette color="#FAF7F2" height={52} />
                    </div>
                  )}
                  <strong style={{ display: 'block', color: '#FAF7F2', fontSize: '0.95rem', marginBottom: '4px' }}>
                    Damas
                  </strong>
                  <span style={{ fontSize: '0.82rem', color: '#E8DACB', lineHeight: '1.4', display: 'block' }}>
                    {dressCodeData.women}
                  </span>
                </div>

                {/* CABALLEROS */}
                <div className="inner-subcard">
                  {customImages.man ? (
                    <img src={customImages.man} alt="Caballeros" className="subcard-img" />
                  ) : (
                    <div style={{ height: '65px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '4px 0 8px 0' }}>
                      <ManSilhouette color="#FAF7F2" height={52} />
                    </div>
                  )}
                  <strong style={{ display: 'block', color: '#FAF7F2', fontSize: '0.95rem', marginBottom: '4px' }}>
                    Caballeros
                  </strong>
                  <span style={{ fontSize: '0.82rem', color: '#E8DACB', lineHeight: '1.4', display: 'block' }}>
                    {dressCodeData.men}
                  </span>
                </div>

              </div>
            </div>

            {/* SECCIÓN COLORES RESERVADOS */}
            <div className="inner-subcard" style={{ padding: '14px 12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', justifyContent: 'center' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#D4A373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                </svg>
                <span style={{ fontSize: '0.72rem', color: '#FAF7F2', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.8px', fontFamily: 'system-ui' }}>
                  Reservados para la novia & novio:
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', gap: '6px', width: '100%' }}>
                {dressCodeData.avoidColors.map((item, idx) => (
                  <div key={idx} style={{ textAlign: 'center' }}>
                    <div 
                      style={{ 
                        width: '28px', 
                        height: '28px', 
                        backgroundColor: item.hex, 
                        borderRadius: '50%', 
                        boxShadow: '0 3px 8px rgba(0,0,0,0.3)',
                        border: item.hex === '#ffffff' || item.hex === '#f5efe6' ? '1px solid #D1C2B2' : '2px solid rgba(255,255,255,0.4)',
                        margin: '0 auto 4px auto'
                      }} 
                    />
                    <span style={{ fontSize: '0.68rem', color: '#E8DACB', fontFamily: 'system-ui', display: 'block' }}>
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MESA DE REGALOS */}
          <div>
            <GiftRegistryCard />
          </div>

        </div>
      </div>
    </section>
  )
}