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
import Input from "@/shared/Input/Input";
import { Switch } from "@/app/admin/components/ui/switch";

const formSchema = z.object({
  product_name: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
});

export default function Addnew() {
  // ...
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_name: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const inputClass = "bg-zinc-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-900 dark:border-slate-800 dark:placeholder-slate-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-4 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mx-auto max-w-screen-2xl">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1">
              <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                  Nexmo OTP
                  </h3>
                </div>
                <div className="py-6">
                  <div className="flex flex-col gap-5.5 p-6.5">
                  <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                  Twillo OTP
                  </h3>
                </div>
                <div className="py-6">
                  <div className="flex flex-col gap-5.5 p-6.5">
                  <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                  SSL Wireless OTP
                  </h3>
                </div>
                <div className="py-6">
                  <div className="flex flex-col gap-5.5 p-6.5">
                  <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                  Fast2SMS OTP
                  </h3>
                </div>
                <div className="py-6">
                  <div className="flex flex-col gap-5.5 p-6.5">
                  <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                  MIMO OTP
                  </h3>
                </div>
                <div className="py-6">
                  <div className="flex flex-col gap-5.5 p-6.5">
                  <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                  Mimsms OTP
                  </h3>
                </div>
                <div className="py-6">
                  <div className="flex flex-col gap-5.5 p-6.5">
                  <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                  Msegat OTP
                  </h3>
                </div>
                <div className="py-6">
                  <div className="flex flex-col gap-5.5 p-6.5">
                  <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                  Sparrow OTP
                  </h3>
                </div>
                <div className="py-6">
                  <div className="flex flex-col gap-5.5 p-6.5">
                  <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                  Zender OTP
                  </h3>
                </div>
                <div className="py-6">
                  <div className="flex flex-col gap-5.5 p-6.5">
                  <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
