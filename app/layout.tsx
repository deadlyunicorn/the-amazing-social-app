import Header from './components/Header'
import NavigationBar from './components/Navigation'
import './globals.css'

export const metadata = {
  title: 'Social App',
  description: 'The new social app!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-gradient-to-b from-zinc-700  to-zinc-900 h-screen overflow-auto'>
        <Header/>
        {children}
        <NavigationBar/>  
      </body>
    </html>
  )
}
