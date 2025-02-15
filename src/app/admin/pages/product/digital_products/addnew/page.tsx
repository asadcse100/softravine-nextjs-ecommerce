"use client";
import * as React from "react"
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";

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
import Textarea from "@/shared/Textarea/Textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/admin/components/ui/select";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Product Name must be at least 10 characters.",
  }),
  file_name: z.string().min(1, {
    message: "Product file_name must be at least 10 characters.",
  }),
  tags: z.string().min(1, {
    message: "Product Tag must be at least 10 characters.",
  }),
  photos: z.string().min(1, {
    message: "Product photos must be at least 10 characters.",
  }),
  thumbnail_img: z.string().min(1, {
    message: "Product thumbnail_img must be at least 10 characters.",
  }),
  meta_title: z.string().min(1, {
    message: "Product meta_title must be at least 10 characters.",
  }),
});

export default function AddOrEdit() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      file_name: "",
      tags: "",
      photos: "",
      thumbnail_img: "",
      meta_title: "",
      name: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fetch data if editing an existing ticket
  useEffect(() => {
    if (id) {
      const fetchTicket = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
          const response = await fetch(`${apiUrl}/server/api/routes/admin/product/digital_product/${id}`);
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
        ? `${apiUrl}/server/api/routes/admin/product/digital_product/${id}`
        : `${apiUrl}/server/api/routes/admin/product/digital_product`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to add digital product. Please try again.");
      }

      const result = await response.json();

      showSuccessToast(result.message || "digital product added successfully!");
      // router.push("/admin/pages/blog_system/digital product");
      window.location.href = `${apiUrl}/admin/pages/blog_system/digital product`;
    } catch (error) {
      showErrorToast("Error adding digital product: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]) // Adjust the type according to your data structure
  // Fetch data from an API
  useEffect(() => {
    const fetchCategories = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''
      try {
        const response = await fetch(`${apiUrl}/server/api/routes/admin/pos/select/categories`) // Replace with your API endpoint
        const data = await response.json()

        // Check if the response has the 'roles' property and it's an array
        if (data && Array.isArray(data)) {
          setCategories(data)
        } else {
          console.error('Unexpected data format:', data)
        }
      } catch (error) {
        console.error('Error fetching Categories:', error)
      }
    }

    fetchCategories()
  }, [])

  const inputClass = "bg-zinc-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-900 dark:border-slate-700 dark:placeholder-slate-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-2 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mx-auto max-w-screen-2xl">

            <div className="border-b border-stroke dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                {id ? "Edit Your Digital Product" : "Add Your Digital Product"}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="col-span-8">
                <div className="p-2">
                  <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Product Information
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        {[
                          { name: "name", label: "Product Name" },
                          { name: "file_name", label: "Product File" },
                          { name: "tags[]", label: "Tags" },
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
                                    <div className="col-span-3 mt-1">
                                      <FormLabel>{field.label}</FormLabel>
                                    </div>
                                    <div className="col-span-8">
                                      <FormControl>
                                        {field.name === "name" ? (
                                          <Input
                                            className={inputClass}
                                            placeholder={field.label}
                                            {...fieldProps}
                                          />
                                        ) : field.name === "file_name" ? (
                                          <Input type="file"
                                            className={inputClass}
                                            placeholder={field.label}
                                            {...fieldProps}
                                          />
                                        ) : field.name === "tags[]" ? (
                                          <Input type="file"
                                            className={inputClass}
                                            placeholder={field.label}
                                            {...fieldProps}
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
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-3 mt-2">
                                  <FormLabel>Product Name</FormLabel>
                                </div>
                                <div className="col-span-8">
                                  <FormControl>
                                    <Input
                                      className={inputClass}
                                      placeholder="Product Name"
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
                          name="file_name"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-3 mt-2">
                                  <FormLabel>Product File</FormLabel>
                                </div>
                                <div className="col-span-8">
                                  <FormControl>
                                    <Input type="file"
                                      className={inputClass}
                                      placeholder="Product File"
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
                          name="tags[]"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-3 mt-2">
                                  <FormLabel>Tags</FormLabel>
                                </div>
                                <div className="col-span-8">
                                  <FormControl>
                                    <Input
                                      className={inputClass}
                                      placeholder="Tags"
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
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Product Images
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        {[
                          { name: "main_images", label: "Main Images" },
                          { name: "thumbnail_img", label: "Thumbnail Image" },
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
                                    <div className="col-span-3 mt-1">
                                      <FormLabel>{field.label}</FormLabel>
                                    </div>
                                    <div className="col-span-8">
                                      <FormControl>
                                        {field.name === "main_images" ? (
                                          <Input type="file"
                                            className={inputClass}
                                            placeholder={field.label}
                                            {...fieldProps}
                                          />
                                        ) : field.name === "thumbnail_img" ? (
                                          <Input type="file"
                                            className={inputClass}
                                            placeholder={field.label}
                                            {...fieldProps}
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
                          name="photos"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-3 mt-2">
                                  <FormLabel>Main Images</FormLabel>
                                </div>
                                <div className="col-span-8">
                                  <FormControl>
                                    <Input
                                      className={inputClass}
                                      placeholder="Main Images"
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
                          name="thumbnail_img"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-3 mt-2">
                                  <FormLabel>Thumbnail Image</FormLabel>
                                </div>
                                <div className="col-span-8">
                                  <FormControl>
                                    <Input
                                      className={inputClass}
                                      placeholder="Thumbnail Image"
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
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Product Videos
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        {[
                          { name: "video_provider", label: "Video Provider" },
                          { name: "video_link", label: "Video Link" },
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
                                    <div className="col-span-3 mt-1">
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
                          name="video_provider"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-3 mt-2">
                                  <FormLabel>Video Provider</FormLabel>
                                </div>
                                <div className="col-span-8">
                                  <FormControl>
                                    <Input
                                      className={inputClass}
                                      placeholder="Video Provider"
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
                          name="video_link"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-3 mt-2">
                                  <FormLabel>Video Link</FormLabel>
                                </div>
                                <div className="col-span-8">
                                  <FormControl>
                                    <Input
                                      className={inputClass}
                                      placeholder="Video Link"
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
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Product price
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        {[
                          { name: "unit_price", label: "Regular Unit Price" },
                          { name: "discount_date_range", label: "Discount Date Range" },
                          { name: "discount", label: "Discount" },
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
                                    <div className="col-span-3 mt-1">
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
                          name="unit_price"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-3 mt-2">
                                  <FormLabel>Regular Unit Price</FormLabel>
                                </div>
                                <div className="col-span-8">
                                  <FormControl>
                                    <Input
                                      className={inputClass}
                                      placeholder="Regular Unit Price"
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
                          name="discount_date_range"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-3 mt-2">
                                  <FormLabel>Discount Date Range</FormLabel>
                                </div>
                                <div className="col-span-8">
                                  <FormControl>
                                    <Input
                                      className={inputClass}
                                      placeholder="Discount Date Range"
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
                          name="discount"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-3 mt-2">
                                  <FormLabel>Discount</FormLabel>
                                </div>
                                <div className="col-span-8">
                                  <FormControl>
                                    <Input
                                      className={inputClass}
                                      placeholder="Discount"
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
                        <FormField
                          control={form.control}
                          name="flat_percent"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  className={inputClass}
                                  placeholder="flat_percent"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Reseller Product price
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        {[
                          { name: "unit_price", label: "Regular Unit Price" },
                          { name: "discount_date_range", label: "Discount Date Range" },
                          { name: "discount", label: "Discount" },
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
                                    <div className="col-span-3 mt-1">
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
                          name="unit_price"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-3 mt-2">
                                  <FormLabel>Reseller Unit Price</FormLabel>
                                </div>
                                <div className="col-span-8">
                                  <FormControl>
                                    <Input
                                      className={inputClass}
                                      placeholder="Reseller Unit Price"
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
                          name="discount_date_range"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-3 mt-2">
                                  <FormLabel>Discount Date Range</FormLabel>
                                </div>
                                <div className="col-span-8">
                                  <FormControl>
                                    <Input
                                      className={inputClass}
                                      placeholder="Discount Date Range"
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
                          name="discount"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-3 mt-2">
                                  <FormLabel>Discount</FormLabel>
                                </div>
                                <div className="col-span-8">
                                  <FormControl>
                                    <Input
                                      className={inputClass}
                                      placeholder="Discount"
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
                        <FormField
                          control={form.control}
                          name="flat_percent"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  className={inputClass}
                                  placeholder="flat_percent"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Product Description
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        {[
                          { name: "description", label: "Description" },
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
                                    <div className="col-span-3 mt-1">
                                      <FormLabel>{field.label}</FormLabel>
                                    </div>
                                    <div className="col-span-8">
                                      <FormControl>
                                        <Textarea
                                          className="!rounded-l-none"
                                          defaultValue="New york, USA"
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
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        PDF Specification
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        {[
                          { name: "pdf_specification", label: "PDF Specification" },
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
                                    <div className="col-span-3 mt-1">
                                      <FormLabel>{field.label}</FormLabel>
                                    </div>
                                    <div className="col-span-8">
                                      <FormControl>
                                        <Input type="file"
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
                          name="pdf_specification"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-3 mt-2">
                                  <FormLabel>PDF Specification</FormLabel>
                                </div>
                                <div className="col-span-8">
                                  <FormControl>
                                    <Input type="file"
                                      className={inputClass}
                                      placeholder="PDF Specification"
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
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        SEO Section
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        {[
                          { name: "meta_title", label: "Meta Title" },
                          { name: "meta_description", label: "Meta Description" },
                          { name: "meta_image", label: "Meta Imgae" },
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
                                    <div className="col-span-3 mt-1">
                                      <FormLabel>{field.label}</FormLabel>
                                    </div>
                                    <div className="col-span-8">
                                      <FormControl>
                                        {field.name === "meta_title" ? (
                                          <Input
                                            className={inputClass}
                                            placeholder={field.label}
                                            {...fieldProps}
                                          />
                                        ) : field.name === "meta_description" ? (
                                          <Textarea
                                            className="!rounded-l-none"
                                            defaultValue="New york, USA"
                                          />
                                        ) : field.name === "meta_image" ? (
                                          <Input type="file"
                                            className={inputClass}
                                            placeholder={field.label}
                                            {...fieldProps}
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
                          name="meta_title"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-3 mt-2">
                                  <FormLabel>Meta Title</FormLabel>
                                </div>
                                <div className="col-span-8">
                                  <FormControl>
                                    <Input
                                      className={inputClass}
                                      placeholder="Meta Title"
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
                          name="meta_description"
                          render={({ field }) => (
                            <FormItem>

                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-3 mt-2">
                                  <FormLabel>Meta Description</FormLabel>
                                </div>
                                <div className="col-span-8">
                                  <FormControl>
                                    <Textarea
                                      className="!rounded-l-none"
                                      defaultValue="New york, USA"
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
                          name="meta_image"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-3 mt-2">
                                  <FormLabel>Meta Imgae</FormLabel>
                                </div>
                                <div className="col-span-8">
                                  <FormControl>
                                    <Input type="file"
                                      className={inputClass}
                                      placeholder="Meta Imgae"
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
                    </div>
                  </div>
                </div>

              </div>
              <div className="col-span-4">

                <div className="p-2">
                  <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Product Ceategory
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        {[
                          { name: "main_category", label: "Main Category" },
                          { name: "sub_category", label: "Sub Category" },
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
                                    <div className="col-span-3 mt-1">
                                      <FormLabel>{field.label}</FormLabel>
                                    </div>
                                    <div className="col-span-8">
                                      <FormControl>
                                        {field.name === "main_category" ? (
                                          <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                          >
                                            <FormControl>
                                              <SelectTrigger>
                                                <SelectValue placeholder="Main Category" />
                                              </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                              {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.name}>
                                                  {category.name}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        ) : field.name === "sub_category" ? (
                                          <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                          >
                                            <FormControl>
                                              <SelectTrigger>
                                                <SelectValue placeholder="Sub Category" />
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
                          name="main_category"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-4 mt-2">
                                  <FormLabel>Main Category</FormLabel>
                                </div>
                                <div className="col-span-8">
                                  <FormControl>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Main Category" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {categories.map((category) => (
                                          <SelectItem key={category.id} value={category.name}>
                                            {category.name}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
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
                          name="sub_category"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-4 mt-2">
                                  <FormLabel>Sub Category</FormLabel>
                                </div>
                                <div className="col-span-8">
                                  <FormControl>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Sub Category" />
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
                                </div>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div> */}
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Case On Delivery
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name="case_on_delivery"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-4">
                                  <FormLabel>Status</FormLabel>
                                </div>
                                <div className="col-span-8">
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
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Vat & Tax
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                      {[
                          { name: "tax", label: "TAX" },
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
                                    <div className="col-span-3 mt-1">
                                      <FormLabel>{field.label}</FormLabel>
                                    </div>
                                    <div className="col-span-8">
                                      <FormControl>
                                        {field.name === "tax" ? (
                                          <Input
                                            className={inputClass}
                                            placeholder={field.label}
                                            {...fieldProps}
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
                          name="tax"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-4 mt-2">
                                  <FormLabel>TAX</FormLabel>
                                </div>
                                <div className="col-span-8">
                                  <FormControl>
                                    <Input
                                      className={inputClass}
                                      placeholder="TAX"
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
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className="grid justify-items-end">
            <Button
              className="dark:text-slate-200"
              variant="outline"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
