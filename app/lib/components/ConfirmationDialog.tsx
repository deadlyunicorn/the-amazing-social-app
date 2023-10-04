import { ReactNode } from "react";

export const ConfirmationDialog = ({id,textContent,children}:{id:string,textContent:string,children:ReactNode}) =>{


  return (
    <dialog
      id={id} className="group modal">
            <div className="hidden group-open:grid modal-box bg-stone-900 text-white">
              <h3 className="font-bold text-lg text-error-light mb-4">Warning this action is permanent.</h3>
              <p>{textContent}</p>
              <p className="py-4">Press ESC key or click &apos;Close&apos; below to close this menu.</p>
              <div className="modal-action justify-between">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button
                    className="btn capitalize">Close</button>
                </form>

                {children}
              </div>
          </div>
      </dialog>
     
  )
}

