import { useState } from 'react'
import ScanVisual from './ScanVisual.jsx'
import ProjectModal from './ProjectModal.jsx'

const PROJECTS = [
  {
    id: 'mri-segmentation',
    status: 'In progress · Jan 2026–Present',
    title: 'Brain MRI 3D Image Segmentation using Deep Learning',
    summary:
      'A machine learning project focused on segmenting brain MRI scans and flagging anomalies for review.',
    details: [
      'Building an ML model that segments brain MRI scans and flags anomalies.',
      'Cleaning and pre-processing medical imaging datasets to get the model performing reliably.',
      'Currently tuning preprocessing steps to improve segmentation accuracy on noisy scans.',
    ],
    stack: ['Python', 'Machine Learning', 'Image Segmentation'],
    link: '', // add your GitHub repo URL here once you push the code
  },
]

export default function Projects() {
  const [active, setActive] = useState(null)

  return (
    <section id="projects">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Projects</p>
          <h2>Selected work.</h2>
          <p>Everything I build ends up here — click a project for the full story.</p>
        </div>

        {PROJECTS.map((project) => (
          <button
            key={project.id}
            className="project-flagship project-flagship-clickable"
            onClick={() => setActive(project)}
          >
            <div className="visual">
              <ScanVisual />
            </div>
            <div className="body">
              <span className="status-pill">{project.status}</span>
              <h3>{project.title}</h3>
              <ul>
                {project.details.slice(0, 2).map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
              <div className="meta">stack: {project.stack.join(' · ').toLowerCase()}</div>
              <span className="view-more">View details &rarr;</span>
            </div>
          </button>
        ))}

        <div className="projects-more">
          <div className="project-placeholder">
            <span>+ Add your next project</span>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>
              Add a new entry to the PROJECTS list in Projects.jsx — it becomes clickable automatically.
            </span>
          </div>
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  )
}
