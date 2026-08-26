import { useState } from 'react'
import ScanVisual from './ScanVisual.jsx'
import ArVisual from './ArVisual.jsx'
import ProjectModal from './ProjectModal.jsx'

const PROJECTS = [
  {
    id: 'brain-tumor-segmentation',
    status: 'Major Project · B.Tech CSE',
    title: 'Reliable AI-Assisted Brain Tumor Segmentation',
    tagline:
      'Deep learning for medical imaging — a segmentation system that knows when to ask for help.',
    problem:
      'Glioblastoma treatment planning depends on precisely outlining the tumor on MRI scans. Doing this by hand is slow and varies from one radiologist to another, while AI segmentation models — even accurate ones — occasionally fail on individual scans without warning. In a clinical setting, a confident-looking but wrong segmentation is more dangerous than a slow one, so accuracy alone isn\u2019t enough — the system also needs to know when to be trusted.',
    approach:
      'An end-to-end deep learning system that segments brain tumors from multi-modal MRI scans (T1, T1CE, T2, FLAIR) and, going beyond a standard segmentation model, assesses the reliability of its own output on every new scan. Instead of treating every prediction as equally trustworthy, it distinguishes cases it\u2019s confident about from ones that genuinely need a radiologist\u2019s attention.',
    capabilities: [
      'Multi-modal 3D tumor segmentation trained and cross-validated on a public clinical MRI dataset (TCGA-GBM), covering the whole tumor, tumor core, and enhancing tumor sub-regions.',
      'Automatic, label-free reliability check on every prediction — estimates how trustworthy each segmentation is without needing ground-truth to compare against.',
      'Smart prioritization of a limited human-review budget, so the cases most worth a radiologist\u2019s time get flagged first.',
      'A self-refinement step that improves the segmentation in its own weak spots, without requiring additional manual annotation.',
      'Publication-grade evaluation: a locked test set opened only once, paired statistical significance testing, and comparison against an established baseline (nnU-Net).',
    ],
    impact: [
      'Cuts radiologist workload by automatically clearing scans the model is genuinely confident about.',
      'Improves patient safety by catching likely-incorrect segmentations before they reach a treatment decision.',
      'Makes AI segmentation more deployable in real clinical workflows by replacing a black-box prediction with a system that reports its own confidence.',
    ],
    stack: [
      'Python',
      'PyTorch',
      '3D CNN (SegResNet)',
      'NiBabel',
      'NumPy / SciPy',
      'scikit-learn',
      'Statistical Testing',
      'Matplotlib',
    ],
    dataset:
      'TCGA-GBM — pre-operative, multi-modal glioblastoma MRI scans, a publicly available clinical dataset widely used in brain tumor segmentation research.',
    link: '', // add your GitHub repo URL here once you push the code
  },
  {
    id: 'pocket-heritage-ar',
    status: 'Smart India Hackathon (SIH) 2025',
    title: 'Pocket Heritage — AR Cultural Heritage Platform',
    tagline:
      'An open-source AR app for visualizing high-fidelity 3D cultural heritage sites in the real world.',
    problem:
      'Most AR heritage-tourism prototypes are single-purpose, tightly-coupled apps that work fine for a demo but don\u2019t scale — adding a new monument or updating information usually means rebuilding and re-shipping the entire app.',
    approach:
      'Built with our team for Smart India Hackathon 2025, Pocket Heritage was engineered using enterprise-level full-stack principles rather than a typical Unity prototype. The goal was a highly scalable, data-driven application with a modular architecture — prioritizing clean code, decoupled systems, and optimized mobile storage.',
    capabilities: [
      'Hybrid on-demand asset pipeline: uses Unity Addressables to stream 3D models from a Netlify-hosted CDN instead of bundling them into the app, keeping install size small while scaling to unlimited heritage sites.',
      'Cloud-driven metadata via Firebase Firestore: site titles, historical descriptions, and AR label coordinates are stored separately from 3D assets, so admins can update information or add new monuments in real time without a new app release.',
      'Centralized state management: a singleton ActiveSiteContext (inspired by React\u2019s Context API) acts as the single source of truth for the active session, with a single cleanup command that releases heavy 3D assets from memory to prevent leaks.',
      'Event-driven architecture: a centralized event bus decouples the UI, data layer, and AR engine, so any part of the system can be modified or replaced without breaking the rest of the app.',
      'Stack-based UI navigation: a LIFO state machine manages transitions between the dashboard, AR view, and info panels, with native support for the mobile back button and non-blocking async loading.',
    ],
    impact: [
      'Keeps the app lightweight while supporting unlimited heritage sites, since 3D content streams on demand instead of being baked into the install.',
      'Lets non-technical teammates update site information and AR content in real time, without waiting on a new app store release.',
      'Built for maintainability as a team codebase, not just a solo demo — clean separation of concerns was a deliberate design goal for the hackathon submission.',
    ],
    stack: [
      'C#',
      'Unity',
      'AR Foundation (ARCore / ARKit)',
      'Firebase Firestore',
      'Unity Addressables',
      'Netlify (CDN)',
      'Git & Git LFS',
    ],
    link: '', // add your GitHub repo URL here
    visual: 'ar',
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
              {project.visual === 'ar' ? <ArVisual /> : <ScanVisual />}
            </div>
            <div className="body">
              <span className="status-pill">{project.status}</span>
              <h3>{project.title}</h3>
              <ul>
                <li>{project.tagline}</li>
                {project.capabilities?.[0] && <li>{project.capabilities[0]}</li>}
              </ul>
              <div className="meta">stack: {project.stack.slice(0, 4).join(' · ').toLowerCase()}</div>
              <span className="view-more">View details &rarr;</span>
            </div>
          </button>
        ))}

        <div className="projects-more">
          <div className="project-placeholder">
            <span>+ Upcomming projects</span>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>
              Comming soon.
            </span>
          </div>
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  )
}
