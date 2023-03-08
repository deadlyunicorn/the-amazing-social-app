import * as Realm from "realm-web"


import UserInterface from "./clientC";


const RealmPage = async() => {

  const app = new Realm.App({id: 'social_app_mongodb-cyawc'});
  const user: Realm.User = await app.logIn(Realm.Credentials.anonymous());


  return(
    <>

      <div className="bg-white text-center">

        hello world!
        <br/>
        UserID: 
        {user.id}
        {/* <UserInterface user={user}/> */}
      </div>

      <div>
        <UserInterface 
        id={user.id} 
        // currentUser={app.currentUser}//
        //Error: Maximum call stack size exceeded
        
        
        //Possible fix: dont pass the entire app down, but only the properties you need.
        />
      </div>
    
    </>
  );
};

export default RealmPage;


//////
