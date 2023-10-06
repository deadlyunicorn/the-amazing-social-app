import { MongoClient } from "mongodb";

export const mongoClient = new MongoClient(process.env.MONGODB_URI!,{
  maxPoolSize: 10,
});

// (async()=>{

//   while ( true ) {
//     const timer = async()=>{
//       return new Promise( res=> {
//         setTimeout( ()=> {
//           mongoClient.close();
//           return res("Finished");
//         },10000)
//       }) 
      
//     } 
    
//     await timer();
//   } 


// })()

