"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Label from "@/app/seller/components/Label/Label";
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

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className={`nc-AccountPage `}>
            <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
      <div className="space-y-5 sm:space-y-5 bg-white dark:bg-slate-700 p-5 rounded-xl">
        {/* HEADING */}
        <h2 className="text-2xl sm:text-3xl font-semibold dark:text-slate-300">
          Full Address
        </h2>
        <div className="flex flex-col md:flex-row">

          <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">

          <div className="flex flex-col gap-5.5 p-6.5 dark:text-slate-500">
              <FormField
                  control={form.control}
                  name="subscriber_emails[]"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Division</FormLabel>
                      <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Emails" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Apple">Apple</SelectItem>
                          <SelectItem value="m2@example.com">Pran</SelectItem>
                          <SelectItem value="m22@example.com">Squre</SelectItem>
                          <SelectItem value="m3@example.com">ACI</SelectItem>
                          <SelectItem value="m4@example.com">SoftRavine</SelectItem>
                          <SelectItem value="m5@example.com">Samsung</SelectItem>
                          <SelectItem value="m6@example.com">LG</SelectItem>
                          <SelectItem value="m7@example.com">Logitech</SelectItem>
                          <SelectItem value="m8@example.com">A4tech</SelectItem>
                          <SelectItem value="m9@example.com">HP</SelectItem>
                        </SelectContent>
                      </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </div>

              <div className="flex flex-col gap-5.5 p-6.5 dark:text-slate-500">
              <FormField
                  control={form.control}
                  name="subscriber_emails[]"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zila</FormLabel>
                      <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Emails" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Apple">Apple</SelectItem>
                          <SelectItem value="m2@example.com">Pran</SelectItem>
                          <SelectItem value="m22@example.com">Squre</SelectItem>
                          <SelectItem value="m3@example.com">ACI</SelectItem>
                          <SelectItem value="m4@example.com">SoftRavine</SelectItem>
                          <SelectItem value="m5@example.com">Samsung</SelectItem>
                          <SelectItem value="m6@example.com">LG</SelectItem>
                          <SelectItem value="m7@example.com">Logitech</SelectItem>
                          <SelectItem value="m8@example.com">A4tech</SelectItem>
                          <SelectItem value="m9@example.com">HP</SelectItem>
                        </SelectContent>
                      </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

            <div className="flex flex-col gap-5.5 p-6.5 dark:text-slate-500">
              <FormField
                  control={form.control}
                  name="subscriber_emails[]"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>UpZila</FormLabel>
                      <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select UpZila" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Apple">Apple</SelectItem>
                          <SelectItem value="m2@example.com">Pran</SelectItem>
                          <SelectItem value="m22@example.com">Squre</SelectItem>
                          <SelectItem value="m3@example.com">ACI</SelectItem>
                          <SelectItem value="m4@example.com">SoftRavine</SelectItem>
                          <SelectItem value="m5@example.com">Samsung</SelectItem>
                          <SelectItem value="m6@example.com">LG</SelectItem>
                          <SelectItem value="m7@example.com">Logitech</SelectItem>
                          <SelectItem value="m8@example.com">A4tech</SelectItem>
                          <SelectItem value="m9@example.com">HP</SelectItem>
                        </SelectContent>
                      </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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

