"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import Breadcrumb from "@/app/admin/components/Breadcrumbs/Breadcrumb"
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
import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const formSchema = z.object({
  PAYPAL_CLIENT_ID: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
  PAYPAL_CLIENT_SECRET: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
  paypal_sandbox: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
  STRIPE_KEY: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
  STRIPE_SECRET: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
  BKASH_CHECKOUT_APP_KEY: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
  BKASH_CHECKOUT_APP_SECRET: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
  BKASH_CHECKOUT_USER_NAME: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
  BKASH_CHECKOUT_PASSWORD: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
  bkash_sandbox: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
  NAGAD_MODE: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
  NAGAD_MERCHANT_ID: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
  NAGAD_MERCHANT_NUMBER: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
  NAGAD_PG_PUBLIC_KEY: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
  NAGAD_MERCHANT_PRIVATE_KEY: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
  SSLCZ_STORE_ID: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
  SSLCZ_STORE_PASSWD: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
  sslcommerz_sandbox: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
  AAMARPAY_STORE_ID: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
  AAMARPAY_SIGNATURE_KEY: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
  aamarpay_sandbox: z.string().min(1, {
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

  const [isLoading, setIsLoading] = useState(false);

  // Fetch data if editing an existing ticket
  useEffect(() => {
    if (id) {
      const fetchTicket = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
          const response = await fetch(`${apiUrl}/server/api/routes/admin/feature_setting/payment_method/${id}`);
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

    if (!apiUrl) {
      showErrorToast("API URL is not configured.");
      return;
    }

    setIsLoading(true);

    try {
      const method = id ? "PUT" : "POST";
      const url = id
        ? `${apiUrl}/server/api/routes/admin/feature_setting/payment_method/${id}`
        : `${apiUrl}/server/api/routes/admin/feature_setting/payment_method`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to add payment method. Please try again.");
      }

      const result = await response.json();

      showSuccessToast(result.message || "payment method added successfully!");
      // router.push("/admin/pages/blog_system/payment method");
      window.location.href = `${apiUrl}/admin/pages/blog_system/payment method`;
    } catch (error) {
      showErrorToast("Error adding payment method: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  const inputClass = "bg-zinc-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-900 dark:border-slate-700 dark:placeholder-slate-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-2 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mx-auto max-w-screen-2xl">
            <div className="mb-3 flex flex-row items-center justify-between gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Breadcrumb pageName="Payment Method Settings" />
            </div>
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1">
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      {id ? "Edit Paypal Credential" : "Add Paypal Credential"}
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      {[
                        { name: "PAYPAL_CLIENT_ID", label: "Paypal Client Id" },
                        { name: "PAYPAL_CLIENT_SECRET", label: "Paypal Client Secret" },
                        { name: "paypal_sandbox", label: "Paypal Sandbox Mode" },
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
                                  <div className="col-span-3 mt-2">
                                    <FormLabel>{field.label}</FormLabel>
                                  </div>
                                  <div className="col-span-8">
                                    <FormControl>
                                      <Input
                                        className={inputClass}
                                        placeholder={field.label}
                                        {...fieldProps}
                                      />
                                    </FormControl>
                                  </div>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}

                    </div>
                    {/* <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="PAYPAL_CLIENT_SECRET"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-3 mt-2">
                                <FormLabel>Paypal Client Secret</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
                                  <Input
                                    className={inputClass}
                                    placeholder="Paypal Client Secret"
                                    {...field}
                                  />
                                </FormControl>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div> */}
                    {/* <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="paypal_sandbox"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-5">
                                <FormLabel>Paypal Sandbox Mode</FormLabel>
                              </div>
                              <div className="col-span-7">
                                <FormControl>
                                  <Switch />
                                </FormControl>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div> */}
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
                      {[
                        { name: "STRIPE_KEY", label: "Stripe Key" },
                        { name: "STRIPE_SECRET", label: "Stripe Secret" },
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
                                  <div className="col-span-3 mt-2">
                                    <FormLabel>{field.label}</FormLabel>
                                  </div>
                                  <div className="col-span-8">
                                    <FormControl>
                                      <Input
                                        className={inputClass}
                                        placeholder={field.label}
                                        {...fieldProps}
                                      />
                                    </FormControl>
                                  </div>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}


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
                      {[
                        { name: "BKASH_CHECKOUT_APP_KEY", label: "BKASH CHECKOUT APP KEY" },
                        { name: "BKASH_CHECKOUT_APP_SECRET", label: "BKASH CHECKOUT APP SECRET" },
                        { name: "BKASH_CHECKOUT_USER_NAME", label: "BKASH CHECKOUT USER NAME" },
                        { name: "BKASH_CHECKOUT_PASSWORD", label: "BKASH CHECKOUT PASSWORD" },
                        { name: "bkash_sandbox", label: "Bkash Sandbox Mode" },
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
                                  <div className="col-span-3 mt-2">
                                    <FormLabel>{field.label}</FormLabel>
                                  </div>
                                  <div className="col-span-8">
                                    <FormControl>
                                      <Input
                                        className={inputClass}
                                        placeholder={field.label}
                                        {...fieldProps}
                                      />
                                    </FormControl>
                                  </div>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}
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
                      {[
                        { name: "NAGAD_MODE", label: "NAGAD MODE" },
                        { name: "NAGAD_MERCHANT_ID", label: "NAGAD MERCHANT ID" },
                        { name: "NAGAD_MERCHANT_NUMBER", label: "NAGAD MERCHANT NUMBER" },
                        { name: "NAGAD_PG_PUBLIC_KEY", label: "NAGAD PG PUBLIC KEY" },
                        { name: "NAGAD_MERCHANT_PRIVATE_KEY", label: "NAGAD MERCHANT PRIVATE KEY" },
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
                                  <div className="col-span-3 mt-2">
                                    <FormLabel>{field.label}</FormLabel>
                                  </div>
                                  <div className="col-span-8">
                                    <FormControl>
                                      <Input
                                        className={inputClass}
                                        placeholder={field.label}
                                        {...fieldProps}
                                      />
                                    </FormControl>
                                  </div>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}

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
                      {[
                        { name: "SSLCZ_STORE_ID", label: "Sslcz Store Id" },
                        { name: "SSLCZ_STORE_PASSWD", label: "Sslcz store password" },
                        { name: "sslcommerz_sandbox", label: "Sslcommerz Sandbox Mode" },
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
                                  <div className="col-span-3 mt-2">
                                    <FormLabel>{field.label}</FormLabel>
                                  </div>
                                  <div className="col-span-8">
                                    <FormControl>
                                      <Input
                                        className={inputClass}
                                        placeholder={field.label}
                                        {...fieldProps}
                                      />
                                    </FormControl>
                                  </div>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}
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
                      {[
                        { name: "AAMARPAY_STORE_ID", label: "Aamarpay Store Id" },
                        { name: "AAMARPAY_SIGNATURE_KEY", label: "Aamarpay signature key" },
                        { name: "aamarpay_sandbox", label: "Aamarpay Sandbox Mode" },
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
                                  <div className="col-span-3 mt-2">
                                    <FormLabel>{field.label}</FormLabel>
                                  </div>
                                  <div className="col-span-8">
                                    <FormControl>
                                      <Input
                                        className={inputClass}
                                        placeholder={field.label}
                                        {...fieldProps}
                                      />
                                    </FormControl>
                                  </div>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="grid mt-4 justify-items-end">
                      <Button
                        className="dark:text-slate-200"
                        variant="outline"
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? "Submitting..." : "Submit"}
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
