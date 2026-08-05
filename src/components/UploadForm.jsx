import { useRef, useState } from 'react'
import {
  supabase,
  TABLE_NAME,
  BUCKET_NAME,
  MAX_IMAGE_BYTES,
  MAX_VIDEO_BYTES,
} from '../supabaseClient'
import { UPLOAD_CATEGORIES } from '../constants'

const ACCEPTED = 'image/*,video/*'

function formatMB(bytes) {
  return (bytes / (1024 * 1024)).toFixed(0)
}

function sanitizeFileName(fileName) {
  return fileName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quita acentos
    .replace(/[^a-zA-Z0-9.\-_]/g, '_')
    .toLowerCase()
}

export default function UploadForm({ onUploaded, onSuccessClose }) {
  const [name, setName] = useState('')
  const [caption, setCaption] = useState('')
  const [category, setCategory] = useState(UPLOAD_CATEGORIES[0].value) // "El gran día" por defecto
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('idle') // idle | uploading | error | done
  const [errorMsg, setErrorMsg] = useState('')
  const fileInputRef = useRef(null)

  const resetForm = () => {
    setName('')
    setCaption('')
    setCategory(UPLOAD_CATEGORIES[0].value)
    setFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const validateFile = (selected) => {
    if (!selected) return 'Elige una foto o un video primero.'

    const isImage = selected.type.startsWith('image/')
    const isVideo = selected.type.startsWith('video/')

    if (!isImage && !isVideo) {
      return 'Solo se aceptan archivos de foto o video.'
    }
    if (isImage && selected.size > MAX_IMAGE_BYTES) {
      return `Esa foto pesa demasiado. El máximo es ${formatMB(MAX_IMAGE_BYTES)}MB.`
    }
    if (isVideo && selected.size > MAX_VIDEO_BYTES) {
      return `Ese video pesa demasiado. El máximo es ${formatMB(MAX_VIDEO_BYTES)}MB.`
    }
    return null
  }

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0] ?? null
    const problem = selected ? validateFile(selected) : null
    if (problem) {
      setErrorMsg(problem)
      setFile(null)
      e.target.value = ''
    } else {
      setErrorMsg('')
      setFile(selected)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const problem = validateFile(file)
    if (problem) {
      setErrorMsg(problem)
      setStatus('error')
      return
    }
    if (!name.trim()) {
      setErrorMsg('Cuéntanos tu nombre para que sepamos quién compartió esto.')
      setStatus('error')
      return
    }

    setStatus('uploading')
    setErrorMsg('')

    try {
      const mediaType = file.type.startsWith('video/') ? 'video' : 'image'
      const ext = file.name.includes('.') ? file.name.split('.').pop() : ''
      const uniqueName = `${crypto.randomUUID()}-${sanitizeFileName(file.name || `archivo.${ext}`)}`
      const filePath = `${mediaType}s/${uniqueName}`

      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type,
        })

      if (uploadError) throw uploadError

      const { data: publicUrlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath)

      const newRow = {
        name: name.trim(),
        caption: caption.trim() || null,
        media_type: mediaType,
        category, // elegido por el invitado: 'day' o 'before'
        file_path: filePath,
        media_url: publicUrlData.publicUrl,
      }

      const { data: inserted, error: insertError } = await supabase
        .from(TABLE_NAME)
        .insert(newRow)
        .select()
        .single()

      if (insertError) throw insertError

      onUploaded(inserted)
      setStatus('done')
      resetForm()
      setTimeout(() => {
        setStatus('idle')
        if (onSuccessClose) onSuccessClose()
      }, 1600)
    } catch (err) {
      console.error(err)
      setErrorMsg(
        err.message || 'Algo salió mal al subir tu archivo. Intenta de nuevo.'
      )
      setStatus('error')
    }
  }

  return (
    <div className="upload-modal-body">
      <h2 className="upload-title">Comparte tu momento</h2>
      <p className="upload-lead">
        Cualquier formato, sin necesidad de crear cuenta.
        <br />
        Fotos hasta {formatMB(MAX_IMAGE_BYTES)}MB · Videos hasta {formatMB(MAX_VIDEO_BYTES)}MB
      </p>

      <form onSubmit={handleSubmit} className="upload-form">
        <label className="field">
          <span>Tu nombre</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej. Tía Rosa"
            maxLength={80}
            required
          />
        </label>

        <label className="field">
          <span>Descripción (opcional)</span>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Ej. El brindis más emotivo"
            maxLength={140}
          />
        </label>

        <div className="field">
          <span>¿Cuándo tomaste esta foto/video?</span>
          <div className="category-toggle">
            {UPLOAD_CATEGORIES.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={
                  'category-option' + (category === opt.value ? ' is-active' : '')
                }
                onClick={() => setCategory(opt.value)}
                aria-pressed={category === opt.value}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <label className="field file-field">
          <span>Foto o video</span>
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED}
            onChange={handleFileChange}
            required
          />
        </label>

        {errorMsg && <p className="form-error">{errorMsg}</p>}
        {status === 'done' && (
          <p className="form-success">¡Gracias! Tu recuerdo ya está en el álbum.</p>
        )}

        <button type="submit" className="btn btn-primary" disabled={status === 'uploading'}>
          {status === 'uploading' ? 'Subiendo…' : 'Añadir al álbum'}
        </button>
      </form>
    </div>
  )
}
