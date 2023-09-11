import "@/app/components/Styles/styles.css"
import WhiteBox from "@/app/components/whiteBox"
import { LoadingScreen } from "./components/Loading/LoadingAnimation"


export default function Loader(){
  return(
    <main className="
    top-[30%]
    flex justify-center
    fixed left-0 w-full">

     <LoadingScreen height={200}/>
  
    </main>

  )
}