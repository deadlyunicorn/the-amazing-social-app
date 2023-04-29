import { useContext } from "react";
import { searchContext } from "@/app/components/searchPage/queryField";

const MetaForm = () => {
  
  const {collection,titleInput,setQueryInput,setDbGet}=useContext(searchContext)
  const getData = async()=>{
    await collection.aggregate([{$match:{title:titleInput}}])
    .then((data: any[])=>{setDbGet(data[0])});
  }
  return(
    <form
    className="mb-4" 
    onSubmit={(event)=>{
      event.preventDefault();
      getData();
    }}
    >
    <div className="flex justify-around mb-1">

    <input 
      list="metadataSearch"
      placeholder="Search metadata" 
      onChange={
        (event)=>{
          setQueryInput(
            event.target.value.toLowerCase()
            );}
        }
      className="
        bg-slate-50 px-2 py-1 rounded-md"/>
        <datalist id="metadataSearch">
          <option>title</option>
          <option>plot</option>
          <option>genres</option>
          <option>released</option>
          <option>directors</option>
          <option>languages</option>
        </datalist>
    
    <button 
      className="border bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md">
        Search
    </button>
    </div>
    <p className="text-xs">
      Try typing &quot;genres&quot;,&quot;languages&quot; or leave empty.
    </p>

    
  </form>


  )
}

export default MetaForm;