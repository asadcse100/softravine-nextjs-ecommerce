import Label from "@/app/frontend/components/Label/Label";
import React from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";

const AccountPass = () => {
  return (
    <div className="space-y-10 sm:space-y-12 bg-white dark:bg-gray-700 p-5 rounded-xl">
      {/* HEADING */}
      {/* <h2 className="text-2xl sm:text-3xl font-semibold">
        Update your password
      </h2> */}
      <div className=" max-w-xl space-y-2">
        <div>
          <Label>Mobile Number</Label>
          <Input type="text" className="mt-1" />
        </div>
        <div>
          <Label>Amount</Label>
          <Input type="text" className="mt-1" placeholder="Amount"/>
        </div>

        <div>
              <Label>Mobile Operator</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-map-signs"></i>
                </span>
                <Select
                  className="!rounded-l-none"
                >
                  <option value="Grameen Phone">Grameen Phone</option>
                  <option value="Robi">Robi</option>
                  <option value="Airtel">Airtel</option>
                  <option value="Banglalink">Banglalink</option>
                  <option value="Teletalk">Teletalk</option>
                  <option value="Siktto">Siktto</option>
                </Select>
              </div>
            </div>

        <div>
              <Label>Pre/Post Paid</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-map-signs"></i>
                </span>
                <Select
                  className="!rounded-l-none"
                >
                  <option value="Pre Paid">Pre Paid</option>
                  <option value="Post Paid">Post Paid</option>
                </Select>
              </div>
            </div>

        <div className="pt-2">
          <ButtonPrimary>Next Step</ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default AccountPass;
