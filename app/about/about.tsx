import Link from "next/link";

export default function About(){

  return(
    <>
      <h1 className="text-3xl">
        Hello World!
      </h1>

      <p>
        Welcome to the Social Appv2!
        <br/>A personal project of&nbsp;
        <Link 
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={0}
          href={"https://www.linkedin.com/in/alexander-petrache/"}>
          Alexander Petrache
        </Link>
        ,
        <br/>also known as &quot;deadlyunicorn&quot;.
      </p>

      <p>
        Just as the name implies
        <br/> this is going to be a kind of a mock Social App
      </p>

      <p>
        This real purpose of this is to help me
        <br/>get better at developing Web Apps.
        <br/>
        <br/>Really returning to this after some months,
        <br/>with new viewpoints and knoweledge,
        <br/>feels so satisfying.
      </p>

      <h1>
        Technologies Used
      </h1>

      <div className="
        flex justify-center
      ">
        <ul className="w-fit
        list-inside list-disc 
        text-left">
          <li>
            Next.js 13 (React Framework)
          </li>
          <li>
            TailwindCSS
          </li>
          <li>
            <s>Realm</s> Supabase
          </li>
        </ul>

      </div>

      <h1>Checklist</h1>

      <div className="flex justify-center">
        <Link
          className="w-fit"
          target="_blank" rel="noopener noreferrer"
          tabIndex={0}
          href="https://github.com/deadly-unicorn/mongodb-social-app-1/issues">
          Github
        </Link>
      </div>
    </>
  );
}