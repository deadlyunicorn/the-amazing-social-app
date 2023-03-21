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
    return(<ConfirmationSuccess/>)

  }
  catch(error){
    const errorJson=error as errorInterface;
    if(errorJson.errorCode=="BadRequest"){
      console.log("rofl");
    }
    return(<ConfirmationFailure/>)
  }

}


const ConfirmationSuccess = () =>{
  return(
    <>
      <div className="w-56">
        <div className="break-all">
        Success 
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

