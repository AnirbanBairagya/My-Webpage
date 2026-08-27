const ICONS = {
  medical: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24 8c9 0 15 6 15 14 0 5-2 8-2 12 0 3-3 5-6 4-3 3-9 3-12 0-3 1-6-1-6-4 0-4-2-7-2-12 0-8 6-14 13-14z"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <path
        d="M17 20c2-2 5-2 6 1M25 20c2-2 5-2 6 1M16 30c3 2 7 3 10 0M28 30c-3 2-7 3-10 0"
        stroke="currentColor"
        strokeWidth="1.3"
        opacity="0.6"
        fill="none"
      />
    </svg>
  ),
  code: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 14 6 24l10 10M32 14l10 10-10 10M28 10l-8 28"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="10" width="32" height="20" rx="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M16 30v6l7-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="17" cy="20" r="1.6" fill="currentColor" />
      <circle cx="24" cy="20" r="1.6" fill="currentColor" />
      <circle cx="31" cy="20" r="1.6" fill="currentColor" />
    </svg>
  ),
  career: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24 6c6 4 9 10 9 17 0 6-3 11-9 19-6-8-9-13-9-19 0-7 3-13 9-17z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="24" cy="21" r="4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M17 34l-5 8M31 34l5 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
}

export default function BlogIcon({ type }) {
  return <div className="blog-icon">{ICONS[type] || ICONS.code}</div>
}
