'use client'
import Image from "next/image"

export const ImageComponent = ({imageURL,postId}:{imageURL:string,postId:string}) => (
  <div className="place-self-center">
            <Image
              tabIndex={0}
              onKeyDown={(e)=>{
                if (e.key == " "){
                  // @ts-ignore
                  document.getElementById(`${postId}_modal2`).showModal()}
                }

              }
              placeholder="blur"
              blurDataURL="/favicon.svg"
              // @ts-ignore
              onClick={()=>document.getElementById(`${postId}_modal2`).showModal()}
              className="max-h-[300px] cursor-pointer object-cover"
              src={imageURL}
              alt="No post image description provided"
              width={200}
              height={300}
            />

            <dialog 
              id={`${postId}_modal2`} className="modal group">
              <div className="group-open:grid modal-box  hidden bg-stone-900 text-white">
                <Image
                  className="h-[min(400px,80vh)] object-contain"
                  src={imageURL}
                  alt="No image description provided"
                  width={500}
                  height={500}
                />
                <form method="dialog" className="mt-4">
                  <button 
                    tabIndex={0} className="btn capitalize">Close</button>
                </form>

              </div>
              <form 
                method="dialog" className="modal-backdrop group-open:grid hidden">
                  <button>close</button>
              </form>
            </dialog>
          </div>
)