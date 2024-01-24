import { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
  users: ReactNode
  notifications: ReactNode
  login: ReactNode
}

export const isLogin = false

const Layout = ({ children, users, notifications, login }: LayoutProps) => {
  return isLogin ? (
    <>
      {users}
      {notifications}
      {children}
    </>
  ) : (
    login
  )
}

export default Layout
