// 'use client'

// import * as Realm from "realm-web"
// import { useState } from "react";

// export default function UserInterface(
//   props:{
//     user:Realm.User,
//     app:Realm.App
//   }){

//   const [user,setUser]=useState<Realm.User | null>(props.app.currentUser);
    
  
//   return(
//       <>
  
//         <div className="bg-white text-center">
//         { 
//         user? 
//           <UserDetail user={user}/>: 
//           <Login setUser={setUser} user={props.user}/>
//         }
//         </div>

//         <div>
//           hello world
//         </div>
      
//       </>
//     );

// }





// // type userType = Realm.User<globalThis.Realm.DefaultFunctionsFactory, SimpleObject, globalThis.Realm.DefaultUserProfileData>;
// // type appType = Realm.App<globalThis.Realm.DefaultFunctionsFactory & globalThis.Realm.BaseFunctionsFactory, SimpleObject>;


// // const Login = ({setUser}: LoginProps,{user}:LoginProps) => {
  
// //   const loginAnonymous = async () => {
// //     setUser(user);
// //   };

// //   return (
// //     <button 
// //       className="px-2 py-1 rounded-lg bg-red-300 hover:bg-red-200"
// //       onClick={loginAnonymous}>
// //         Login
// //     </button>
// //   );
// // };

// // ///


// // const Logout = ({setUser}:LoginProps) => {

// //   const logout = async () => {
// //     setUser(null);
// //   };

// //   return(
// //     <button>
// //       Logout
// //     </button>
// //   )
// // }



// // /////

// // const UserDetail = ({user}:{user:Realm.User}) => {
// //   return(
// //       <div>
// //         hello {JSON.stringify(user.id)}

// //       </div>
// //   );
// // };

// // type LoginProps = {
// //   setUser:(user: Realm.User|null)=>void;
// //   user:Realm.User;
// // };