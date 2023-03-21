
import FetchButton from "./fetchButton"


///
import {  MongoClient } from 'mongodb';
const uri = "mongodb+srv://deadlyunicorn:QSNRXAKMIHyzMxmW@testingcluster01.spy4wzn.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri);




///

export default async function MongoElement() {

  await fetchData();

  return (
    <>
          {/* If we pass 'fetched directly it seems to work okay?*/}
          <FetchButton passDown={fetched}/>
            {/*How do I dynamically change the subquery value?? DID IT kinda? I passed all the data and dynamically rendered based on the user queries. */}

    </>
  )
}






//Can be put inside another file with the MongoClient and import them but I am not goot at naming multiple file names 
const fetched: string[]=[];
const fetchData = async () => {  
  try{
    await client.connect()
    .then(()=>{console.log("Connected");})

    await client.db("deadly_testing").collection("movies").findOne({title:"Titanic"})
    .then(value=>{fetched.push(JSON.stringify(value))})
  }
  catch(error){
    console.log(error);
  }
  finally{
    client.close();
  }
}

