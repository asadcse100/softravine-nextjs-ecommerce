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
import Select from "@/shared/Select/Select";
import { Switch } from "@/app/admin/components/ui/switch";

const formSchema = z.object({
  PAYPAL_CLIENT_ID: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  PAYPAL_CLIENT_SECRET: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  paypal_sandbox: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  STRIPE_KEY: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  STRIPE_SECRET: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  BKASH_CHECKOUT_APP_KEY: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  BKASH_CHECKOUT_APP_SECRET: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  BKASH_CHECKOUT_USER_NAME: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  BKASH_CHECKOUT_PASSWORD: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  bkash_sandbox: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  NAGAD_MODE: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  NAGAD_MERCHANT_ID: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  NAGAD_MERCHANT_NUMBER: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  NAGAD_PG_PUBLIC_KEY: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  NAGAD_MERCHANT_PRIVATE_KEY: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  SSLCZ_STORE_ID: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  SSLCZ_STORE_PASSWD: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  sslcommerz_sandbox: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  AAMARPAY_STORE_ID: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  AAMARPAY_SIGNATURE_KEY: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  aamarpay_sandbox: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
});

export default function Addnew() {
  // ...
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      PAYPAL_CLIENT_ID: "",
      PAYPAL_CLIENT_SECRET: "",
      paypal_sandbox: "",
      STRIPE_KEY: "",
      STRIPE_SECRET: "",
      BKASH_CHECKOUT_APP_KEY: "",
      BKASH_CHECKOUT_APP_SECRET: "",
      BKASH_CHECKOUT_USER_NAME: "",
      BKASH_CHECKOUT_PASSWORD: "",
      bkash_sandbox: "",
      NAGAD_MODE: "",
      NAGAD_MERCHANT_ID: "",
      NAGAD_MERCHANT_NUMBER: "",
      NAGAD_PG_PUBLIC_KEY: "",
      NAGAD_MERCHANT_PRIVATE_KEY: "",
      SSLCZ_STORE_ID: "",
      SSLCZ_STORE_PASSWD: "",
      sslcommerz_sandbox: "",
      AAMARPAY_STORE_ID: "",
      AAMARPAY_SIGNATURE_KEY: "",
      aamarpay_sandbox: "",
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
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1">
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Paypal Credential
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="PAYPAL_CLIENT_ID"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Paypal Client Id</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Paypal Client Id"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="PAYPAL_CLIENT_SECRET"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Paypal Client Secret</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Paypal Client Secret"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="paypal_sandbox"
                        render={({ field }) => (
                          <FormItem>
                            {/* <FormLabel>Paypal Sandbox Mode</FormLabel> */}
                            <div className="flex items-center space-x-12">
                              <FormLabel className="mt-2">
                                Paypal Sandbox Mode
                              </FormLabel>
                              <Switch />
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid mt-4 justify-items-end">
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
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Stripe Credential
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="STRIPE_KEY"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Stripe Key</FormLabel>
                            <FormControl>
                              {/* <Select>
                                <option>SMTP</option>
                                <option>Send Mail</option>
                                <option>Mail Gun</option>
                              </Select> */}
                              <Input
                                className={inputClass}
                                placeholder="Stripe Key"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="STRIPE_SECRET"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Stripe Secret</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Stripe Secret"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid mt-4 justify-items-end">
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
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Bkash Credential
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="BKASH_CHECKOUT_APP_KEY"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>BKASH CHECKOUT APP KEY</FormLabel>
                            <FormControl>
                              {/* <Select>
                                <option>SMTP</option>
                                <option>Send Mail</option>
                                <option>Mail Gun</option>
                              </Select> */}
                              <Input
                                className={inputClass}
                                placeholder="BKASH CHECKOUT APP KEY"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="BKASH_CHECKOUT_APP_SECRET"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>BKASH CHECKOUT APP SECRET</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="BKASH CHECKOUT APP SECRET"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="BKASH_CHECKOUT_USER_NAME"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>BKASH CHECKOUT USER NAME</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="BKASH CHECKOUT USER NAME"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="BKASH_CHECKOUT_PASSWORD"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>BKASH CHECKOUT PASSWORD</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="BKASH CHECKOUT PASSWORD"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="bkash_sandbox"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center space-x-12">
                              <FormLabel className="mt-2">
                                Bkash Sandbox Mode
                              </FormLabel>
                              <Switch />
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid mt-4 justify-items-end">
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
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Nagad Credential
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="NAGAD_MODE"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>NAGAD MODE</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="NAGAD MODE"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="NAGAD_MERCHANT_ID"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>NAGAD MERCHANT ID</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="NAGAD MERCHANT ID"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="NAGAD_MERCHANT_NUMBER"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>NAGAD MERCHANT NUMBER</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="NAGAD MERCHANT NUMBER"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="NAGAD_PG_PUBLIC_KEY"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>NAGAD PG PUBLIC KEY</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="NAGAD PG PUBLIC KEY"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="NAGAD_MERCHANT_PRIVATE_KEY"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>NAGAD MERCHANT PRIVATE KEY</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="NAGAD MERCHANT PRIVATE KEY"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid mt-4 justify-items-end">
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
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Sslcommerz Credential
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="SSLCZ_STORE_ID"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sslcz Store Id</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Sslcz Store Id"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="SSLCZ_STORE_PASSWD"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sslcz store password</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Sslcz store password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="sslcommerz_sandbox"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center space-x-12">
                              <FormLabel className="mt-2">
                                Sslcommerz Sandbox Mode
                              </FormLabel>
                              <Switch />
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid mt-4 justify-items-end">
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
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Aamarpay Credential
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="AAMARPAY_STORE_ID"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Aamarpay Store Id</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Aamarpay Store Id"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="AAMARPAY_SIGNATURE_KEY"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Aamarpay signature key</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Aamarpay signature key"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="aamarpay_sandbox"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center space-x-12">
                              <FormLabel className="mt-2">
                                Aamarpay Sandbox Mode
                              </FormLabel>
                              <Switch />
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid mt-4 justify-items-end">
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
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
