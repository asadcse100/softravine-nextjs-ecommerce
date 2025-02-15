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
  product_name: z.string().min(1, {
    message: "",
  }),
});

export default function AddOrEdit() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      https_activation: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fetch data if editing an existing ticket
  useEffect(() => {
    if (id) {
      const fetchTicket = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
          const response = await fetch(`${apiUrl}/server/api/routes/admin/feature_setting/feature_activation/${id}`);
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
        ? `${apiUrl}/server/api/routes/admin/feature_setting/feature_activation/${id}`
        : `${apiUrl}/server/api/routes/admin/feature_setting/feature_activation`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to add feature acivation. Please try again.");
      }

      const result = await response.json();

      showSuccessToast(result.message || "feature acivation added successfully!");
      // router.push("/admin/pages/blog_system/feature acivation");
      window.location.href = `${apiUrl}/admin/pages/blog_system/feature acivation`;
    } catch (error) {
      showErrorToast("Error adding feature acivation: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  const inputClass = "bg-zinc-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-900 dark:border-slate-700 dark:placeholder-slate-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-2 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mx-auto max-w-screen-2xl">
            <div className="mb-3 flex flex-row items-center justify-between gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Breadcrumb pageName="Website Features Activation" />
            </div>
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1 sm:grid-cols-1">
              <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    {id ? "Edit System" : "Add System"}
                  </h3>
                </div>
                <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-6 sm:grid-cols-3 py-6">
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="https_activation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            HTTPS Activation
                          </FormLabel>
                          <Switch {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Maintenance Mode Activation
                          </FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Disable image encoding?
                          </FormLabel>
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
                    Business Related
                  </h3>
                </div>
                <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-6 sm:grid-cols-3 py-6">
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Vendor System Activation
                          </FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Classified Product
                          </FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Wallet System Activation
                          </FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Coupon System Activation
                          </FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Pickup Point Activation
                          </FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Conversation Activation
                          </FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Seller Product Manage By Admin
                          </FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* <p>After activate this option Cash On Delivery of Seller product will be managed by Admin.</p> */}
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Admin Approval On Seller Product
                          </FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Email Verification
                          </FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Product Query Activation
                          </FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Last Viewed Products Activation
                          </FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Guest Checkout Activation
                          </FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Wholesale Product for Seller
                          </FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Auction Product for Seller
                          </FormLabel>
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
                    Payment Related
                  </h3>
                </div>
                <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-6 sm:grid-cols-3 py-6">
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Paypal Payment Activation
                          </FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">Stripe Payment Activation</FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">SSlCommerz Activation</FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">Instamojo Payment Activation</FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Razor Pay Activation
                          </FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            PayStack Activation
                          </FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            VoguePay Activation
                          </FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Payhere Activation
                          </FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Ngenius Activation
                          </FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Bkash Activation
                          </FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Nagad Activation
                          </FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Amarpay Activation
                          </FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Authorize Net Activation
                          </FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Payku Activation
                          </FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Mercadopago Payment Activation
                          </FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Paymob Payment Activation
                          </FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Cash Payment Activation
                          </FormLabel>
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
                    Social Media Login
                  </h3>
                </div>
                <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-6 sm:grid-cols-3 py-6">
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Facebook login
                          </FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Google login
                          </FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Twitter login
                          </FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Apple login
                          </FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
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
        </form>
      </Form>
    </div>
  );
}
