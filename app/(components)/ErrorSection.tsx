import { ReactNode } from "react";

export const ErrorSection = ({children}:{children:ReactNode}) => (
  <section
          className="text-error-light text-center relative">
            {children}.
  </section>
)