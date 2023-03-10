
import MongoElement from "./mongodb[old]/MongoGetElements";




export default function Home() {

  return (
    <>
    <div className="flex flex-col gap-2 bg-white bg-opacity-5 rounded-xl">

      <div className="px-2 py-3 flex items-center bg-white rounded-lg bg-opacity-30">
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
      {/* ignore error.. */}
      <MongoElement/> 
          {/*Getting error: 
                    'MongoElement' cannot be used as a JSX component.
            Its return type 'Promise<Element>' is not a valid JSX element.
              Type 'Promise<Element>' is missing the following properties from type 'ReactElement<any, any>': type, props, keyts(2786)

              tried to find a workaround but manage to. Works despite error..
              omg If only I remembered what the docs said .. 
          but:https://github.com/acdlite/rfcs/blob/first-class-promises/text/0000-first-class-support-for-promises.md#basic-examples
          
          While you can try it out, it is not yet stable. We'll keep these docs updated to reflect the latest developments.
          */}
          
    </div>
    </>
  )
}

//Todos: whole page is scrollable
//Nav and Header are hidden during scroll

