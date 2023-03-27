import * as Realm from "realm-web"

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
          Not logged in. <span className="text-lg">Consider&nbsp;logging&nbsp;in</span>
        </div>
      </>
    )
  }
}

export default UserDetails