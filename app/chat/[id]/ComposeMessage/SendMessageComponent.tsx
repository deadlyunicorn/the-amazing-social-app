import { CustomSubmitButtonClient } from "@/app/lib/components/SubmitButtonClient"
import { MessageTextAreaClient } from "./TextAreaClient"
import { sendMessageAction } from "./SendAction"
import { userObject } from "@/app/api/mongodb/user/user"
import { ResetOnSubmit } from "@/app/explore/create/ResetOnSubmit"

export const SendMessageComponent = ({sender,receiver}:{
  sender: userObject,
  receiver: userObject
}) => {

  const formId='sendMessageForm';

  return (
    <form 
      action={sendMessageAction}
      className="flex justify-between gap-x-2 my-2">

      <MessageTextAreaClient/>


      <div className="w-24 flex flex-col place-self-center">
        <CustomSubmitButtonClient>
          Send
        </CustomSubmitButtonClient>
      </div>
      <input 
        value={String(receiver._id)}
        readOnly
        name="receiver"
        hidden/>

    </form>
  )
}

