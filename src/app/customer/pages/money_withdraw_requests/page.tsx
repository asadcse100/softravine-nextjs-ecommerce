import React from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AddOrEdit() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

    const [isLoading, setIsLoading] = useState(false);
  
    // Fetch data if editing an existing ticket
    useEffect(() => {
      if (id) {
        const fetchTicket = async () => {
          try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
            const response = await fetch(`${apiUrl}/server/api/routes/customer/money_withdraw_requests/${id}`);
            const data = await response.json();
            form.reset(data); // Populate form with existing data
          } catch (error) {
            showErrorToast("Failed to fetch blog category data.");
          }
        };
        fetchTicket();
      }
    }, [id, form]);

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

