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
