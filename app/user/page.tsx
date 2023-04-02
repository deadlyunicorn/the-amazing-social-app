'use client'
import "@/app/components/Styles/styles.css"
import UserDetails from "@/app/components/userDetails";
import WhiteBox from "@/app/components/whiteBox";



const UserPage = () =>{


  return(
      <WhiteBox>
        <UserDetails/>
        <div className="flex justify-between">
        </div>
      </WhiteBox>
  )
}


export default UserPage;