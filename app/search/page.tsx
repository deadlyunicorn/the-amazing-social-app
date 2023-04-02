'use client'


//
import { useContext} from "react"
import "@/app/components/Styles/styles.css"

//Realm
import UserDetails from "@/app/components/userDetails"

import QueryField from "@/app/components/searchPage/queryField"
import WhiteBox from "@/app/components/whiteBox"
import { appContext } from "@/app/components/ContextComponent/contextComp"



//


const Search= () => {


  const {user}=useContext(appContext)


  
  return (
    <>
        { user ? 
        <QueryField/> :
        
        <WhiteBox>
          <UserDetails/>
        </WhiteBox>
        }
    </>
  )
}

export default Search;







