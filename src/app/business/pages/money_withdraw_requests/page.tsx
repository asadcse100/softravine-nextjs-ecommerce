import React from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Breadcrumb from "@/app/business/components/Breadcrumbs/Breadcrumb"
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const formSchema = z.object({
  product_name: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  brand: z.string().min(3, {
    message: "Brand must be at least 3 characters.",
  }),
});

const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (values) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

  try {
    const method = id ? "PUT" : "POST";
    const url = id
      ? `${apiUrl}/server/api/routes/business/money_withdraw_requests/${id}`
      : `${apiUrl}/server/api/routes/business/money_withdraw_requests`;

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error("Failed to money withdraw. Please try again.");
    }

    const result = await response.json();

    showSuccessToast(result.message || "withdraw successfully!");
    // router.push("/admin/pages/blog_system/category");
    window.location.href = `${apiUrl}/admin/pages/blog_system/withdraw`;
  } catch (error) {
    showErrorToast("Error withdraw: " + (error instanceof Error ? error.message : "Unknown error"));
  }
};

const AccountBilling = () => {
  return (
    <div className="space-y-10 sm:space-y-12 bg-white dark:bg-gray-700 p-5 rounded-xl">
      {/* HEADING */}
      <h2 className="text-2xl sm:text-3xl font-semibold">
        {id ? "Edit Payments & payouts" : "Add Payments & payouts"}
      </h2>
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
