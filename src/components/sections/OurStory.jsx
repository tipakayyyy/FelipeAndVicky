import React, { useRef, useState, useEffect } from 'react'

// 📸 MANTENIENDO EXACTAMENTE TUS 22 FOTOS Y RUTAS EXISTENTES
const STORY_ITEMS = [
  { id: 1, year: '2005', image: '/photos/2005.jpeg' },
  { id: 2, year: '2006', image: '/photos/2006.jpeg' },
  { id: 3, year: '2007', image: '/photos/2007.jpeg' },
  { id: 4, year: '2008', image: '/photos/2008.jpeg' },
  { id: 5, year: '2009', image: '/photos/2009.jpeg' },
  { id: 6, year: '2010', image: '/photos/2010.jpeg' },
  { id: 7, year: '2011', image: '/photos/2011.jpeg' },
  { id: 8, year: '2012', image: '/photos/2012.jpeg' },
  { id: 9, year: '2013', image: '/photos/2013.jpeg' },
  { id: 10, year: '2014', image: '/photos/2014.jpeg' },
  { id: 11, year: '2015', image: '/photos/2015.jpeg' },
  { id: 12, year: '2016', image: '/photos/2016.jpeg' },
  { id: 13, year: '2017', image: '/photos/2017.jpeg' },
  { id: 14, year: '2018', image: '/photos/2018.jpeg' },
  { id: 15, year: '2019', image: '/photos/2019.jpeg' },
  { id: 16, year: '2020', image: '/photos/2020.jpeg' },
  { id: 17, year: '2021', image: '/photos/2021.jpeg' },
  { id: 18, year: '2022', image: '/photos/2022.jpeg' },
  { id: 19, year: '2023', image: '/photos/2023.jpeg' },
  { id: 20, year: '2024', image: '/photos/2024.jpeg' },
  { id: 21, year: '2025', image: '/photos/2025.jpeg' },
  { id: 22, year: '2026', image: '/photos/2026.jpeg' },
]

