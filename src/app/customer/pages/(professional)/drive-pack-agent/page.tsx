"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showErrorToast, showSuccessToast} from "@/app/admin/components/Toast";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/customer/components/ui/form";
import React from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const formSchema = z.object({
  code: z.string().min(10, {
    message: "code must be at least 10 characters.",
  }),
  product_ids: z.string().min(10, {
    message: "product_ids must be at least 10 characters.",
  }),
  date_range: z.string().min(10, {
    message: "date_range must be at least 10 characters.",
  }),
  discount: z.string().min(10, {
    message: "discount must be at least 10 characters.",
  }),
  min_buy: z.string().min(10, {
    message: "discount must be at least 10 characters.",
  }),
  max_discount: z.string().min(10, {
    message: "max_discount must be at least 10 characters.",
  }),
});

export default function AddOrEdit() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      product_ids: "",
      date_range: "",
      discount: "",
      min_buy: "",
      max_discount: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fetch data if editing an existing ticket
  useEffect(() => {
    if (id) {
      const fetchTicket = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
          const response = await fetch(`${apiUrl}/server/api/routes/customer/drive-pack-agent/${id}`);
          const data = await response.json();
          form.reset(data); // Populate form with existing data
        } catch (error) {
          showErrorToast("Failed to fetch blog category data.");
        }
      };
      fetchTicket();
    }
  }, [id, form]);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (values) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

    try {
      const method = id ? "PUT" : "POST";
      const url = id
        ? `${apiUrl}/server/api/routes/customer/drive-pack-agent/${id}`
        : `${apiUrl}/server/api/routes/customer/drive-pack-agent`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to drive pack. Please try again.");
      }

      const result = await response.json();

      showSuccessToast(result.message || "drive pack successfully!");
      // router.push("/admin/pages/blog_system/catdrive packegory");
      window.location.href = `${apiUrl}/admin/pages/blog_system/productbid`;
    } catch (error) {
      showErrorToast("Error adding drive pack: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  return (
    <div className="space-y-5 sm:space-y-5 bg-white dark:bg-slate-700 p-5 rounded-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

          <h2 className="text-2xl sm:text-3xl font-semibold dark:text-slate-100">
            {id ? "Edit Recharge Pack Seller Application" : "Add Recharge Pack Seller Application"}
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
              <FormLabel>Attach your photo</FormLabel>
              <Input
                type="file"
                className="mt-1"
              />
            </div>

            <div>
              <FormLabel>Attach your NID Photo</FormLabel>
              <Input
                type="file"
                className="mt-1"
              />
            </div>
            <div>
              <FormLabel>Attach your Trade License Photo</FormLabel>
              <Input
                type="file"
                className="mt-1"
              />
            </div>
            <div className="pt-2">
              <ButtonPrimary>Submit Application</ButtonPrimary>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

