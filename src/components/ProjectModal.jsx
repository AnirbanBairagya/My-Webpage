import { useEffect, useState } from 'react'

export default function ProjectModal({ project, onClose }) {
  const [view, setView] = useState('recruiter')

  useEffect(() => {
    if (!project) return
    setView('recruiter')
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

  const hasToggle = Boolean(project.recruiterPitch)
  const problemText =
    hasToggle && view === 'recruiter' ? project.recruiterPitch.problem : project.problem
  const approachText =
    hasToggle && view === 'recruiter' ? project.recruiterPitch.approach : project.approach

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

        {project.reasoning && (
          <div className="reasoning-box">
            <span className="reasoning-label">&gt; why this approach</span>
            <p>{project.reasoning}</p>
          </div>
        )}

        {hasToggle && (
          <div className="view-toggle" role="tablist" aria-label="Explanation level">
            <button
              type="button"
              role="tab"
              aria-selected={view === 'recruiter'}
              className={view === 'recruiter' ? 'active' : ''}
              onClick={() => setView('recruiter')}
            >
              For Recruiters
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={view === 'engineer'}
              className={view === 'engineer' ? 'active' : ''}
              onClick={() => setView('engineer')}
            >
              For Engineers
            </button>
          </div>
        )}

        {problemText && (
          <>
            <h4 className="modal-subhead">The Problem</h4>
            <p className="modal-body-text">{problemText}</p>
          </>
        )}

        {approachText && (
          <>
            <h4 className="modal-subhead">What I Built</h4>
            <p className="modal-body-text">{approachText}</p>
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
