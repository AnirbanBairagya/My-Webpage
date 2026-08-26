export default function Nav() {
  return (
    <header className="nav">
      <div className="container">
        <a href="#top" className="nav-brand">
          <span className="dot" />
          anirban.dev
        </a>
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#blogs">Blogs</a>
          <a href="#experience">Experience</a>
          <a href="#education">Education</a>
        </nav>
        <a href="#contact" className="nav-cta">Get in touch</a>
      </div>
    </header>
  )
}
