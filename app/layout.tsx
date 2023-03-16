import Header from '@/app/components/Header/Header'
import NavigationBar from '@/app/components/Navigation/Navigation'
import '@/app/components/Styles/globals.css'

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
          <div className="max-w-xs py-5 pb-32">
            {children}
          </div>
        </main>
      
        <NavigationBar/>  
      </body>
    </html>
  )
}


