"use client";

import { Route } from "@/routers/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FC } from "react";

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

const pages: {
  name: string;
  link: Route;
}[] = [
  {
    name: "Drive Offer",
    link: "/pages/drive-offer/operator",
  },
  {
    name: "Pending",
    link: "/pages/drive-offer/pending",
  },
  {
    name: "History",
    link: "/pages/drive-offer/drive-history",
  },
];

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="nc-AccountCommonLayout container">
      <div className="mt-5 sm:mt-5">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-2xl">
            <h2 className="text-3xl xl:text-4xl font-semibold">Drive Offers</h2>
          </div>
          <hr className="mt-5 border-slate-300 dark:border-slate-700"></hr>

          <div className="flex space-x-4 md:space-x-14 overflow-x-auto hiddenScrollbar">
            {pages.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.link}
                  className={`block py-2 md:py-2 border-b-2 flex-shrink-0 text-sm sm:text-base ${
                    pathname === item.link
                      ? "border-primary-500 font-medium text-slate-900 dark:text-slate-200"
                      : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          <hr className="border-slate-300 dark:border-slate-700"></hr>
        </div>
      </div>
      <div className="max-w-4xl mx-auto pt-5 sm:pt-5 pb-10 lg:pb-10">
        {children}
      </div>
    </div>
  );
};

export default CommonLayout;
