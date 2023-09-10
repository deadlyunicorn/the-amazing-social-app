import Header from './(components)/Header/Header'
import NavigationBar from './(components)/Navigation/Navigation'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Social App',
  description: 'Social App project by deadlyunicorn!',
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

      <body className='
      m-0 p-0
      bg-gradient-to-b from-zinc-700 to-zinc-900 
      flex flex-col overflow-x-hidden
      dark:text-black text-black
      '>

          <Header/>
        
          <main className="flex justify-center mt-28 min-h-screen w-screen">
            <div className=" py-5 pb-32">
              {children}
            </div>
          </main>
      
          <NavigationBar/>  
      </body>
    </html>
  )
}
