export default function DynamicPage(
  
  //{params}=params.params
  {params:{id}}:
  {params:{id:string}}
){
  
  return(
    <>
      <div>
        MyPost {id}
      </div>
    </>
  )
}