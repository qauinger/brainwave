import { Inter } from 'next/font/google'
import { UnlinkedHeader as Header } from '@component/Header'
import '@css/theme.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Brainwave',
  description: 'Targeted individualized activities.'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body id="wrapper" className={inter.className} style={{width: '80%', margin: '0 auto'}}>
        <Header/>
        {children}
      </body>
    </html>
  )
}
