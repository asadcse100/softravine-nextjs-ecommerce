"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/seller/components/ui/form";
import React from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";

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

const AccountPass = () => {
  // 1. Define your form.
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

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="space-y-5 sm:space-y-5 bg-white dark:bg-slate-700 p-5 rounded-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

          <h2 className="text-2xl sm:text-3xl font-semibold dark:text-slate-100">
            Recharge Pack Seller Application
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

export default AccountPass;
