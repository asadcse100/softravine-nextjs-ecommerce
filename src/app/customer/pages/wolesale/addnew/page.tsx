"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/app/customer/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/customer/components/ui/form";
import Input from "@/shared/Input/Input";
import { Switch } from "@/app/customer/components/ui/switch";
import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";

const formSchema = z.object({
  name: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  brand_id: z.string().min(3, {
    message: "Brand must be at least 3 characters.",
  }),
  unit: z.string().min(3, {
    message: "Unit must be at least 3 characters.",
  }),
  weight: z.string().min(3, {
    message: "Weight must be at least 3 characters.",
  }),
  min_qty: z.string().min(3, {
    message: "Minimum Purchase Qty must be at least 3 characters.",
  }),
  tag: z.string().min(3, {
    message: "Tag Purchase Qty must be at least 3 characters.",
  }),
  barcode: z.string().min(3, {
    message: "Barcode Purchase Qty must be at least 3 characters.",
  }),
  refundable: z.string().min(3, {
    message: "refundable Purchase Qty must be at least 3 characters.",
  }),
  photos: z.string().min(3, {
    message: "thumbnail_image Purchase Qty must be at least 3 characters.",
  }),
  thumbnail_img: z.string().min(3, {
    message: "thumbnail_img Purchase Qty must be at least 3 characters.",
  }),
  video_provider: z.string().min(3, {
    message: "Video Provider Purchase Qty must be at least 3 characters.",
  }),
  video_link: z.string().min(3, {
    message: "Video Link Purchase Qty must be at least 3 characters.",
  }),
  unit_price: z.string().min(3, {
    message: "unit_price Qty must be at least 3 characters.",
  }),
  wholesale_min_qty: z.string().min(3, {
    message: "wholesale_min_qty Qty must be at least 3 characters.",
  }),
  wholesale_max_qty: z.string().min(3, {
    message: "wholesale_max_qty Qty must be at least 3 characters.",
  }),
  wholesale_price: z.string().min(3, {
    message: "wholesale_price Qty must be at least 3 characters.",
  }),
  reseller_unit_price: z.string().min(3, {
    message: "reseller_unit_price Qty must be at least 3 characters.",
  }),
  reseller_min_qty: z.string().min(3, {
    message: "reseller_min_qty Qty must be at least 3 characters.",
  }),
  reseller_max_qty: z.string().min(3, {
    message: "reseller_max_qty Qty must be at least 3 characters.",
  }),
  reseller_price: z.string().min(3, {
    message: "reseller_price Qty must be at least 3 characters.",
  }),
  current_stock: z.string().min(3, {
    message: "current_stock Qty must be at least 3 characters.",
  }),
  sku: z.string().min(3, {
    message: "sku Qty must be at least 3 characters.",
  }),
  description: z.string().min(3, {
    message: "description Qty must be at least 3 characters.",
  }),
  pdf: z.string().min(3, {
    message: "pdf Qty must be at least 3 characters.",
  }),
  meta_title: z.string().min(3, {
    message: "meta_title Qty must be at least 3 characters.",
  }),
  meta_description: z.string().min(3, {
    message: "meta_description Qty must be at least 3 characters.",
  }),
  meta_img: z.string().min(3, {
    message: "meta_img Qty must be at least 3 characters.",
  }),
  main_category: z.string().min(3, {
    message: "main_category Qty must be at least 3 characters.",
  }),
  sub_category: z.string().min(3, {
    message: "sub_category Qty must be at least 3 characters.",
  }),
  shipping_type: z.string().min(3, {
    message: "shipping_type Qty must be at least 3 characters.",
  }),
  low_stock_quantity: z.string().min(3, {
    message: "low_stock_quantity Qty must be at least 3 characters.",
  }),
  stock_visibility_state: z.string().min(3, {
    message: "stock_visibility_state Qty must be at least 3 characters.",
  }),
  cash_on_delivery: z.string().min(3, {
    message: "cash_on_delivery Qty must be at least 3 characters.",
  }),
  est_shipping_days: z.string().min(3, {
    message: "est_shipping_days Qty must be at least 3 characters.",
  }),
  tax: z.string().min(3, {
    message: "tax Qty must be at least 3 characters.",
  }),
  tax_type: z.string().min(3, {
    message: "tax_type Qty must be at least 3 characters.",
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
      brand_id: "",
      unit: "",
      weight: "",
      min_qty: "",
      tag: "",
      barcode: "",
      refundable: "",
      photos: "",
      thumbnail_img: "",
      video_provider: "",
      video_link: "",
      unit_price: "",
      wholesale_min_qty: "",
      wholesale_price: "",
      reseller_unit_price: "",
      reseller_min_qty: "",
      reseller_max_qty: "",
      reseller_price: "",
      current_stock: "",
      sku: "",
      description: "",
      pdf: "",
      meta_title: "",
      meta_description: "",
      meta_img: "",
      main_category: "",
      sub_category: "",
      shipping_type: "",
      low_stock_quantity: "",
      stock_visibility_state: "",
      cash_on_delivery: "",
      est_shipping_days: "",
      tax: "",
      tax_type: "",
    },
  });

    const [isLoading, setIsLoading] = useState(false);
  
    // Fetch data if editing an existing ticket
    useEffect(() => {
      if (id) {
        const fetchTicket = async () => {
          try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
            const response = await fetch(`${apiUrl}/server/api/routes/customer/wholedale/${id}`);
            const data = await response.json();
            form.reset(data); // Populate form with existing data
          } catch (error) {
            showErrorToast("Failed to fetch blog category data.");
          }
        };
        fetchTicket();
      }
    }, [id, form]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const inputClass = "bg-zinc-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-900 dark:border-slate-700 dark:placeholder-slate-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

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
                      {id ? "Edit Product Information" : "Add Product Information"}
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Product Name"
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
                        name="brand_id"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Brand</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Brand"
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
                        name="unit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Unit</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Unit"
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
                        name="min_qty"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Minimum Purchase Qty</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="minimum_purchase_qty"
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
                        name="tags[]"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="tag"
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
                        name="barcode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Barcode</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="barcode"
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
                          name="refundable"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center space-x-12">
                                <FormLabel className="mt-2">refundable</FormLabel>
                                <Switch />
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                  </div>
                </div>
              </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 sm:grid-cols-2">
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Product Images
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="photos"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gallery Images</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Gallery Images"
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
                        name="thumbnail_img"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Thumbnail Image</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Thumbnail Image"
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
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 sm:grid-cols-2">
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                    Product Videos
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="video_provider"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Video Provider</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Video Provider"
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
                        name="video_link"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Video Link</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Video Link"
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
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 sm:grid-cols-2">
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                    Product price
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="unit_price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Regular Unit Price</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Unit Price"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="wholesale_min_qty[]"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Wholesale Price</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Min Qty"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="wholesale_max_qty[]"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Max Qty"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="wholesale_price[]"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Price Per Unit"
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
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 sm:grid-cols-2">
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                    Reseller Product Price
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="reseller_unit_price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reseller Unit Price</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Unit Price"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="reseller_min_qty[]"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reseller Wholesale Price</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Reseller Min Qty"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="reseller_max_qty[]"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Reseller Max Qty"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="reseller_price[]"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Price Per Unit"
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
            </div>


            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 sm:grid-cols-2">
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                    Product stock
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="current_stock"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="quantity"
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
                        name="sku"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SKU</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="sku"
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
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 sm:grid-cols-2">
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                    Product Description
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="product_description"
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
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 sm:grid-cols-2">
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                    PDF Specification
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="pdf"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>PDF Specification</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="pdf_specification"
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
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 sm:grid-cols-2">
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                    SEO Section
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="meta_title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta Title</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="meta_title"
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
                        name="meta_description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta Description</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="meta_description"
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
                        name="meta_image"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta Imgae</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="meta_image"
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
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 sm:grid-cols-2">
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                    Product Ceategory
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="main_category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Main Category</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder=""
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
                        name="sub_category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sub Category</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder=""
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
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 sm:grid-cols-2">
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                    Shipping Configuration
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="shipping_type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Free Shipping</FormLabel>
                            <FormControl>
                              {/* <Input
                                className={inputClass}
                                placeholder=""
                                {...field}
                              /> */}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="shipping_type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Flat Rate</FormLabel>
                            <FormControl>
                              {/* <Input
                                className={inputClass}
                                placeholder=""
                                {...field}
                              /> */}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="shipping_type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Is Product Quantity Multiply</FormLabel>
                            <FormControl>
                              {/* <Input
                                className={inputClass}
                                placeholder="meta_image"
                                {...field}
                              /> */}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 sm:grid-cols-2">
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                    Stock Visibility
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="stock_visibility_state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Show Stock quantity</FormLabel>
                            <FormControl>
                              {/* <Input
                                className={inputClass}
                                placeholder=""
                                {...field}
                              /> */}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="stock_visibility_state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Show Stock With Text Only</FormLabel>
                            <FormControl>
                              {/* <Input
                                className={inputClass}
                                placeholder=""
                                {...field}
                              /> */}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="stock_visibility_state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hide Stock</FormLabel>
                            <FormControl>
                              {/* <Input
                                className={inputClass}
                                placeholder="meta_image"
                                {...field}
                              /> */}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 sm:grid-cols-2">
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                    Case On Delivery
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="cash_on_delivery"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                              {/* <Input
                                className={inputClass}
                                placeholder=""
                                {...field}
                              /> */}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 sm:grid-cols-2">
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                    Estimate Shipping Time
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="est_shipping_days"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Shipping Days</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder=""
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
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 sm:grid-cols-2">
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                    Vat & Tax
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="tax[]"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>TAX</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder=""
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="tax_type[]"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              {/* <Input
                                className={inputClass}
                                placeholder=""
                                {...field}
                              /> */}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
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
              >
                Submit Product
              </Button>
            </div>
        </form>
      </Form>
    </div>
  );
}
