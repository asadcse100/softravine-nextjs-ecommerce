"use client";

import { Route } from "@/routers/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FC } from "react";
import MR from "@/images/MR.png";
import NcImage from "@/shared/NcImage/NcImage";

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

const pages: {
  name: string;
  link: Route;
  img: object;
  imgDark: object;
}[] = [
  {
    img: MR,
    imgDark: MR,
    name: "Flight",
    link: "/pages/air-ticket/flight/one-way",
  },
  {
    img: MR,
    imgDark: MR,
    name: "Umrah",
    link: "/pages/air-ticket/umrah/economy",
  },
  {
    img: MR,
    imgDark: MR,
    name: "Hajj",
    link: "/pages/air-ticket/hajj/economy",
  },
];

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="nc-AccountCommonLayout container">
      <div className="mt-5 sm:mt-5">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-2xl">
            <h2 className="text-3xl xl:text-4xl font-semibold">Air Ticket</h2>
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
                  <NcImage
                    containerClassName="mb-4 sm:mb-2 max-w-[80px] mx-auto"
                    className="rounded-full"
                    src={item.img}
                    sizes="150px"
                    alt="HIW"
                  />
                  <div className="text-center">
                    <h3 className="text-base font-semibold">{item.name}</h3>
                  </div>
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
