'use client'
import { useEffect,useState } from 'react';
import {getData} from './newFile'


const FetchedElement = () =>{


  const [data, setData] = useState([]);
  useEffect(()=>{
    async function fetchData(){
      try {
        const data = await getData();
        setData(data);
      }catch(error){
        console.error(error);
      }
    }

    fetchData();
  },[]);

  return(
  <>
    <div>
      {data}
      s
      hello world
    </div>
  </>
)
}


export default FetchedElement;