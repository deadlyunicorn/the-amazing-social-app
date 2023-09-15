"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { experimental_useFormStatus } from "react-dom";
import { SubmitButtonClient } from "../(components)/SubmitButtonClient";

export const ImageInput = () => {

  const [temp, setTemp] = useState<undefined | string>(undefined);
  const {pending} = experimental_useFormStatus();
 
  useEffect(()=>{
    if (!pending){
      setTemp(undefined);
    }
    
  },[pending])

  return (
    <>
      <input
        onChange={e => {
          const files = e.target.files;
          if (files) {
            const temporaryImage = files[0];
            setTemp(URL.createObjectURL(temporaryImage));
          }
        }}
        required
        className="hidden"
        id="imgFile"
        accept="image/*"
        name="imgFile"
        type="file" />

      {temp&&
      <figure className="my-2">
        <figcaption>Preview</figcaption>
        <Image
          className="rounded-full self-center aspect-square object-cover"
          src={temp}
          width={100}
          height={100}
          alt={`Your new picture preview`} />

      </figure>
      }
      {
        (pending||temp)&&
          <SubmitButtonClient />
      }


    </>

  )
}