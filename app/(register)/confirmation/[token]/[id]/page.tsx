export default function DynamicPage(
  
  //{params}=params.params
  {params:{id,token}}:
  {params:{id:string,token:string}}
){
  
  return(
    <>
      <div>
        MyPost {id} {token}
      </div>
    </>
  )
}