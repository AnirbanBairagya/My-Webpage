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
            <a href="mailto:sonalibairagya139@gmail.com" className="btn btn-primary">
              Email me
            </a>
            <a href="tel:+918158872912" className="btn btn-ghost">
              +91 81588 72912
            </a>
          </div>
          <div className="social-row">
            <a href="#">GitHub</a>
            <a href="#">LinkedIn</a>
            <a href="#">LeetCode</a>
            <a href="#">GeeksforGeeks</a>
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
