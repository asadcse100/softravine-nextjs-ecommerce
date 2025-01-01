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
import Textarea from "@/shared/Textarea/Textarea";
import { avatarImgs } from "@/contains/fakeData";
import Image from "next/image";

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
          const response = await fetch(`${apiUrl}/server/api/routes/admin/kcy/${id}`);
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
        ? `${apiUrl}/server/api/routes/admin/kcy/${id}`
        : `${apiUrl}/server/api/routes/admin/kcy`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to added kcy. Please try again.");
      }

      const result = await response.json();

      showSuccessToast(result.message || "added kcy successfully!");
      // router.push("/admin/pages/blog_system/catadded kcyegory");
      window.location.href = `${apiUrl}/admin/pages/blog_system/productbid`;
    } catch (error) {
      showErrorToast("Error adding added kcy: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  const inputClass = "bg-zinc-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-900 dark:border-slate-700 dark:placeholder-slate-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <div className={`nc-AccountPage `}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-5 sm:space-y-5 bg-white dark:bg-boxdark p-5 rounded-xl">
            {/* HEADING */}
            <h2 className="text-2xl sm:text-3xl font-semibold dark:text-slate-300">
              {id ? "Edit KCY" : "Add KCY"}
            </h2>
            <div className="flex flex-col md:flex-row">

              <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">

                <FormField
                  control={form.control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-1 md:grid-cols-12">
                        <div className="col-span-3 mt-3">
                          <FormLabel>Photo</FormLabel>
                        </div>
                        <div className="col-span-8">
                          <Input className={inputClass} type="file" />
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
                          <FormLabel>NID front Part</FormLabel>
                        </div>
                        <div className="col-span-8">
                          <Input className={inputClass} type="file" />
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
                          <FormLabel>NID back Part</FormLabel>
                        </div>
                        <div className="col-span-8">
                          <Input className={inputClass} type="file" />
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className="text-white text-center">OR</p>
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-1 md:grid-cols-12">
                        <div className="col-span-3 mt-3">
                          <FormLabel>Passport</FormLabel>
                        </div>
                        <div className="col-span-8">
                          <Input className={inputClass} type="file" />
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className="text-white text-center">OR</p>
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-1 md:grid-cols-12">
                        <div className="col-span-3 mt-3">
                          <FormLabel>Driving Licence</FormLabel>
                        </div>
                        <div className="col-span-8">
                          <Input className={inputClass} type="file" />
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
