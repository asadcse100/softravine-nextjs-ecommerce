import React from "react";
import { useState, useEffect } from 'react';
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Breadcrumb from "@/app/business/components/Breadcrumbs/Breadcrumb"
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { showErrorToast, showSuccessToast} from "@/app/admin/components/Toast";

const formSchema = z.object({
  name: z.string().min(4, {
    message: "Product Name must be at least 4 characters.",
  }),
  brand_id: z.string().min(1, {
    message: "Select Brand",
  }),
});

const AccountBilling = () => {
  
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (values) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
    
    if (!apiUrl) {
      showErrorToast("API URL is not configured.");
      return;
    }
  
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/server/api/routes/admin/blogs/blogCategories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to add purchase. Please try again.");
      }

      const result = await response.json();

      showSuccessToast(result.message || "purchase added successfully!");
      // router.push("/admin/pages/blog_system/purchase");
      window.location.href = `${apiUrl}/admin/pages/blog_system/purchase`;
    } catch (error) {
      showErrorToast("Error adding purchase: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  return (
    <div className="space-y-10 sm:space-y-12 bg-white dark:bg-gray-700 p-5 rounded-xl">
      {/* HEADING */}
      <h2 className="text-2xl sm:text-3xl font-semibold">Payments & payouts</h2>
      <div className="max-w-2xl prose prose-slate dark:prose-invert">
        <span className="">
          {`When you receive a payment for a order, we call that payment to you a
          "payout." Our secure payment system supports several payout methods,
          which can be set up below. Go to FAQ.`}
          <br />
          <br />
          To get paid, you need to set up a payout method releases payouts about
          24 hours after a guest’s scheduled time. The time it takes for the
          funds to appear in your account depends on your payout method.{` `}
          <a href="##">Learn more</a>
        </span>
        <div className="pt-10">
          <ButtonPrimary>Add payout mothod</ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default AccountBilling;
