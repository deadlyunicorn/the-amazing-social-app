import { useContext, useEffect, useState } from "react";
import { searchContext } from "@/app/components/searchPage/queryField";
import * as Realm from "realm-web"

type titlesObjectArray= Array<{title:string}>;
type count=[{title:number}]


const MovieTitles = () =>{
    
  const {collection,setTitleInput}=useContext(searchContext)
  const [fetchedTitles,setFetchedTitles]=useState<null|titlesObjectArray>(null)

  // movie count
  const [movieCount,setMovieCount]=useState(0);
  
  /*
  const [itemsToSkip,setItemsToSkip]=useState(2000);
  const [initialFetch,setInitialFetch]=useState(true);
  const [triggerFetch,toggleTriggerFetch]=useState(false);
  */ 
 

  // Get movie count
  useEffect(()=>{
    const getEntries=async()=>{
      await collection
      .aggregate([{$project:{title:1,_id:0}},{$count:'title'}])
      .then((data:count)=>{setMovieCount(data[0]['title'])});
    }
    getEntries();
  },[collection]);


  useEffect(()=>{
    const fetchTitles = async () =>{
      await collection
      .aggregate([
        {$project:{title:1,_id:0}},
        {$sort:{title:1}},
        //Before using skip I simply was increasing the limit by 100
        //this is more optimized.. both for the user and the db..
        // {$skip:(itemsToSkip-2000)}, 
        {$limit:2000}
      ])

      .then((data:titlesObjectArray)=>{
        if(fetchedTitles&&data){
          setFetchedTitles([...fetchedTitles,...data]);
          // needs to be fixed with the skip
        }
        else if(data){
          setFetchedTitles(data);
        }

      });
    };
    fetchTitles();


      //kinda works? //better for less movies..
      // const interval = setInterval(()=>{
        
      //   if(initialFetch){ //initial function call
      //     fetchTitles();
      //     setInitialFetch(false);
      //     toggleTriggerFetch(!triggerFetch);
      //   }
      //   else if(fetchedTitles&&dbEntries-itemsToSkip>0){

      //     if(itemsToSkip<=dbEntries-2000){
      //       setItemsToSkip(itemsToSkip+2000);
      //       fetchTitles();

      //     }
      //     else if(itemsToSkip<=dbEntries){
      //       setItemsToSkip(itemsToSkip+(dbEntries-itemsToSkip));
      //       fetchTitles();
      //     }
          
      //     console.log(dbEntries-itemsToSkip)
      //     toggleTriggerFetch(!triggerFetch);
      //   }
      // },1000)
      
      // return()=>{clearInterval(interval)};
      
  },[movieCount])



  return(

    <div className="my-6">

      <datalist
        className=" bg-slate-50 px-2 py-1 rounded-md w-3/4 text-center h-9"
        
        onChange={
          (event)=>{
            setTitleInput(event.target.value);

            ///below shouldn't be here on 'On Change'... Maybe if 'onScroll worked'..
            // const bottom=event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
            // if(bottom){
            //   setItemsToSkip(itemsToSkip+15)
            // }
          }
          
        }
        id="movie-menu">
        
          <option disabled selected>Please select an option.</option>
        {
        fetchedTitles&&
        fetchedTitles.map((element,index)=>(
          <option 
            key={index} 
            value={element["title"]}>
              {(element["title"])}
            </option>))
        }
          {fetchedTitles&&(fetchedTitles.length<movieCount-400)&&
          <option disabled>Please wait. More are loading..</option>
          }
      </datalist>

      {/*  */}

      <br/>

      <label htmlFor="movie-menu" className="text-xs">
        Select a movie from the list  
        
        {fetchedTitles&&
        <span>
          &nbsp;{fetchedTitles.length}/{movieCount}
        
        </span>
        }
     </label>
    
    </div>

  )

}


  

export default MovieTitles;