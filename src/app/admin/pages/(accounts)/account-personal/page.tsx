"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";

import Label from "@/app/admin/components/Label/Label";
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
} from "@/app/admin/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/admin/components/ui/select";

const formSchema = z.object({
  user_emails: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
  subscriber_emails: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
  subject: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
  content: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
});

export default function AddOrEdit() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

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
          const response = await fetch(`${apiUrl}/server/api/routes/admin/account-personal/${id}`);
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
        ? `${apiUrl}/server/api/routes/admin/account-personal/${id}`
        : `${apiUrl}/server/api/routes/admin/account-personal`;

      const response = await fetch(url, {
        method,
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
            <h3 className="font-medium text-black dark:text-white">
              {id ? "Edit Personal infomation" : "Add Personal infomation"}
            </h3>
            <div className="flex flex-col md:flex-row">

              <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-3">
                {[
                  { name: "father_name", label: "Father Name" },
                  { name: "mother_name", label: "Mother Name" },
                  { name: "date_of_birth", label: "Date of birth" },
                  { name: "gender", label: "Gender" },
                ].map((field) => (
                  <div
                    key={field.name}
                    className="mt-3 flex flex-col gap-5.5 p-6.5"
                  >
                    <FormField
                      control={form.control}
                      name={field.name}
                      render={({ field: fieldProps }) => (
                        <FormItem>
                          <div className="grid grid-cols-1 md:grid-cols-12">
                            <div className="col-span-3 mt-1">
                              <FormLabel>{field.label}</FormLabel>
                            </div>
                            <div className="col-span-8">
                              <FormControl>
                                {field.name === "father_name" ? (
                                  <Input type="text"
                                    className={inputClass}
                                    placeholder={field.label}
                                    {...fieldProps}
                                  />
                                ) : field.name === "mother_name" ? (
                                  <Input type="text"
                                    className={inputClass}
                                    placeholder={field.label}
                                    {...fieldProps}
                                  />
                                ) : field.name === "date_of_birth" ? (
                                  <Input type="date"
                                    className={inputClass}
                                    placeholder={field.label}
                                    {...fieldProps}
                                  />
                                ) : field.name === "gender" ? (
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
                                ) : null}

                              </FormControl>
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}

                {/* <FormField
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
                /> */}

                {/* <FormField
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
                /> */}

                {/* <FormField
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
                /> */}

                {/* <FormField
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
                /> */}

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

