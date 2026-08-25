export default function ScanVisual() {
  return (
    <div className="scan-frame" role="img" aria-label="Animated brain scan grid, representing MRI image segmentation work">
      <div className="grid-overlay" />
      <svg className="blob" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c6cf6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#4ce0d2" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <path
          d="M100 20c30 0 55 18 62 44 5 18-2 30 6 44 7 12 2 28-12 34-4 14-20 22-36 18-10 8-26 8-36-2-16 2-30-10-30-26-14-8-18-26-8-38-6-16 2-34 18-42 6-18 20-32 36-32z"
          fill="url(#brainGrad)"
          stroke="#4ce0d2"
          strokeWidth="1"
          opacity="0.9"
        />
        <path
          d="M76 70c8-6 18-6 24 2M120 70c8-6 18-6 24 2M70 108c10 8 24 10 34 2M126 108c-10 8-24 10-34 2"
          fill="none"
          stroke="#4ce0d2"
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>
      <div className="scan-line" />
      <span className="tag-live"><span className="pulse" />segmenting</span>
      <span className="tag">brain_mri_scan_014.dcm</span>
    </div>
  )
}
