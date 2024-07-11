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
import Textarea from "@/shared/Textarea/Textarea";

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
            Local Outlet Application From
          </h2>
          <div className="max-w-xl space-y-6">
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
              <Textarea placeholder="What is product in your business?">

              </Textarea>
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
              <Textarea placeholder="How to get customer very easy plaes discribe it!">

              </Textarea>
            </div>
            <div>
              <FormLabel>Give your photo</FormLabel>
              <Input
                type="file"
                className="mt-1"
              />
            </div>
            <div>
              <FormLabel>Give your Organization Photo</FormLabel>
              <Input
                type="file"
                className="mt-1"
              />
            </div>
            <div>
              <FormLabel>Give your NID Photo</FormLabel>
              <Input
                type="file"
                className="mt-1"
              />
            </div>
            <div>
              <FormLabel>Give your Trade License Photo</FormLabel>
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
