import React, { FC } from "react";
import MainNav2 from "./MainNav2";
import Link from "next/link";

export interface HeaderProps { }

const Header: FC<HeaderProps> = () => {
  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-slate-100 rounded-lg bg-slate-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-slate-800 md:dark:bg-slate-900 dark:border-slate-700">
              <li>
                <Link href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:p-0" aria-current="page">All Categories</Link>
              </li>
              <li>
                <Link href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark:text-red-500" aria-current="page">Super Deals</Link>
              </li>
              <li>
                <Link href="#" className="block py-2 px-3 text-slate-900 rounded hover:bg-slate-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-slate-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-slate-700">Mybis Business</Link>
              </li>
              <li>
                <Link href="#" className="block py-2 px-3 text-slate-900 rounded hover:bg-slate-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-slate-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-slate-700">Mybis Affiliate</Link>
              </li>
              <li>
                <Link href="#" className="block py-2 px-3 text-slate-900 rounded hover:bg-slate-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-slate-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-slate-700">Service</Link>
              </li>
              <li>
                <Link href="#" className="block py-2 px-3 text-slate-900 rounded hover:bg-slate-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-slate-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-slate-700">Blog</Link>
              </li>
              <li>
                <Link href="#" className="block py-2 px-3 text-slate-900 rounded hover:bg-slate-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-slate-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-slate-700">Notice</Link>
              </li>
            </ul>
          </div>
        </div>
    </div>
  );
};

export default Header;


