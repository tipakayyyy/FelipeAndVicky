import { PlayIcon, ExpandIcon } from './icons.jsx'

export default function GalleryCard({ item, onClick }) {
  const hasCaption = Boolean(item.caption)

  return (
    <button
      className="gallery-card"
      onClick={onClick}
      aria-label={`Ver ${item.media_type === 'video' ? 'video' : 'foto'} de ${item.name}`}
    >
      <div className="gallery-card-media">
        {item.media_type === 'video' ? (
          <video src={item.media_url} muted playsInline preload="metadata" />
        ) : (
          <img
            src={item.media_url}
            alt={item.caption || `Foto de ${item.name}`}
            loading="lazy"
          />
        )}

        {item.media_type === 'video' && (
          <span className="video-badge" aria-hidden="true">
            <PlayIcon width="13" height="13" />
          </span>
        )}

        <div className="gallery-card-overlay">
          <ExpandIcon className="overlay-expand" width="20" height="20" />
        </div>
      </div>

      {(hasCaption || item.name) && (
        <div className="gallery-card-caption">
          {hasCaption && <span className="caption-text">{item.caption}</span>}
          <span className="caption-name">— {item.name}</span>
        </div>
      )}
    </button>
  )
}
