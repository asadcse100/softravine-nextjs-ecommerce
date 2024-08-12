"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/app/admin/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/admin/components/ui/form";

import Label from "@/app/seller/components/Label/Label";
import React, { FC } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/admin/components/ui/select";
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

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const inputClass =
    "w-full rounded-lg border-[1px] border-primary bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white";

  return (
    <div className={`nc-AccountPage `}>
            <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
      <div className="space-y-5 sm:space-y-5 bg-white dark:bg-slate-700 p-5 rounded-xl">
        {/* HEADING */}
        <h2 className="text-2xl sm:text-3xl font-semibold dark:text-slate-300">
          Additional infomation
        </h2>
        <div className="flex flex-col md:flex-row">

          <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">

            {/* ---- */}
            <div className="max-w-lg">
              <Label className="dark:text-slate-400">Date of birth</Label>
              <div className="mt-1.5 flex dark:text-slate-500">
              <Input type="date"
                  className={inputClass}
                  placeholder="Employe Name"
                />
              </div>
            </div>
            {/* ---- */}
            <div>
              {/* <Label className="dark:text-slate-400">Division</Label> */}
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
                                  <SelectValue placeholder="Select Division" />
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
                                  <SelectValue placeholder="Select Zila" />
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

            <div>
              <Label className="dark:text-slate-400">Full Addess</Label>
              <div className="mt-1.5 flex dark:text-slate-500">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-map-signs"></i>
                </span>
                <Textarea
                  className="!rounded-l-none"
                  placeholder="New york, USA"
                />
              </div>
            </div>
            
            <div>
              <Label className="dark:text-slate-400">About you</Label>
              <Textarea className="mt-1.5" placeholder="..." />
            </div>
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

