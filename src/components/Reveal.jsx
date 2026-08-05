import { useEffect, useRef, useState } from 'react'

// Envoltura ligera que agrega un fade-up sutil cuando el elemento entra
// en el viewport. Usa IntersectionObserver (sin librerías externas) y
// respeta prefers-reduced-motion vía CSS (ver .reveal-item en styles.css).
export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const delayClass = delay ? ` reveal-delay-${delay}` : ''

  return (
    <Tag ref={ref} className={`reveal-item${visible ? ' is-visible' : ''}${delayClass} ${className}`}>
      {children}
    </Tag>
  )
}
