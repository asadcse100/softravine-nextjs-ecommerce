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
  facebook_pixel: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  FACEBOOK_PIXEL_ID: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  google_analytics: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  TRACKING_ID: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
});

export default function Addnew() {
  // ...
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      facebook_pixel: "",
      FACEBOOK_PIXEL_ID: "",
      google_analytics: "",
      TRACKING_ID: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const inputClass =
    "w-full rounded-lg border-[1px] border-primary bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-slate-300r dark:bg-form-input dark:text-slate-300";

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-4 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mx-auto max-w-screen-2xl">
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1">
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-slate-300 shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-slate-300">
                      Facebook Pixel Setting
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="facebook_pixel"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center space-x-12">
                              <FormLabel className="mt-2">
                                Facebook Pixel
                              </FormLabel>
                              <Switch />
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="FACEBOOK_PIXEL_ID"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Facebook Pixel ID</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Facebook Pixel ID"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid mt-3 justify-items-end">
                      <Button
                        className="dark:text-slate-200"
                        variant="outline"
                        type="submit"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-slate-300 shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-slate-300">
                      Google Analytics Setting
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="google_analytics"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center space-x-12">
                              <FormLabel className="mt-2">
                                Google Analytics
                              </FormLabel>
                              <Switch />
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="TRACKING_ID"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tracking ID</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Tracking ID"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid mt-3 justify-items-end">
                      <Button
                        className="dark:text-slate-200"
                        variant="outline"
                        type="submit"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-slate-300 shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-slate-300">
                      Please be carefull when you are configuring Facebook
                      pixel.
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="dark:text-slate-300">
                      <div className="border dark:border-slate-500 dark:text-slate-400 mt-2 p-3">
                        1. Log in to Facebook and go to your Ads Manager
                        account.
                      </div>
                      <div className="border dark:border-slate-500 dark:text-slate-400 p-3">
                        2. Open the Navigation Bar and select Events Manager.
                      </div>
                      <div className="border dark:border-slate-500 dark:text-slate-400 p-3">
                        3. Copy your Pixel ID from underneath your Site Name and
                        paste the number into Facebook Pixel ID field.
                      </div>
                    </div>
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
