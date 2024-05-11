import Image from "next/image";
import { SIDENAV_ITEMS } from "@/app/seller/SIDEBAR_CONSTANTS";
import { SideBarMenuItem } from "./sidebar-menu-item";
import classNames from "classNames";
import { useSideBarToggle } from "@/hooks/use-sidebar-toggle";
import React from "react";

export default function Sidebar() {
  const { toggleCollapse } = useSideBarToggle();
  const asideStyle = classNames(
    "fixed sidebar overflow-y-auto border-stroke bg-white px-7.5 dark:border-strokedark dark:bg-boxdark text-slate-500 z-50 h-full shadow-lg shadow-gray-900/20 transition duration-300 ease-in-out w-[16rem]",
    {
      ["w-[20rem]"]: !toggleCollapse,
      ["sm:w-[5.4rem] sm:left-0 left-[-100%]"]: toggleCollapse,
    }
  );

  return (
    <aside className={asideStyle}>
      <div className="sidebar-top placeholder:flex relative items-center py-5 px-2">
        <Image
          className="w-10 min-h-fit"
          src="/public/logo.png"
          alt="logo"
          width={15}
          height={15}
        />
        {!toggleCollapse && (
          <h3 className="pl-2 font-bold text-2xl text-slate-500 min-w-max">
            My-Bis
          </h3>
        )}
      </div>
      <nav className="flex flex-col gap-2 transition duration-300">
        <div className="flex flex-col gap-2 px-4">
          {SIDENAV_ITEMS.map((item, index) => {
            return (
              <SideBarMenuItem
                item={item}
                key={index}
                toggleCollapse={toggleCollapse}
              ></SideBarMenuItem>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
