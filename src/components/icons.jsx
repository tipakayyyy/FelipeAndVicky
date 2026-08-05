// Iconos lineales minimalistas — sin dependencias externas,
// para mantener el bundle liviano.

export function CameraIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...props}>
      <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1-1.5h7L16.5 7h2A1.5 1.5 0 0 1 20 8.5v9A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5v-9Z" strokeLinejoin="round"/>
      <circle cx="12" cy="12.5" r="3.4"/>
    </svg>
  )
}

export function PhotoIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...props}>
      <rect x="4" y="5" width="16" height="14" rx="1.6"/>
      <circle cx="9" cy="10" r="1.6"/>
      <path d="M4 16.5 9 12l3 3 4-4.5 4 5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function VideoIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...props}>
      <rect x="3.5" y="6.5" width="12" height="11" rx="1.6"/>
      <path d="M15.5 10.5 20 8v8l-4.5-2.5" strokeLinejoin="round"/>
    </svg>
  )
}

export function HeartIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 20.2s-7.3-4.5-9.6-9.1C1 8.2 2.3 5 5.5 4.3c1.9-.4 3.7.4 4.9 2 .5.6.9 1.3 1.6 1.3s1.1-.7 1.6-1.3c1.2-1.6 3-2.4 4.9-2 3.2.7 4.5 3.9 3.1 6.8-2.3 4.6-9.6 9.1-9.6 9.1Z"/>
    </svg>
  )
}

export function ExpandIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M9 4H4v5M20 9V4h-5M4 15v5h5M15 20h5v-5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function PlayIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M8 5.5v13l11-6.5-11-6.5Z"/>
    </svg>
  )
}

export function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round"/>
    </svg>
  )
}

export function ChevronLeft(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function ChevronRight(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function MusicIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...props}>
      <path d="M9 18V5.6L20 4v11.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="17.5" cy="15.6" r="2.5" />
    </svg>
  )
}

export function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round"/>
    </svg>
  )
}

export function MapPinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...props}>
      <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" strokeLinejoin="round"/>
      <circle cx="12" cy="9" r="2.4"/>
    </svg>
  )
}

export function GiftIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...props}>
      <rect x="4" y="9.5" width="16" height="10" rx="1.2"/>
      <path d="M4 9.5h16M12 9.5V20M12 9.5C9.5 9.5 8 8 8 6.5A2 2 0 0 1 12 6c0 .5 0 3.5 0 3.5ZM12 9.5c2.5 0 4-1.5 4-3A2 2 0 0 0 12 6c0 .5 0 3.5 0 3.5Z" strokeLinejoin="round"/>
    </svg>
  )
}
