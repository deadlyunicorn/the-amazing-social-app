
import FetchButton from "./fetchButton"


///
import {  MongoClient } from 'mongodb';
const uri = "mongodb+srv://deadlyunicorn:QSNRXAKMIHyzMxmW@testingcluster01.spy4wzn.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri);




///

export default async function MongoElement() {

  await fetchData();
  //fixes "Cannot get properties of undefined" -> refresh page

  //Now we get error:



  const data = FetchedElement();
  return (
    <>
          <FetchButton passDown={data}/>
            {/*How do I dynamically change the subquery value?? DID IT kinda? I passed all the data and dynamically rendered based on the user queries. */}

    </>
  )
}






//Can be put inside another file with the MongoClient and import them but I am not goot at naming multiple file names 
const fetched: any=[];
const fetchData = async () => {  
  try{
    await client.connect()
    .then(()=>{console.log("Connected");})

    await client.db("deadly_testing").collection("movies").findOne({title:"Titanic"})
    .then(value=>{fetched.push(value)})
  }
  catch(error){
    console.log(error);
  }
  finally{
    client.close();
  }
}

const FetchedElement = () => {
  return(fetched)
}
