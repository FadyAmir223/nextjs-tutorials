'use client'

import { useEffect, useState } from 'react'
import { BsMoon, BsSun } from 'react-icons/bs'

type Theme = 'light' | 'dark'

export default function ThemeSwitch() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const theme = window.localStorage.getItem('theme') as Theme | null

    if (!theme) {
      const isDark = matchMedia('(prefers-color-scheme: dark)').matches

      if (isDark) document.documentElement.classList.add('dark')
      setTheme(isDark ? 'light' : 'dark')
    } else {
      if (theme === 'dark') document.documentElement.classList.add('dark')
      setTheme(theme)
    }
  }, [])

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === 'light') {
        localStorage.setItem('theme', 'dark')
        document.documentElement.classList.add('dark')
        return 'dark'
      } else {
        localStorage.setItem('theme', 'light')
        document.documentElement.classList.remove('dark')
        return 'light'
      }
    })
  }

  return (
    <button
      className='fixed bottom-5 right-5 bg-white bg-opacity-80 border border-white border-opacity-40 rounded-full w-12 h-12 shadow-2xl backdrop-blur-[0.5rem] grid place-items-center dark:bg-gray-950'
      onClick={toggleTheme}
    >
      {theme === 'light' ? <BsSun /> : <BsMoon />}
    </button>
  )
}
