import { useMemo, useState } from 'react'
import ScanVisual from './ScanVisual.jsx'
import ArVisual from './ArVisual.jsx'
import ProjectModal from './ProjectModal.jsx'

// Recruiter-mode personalization: pure client-side keyword/tag logic,
// no API calls. Each project carries a `relevance` score (0-3) per role;
// picking a role re-sorts the list, highest relevance first, using a
// stable sort so equally-relevant projects keep their original order.
const ROLE_OPTIONS = [
  { id: 'all', label: 'All roles' },
  { id: 'ml-engineer', label: 'ML / AI Engineer' },
  { id: 'backend', label: 'Backend / Software Engineer' },
]

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
    recruiterPitch: {
      problem:
        'Reading brain scans by hand is slow, and even good AI models can quietly get it wrong sometimes — risky in healthcare. This project builds an AI that doesn\u2019t just read the scan, it also flags when it\u2019s unsure, so doctors know exactly where to spend their limited time.',
      approach:
        'I built a deep learning system that finds and outlines brain tumors in MRI scans, and — the key part — rates how confident it is in each result. Easy cases get handled automatically; uncertain ones get flagged for a radiologist, instead of trusting every AI output equally.',
    },
    reasoning:
      'I chose to build a confidence layer instead of only chasing raw accuracy, because in a hospital setting a wrong-but-confident prediction is more dangerous than a slow one — trust matters as much as performance.',
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
    relevance: { 'ml-engineer': 3, backend: 1 },
    modelCard: {
      version: 'v0.1 · research / in development',
      modelType:
        'SegResNet-based 3D CNN encoder-decoder, with an added reliability/confidence estimation head.',
      developedBy: 'Anirban Bairagya — B.Tech CSE major project',
      intendedUse:
        'Research and educational demonstration of confidence-aware medical image segmentation. Intended to assist — not replace — radiologist review, by triaging scans according to estimated reliability.',
      primaryUsers:
        'ML/CV researchers, students, and radiology-adjacent researchers interested in reliability-aware AI.',
      outOfScope:
        'Not intended for direct clinical diagnosis or treatment decisions. Not validated, cleared, or approved for use in any real clinical workflow.',
      trainingData:
        'TCGA-GBM (The Cancer Genome Atlas Glioblastoma Multiforme), a publicly available clinical dataset. Multi-modal MRI: T1, T1CE, T2, FLAIR.',
      evaluation:
        'A locked test split, opened only once. Metrics: Dice Similarity Coefficient (whole tumor, tumor core, enhancing tumor sub-regions), paired statistical significance testing against an nnU-Net baseline.',
      results:
        'Evaluation in progress — final Dice scores and baseline comparison will be published here once testing is complete.',
      limitations: [
        'Trained on a single public dataset (TCGA-GBM), which may not represent the full diversity of scanners, institutions, or patient populations seen in general clinical practice.',
        'Not yet validated on external or multi-institutional data.',
        'Confidence/reliability scores are model-derived estimates, not certified clinical uncertainty measurements.',
      ],
      ethicalConsiderations: [
        'Medical imaging datasets can encode bias from how and where they were collected; performance may vary for sub-populations underrepresented in TCGA-GBM.',
        'A confident-but-wrong prediction used without human oversight carries real patient-safety risk — this is the core problem the reliability layer is designed to address, not a solved one.',
        'Not FDA/CE cleared or approved for clinical use of any kind.',
      ],
    },
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
    recruiterPitch: {
      problem:
        'Most AR history apps are built as one-off demos that are hard to update or expand afterward. We wanted something a real team could maintain and grow over time — add a new monument without shipping a whole new app.',
      approach:
        'Built for Smart India Hackathon 2025 with a small team, Pocket Heritage lets you point your phone at a heritage site and see it reconstructed in AR with historical context layered on top. Behind the scenes it\u2019s built like a real product: content updates instantly from the cloud, and new sites can be added without an app store release.',
    },
    reasoning:
      'We deliberately over-engineered the "boring" parts — asset delivery and state management — because hackathon demos are judged in one weekend, but a heritage app that can\u2019t be updated afterward isn\u2019t actually useful to anyone.',
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
    relevance: { 'ml-engineer': 1, backend: 3 },
  },
]

export default function Projects() {
  const [active, setActive] = useState(null)
  const [role, setRole] = useState('all')

  const visibleProjects = useMemo(() => {
    if (role === 'all') return PROJECTS
    // Array.prototype.sort is stable, so projects tied on relevance
    // keep their original relative order instead of jumping around.
    return [...PROJECTS].sort(
      (a, b) => (b.relevance?.[role] || 0) - (a.relevance?.[role] || 0)
    )
  }, [role])

  return (
    <section id="projects">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Projects</p>
          <h2>Selected work.</h2>
          <p>Everything I build ends up here — click a project for the full story.</p>
        </div>

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
              <div className="meta">stack: {project.stack.slice(0, 4).join(' · ').toLowerCase()}</div>
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
