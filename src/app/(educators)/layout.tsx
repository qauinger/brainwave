import { Inter } from 'next/font/google'
import Header from './components/Header'
import '../../../public/css/index.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Brainwave',
  description: 'Targeted individualized activities designed by you.',
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
