import GalleryCard from './GalleryCard.jsx'

export default function Gallery({ items, onSelect, hasMore, onLoadMore }) {
  if (items.length === 0) return null

  return (
    <>
      <div className="gallery-masonry">
        {items.map((item, index) => (
          <div className="masonry-item" key={item.id}>
            <GalleryCard item={item} onClick={() => onSelect(index)} />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="load-more-wrap">
          <button type="button" className="btn btn-outline" onClick={onLoadMore}>
            Cargar más momentos ↓
          </button>
          <div className="load-more-rule" aria-hidden="true" />
        </div>
      )}
    </>
  )
}
