import { ErrorSection } from "@/app/(components)/ErrorSection";
import { MultipleRowsWrapper } from "@/app/(components)/FormWrapper";
import { getMongoClient } from "@/app/(lib)/mongoClient";
import { getSessionDetails, userObject } from "@/app/(mongodb)/user";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as zod from "zod" 

const ChangeUsernamePage = async({searchParams}:{searchParams:{error:string}}) => {

  const sessionDetails = await getSessionDetails();
  if ( !sessionDetails ){
    redirect('/user');
  }
  

  return (
  <MultipleRowsWrapper>
  <section>
    <h3 className="text-center">Your current username is: 
      <br/>{sessionDetails.username}
    </h3>
    
    <form
      action={changeUsername}>
      
      <input
        pattern="^[A-Za-z][A-Za-z0-9\_]"
        required
        placeholder="username" 
        aria-label="insert your new username"
        name="username" 
        minLength={6} maxLength={30}
        />

      <button>
        Change your username
      </button>
    </form>
    
  </section>

  {searchParams.error &&
  <ErrorSection path="/account/username">
    {searchParams.error}
  </ErrorSection>
  }
  </MultipleRowsWrapper>
  )

}

const changeUsername = async( formData: FormData )=>{
  "use server"

  const newUsername = await zod
    .string()
    .min(6)
    .max(30)
    .regex(/^[A-Za-z]([A-Za-z0-9\_])\w+/g)
    .parseAsync(formData.get('username'))
    .catch( err=>{
      redirect(`/account/username?error=${"Invalid Username"}`)
    })


  const client = getMongoClient();
  const session = await getSessionDetails();

  if ( session?.username == newUsername){
    redirect(`/account/username?error=${"This is already your username"}`);
  }

  if ( session?.lastUsernameUpdate && session.lastUsernameUpdate.getTime() > new Date().getTime() - 2000000000){
    redirect(`/account/username?error=${"You have already updated your username in the past 20 days"}`);
  }
  try{

    const users = client.db('the-amazing-social-app').collection('users');
    await users.findOne({username:newUsername})
    .then( res => {
      if (res){
        throw "username used"
      }
    })

    await users.findOneAndUpdate(
      {_id:session?._id},
      { $set:{
        username:newUsername,
        lastUsernameUpdate: new Date()
      }}
    );
    revalidatePath('/');
  }
  catch(error){
    if (error === "username used"){
      redirect(`/account/username?error=${"Username is already taken"}`);
    }
    redirect(`/account/username?error=${"Failed Updating"}`);
  }
  finally{
    client.close();
  }
}

export default ChangeUsernamePage;