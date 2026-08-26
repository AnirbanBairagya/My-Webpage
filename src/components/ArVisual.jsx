export default function ArVisual() {
  return (
    <div className="scan-frame" role="img" aria-label="Animated AR marker over a 3D heritage site outline">
      <div className="grid-overlay" />
      <svg className="blob" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="arGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c6cf6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#4ce0d2" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {/* simple dome/monument silhouette */}
        <path
          d="M60 150 L60 100 Q60 60 100 55 Q140 60 140 100 L140 150 Z"
          fill="url(#arGrad)"
          stroke="#4ce0d2"
          strokeWidth="1"
          opacity="0.9"
        />
        <circle cx="100" cy="45" r="8" fill="none" stroke="#4ce0d2" strokeWidth="1" opacity="0.7" />
        <line x1="40" y1="150" x2="160" y2="150" stroke="#4ce0d2" strokeWidth="1" opacity="0.5" />
        {/* corner AR reticle brackets */}
        <path d="M30 30 L30 45 M30 30 L45 30" stroke="#7c6cf6" strokeWidth="2" fill="none" />
        <path d="M170 30 L170 45 M170 30 L155 30" stroke="#7c6cf6" strokeWidth="2" fill="none" />
        <path d="M30 170 L30 155 M30 170 L45 170" stroke="#7c6cf6" strokeWidth="2" fill="none" />
        <path d="M170 170 L170 155 M170 170 L155 170" stroke="#7c6cf6" strokeWidth="2" fill="none" />
      </svg>
      <div className="scan-line" />
      <span className="tag-live"><span className="pulse" />tracking</span>
      <span className="tag">site_marker_ar.dat</span>
    </div>
  )
}
