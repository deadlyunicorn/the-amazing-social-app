//
import "@/app/components/Styles/styles.css"

//Realm
import UserDetails from "@/app/components/userDetails"
import LoginOptions from "@/app/components/Login_Logout_Register/anonymous/loginButton"
import WhiteBox from "@/app/components/whiteBox"
import { SignUpSection } from "./SignUpSectionComponent"



//


const LoginPage = () => {

 
  return (
    <>

      <WhiteBox>

        <UserDetails/>
        <LoginOptions/>
        <SignUpSection/>
        
      </WhiteBox>

        
        

    </>
  )
}



export default LoginPage;







