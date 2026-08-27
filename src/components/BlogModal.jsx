import { useEffect } from 'react'
import BlogIcon from './BlogIcon.jsx'

export default function BlogModal({ post, onClose }) {
  useEffect(() => {
    if (!post) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [post, onClose])

  if (!post) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="blog-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        <BlogIcon type={post.icon} />

        <span className="status-pill">{post.status}</span>
        <h3 id="blog-modal-title">{post.title}</h3>

        {post.image && (
          <img src={post.image} alt={post.title} className="modal-image" />
        )}

        <p className="modal-summary">{post.summary}</p>

        {post.outline?.length > 0 && (
          <>
            <h4 className="modal-subhead">Structural Outline</h4>
            <ul>
              {post.outline.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </>
        )}

        {post.audience && (
          <>
            <h4 className="modal-subhead">Target Audience</h4>
            <p className="modal-body-text">{post.audience}</p>
          </>
        )}

        {post.tags?.length > 0 && (
          <div className="tag-row" style={{ marginTop: '20px' }}>
            {post.tags.map((t) => (
              <span className="tag" key={t}>{t}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
