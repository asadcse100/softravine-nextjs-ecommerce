import Label from "@/app/admin/components/Label/Label";
import React from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";

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

const AccountPass = () => {
  return (
    <div className="space-y-10 sm:space-y-12 bg-white dark:bg-gray-700 p-5 rounded-xl">
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
