import Home from '@/components/home.component'
import SectionDivider from '@/components/section-divider.component'
import About from '@/components/about.component'
import Projects from '@/components/projects.component'
import Skills from '@/components/skills.component'
import Experience from '@/components/experience.component'
import Contact from '@/components/contact.component'
import Footer from '@/components/footer.component'

export default function App() {
  return (
    <main className='flex flex-col items-center px-4'>
      <Home />
      <SectionDivider />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </main>
  )
}
