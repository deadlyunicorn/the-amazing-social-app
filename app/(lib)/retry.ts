export const withRetry  = 
  async<T>( 
    asyncFunc: ()=>Promise<T>,
    retryCount : number,
    args: [] ): Promise<T|null> => {



  for( let i = 0; i < retryCount; i++ ){

    
    
    try{
      i > 0 && console.log(`running: ${i}`);

      const errorPromise = errorOnTimeout(3000);
      const actualPromise = asyncFunc(...args);
      const res = await Promise.any([errorPromise,actualPromise]);

      if ( res === "Request Timeout" ) throw "Timed out";
      return res as T;
    }
    catch(err){
      console.log("Something happeded inside retry.ts haha");
    }

  }

  return null;


}

const errorOnTimeout = async( ms: number) => {
  return new Promise( (resolve,reject) =>
    setTimeout( ()=>{
      resolve("Request Timeout");
    }, ms)
  )

}