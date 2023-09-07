import Header from '@/app/components/Header/Header'
import NavigationBar from '@/app/components/Navigation/Navigation'
import '@/app/components/Styles/globals.css'
import "@/app/components/Styles/styles.css"
import UserContext from '@/app/components/ContextComponent/contextComp'

export const metadata = {
  title: 'Social App',
  description: 'The new social app! A personal project being built by Alexander Petrache, also known as "deadlyunicorn".',
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
        <UserContext>

          <Header/>
        
          <main className="flex justify-center mt-28 min-h-screen w-screen">
            <div className=" py-5 pb-32">
              {children}
            </div>
          </main>
      
          <NavigationBar/>  
        </UserContext>
      </body>
    </html>
  )
}


