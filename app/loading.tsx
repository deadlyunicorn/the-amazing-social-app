import "@/app/components/Styles/styles.css"


export default function Loader(){
  return(
    <>
      <div>
        <div className="bg-white p-4 rounded-lg w-96 h-48 animate-appearance flex flex-col justify-center">
            <div className="text-center">Loading...</div>
            <br/>
        </div>

      </div>
    </>
  )
}