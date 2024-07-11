"use client";

import React, { createRef, FC, useState } from "react";
import Logo from "@/shared/Logo/Logo";
import MenuBar from "@/shared/MenuBar/MenuBar";
import AvatarDropdown from "./AvatarDropdown";
import Navigation from "@/shared/Navigation/Navigation";
import CartDropdown from "./CartDropdown";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import SwitchDarkMode2 from "@/shared/SwitchDarkMode/SwitchDarkMode";
import Link from "next/link";

export interface MainNav2LoggedProps { }

const MainNav2Logged: FC<MainNav2LoggedProps> = () => {

  const renderContent = () => {
    return (
      <div className="h-20 flex justify-between">
        <div className="flex items-center lg:hidden flex-1">
          <MenuBar />
        </div>

        <div className="lg:flex-1 flex items-center">
          <Logo className="flex-shrink-0" />
        </div>

        {/* <div className="flex-[2] hidden lg:flex justify-center mx-4">
           <Navigation />
        </div> */}

        <div className="lg:flex-1 flex items-center">
          <form className="max-w-md w-full">
            <div className="relative">
              <input type="search" className="block w-full p-2 ps-5 text-sm text-slate-900 border border-slate-300 rounded-full bg-slate-50 focus:ring-slate-500 focus:border-slate-500 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500" placeholder="Search Mockups, Logos..." required />
              <button type="submit" className="text-white absolute end-1 bottom-1 bg-slate-300 hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-full text-sm px-7 py-4 dark:bg-slate-800 dark:hover:bg-slate-900 dark:focus:ring-slate-800">
                <div className="absolute inset-y-0 start-2 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-slate-500 dark:text-slate-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
              </button>
            </div>
          </form>
        </div>
        <div className="lg:flex-2 p-2 flex items-center">
          <Link href="/">Download App</Link>
        </div>

        <div className="flex-1 flex items-center justify-end text-slate-700 dark:text-slate-100">
          <SwitchDarkMode2 />
          <AvatarDropdown />
          <CartDropdown />
        </div>
      </div>

    );
  };

  return (
    <div className="nc-MainNav2Logged relative z-10 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700">
      <div className="container ">{renderContent()}</div>
    </div>
  );
};

export default MainNav2Logged;
