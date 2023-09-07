import WhiteBox from "@/app/components/whiteBox"

import About from "@/app/about/about"
import UserDetails from "@/app/components/userDetails";
import { LoadingScreen } from "../components/Loading/LoadingAnimation";


const Homepage = () => {

  return (
    <>
      <main>

        <WhiteBox>
          <About/>
        </WhiteBox>

      </main>


      <aside>

        <WhiteBox>
            <UserDetails/>
        </WhiteBox>
      </aside>


    </>
  )
}

export default Homepage;







