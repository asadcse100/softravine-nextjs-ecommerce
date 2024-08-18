import Label from "@/app/(frontend)/components/Label/Label";
import React from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Link from "next/link";

const AccountPass = () => {
  return (

    <div className="flex min-h-screen space-y-10 sm:space-y-12 bg-white dark:bg-slate-700 p-5 rounded-xl">
      <div className="nc-AccountCommonLayout container">
        <div className="mt-5 sm:mt-5">
          <div className="max-w-4xl mx-auto">
            <div className="max-w-2xl">
              <h2 className="text-3xl xl:text-4xl font-semibold">This Feature in future plan</h2>
            </div>
            <Link href="#" className="text-slate-400">Go Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPass;
