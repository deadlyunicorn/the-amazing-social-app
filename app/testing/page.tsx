import { cookies } from "next/headers";

const Testing = () => {

  return ( 
    <form 
      action={logout}>
      <button> click me</button>
    </form>
  )
}

const logout = async() => {
  "use server"
  cookies().set('next-auth.csrf-token',"",{
    httpOnly:true,
    secure:true,
    maxAge: 0
  }); 
  cookies().set('next-auth.session-token',"",{
    httpOnly:true,
    secure:true,
    maxAge: 0
  }); 
}

export default Testing;