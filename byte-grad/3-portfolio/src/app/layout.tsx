import { Inter } from 'next/font/google'
import { cn } from '@/utils/cn.util'
import Header from '@/components/header.component'
import ActiveSectionContextProvider from '@/context/active-section.context'
import './globals.css'
import ThemeSwitch from '@/components/theme-switch.component'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='sm:text-[13px] !scroll-smooth'>
      <body
        className={cn(
          inter.className,
          'bg-gray-50 text-gray-950 relative dark:bg-gray-900 dark:text-white dark:text-opacity-90',
        )}
      >
        <div className='absolute bg-[#fbe2e3] top-[-6rem] right-[11rem] -z-10 w-[31.25rem] pb-[100%] rounded-full blur-[10rem] ms:w-[68.75rem] dark:bg-[#946263]' />

        <div className='absolute bg-[#dbd7fb] top-[-1rem] left-[-35rem] -z-10 w-[50rem] h-[31.25rem] rounded-full blur-[10rem] ms:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]' />

        <ActiveSectionContextProvider>
          <Header />
          {children}
        </ActiveSectionContextProvider>

        <ThemeSwitch />
      </body>
    </html>
  )
}
