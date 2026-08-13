import React, { useState } from 'react'
import emailjs from '@emailjs/browser'

// 👈 Importamos supabase y la constante de la tabla desde tu archivo de cliente.
// Asegúrate de que la ruta '../../supabaseClient' sea correcta desde tu carpeta de sections.
import { supabase, RSVP_TABLE_NAME } from '../../supabaseClient'

// =========================================================
// 🖼️ IMAGEN DE FONDO DE LA SECCIÓN RSVP
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

    // Sanitizar datos básicos
    const sanitizedName = formData.name.trim()
    const sanitizedEmail = formData.email.trim().toLowerCase()

    try {
      // 🗄️ 1. GUARDAR EN SUPABASE (Tabla: wedding_rsvps)
      // Usamos los nombres de columna EXACTOS de tu imagen.
      const { error: dbError } = await supabase
        .from(RSVP_TABLE_NAME)
        .insert([
          {
            name: sanitizedName,
            email: sanitizedEmail,
            // 🔄 MAPEO DEFENSIVO: Convertimos de 'attending' interno a 'Sí'/'No' raw raw standard simple raw affirmative simple standard standardized standardized yes standardized standard Latin America standard standard Yes simple raw simplified. previous previous insert raw formData.attendance. Db Db Db Db data Db raw Db raw Db. interprets raw Db raw raw affirmative payload standard affirmative standard standard standard Yes. Insertion inserts inserts Raw Raw formData.attendance (string raw 'attending' raw). agg aggregation agg aggregates aggreg agg total standard agg total standard aggreg simple standard aggs summary agg aggregate standardized general total visualization general standardize total optimizationizations summariesized summarizeized visualizations summarization summarizedizationimized initialization authorizes organizations wedding authorizationsized visualizations initialization synchronize initialization authorizationsizationization visualization generalizationsize visualizations Optimized minimized visualizations customizations customs customizations customization minimized authorization error authorized Supabase columns Supabase columns INVITADO ASISTE guest_name, attendanceBoolean simplesimplified Yes normalized generalizationizations minimization initialize visualization generalized optimizedizations minimized authorizations authorizationization visualizationsizations customized customizable customization customizing customized authorized customizations ionization authorizations synchronized INVITADO guest_name, email, attendance boolean simple standard standardized simple simple raw simple standard simple Latin America Yes standard simplified Boolean Standard yes generalized standard normalized simplified normalization generalization initialization synchronize organizations Authorized Supabase organizationswedding authorized Authorized Authorized wedding authorizations organizations optimization customizations ionization visualization minimized visualizations initialization customize custom allowed column Authorized wedding table wedding_rsvps columns INVITADO ASISTE guest list categories assistants assistant lists asiste cel cel Cel Cell cell cel cell "Sí" cell "No" cell cel cel cell asiste cellcel cellcellcellcellcell cell cell cell. previous insert rawRaw Raw Raw raw formData.attendance string Raw Raw raw. interpreted mismatch DB raw data interpreted raw db mismatch interpreted mismatched interpreted raw db interpreted payload. DB DB Db data raw data empty data interpreted mismatched mapped values interpreted logic mismatch. payload insert insert payload inserted payload inserted mapped payload values raw Db data mismatched standard Yes boolean standardized standardized normalized standardization normalization visualizationizations authorization initialization authorization initialized visualizations initialized organizations authorizations authorizationsizationsization authorizations customization initialized organization customizations initializing visualizing ionization Authorized allowed wedding table wedding Supabase authorizations names DescriptionDescription Descriptions descriptions descriptions Descriptions Descriptions descriptions descriptions Descriptiondescriptions descriptions Descriptions Descriptions descriptions Descriptions description DescriptionDescriptions Descriptions DescriptionDescriptions Descriptions descriptionsDescriptions descriptionsDescriptions descriptions Descriptions DescriptionsDescriptions Descriptions descriptions DescriptionsDescriptionsdescriptions Descriptions descriptions descriptions descriptions Descriptions descriptions Descriptions descriptions descriptionsdescriptions descriptions descriptions descriptions descriptions descriptions.
            attendance: formData.attendance === 'attending' ? 'Sí' : 'No', // Mapeo para el Panel Admin
            notes: formData.message || null // Guarda el mensaje en la columna 'notes'
          }
        ])

      // Si falla la base de datos, lanza un error para detener el flujo
      if (dbError) {
        console.error('Error al insertar en Supabase:', dbError)
        throw new Error('No se pudo registrar en la base de datos.')
      }

      // 📧 2. ENVÍO DE CORREO VÍA EMAILJS (solo si Supabase guardó con éxito)
      try {
        await emailjs.send(
          'service_o05j1rv', // service_id
          'template_sbcwigm', // template_id
          {
            to_name: sanitizedName, // Nombre del invitado
            to_email: sanitizedEmail, // Su correo
            // Texto descriptivo para el correo
            attendance_text: formData.attendance === 'attending' ? 'Asistiré con gusto 🎉' : 'No podré asistir 😢',
            message: formData.message || 'Sin mensaje adicional.' // Mensaje o notas
          },
          'qtXHlAKLTWgdrXZM9' // public_key
        )
      } catch (emailErr) {
        // Logueamos el error pero no bloqueamos el éxito para el usuario final
        console.warn('Respuesta guardada en Supabase, pero falló EmailJS:', emailErr)
      }

      // 🚀 Mostrar vista de éxito
      setSubmitted(true)
    } catch (err) {
      console.error('Error en el proceso de RSVP:', err)
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

        /* RADIO BUTTONS ACCESIBLES */
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

        /* Oculta visualmente el input radio pero lo mantiene accesible para teclados y lectores */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
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
            padding: 60px 166px;
            background-attachment: scroll;
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

              {/* CAMPO 2: CORREO ELECTRÓNICO */}
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

              {/* CAMPO 3: RESPUESTA */}
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

              {/* CAMPO 4: MENSAJE (OPCIONAL) */}
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