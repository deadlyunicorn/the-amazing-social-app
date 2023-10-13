import "@/app/styles/styles.css"
import { LoadingScreen } from "@/app/lib/components/Loading/LoadingAnimation"


export default function Loader(){
  return(
    <div className="
    bg-transparent
    top-[30%]
    flex justify-center
    fixed left-0 w-full">

     <LoadingScreen height={200}/>
  
    </div>

  )
}