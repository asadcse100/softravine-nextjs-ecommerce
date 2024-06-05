import React from "react";
import Sidebar from "@/app/seller/components/Sidebar";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Dashboard from "@/app/seller/components/Dashboard/page";

function PageHome() {
  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <Dashboard />
    </div>
  );
}

export default PageHome;
