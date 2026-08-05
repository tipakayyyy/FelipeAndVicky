import { PhotoIcon, VideoIcon, HeartIcon } from './icons.jsx'

// Recibe conteos ya calculados en App.jsx a partir de `items`
// (los datos reales de Supabase) — nada aquí está hardcodeado.
export default function StatsCard({ photos, videos, total }) {
  return (
    <div className="stats-card">
      <div className="stat">
        <PhotoIcon className="stat-icon" />
        <span className="stat-number">{photos}</span>
        <span className="stat-label">Fotos</span>
      </div>

      <div className="stat-divider" aria-hidden="true" />

      <div className="stat">
        <VideoIcon className="stat-icon" />
        <span className="stat-number">{videos}</span>
        <span className="stat-label">Videos</span>
      </div>

      <div className="stat-divider" aria-hidden="true" />

      <div className="stat">
        <HeartIcon className="stat-icon" />
        <span className="stat-number">{total}</span>
        <span className="stat-label">Momentos compartidos</span>
      </div>
    </div>
  )
}
