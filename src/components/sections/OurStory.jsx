import React, { useState } from 'react'

// =========================================================
// 🖼️ RUTA DE TU IMAGEN DE FONDO ESTÁTICA
// Cambia '/photos/story-bg.jpg' por la ruta o URL de tu foto de fondo
// =========================================================
const STORY_BG_IMAGE = '/photos/texture.jpg'

export default function StorySection() {
  // Estado para el visor de foto ampliada (Modal / Lightbox)
  const [selectedEvent, setSelectedEvent] = useState(null)

  const timelineEvents = [
    {
      year: '2003',
      tag: 'EL INICIO',
      title: 'Nuestro Primer Encuentro',
      description: 'Una coincidencia inesperada que se convirtió en una mirada inolvidable. Aquel día comenzó a escribirse la historia más bonita de nuestras vidas.',
      photo: '/photos/story-1.jpeg'
    },
    {
      year: '2005',
      tag: 'FAMILIA',
      title: 'Nuestro Hogar y Nuestra Familia',
      description: 'El comienzo de nuestro viaje juntos, construyendo un hogar lleno de amor, risas y recuerdos que nos acompañarán para siempre.',
      photo: '/photos/story-2.jpeg' 
    },
    {
      year: '2025',
      tag: 'EL PASO MÁS IMPORTANTE',
      title: 'La Propuesta',
      description: 'Bajo una atmósfera mágica, con el corazón acelerado y una promesa infinita: un "Sí, acepto" que resonará para siempre.',
      photo: '/photos/story-main.jpeg'
    },
    {
      year: '2026',
      tag: 'NUESTRO CAPÍTULO PRINCIPAL',
      title: 'El Gran Día',
      description: 'Frente a las personas que más amamos en la vida, uniremos nuestras almas para construir un futuro infinito.',
      photo: '/photos/story-3.jpeg'
    }
  ]

  return (
    <section
      id="nuestra-historia"
      style={{
        backgroundColor: '#142019', // Verde frío oscuro súper elegante de fondo base
        
        /* 🖼️ IMAGEN DE FONDO ESTÁTICA CON FILTRO OSCURO */
        backgroundImage: `linear-gradient(rgba(20, 32, 25, 0.85), rgba(20, 32, 25, 0.85)), url('${STORY_BG_IMAGE}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed', // Fondo estático fijo al hacer scroll
        
        color: '#ffffff',
        padding: '90px 20px 110px 20px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Luz ambiental sutil */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(212, 163, 115, 0.05) 0%, rgba(20, 32, 25, 0) 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        
        {/* ENCABEZADO */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ 
            textTransform: 'uppercase', 
            fontSize: '0.78rem', 
            letterSpacing: '4px', 
            color: '#d4a373', 
            fontWeight: '600' 
          }}>
            NUESTRA HISTORIA
          </span>
          <h2 style={{ 
            fontSize: '2.6rem', 
            fontFamily: 'serif', 
            marginTop: '10px',
            marginBottom: '15px',
            fontWeight: '300',
            color: '#f4efe9'
          }}>
            El camino hacia el <span style={{ color: '#d4a373', fontStyle: 'italic', fontWeight: 'normal' }}>Para Siempre</span>
          </h2>
          <div style={{ width: '40px', height: '1px', backgroundColor: '#d4a373', margin: '0 auto', opacity: 0.6 }} />
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem', marginTop: '14px', letterSpacing: '0.5px' }}>
            Desliza horizontalmente y haz clic en las fotografías para ampliar 🔍
          </p>
        </div>

        {/* CONTENEDOR DE LÍNEA DE TIEMPO HORIZONTAL */}
        <div style={{ position: 'relative', padding: '40px 0 20px 0' }}>
          
          {/* Eje horizontal dorado continuo */}
          <div style={{
            position: 'absolute',
            top: '25px',
            left: '0',
            right: '0',
            height: '1px',
            backgroundColor: 'rgba(212, 163, 115, 0.25)',
            zIndex: 1
          }} />

          {/* Carrusel Desplazable en una sola línea */}
          <div style={{
            display: 'flex',
            gap: '30px',
            overflowX: 'auto',
            paddingBottom: '25px',
            paddingTop: '10px',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            position: 'relative',
            zIndex: 2,
            scrollbarWidth: 'thin',
            scrollbarColor: '#d4a373 rgba(255,255,255,0.05)'
          }}>

            {timelineEvents.map((event, index) => (
              <div 
                key={index}
                style={{
                  flex: '0 0 350px',
                  scrollSnapAlign: 'start',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}
              >
                {/* Punto nodal dorado en la línea */}
                <div style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: '#142019',
                  border: '2px solid #d4a373',
                  boxShadow: '0 0 10px rgba(212, 163, 115, 0.5)',
                  margin: '-7px auto 25px auto',
                  position: 'relative',
                  zIndex: 3
                }} />

                {/* Tarjeta con Foto Grande */}
                <div 
                  onClick={() => setSelectedEvent(event)}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(212, 163, 115, 0.2)',
                    borderRadius: '20px',
                    padding: '20px',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    {/* Encabezado de la Tarjeta */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <span style={{ fontSize: '0.7rem', letterSpacing: '2px', color: '#d4a373', fontWeight: '700' }}>
                        {event.tag}
                      </span>
                      <span style={{ fontFamily: 'serif', fontSize: '1.2rem', color: 'rgba(255,255,255,0.4)' }}>
                        {event.year}
                      </span>
                    </div>
              
                    {/* FOTO EXTRA GRANDE E INTERACTIVA */}
                    <div style={{
                      width: '100%',
                      height: '240px',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      marginBottom: '16px',
                      position: 'relative',
                      border: '1px solid rgba(212, 163, 115, 0.25)'
                    }}>
                      <img 
                        src={event.photo} 
                        alt={event.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.4s ease'
                        }}
                      />
                      {/* Badge flotante de clic */}
                      <div style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                        backgroundColor: 'rgba(20, 32, 25, 0.75)',
                        backdropFilter: 'blur(5px)',
                        color: '#d4a373',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '0.72rem',
                        fontWeight: '500',
                        border: '1px solid rgba(212, 163, 115, 0.3)'
                      }}>
                        🔍 Ampliar
                      </div>
                    </div>

                    {/* Título */}
                    <h3 style={{ fontFamily: 'serif', fontSize: '1.35rem', color: '#ffffff', margin: '0 0 8px 0', fontWeight: '400' }}>
                      {event.title}
                    </h3>

                    {/* Descripción */}
                    <p style={{ color: 'rgba(244, 239, 233, 0.75)', fontSize: '0.85rem', lineHeight: '1.6', margin: 0, fontWeight: '300' }}>
                      {event.description}
                    </p>
                  </div>
                </div>

              </div>
            ))}

          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* VISOR MODAL / LIGHTBOX (AL HACER CLIC EN CUALQUIER FOTO)     */}
      {/* ============================================================ */}
      {selectedEvent && (
        <div 
          onClick={() => setSelectedEvent(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(10, 16, 12, 0.92)',
            backdropFilter: 'blur(12px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            cursor: 'zoom-out'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '700px',
              width: '100%',
              backgroundColor: '#17241c',
              border: '1px solid rgba(212, 163, 115, 0.3)',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(0,0,0,0.6)',
              position: 'relative'
            }}
          >
            {/* Botón Cerrar (X) */}
            <button 
              onClick={() => setSelectedEvent(null)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#ffffff',
                fontSize: '1.2rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
            >
              ✕
            </button>
            
            {/* Imagen a pantalla completa */}
            <div style={{ width: '100%', maxHeight: '480px', overflow: 'hidden', backgroundColor: '#0c120e' }}>
              <img 
                src={selectedEvent.photo} 
                alt={selectedEvent.title} 
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
            </div>

            {/* Detalles en el Modal */}
            <div style={{ padding: '25px 30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', letterSpacing: '2px', color: '#d4a373', fontWeight: '700' }}>
                  {selectedEvent.tag}
                </span>
                <span style={{ fontFamily: 'serif', fontSize: '1.3rem', color: 'rgba(255,255,255,0.4)' }}>
                  {selectedEvent.year}
                </span>
              </div>
              <h3 style={{ fontFamily: 'serif', fontSize: '1.7rem', color: '#ffffff', margin: '0 0 10px 0', fontWeight: '300' }}>
                {selectedEvent.title}
              </h3>
              <p style={{ color: 'rgba(244, 239, 233, 0.8)', fontSize: '0.92rem', lineHeight: '1.7', margin: 0, fontWeight: '300' }}>
                {selectedEvent.description}
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  )
}