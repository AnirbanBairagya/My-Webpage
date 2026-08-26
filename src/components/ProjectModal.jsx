import { useEffect } from 'react'

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!project) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        <span className="status-pill">{project.status}</span>
        <h3 id="modal-title">{project.title}</h3>

        <p className="modal-summary">{project.summary}</p>

        <h4 className="modal-subhead">What it does</h4>
        <ul>
          {project.details.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>

        {project.stack?.length > 0 && (
          <>
            <h4 className="modal-subhead">Tech stack</h4>
            <div className="tag-row">
              {project.stack.map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
          </>
        )}

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary modal-link"
          >
            View on GitHub
          </a>
        )}
      </div>
    </div>
  )
}
