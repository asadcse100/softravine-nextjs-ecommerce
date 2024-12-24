"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { showErrorToast, showSuccessToast} from "@/app/admin/components/Toast";

import Label from "@/app/customer/components/Label/Label";
import React, { FC } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/customer/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/customer/components/ui/select";

const formSchema = z.object({
  user_emails: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  subscriber_emails: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  subject: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  content: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
});

export default function Addnew() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_emails: "",
      subscriber_emails: "",
      subject: "",
      content: "",
    },
  });

  // 2. Define a submit handler.
  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   console.log(values);
  // }

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (values) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

    try {
      const response = await fetch(`${apiUrl}/server/api/routes/admin/blogs/blogCategories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to personal information. Please try again.");
      }

      const result = await response.json();

      showSuccessToast(result.message || "personal information successfully!");
      // router.push("/admin/pages/blog_system/catpersonal informationegory");
      window.location.href = `${apiUrl}/admin/pages/blog_system/productbid`;
    } catch (error) {
      showErrorToast("Error adding personal information: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  const inputClass = "bg-zinc-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-900 dark:border-slate-700 dark:placeholder-slate-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  const selectClass = "dark:bg-slate-900 dark:border-slate-700 dark:placeholder-slate-700 dark:text-mute dark:focus:ring-blue-500 dark:focus:border-blue-500";
  return (
    <div className={`nc-AccountPage `}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

          <div className="space-y-5 sm:space-y-5 bg-white dark:bg-boxdark p-5 rounded-xl">
            {/* HEADING */}
            <h2 className="text-2xl sm:text-3xl font-semibold dark:text-slate-300">
              Personal infomation
            </h2>
            <div className="flex flex-col md:flex-row">

              <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-3">

                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-1 md:grid-cols-12">
                        <div className="col-span-3 mt-3">
                          <FormLabel>Father Name</FormLabel>
                        </div>
                        <div className="col-span-8">
                          <FormControl>
                            <Input
                              className={inputClass}
                              placeholder="Father Name"
                              {...field}
                            />
                          </FormControl>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-1 md:grid-cols-12">
                        <div className="col-span-3 mt-3">
                          <FormLabel>Mother Name</FormLabel>
                        </div>
                        <div className="col-span-8">
                          <FormControl>
                            <Input
                              className={inputClass}
                              placeholder="Mother Name"
                              {...field}
                            />
                          </FormControl>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-1 md:grid-cols-12">
                        <div className="col-span-3 mt-3">
                          <FormLabel>Date of birth</FormLabel>
                        </div>
                        <div className="col-span-8">
                          <FormControl>
                            <Input
                              type="date"
                              className={inputClass}
                              placeholder="Date of birth"
                              {...field}
                            />
                          </FormControl>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-1 md:grid-cols-12">
                        <div className="col-span-3 mt-3">
                          <FormLabel>Gender</FormLabel>
                        </div>
                        <div className="col-span-8">
                          <FormControl className={inputClass}>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Apple">Male</SelectItem>
                                <SelectItem value="m2@example.com">Female</SelectItem>
                                <SelectItem value="m22@example.com">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* </div> */}

                <div className="pt-2">
                  <ButtonPrimary>Save</ButtonPrimary>
                </div>
              </div>
            </div>
          </div>

        </form>
      </Form>
    </div>
  );
};

