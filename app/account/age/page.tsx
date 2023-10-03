import { getSessionDetails } from "@/app/(mongodb)/user";
import { redirect } from "next/navigation";

const ChangeAgePage = async() => {

  const sessionDetails = await getSessionDetails();
  if ( !sessionDetails ){
    redirect('/user');
  }

  return(

    <section>
      <h3 className="text-center">You currently were born in:
        <br/>{sessionDetails.age}
      </h3>
      Change your age
    </section>
  )


}

export default ChangeAgePage;