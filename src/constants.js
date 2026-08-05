// Datos reales de la boda (extraídos de la invitación original de
// Felipe & Victoria). Centralizados acá para que sea fácil editarlos
// sin tener que buscar texto repetido por todos los componentes.

export const COUPLE = {
  names: 'Felipe & Victoria',
  initials: 'F&V',
  dateLong: 'Sábado, 07 de noviembre de 2026',
  dateShort: '07 · 11 · 2026',
}

export const STORY_TEXT =
  'El amor no siempre comienza con un "sí, acepto". A veces comienza con ' +
  'una mirada, crece con los años y se fortalece en cada paso compartido. ' +
  'Después de 21 años, ha llegado el momento de celebrar nuestra promesa.'

export const SCHEDULE = {
  ceremony: {
    time: '3:20pm',
    label: 'Ceremonia',
    address: 'Iglesia Virgen del Pilar - Av. Víctor Andrés Belaunde 160, San Isidro',
  },
  reception: {
    time: '6:00pm',
    label: 'Recepción',
    address: 'Fundo Catalina — Av. Manuel La Valle S/N, Sub Lote Nro. 4',
  },
}

export const DRESS_CODE = {
  women: 'Luzcan su belleza con tacones y vestidos largos.',
  men: 'Destaquen su elegancia con trajes en tonos oscuros.',
  avoidNote: 'Por favor, evitar los tonos:',
  avoidColors: ['#6F1D18', '#1B2A4A', '#A9862F'], // vino, azul marino, mostaza
}

export const GIFT_NOTE =
  'Sus buenos deseos son nuestro mejor regalo. Si desean hacernos llegar ' +
  'algún presente, estaremos muy agradecidos.'

// Reemplaza estos dos enlaces por los reales cuando los tengas.
export const GIFT_LINK = '#'
export const RSVP_LINK = '#'

// Opciones de categoría que elige el propio invitado al subir su foto/video.
export const UPLOAD_CATEGORIES = [
  { value: 'day', label: 'El gran día' },
  { value: 'before', label: 'Antes de la boda' },
]

// ============================================================
// FOTOGRAFÍAS DE LA PAREJA
// ============================================================
// Las rutas apuntan a tu carpeta `public/photos/`.
// Si dejas comillas vacías '', la sección activa un diseño de respaldo
// con degradados elegantes en lugar de mostrar un error de imagen rota.
export const COUPLE_PHOTOS = {
  hero: ['/photos/hero-1.jpeg', '/photos/hero-2.jpeg', '/photos/hero-3.jpeg'],
  music: '/photos/music.jpeg',
  
  // Agrega las imágenes en public/photos/ cuando las tengas y pon sus rutas aquí:
  storyMain: '',         // Ej: '/photos/story-main.jpeg'
  storyFloating: [],     // Ej: ['/photos/story-1.jpeg', '/photos/story-2.jpeg']
  bigDay: '',            // Ej: '/photos/big-day.jpeg'
  rsvp: '',              // Ej: '/photos/rsvp.jpeg'
  farewell: '',          // Ej: '/photos/farewell.jpeg'
}

// Hitos reales de la historia de la pareja para la línea de tiempo.
export const TIMELINE = [
  { year: '2003', text: 'Nos conocimos, sin imaginar cuánto cambiaría todo.' },
  { year: '2004', text: 'Comenzamos nuestro viaje juntos como familia.' },
  { year: '2025', text: '¡Nos comprometimos!' },
  { year: '2026', text: 'Y ahora queremos celebrar nuestro amor contigo.' },
]

// ID real de tu playlist de Spotify.
export const SPOTIFY_PLAYLIST_ID = '2nMPy1HOzUdFmyQ57TP4tO'