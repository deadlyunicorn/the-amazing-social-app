'use client'

export const ReloadPageComponent = () => {

  return (
    <section className="flex justify-center">
      <button
        className="text-link hover:underline capitalize"
        onClick={()=>{
          document.location = '/explore';
        }}>
          Try again
      </button>
    </section>
  )
}