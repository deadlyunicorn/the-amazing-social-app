'use client'
import {app} from "./appObject"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"



const QueryField = () =>{

  const mongo = app.currentUser!.mongoClient("mongodb-atlas");
  const collection = mongo.db("sample_mflix").collection("movies");

  //We put them here so that we don't get 
  //"cannot read properties of undefined error"


  //Fun fact-> despite the above comment I put them
  //outside so as to use to other components
  //and was getting the said error
  //as I didn't read the comment xP

  const [titleInput,setTitleInput]=useState("");
  const [queryInput,setQueryInput]=useState("");

  const [dbGet,setDbGet]=useState(null);

  const getData = async()=>{
    await collection.aggregate([{$match:{title:titleInput}}])
    .then(data=>{setDbGet(data[0])});
  }

  return(
    <motion.div 
      animate={{
        opacity:[0,1],
        x:[-20,0],
        transition:{duration:2}
      }}
      className="bg-white p-4 rounded-lg w-96 min-h-96 mt-10">
        
        <div className="text-3xl ">
          Search something
        </div>

{/* ///// */}
{/*  */}

            <MovieTitles collection={collection} setTitleInput={setTitleInput}/>




        <div className="my-6">
          <form 
            className="flex justify-around mb-1"
            onSubmit={(event)=>{
              event.preventDefault();
              getData();
            }}
            >

            <input 
              placeholder="Search metadata" 
              onChange={(event)=>{setQueryInput(event.target.value.toLowerCase());}}
              className="bg-slate-50 px-2 py-1 rounded-md"/>
            
            <button 
              className="border bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md">
                Search
            </button>
          </form>
          <p className="text-xs">Try typing &quot;genres&quot;,&quot;languages&quot; or leave empty.</p>

        </div>

        <div>
          {/* {input} <br/> */}
          {(dbGet!=null && (dbGet[queryInput]!=null || queryInput==""))&&
          <>
           <div className="break-words text-center">
              { 
                (queryInput!="")?
                [dbGet[queryInput]].toString().replaceAll(",",", "):
                JSON.stringify(dbGet)
              }
            </div>

            <div className="my-6 text-center">
              <button 
                onClick={()=>{setDbGet(null)}}
                className="border bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md">
                Reset
              </button>
            </div>
          </>
            
          }
        </div>

    
    </motion.div>
  )
}

const MovieTitles = (
  {collection,setTitleInput}:{collection:Realm.Services.MongoDB.MongoDBCollection<any>,setTitleInput:(title:string)=>void}

  ) =>{

  const [fetchedTitles,setFetchedTitles]=useState<null|[]>(null)
  const [itemsToFetch,setItemsToFetch]=useState(30);

  const [dbEntries,setDbEntries]=useState(0);

  useEffect(()=>{
    const getEntries=async()=>{
      await collection
      .aggregate([{$project:{title:1,_id:0}},{$count:'title'}])
      .then(data=>setDbEntries(data[0]['title']));
    }
    getEntries();
  },[collection]);


  useEffect(()=>{
    const fetchTitles = async () =>{
      await collection
      .aggregate([{$project:{title:1,_id:0}},{$sort:{title:1}},{$limit:itemsToFetch}])
      .then(data=>setFetchedTitles(data));
    }
    
      const interval = setInterval(()=>{
          if(itemsToFetch<dbEntries)setItemsToFetch(itemsToFetch+100); //kinda works? //better for less movies..
        },10000)
      
      fetchTitles();
      return()=>{clearInterval(interval)};
      
  },[collection,itemsToFetch,dbEntries])



  if(fetchedTitles){

  return(
    <div className="my-6">

      <motion.select
        animate={{opacity:[0,1]}}
        transition={{duration:1}}
        className=" bg-slate-50 px-2 py-1 rounded-md w-3/4 text-center"
        
        onChange={
          (event)=>{
            setTitleInput(event.target.value);

            ///below shouldn't be here on 'On Change'... Maybe if 'onScroll worked'..
            // const bottom=event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
            // if(bottom){
            //   setItemsToFetch(itemsToFetch+15)
            // }
          }
          
        }
        id="movie-menu">
        {
        fetchedTitles.map((element,index)=>(
          <option 
            key={index} 
            value={element["title"]}>
              {(element["title"])}
            </option>))
        }
      </motion.select>

      <br/>

      <label htmlFor="movie-menu" className="text-xs">
        Select a movie from the list  
        <motion.span
          animate={{opacity:[0,1]}}
          transition={{duration:1}}>
          &nbsp;{itemsToFetch}/{dbEntries}
        </motion.span>
      </label>
    
    </div>

  )
  }
else{
  return(
    <div className="my-6">

    <div
      className="bg-slate-50 px-2 py-1 rounded-md w-3/4 text-center">
    
    </div>

    <br/>

    <label htmlFor="movie-menu" className="text-xs">
      Select a movie from the list
    </label>
  
  </div>
  )
}

}




export default QueryField;

