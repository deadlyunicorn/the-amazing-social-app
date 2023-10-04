'use client'

export const ReloadPageComponent = ({path}:{path:string}) => {

  return (
    <section className="flex justify-center">
      <button
        className="text-link hover:underline capitalize"
        onClick={()=>{
          document.location = `${path}`;
        }}>
          Try again
      </button>
    </section>
  )
}