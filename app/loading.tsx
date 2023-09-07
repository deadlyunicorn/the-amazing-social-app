import "@/app/components/Styles/styles.css"
import WhiteBox from "@/app/components/whiteBox"
import { LoadingScreen } from "./components/Loading/LoadingAnimation"


export default function Loader(){
  return(
        <LoadingScreen height={200}/>
  )
}