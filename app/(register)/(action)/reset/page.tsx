import {app} from "@/app/components/appObject"


export default function DynamicPage(
  
  //{params}=params.params
  {searchParams:{
    token,
    tokenId}}:
  {searchParams:{
    token:string|null,
    tokenId:string|null}}
){
  
  app.emailPasswordAuth.confirmUser({})

  return(
    <>
      <div className="w-56">
        <div className="break-all">

        MyPost 
        <br/> token:{token&&token.split(5)}
        <br/> tokenID:{tokenId}
        </div>
      </div>
    </>
  )
}