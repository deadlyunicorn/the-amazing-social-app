import {app} from "@/app/components/appObject"


interface errorInterface{
  errorCode:string
}

export default async function DynamicPage(
  
  //{params}=params.params
  {searchParams:{
    token,
    tokenId}}:
  {searchParams:{
    token:string,
    tokenId:string}}
){


  
  try{
    await app.emailPasswordAuth.confirmUser({token,tokenId})
    //if error the following will be skipped
    return(<ConfirmationSuccess token={token} tokenId={tokenId}/>)

  }
  catch(error){
    const errorJson=error as errorInterface;
    if(errorJson.errorCode=="BadRequest"){
      console.log("rofl");
    }
    return(<ConfirmationFailure/>)
  }

}


const ConfirmationSuccess = (
  {token,tokenId}:
  {token:string|null,tokenId:string|null}
) =>{
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

const ConfirmationFailure = (
) =>{
  return(
    <>
      <div className="w-56">
        <div className="break-all">

        MyPost 
        Confirmation Failed
        </div>
      </div>
    </>
  )
}

