'use client'

import { motion } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'
import { useSectionInView } from '@/hooks/useSectionInView'
import SectionHeading from './section-heading.component'
import { sendEmail } from '@/actions/sendEmail'
import SubmitButton from './submit-button.component'

export default function Contact() {
  const ref = useSectionInView('Contact')

  const handleAction = async (formData: FormData) => {
    const { error } = await sendEmail(formData)

    if (error) {
      toast.error(error)
      return
    }

    toast.success('Email sent successfully!')
  }

  return (
    <motion.section
      ref={ref}
      id='contact'
      className='scroll-mt-28 mb-20 sm:mb-28'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <SectionHeading>Contact me</SectionHeading>

      <p className='text-gray-700 text-center -mt-6'>
        Please contact me directly at{' '}
        <a href='mailto:example@gmail.com' className=''>
          example@gmail.com
        </a>{' '}
        or through this form
      </p>

      <form className='mt-10 flex flex-col' action={handleAction}>
        <input
          className='h-14 rounded-lg borderBlack px-4'
          type='email'
          name='email'
          placeholder='your email'
          maxLength={500}
          required
        />
        <textarea
          className='h-52 my-3 p-4 rounded-lg borderBlack'
          name='message'
          placeholder='your message'
          maxLength={5000}
          required
        ></textarea>
        <SubmitButton />
      </form>
      <Toaster />
    </motion.section>
  )
}
