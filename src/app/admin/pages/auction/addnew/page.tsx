"use client";
import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { useState, useEffect, useRef } from 'react';
import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";

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
import Breadcrumb from "@/app/admin/components/Breadcrumbs/Breadcrumb"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/admin/components/ui/select";

import Textarea from "@/shared/Textarea/Textarea";

const formSchema = z.object({
  product_name: z.string().min(4, {
    message: "Product Name must be at least 4 characters.",
  }),
  brand: z.string().min(1, {
    message: "Select Brand",
  }),
  unit: z.string().min(1, {
    message: "Unit required!",
  }),
  minimum_purchase_qty: z.string().min(1, {
    message: "Minimum Purchase Qty required!",
  }),
  tag: z.string().min(1, {
    message: "Tag Purchase Qty required!",
  }),
  thumbnail_image: z.string().min(3, {
    message: "thumbnail image required!",
  }),
  gallery_images: z.string().min(3, {
    message: "gallery images required!",
  }),
  stating_bidding_price: z.string().min(3, {
    message: "stating bidding price required!",
  }),
  main_category: z.string().min(3, {
    message: "Select Main category",
  }),
  sub_category: z.string().min(3, {
    message: "Select Sub category",
  }),

});

export default function AddOrEdit() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_name: "",
      brand: "",
      unit: "",
      minimum_purchase_qty: "",
      tag: "",
      thumbnail_image: "",
      gallery_images: "",
      stating_bidding_price: "",
      main_category: "",
      sub_category: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fetch data if editing an existing ticket
  useEffect(() => {
    if (id) {
      const fetchTicket = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
          const response = await fetch(`${apiUrl}/server/api/routes/admin/auctionProduct/${id}`);
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
        ? `${apiUrl}/server/api/routes/admin/auctionProduct/${id}`
        : `${apiUrl}/server/api/routes/admin/auctionProduct`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to add auction product');
      }

      const result = await response.json();
      showSuccessToast(result.message || "auction product added successfully!");

      // Redirect to another page after success
      window.location.href = `${apiUrl}/admin/pages/auction`;
    } catch (error) {
      showErrorToast("Error adding auction product: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  const [brands, setBrands] = useState<{ id: string; name: string }[]>([]) // Adjust the type according to your data structure
  // Fetch data from an API
  useEffect(() => {
    const fetchBrands = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''
      try {
        const response = await fetch(`${apiUrl}/server/api/routes/admin/products/select/brands`) // Replace with your API endpoint
        const data = await response.json()

        // Check if the response has the 'roles' property and it's an array
        if (data && Array.isArray(data)) {
          setBrands(data)
        } else {
          console.error('Unexpected data format:', data)
        }
      } catch (error) {
        console.error('Error fetching Brand:', error)
      }
    }

    fetchBrands()
  }, [])

  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]) // Adjust the type according to your data structure
  // Fetch data from an API

  useEffect(() => {
    const fetchCategories = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''
      try {
        const response = await fetch(`${apiUrl}/server/api/routes/admin/products/select/categories`) // Replace with your API endpoint
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

            <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Breadcrumb pageName="Add Your Auction Product" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">

              <div className="col-span-7">
                <div className="p-2">
                  <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        {id ? "Edit Product Information" : "Add Product Information"}
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        {[
                          { name: "product_name", label: "Product Name" },
                          { name: "brand", label: "NID front Part" },
                          { name: "unit", label: "Unit" },
                          { name: "weight", label: "Weight" },
                          { name: "tag", label: "Tags" },
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
                                        {field.name === "product_name" ? (
                                          <Input type="text"
                                            className={inputClass}
                                            placeholder={field.label}
                                            {...fieldProps}
                                          />
                                        ) : field.name === "brand" ? (
                                          <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                          >
                                            <FormControl>
                                              <SelectTrigger>
                                                <SelectValue placeholder="Select Brand" />
                                              </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                              {brands.map((brand) => (
                                                <SelectItem key={brand.id} value={brand.name}>
                                                  {brand.name}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        ) : field.name === "unit" ? (
                                          <Input type="text"
                                            className={inputClass}
                                            placeholder={field.label}
                                            {...fieldProps}
                                          />
                                        ) : field.name === "weight" ? (
                                          <Input type="text"
                                            className={inputClass}
                                            placeholder={field.label}
                                            {...fieldProps}
                                          />
                                        ) : field.name === "tag" ? (
                                          <Input type="text"
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
                          name="product_name"
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
                          name="brand"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-3 mt-2">
                                  <FormLabel>Brand</FormLabel>
                                </div>
                                <div className="col-span-8">
                                  <FormControl>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select Brand" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {brands.map((brand) => (
                                          <SelectItem key={brand.id} value={brand.name}>
                                            {brand.name}
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
                        />
                      </div> */}
                      {/* <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name="unit"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-3 mt-2">
                                  <FormLabel>Unit</FormLabel>
                                </div>
                                <div className="col-span-8">
                                  <FormControl>
                                    <Input
                                      className={inputClass}
                                      placeholder="Unit"
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
                          name="weight"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-3 mt-2">
                                  <FormLabel>Weight</FormLabel>
                                </div>
                                <div className="col-span-8">
                                  <FormControl>
                                    <Input
                                      className={inputClass}
                                      placeholder="Weight"
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
                          name="tag"
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
                          { name: "gallery_images", label: "Gallery Images" },
                          { name: "thumbnail_image", label: "Thumbnail Image" },
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
                                        {field.name === "gallery_images" ? (
                                          <Input type="file"
                                            className={inputClass}
                                            placeholder={field.label}
                                            {...fieldProps}
                                          />
                                        ) : field.name === "thumbnail_image" ? (
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
                          name="gallery_images"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-3 mt-2">
                                  <FormLabel>Gallery Images</FormLabel>
                                </div>
                                <div className="col-span-8">
                                  <FormControl>
                                    <Input type="file"
                                      className={inputClass}
                                      placeholder="Gallery Images"
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
                          name="thumbnail_image"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-3 mt-2">
                                  <FormLabel>Thumbnail Image</FormLabel>
                                </div>
                                <div className="col-span-8">
                                  <FormControl>
                                    <Input type="file"
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
                                        {field.name === "video_provider" ? (
                                          <Input type="text"
                                            className={inputClass}
                                            placeholder={field.label}
                                            {...fieldProps}
                                          />
                                        ) : field.name === "video_link" ? (
                                          <Input type="text"
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
                        Product Bidding Price & Date Range
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        {[
                          { name: "stating_bidding_price", label: "Stating Bidding Price" },
                          { name: "attribute", label: "Auction Date Range" },
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
                                        {field.name === "stating_bidding_price" ? (
                                          <Input type="text"
                                            className={inputClass}
                                            placeholder={field.label}
                                            {...fieldProps}
                                          />
                                        ) : field.name === "attribute" ? (
                                          <Input type="text"
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
                          name="stating_bidding_price"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-3 mt-2">
                                  <FormLabel>Stating Bidding Price</FormLabel>
                                </div>
                                <div className="col-span-8">
                                  <FormControl>
                                    <Input
                                      className={inputClass}
                                      placeholder="Stating Bidding Price"
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
                          name="attribute"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-3 mt-2">
                                  <FormLabel>Auction Date Range</FormLabel>
                                </div>
                                <div className="col-span-8">
                                  <FormControl>
                                    <Input
                                      className={inputClass}
                                      placeholder="Auction Date Range"
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
                        Product Description
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        {[
                          { name: "product_description", label: "Description" },
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
                                        <Input type="text"
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
                          name="product_description"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-3 mt-2">
                                  <FormLabel>Description</FormLabel>
                                </div>
                                <div className="col-span-8">
                                  <FormControl>
                                    <Input
                                      className={inputClass}
                                      placeholder="Description"
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
                                          <Input type="text"
                                            className={inputClass}
                                            placeholder={field.label}
                                            {...fieldProps}
                                          />
                                        ) : field.name === "meta_description" ? (
                                          <Textarea></Textarea>
                                        ) : field.name === "meta_image" ? (
                                          <Input type="text"
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
                              <FormLabel>Meta Description</FormLabel>
                              <FormControl>
                                <Textarea></Textarea>
                              </FormControl>
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

              <div className="col-span-5">
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
                        Shipping Configuration
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        {[
                          { name: "free_shippling", label: "Free Shipping" },
                          { name: "flat_rate", label: "Sub Category" },
                          { name: "qty_multi", label: "Is Product Quantity Multiply" },
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
                                        {field.name === "free_shippling" ? (
                                          <Switch />
                                        ) : field.name === "flat_rate" ? (
                                          <Switch />
                                        ) : field.name === "qty_multi" ? (
                                          <Switch />
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
                          name="free_shippling"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-6">
                                  <FormLabel>Free Shipping</FormLabel>
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
                        /> */}
                      </div>
                      {/* <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name="flat_rate"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-6">
                                  <FormLabel>Flat Rate</FormLabel>
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
                      </div> */}
                      {/* <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name="qty_multi"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-6">
                                  <FormLabel>Is Product Quantity Multiply</FormLabel>
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
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Stock Visibility
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        {[
                          { name: "show_stock_quantity", label: "Show Stock quantity" },
                          { name: "show_stock", label: "Show Stock With Text Only" },
                          { name: "hide_stock", label: "Hide Stock" },
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
                                        {field.name === "show_stock_quantity" ? (
                                          <Switch />
                                        ) : field.name === "show_stock" ? (
                                          <Switch />
                                        ) : field.name === "hide_stock" ? (
                                          <Switch />
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
                          name="show_stock_quantity"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-6">
                                  <FormLabel>Show Stock quantity</FormLabel>
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
                        /> */}
                      </div>
                      {/* <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name=""
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-6">
                                  <FormLabel>Show Stock With Text Only</FormLabel>
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
                      </div> */}
                      {/* <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name=""
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-6">
                                  <FormLabel>Hide Stock</FormLabel>
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
                        {[
                          { name: "case_on_delivery", label: "Status" },
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
                                        <Switch />
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
                          name="show_stock_quantity"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-6">
                                  <FormLabel>Status</FormLabel>
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
                        /> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Estimate Shipping Time
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        {[
                          { name: "shipping_day", label: "Shipping Days" },
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
                                        <Input type="text"
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
                          name="shipping_day"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-4 mt-2">
                                  <FormLabel>Shipping Days</FormLabel>
                                </div>
                                <div className="col-span-6">
                                  <FormControl>
                                    <Input
                                      className={inputClass}
                                      placeholder=""
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
                                        <Input type="text"
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
                          name="tax"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-4 mt-2">
                                  <FormLabel>TAX</FormLabel>
                                </div>
                                <div className="col-span-6">
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
                        {/* <FormField
                          control={form.control}
                          name=""
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                              </FormControl>
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
