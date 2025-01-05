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
import { Switch } from "@/app/admin/components/ui/switch";
import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const formSchema = z.object({
  shipping_type: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  flat_rate_shipping_cost: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  shipping_cost_admin: z.string().min(10, {
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
      shipping_type: "",
      flat_rate_shipping_cost: "",
      shipping_cost_admin: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fetch data if editing an existing ticket
  useEffect(() => {
    if (id) {
      const fetchTicket = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
          const response = await fetch(`${apiUrl}/server/api/routes/admin/feature_setting/shipping/shipping_configuration/${id}`);
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
        ? `${apiUrl}/server/api/routes/admin/feature_setting/shipping/shipping_configuration/${id}`
        : `${apiUrl}/server/api/routes/admin/feature_setting/shipping/shipping_configuration`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      
      if (!response.ok) {
        throw new Error("Failed to add shipping configuration. Please try again.");
      }

      const result = await response.json();

      showSuccessToast(result.message || "shipping configuration added successfully!");
      // router.push("/admin/pages/blog_system/shipping configuration");
      window.location.href = `${apiUrl}/admin/pages/blog_system/shipping configuration`;
    } catch (error) {
      showErrorToast("Error adding shipping configuration: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  const inputClass = "bg-zinc-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-900 dark:border-slate-700 dark:placeholder-slate-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-2 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mx-auto max-w-screen-2xl">
            <div className="mb-3 flex flex-row items-center justify-between gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Breadcrumb pageName="Shipping Configuration" />
            </div>
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1">
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-slate-300 shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-slate-300">
                      {id ? "Edit Select Shipping Method" : "Add Select Shipping Method"}
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="shipping_type"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-6">
                                <FormLabel>Product Wise Shipping Cost</FormLabel>
                              </div>
                              <div className="col-span-6">
                                <FormControl>
                                  <Switch />
                                </FormControl>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="shipping_type"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-6">
                                <FormLabel>Flat Rate Shipping Cost</FormLabel>
                              </div>
                              <div className="col-span-6">
                                <FormControl>
                                  <Switch />
                                </FormControl>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="shipping_type"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-6">
                                <FormLabel>Seller Wise Flat Shipping Cost</FormLabel>
                              </div>
                              <div className="col-span-6">
                                <FormControl>
                                  <Switch />
                                </FormControl>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="shipping_type"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-6">
                                <FormLabel>Area Wise Flat Shipping Cost</FormLabel>
                              </div>
                              <div className="col-span-6">
                                <FormControl>
                                  <Switch />
                                </FormControl>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="shipping_type"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-6">
                                <FormLabel>Carrier Wise Shipping Cost</FormLabel>
                              </div>
                              <div className="col-span-6">
                                <FormControl>
                                  <Switch />
                                </FormControl>
                              </div>
                            </div>
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
                      Note
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="dark:text-slate-300">
                      <div className="border dark:border-slate-500 dark:text-slate-400 mt-2 p-3">
                        1. Product Wise Shipping Cost calculation: Shipping cost
                        is calculate by addition of each product shipping cost.
                      </div>
                      <div className="border dark:border-slate-500 dark:text-slate-400 p-3">
                        2. Flat Rate Shipping Cost calculation: How many
                        products a customer purchase, doesnt matter. Shipping
                        cost is fixed.
                      </div>
                      <div className="border dark:border-slate-500 dark:text-slate-400 p-3">
                        3. Seller Wise Flat Shipping Cost calculation: Fixed
                        rate for each seller. If customers purchase 2 product
                        from two seller shipping cost is calculated by addition
                        of each seller flat shipping cost.
                      </div>
                      <div className="border dark:border-slate-500 dark:text-slate-400 p-3">
                        4. Area Wise Flat Shipping Cost calculation: Fixed rate
                        for each area. If customers purchase multiple products
                        from one seller shipping cost is calculated by the
                        customer shipping area. To configure area wise shipping
                        cost go to Shipping Cities.
                      </div>
                      <div className="border dark:border-slate-500 dark:text-slate-400 p-3">
                        5. Carrier Based Shipping Cost calculation: Shipping
                        cost calculate in addition with carrier. In each carrier
                        you can set free shipping cost or can set weight range
                        or price range shipping cost. To configure carrier based
                        shipping cost go to Shipping Carriers.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-slate-300 shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-slate-300">
                      Flat Rate Cost
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                    {[
                        { name: "flat_rate_shipping_cost", label: "Cost" },
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

                      {/* <FormField
                        control={form.control}
                        name="flat_rate_shipping_cost"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-3 mt-2">
                                <FormLabel>Cost</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
                                  <Input
                                    className={inputClass}
                                    placeholder="123"
                                    {...field}
                                  />
                                </FormControl>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      /> */}
                    </div>
                    <div className="grid mt-3 justify-items-end">
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

              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-slate-300 shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-slate-300">
                      Note
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="dark:text-slate-300">
                      <div className="border dark:border-slate-500 dark:text-slate-400 mt-2 p-3">
                        1. Flat rate shipping cost is applicable if Flat rate
                        shipping is enabled.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-slate-300 shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-slate-300">
                      Shipping Cost for Admin Products
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                    {[
                        { name: "shipping_cost_admin", label: "Cost" },
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

                      {/* <FormField
                        control={form.control}
                        name="shipping_cost_admin"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-3 mt-2">
                                <FormLabel>Cost</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
                                  <Input
                                    className={inputClass}
                                    placeholder="123"
                                    {...field}
                                  />
                                </FormControl>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      /> */}
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
                      Note
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="dark:text-slate-300">
                      <div className="border dark:border-slate-500 dark:text-slate-400 mt-2 p-3">
                        1. Shipping cost for admin is applicable if Seller wise
                        shipping cost is enabled.
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
