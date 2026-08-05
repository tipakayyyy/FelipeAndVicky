import React from 'react'

// =========================================================
// 🖼️ IMAGEN DE FONDO FIJA PARA EL FOOTER
// Cambia esta URL por la foto que quieras (ej: '/photos/footer-bg.jpg')
// =========================================================
const FOOTER_BG_IMAGE = '/photos/footer.jpeg'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="wedding-footer">
      <style>{`
        .wedding-footer {
          position: relative;
          width: 100%;
          min-height: 400px; /* Altura mínima para que luzca la foto */
          display: flex;
          align-items: center;
          justify-content: center;
          
          /* 🖼️ CONFIGURACIÓN DE IMAGEN DE FONDO (Fija, sin carrusel) */
          background-image: url('${FOOTER_BG_IMAGE}');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          
          /* Opcional: Descomenta la siguiente línea para efecto Parallax suave */
          /* background-attachment: fixed; */
          
          font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
          margin-top: auto; /* Empuja el footer al final si hay poco contenido */
        }

        /* 🌑 CAPA DE COLOR OSCURO SOBREPUESTA (Overlay) */
        .wedding-footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          /* Fondo color vino oscuro con opacidad, igual que el inicio */
          background-color: rgba(36, 7, 10, 0.85); 
          z-index: 1;
        }

        /* ✉️ CONTENEDOR DE TEXTO CENTRAL */
        .footer-content {
          position: relative;
          z-index: 2; /* Por encima de la capa oscura */
          text-align: center;
          color: #FAF7F2;
          padding: 60px 20px;
          max-width: 600px;
        }

        .footer-subtitle {
          display: block;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.75rem;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #D4A373; /* Dorado */
          margin-bottom: 15px;
          font-weight: 600;
        }

        .footer-title {
          font-size: 3.2rem;
          font-weight: 300;
          margin: 0 0 15px 0;
          line-height: 1.1;
        }

        .footer-title span {
          font-style: italic;
          color: #E2B081;
        }

        .footer-divider {
          width: 60px;
          height: 1px;
          background-color: #D4A373;
          margin: 0 auto 20px;
          opacity: 0.7;
        }

        .footer-thankyou {
          font-size: 1.1rem;
          color: #E8DACB;
          line-height: 1.6;
          margin: 0 0 40px 0;
          font-weight: 300;
        }

        .footer-copyright {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.75rem;
          color: rgba(163, 143, 128, 0.8);
          letter-spacing: 0.5px;
        }

        /* Adaptación para pantallas pequeñas (móviles) */
        @media (max-width: 600px) {
          .wedding-footer {
            min-height: 350px;
          }
          .footer-title {
            font-size: 2.5rem;
          }
          .footer-thankyou {
            font-size: 1rem;
          }
        }
      `}</style>

      <div className="footer-content">
        <span className="footer-subtitle">✧ NOS VEMOS PRONTO ✧</span>
        
        <h3 className="footer-title">
          Felipe <span>&</span> Victoria
        </h3>
        
        <div className="footer-divider"></div>
        
        <p className="footer-thankyou">
          Gracias por ser parte de nuestra historia y acompañarnos en este día tan especial.
        </p>
        
        <p className="footer-copyright">
          © {currentYear} | Hecho con amor para nuestra boda.
        </p>
      </div>
    </footer>
  )
}