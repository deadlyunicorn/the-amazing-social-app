import { getUserDetails } from "@/app/api/mongodb/user";
import Link from "next/link"

const NavigationBar = async() => {

  const user = await getUserDetails();

  return(

  <nav className="w-full h-16 fixed bottom-0
  backdrop-blur-md flex justify-center
  border-t border-zinc-400 rounded-t-md bg-black bg-opacity-40">


    <div className="
      max-w-xl w-full
      flex justify-evenly items-center h-full">
      <NavItem icon="🏠" link="/"/>
      <NavItem icon="🌊" link="/explore"/>      
      <NavItem icon="💬" link="/chat"/>      
      <NavItem icon="😶‍🌫️" link={`/user/${user?user.username:""}`}/>     
    </div> 
  </nav>
  )
}


const NavItem = (
  props:{
    icon:string,
    link:string
  }
  ) => (
  <Link
  href={props.link}
  tabIndex={0}
  className="text-4xl h-12
  flex items-center justify-center
  border-l-2 border-zinc-400 hover:border-zinc-200 bg-neutral-900 hover:bg-neutral-800 rounded-lg p-2">
    {props.icon}
  </Link>
)

export default NavigationBar