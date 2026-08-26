import { useEffect } from 'react'

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

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

        {project.tagline && <p className="modal-summary">{project.tagline}</p>}

        {project.problem && (
          <>
            <h4 className="modal-subhead">The Problem</h4>
            <p className="modal-body-text">{project.problem}</p>
          </>
        )}

        {project.approach && (
          <>
            <h4 className="modal-subhead">What I Built</h4>
            <p className="modal-body-text">{project.approach}</p>
          </>
        )}

        {project.capabilities?.length > 0 && (
          <>
            <h4 className="modal-subhead">Key Capabilities</h4>
            <ul>
              {project.capabilities.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </>
        )}

        {project.impact?.length > 0 && (
          <>
            <h4 className="modal-subhead">Why It Matters</h4>
            <ul>
              {project.impact.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </>
        )}

        {project.stack?.length > 0 && (
          <>
            <h4 className="modal-subhead">Tech Stack</h4>
            <div className="tag-row">
              {project.stack.map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
          </>
        )}

        {project.dataset && (
          <>
            <h4 className="modal-subhead">Dataset</h4>
            <p className="modal-body-text">{project.dataset}</p>
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
