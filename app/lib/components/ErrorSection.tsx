import Link from "next/link";
import { ReactNode } from "react";

export const ErrorSection = ({children, path}:{children:ReactNode,path:string}) => (
  <section
          className="
          max-w-3xl place-self-center
          text-error-light text-center relative 
          justify-center
          flex flex-col">
            <Link
              tabIndex={0}
              href={path}
              className="
              text-error-light-reactive
              font-semibold
              absolute top-2 right-5">X</Link>
            <p>{children}.</p>
  </section>
)