"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/admin/components/ui/select";
import { Switch } from "@/app/admin/components/ui/switch";

const formSchema = z.object({
  carrier_name: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  transit_time: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  logo: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  shipping_type: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  billing_type: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  delimiter1: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  delimiter2: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  zones: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  carrier_price: z.string().min(10, {
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
      carrier_name: "",
      transit_time: "",
      logo: "",
      shipping_type: "",
      billing_type: "",
      delimiter1: "",
      delimiter2: "",
      zones: "",
      carrier_price: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fetch data if editing an existing ticket
  useEffect(() => {
    if (id) {
      const fetchTicket = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
          const response = await fetch(`${apiUrl}/server/api/routes/admin/feature_setting/shipping/courier/${id}`);
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
        ? `${apiUrl}/server/api/routes/admin/feature_setting/shipping/courier/${id}`
        : `${apiUrl}/server/api/routes/admin/feature_setting/shipping/courier`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to add courier. Please try again.");
      }

      const result = await response.json();

      showSuccessToast(result.message || "courier added successfully!");
      // router.push("/admin/pages/blog_system/courier");
      window.location.href = `${apiUrl}/admin/pages/blog_system/courier`;
    } catch (error) {
      showErrorToast("Error adding courier: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  const inputClass = "bg-zinc-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-900 dark:border-slate-700 dark:placeholder-slate-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-2 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mx-auto max-w-screen-2xl">
            <div className="mb-3 flex flex-row items-center justify-between gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Breadcrumb pageName="Zone Information Add" />
            </div>
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1">
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-slate-300">
                      {id ? "Edit Carrier Information" : "Add Carrier Information"}
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      {[
                        { name: "carrier_name", label: "Carrier Name" },
                        { name: "logo", label: "Logo" },
                        { name: "shipping_type", label: "Free Shipping" },
                        { name: "billing_type", label: "Billing Type" },
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
                                      {field.name === "carrier_name" ? (
                                        <Input
                                          className={inputClass}
                                          placeholder={field.label}
                                          {...fieldProps}
                                        />
                                      ) : field.name === "logo" ? (
                                        <Input
                                          type="file"
                                          className={inputClass}
                                          placeholder={field.label}
                                          {...fieldProps}
                                        />
                                      ) : field.name === "shipping_type" ? (
                                        <Switch />
                                      ) : field.name === "shipping_type" ? (
                                        <Select
                                          onValueChange={field.onChange}
                                          defaultValue={field.value}
                                        >
                                          <FormControl>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select Billing Type" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            <SelectItem value="Apple">According to Weight</SelectItem>
                                            <SelectItem value="m2@example.com">According to Price</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      ) : null}

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

                    <hr className="mt-3" />
                    <p className="text-xl dark:text-slate-300 py-3">
                      Weight based carrier price range
                    </p>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      {[
                        { name: "delimiter1", label: "Will be applied when the weight is" },
                        { name: "delimiter2", label: "Will be applied when the weight is" },
                        { name: "zones", label: "Asia" },
                        { name: "europe", label: "Europe" },
                        { name: "africa", label: "Africa" },
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
                                      {field.name === "delimiter1" ? (
                                        <Input
                                          className={inputClass}
                                          placeholder="0.00"
                                          {...field}
                                        />
                                      ) : field.name === "delimiter2" ? (
                                        <Input
                                          className={inputClass}
                                          placeholder="0.00"
                                          {...field}
                                        />
                                      ) : field.name === "zones" ? (
                                        <Input
                                          className={inputClass}
                                          placeholder="Cost"
                                          {...field}
                                        />
                                      ) : field.name === "europe" ? (
                                        <Input
                                          className={inputClass}
                                          placeholder="Cost"
                                          {...field}
                                        />
                                      ) : field.name === "africa" ? (
                                        <Input
                                          className={inputClass}
                                          placeholder="Cost"
                                          {...field}
                                        />
                                      ) : null}

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
                        name="delimiter1[]"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-3">
                                <FormLabel>Will be applied when the weight is{" "}</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
                                  <Input
                                    className={inputClass}
                                    placeholder="0.00"
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
                    {/* <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="delimiter2[]"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-3">
                                <FormLabel>Will be applied when the weight is{" "}</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
                                  <Input
                                    className={inputClass}
                                    placeholder="0.00"
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
                        name="zones[]"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-3 mt-3">
                                <FormLabel>Asia</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
                                  <Input
                                    className={inputClass}
                                    placeholder="Cost"
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
                        name="carrier_price[1][]"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-3 mt-3">
                                <FormLabel>Europe</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
                                  <Input
                                    className={inputClass}
                                    placeholder="Cost"
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
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      {/* <FormField
                        control={form.control}
                        name="zones[]"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-3 mt-3">
                                <FormLabel>Africa</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
                                  <Input
                                    className={inputClass}
                                    placeholder="Cost"
                                    {...field}
                                  />
                                </FormControl>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      /> */}
                      <div className="mt-3">
                        <Button
                          className="dark:text-slate-200"
                          variant="outline"
                          type="submit"
                        >
                          New Range
                        </Button>
                      </div>
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
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
