import { CameraIcon } from './icons.jsx'
import BotanicalCorner from './BotanicalCorner.jsx'
import StatsCard from './StatsCard.jsx'
import FilterBar from './FilterBar.jsx'
import { MAX_IMAGE_BYTES, MAX_VIDEO_BYTES } from '../supabaseClient'

function formatMB(bytes) {
  return (bytes / (1024 * 1024)).toFixed(0)
}

export default function GalleryHeader({ stats, onOpenUpload, activeFilter, onSelectFilter }) {
  return (
    <div className="gallery-header">
      <BotanicalCorner className="botanical botanical-left" />
      <BotanicalCorner className="botanical botanical-right" flip />

      <CameraIcon className="hero-camera" />

      <div className="eyebrow">Álbum colaborativo</div>

      <h2 className="section-title gallery-title-big">
        Nuestro día,
        <br />a través de sus ojos
      </h2>

      <div className="hero-rule" aria-hidden="true" />

      <p className="hero-sub">
        Cada foto guarda un pedacito de este día. Compartan sus momentos
        favoritos con nosotros y creemos juntos el álbum de nuestra boda.
      </p>

      <button type="button" className="btn btn-primary btn-share" onClick={onOpenUpload}>
        <CameraIcon width="17" height="17" />
        Compartir momento
      </button>

      <p className="upload-note">
        Fotos hasta {formatMB(MAX_IMAGE_BYTES)}MB · Videos hasta {formatMB(MAX_VIDEO_BYTES)}MB
      </p>

      <StatsCard photos={stats.photos} videos={stats.videos} total={stats.total} />

      <p className="hero-quote script">Y seguimos creando recuerdos… ♥</p>

      <FilterBar active={activeFilter} onSelect={onSelectFilter} />
    </div>
  )
}
