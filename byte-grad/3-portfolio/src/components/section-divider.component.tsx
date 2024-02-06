'use client'

import { motion } from 'framer-motion'

export default function SectionDivider() {
  return (
    <motion.div
      className='bg-gray-200 my-24 w-1 h-16 hidden rounded-full sm:block'
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.125 }}
    />
  )
}
