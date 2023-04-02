import "@/app/components/Styles/styles.css"
import WhiteBox from "@/app/components/whiteBox"


export default function Loader(){
  return(
        <WhiteBox>
            <div className="text-center flex flex-col justify-center">Loading...</div>
        </WhiteBox>
  )
}