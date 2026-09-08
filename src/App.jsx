import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import SegmentationDemo from './components/SegmentationDemo.jsx'
import Blogs from './components/Blogs.jsx'
import { Experience, Education } from './components/ExperienceEducation.jsx'
import Interests from './components/Interests.jsx'
import Contact, { Footer } from './components/Contact.jsx'
import ChatWidget from './components/ChatWidget.jsx'
import AdminApp from './components/AdminApp.jsx'

export default function App() {
  // No router library — just a plain pathname check. /admin (and
  // anything under it) shows the admin panel instead of the portfolio.
  const isAdminRoute =
    typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')

  if (isAdminRoute) {
    return <AdminApp />
  }

  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <SegmentationDemo />
      <Blogs />
      <Experience />
      <Education />
      <Interests />
      <Contact />
      <Footer />
      <ChatWidget />
    </>
  )
}
