import React, { useState } from 'react'
import emailjs from '@emailjs/browser' // npm install @emailjs/browser

// =========================================================
// 🖼️ IMAGEN DE FONDO DE LA SECCIÓN RSVP
// Cambia esta URL por la ruta de tu foto (ej: '/photos/rsvp-bg.jpg')
// =========================================================
const RSVP_BACKGROUND_IMAGE = '/photos/fondo.jpeg'

export default function Rsvp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: 'attending', // 'attending' | 'not_attending'
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg(null)

    try {
      // 📧 1. ENVÍO DE CORREO VÍA EMAILJS (OPCIONAL / CONFIGURABLE)
      // Para activarlo solo crea tu cuenta gratis en https://www.emailjs.com/
      // y reemplaza tus IDs aquí:
      
      await emailjs.send(
        'service_o05j1rv',     // ej: 'service_abc123'
        'template_sbcwigm',    // ej: 'template_xyz789'
        {
          to_name: formData.name,
          to_email: formData.email,
          attendance: formData.attendance === 'attending' ? 'Asistiré con gusto' : 'No podré asistir',
          message: formData.message
        },
        'qtXHlAKLTWgdrXZM9'      // ej: 'user_123456'
      )
      
      // Simulamos una pequeña demora de guardado
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      setSubmitted(true)
    } catch (err) {
      console.error('Error al enviar RSVP:', err)
      setErrorMsg('Ocurrió un error al enviar tu respuesta. Por favor intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="asistencia" className="rsvp-section">
      <style>{`
        .rsvp-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          padding: 90px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          /* FONDO CON CAPA SOBREPUESTA (OVERLAY OSCURO / VINO) Y FOTO */
          background-image: 
            linear-gradient(rgba(36, 7, 10, 0.84), rgba(36, 7, 10, 0.88)),
            url('${RSVP_BACKGROUND_IMAGE}');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
        }

        .rsvp-wrapper {
          max-width: 580px;
          width: 100%;
          margin: 0 auto;
        }

        .rsvp-header {
          text-align: center;
          margin-bottom: 35px;
        }

        .rsvp-subtitle {
          display: block;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.78rem;
          letter-spacing: 4px;
          color: #D4A373;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .rsvp-title {
          font-size: 2.7rem;
          font-weight: 300;
          color: #FAF7F2;
          margin: 0 0 14px 0;
          line-height: 1.1;
        }

        .rsvp-title span {
          font-style: italic;
          color: #E2B081;
        }

        .rsvp-desc {
          color: #E8DACB;
          font-size: 0.95rem;
          line-height: 1.6;
          font-weight: 300;
          max-width: 460px;
          margin: 0 auto;
        }

        /* CARD DE FORMULARIO CON EFECTO VIDRIO ESMERILADO (GLASSMORPHISM) */
        .rsvp-card {
          background-color: rgba(44, 12, 16, 0.65);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(212, 163, 115, 0.3);
          border-radius: 24px;
          padding: 40px 32px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
        }

        .form-group {
          margin-bottom: 22px;
        }

        .form-label {
          display: block;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #D4A373;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .form-label-optional {
          font-weight: 400;
          color: #A38F80;
          text-transform: lowercase;
        }

        .form-input, .form-textarea {
          width: 100%;
          background-color: rgba(20, 4, 6, 0.5);
          border: 1px solid rgba(212, 163, 115, 0.25);
          border-radius: 12px;
          padding: 14px 16px;
          color: #FAF7F2;
          font-size: 0.95rem;
          font-family: system-ui, -apple-system, sans-serif;
          box-sizing: border-box;
          transition: border-color 0.25s ease, background-color 0.25s ease;
        }

        .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: #D4A373;
          background-color: rgba(20, 4, 6, 0.75);
        }

        .form-input::placeholder, .form-textarea::placeholder {
          color: #8C7567;
        }

        /* RADIO BUTTONS DE ASISTENCIA */
        .radio-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .radio-option {
          display: flex;
          align-items: center;
          gap: 10px;
          background-color: rgba(20, 4, 6, 0.5);
          border: 1px solid rgba(212, 163, 115, 0.25);
          border-radius: 12px;
          padding: 14px 14px;
          cursor: pointer;
          transition: all 0.25s ease;
          user-select: none;
        }

        .radio-option:hover {
          border-color: rgba(212, 163, 115, 0.5);
        }

        .radio-option.selected {
          border-color: #D4A373;
          background-color: rgba(212, 163, 115, 0.12);
        }

        .radio-circle {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid #D4A373;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .radio-circle-inner {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #D4A373;
        }

        .radio-text {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.88rem;
          color: #FAF7F2;
          font-weight: 500;
        }

        /* BOTÓN DE ENVIAR */
        .submit-btn {
          width: 100%;
          height: 52px;
          background-color: #C4966B;
          color: #FFFFFF;
          border: none;
          border-radius: 9999px;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
          transition: all 0.25s ease;
          margin-top: 10px;
        }

        .submit-btn:hover:not(:disabled) {
          background-color: #B08156;
          transform: translateY(-2px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* MENSAJE DE ÉXITO */
        .success-box {
          text-align: center;
          padding: 30px 10px;
        }

        .success-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: rgba(212, 163, 115, 0.15);
          border: 1px solid #D4A373;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: #D4A373;
          font-size: 1.6rem;
        }

        @media (max-width: 640px) {
          .rsvp-section {
            padding: 60px 16px;
            background-attachment: scroll; /* Mejor rendimiento en teléfonos */
          }
          .rsvp-card {
            padding: 28px 20px;
          }
          .radio-grid {
            grid-template-columns: 1fr;
          }
          .rsvp-title {
            font-size: 2.2rem;
          }
        }
      `}</style>

      <div className="rsvp-wrapper">
        <div className="rsvp-header">
          <span className="rsvp-subtitle">R. S. V. P.</span>
          <h2 className="rsvp-title">
            Confirmación de <span>Asistencia</span>
          </h2>
          <div style={{ width: '40px', height: '1px', backgroundColor: '#D4A373', margin: '0 auto 16px', opacity: 0.6 }} />
          <p className="rsvp-desc">
            Favor de confirmar tu asistencia antes del 01 de Octubre para esperarte con especial aprecio.
          </p>
        </div>

        <div className="rsvp-card">
          {submitted ? (
            <div className="success-box">
              <div className="success-icon">✓</div>
              <h3 style={{ fontSize: '1.8rem', color: '#FAF7F2', margin: '0 0 10px 0', fontWeight: 400 }}>
                ¡Muchas Gracias!
              </h3>
              <p style={{ color: '#E8DACB', fontSize: '0.95rem', lineHeight: 1.6, margin: 0, fontWeight: 300 }}>
                Hemos recibido tu respuesta correctamente. Te enviamos un correo de confirmación a <strong>{formData.email}</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              
              {/* CAMPO 1: NOMBRE Y APELLIDO */}
              <div className="form-group">
                <label className="form-label">Nombre y Apellido</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Ej. María García"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {/* CAMPO 2: CORREO ELECTRÓNICO (NUEVO) */}
              <div className="form-group">
                <label className="form-label">Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Ej. maria.garcia@gmail.com"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* CAMPO 3: RESPUESTA */}
              <div className="form-group">
                <label className="form-label">Respuesta</label>
                <div className="radio-grid">
                  
                  <div
                    className={`radio-option ${formData.attendance === 'attending' ? 'selected' : ''}`}
                    onClick={() => setFormData((prev) => ({ ...prev, attendance: 'attending' }))}
                  >
                    <div className="radio-circle">
                      {formData.attendance === 'attending' && <div className="radio-circle-inner" />}
                    </div>
                    <span className="radio-text">Asistiré con gusto</span>
                  </div>

                  <div
                    className={`radio-option ${formData.attendance === 'not_attending' ? 'selected' : ''}`}
                    onClick={() => setFormData((prev) => ({ ...prev, attendance: 'not_attending' }))}
                  >
                    <div className="radio-circle">
                      {formData.attendance === 'not_attending' && <div className="radio-circle-inner" />}
                    </div>
                    <span className="radio-text">No podré asistir</span>
                  </div>

                </div>
              </div>

              {/* CAMPO 4: MENSAJE (OPCIONAL) */}
              <div className="form-group">
                <label className="form-label">
                  Mensaje para los novios <span className="form-label-optional">(opcional)</span>
                </label>
                <textarea
                  name="message"
                  rows="3"
                  placeholder="Escribe tus buenos deseos..."
                  className="form-textarea"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              {errorMsg && (
                <p style={{ color: '#FF8A8A', fontSize: '0.82rem', textAlign: 'center', marginBottom: '14px' }}>
                  {errorMsg}
                </p>
              )}

              {/* BOTÓN ENVIAR */}
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Enviar Respuesta'}
              </button>

            </form>
          )}
        </div>
      </div>
    </section>
  )
}