export function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Experience</p>
          <h2>Where I've worked.</h2>
        </div>
        <div className="timeline">
          <div className="timeline-item">
            <div className="when">Dec 2022 &ndash; Jan 2023</div>
            <h3>Python Programming Intern</h3>
            <div className="org">Ardent Computech Pvt. Ltd.</div>
            <ul>
              <li>Developed custom scripts and data pipelines using core Python.</li>
              <li>Collaborated in a team environment following SDLC and version control practices.</li>
            </ul>
          </div>
        </div>
        <div className="timeline">
          <div className="timeline-item">
            <div className="when">Sep 2023 &ndash; Oct 2023</div>
            <h3>Web Development Using PHP and MYSQL</h3>
            <div className="org">Ardent Computech Pvt. Ltd.</div>
            <ul>
              <li>Gained hands-on experience in developing dynamic web applications using PHP and MySQL.</li>
              <li>Developed and implemented a functional Online Bus Ticket Booking System with a user-friendly interface.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Education() {
  return (
    <section id="education">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Education</p>
          <h2>How I got here.</h2>
        </div>
        <div className="timeline">
          <div className="timeline-item">
            <div className="when">Present</div>
            <h3>BTech in Computer Science &amp; Engineering</h3>
            <div className="org">Dr. B. C. Roy Engineering College, Durgapur</div>
          </div>
          <div className="timeline-item">
            <div className="when">Completed in 2024</div>
            <h3>Diploma in Computer Science &amp; Technology</h3>
            <div className="org">Dr. B. C. Roy Polytechnic, Durgapur</div>
          </div>
          <div className="timeline-item">
            <div className="when">Completed in 2019</div>
            <h3>Secondary Education</h3>
            <div className="org">WBBSE</div>
          </div>
        </div>
      </div>
    </section>
  )
}
