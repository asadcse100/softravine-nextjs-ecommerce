import Label from "@/components/Label/Label";
import React from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";

const AccountPass = () => {
  return (
    <div className="space-y-5 sm:space-y-5 bg-white dark:bg-gray-700 p-5 rounded-xl">
      {/* HEADING */}
      <h2 className="text-2xl sm:text-3xl font-semibold">
        Recharge Pack Seller Application
      </h2>
      <div className=" max-w-xl space-y-6">
        <div>
          <Input type="text" className="mt-1" placeholder="Your Name" />
        </div>
        <div>
          <Input
            type="text"
            className="mt-1"
            placeholder="Your Business Name"
          />
        </div>
        <div>
          <Input
            type="text"
            className="mt-1"
            placeholder="Phone Number"
          />
        </div>
        <div>
          <Input
            type="number"
            className="mt-1"
            placeholder="Your Localtion/Adress"
          />
        </div>
        <div>
          <Input
            type="number"
            className="mt-1"
            placeholder="Robi Reharge Agent number"
          />
        </div>
        <div>
          <Input
            type="number"
            className="mt-1"
            placeholder="GP Reharge Agent number"
          />
        </div>
        <div>
          <Input
            type="number"
            className="mt-1"
            placeholder="BL Reharge Agent number"
          />
        </div>
        <div>
          <Input
            type="number"
            className="mt-1"
            placeholder="Airtel Reharge Agent number"
          />
        </div>

        <div>
          <Label>Attach your photo</Label>
          <Input
            type="file"
            className="mt-1"
          />
        </div>

        <div>
          <Label>Attach your NID Photo</Label>
          <Input
            type="file"
            className="mt-1"
          />
        </div>
        <div>
          <Label>Attach your Trade License Photo</Label>
          <Input
            type="file"
            className="mt-1"
          />
        </div>
        <div className="pt-2">
          <ButtonPrimary>Submit Application</ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default AccountPass;
