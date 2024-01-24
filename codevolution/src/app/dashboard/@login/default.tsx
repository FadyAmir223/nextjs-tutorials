'use client'

import { useRouter } from 'next/navigation'
import { isLogin } from '../layout'
import { useEffect } from 'react'

const DefaultLogin = () => {
  const router = useRouter()

  useEffect(() => {
    if (!isLogin) router.push('/dashboard')
  }, [])

  return <></>
}

export default DefaultLogin
