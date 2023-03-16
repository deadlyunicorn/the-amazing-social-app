import {  MongoClient } from 'mongodb';


const uri = "mongodb+srv://deadlyunicorn:QSNRXAKMIHyzMxmW@testingcluster01.spy4wzn.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri);


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

fetchData();

const FetchedElement = () => {
  return(fetched)
}

export default FetchedElement;