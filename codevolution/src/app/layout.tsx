import { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'my-site',
    template: '%s | my-site',
  },
  description: 'a description',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <header>header</header>
        {children}
        <footer>footer</footer>
      </body>
    </html>
  )
}
