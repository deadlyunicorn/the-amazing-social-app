'use client'
import Image from "next/image"

export const ImageComponent = ({imageURL,postId}:{imageURL:string,postId:string}) => (
  <div className="place-self-center">
            <Image
              placeholder="blur"
              blurDataURL="/favicon.svg"
              // @ts-ignore
              onClick={()=>document.getElementById(`${postId}_modal2`).showModal()}
              className="aspect-auto cursor-pointer"
              src={imageURL}
              alt="No post image description provided"
              width={200}
              height={200}
            />

            <dialog id={`${postId}_modal2`} className="modal">
              <div className="modal-box bg-stone-900 text-white">
                <Image
                  src={imageURL}
                  alt="No image description provided"
                  width={1000}
                  height={1000}
                />
                <form method="dialog" className="mt-4">
                  <button className="btn capitalize">Close</button>
                </form>

              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </div>
)