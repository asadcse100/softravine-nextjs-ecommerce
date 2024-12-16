import Label from "@/app/admin/components/Label/Label";
import React, { FC } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import Textarea from "@/shared/Textarea/Textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import Image from "next/image";

const onSubmit: SubmitHandler<FormData> = async (values) => {

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  
  try {
    const response = await fetch(`${apiUrl}/server/api/routes/admin/blogs/blogCategories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Failed to add category');
    }

    const result = await response.json();
    toast.success(result.message || "Category added successfully!");

    // Redirect to another page after success
    window.location.href = `${apiUrl}/admin/pages/blog_system/category`;
  } catch (error) {
    toast.error("Error adding category: " + (error as Error).message);
  }
};

const AccountNomineePage = () => {
  return (
    <div className={`nc-AccountPage `}>
      <div className="space-y-5 sm:space-y-5 bg-slate-300 dark:bg-slate-700 p-5 rounded-xl">
        {/* HEADING */}
        <h2 className="text-2xl sm:text-3xl font-semibold">
          Nominee infomation
        </h2>
        <div className="flex flex-col md:flex-row">

          <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
            <div>
              <Label>Nominee Full Name</Label>
              <Input className="mt-1.5" defaultValue="Write your Nominee Full Name" />
            </div>

            <div>
              <Label>Relation</Label>
              <Input className="mt-1.5" defaultValue="Write Relation With You" />
            </div>

            {/* ---- */}
            <div className="max-w-lg">
              <Label> Nominee Date of birth</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-calendar"></i>
                </span>
                <Input
                  className="!rounded-l-none"
                  type="date"
                  defaultValue="1990-07-22"
                />
              </div>
            </div>

            <div>
              <Label>Nominee Full Addess</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-map-signs"></i>
                </span>
                <Textarea
                  className="!rounded-l-none"
                  defaultValue="New york, USA"
                />
              </div>
            </div>

            {/* ---- */}
            <div>
              <Label>Gender</Label>
              <Select className="mt-1.5">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
            </div>

            {/* ---- */}
            <div>
              <Label>Nominee Phone number</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-phone-volume"></i>
                </span>
                <Input className="!rounded-l-none" defaultValue="003 888 232" />
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
