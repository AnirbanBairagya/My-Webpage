import { useEffect, useState } from 'react'

// Voice narration: browser-native Web Speech API (SpeechSynthesis).
// No API key, no network call, nothing to break server-side — just
// reads the currently-visible text aloud. Text is rebuilt from
// whichever view (recruiter/engineer) is active, so narration always
// matches what's on screen.
function buildNarrationText(project, problemText, approachText) {
  const parts = [project.title]
  if (project.tagline) parts.push(project.tagline)
  if (problemText) parts.push(problemText)
  if (approachText) parts.push(approachText)
  if (project.reasoning) parts.push(`Why this approach: ${project.reasoning}`)
  return parts.join('. ')
}

const SPEECH_SUPPORTED = typeof window !== 'undefined' && 'speechSynthesis' in window

export default function ProjectModal({ project, onClose }) {
  const [view, setView] = useState('recruiter')
  const [speaking, setSpeaking] = useState(false)

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

  // Stop any narration in progress whenever the visible project or
  // view changes, or the modal unmounts — never let it read stale
  // text over a project you've already navigated away from.
  useEffect(() => {
    if (SPEECH_SUPPORTED) window.speechSynthesis.cancel()
    setSpeaking(false)
  }, [project, view])

  useEffect(() => {
    return () => {
      if (SPEECH_SUPPORTED) window.speechSynthesis.cancel()
    }
  }, [])

  if (!project) return null

  const hasToggle = Boolean(project.recruiterPitch)
  const problemText =
    hasToggle && view === 'recruiter' ? project.recruiterPitch.problem : project.problem
  const approachText =
    hasToggle && view === 'recruiter' ? project.recruiterPitch.approach : project.approach

  function toggleNarration() {
    if (!SPEECH_SUPPORTED) return

    if (speaking) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
      return
    }

    const text = buildNarrationText(project, problemText, approachText)
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)

    window.speechSynthesis.cancel() // clear anything queued before speaking
    window.speechSynthesis.speak(utterance)
    setSpeaking(true)
  }

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

        {SPEECH_SUPPORTED && (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={toggleNarration}
            aria-pressed={speaking}
          >
            {speaking ? '⏹ Stop narration' : '🔊 Listen to this project'}
          </button>
        )}

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
