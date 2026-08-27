export default function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <div className="contact-box">
          <p className="eyebrow" style={{ justifyContent: 'center' }}>Get in touch</p>
          <h2>Let's build something.</h2>
          <p>
            Open to Associate Software Engineer and Machine Learning roles.
            Reach out directly &mdash; I reply fast.
          </p>
          <div className="contact-actions">
            <a href="mailto: sonalibairagya139@gmail.com" className="btn btn-primary">
              Email me
            </a>
          </div>
          <div className="social-row">
            <a href="https://github.com/AnirbanBairagya" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/anirban-bairagya-9b90842ba/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://leetcode.com/u/Anirban139/" target="_blank" rel="noopener noreferrer">LeetCode</a>
            <a href="https://www.geeksforgeeks.org/profile/anirbanbairagya" target="_blank" rel="noopener noreferrer">GeeksforGeeks</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer>
      <div className="container">
        &copy; {new Date().getFullYear()} Anirban Bairagya. Built with React &amp; deployed on Vercel.
      </div>
    </footer>
  )
}
