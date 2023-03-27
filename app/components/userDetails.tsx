import Link from "next/link"

const UserDetails = (
  {user}:{user:Realm.User|null}
) => {

  if(user){

    return(
      <>
      <div className="text-3xl">
        Logged in with <span className="text-lg">{user.id}</span>
      </div>
    </>
    )
  }
  else{
    return(
      <>
        <div className="text-3xl">
          Not logged in. 
          <br/>
          <br/>
            <p className="text-lg text-center">
              Consider&nbsp;          
            <Link
              className="hover:text-blue-400 text-blue-600"
              href="/">
              Logging in
            </Link>
            .
            </p>
        </div>
      </>
    )
  }
}

export default UserDetails