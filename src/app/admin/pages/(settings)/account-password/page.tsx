import Label from "@/app/admin/components/Label/Label";
import React from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
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
          const response = await fetch(`${apiUrl}/server/api/routes/admin/account-password/${id}`);
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
    <div className="space-y-10 sm:space-y-12 bg-white dark:bg-slate-700 p-5 rounded-xl">
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

