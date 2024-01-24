'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const nav = [
  { name: 'login', url: '/login' },
  { name: 'register', url: '/register' },
  { name: 'forgot-password', url: '/forgot-password' },
]

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname()
  const router = useRouter()
  const [state, setState] = useState('')

  return (
    <div>
      <nav className=''>
        {nav.map((i) => {
          const isActive = pathName.startsWith(i.url)
          return (
            <Link
              key={i.name}
              href={i.url}
              className={isActive ? 'font-bold text-red-400' : ''}
            >
              {i.name}
            </Link>
          )
        })}
      </nav>

      <button onClick={() => router.push('/')}>go home</button>

      <div className=''>
        <input
          type='text'
          placeholder='layout'
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </div>

      {children}
    </div>
  )
}

export default AuthLayout
