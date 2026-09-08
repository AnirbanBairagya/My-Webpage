import { useEffect, useMemo, useState } from 'react'
import ScanVisual from './ScanVisual.jsx'
import ArVisual from './ArVisual.jsx'
import ProjectModal from './ProjectModal.jsx'
import { supabase } from '../lib/supabaseClient.js'

// Recruiter-mode personalization: pure client-side keyword/tag logic,
// no API calls. Each project carries a `relevance` score (0-3) per role;
// picking a role re-sorts the list, highest relevance first, using a
// stable sort so equally-relevant projects keep their original order.
const ROLE_OPTIONS = [
  { id: 'all', label: 'All roles' },
  { id: 'ml-engineer', label: 'ML / AI Engineer' },
  { id: 'backend', label: 'Backend / Software Engineer' },
]

// Maps a Supabase `projects` row (flat columns, snake_case) onto the
// exact shape ProjectModal.jsx already expects (nested recruiterPitch,
// camelCase modelCard/systemCard). This means ProjectModal.jsx itself
// never needs to change, regardless of where the data comes from.
function rowToProject(row) {
  return {
    id: row.slug,
    status: row.status,
    title: row.title,
    tagline: row.tagline,
    problem: row.problem,
    approach: row.approach,
    recruiterPitch:
      row.recruiter_problem || row.recruiter_approach
        ? { problem: row.recruiter_problem, approach: row.recruiter_approach }
        : null,
    reasoning: row.reasoning,
    capabilities: row.capabilities || [],
    impact: row.impact || [],
    stack: row.stack || [],
    dataset: row.dataset,
    link: row.link,
    visual: row.visual,
    relevance: row.relevance || {},
    modelCard: row.model_card || null,
    systemCard: row.system_card || null,
  }
}

export default function Projects() {
  const [active, setActive] = useState(null)
  const [role, setRole] = useState('all')
  const [projects, setProjects] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error

  useEffect(() => {
    let cancelled = false
    supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) {
          console.error('Failed to load projects:', error)
          setStatus('error')
          return
        }
        setProjects((data || []).map(rowToProject))
        setStatus('ready')
      })
    return () => {
      cancelled = true
    }
  }, [])

  const visibleProjects = useMemo(() => {
    if (role === 'all') return projects
    // Array.prototype.sort is stable, so projects tied on relevance
    // keep their original relative order instead of jumping around.
    return [...projects].sort(
      (a, b) => (b.relevance?.[role] || 0) - (a.relevance?.[role] || 0)
    )
  }, [projects, role])

  return (
    <section id="projects">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Projects</p>
          <h2>Selected work.</h2>
          <p>Everything I build ends up here — click a project for the full story.</p>
        </div>

        {status === 'loading' && <p className="modal-body-text">Loading projects…</p>}
        {status === 'error' && (
          <p className="modal-body-text">
            Couldn't load projects right now — please try refreshing the page.
          </p>
        )}

        {status === 'ready' && (
          <div className="view-toggle" role="tablist" aria-label="Show projects relevant to">
            {ROLE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                role="tab"
                aria-selected={role === opt.id}
                className={role === opt.id ? 'active' : ''}
                onClick={() => setRole(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {visibleProjects.map((project) => (
          <button
            key={project.id}
            className="project-flagship project-flagship-clickable"
            onClick={() => setActive(project)}
          >
            <div className="visual">
              {project.visual === 'ar' ? <ArVisual /> : <ScanVisual />}
            </div>
            <div className="body">
              <span className="status-pill">{project.status}</span>
              <h3>{project.title}</h3>
              <ul>
                <li>{project.tagline}</li>
                {project.capabilities?.[0] && <li>{project.capabilities[0]}</li>}
              </ul>
              <div className="meta">
                stack: {(project.stack || []).slice(0, 4).join(' · ').toLowerCase()}
              </div>
              <span className="view-more">View details &rarr;</span>
            </div>
          </button>
        ))}

        <div className="projects-more">
          <div className="project-placeholder">
            <span>+ More projects in progress</span>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>
              The next build is already underway — check back soon.
            </span>
          </div>
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  )
}
