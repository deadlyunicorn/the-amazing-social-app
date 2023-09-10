import "@/app/(styles)/styles.css"
import { LoadingScreen } from "@/app/(components)/Loading/LoadingAnimation"


export default function Loader(){
  return(
    <section className="
    bg-transparent
    top-[30%]
    flex justify-center
    fixed left-0 w-full">

     <LoadingScreen height={200}/>
  
    </section>

  )
}