///
import {  MongoClient } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';





export default async function GET(request: Request) {  

  const uri = "mongodb+srv://deadlyunicorn:QSNRXAKMIHyzMxmW@testingcluster01.spy4wzn.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  

  const fetched: string[]=[];
  
  const query = request;

  try{

    await client.connect();

    await client.db("deadly_testing")
    .collection("movies")
    .findOne({title:"Titanic"})

    .then(value=>{fetched.push(JSON.stringify(value))});
    
    
  }
  catch(error){
    console.log(error);
  }
  finally{
    client.close();
    return NextResponse.json(fetched);
  }
}
