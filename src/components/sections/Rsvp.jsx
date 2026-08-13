import React, { useState } from 'react'
import emailjs from '@emailjs/browser'
import { supabase, RSVP_TABLE_NAME } from '../../supabaseClient'

const RSVP_BACKGROUND_IMAGE = '/photos/fondo.jpeg'

export default function Rsvp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: 'attending',
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

    const sanitizedName = formData.name.trim()
    const sanitizedEmail = formData.email.trim().toLowerCase()

    try {
      // 1. Guardar en Supabase
      const { error: dbError } = await supabase
        .from(RSVP_TABLE_NAME)
        .insert([
          {
            name: sanitizedName,
            email: sanitizedEmail,
            attendance: formData.attendance === 'attending' ? 'Sí' : 'No',
            notes: formData.message || null
          }
        ])

      if (dbError) {
        console.error('Error al insertar en Supabase:', dbError)
        throw new Error('No se pudo registrar en la base de datos.')
      }

      // 2. Envío de EmailJS
      try {
        await emailjs.send(
          'service_o05j1rv',
          'template_sbcwigm',
          {
            to_name: sanitizedName,
            to_email: sanitizedEmail,
            attendance_text: formData.attendance === 'attending' ? 'Asistiré con gusto 🎉' : 'No podré asistir 😢',
            message: formData.message || 'Sin mensaje adicional.'
          },
          'qtXHlAKLTWgdrXZM9'
        )
      } catch (emailErr) {
        console.warn('Respuesta guardada en Supabase, pero falló EmailJS:', emailErr)
      }

      setSubmitted(true)
    } catch (err) {
      console.error('Error en RSVP:', err)
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
          padding: 80px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
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
          box-sizing: border-box;
        }

        .rsvp-header {
          text-align: center;
          margin-bottom: 30px;
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
          font-size: 2.5rem;
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

        .rsvp-card {
          background-color: rgba(44, 12, 16, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(212, 163, 115, 0.3);
          border-radius: 20px;
          padding: 36px 28px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
          box-sizing: border-box;
          width: 100%;
        }

        .form-group {
          margin-bottom: 20px;
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
          background-color: rgba(20, 4, 6, 0.6);
          border: 1px solid rgba(212, 163, 115, 0.3);
          border-radius: 10px;
          padding: 12px 14px;
          color: #FAF7F2;
          font-size: 0.95rem;
          font-family: system-ui, -apple-system, sans-serif;
          box-sizing: border-box;
          transition: border-color 0.25s ease;
        }

        .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: #D4A373;
          background-color: rgba(20, 4, 6, 0.85);
        }

        .form-input::placeholder, .form-textarea::placeholder {
          color: #8C7567;
        }

        .radio-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .radio-option {
          display: flex;
          align-items: center;
          gap: 10px;
          background-color: rgba(20, 4, 6, 0.6);
          border: 1px solid rgba(212, 163, 115, 0.3);
          border-radius: 10px;
          padding: 12px 14px;
          cursor: pointer;
          transition: all 0.25s ease;
          user-select: none;
          box-sizing: border-box;
        }

        .radio-option.selected {
          border-color: #D4A373;
          background-color: rgba(212, 163, 115, 0.15);
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border-width: 0;
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

        .submit-btn {
          width: 100%;
          height: 50px;
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
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .success-box {
          text-align: center;
          padding: 20px 10px;
        }

        .success-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: rgba(212, 163, 115, 0.15);
          border: 1px solid #D4A373;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          color: #D4A373;
          font-size: 1.4rem;
        }

        /* 📱 ESTILOS OPTIMIZADOS PARA CELULAR */
        @media (max-width: 640px) {
          .rsvp-section {
            padding: 50px 16px; /* CORREGIDO: antes decía 166px */
            background-attachment: scroll; /* Previene errores visuales en Safari iOS */
          }
          .rsvp-card {
            padding: 24px 18px;
          }
          .radio-grid {
            grid-template-columns: 1fr; /* Apila las opciones para presionar fácil con el pulgar */
          }
          .rsvp-title {
            font-size: 2rem;
          }
          .rsvp-desc {
            font-size: 0.9rem;
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
              <h3 style={{ fontSize: '1.6rem', color: '#FAF7F2', margin: '0 0 10px 0', fontWeight: 400 }}>
                ¡Muchas Gracias!
              </h3>
              <p style={{ color: '#E8DACB', fontSize: '0.92rem', lineHeight: 1.6, margin: 0, fontWeight: 300 }}>
                Hemos recibido tu respuesta correctamente. Te enviamos un correo de confirmación a <strong>{formData.email}</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              
              <div className="form-group">
                <label htmlFor="name" className="form-label">Nombre y Apellido</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  placeholder="Ej. María García"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="Ej. maria.garcia@gmail.com"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <span className="form-label">Respuesta</span>
                <div className="radio-grid" role="radiogroup">
                  <label className={`radio-option ${formData.attendance === 'attending' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="attendance"
                      value="attending"
                      checked={formData.attendance === 'attending'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="radio-circle">
                      {formData.attendance === 'attending' && <div className="radio-circle-inner" />}
                    </div>
                    <span className="radio-text">Asistiré con gusto</span>
                  </label>

                  <label className={`radio-option ${formData.attendance === 'not_attending' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="attendance"
                      value="not_attending"
                      checked={formData.attendance === 'not_attending'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="radio-circle">
                      {formData.attendance === 'not_attending' && <div className="radio-circle-inner" />}
                    </div>
                    <span className="radio-text">No podré asistir</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Mensaje para los novios <span className="form-label-optional">(opcional)</span>
                </label>
                <textarea
                  id="message"
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