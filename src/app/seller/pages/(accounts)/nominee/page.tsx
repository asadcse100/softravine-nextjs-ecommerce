import Label from "@/app/seller/components/Label/Label";
import React, { FC } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import Textarea from "@/shared/Textarea/Textarea";
import { avatarImgs } from "@/contains/fakeData";
import Image from "next/image";

const AccountNomineePage = () => {
  return (
    <div className={`nc-AccountPage `}>
      <div className="space-y-5 sm:space-y-5 bg-white dark:bg-slate-700 p-5 rounded-xl">
        {/* HEADING */}
        <h2 className="text-2xl sm:text-3xl font-semibold dark:text-slate-300">
          Nominee infomation
        </h2>
        <div className="flex flex-col md:flex-row">

          <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
            <div>
              <Label className="dark:text-slate-400">Nominee Full Name</Label>
              <Input className="mt-1.5" placeholder="Write your Nominee Full Name" />
            </div>

            <div>
              <Label className="dark:text-slate-400">Relation</Label>
              <Input className="mt-1.5" placeholder="Write Relation With You" />
            </div>

            {/* ---- */}
            <div className="max-w-lg">
              <Label className="dark:text-slate-400"> Nominee Date of birth</Label>
              <div className="mt-1.5 flex dark:text-slate-500">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-calendar"></i>
                </span>
                <Input
                  className="!rounded-l-none"
                  type="date"
                  placeholder="1990-07-22"
                />
              </div>
            </div>

            <div>
              <Label className="dark:text-slate-400">Nominee Full Addess</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-map-signs"></i>
                </span>
                <Textarea
                  className="!rounded-l-none"
                  placeholder="New york, USA"
                />
              </div>
            </div>

            {/* ---- */}
            <div>
              <Label className="dark:text-slate-400">Gender</Label>
              <Select className="mt-1.5 dark:text-slate-500">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
            </div>

            {/* ---- */}
            <div>
              <Label className="dark:text-slate-400">Nominee Phone number</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-phone-volume"></i>
                </span>
                <Input className="!rounded-l-none" placeholder="003 888 232" />
              </div>
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

export default AccountNomineePage;
