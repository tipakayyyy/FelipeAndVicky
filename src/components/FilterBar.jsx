export const FILTERS = [
  { id: 'all', label: 'Todos los momentos' },
  { id: 'before', label: 'Antes de la boda' },
  { id: 'day', label: 'El gran día' },
  { id: 'favorites', label: 'Nuestros favoritos ♡' },
]

export default function FilterBar({ active, onSelect }) {
  return (
    <nav className="filter-bar" aria-label="Filtrar galería">
      {FILTERS.map((f) => (
        <button
          key={f.id}
          type="button"
          className={'filter-chip' + (active === f.id ? ' is-active' : '')}
          onClick={() => onSelect(f.id)}
        >
          {f.label}
        </button>
      ))}
    </nav>
  )
}
