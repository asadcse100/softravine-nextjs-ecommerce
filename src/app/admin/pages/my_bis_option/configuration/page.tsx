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
import { useState, useEffect } from 'react';

const formSchema1 = z.object({
  delivery_boy_payment_type: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  delivery_boy_salary: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  delivery_boy_mail_notification: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
});

const formSchema2 = z.object({
  delivery_boy_otp_notification: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  delivery_boy_commission: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
});

export default function AddOrEdit() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const form = useForm<z.infer<typeof formSchema1>>({
    resolver: zodResolver(formSchema1),
    defaultValues: {
      delivery_boy_payment_type: "",
      delivery_boy_salary: "",
      delivery_boy_mail_notification: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fetch data if editing an existing ticket
  useEffect(() => {
    if (id) {
      const fetchTicket = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
          const response = await fetch(`${apiUrl}/server/api/routes/admin/my_bis_option/configuration/${id}`);
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
      // const response = await fetch(`${apiUrl}/server/api/routes/admin/my_bis_option/configuration`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(values),
      // });
      const method = id ? "PUT" : "POST";
      const url = id
        ? `${apiUrl}/server/api/routes/admin/my_bis_option/configuration/${id}`
        : `${apiUrl}/server/api/routes/admin/my_bis_option/configuration`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      
      if (!response.ok) {
        throw new Error("Failed to add mybis configuration. Please try again.");
      }

      const result = await response.json();

      showSuccessToast(result.message || "mybis configuration added successfully!");
      // router.push("/admin/pages/blog_system/mybis configuration");
      window.location.href = `${apiUrl}/admin/pages/blog_system/mybis configuration`;
    } catch (error) {
      showErrorToast("Error adding mybis configuration: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  // 2. Define a submit handler.
  function onSubmit2(values: z.infer<typeof formSchema2>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const inputClass = "bg-zinc-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-900 dark:border-slate-700 dark:placeholder-slate-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-2 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <Form {...form}>

        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-3 flex flex-row items-center justify-between gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Breadcrumb pageName="Delivery Boy Configuration" />
          </div>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1">
            <form onSubmit={form.handleSubmit(onSubmit1)} className="space-y-8">

              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      {id ? "Edit Payment Configuration" : "Add Payment Configuration"}
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="delivery_boy_payment_type"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center space-x-12">
                              <FormLabel className="mt-2">Monthly Salary</FormLabel>
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
                        name="delivery_boy_salary"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-3 mt-2">
                                <FormLabel>Salary Amount</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
                                  <Input
                                    className={inputClass}
                                    placeholder="Salary Amount"
                                    {...field}
                                  />
                                </FormControl>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="delivery_boy_payment_type"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center space-x-12">
                              <FormLabel className="mt-2">Per Order Commission</FormLabel>
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
                        name="delivery_boy_commission"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-3 mt-2">
                                <FormLabel>Commission Rate</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
                                  <Input
                                    className={inputClass}
                                    placeholder="Commission Rate"
                                    {...field}
                                  />
                                </FormControl>
                              </div>
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
                        Update
                      </Button>
                    </div>
                  </div>
                </div>

              </div>
            </form>

            <form onSubmit={form.handleSubmit(onSubmit2)} className="space-y-8">
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Notification Configuration
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="delivery_boy_mail_notification"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center space-x-12">
                              <FormLabel className="mt-2">Send Mail</FormLabel>
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
                        name="delivery_boy_otp_notification"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center space-x-12">
                              <FormLabel className="mt-2">Send OTP</FormLabel>
                              <Switch />
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid mt-4 justify-items-end">
                      {/* <Button
                        className="dark:text-slate-200"
                        variant="outline"
                        type="submit"
                      >
                        Update
                      </Button> */}
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
          </div>
        </div>
      </Form>
    </div >
  );
}
