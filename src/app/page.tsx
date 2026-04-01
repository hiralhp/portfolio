import { projects, getAllTags } from '@/data/projects'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import ProjectGrid from '@/components/ProjectGrid'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  const allTags = getAllTags()

  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <ProjectGrid projects={projects} allTags={allTags} />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
