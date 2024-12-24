"use client";

import { Route } from "@/routers/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FC } from "react";

export interface CommonLayoutProps {
  children?: React.ReactNode;
}


const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="nc-AccountCommonLayout container">
      <div className="mt-5 sm:mt-5">
        <div className="max-w-4xl mx-auto pt-5 sm:pt-5 pb-10 lg:pb-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CommonLayout;
