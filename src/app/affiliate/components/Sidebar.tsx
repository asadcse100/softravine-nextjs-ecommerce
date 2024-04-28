import Image from "next/image";
import { SIDENAV_ITEMS } from "@/app/affiliate/SIDEBAR_CONSTANTS";
import { SideBarMenuItem } from "./sidebar-menu-item";
import classNames from "classNames";
import { useSideBarToggle } from "@/hooks/use-sidebar-toggle";

export default function Sidebar(){
  const { toggleCollapse } = useSideBarToggle();
   const asideStyle = classNames("sidebar overflow-y-auto fixed border-stroke bg-white px-7.5 dark:border-strokedark dark:bg-boxdark text-gray-500 z-50 h-full shadow-lg shadow-gray-900/20 transition duration-300 ease-in-out w-[16rem]",
      {
         ["sm:w-[4rem] sm:left-0 left-[-100%]"]:toggleCollapse,
         ["w-[18rem]"]:!toggleCollapse
      }
   )

  return (
    <aside className={asideStyle}>
      <div className="flex relative items-center py-5 px-2">
        <image
          className="w-10 min-h-fit"
          src="/public/next.svg"
          alt=""
          width={15}
          height={15}
        ></image>
        { !toggleCollapse && <h3 className="pl-2 font-bold text-2xl text-[#e6e9ee] min-w-max">
          Dashboard
        </h3>}
      </div>
      <nav className="flex flex-col gap-2 transition duration-300">
        <div className="flex flex-col gap-2 px-4">
          {SIDENAV_ITEMS.map((item, index) => {
            return <SideBarMenuItem item={item} key={index} toggleCollapse = {toggleCollapse}></SideBarMenuItem>;
          })}
        </div>
      </nav>
    </aside>
  )
}