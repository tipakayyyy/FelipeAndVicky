// Rama floral lineal, muy discreta — pensada para ir semi-transparente
// en las esquinas. `flip` la refleja para la esquina derecha.
export default function BotanicalCorner({ className = '', flip = false }) {
  return (
    <svg
      viewBox="0 0 160 140"
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
        <path d="M4 4c26 6 44 22 54 46 8 19 10 40 8 66" />
        <path d="M20 18c10 4 17 12 19 22" />
        <path d="M34 34c11 1 19 7 23 17" />
        <path d="M12 40c9-1 17 3 21 11" />
        <path d="M46 58c10-2 19 2 24 11" />
        <path d="M56 82c9-3 18 0 23 8" />
        <ellipse cx="21" cy="19" rx="3.4" ry="2.1" transform="rotate(35 21 19)" />
        <ellipse cx="37" cy="35" rx="3.4" ry="2.1" transform="rotate(50 37 35)" />
        <ellipse cx="49" cy="59" rx="3.4" ry="2.1" transform="rotate(60 49 59)" />
        <ellipse cx="59" cy="83" rx="3.4" ry="2.1" transform="rotate(65 59 83)" />
        <circle cx="14" cy="41" r="1.8" />
      </g>
    </svg>
  )
}
