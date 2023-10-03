export const PostsFallback = () => {

  const mockArray = [1,2,3,4,5,6,7,8,9]

  return (

    <section
      className="
      overflow-hidden relative
      px-2 
      w-full 
      h-screen animate-pulse">

      {mockArray.map(
        item=><MockPostComponent key={item}/>

      )}

    </section>
  )
} 



export const MockPostComponent = () => {

  const random = Math.random();

  return (

    <div
      style={{ height: random * 100 * 5 }}
      className="
      px-2 my-4
      min-h-[100px]
      mx-8
      bg-slate-200 rounded-2xl
      flex justify-between"/>

  )
}

