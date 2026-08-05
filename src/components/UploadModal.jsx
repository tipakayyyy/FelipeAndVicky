import { useEffect } from 'react'
import UploadForm from './UploadForm.jsx'
import { CloseIcon } from './icons.jsx'

export default function UploadModal({ isOpen, onClose, onUploaded }) {
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          <CloseIcon width="16" height="16" />
        </button>
        <UploadForm onUploaded={onUploaded} onSuccessClose={onClose} />
      </div>
    </div>
  )
}
