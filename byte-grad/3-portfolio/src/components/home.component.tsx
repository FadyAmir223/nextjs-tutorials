'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { BsArrowRight, BsLinkedin } from 'react-icons/bs'
import { HiDownload } from 'react-icons/hi'
import { FaGithubSquare } from 'react-icons/fa'
import { useSectionInView } from '@/hooks/useSectionInView'
import { useDispatchActiveSectionContext } from '@/context/active-section.context'

export default function Home() {
  const ref = useSectionInView('Home', 0.8)
  const { setActiveSection, setTimeOfLastClick } =
    useDispatchActiveSectionContext()

  return (
    <section
      ref={ref}
      id='home'
      className='text-center mb-28 max-w-[50rem] sm:mb-0 scroll-mt-36'
    >
      <div className='flex justify-center items-center'>
        <div className='relative'>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'tween', duration: 0.2 }}
          >
            <Image
              src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=368&h=368&q=100'
              alt='Ricardo portrait'
              width={192}
              height={192}
              quality={90}
              priority
              className='w-24 h-24 object-cover border-[0.35rem] border-white rounded-full shadow-xl'
            />
          </motion.div>

          <motion.span
            className='absolute right-0 bottom-0 text-4xl'
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'spring',
              stiff: 125,
              delay: 0.1,
              duration: 0.7,
            }}
          >
            👋
          </motion.span>
        </div>
      </div>

      <motion.h1
        className='mb-10 mt-4 px-4 textl-2xl font-medium leading-[1.5] sm:text-4xl'
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className='font-bold'>Hello, I'm Ricardo.</span> I'm a{' '}
        <span className='font-bold'>full-stack developer</span> with{' '}
        <span className='font-bold'>8 years</span> of experience. I enjoy
        building <span className='italic'>sites & apps</span>. My focus is{' '}
        <span className='underline'>React (Next.js)</span>.
      </motion.h1>

      <motion.div
        className='flex flex-col sm:flex-row justify-center items-center gap-2 text-lg font-medium px-4'
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Link
          href='#contact'
          className='flex gap-x-2 bg-gray-900 text-white px-7 py-3 rounded-full items-center hover:bg-gray-950 outline-none focus:scale-110 hover:scale-110 active:scale-105 transition-transform group'
          onClick={() => {
            setActiveSection('Contact')
            setTimeOfLastClick(Date.now())
          }}
        >
          Contact me here{' '}
          <BsArrowRight className='opacity-70 group-hover:translate-x-1 transition-transform' />
        </Link>

        <a
          href='/CV.pdf'
          download
          className='flex gap-x-2 bg-white px-7 py-3 rounded-full items-center outline-none focus:scale-110 hover:scale-110 active:scale-105 transition-transform group'
        >
          Dwonload CV{' '}
          <HiDownload className='group-hover:translate-y-0.5 transition-transform' />
        </a>

        <a
          href='https://linkedin.com'
          target='_blank'
          className='bg-white text-gray-700 p-4 rounded-full outline-none focus:scale-[1.15] hover:scale-[1.15] active:scale-110 transition-transform borderBlack hover:text-gray-950'
        >
          <BsLinkedin />
        </a>

        <a
          href='https://github.com'
          target='_blank'
          className='bg-white text-gray-700 p-4 rounded-full text-[1.35rem] outline-none focus:scale-[1.15] hover:scale-[1.15] active:scale-110 transition-transform borderBlack hover:text-gray-950'
        >
          <FaGithubSquare />
        </a>
      </motion.div>
    </section>
  )
}
