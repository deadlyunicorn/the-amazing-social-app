import { ConfirmationDialog } from "@/app/(components)/ConfirmationDialog"

export const DeletePostComponent = () =>{

  return (
  <>
      <button
      // @ts-ignore
        onClick={()=>{document.getElementById('postid')?.showModal()}} 
        className="text-end text-error-light-reactive capitalize">delete post</button>
      <ConfirmationDialog id="postid" textContent="Press 'CONFIRM' to confirm your post's deletion.">
        <button className="btn text-red-600">Confirm</button>
      </ConfirmationDialog>
  </>
  )
}