import ScanVisual from './ScanVisual.jsx'

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Projects</p>
          <h2>Selected work.</h2>
          <p>Every project I ship lives here &mdash; starting with the one I'm deepest in right now.</p>
        </div>

        <div className="project-flagship">
          <div className="visual">
            <ScanVisual />
          </div>
          <div className="body">
            <span className="status-pill">In progress &middot; Dec 2025&ndash;Present</span>
            <h3>Brain MRI Image Segmentation using Deep Learning</h3>
            <ul>
              <li>Built a machine learning model to segment and identify anomalies in brain MRI scans.</li>
              <li>Cleaned and pre-processed medical imaging datasets to optimize model performance.</li>
            </ul>
            <div className="meta">stack: python &middot; ml &middot; image segmentation</div>
          </div>
        </div>

        <div className="projects-more">
          <div className="project-placeholder">
            <span>+ Add your next project</span>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>
              This slot is ready &mdash; drop in your next build.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
