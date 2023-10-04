
import { SiteLogo } from "./SiteLogo"
import { UserOptions } from "./UserOptions";


const Header = () => (
  <header
    className="fixed w-full z-10">
    <SiteLogo />
    <UserOptions />
  </header>
)



export default Header;