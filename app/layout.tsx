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
      <head>
        <link rel="icon" href="/favicon.svg"/>

      </head>
      <body className='bg-gradient-to-b from-zinc-700  to-zinc-900 h-screen overflow-auto'>
        <Header/>
      
        <main className="flex justify-center mt-28">
          <div className="border max-w-xs py-5">
            {children}
          </div>
        </main>
      
        <NavigationBar/>  
      </body>
    </html>
  )
}


