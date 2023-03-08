// 'use client'

// import * as Realm from "realm-web"
// type AppType = Realm.App<globalThis.Realm.DefaultFunctionsFactory & globalThis.Realm.BaseFunctionsFactory, SimpleObject>;




// const UserDetail = ({user}:{user:Realm.User}) => {



//   return(
//     <>
//       <div>
//         hello 
//       </div>
//     </>
//   );
// };

// type LoginProps = {
//   setUser:(user: Realm.User)=>void;
//   app:AppType;
// };

// const Login = ({setUser}: LoginProps,{app}: LoginProps) => {
  
//   const loginAnonymous = async () => {
//     const user: Realm.User = 
//       await app.logIn(Realm.Credentials.anonymous());
    
//     setUser(user);
//   };

//   return (
//     <button 
//       onClick={()=>{loginAnonymous}}>
//         Login
//     </button>
//   );
// };
