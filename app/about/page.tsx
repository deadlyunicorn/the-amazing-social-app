import WhiteBox from "@/app/components/whiteBox"

import About from "@/app/about/about"
import UserDetails from "@/app/components/userDetails";


const Homepage = () => {

  return (
    <>
       <WhiteBox>
        <About/>
      </WhiteBox>



      <WhiteBox>
          <UserDetails/>
      </WhiteBox>


    </>
  )
}

export default Homepage;







