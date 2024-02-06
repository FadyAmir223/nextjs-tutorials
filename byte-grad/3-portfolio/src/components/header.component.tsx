'use client'

import { motion } from 'framer-motion'
import { links } from '@/lib/data'
import Link from 'next/link'
import { cn } from '@/utils/cn.util'
import {
  useDispatchActiveSectionContext,
  useValueActiveSectionContext,
} from '@/context/active-section.context'

export default function Header() {
  const { activeSection } = useValueActiveSectionContext()
  const { setActiveSection, setTimeOfLastClick } =
    useDispatchActiveSectionContext()

  return (
    <header className='z-[999] relative mb-28 sm:mb-36'>
      <motion.div
        className='fixed top-0 left-1/2 h-[4.5rem] w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-full dark:bg-gray-950 dark:bg-opacity-75 dark:border-black/40'
        initial={{ y: -100, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
      />

      <nav className='flex fixed top-[0.15rem] left-1/2 h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0'>
        <ul className='flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 sm:w-[initial] sm:flex-nowrap sm:gap-5'>
          {links.map((link) => (
            <motion.li
              key={link.name}
              className='h-3/4 flex items-center justify-center relative'
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Link
                href={link.hash}
                className={cn(
                  'flex w-full items-center justify-center px-3 py-3 hover:text-gray-950 transition',
                  { 'text-gray-950': activeSection === link.name },
                )}
                onClick={() => {
                  setActiveSection(link.name)
                  setTimeOfLastClick(Date.now())
                }}
              >
                {link.name}

                {activeSection === link.name && (
                  <motion.span
                    className='absolute inset-0 bg-gray-100 rounded-full -z-10'
                    layoutId='activeSection'
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
