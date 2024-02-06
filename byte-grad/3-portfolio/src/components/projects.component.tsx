'use client'

import { Fragment } from 'react'
import SectionHeading from './section-heading.component'
import Project from './project.component'
import { projectsData } from '@/lib/data'
import { useSectionInView } from '@/hooks/useSectionInView'

export default function Projects() {
  const ref = useSectionInView('Projects', 0.5)

  return (
    <section ref={ref} id='projects' className='mb-28 scroll-mt-28'>
      <SectionHeading>My Projects</SectionHeading>

      <div>
        {projectsData.map((project, index) => (
          <Fragment key={index}>
            <Project {...project} />
          </Fragment>
        ))}
      </div>
    </section>
  )
}
