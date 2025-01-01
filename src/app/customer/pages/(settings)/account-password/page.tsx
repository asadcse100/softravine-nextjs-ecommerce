import Label from "@/app/customer/components/Label/Label";
import React from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const AccountPass = () => {
  return (
    <div className="space-y-10 sm:space-y-12 bg-white dark:bg-slate-700 p-5 rounded-xl">
      {/* HEADING */}
      <h2 className="text-2xl sm:text-3xl font-semibold">
        Update your password
      </h2>
      <div className=" max-w-xl space-y-6">
        <div>
          <Label>Current password</Label>
          <Input type="password" className="mt-1.5" />
        </div>
        <div>
          <Label>New password</Label>
          <Input type="password" className="mt-1.5" />
        </div>
        <div>
          <Label>Confirm password</Label>
          <Input type="password" className="mt-1.5" />
        </div>
        <div className="pt-2">
          <ButtonPrimary>Update password</ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default AccountPass;
