import { useCallback, useEffect, useMemo, useState } from 'react'
import { supabase, TABLE_NAME, RSVP_TABLE_NAME, BUCKET_NAME } from '../supabaseClient'

function useUploads() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('created_at', { ascending: false })
    setItems(data || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchAll()
    const channel = supabase
      .channel('admin_wedding_uploads')
      .on('postgres_changes', { event: '*', schema: 'public', table: TABLE_NAME }, fetchAll)
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [fetchAll])

  return { items, loading, refetch: fetchAll }
}

function useRsvps() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from(RSVP_TABLE_NAME)
      .select('*')
      .order('created_at', { ascending: false })
    setItems(data || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchAll()
    const channel = supabase
      .channel('admin_wedding_rsvps')
      .on('postgres_changes', { event: '*', schema: 'public', table: RSVP_TABLE_NAME }, fetchAll)
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [fetchAll])

  return { items, loading, refetch: fetchAll }
}

function PhotosTab() {
  const { items, loading, refetch } = useUploads()
  const [deletingId, setDeletingId] = useState(null)
  const [downloadingId, setDownloadingId] = useState(null)

  const handleDownload = async (item) => {
    const url = item.media_url || item.url || item.file_url
    if (!url) return alert('No se encontró la URL del archivo.')

    setDownloadingId(item.id)
    try {
      const response = await fetch(url)
      const blob = await response.blob()

      const extension = url.split('.').pop().split('?')[0] || 'jpg'
      const fileName = `${item.name || 'boda-recuerdo'}-${item.id}.${extension}`

      const blobUrl = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error('Error al descargar:', error)
      window.open(url, '_blank')
    } finally {
      setDownloadingId(null)
    }
  }

  const handleDelete = async (item) => {
    if (!window.confirm(`¿Eliminar "${item.name || 'este elemento'}"? Esta acción no se puede deshacer.`)) return
    setDeletingId(item.id)
    try {
      if (item.file_path) {
        await supabase.storage.from(BUCKET_NAME).remove([item.file_path])
      }
      const { error } = await supabase.from(TABLE_NAME).delete().eq('id', item.id)
      if (error) alert(`Error al eliminar: ${error.message}`)
      else await refetch()
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setDeletingId(null)
    }
  }

  const isVideo = (item) => {
    const url = (item.media_url || item.url || '').toLowerCase()
    return (
      item.media_type === 'video' ||
      url.endsWith('.mp4') ||
      url.endsWith('.mov') ||
      url.endsWith('.webm') ||
      url.endsWith('.m4v')
    )
  }

  if (loading) return <p className="status-text">Cargando fotos y videos…</p>

  return (
    <div className="admin-photo-grid">
      {items.length === 0 && <p className="status-text">Aún no hay fotos ni videos subidos.</p>}
      {items.map((item) => {
        const url = item.media_url || item.url || item.file_url
        const checkVideo = isVideo(item)

        return (
          <div key={item.id} className="admin-photo-card">
            {checkVideo ? (
              <video src={url} controls preload="metadata" />
            ) : (
              <img src={url} alt={item.caption || item.name} loading="lazy" />
            )}
            <div className="admin-photo-meta">
              <p className="admin-photo-name">{item.name || 'Invitado'}</p>
              {item.caption && <p className="admin-photo-caption">{item.caption}</p>}
              <p className="admin-photo-date">
                {item.created_at ? new Date(item.created_at).toLocaleString('es-PE') : ''}
              </p>

              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => handleDownload(item)}
                  disabled={downloadingId === item.id}
                  style={{ flex: 1, padding: '6px 12px', fontSize: '0.85rem' }}
                >
                  {downloadingId === item.id ? '⬇️ Bajando…' : '⬇️ Descargar'}
                </button>

                <button
                  type="button"
                  className="btn btn-outline admin-delete-btn"
                  onClick={() => handleDelete(item)}
                  disabled={deletingId === item.id}
                  style={{ flex: 1, padding: '6px 12px', fontSize: '0.85rem' }}
                >
                  {deletingId === item.id ? 'Eliminando…' : 'Eliminar'}
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function RsvpsTab() {
  const { items, loading, refetch } = useRsvps()
  const [busyId, setBusyId] = useState(null)

  const checkIsAttending = (r) => {
    const val = (r.attendance || '').toLowerCase()
    return val === 'attending' || val === 'sí' || val === 'si' || r.attending === true
  }

  const stats = useMemo(() => {
    const attending = items.filter(checkIsAttending)
    const notAttending = items.filter((r) => !checkIsAttending(r))
    return {
      attending: attending.length,
      notAttending: notAttending.length,
      total: items.length,
    }
  }, [items])

  const handleDelete = async (id, name) => {
    if (!window.confirm(`¿Eliminar la confirmación de "${name}"?`)) return
    setBusyId(id)

    const { error } = await supabase
      .from(RSVP_TABLE_NAME)
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error al eliminar de Supabase:', error)
      alert(`Error al eliminar: ${error.message}`)
    } else {
      await refetch()
    }

    setBusyId(null)
  }

  if (loading) return <p className="status-text">Cargando confirmaciones…</p>

  return (
    <div>
      <div className="admin-stats-row" style={{ gridTemplateColumns: 'repeat(2, 1fr)', maxWidth: '480px' }}>
        <div className="admin-stat"><span>{stats.attending}</span>Asistirán</div>
        <div className="admin-stat"><span>{stats.notAttending}</span>No asistirán</div>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Invitado</th>
              <th>Asiste</th>
              <th>Mensaje / Nota</th>
              <th>Fecha</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr><td colSpan={5} className="status-text">Aún no hay confirmaciones.</td></tr>
            )}
            {items.map((r) => {
              const guestName = r.name || r.guest_name || 'Invitado'
              const isAttending = checkIsAttending(r)

              return (
                <tr key={r.id}>
                  <td>
                    <div><strong>{guestName}</strong></div>
                    {r.email && <small style={{ color: '#888' }}>{r.email}</small>}
                  </td>
                  <td>
                    <span style={{ color: isAttending ? '#2e7d32' : '#c62828', fontWeight: 'bold' }}>
                      {isAttending ? 'Sí' : 'No'}
                    </span>
                  </td>
                  <td>{r.notes || r.message || '—'}</td>
                  <td>{r.created_at ? new Date(r.created_at).toLocaleDateString('es-PE') : '—'}</td>
                  <td className="admin-row-actions">
                    <button
                      className="btn-mini btn-mini-delete"
                      disabled={busyId === r.id}
                      onClick={() => handleDelete(r.id, guestName)}
                    >
                      {busyId === r.id ? '...' : 'Eliminar'}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function AdminDashboard({ session }) {
  const [tab, setTab] = useState('rsvps')

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div>
          <h1>Panel — Felipe &amp; Victoria</h1>
          <p>{session?.user?.email}</p>
        </div>
        <button className="btn btn-outline" onClick={() => supabase.auth.signOut()}>
          Cerrar sesión
        </button>
      </header>

      <nav className="admin-tabs">
        <button
          className={'admin-tab' + (tab === 'rsvps' ? ' is-active' : '')}
          onClick={() => setTab('rsvps')}
        >
          Asistencia
        </button>
        <button
          className={'admin-tab' + (tab === 'photos' ? ' is-active' : '')}
          onClick={() => setTab('photos')}
        >
          Fotos y videos
        </button>
      </nav>

      <main className="admin-content">
        {tab === 'rsvps' ? <RsvpsTab /> : <PhotosTab />}
      </main>
    </div>
  )
}