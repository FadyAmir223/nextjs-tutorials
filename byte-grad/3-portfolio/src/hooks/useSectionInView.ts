import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import {
  useValueActiveSectionContext,
  useDispatchActiveSectionContext,
} from '@/context/active-section.context'
import type { ActiveSection } from '@/lib/types'

export function useSectionInView(sectionName: ActiveSection, threshold = 0.75) {
  const { timeOfLastClick } = useValueActiveSectionContext()
  const { setActiveSection } = useDispatchActiveSectionContext()
  const { ref, inView } = useInView({ threshold })

  useEffect(() => {
    if (inView && Date.now() - timeOfLastClick > 1000)
      setActiveSection(sectionName)
  }, [inView, timeOfLastClick])

  return ref
}
