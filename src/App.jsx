import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Blogs from './components/Blogs.jsx'
import { Experience, Education } from './components/ExperienceEducation.jsx'
import Interests from './components/Interests.jsx'
import Contact, { Footer } from './components/Contact.jsx'

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Blogs />
      <Experience />
      <Education />
      <Interests />
      <Contact />
      <Footer />
    </>
  )
}
