import { getSessionDetails, userObject } from "@/app/(mongodb)/user";
import { redirect } from "next/navigation";

const ChangeUsernamePage = async() => {

  const sessionDetails = await getSessionDetails();
  if ( !sessionDetails ){
    redirect('/user');
  }

  return (
  <section>
    <h3 className="text-center">Your current username is: 
      <br/>{sessionDetails.username}
    </h3>
    
    Change your username
  </section>
  )

}

export default ChangeUsernamePage;