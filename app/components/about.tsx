import Link from "next/link";

export default function About(){
  
  return(
  <>
    <div className="flex flex-col gap-y-2 text-center">
      <h1 className="text-3xl">
        Hello World!
      </h1>
    
      <p>
        Welcome to the Social App!
        <br/>A personal project of mine.
      </p>

      <p>
        Just as the name implies
        <br/> this is going to be a kind of a mock Social App
      </p>

      <p>
        In reality though, it is just an app
        <br/>that has the purpose of helping me 
        <br/>get better at Web Developing!
      </p>

      <h1>
        Technologies Used
      </h1>
      <ul className="list-inside list-disc text-left ml-6">
        <li>
          Next.js 13 (React Framework)
        </li>
        <li>
          TailwindCSS
        </li>
        <li>
          RealmSDK (MongoDB)
        </li>
      </ul>

      <h1>
        Checklist
      </h1>
      <div className="flex justify-center">
        <Link 
        className="w-fit"
        target="_blank" rel="noopener noreferrer"
        href="https://github.com/deadly-unicorn/mongodb-social-app-1/issues">
          Github
        </Link>
      </div>

    </div>
  </>
  );
}