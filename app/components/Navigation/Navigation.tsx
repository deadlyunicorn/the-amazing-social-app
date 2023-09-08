import Link from "next/link"
import { ReactNode } from "react"

const NavigationBar = () => (
  <nav className="w-full h-16 fixed bottom-0
  border-t border-zinc-400 rounded-t-md bg-black bg-opacity-25
  flex justify-evenly items-center">

    <NavItem link="/"> 
      <HouseIcon /> 
    </NavItem>

    <NavItem link="/explore"> 
      <PlanetIcon /> 
    </NavItem>

    <NavItem link="/chat"> 
      <ChatIcon /> 
    </NavItem>

    <NavItem link="/profile"> 
      <UserIcon /> 
    </NavItem>
  </nav>
)


const NavItem = (
  props: {
    children: ReactNode
    link: string
  }
) => (
  <Link
    href={props.link}
    tabIndex={0}
    className="
  hover:brightness-110
    text-4xl h-12 min-w-[48px]
  flex items-center justify-center
  border-l-2 
  border-zinc-400 hover:border-zinc-200 
  bg-neutral-900 hover:bg-neutral-800 
  rounded-lg 
  p-2">
    {props.children}
  </Link>
)

export default NavigationBar

const HouseIcon = () => (
  <svg
    className="h-full w-fit fill-none stroke-slate-200"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="191.839"
    height="188.685"
    version="1.1"
    viewBox="0 0 50.757 49.923"
  >
    <defs>
      <linearGradient id="linearGradient42">
        <stop offset="0" stopColor="#024848" stopOpacity="0.3"></stop>
        <stop offset="1" stopColor="#19dafc" stopOpacity="0.3"></stop>
      </linearGradient>
      <linearGradient
        id="linearGradient43"
        x1="12"
        x2="18.104"
        y1="33"
        y2="26.724"
        gradientUnits="userSpaceOnUse"
        xlinkHref="#linearGradient42"
      ></linearGradient>
      <linearGradient
        id="linearGradient44"
        x1="12"
        x2="18.104"
        y1="33"
        y2="26.724"
        gradientUnits="userSpaceOnUse"
        xlinkHref="#linearGradient42"
      ></linearGradient>
    </defs>
    <g
      strokeDasharray="none"
      strokeLinejoin="round"
      strokeOpacity="1"
      transform="translate(1.166 -.043)"
    >
      <g
        fillOpacity="1"
        strokeWidth="1"
        transform="matrix(1.28104 0 0 1.38872 -7.073 -19.608)"
      >
        <path
          strokeLinecap="round"
          d="M24.996 14.223L5.834 32.008h38.332l-19.17-17.785"
        ></path>
        <path
          style={{ mixBlendMode: "normal" }}
          d="M13.259 31.998V50h23.506l-.019-18.002H13.26"
        ></path>
        <path
          strokeLinecap="round"
          d="M12.089 26.203V18.1h5.358v3.13"
        ></path>
      </g>
      <path
        fillOpacity="1"
        strokeLinecap="round"
        strokeWidth="1"
        d="M30.014 35.09H19.986v14.752h10.028V35.089"
      ></path>
      <g
        fillOpacity="1"
        strokeLinecap="round"
        strokeWidth="1"
        transform="translate(.104)"
      >
        <path
          d="M12 26.827h6V33h-6v-6.173"
        ></path>
      </g>
      <g
        fillOpacity="1"
        strokeLinecap="round"
        strokeWidth="1"
        transform="translate(20)"
      >
        <path
          d="M12 26.827h6V33h-6v-6.173"
        ></path>
      </g>
      <circle
        cx="28"
        cy="43"
        r="0.635"
        fillOpacity="0.548"
        strokeLinecap="round"
        strokeWidth="1"
      ></circle>
    </g>
  </svg>
)

const ChatIcon = () => (
  <svg
    className="h-full w-fit fill-[#f8fafc50] stroke-slate-200"
    xmlns="http://www.w3.org/2000/svg"
    width="104.956"
    height="89.939"
    version="1.1"
    viewBox="0 0 27.77 23.796"
  >
    <g transform="translate(-9.74 -9.595)">
      <path
        fillOpacity="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="M21.446 9.698c-2.57 0-4.74.638-5.062 1.488-1.784.208-3.113 1.486-3.113 2.997.002.036.005.072.01.108-1.785.604-2.922 1.88-2.927 3.282.001.792.366 1.563 1.04 2.195-.979.49-1.547 1.223-1.55 1.998.004 1.215 1.388 2.264 3.327 2.523.476 2.033 2.446 3.487 4.73 3.492 1.396 0 2.724-.549 3.644-1.504 1.02.542 2.413.848 3.867.848 2.368-.002 7.376 7.214 8.087 6.031.322.062-2.261-7.927-1.926-7.927 1.974 0 3.573-1.044 3.573-2.333 0-.298-.088-.592-.258-.868 1.35-.242 2.298-1.117 2.3-2.122 0-.6-.342-1.173-.944-1.586.71-.324 1.161-.996 1.163-1.731 0-.988-.802-1.817-1.859-1.922a.84.84 0 00.066-.303c0-.742-1.041-1.404-2.595-1.65.85-.283 1.323-.657 1.325-1.044 0-.848-2.203-1.535-4.922-1.535-1.311.001-2.566.165-3.488.456-.89-.55-2.614-.893-4.488-.893z"
      ></path>
    </g>
  </svg>
)

const UserIcon = () => (
  <svg
    className="h-full w-fit fill-none stroke-slate-200"
    xmlns="http://www.w3.org/2000/svg"
    width="153.28"
    height="52mm"
    version="1.1"
    viewBox="0 0 40.555 52"
  >
    <g
      strokeDasharray="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity="1"
      strokeWidth="2"
      paintOrder="stroke markers fill"
      transform="translate(-4.722 1)"
    >
      <circle cx="25" cy="11.315" r="11.315"></circle>
      <path d="M5.722 50C5.751 22.366 25 22.63 25 22.63S44.247 22.382 44.278 50"></path>
      <path d="M5.722 50h38.556"></path>
    </g>
  </svg>
)

const PlanetIcon = () => (
  <svg
    className="h-full w-fit stroke-slate-200 fill-none"
    xmlns="http://www.w3.org/2000/svg"
    width="147.704"
    height="147.704"
    version="1.1"
    viewBox="0 0 39.08 39.08"
  >
    <g transform="translate(-5.46 -5.46)">
      <path
        strokeDasharray="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="1"
        strokeWidth="1"
        d="M44.04 25c-21.904 10.186-28.571 3.522-38.08 0m3.764 11.366c9.025 5.118 18.514 8.186 30.552 0M9.724 13.634c8.373-2.297 13.634-8.54 30.552 0m3.168 16.092c-20.985 11.217-26.424 3.177-36.857.12m37.287-7.358c-21.183 7.955-28.04-3.495-37.648-.659M25 44.04A19.04 19.04 0 015.96 25 19.04 19.04 0 0125 5.96 19.04 19.04 0 0144.04 25 19.04 19.04 0 0125 44.04z"
      ></path>
    </g>
  </svg>
)