import { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'nextAuth',
  description: 'learning auth.js api',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
