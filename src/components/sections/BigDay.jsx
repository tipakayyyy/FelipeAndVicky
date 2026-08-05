import React, { useState } from 'react'
import { SCHEDULE, COUPLE, COUPLE_PHOTOS } from '../../constants'

export default function BigDay() {
  // Estado para saber qué lugar está seleccionado: null (foto por defecto), 'ceremony' o 'reception'
  const [selectedVenue, setSelectedVenue] = useState(null)

  // Datos de los lugares con sus direcciones, fotos y mapas
  const venuesData = {
    ceremony: {
      title: 'Ceremonia',
      time: SCHEDULE.ceremony.time,
      address: SCHEDULE.ceremony.address,
      // Cambia esta ruta por la foto real de la iglesia/local de ceremonia si la tienes
      photo: '/photos/ceremony.jpeg', 
      mapQuery: encodeURIComponent(SCHEDULE.ceremony.address),
      wazeUrl: `https://waze.com/ul?q=${encodeURIComponent(SCHEDULE.ceremony.address)}`
    },
    reception: {
      title: 'Recepción',
      time: SCHEDULE.reception.time,
      address: SCHEDULE.reception.address,
      // Cambia esta ruta por la foto real del local de recepción si la tienes
      photo: '/photos/reception.jpeg',
      mapQuery: encodeURIComponent(SCHEDULE.reception.address),
      wazeUrl: `https://waze.com/ul?q=${encodeURIComponent(SCHEDULE.reception.address)}`
    }
  }

  // Foto por defecto cuando no hay ningún lugar seleccionado
  const defaultPhoto = COUPLE_PHOTOS?.bigDay || '/photos/maps.jpeg'

  const currentVenue = selectedVenue ? venuesData[selectedVenue] : null

  return (
    <section 
      id="ubicacion" 
      style={{ 
        backgroundColor: '#380e12', // Color granate/vino elegante como en tu captura
        color: '#ffffff',
        padding: '80px 20px',
        minHeight: '520px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div 
        style={{
          maxWidth: '1100px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'center'
        }}
      >
        {/* ============================================================ */}
        {/* COLUMNA IZQUIERDA: TEXTO Y TARJETAS SELECCIONABLES           */}
        {/* ============================================================ */}
        <div>
          <span style={{ 
            textTransform: 'uppercase', 
            fontSize: '0.8rem', 
            letterSpacing: '3px', 
            color: '#d4a373', 
            fontWeight: '600' 
          }}>
            {COUPLE.dateLong}
          </span>

          <h2 style={{ 
            fontSize: '2.5rem', 
            fontFamily: 'serif', 
            margin: '15px 0 35px 0', 
            lineHeight: '1.2',
            fontWeight: '300'
          }}>
            Acompáñanos en este<br />día tan <i style={{ fontFamily: 'serif', fontWeight: 'normal' }}>especial</i>
          </h2>

          {/* TARJETAS DE LUGAR */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
            
            {/* TARJETA 1: CEREMONIA */}
            <div 
              onClick={() => setSelectedVenue(selectedVenue === 'ceremony' ? null : 'ceremony')}
              style={{
                backgroundColor: selectedVenue === 'ceremony' ? 'rgba(212, 163, 115, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                border: selectedVenue === 'ceremony' ? '2px solid #d4a373' : '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '16px',
                padding: '20px 16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: selectedVenue === 'ceremony' ? '0 0 15px rgba(212, 163, 115, 0.3)' : 'none'
              }}
            >
              <span style={{ fontSize: '1.4rem', fontFamily: 'serif', fontWeight: 'bold', color: '#ffffff', display: 'block' }}>
                {SCHEDULE.ceremony.time}
              </span>
              <span style={{ fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#d4a373', fontWeight: '600', display: 'block', margin: '4px 0 10px 0' }}>
                CEREMONIA
              </span>
              <p style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.8)', margin: 0, lineHeight: '1.4' }}>
                📍 {SCHEDULE.ceremony.address}
              </p>
            </div>

            {/* TARJETA 2: RECEPCIÓN */}
            <div 
              onClick={() => setSelectedVenue(selectedVenue === 'reception' ? null : 'reception')}
              style={{
                backgroundColor: selectedVenue === 'reception' ? 'rgba(212, 163, 115, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                border: selectedVenue === 'reception' ? '2px solid #d4a373' : '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '16px',
                padding: '20px 16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: selectedVenue === 'reception' ? '0 0 15px rgba(212, 163, 115, 0.3)' : 'none'
              }}
            >
              <span style={{ fontSize: '1.4rem', fontFamily: 'serif', fontWeight: 'bold', color: '#ffffff', display: 'block' }}>
                {SCHEDULE.reception.time}
              </span>
              <span style={{ fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#d4a373', fontWeight: '600', display: 'block', margin: '4px 0 10px 0' }}>
                RECEPCIÓN
              </span>
              <p style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.8)', margin: 0, lineHeight: '1.4' }}>
                📍 {SCHEDULE.reception.address}
              </p>
            </div>

          </div>

          <p style={{ fontSize: '0.85rem', color: '#d4a373', fontStyle: 'italic', margin: 0 }}>
            💡 Haz clic en Ceremonia o Recepción para ver el mapa y cómo llegar.
          </p>
        </div>

        {/* ============================================================ */}
        {/* COLUMNA DERECHA: FOTO POR DEFECTO O MAPA + UBICACIÓN         */}
        {/* ============================================================ */}
        <div 
          style={{
            position: 'relative',
            width: '100%',
            height: '420px',
            borderRadius: '20px',
            overflow: 'hidden',
            backgroundColor: 'rgba(0,0,0,0.3)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 15px 35px rgba(0,0,0,0.4)'
          }}
        >
          {/* VISTA POR DEFECTO: FOTO PRINCIPAL */}
          {!selectedVenue && (
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <img 
                src={defaultPhoto} 
                alt="El Gran Día" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(56,14,18,0.85) 0%, transparent 60%)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '25px'
              }}>
                <span style={{ color: '#ffffff', fontSize: '0.95rem', fontFamily: 'serif', letterSpacing: '1px' }}>
                  ✨ Toca una ubicación a la izquierda para ver el mapa
                </span>
              </div>
            </div>
          )}

          {/* VISTA AL SELECCIONAR UN LUGAR: MAPA Y BOTÓN DE REDIRECCIÓN */}
          {selectedVenue && (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
              
              {/* iframe con el Mapa Real de Google Maps */}
              <div style={{ flex: 1, position: 'relative' }}>
                <iframe
                  title={`Mapa de ${currentVenue.title}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://maps.google.com/maps?q=${currentVenue.mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                />
              </div>

              {/* BARRA INFERIOR CON DATOS Y BOTONES PARA LLEGAR */}
              <div style={{
                backgroundColor: '#27080a',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                flexWrap: 'wrap'
              }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem', color: '#ffffff', fontFamily: 'serif' }}>
                    {currentVenue.title} ({currentVenue.time})
                  </h4>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)' }}>
                    {currentVenue.address}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {/* Botón Abrir en Google Maps */}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${currentVenue.mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: '#d4a373',
                      color: '#27080a',
                      padding: '8px 14px',
                      borderRadius: '30px',
                      fontSize: '0.82rem',
                      fontWeight: 'bold',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    }}
                  >
                    📍 Cómo llegar (Google Maps)
                  </a>

                  {/* Botón Volver a la Foto */}
                  <button
                    onClick={() => setSelectedVenue(null)}
                    style={{
                      backgroundColor: 'transparent',
                      color: '#ffffff',
                      border: '1px solid rgba(255,255,255,0.3)',
                      padding: '8px 12px',
                      borderRadius: '30px',
                      fontSize: '0.82rem',
                      cursor: 'pointer'
                    }}
                  >
                    ✕ Ver foto
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  )
}