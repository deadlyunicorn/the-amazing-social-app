import { ConfirmationDialog } from "@/app/(components)/ConfirmationDialog"

export const DeletePostComponent = ( { postId }: { postId: string } ) =>{

  return (
  <>
      <button
      // @ts-ignore
        onClick={()=>{document.getElementById(`${postId}_modal`)?.showModal()}} 
        className="
        flex
        text-end text-error-light-reactive 
        capitalize">
          delete post
      </button>

      <ConfirmationDialog id={`${postId}_modal`} textContent="Press 'CONFIRM' to confirm your post's deletion.">
        <button className="btn text-red-600">Confirm</button>
      </ConfirmationDialog>
  </>
  )
}