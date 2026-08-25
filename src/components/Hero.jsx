import { useEffect, useState } from 'react'
import ScanVisual from './ScanVisual.jsx'

const ROLES = [
  'Machine Learning Engineer',
  'Backend Developer',
  'Computer Science Student',
  'Problem Solver',
]

export default function Hero() {
  const [text, setText] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = ROLES[roleIndex]
    const speed = deleting ? 35 : 65
    const pause = 1400

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(t)
    }
    if (deleting && text === '') {
      setDeleting(false)
      setRoleIndex((i) => (i + 1) % ROLES.length)
      return
    }
    const t = setTimeout(() => {
      setText((prev) =>
        deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
      )
    }, speed)
    return () => clearTimeout(t)
  }, [text, deleting, roleIndex])

  return (
    <section id="top" className="hero">
      <div className="container">
        <div>
          <p className="eyebrow">Portfolio / Katwa, West Bengal</p>
          <h1 className="hero-name">
            Anirban <span>Bairagya</span>
          </h1>
          <div className="hero-role" aria-live="polite">
            {text}
            <span className="caret" />
          </div>
          <p className="hero-pitch">
            Computer Science &amp; Engineering student building at the intersection of
            machine learning and backend systems &mdash; from segmenting anomalies in
            brain MRI scans to shipping full-stack applications with MySQL.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">View projects</a>
            <a href="#contact" className="btn btn-ghost">Contact me</a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="num">84.7%</div>
              <div className="label">Diploma, CST</div>
            </div>
            <div className="hero-stat">
              <div className="num">24&ndash;28</div>
              <div className="label">BTech CSE, in progress</div>
            </div>
            <div className="hero-stat">
              <div className="num">SIH</div>
              <div className="label">Hackathon participant</div>
            </div>
          </div>
        </div>
        <ScanVisual />
      </div>
    </section>
  )
}
