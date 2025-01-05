"use client";

import Label from "@/app/business/components/Label/Label";
import React, { FC } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Textarea from "@/shared/Textarea/Textarea";
import { avatarImgs } from "@/contains/fakeData";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/business/components/ui/select";
import Breadcrumb from "@/app/business/components/Breadcrumbs/Breadcrumb";
import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";

const formSchema = z.object({
  code: z.string().min(1, {
    message: "code must be at least 1 characters.",
  }),
  product_ids: z.string().min(1, {
    message: "product_ids must be at least 1 characters.",
  }),
  date_range: z.string().min(1, {
    message: "date_range must be at least 1 characters.",
  }),
  discount: z.string().min(1, {
    message: "discount must be at least 1 characters.",
  }),
  min_buy: z.string().min(1, {
    message: "discount must be at least 1 characters.",
  }),
  max_discount: z.string().min(1, {
    message: "max_discount must be at least 1 characters.",
  }),
});

export default function AccountPage() {
  // const AccountPage = () => {
  const router = useRouter();

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
          const response = await fetch(`${apiUrl}/server/api/routes/business/account/${id}`);
          const data = await response.json();
          form.reset(data); // Populate form with existing data
        } catch (error) {
          showErrorToast("Failed to fetch blog category data.");
        }
      };
      fetchTicket();
    }
  }, [id, form]);

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      showErrorToast("API URL is not configured.");
      return;
    }

    try {
      const method = id ? "PUT" : "POST";
      const url = id
        ? `${apiUrl}/server/api/routes/admin/business/account/${id}`
        : `${apiUrl}/server/api/routes/admin/business/account`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add account. Please try again.");
      }

      const result = await response.json();

      showSuccessToast(result.message || "account added successfully!");
      router.push("/admin/pages/account");
    } catch (error) {
      showErrorToast("Error adding account: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  }

  const inputClass = "bg-zinc-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-900 dark:border-slate-700 dark:placeholder-slate-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  const selectClass = "dark:bg-slate-900 dark:border-slate-700 dark:placeholder-slate-700 dark:text-mute dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <div className="{`nc-AccountPage `}">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-5 sm:space-y-5 bg-white dark:bg-boxdark p-5 rounded-md">
            {/* HEADING */}
            <h2 className="text-2xl sm:text-3xl font-semibold dark:text-slate-300">
              {id ? "Edit Account infomation" : "Add Account infomation"}
            </h2>
            <div className="flex flex-col md:flex-row">
              <div className="flex-shrink-0 flex items-start">
                {/* AVATAR */}
                <div className="relative rounded-full overflow-hidden flex">
                  <Image
                    src={avatarImgs[2]}
                    alt="avatar"
                    width={128}
                    height={128}
                    className="w-32 h-32 rounded-full object-cover z-0"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer dark:text-slate-300">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span className="mt-1 text-xs ">Change Image</span>
                  </div>
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-3">
                {[
                  { name: "full_name", label: "Full Name" },
                  { name: "email", label: "Email" },
                  { name: "phone", label: "Phone number" },
                  { name: "full_address", label: "Full Address" },
                  { name: "about_you", label: "About You" },
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
                                {field.name === "full_name" ? (
                                  <Input type="text"
                                    className={inputClass}
                                    placeholder={field.label}
                                    {...fieldProps}
                                  />
                                ) : field.name === "email" ? (
                                  <Input type="email"
                                    className={inputClass}
                                    placeholder={field.label}
                                    {...fieldProps}
                                  />
                                ) : field.name === "phone" ? (
                                  <Input type="phone"
                                  className={inputClass}
                                  placeholder={field.label}
                                  {...fieldProps}
                                  />
                                ) : field.name === "full_address" ? (
                                  <Textarea/>
                                ) : field.name === "about_you" ? (
                                  <Textarea/>
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
                          <FormLabel>Full name</FormLabel>
                        </div>
                        <div className="col-span-8">
                          <FormControl>
                            <Input
                              className={inputClass}
                              placeholder="Full Name"
                              {...field}
                            />
                          </FormControl>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                {/* ---- */}

                {/* ---- */}
                {/* <div>
                  <Label className="dark:text-slate-400">Email</Label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                      <i className="text-2xl las la-envelope"></i>
                    </span>
                    <Input
                      className="!rounded-l-none"
                      placeholder="example@email.com"
                    />

                    
                  </div>
                </div>
                 */}
                {/* <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-1 md:grid-cols-12">
                        <div className="col-span-3 mt-3">
                          <FormLabel>Email</FormLabel>
                        </div>
                        <div className="col-span-8">
                          <FormControl>
                            <Input
                              className={inputClass}
                              placeholder="Email"
                              {...field}
                            />
                          </FormControl>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                {/* <div>
                  <Label className="dark:text-slate-400">Full Addess</Label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                      <i className="text-2xl las la-map-signs"></i>
                    </span>
                    <Textarea
                      className="!rounded-l-none"
                      placeholder="New york, USA"
                    />
                  </div>
                </div> */}

                {/* <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-1 md:grid-cols-12">
                        <div className="col-span-3 mt-3">
                          <FormLabel>Full Addess</FormLabel>
                        </div>
                        <div className="col-span-8">
                          <FormControl>
                            <Textarea
                              className={inputClass}
                              placeholder="Full Addess"
                              {...field}
                            />
                          </FormControl>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                {/* ---- */}
                {/* <div>
                  <Label className="dark:text-slate-400">Phone number</Label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                      <i className="text-2xl las la-phone-volume"></i>
                    </span>
                    <Input className="!rounded-l-none" placeholder="003 888 232" />
                  </div>
                </div> */}
                {/* <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-1 md:grid-cols-12">
                        <div className="col-span-3 mt-3">
                          <FormLabel>Phone number</FormLabel>
                        </div>
                        <div className="col-span-8">
                          <FormControl>
                            <Input
                              className={inputClass}
                              placeholder="Phone number"
                              {...field}
                            />
                          </FormControl>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                {/* ---- */}
                {/* <div>
                  <Label className="dark:text-slate-400">About you</Label>
                  <Textarea className="mt-1.5" placeholder="..." />
                </div> */}

                {/* <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-1 md:grid-cols-12">
                        <div className="col-span-3 mt-3">
                          <FormLabel>About you</FormLabel>
                        </div>
                        <div className="col-span-8">
                          <FormControl>
                            <Textarea
                              className={inputClass}
                              placeholder="About you"
                              {...field}
                            />
                          </FormControl>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

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

// export default AccountPage;
