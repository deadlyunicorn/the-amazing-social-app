import { ObjectId } from "mongodb"
import { toggleLike } from "../../(mongodb)/likePost"
import { experimental_useOptimistic as useOptimistic, useState } from "react"
import { userDetailsClient } from "../../page"


export const LikeComponent = ({ postId, likers, userDetails }: { postId: ObjectId, likers: string[], userDetails: userDetailsClient |null }) => {


  const [optimisticLike, setOptimistic] = useOptimistic<any>(
    likers.length
  );
  const [like,setLike] = useState(likers.includes(String(userDetails?._id)))

  return (
    <form
      action={toggleLike}>
      <input
        hidden
        value={String(postId)}
        name="postId"
        readOnly />
      <button

        onClick={() => {
          if (like) {
            setOptimistic(optimisticLike - 1);
            setLike(!like);
          }
          else{
            setOptimistic(optimisticLike + 1);
            setLike(!like);
          }
        }}>
        <svg
          data-pending
          className="cursor-pointer stroke-red-600 data-[pending=true]:fill-red-600 fill-transparent"
          xmlns="http://www.w3.org/2000/svg"
          width={30}
          version="1.1"
          viewBox="0 0 17.844 15.9">

          <g transform="translate(-16.078 -18.778)">
            <path
              fillOpacity="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="1"
              strokeWidth="0.735"
              d="M20.01 19.145c-.4.005-.874.044-1.216.282-1.063.74-1.806 1.994-2.134 3.247-.362 1.379-.262 2.953.292 4.267.867 2.058 2.78 3.528 4.463 4.998 1.048.917 3.46 2.341 3.46 2.341a.245.245 0 00.057.014.187.187 0 00.068.017.188.188 0 00.069-.017.247.247 0 00.056-.014s2.412-1.424 3.46-2.34c1.682-1.47 3.596-2.94 4.463-5 .553-1.313.654-2.887.292-4.266-.328-1.253-1.072-2.507-2.134-3.247-.342-.238-.816-.277-1.217-.282-1.203-.014-2.35.699-3.231 1.492-.85.764-1.447 2.513-1.758 2.944-.311-.43-.908-2.18-1.758-2.944-.882-.793-2.029-1.506-3.231-1.492z"
              display="inline"
              paintOrder="stroke markers fill"
            ></path>
          </g>
        </svg>
      </button>
      <p>{optimisticLike}</p>

    </form>
  )
}