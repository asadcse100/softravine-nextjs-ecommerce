"use client";

import { Route } from "@/routers/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import MR from "@/images/MR.png";

export interface CommonLayoutProps {
  children?: ReactNode;
}

const pages: {
  name: string;
  link: string; // Change this to string since it's a URL
  img: any; // Change this to any since img is an object
  imgDark: any; // Change this to any since imgDark is an object
}[] = [
  {
    img: MR,
    imgDark: MR,
    name: "Prothom Alo",
    link: "#",
  },
  {
    img: MR,
    imgDark: MR,
    name: "Bangladesh protidin",
    link: "#",
  },
  {
    img: MR,
    imgDark: MR,
    name: "Noya digonto",
    link: "#",
  },
  {
    img: MR,
    imgDark: MR,
    name: "Noya digonto",
    link: "#",
  },
  {
    img: MR,
    imgDark: MR,
    name: "Noya digonto",
    link: "#",
  },
  {
    img: MR,
    imgDark: MR,
    name: "Noya digonto",
    link: "#", 
  },
];

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="nc-AccountCommonLayout container">
      <div className="mt-5 sm:mt-5">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-2xl">
            <h2 className="text-3xl xl:text-4xl font-semibold">Live TV Channel</h2>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto pt-5 sm:pt-5 pb-10 lg:pb-10">
        <div className="space-y-10 sm:space-y-12 bg-white dark:bg-slate-700 p-5 rounded-xl">
          <div className="overflow-x-auto grid sm:grid-cols-3 md:grid-cols-4 gap-4">
            {pages.map((item, index) => (
              <Link key={index} href={item.link}>
                <a className={`block py-2 md:py-2 border-b-2 flex-shrink-0 text-sm sm:text-base ${
                  pathname === item.link
                    ? "border-primary-500 font-medium text-slate-900 dark:text-slate-200"
                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}>
                  <div className="max-w-sm p-6 bg-white border border-slate-200 rounded-lg shadow dark:bg-slate-800 dark:border-slate-700">
                    <NcImage
                      containerClassName="mb-4 sm:mb-2 max-w-[80px] mx-auto"
                      className="rounded-full"
                      src={item.img}
                      sizes="150px"
                      alt="HIW"
                    />
                    <h3 className="text-base font-semibold text-center">{item.name}</h3>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonLayout;
