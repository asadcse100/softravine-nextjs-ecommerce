"use client";

import { Route } from "@/routers/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FC } from "react";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

const pages: {
  name: string;
  link: Route;
}[] = [
  {
    name: "Economy",
    link: "/frontend/pages/air-ticket/umrah/economy",
  },
  {
    name: "Business",
    link: "/frontend/pages/air-ticket/umrah/business",
  },
  {
    name: "VIP",
    link: "/frontend/pages/air-ticket/umrah/vip",
  },
];

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="nc-AccountCommonLayout">
      <div className="max-w-4xl mx-auto">

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
                <div className="text-center">
                  <h3 className="text-base font-semibold">{item.name}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="max-w-4xl mx-auto pt-5 sm:pt-5 pb-10 lg:pb-10">
        {children}
      </div>
    </div>
  );
};

export default CommonLayout;