export default function OurStory() {
  const scrollRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // Manejador del desplazamiento con actualización fluida del indicador
  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current
      const scrollPosition = container.scrollLeft
      // Ancho aproximado de cada ítem más el gap
      const itemWidth = container.querySelector('.story-card')?.offsetWidth || 280
      const gap = 32
      const index = Math.round(scrollPosition / (itemWidth + gap))
      setActiveIndex(Math.min(Math.max(index, 0), STORY_ITEMS.length - 1))
    }
  }

  // Navegación mediante flechas
  const scroll = (direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current
      const itemWidth = container.querySelector('.story-card')?.offsetWidth || 280
      const amount = direction === 'left' ? -(itemWidth + 32) : (itemWidth + 32)
      container.scrollBy({ left: amount, behavior: 'smooth' })
    }
  }

  // Click directo en los puntos indicadores
  const scrollToCard = (index) => {
    if (scrollRef.current) {
      const container = scrollRef.current
      const itemWidth = container.querySelector('.story-card')?.offsetWidth || 280
      const gap = 32
      container.scrollTo({ left: index * (itemWidth + gap), behavior: 'smooth' })
    }
  }

  return (
    <section className="our-story-editorial">
      <style>{`
        /* =========================================================
           PALETA DE COLORES EDITORIAL
           Fondo: Beige Warm Marfil (#F6F1E8 / #EFE8DC)
           Principal: Verde Bosque Botánico (#173C32 / #1F4A3C)
           Acento Secundario: Vino sutil (#6B1F2A)
           Detalles: Dorado Atemporal Fine-line (#C6A15B)
        ========================================================= */
        .our-story-editorial {
          background-color: #F6F1E8;
          padding: 100px 0 90px 0;
          font-family: 'Montserrat', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* 3. HEADER DE LA SECCIÓN EDITORIAL */
        .story-header {
          text-align: center;
          margin-bottom: 50px;
          padding: 0 24px;
        }

        .story-subtag {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 5px;
          text-transform: uppercase;
          font-weight: 500;
          color: #173C32;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .story-subtag::before,
        .story-subtag::after {
          content: "✦";
          font-size: 0.6rem;
          color: #C6A15B;
        }

        .story-main-title {
          font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
          font-size: 3.2rem;
          color: #173C32;
          font-weight: 400;
          letter-spacing: -0.5px;
          margin: 0 0 20px 0;
          line-height: 1.15;
        }

        /* Separador fino ornamental debajo del título */
        .story-ornament-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          color: #C6A15B;
          font-size: 0.75rem;
          opacity: 0.8;
        }

        .story-ornament-divider::before,
        .story-ornament-divider::after {
          content: "";
          height: 1px;
          width: 50px;
          background: linear-gradient(90deg, transparent, #C6A15B, transparent);
        }

        /* 4. CONTENEDOR PRINCIPAL DEL CARRUSEL */
        .story-carousel-wrapper {
          position: relative;
          width: 100%;
        }

        .story-scroll-container {
          display: flex;
          gap: 32px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding: 20px 10vw 40px 10vw;
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
        }

        /* Ocultar barra de scroll para limpieza estética visual */
        .story-scroll-container::-webkit-scrollbar {
          display: none;
        }
        .story-scroll-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* TARJETAS DE FOTOGRAFÍA (DESKTOP) */
        .story-item-block {
          flex: 0 0 calc((100vw - 20vw - (32px * 3)) / 4.2); /* Muestra 4.2 fotos en escritorio */
          min-width: 260px;
          max-width: 310px;
          scroll-snap-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .story-card {
          width: 100%;
          aspect-ratio: 3 / 4;
          border-radius: 12px;
          overflow: hidden;
          background-color: #EFE8DC;
          box-shadow: 0 8px 24px rgba(23, 60, 50, 0.05);
          transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 400ms ease;
          position: relative;
        }

        .story-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 32px rgba(23, 60, 50, 0.1);
        }

        .story-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 700ms ease;
        }

        .story-card:hover img {
          transform: scale(1.02);
        }

        /* 5. AÑOS EDITORIALES */
        .story-year-wrapper {
          margin-top: 18px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .story-year-number {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.65rem;
          font-weight: 500;
          color: #173C32;
          letter-spacing: 1px;
        }

        .story-year-subline {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #C6A15B;
          font-size: 0.5rem;
          margin-top: 4px;
          opacity: 0.75;
        }

        .story-year-subline::before,
        .story-year-subline::after {
          content: "";
          height: 1px;
          width: 20px;
          background-color: #C6A15B;
        }

        /* 6. CONTROLES DEL CARRUSEL (FLECHAS MÍNIMAS) */
        .story-nav-btn {
          position: absolute;
          top: calc(50% - 35px);
          transform: translateY(-50%);
          z-index: 5;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background-color: #FBF8F2;
          border: 1px solid rgba(198, 161, 91, 0.3);
          color: #173C32;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 250ms ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
        }

        .story-nav-btn:hover {
          background-color: #173C32;
          color: #FBF8F2;
          border-color: #173C32;
          transform: translateY(-50%) scale(1.05);
        }

        .story-nav-btn:active {
          background-color: #6B1F2A; /* Acento vino sutil en tap */
          border-color: #6B1F2A;
        }

        .story-nav-btn.prev { left: 3vw; }
        .story-nav-btn.next { right: 3vw; }

        .story-nav-btn svg {
          width: 18px;
          height: 18px;
          fill: currentColor;
        }

        /* 7. INDICADORES PUNTUALES MINIMALISTAS */
        .story-indicators {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-top: 24px;
        }

        .story-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #DCD3C5;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 300ms ease;
        }

        .story-dot.active {
          background-color: #173C32;
          transform: scale(1.35);
          box-shadow: 0 0 0 2px rgba(107, 31, 42, 0.15); /* Micro toque vino alrededor */
        }

        /* =========================================================
           9. ADAPTACIÓN RESPONSIVE EDITORIAL
        ========================================================= */

        /* TABLET */
        @media (max-width: 1024px) {
          .our-story-editorial {
            padding: 80px 0 70px 0;
          }
          .story-main-title {
            font-size: 2.7rem;
          }
          .story-scroll-container {
            padding-left: 6vw;
            padding-right: 6vw;
            gap: 24px;
          }
          .story-item-block {
            flex: 0 0 calc((100vw - 12vw - (24px * 2)) / 3.1); /* Muestra 3 fotos principales */
            min-width: 220px;
          }
        }

        /* MOBILE: 1 FOTO DESTACADA POR PANTALLA */
        @media (max-width: 650px) {
          .our-story-editorial {
            padding: 60px 0 50px 0;
          }
          .story-header {
            margin-bottom: 36px;
          }
          .story-main-title {
            font-size: 2.2rem;
          }

          .story-nav-btn {
            display: none; /* Desaparecen flechas en mobile para limpiar vista */
          }

          .story-scroll-container {
            padding-left: 12vw;
            padding-right: 12vw;
            gap: 20px;
            scroll-snap-type: x mandatory;
          }

          .story-item-block {
            flex: 0 0 76vw; /* Exactamente 1 foto central holgada */
            max-width: none;
            scroll-snap-align: center;
          }

          .story-card {
            border-radius: 10px;
          }

          .story-year-number {
            font-size: 1.5rem;
          }
        }
      `}</style>

      {/* 3. HEADER EDITORIAL DE LA SECCIÓN */}
      <header className="story-header">
        <span className="story-subtag">NUESTRO CAMINO</span>
        <h2 className="story-main-title">Nuestra Historia</h2>
        <div className="story-ornament-divider">✦</div>
      </header>

      {/* 4. CARRUSEL Y NAVEGACIÓN */}
      <div className="story-carousel-wrapper">
        {/* Flecha Izquierda */}
        <button 
          className="story-nav-btn prev" 
          onClick={() => scroll('left')}
          aria-label="Fotografía anterior"
        >
          <svg viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>

        {/* 4 & 5. CONTENEDOR DE FOTOGRAFÍAS Y AÑOS */}
        <div 
          className="story-scroll-container" 
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {STORY_ITEMS.map((item) => (
            <div key={item.id} className="story-item-block">
              <div className="story-card">
                <img 
                  src={item.image} 
                  alt={`Nuestra Historia ${item.year}`} 
                  loading="lazy" 
                />
              </div>

              {/* 5. AÑO CON ADORNO FINE-LINE */}
              <div className="story-year-wrapper">
                <span className="story-year-number">{item.year}</span>
                <div className="story-year-subline">✦</div>
              </div>
            </div>
          ))}
        </div>

        {/* Flecha Derecha */}
        <button 
          className="story-nav-btn next" 
          onClick={() => scroll('right')}
          aria-label="Siguiente fotografía"
        >
          <svg viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>
      </div>

      {/* 7. INDICADOR MINIMALISTA (PUNTOS) */}
      <div className="story-indicators">
        {STORY_ITEMS.map((item, index) => (
          <button
            key={item.id}
            className={`story-dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => scrollToCard(index)}
            aria-label={`Ir al año ${item.year}`}
          />
        ))}
      </div>
    </section>
  )
}