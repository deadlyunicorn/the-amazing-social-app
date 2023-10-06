import Link from "next/link"

export const SignUpAside = () => {

  return (
    <aside className="flex flex-col items-center mt-4">
          <p>
            Don&apos;t have an account?
          </p>
          <Link tabIndex={0} href="/register">
              Sign up
          </Link>
    </aside>
  )
}