import './globals.css'
import ContextProvider from '@/components/ContextProvider'

export const metadata = {
  title: 'Word Cloud Generator built with GPT',
  description: 'Word Cloud Generator built with GPT',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          {children}
        </ContextProvider>
      </body>
    </html>
  )
}
