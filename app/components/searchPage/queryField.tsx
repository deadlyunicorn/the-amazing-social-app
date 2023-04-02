'use client'
import {app} from "@/app/components/appObject"
import {createContext, useContext, useEffect, useState } from "react"
import WhiteBox from "@/app/components/whiteBox"

import MetaForm from "@/app/components/searchPage/metadataForm"
import MovieTitles from "@/app/components/searchPage/movieTitles"






interface searchInterface{
  collection:any;
  titleInput:string;
  setTitleInput:(title:string)=>void;
  queryInput:string;
  setQueryInput:(query:string)=>void;
  dbGet:any;
  setDbGet:(dbg:any)=>void;


};

export const searchContext = createContext<searchInterface>({
  collection:null,
  titleInput:"",
  setTitleInput:(title:string)=>{},
  queryInput:"",
  setQueryInput:(query:string)=>{},
  dbGet:null,
  setDbGet:(dbg:any)=>{}

})




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
  
  const value = {collection,titleInput,setTitleInput,queryInput,setQueryInput,dbGet,setDbGet};
 

  return(
    <WhiteBox>

      <h1>Search something</h1>

      <searchContext.Provider value={value}>

        <MovieTitles/>

        <MetaForm/>
      </searchContext.Provider>

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

    </WhiteBox>
  )
}







export default QueryField;

