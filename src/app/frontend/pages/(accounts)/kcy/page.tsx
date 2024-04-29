import Label from "@/app/seller/components/Label/Label";
import React, { FC } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import Textarea from "@/shared/Textarea/Textarea";
import { avatarImgs } from "@/contains/fakeData";
import Image from "next/image";

const AccountKCYPage = () => {
  return (
    <div className={`nc-AccountPage `}>
      <div className="space-y-5 sm:space-y-5 bg-gray-300 dark:bg-gray-700 p-5 rounded-xl">
        {/* HEADING */}
        <h2 className="text-2xl sm:text-3xl font-semibold">
          KCY
        </h2>
        <div className="flex flex-col md:flex-row">

          <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
            <div>
              <Label>NID front Part</Label>
              <Input className="mt-1.5" type="file"/>
            </div>
            <div>
              <Label>NID back Part</Label>
              <Input className="mt-1.5" type="file"/>
            </div>

            <div className="pt-2">
              <ButtonPrimary>Save</ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountKCYPage;
