import Label from "@/app/seller/components/Label/Label";
import React, { FC } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import Textarea from "@/shared/Textarea/Textarea";
import { avatarImgs } from "@/contains/fakeData";
import Image from "next/image";

const AccountAddressPage = () => {
  return (
    <div className={`nc-AccountPage `}>
      <div className="space-y-5 sm:space-y-5 bg-slate-300 dark:bg-slate-700 p-5 rounded-xl">
        {/* HEADING */}
        <h2 className="text-2xl sm:text-3xl font-semibold dark:text-slate-300">
          Full Address
        </h2>
        <div className="flex flex-col md:flex-row">

          <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">

            <div>
              <Label className="dark:text-slate-400">Division</Label>
              <div className="mt-1.5 flex dark:text-slate-500">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-map-signs"></i>
                </span>
                <Select
                  className="!rounded-l-none"
                  defaultValue="New york, USA"
                >
                  <option value="Dhaka">Dhaka</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Mymensingh">Mymensingh</option>
                </Select>
              </div>
            </div>

            <div>
              <Label className="dark:text-slate-400">Zila</Label>
              <div className="mt-1.5 flex dark:text-slate-500">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-map-signs"></i>
                </span>
                <Select
                  className="!rounded-l-none"
                  defaultValue="New york, USA"
                >
                  <option value="Natore">Natore</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Mymensingh">Mymensingh</option>
                </Select>
              </div>
            </div>

            <div>
              <Label className="dark:text-slate-400">UpZila</Label>
              <div className="mt-1.5 flex dark:text-slate-500">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-map-signs"></i>
                </span>
                <Select
                  className="!rounded-l-none"
                  defaultValue="New york, USA"
                >
                  <option value="Bagatipara">Bagatipara</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Mymensingh">Mymensingh</option>
                </Select>
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

export default AccountAddressPage;
