import Label from "@/app/frontend/components/Label/Label";
import React from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";

const AccountPass = () => {
  return (
    <div className="space-y-10 sm:space-y-12 bg-white dark:bg-slate-700 p-5 rounded-xl">
      <div className="max-w-xl space-y-6">
        <div className="space-y-5 sm:space-y-6 bg-white dark:bg-slate-700 p-5 rounded-xl">
          <div className="max-w-sm">
            <Label>Where From</Label>
            <Select className="mt-1">
              <option value="Select Place">
                Select Place
              </option>
              <option value="Dhaka">Dhaka</option>
              <option value="Rajshahi">Rajshahi</option>
            </Select>
          </div>
          <div className="max-w-sm">
            <Label>Where To</Label>
            <Select className="mt-1">
              <option value="Select Place">
                Select Place
              </option>
              <option value="Dhaka">Dhaka</option>
              <option value="Rahshahi">Rahshahi</option>
            </Select>
          </div>
        </div>
        <div>
          <Label>Travel Date</Label>
          <Input type="date" className="mt-1" />
        </div>
        <div>
          <Label>Return Date</Label>
          <Input type="date" className="mt-1" />
        </div>
        <div>
          <Label>Ticket Category</Label>
          <Select className="mt-1">
            <option value="Select Ticket Category">
              Select Ticket Category
            </option>
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
            <option value="Premium">Premium</option>
            <option value="First Class">First Class</option>
          </Select>
        </div>
        <div>
          <Label>Passenger Number</Label>
          <Input type="namber" className="mt-1" />
        </div>
        <div className="pt-2">
          <ButtonPrimary>Submit</ButtonPrimary>
        </div>
        <div className="pt-2">
          <ButtonPrimary>Your Request Show</ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default AccountPass;
