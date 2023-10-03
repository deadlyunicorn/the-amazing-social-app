import Header from './(components)/Header/Header'
import NavigationBar from './(components)/Navigation/Navigation'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Social App v2',
  description: 'Social App project by deadlyunicorn!',
}

export const dynamic = 'force-dynamic'

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
      m-0 p-0 relative
      bg-gradient-to-b from-zinc-700 to-zinc-900 
      flex flex-col overflow-x-hidden
      items-center
      dark:text-black text-black
      '>

          <Header/>
        
          <main className="
            xs:max-w-[440px]
            sm:max-w-lg
            md:max-w-2xl  
            xl:max-w-4xl
            flex justify-center 
            mt-28 min-h-screen w-full
            sm:px-12
            pt-5 pb-32">
              {children}
          </main>
      
          <NavigationBar/>  
      </body>
    </html>
  )
}
