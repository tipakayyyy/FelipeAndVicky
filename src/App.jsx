import { useEffect, useState, useCallback, useMemo } from 'react'
import { supabase, TABLE_NAME } from './supabaseClient'
import Navbar from './components/Navbar.jsx'
import Home from './components/sections/Home.jsx'
import OurStory from './components/sections/OurStory.jsx'
import BigDay from './components/sections/BigDay.jsx'
import InfoSection from './components/sections/InfoSection.jsx'
import Rsvp from './components/sections/Rsvp.jsx'
import GalleryHeader from './components/GalleryHeader.jsx'
import UploadModal from './components/UploadModal.jsx'
import MusicPlayer from './components/MusicPlayer.jsx'
import Gallery from './components/Gallery.jsx'
import Lightbox from './components/Lightbox.jsx'
import Footer from './components/Footer.jsx'

const PAGE_SIZE = 9

// 🔄 Lista de IDs exactos para que la navegación y el observador de scroll funcionen
const SECTION_IDS = [
  'inicio',
  'historia',
  'gran-dia',
  'asistencia',
  'informacion',
  'galeria',
]

export default function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)

  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)

  const [activeFilter, setActiveFilter] = useState('all')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const [activeSection, setActiveSection] = useState('inicio')

  const fetchItems = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setLoadError(error.message)
    } else {
      setItems(data)
      setLoadError(null)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchItems()

    const channel = supabase
      .channel('wedding_uploads_realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: TABLE_NAME },
        (payload) => {
          setItems((current) => {
            if (current.some((it) => it.id === payload.new.id)) return current
            return [payload.new, ...current]
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchItems])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleUploaded = (newItem) => {
    setItems((current) => {
      if (current.some((it) => it.id === newItem.id)) return current
      return [newItem, ...current]
    })
  }

  const stats = useMemo(
    () => ({
      photos: items.filter((it) => it.media_type === 'image').length,
      videos: items.filter((it) => it.media_type === 'video').length,
      total: items.length,
    }),
    [items]
  )

  const filteredItems = useMemo(() => {
    switch (activeFilter) {
      case 'before':
        return items.filter((it) => it.category === 'before')
      case 'day':
        return items.filter((it) => it.category === 'day')
      case 'favorites':
        return items.filter((it) => it.is_favorite)
      default:
        return items
    }
  }, [items, activeFilter])

  const handleSelectFilter = (filterId) => {
    setActiveFilter(filterId)
    setVisibleCount(PAGE_SIZE)
  }

  const visibleItems = filteredItems.slice(0, visibleCount)
  const hasMore = filteredItems.length > visibleCount

  return (
    <div className="page">
      <Navbar activeSection={activeSection} />

      {/* 🎵 El reproductor activo de fondo y flotante */}
      <MusicPlayer />

      {/* 1. Portada */}
      <section id="inicio">
        <Home />
      </section>

      {/* 2. Nuestra Historia */}
      <section id="historia">
        <OurStory />
      </section>

      {/* 3. Detalles del Gran Día */}
      <section id="gran-dia">
        <BigDay />
      </section>

      {/* 4. Confirmación de Asistencia */}
      <section id="asistencia">
        <Rsvp />
      </section>

      {/* 5. Información (Regalos) */}
      <section id="informacion">
        <InfoSection />
      </section>

      {/* 📸 6. GALERÍA COMPARTIDA */}
      <section id="galeria" className="gallery-section">
        <GalleryHeader
          stats={stats}
          onOpenUpload={() => setIsUploadOpen(true)}
          activeFilter={activeFilter}
          onSelectFilter={handleSelectFilter}
        />

        {loading && <p className="status-text">Cargando el álbum…</p>}
        {loadError && (
          <p className="status-text error">
            No pudimos cargar la galería: {loadError}
          </p>
        )}
        {!loading && !loadError && filteredItems.length === 0 && (
          <p className="status-text">
            {items.length === 0
              ? 'Aún no hay fotos ni videos — ¡sé el primero en compartir un momento!'
              : 'No hay momentos en esta categoría todavía.'}
          </p>
        )}

        <Gallery
          items={visibleItems}
          onSelect={setActiveIndex}
          hasMore={hasMore}
          onLoadMore={() => setVisibleCount((c) => c + PAGE_SIZE)}
        />
      </section>

      {/* Pie de Página */}
      <Footer />

      {/* Modales Flotantes */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploaded={handleUploaded}
      />

      {activeIndex !== null && (
        <Lightbox
          items={visibleItems}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </div>
  )
}