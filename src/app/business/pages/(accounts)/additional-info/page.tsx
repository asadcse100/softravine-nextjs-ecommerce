"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { showErrorToast, showSuccessToast} from "@/app/admin/components/Toast";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/app/business/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/business/components/ui/form";

import Label from "@/app/business/components/Label/Label";
import React, { FC } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/business/components/ui/select";
import Textarea from "@/shared/Textarea/Textarea";

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
  // ...
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_emails: "",
      subscriber_emails: "",
      subject: "",
      content: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fetch data if editing an existing ticket
  useEffect(() => {
    if (id) {
      const fetchTicket = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
          const response = await fetch(`${apiUrl}/server/api/routes/business/additional-info/${id}`);
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
        ? `${apiUrl}/server/api/routes/business/additional-info/${id}`
        : `${apiUrl}/server/api/routes/business/additional-info`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to added additional information. Please try again.");
      }

      const result = await response.json();

      showSuccessToast(result.message || "added additional information successfully!");
      // router.push("/pages/blog_system/catadded additional informationegory");
      window.location.href = `${apiUrl}/pages/blog_system/productbid`;
    } catch (error) {
      showErrorToast("Error adding added additional information: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };
  
  const inputClass = "bg-zinc-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-900 dark:border-slate-700 dark:placeholder-slate-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  const selectClass = "dark:bg-slate-900 dark:border-slate-700 dark:placeholder-slate-700 dark:text-mute dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <div className={`nc-AccountPage `}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

          <div className="space-y-5 sm:space-y-5 bg-white dark:bg-slate-700 p-5 rounded-xl">
            {/* HEADING */}
            <h2 className="text-2xl sm:text-3xl font-semibold dark:text-slate-300">
              {id ? "Edit Additional infomation" : "Add Additional infomation"}
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
                          <FormLabel>Date of birth</FormLabel>
                        </div>
                        <div className="col-span-8">
                          <FormControl>
                            <Input type="date"
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

                <div className="flex flex-col gap-5.5 p-6.5 dark:text-slate-500">

                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid grid-cols-1 md:grid-cols-12">
                          <div className="col-span-3 mt-3">
                            <FormLabel>Division</FormLabel>
                          </div>
                          <div className="col-span-8">
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl className={selectClass}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Division" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Apple">Apple</SelectItem>
                                  <SelectItem value="m2@example.com">Pran</SelectItem>
                                  <SelectItem value="m22@example.com">Squre</SelectItem>
                                  <SelectItem value="m3@example.com">ACI</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-5.5 p-6.5 dark:text-slate-500">

                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid grid-cols-1 md:grid-cols-12">
                          <div className="col-span-3 mt-3">
                            <FormLabel>Zila</FormLabel>
                          </div>
                          <div className="col-span-8">
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl className={selectClass}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Zila" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Apple">Apple</SelectItem>
                                  <SelectItem value="m2@example.com">Pran</SelectItem>
                                  <SelectItem value="m22@example.com">Squre</SelectItem>
                                  <SelectItem value="m3@example.com">ACI</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-5.5 p-6.5 dark:text-slate-500">

                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid grid-cols-1 md:grid-cols-12">
                          <div className="col-span-3 mt-3">
                            <FormLabel>UpZila</FormLabel>
                          </div>
                          <div className="col-span-8">
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl className={selectClass}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select UpZila" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Apple">Apple</SelectItem>
                                  <SelectItem value="m2@example.com">Pran</SelectItem>
                                  <SelectItem value="m22@example.com">Squre</SelectItem>
                                  <SelectItem value="m3@example.com">ACI</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-1 md:grid-cols-12">
                        <div className="col-span-3 mt-3">
                          <FormLabel>Full Addess</FormLabel>
                        </div>
                        <div className="col-span-8">
                          <Textarea
                            className={inputClass}
                            placeholder="New york, USA"
                          />
                          {/* <Input className={inputClass} placeholder="Nominee Full Addess" /> */}
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
                          <FormLabel>About you</FormLabel>
                        </div>
                        <div className="col-span-8">
                          <Textarea
                            className={inputClass}
                            placeholder="New york, USA"
                          />
                          {/* <Input className={inputClass} placeholder="Nominee Full Addess" /> */}
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-2">
                  <ButtonPrimary>Update account</ButtonPrimary>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

