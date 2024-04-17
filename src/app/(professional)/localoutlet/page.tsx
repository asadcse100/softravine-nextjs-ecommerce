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
        Local Outlet Application From
      </h2>
      <div className=" max-w-xl space-y-6">
        <div>
          <Input type="text" className="mt-1" placeholder="Your Name" />
        </div>
        <div>
          <Input
            type="text"
            className="mt-1"
            placeholder="Your Shop/Business Name"
          />
        </div>
        <div>
          <Input
            type="number"
            className="mt-1"
            placeholder="Company Commission"
          />
        </div>
        <div>
          <Input
            type="number"
            className="mt-1"
            placeholder="Your Customer Discound"
          />
        </div>
        <div>
          <Input
            type="number"
            className="mt-1"
            placeholder="Your National Id Number"
          />
        </div>
        <div>
          <Select className="mt-1.5">
            <option value="Select Business Category">
              Select Business Category
            </option>
            <option value="Auto Mobile">Auto Mobile</option>
            <option value="Baby Food">Baby Food</option>
          </Select>
        </div>
        <div>
          <textarea
            name=""
            id=""
            cols="60"
            rows="5"
            placeholder="What is product in your business?"
          ></textarea>
        </div>
        <div>
          <Select className="mt-1.5">
            <option value="Select Business Category">
              Select City/Division
            </option>
            <option value="Division">Division</option>
            <option value="City">City</option>
          </Select>
        </div>
        <div>
          <Select className="mt-1.5">
            <option value="Select Business Category">
              Select Your Division
            </option>
            <option value="Dhaka">Dhaka</option>
            <option value="Rajshahi">Rajshahi</option>
          </Select>
        </div>
        <div>
          <Select className="mt-1.5">
            <option value="Select Business Category">Select Your Zila</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Natore">Natore</option>
          </Select>
        </div>
        <div>
          <Select className="mt-1.5">
            <option value="Select Business Category">Select Your Thana</option>
            <option value="Dhanmondi">Dhanmondi</option>
            <option value="Bagatipara">Bagatipara</option>
          </Select>
        </div>
        <div>
          <Select className="mt-1.5">
            <option value="Select Business Category">
              Select Your Union/Word
            </option>
            <option value="Dayarampur">Dayarampur</option>
            <option value="Chadpur">Chadpur</option>
          </Select>
        </div>
        <div>
          <textarea
            name=""
            id=""
            cols="60"
            rows="5"
            placeholder="How to get customer very easy plaes discribe it!"
          ></textarea>
        </div>
        <div>
          <Label>Give your photo</Label>
          <Input
            type="file"
            className="mt-1"
          />
        </div>
        <div>
          <Label>Give your Organization Photo</Label>
          <Input
            type="file"
            className="mt-1"
          />
        </div>
        <div>
          <Label>Give your NID Photo</Label>
          <Input
            type="file"
            className="mt-1"
          />
        </div>
        <div>
          <Label>Give your Trade License Photo</Label>
          <Input
            type="file"
            className="mt-1"
          />
        </div>
        <div className="pt-2">
          <ButtonPrimary>Application For Outlet</ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default AccountPass;
