"use client";

import React from "react";
import { usePathname } from "next/navigation";
import HeaderLogged from "@/app/(frontend)/components/Header/HeaderLogged";
import SubHeader from "@/app/(frontend)/components/Header/SubHeader";
import { useThemeMode } from "@/hooks/useThemeMode";

const SubSiteHeader = () => {
  useThemeMode();

  return <SubHeader />;
};

export default SubSiteHeader;
