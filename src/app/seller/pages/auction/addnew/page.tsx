"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/app/seller/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/seller/components/ui/form";
import Input from "@/shared/Input/Input";
import { Switch } from "@/app/admin/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/admin/components/ui/select";

const formSchema = z.object({
  product_name: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  brand: z.string().min(3, {
    message: "Brand must be at least 3 characters.",
  }),
  unit: z.string().min(3, {
    message: "Unit must be at least 3 characters.",
  }),
  weight: z.string().min(3, {
    message: "Weight must be at least 3 characters.",
  }),
  minimum_purchase_qty: z.string().min(3, {
    message: "Minimum Purchase Qty must be at least 3 characters.",
  }),
  tag: z.string().min(3, {
    message: "Tag Purchase Qty must be at least 3 characters.",
  }),
  barcode: z.string().min(3, {
    message: "Barcode Purchase Qty must be at least 3 characters.",
  }),
  thumbnail_image: z.string().min(3, {
    message: "thumbnail_image Purchase Qty must be at least 3 characters.",
  }),
  gallery_images: z.string().min(3, {
    message: "gallery_images Purchase Qty must be at least 3 characters.",
  }),
  video_provider: z.string().min(3, {
    message: "Video Provider Purchase Qty must be at least 3 characters.",
  }),
  video_link: z.string().min(3, {
    message: "Video Link Purchase Qty must be at least 3 characters.",
  }),
});

export default function Addnew() {
  // ...
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_name: "",
      brand: "",
      unit: "",
      weight: "",
      minimum_purchase_qty: "",
      tag: "",
      barcode: "",
      thumbnail_image: "",
      gallery_images: "",
      video_provider: "",
      video_link: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const inputClass =
    "w-full rounded-lg border-[1px] border-primary bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white";

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
                      Product Information
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="product_name"
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
                        name="brand"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Brand</FormLabel>
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
                        name="weight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Weight</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="weight"
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
                        name="minimum_purchase_qty"
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
                        name="tag"
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
                        name="gallery_images"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gallery Images</FormLabel>
                            <FormControl>
                              <Input type="file"
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
                        name="thumbnail_image"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Thumbnail Image</FormLabel>
                            <FormControl>
                              <Input type="file"
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
                    Product Variation
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="color"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Colors</FormLabel>
                            <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Color" />
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="attribute"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Attributes</FormLabel>
                            <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Attributes" />
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
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="discount_date_range"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Discount Date Range</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Discount Date Range"
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
                        name="discount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Discount</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Discount"
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
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 sm:grid-cols-2">
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                    Reseller Product price
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="unit_price"
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
 
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="discount_date_range"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Discount Date Range</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Discount Date Range"
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
                        name="discount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Discount</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Discount"
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
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="quantity"
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
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="external_link"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>External Link</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="External Link"
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
                        name="external_link_button"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>External Link Button</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="External Link Button"
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
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="product_description"
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
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="pdf_specification"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>PDF Specification</FormLabel>
                            <FormControl>
                              <Input type="file"
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
                    <div className="flex flex-col gap-5.5 p-6.5">
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
                              <Input type="file"
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
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="main_category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Main Category</FormLabel>
                            <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Category" />
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
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Sub Category" />
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
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="free_shippling"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                            <div className="flex items-center space-x-12">
                                <FormLabel className="mt-2">
                                Free Shipping
                                </FormLabel>
                                <Switch />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="flat_rate"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                            <div className="flex items-center space-x-12">
                                <FormLabel className="mt-2">
                                Flat Rate
                                </FormLabel>
                                <Switch />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="qty_multi"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                            <div className="flex items-center space-x-12">
                                <FormLabel className="mt-2">
                                Is Product Quantity Multiply
                                </FormLabel>
                                <Switch />
                              </div>
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
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="show_stock_quantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                            <div className="flex items-center space-x-12">
                                <FormLabel className="mt-2">
                                Show Stock quantity
                                </FormLabel>
                                <Switch />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name=""
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                            <div className="flex items-center space-x-12">
                                <FormLabel className="mt-2">
                                Show Stock With Text Only
                                </FormLabel>
                                <Switch />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name=""
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                            <div className="flex items-center space-x-12">
                                <FormLabel className="mt-2">
                                Hide Stock
                                </FormLabel>
                                <Switch />
                              </div>
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
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="show_stock_quantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex items-center space-x-12">
                                <FormLabel className="mt-2">
                                Status
                                </FormLabel>
                                <Switch />
                              </div>
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
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="shipping_day"
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
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="tax"
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
                        name=""
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
