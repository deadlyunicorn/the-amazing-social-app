"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { SubmitButtonClient } from "./SubmitButtonClient";
import { useFormStatus } from 'react-dom'

export const ImageInputStandalone = () => {

  const [temp, setTemp] = useState<undefined | string>(undefined);
  const {pending} = useFormStatus();
 
  useEffect(()=>{
    if (!pending){
      setTemp(undefined);
      //@ts-ignore
      document.getElementById('imgFile').value="";
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
        hidden
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

export const ImageInputOptional = ({pixels,temp,setTemp}:{pixels:number,temp:string|undefined,setTemp:any}) => {

  const {pending} = useFormStatus();
 
  useEffect(()=>{
    if (!pending){
      setTemp(undefined);
    }
    
  },[pending])

  return (
    <>
      <input
        onChange={e => {
          alert("Due to the project being in an archive state - we have disabled POST requests to the S3 bucket. Images won't be uploaded");
          const files = e.target.files;
          if (files) {
            const temporaryImage = files[0];
            setTemp(URL.createObjectURL(temporaryImage));
          }
        }}
        className="hidden"
        id="image"
        accept="image/*"
        name="image"
        type="file" />

      {temp&&
      <figure className="my-2">
        <figcaption>Preview</figcaption>
        <Image
          className="self-center object-cover"
          src={temp}
          width={pixels}
          height={pixels}
          alt={`Something to go with your post`} />

      </figure>
      }
    </>

  )
}