const GROUPS = [
  {
    title: 'Languages',
    items: ['Python', 'Java'],
  },
  {
    title: 'Databases',
    items: ['MySQL'],
  },
  {
    title: 'Machine Learning',
    items: ['Machine Learning', 'Data Preprocessing'],
  },
  {
    title: 'Tools & Practices',
    items: ['Git', 'GitHub', 'SDLC'],
  },
]

export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Skills</p>
          <h2>What I build with.</h2>
        </div>
        <div className="skills-grid">
          {GROUPS.map((g) => (
            <div className="skill-card" key={g.title}>
              <h3>{g.title}</h3>
              <div className="tag-row">
                {g.items.map((item) => (
                  <span className="tag" key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
