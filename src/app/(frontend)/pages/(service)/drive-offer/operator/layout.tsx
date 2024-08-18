"use client";

import { Route } from "@/routers/types";
import NcImage from "@/shared/NcImage/NcImage";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FC } from "react";
import MR from "@/images/MR.png";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";

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
    name: "Grameen Phone",
    link: "/pages/drive-offer/operator/gp",
  },
  {
    img: MR,
    imgDark: MR,
    name: "Robi",
    link: "/pages/drive-offer/operator/robi",
  },
  {
    img: MR,
    imgDark: MR,
    name: "Airtel",
    link: "/pages/drive-offer/operator/airtel",
  },
  {
    img: MR,
    imgDark: MR,
    name: "Banglalink",
    link: "/pages/drive-offer/operator/bl",
  },
  {
    img: MR,
    imgDark: MR,
    name: "Teletalk",
    link: "/pages/drive-offer/operator/teletalk",
  },
];

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="nc-AccountCommonLayout">
      <div className="max-w-4xl mx-auto">
        {/* <div className="max-w-2xl">
            <h2 className="text-3xl xl:text-4xl font-semibold">Drive Offers</h2>
          </div> */}
        <h2 className="text-xl sm:text-xl font-semibold">
          Choose the Operator
        </h2>

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
      </div>
      <div className="flex py-3">
        <div className="px-5">
          <ButtonSecondary
            sizeClass="py-2.5 px-10 sm:px-10"
            fontSize="text-sm font-medium"
          >
            Bundle
          </ButtonSecondary>
        </div>
        <div className="px-5">
          <ButtonSecondary
            sizeClass="py-2.5 px-10 sm:px-10"
            fontSize="text-sm font-medium"
          >
            Internet
          </ButtonSecondary>
        </div>
        <div className="px-5">
          <ButtonSecondary
            sizeClass="py-2.5 px-10 sm:px-10"
            fontSize="text-sm font-medium"
          >
            Minute
          </ButtonSecondary>
        </div>
      </div>

      <div className="max-w-4xl mx-auto pt-5 sm:pt-5 pb-10 lg:pb-10">
        {children}
      </div>
    </div>
  );
};

export default CommonLayout;
