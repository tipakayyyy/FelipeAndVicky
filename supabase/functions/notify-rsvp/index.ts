// Edge Function: notify-rsvp
// Se dispara automáticamente vía Database Webhook cada vez que se
// inserta una fila nueva en `wedding_rsvps`, y te manda un correo
// a ti (los novios) avisando quién confirmó asistencia.
//
// Usa Gmail SMTP con una "contraseña de aplicación" (16 dígitos) —
// NO tu contraseña normal de Gmail.
//
// Variables de entorno necesarias (se configuran como "secrets"):
//   GMAIL_USER          -> tu correo de Gmail, ej: felipeyvictoria@gmail.com
//   GMAIL_APP_PASSWORD  -> la contraseña de aplicación de 16 dígitos
//   NOTIFY_EMAIL        -> a qué correo quieres que lleguen los avisos
//                          (puede ser el mismo GMAIL_USER u otro)

import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts'

const GMAIL_USER = Deno.env.get('GMAIL_USER')
const GMAIL_APP_PASSWORD = Deno.env.get('GMAIL_APP_PASSWORD')
const NOTIFY_EMAIL = Deno.env.get('NOTIFY_EMAIL') || GMAIL_USER

Deno.serve(async (req) => {
  try {
    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
      return new Response('Faltan GMAIL_USER / GMAIL_APP_PASSWORD', { status: 500 })
    }

    const payload = await req.json()
    // Supabase Database Webhooks mandan el registro nuevo en `record`.
    const rsvp = payload.record

    if (!rsvp) {
      return new Response('Sin registro en el payload', { status: 400 })
    }

    const asiste = rsvp.attending ? 'SÍ asistirá' : 'NO podrá asistir'
    const plusOne = rsvp.plus_one_requested
      ? `Sí, con: ${rsvp.plus_one_name || '(sin nombre)'} — pendiente de aprobar en /admin`
      : 'No'

    const subject = rsvp.attending
      ? `✅ ${rsvp.guest_name} confirmó asistencia`
      : `❌ ${rsvp.guest_name} no podrá asistir`

    const html = `
      <div style="font-family: sans-serif; color: #30201c; line-height: 1.6;">
        <h2 style="color:#641914;">Nueva confirmación de asistencia</h2>
        <p><strong>Invitado:</strong> ${rsvp.guest_name}</p>
        <p><strong>Asistencia:</strong> ${asiste}</p>
        <p><strong>Acompañante (+1):</strong> ${plusOne}</p>
        <p style="margin-top: 1.5rem; font-size: 0.85rem; color:#6b544d;">
          Revisa y aprueba el +1 (si aplica) desde tu panel:
          <a href="https://TU-DOMINIO.com/admin">/admin</a>
        </p>
      </div>
    `

    const client = new SMTPClient({
      connection: {
        hostname: 'smtp.gmail.com',
        port: 465,
        tls: true,
        auth: {
          username: GMAIL_USER,
          password: GMAIL_APP_PASSWORD,
        },
      },
    })

    await client.send({
      from: GMAIL_USER,
      to: NOTIFY_EMAIL,
      subject,
      html,
    })

    await client.close()

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
