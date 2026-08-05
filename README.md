# Boda de Felipe & Victoria — sitio completo + galería colaborativa

Sitio de una sola página con navbar, **Inicio**, **Nuestra Historia**,
**El Gran Día**, **Galería** (fotos/videos subidos por invitados, sin
cuenta, en tiempo real) e **Información** (dress code, regalo, RSVP).
Hecho con **React + Vite + Supabase**, pensado para desplegarse en
**Vercel**.

---

## 1. Crear/actualizar la base en Supabase

### Si es la primera vez
1. [supabase.com/dashboard](https://supabase.com/dashboard) → **New project**.
2. **SQL Editor** → **New query** → pega **todo** el contenido de `supabase/schema.sql` → **Run**.
3. Verifica: **Table Editor** → tabla `wedding_uploads`. **Storage** → bucket `wedding-media`.

### Si ya tenías el proyecto corriendo antes
Este `schema.sql` es seguro de volver a correr — agrega las columnas nuevas
(`category`, `is_favorite`) sin borrar nada de lo que ya subieron tus invitados.
Solo copia y pega el archivo entero de nuevo en el SQL Editor y dale **Run**.

> Si el bucket no aparece automáticamente, créalo a mano: **Storage → New bucket**
> → nombre exacto `wedding-media` → marca **Public bucket** → Save.

## 2. Obtener tus claves de API

**Project Settings → API** → copia **Project URL** y **anon public key**.

## 3. Configurar y correr en local

```bash
cd wedding-gallery
npm install
cp .env.example .env   # pega tu URL y anon key
npm run dev
```

Abre `http://localhost:5173`.

## 4. Desplegar en Vercel

1. Sube el proyecto a GitHub e impórtalo en [vercel.com/new](https://vercel.com/new)
   (o usa `vercel` CLI directo).
2. Agrega las variables de entorno `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
3. Deploy.

## 5. Personalizar

Casi todos los textos y datos reales (nombres, fecha, horarios, direcciones,
dress code, links de regalo/RSVP) están centralizados en **`src/constants.js`**
— edítalo ahí en vez de buscar el texto repetido por los componentes.

- **Colores**: variables al inicio de `src/styles.css`.
- **Enlaces de regalo y RSVP**: `GIFT_LINK` y `RSVP_LINK` en `constants.js` (hoy son `#`, reemplázalos por los reales).
- **Límites de tamaño de archivo**: `MAX_IMAGE_BYTES` / `MAX_VIDEO_BYTES` en `src/supabaseClient.js`.

## 6. Fotografías de la pareja

El sitio **no trae fotos de ejemplo**. Copia tus fotos a `public/photos/`
con estos nombres (o edita las rutas en `COUPLE_PHOTOS` dentro de
`src/constants.js`):

- `hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg` — carrusel del inicio
- `story-main.jpg`, `story-1.jpg`, `story-2.jpg` — Nuestra Historia
- `big-day.jpg` — El Gran Día
- `music.jpg` — Música
- `farewell.jpg` — Gracias (cierre)

Si dejas alguna ruta vacía, esa sección usa automáticamente un diseño de
respaldo (degradado + líneas doradas) en vez de romperse.

## 7. Asistencia (RSVP) con solicitud de acompañante (+1)

Nueva sección **Asistencia**: el invitado escribe su nombre, confirma si
asistirá o no, y — si asiste — puede marcar que llevará un acompañante e
indicar su nombre. Se guarda en la tabla `wedding_rsvps` de Supabase con
`plus_one_status = 'pending'`. **La aprobación del +1 es manual, desde
el panel de administrador** (ver siguiente sección) — el invitado nunca
puede auto-aprobarse.

## 8. Panel de administrador (`/admin`)

Ruta protegida con **Supabase Auth** (correo + contraseña).

**Crear tu usuario admin** (una sola vez):
1. Supabase Dashboard → **Authentication → Users → Add user → Create new user**.
2. Ingresa tu correo y una contraseña, marca **Auto Confirm User**.
3. Entra en `https://tu-sitio.com/admin` (o `http://localhost:5173/admin`
   en local) con ese correo y contraseña.

**Qué puedes hacer ahí:**
- **Pestaña Asistencia**: ver todos los que confirmaron (o no), estadísticas
  rápidas, y **aprobar / rechazar** cada solicitud de +1 con un clic.
- **Pestaña Fotos y videos**: ver todo lo que suben los invitados a la
  galería, con fecha, y eliminar cualquier foto o video (borra el archivo
  del Storage y su registro en la base).

> El correo/contraseña de administrador vive en Supabase Auth, no en el
> código — puedes crear varios admins o cambiar la contraseña desde ahí
> cuando quieras.

## 9. Notificarte por correo cuando alguien confirme asistencia

Cada vez que un invitado confirme (o no) su asistencia, te llega un correo
a ti con los detalles — usando **tu propio Gmail** con la contraseña de
aplicación que ya creaste.

### 9.1. Instalar el CLI de Supabase (una sola vez)

```bash
npm install -g supabase
supabase login
```

### 9.2. Conectar el CLI a tu proyecto

Copia el **Project ID** desde Supabase Dashboard → Project Settings → General
(es la parte `xxxxx` de `https://xxxxx.supabase.co`).

```bash
cd wedding-gallery
supabase link --project-ref TU_PROJECT_ID
```
(Si pide la contraseña de la base de datos, puedes darle Enter para saltarla.)

### 9.3. Configurar los secretos (tu Gmail + app password)

```bash
supabase secrets set GMAIL_USER=tu_correo@gmail.com
supabase secrets set GMAIL_APP_PASSWORD=la_contraseña_de_16_digitos
supabase secrets set NOTIFY_EMAIL=tu_correo@gmail.com
```
(`NOTIFY_EMAIL` puede ser otro correo distinto si quieres que los avisos
lleguen a alguien más — por ejemplo el de tu pareja.)

### 9.4. Desplegar la función

```bash
supabase functions deploy notify-rsvp --no-verify-jwt
```

`--no-verify-jwt` es necesario porque quien la llama es el webhook interno
de Supabase, no un usuario logueado.

### 9.5. Crear el Database Webhook (conecta la tabla con la función)

1. Supabase Dashboard → **Database → Webhooks → Create a new hook**.
2. **Name**: `notify-rsvp`.
3. **Table**: `wedding_rsvps`.
4. **Events**: marca solo **Insert**.
5. **Type**: **Supabase Edge Functions**.
6. **Edge Function**: selecciona `notify-rsvp`.
7. Guarda.

Listo — a partir de ahora, cada confirmación nueva te manda un correo.
Puedes probarlo confirmando tu propia asistencia desde la sección
"Asistencia" del sitio.

> Si en algún momento el correo no llega, revisa los logs en
> **Edge Functions → notify-rsvp → Logs** en el dashboard de Supabase.

## Estructura del proyecto

```
wedding-gallery/
├── supabase/
│   └── schema.sql              ← correr en el SQL Editor de Supabase (idempotente)
├── src/
│   ├── constants.js             ← datos reales de la boda, centralizados
│   ├── components/
│   │   ├── Navbar.jsx            ← navbar con scroll-spy + menú hamburguesa
│   │   ├── Footer.jsx
│   │   ├── sections/
│   │   │   ├── Home.jsx          ← "Inicio"
│   │   │   ├── OurStory.jsx      ← "Nuestra Historia"
│   │   │   ├── BigDay.jsx        ← "El Gran Día" (horario + direcciones reales)
│   │   │   └── InfoSection.jsx   ← "Información" (dress code, regalo, RSVP)
│   │   ├── GalleryHeader.jsx     ← encabezado de la sección galería (stats, filtros)
│   │   ├── StatsCard.jsx         ← contador de fotos/videos (datos reales)
│   │   ├── FilterBar.jsx         ← 4 filtros, TODOS funcionales
│   │   ├── BotanicalCorner.jsx   ← ilustración floral decorativa
│   │   ├── icons.jsx             ← iconos SVG livianos
│   │   ├── UploadModal.jsx       ← modal que envuelve UploadForm
│   │   ├── UploadForm.jsx        ← subida (Supabase Storage + tabla) + selector de categoría
│   │   ├── Gallery.jsx           ← masonry + "cargar más"
│   │   ├── GalleryCard.jsx       ← tarjeta editorial
│   │   └── Lightbox.jsx          ← foto/video en grande, navegación ← →
│   ├── App.jsx                   ← fetch + realtime + scroll-spy + filtros
│   ├── supabaseClient.js
│   ├── styles.css
│   └── main.jsx
├── .env.example
└── package.json
```

## Cómo funcionan ahora los filtros (ya NO son solo UI)

- **"Todos los momentos"**: todos los registros.
- **"Antes de la boda" / "El gran día"**: filtran por la columna `category`,
  que **el propio invitado elige** en el formulario de subida (con
  "El gran día" preseleccionado, porque es el caso más común, pero pueden
  cambiarlo).
- **"Nuestros favoritos ♡"**: filtra por `is_favorite`. Esta columna **no**
  la elige el invitado — ustedes marcan sus fotos favoritas manualmente
  desde **Supabase → Table Editor → wedding_uploads → is_favorite → true**.

Las fotos subidas antes de este cambio no tienen `category` asignada
(quedan en `null`), así que solo aparecen en "Todos los momentos" — no se
pierden, simplemente no se pueden clasificar retroactivamente sin que
alguien lo haga a mano en la tabla.

## Sobre el navbar y las nuevas secciones

El documento de referencia pedía un navbar con Inicio / Nuestra Historia /
El Gran Día / Galería / Información — como antes el proyecto era *solo* la
galería, esas secciones no existían. Ahora sí: agregué las cuatro con datos
reales tomados de la invitación original (fecha, horarios, direcciones de
ceremonia y recepción, texto de bienvenida, dress code). Los enlaces de
"Regalo" y "Confirma tu asistencia" están de placeholder (`#`) — reemplázalos
en `constants.js` con tus links reales cuando los tengas.

## Música de fondo

Hay un botón flotante "🎵 Música" en la esquina inferior derecha, visible en
toda la página. Al presionarlo, abre un reproductor embebido de Spotify con
tu playlist.

**Por qué no suena automático apenas se entra a la página:** los navegadores
(Chrome, Safari, Firefox) bloquean el autoplay con sonido hasta que la
persona interactúa con la página — es una política de seguridad del
navegador, no algo que se pueda evitar desde el código. Por eso el botón
existe: el primer click del invitado "desbloquea" el audio.

**Cómo poner tu playlist real:**
1. Abre tu playlist en Spotify (tiene que ser **pública**).
2. Botón "···" → Compartir → Copiar enlace del playlist.
3. El link se ve así: `https://open.spotify.com/playlist/37i9dQZF1DXX...`
4. Copia solo la parte después de `/playlist/` (sin `?si=...` si lo trae).
5. Pégala en `src/constants.js`, en `SPOTIFY_PLAYLIST_ID` (ahora mismo tiene
   una playlist de ejemplo puesta como placeholder — reemplázala).

Si prefieres que el reproductor aparezca ya abierto en vez de detrás del
botón, o que viva en otro lugar de la página, dime y lo ajusto.

## Qué NO se tocó

`supabaseClient.js`, el fetch inicial, la suscripción en tiempo real, la
subida a Storage y la inserción en la tabla siguen funcionando exactamente
igual que antes — solo se les agregó el campo `category` al insertar.
