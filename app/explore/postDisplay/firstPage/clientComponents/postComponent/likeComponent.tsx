"use client" //force use client even if it was child of a server component

import { userDetailsClient } from "../../../../page"
import { useEffect, useState } from "react";
import { UpdateResult } from "mongodb";
import Link from "next/link";
import Image from "next/image";
import { userPostWithAvatar } from "../../../(mongodb)/getPosts";
import { DeletePostComponent } from "./deleteComponent";

export const LikeComponent = ({ post, userDetails }: { post:userPostWithAvatar, userDetails: userDetailsClient | null }) => {

  const postId = post._id;

  const viewer = {
    username: userDetails?.username,
    avatarSrc: userDetails?.avatarSrc,
  };
  const viewerName = String( viewer.username );

  const [hasMounted, setHasMounted] = useState(false);


  const [likers, setLikers] = useState<userPostWithAvatar["likers"]> ( post.likers );
  const likerUsernames = likers.map( liker => liker.username );

  const toggleLike = () => {

    if ( likerUsernames.includes( viewerName )) {
      setLikers(likers.filter(liker => liker.username != viewerName ))
    }
    else {
      setLikers( [viewer,...likers]);
    }

  }

  useEffect(() => {

    if (hasMounted) {
      
      const timer = setTimeout(() => {
        (async () => {

          likerUsernames.includes( viewerName )
            ? await fetch(`/explore/post/${postId}/like`, { method: "POST", body: JSON.stringify({ like: true }) })
            : await fetch(`/explore/post/${postId}/like`, { method: "POST", body: JSON.stringify({ like: false }) })

              .then(async (response) => {
                try {

                  if (response.ok) {
                    await response.json()
                      .then((update: UpdateResult) => {
                        if (update && update.acknowledged) { }
                        else throw "Something went wrong";
                      })
                  }
                  else throw "Something   went wrong"
                }
                catch (err) {
                  toggleLike()
                }

              });


        })()

      }, 3000);

      return () => { clearTimeout(timer) };
    }
    else setHasMounted(true);

  }, [likers])

  const likersCount = likers.length;
  const latestLikers = likers
    .slice( 0, Math.min( 3, likersCount ) )
    .map( ( liker ) => 
      <Link
        data-tip={`${liker.username}`}
        className="tooltip tooltip-primary" 
        key={liker.username} 
        href={`/user/${liker.username}`}>
        <Image
          height={20}
          width={20}
          src={ liker.avatarSrc || "/favicon.svg"}
          alt={`${liker.username}'s avatar`}
          className="text-sm aspect-square rounded-full"/> 
      </Link>
    )

  const otherLikers = likersCount > 3 && `& ${likersCount-3} more`


  return (
      <div className="flex items-center gap-x-2 relative">
      <button
        aria-label="like button, redirects to login page if not logged in."
        onClick={() => {
          if (userDetails) {
            toggleLike();
          }
          else {
            document.location = '/login';
          }
        }}>
        <svg
          data-pending={likerUsernames.includes( viewerName )}
          className="cursor-pointer 
          stroke-red-600 data-[pending=true]:fill-red-600 
          fill-transparent"
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
              strokeWidth="0.735" d="M20.01 19.145c-.4.005-.874.044-1.216.282-1.063.74-1.806 1.994-2.134 3.247-.362 1.379-.262 2.953.292 4.267.867 2.058 2.78 3.528 4.463 4.998 1.048.917 3.46 2.341 3.46 2.341a.245.245 0 00.057.014.187.187 0 00.068.017.188.188 0 00.069-.017.247.247 0 00.056-.014s2.412-1.424 3.46-2.34c1.682-1.47 3.596-2.94 4.463-5 .553-1.313.654-2.887.292-4.266-.328-1.253-1.072-2.507-2.134-3.247-.342-.238-.816-.277-1.217-.282-1.203-.014-2.35.699-3.231 1.492-.85.764-1.447 2.513-1.758 2.944-.311-.43-.908-2.18-1.758-2.944-.882-.793-2.029-1.506-3.231-1.492z"
              display="inline"
              paintOrder="stroke markers fill"
            ></path>
          </g>
        </svg>
      </button>

        <p className="flex gap-x-1 h-[25px]">
          {latestLikers} {otherLikers}  </p>

          { userDetails?.username == post.created_by &&
            
            <div className="absolute right-0 bottom-0">
              <DeletePostComponent postId={postId}/>
            </div>
              
          }
      </div>
  )
}

