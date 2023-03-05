
import FetchButton from "./mongodb[old]/fetchButton"
import FetchedElement from "./mongodb[old]/fetchedData"
import MongoElement from "./mongodb[old]/getElements";




export default function Home() {

  return (
    <>
      <main className="mt-28 flex justify-center">
        <div className="border max-w-xs py-5">


          <div className="border py-3 flex items-center">
            
            <span className="text-sm">
              Post Something:&nbsp;
            </span>
            <input 
              className="w-3/5 
              rounded-md bg-opacity-20 bg-white 
              text-slate-200"/>

          </div>
          <div className="text-center">
            Latest Posts
          </div>
          <br/>
          <MongoElement/>
        </div>
      </main>
    </>
  )
}

//Todos: whole page is scrollable
//Nav and Header are hidden during scroll

