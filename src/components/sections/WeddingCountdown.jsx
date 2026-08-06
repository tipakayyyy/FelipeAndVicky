import React, { useState, useEffect } from 'react'

export default function WeddingCountdown() {
  // 🗓️ FECHA Y HORA DE LA BODA: 7 de Noviembre a las 3:00 PM
  const WEDDING_DATE_STRING = '2026-11-07T15:00:00' 

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // 1. LÓGICA DEL CONTADOR
  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(WEDDING_DATE_STRING) - +new Date()
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }

    calculateTime()
    const timer = setInterval(calculateTime, 1000)
    return () => clearInterval(timer)
  }, [WEDDING_DATE_STRING])

  // 2. AGENDAR EN GOOGLE CALENDAR (7 de Noviembre 3:00 PM)
  const handleGoogleCalendar = () => {
    const title = encodeURIComponent('Boda de Felipe & Victoria 💍')
    const details = encodeURIComponent('¡Acompáñanos a celebrar nuestro matrimonio!')
    const location = encodeURIComponent('Lima, Perú')
    const startDate = '20261107T150000'
    const endDate = '20261108T010000'

    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`
    window.open(googleUrl, '_blank')
  }

  // 3. AGENDAR EN APPLE CALENDAR / ICAL (7 de Noviembre 3:00 PM)
  const handleAppleCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Boda Felipe y Victoria//ES
BEGIN:VEVENT
SUMMARY:Boda de Felipe & Victoria 💍
DESCRIPTION:¡Acompáñanos a celebrar nuestro matrimonio!
LOCATION:Lima\, Perú
DTSTART:20261107T150000
DTEND:20261108T010000
END:VEVENT
END:VCALENDAR`

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'boda-felipe-y-victoria.ics')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className="countdown-section">
      <style>{`
        /* SECCIÓN ANCHO COMPLETO (FULL WIDTH) */
        .countdown-section {
          width: 100%;
          background-color: #4B0F18;
          padding: 70px 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Montserrat', sans-serif;
          box-sizing: border-box;
          border-top: 1px solid rgba(200, 161, 90, 0.25);
          border-bottom: 1px solid rgba(200, 161, 90, 0.25);
        }

        .countdown-container {
          max-width: 1100px;
          width: 100%;
          text-align: center;
          color: #FDF8F4;
        }

        .countdown-tag {
          color: #C8A15A;
          font-size: 0.85rem;
          letter-spacing: 4px;
          text-transform: uppercase;
          font-weight: 600;
          display: block;
          margin-bottom: 12px;
        }

        .countdown-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2.8rem;
          font-weight: 400;
          margin: 0 0 36px 0;
          color: #FDF8F4;
        }

        /* GRID DEL CONTADOR EXPANDIDO */
        .timer-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          max-width: 900px;
          margin: 0 auto 36px auto;
        }

        .timer-box {
          background-color: #57141F;
          border: 1px solid rgba(200, 161, 90, 0.35);
          border-radius: 20px;
          padding: 24px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .timer-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3.2rem;
          font-weight: 600;
          color: #C8A15A;
          line-height: 1;
        }

        .timer-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.85);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-top: 10px;
        }

        /* OPCIONES DE CALENDARIO */
        .calendar-box {
          background-color: rgba(0, 0, 0, 0.15);
          border-radius: 24px;
          padding: 24px;
          max-width: 700px;
          margin: 0 auto;
          border: 1px dashed rgba(200, 161, 90, 0.35);
        }

        .calendar-text {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.9);
          margin: 0 0 18px 0;
          font-weight: 300;
        }

        .calendar-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .calendar-btn-gold {
          background-color: #C8A15A;
          color: #3D0D0B;
          border: none;
          padding: 12px 28px;
          border-radius: 30px;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 200ms ease;
        }

        .calendar-btn-gold:hover {
          background-color: #D8B26B;
          transform: translateY(-2px);
        }

        .calendar-btn-outline {
          background-color: transparent;
          color: #FAF7F2;
          border: 1px solid #C8A15A;
          padding: 12px 28px;
          border-radius: 30px;
          font-size: 0.88rem;
          font-weight: 500;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 200ms ease;
        }

        .calendar-btn-outline:hover {
          background-color: rgba(200, 161, 90, 0.15);
          transform: translateY(-2px);
        }

        @media (max-width: 650px) {
          .countdown-title {
            font-size: 2.2rem;
          }
          .timer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .timer-number {
            font-size: 2.6rem;
          }
          .calendar-buttons {
            flex-direction: column;
          }
          .calendar-btn-gold, .calendar-btn-outline {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <div className="countdown-container">
        <span className="countdown-tag">✦ FALTAN POCOS DÍAS ✦</span>
        <h3 className="countdown-title">Tiempo para el Gran Día</h3>

        {/* RELOJ CONTADOR */}
        <div className="timer-grid">
          <div className="timer-box">
            <span className="timer-number">{timeLeft.days}</span>
            <span className="timer-label">Días</span>
          </div>
          <div className="timer-box">
            <span className="timer-number">{timeLeft.hours}</span>
            <span className="timer-label">Horas</span>
          </div>
          <div className="timer-box">
            <span className="timer-number">{timeLeft.minutes}</span>
            <span className="timer-label">Minutos</span>
          </div>
          <div className="timer-box">
            <span className="timer-number">{timeLeft.seconds}</span>
            <span className="timer-label">Segundos</span>
          </div>
        </div>

        {/* BLOQUE DE AGENDAR */}
        <div className="calendar-box">
          <p className="calendar-text">
            🗓️ Guarda la fecha en tu calendario para no perderte el evento:
          </p>
          <div className="calendar-buttons">
            <button onClick={handleGoogleCalendar} className="calendar-btn-gold">
              <span> Google Calendar</span>
            </button>

            <button onClick={handleAppleCalendar} className="calendar-btn-outline">
              <span> Apple Calendar </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}