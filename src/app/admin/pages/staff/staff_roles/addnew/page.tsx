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
import { Switch } from "@/app/admin/components/ui/switch";

const formSchema = z.object({
  permissions: z.string().min(10, {
    message: "permissions must be at least 10 characters.",
  }),
});

export default function Addnew() {
  // ...
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      permissions: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const inputClass ="bg-zinc-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-900 dark:border-slate-800 dark:placeholder-slate-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-4 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mx-auto max-w-screen-2xl">
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1 sm:grid-cols-1">
              <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Role Information
                  </h3>
                </div>
                <div className="py-6">
                  <div className="flex flex-col gap-5.5 p-6.5">
                    <FormField
                      control={form.control}
                      name="permissions[]"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Name</FormLabel> */}
                          <FormControl>
                            <Input
                              className={inputClass}
                              placeholder="Name"
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
              <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Product
                  </h3>
                </div>
                <div className="grid gap-4 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 py-6">
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Add New product
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
                            Show All Products
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
                            Show In House Products
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
                            Show Seller Products
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
                          <FormLabel className="mt-2">Product Edit</FormLabel>
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
                            Product Duplicate
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
                          <FormLabel className="mt-2">Product Delete</FormLabel>
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
                            Show Digital Products
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
                            Add Digital Product
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
                            Edit Digital Product
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
                            Delete Digital Product
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
                            Download Digital Product
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
                            Product Bulk Import
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
                            Product Bulk Export
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
                    Product category
                  </h3>
                </div>
                <div className="grid gap-4 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 py-6">
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            View Product Categories
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
                            Add Product Category
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
                            Edit Product Category
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
                            Delete Product Category
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
                            Set Category Wise Discount
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
                    Brand
                  </h3>
                </div>
                <div className="grid gap-4 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 py-6">
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            View All Brands
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
                          <FormLabel className="mt-2">Add Brand</FormLabel>
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
                          <FormLabel className="mt-2">Edit Brand</FormLabel>
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
                          <FormLabel className="mt-2">Delete Brand</FormLabel>
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
                            Brand Bulk Upload
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
                    Product Attribute
                  </h3>
                </div>
                <div className="grid gap-4 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 py-6">
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            View Product Attributes
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
                            Add Product Attribute
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
                            Edit Product Attribute
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
                            Delete Product Attribute
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
                            View Product Attribute Values
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
                            Add Product Attribute Values
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
                            Edit Product Attribute Value
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
                            Delete Product Attribute Value
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
                          <FormLabel className="mt-2">View Colors</FormLabel>
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
                          <FormLabel className="mt-2">Add Color</FormLabel>
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
                          <FormLabel className="mt-2">Edit Color</FormLabel>
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
                          <FormLabel className="mt-2">Delete Color</FormLabel>
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
                    Product Review
                  </h3>
                </div>
                <div className="grid gap-4 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 py-6">
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            View Product Reviews
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
                            Publish Product Review
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
                    Sale
                  </h3>
                </div>
                <div className="grid gap-4 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 py-6">
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            View All Orders
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
                            View Inhouse Orders
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
                            View Seller Orders
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
                            View Pickup Point Orders
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
                            View Order Details
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
                            Update Order Payment Status
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
                            Update Order Delivery Status
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
                          <FormLabel className="mt-2">Delete Order</FormLabel>
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
                    Customer
                  </h3>
                </div>
                <div className="grid gap-4 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 py-6">
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            View All Customers
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
                            Login As Customer
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
                          <FormLabel className="mt-2">Ban Customer</FormLabel>
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
                            Delete Customer
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
                            View Classified Products
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
                            Publish Classified Product
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
                            Delete Classified Product
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
                            View Classified Packages
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
                            Add Classified Package
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
                            Edit Classified Package
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
                            Delete Classified Package
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
                    Seller
                  </h3>
                </div>
                <div className="grid gap-4 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 py-6">
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            View All Seller
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
                            View Seller Profile
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
                            Login As Seller
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
                          <FormLabel className="mt-2">Pay to seller</FormLabel>
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
                            Seller Payment History
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
                          <FormLabel className="mt-2">Edit Seller</FormLabel>
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
                          <FormLabel className="mt-2">Delete Seller</FormLabel>
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
                          <FormLabel className="mt-2">Ban Seller</FormLabel>
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
                          <FormLabel className="mt-2">Approve Seller</FormLabel>
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
                            View Seller Payout Requests
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
                            Seller Commission Configuration
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
                            Seller Verification Form Configuration
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
                    Report
                  </h3>
                </div>
                <div className="grid gap-4 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 py-6">
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            In House Product Sale Report
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
                            Seller Products Sale Report
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
                            Products Stock Report
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
                            Product Wishlist Report
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
                            User Search Report
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
                            Commission History report
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
                            Wallet Transaction Report
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
                    Blog
                  </h3>
                </div>
                <div className="grid gap-4 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 py-6">
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">View Blogs</FormLabel>
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
                          <FormLabel className="mt-2">Add Blog</FormLabel>
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
                          <FormLabel className="mt-2">Edit Blog</FormLabel>
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
                          <FormLabel className="mt-2">Delete Blog</FormLabel>
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
                          <FormLabel className="mt-2">Publish Blog</FormLabel>
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
                            View Blog Categories
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
                            Add Blog Category
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
                            Edit Blog Category
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
                            Delete Blog Category
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
                    Marketing
                  </h3>
                </div>
                <div className="grid gap-4 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 py-6">
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            View All Flash Deals
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
                          <FormLabel className="mt-2">Add Flash Deal</FormLabel>
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
                            Edit Flash Deal
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
                            Delete Flash Deal
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
                            Publish Flash Deal
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
                            Featured Flash Deal
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
                            View All Coupons
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
                          <FormLabel className="mt-2">Add Coupon</FormLabel>
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
                          <FormLabel className="mt-2">Edit Coupon</FormLabel>
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
                          <FormLabel className="mt-2">Delete Coupon</FormLabel>
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
                            Send Newsletter
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
                            View All Subscribers
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
                            Delete Subscriber
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
                            View All Dynamic Popups
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
                            Add Dynamic Popups
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
                            Edit Dynamic Popups
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
                            Delete Dynamic Popups
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
                            Publish Dynamic Popups
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
                            View All Custom Alerts
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
                            Add Custom Alerts
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
                            Edit Custom Alerts
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
                            Delete Custom Alerts
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
                            Publish Custom Alerts
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
                    Support
                  </h3>
                </div>
                <div className="grid gap-4 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 py-6">
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            View All Support Tickets
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
                            Reply To Support Tickets
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
                            View All Product Queries
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
                            Reply To Product Queries
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
                            View All Product Conversations
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
                            Reply To Product Conversations
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
                            Delete Product Conversations
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
                    Website Setup
                  </h3>
                </div>
                <div className="grid gap-4 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 py-6">
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">Header Setup</FormLabel>
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
                          <FormLabel className="mt-2">Footer Setup</FormLabel>
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
                            Website Appearance
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
                            View All Website Pages
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
                            Add Website Page
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
                            Edit Website Page
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
                            Delete Website Page
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
                            Select Homepage
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
                            Authentication Layout Settings
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
                    Setup Configurations
                  </h3>
                </div>
                <div className="grid gap-4 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 py-6">
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            General Settings
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
                            Features activation
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
                          <FormLabel className="mt-2">Language Setup</FormLabel>
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
                          <FormLabel className="mt-2">Currency Setup</FormLabel>
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
                            Vat & Tax Setup
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
                            Pickup Point Setup
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
                          <FormLabel className="mt-2">SMTP Settings</FormLabel>
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
                            Payment Methods Configurations
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
                            Order Configuration
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
                            File System & Cache Configuration
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
                            Social media Logins
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
                          <FormLabel className="mt-2">Facebook Chat</FormLabel>
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
                            Facebook Comment
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
                            Analytics Tools Configuration
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
                            Google Recaptcha Configuration
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
                            Google Map Setting
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
                            Google Firebase Setting
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
                            Shipping Configuration
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
                            Shipping Country Setting
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
                            Manage Shipping States
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
                            Manage Shipping Cities
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
                          <FormLabel className="mt-2">Manage Zones</FormLabel>
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
                            Manage Carriers
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
                    Staff
                  </h3>
                </div>
                <div className="grid gap-4 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 py-6">
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            View All Staffs
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
                          <FormLabel className="mt-2">Add Staff</FormLabel>
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
                          <FormLabel className="mt-2">Edit Staff</FormLabel>
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
                          <FormLabel className="mt-2">Delete Staff</FormLabel>
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
                            View Staff Roles
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
                          <FormLabel className="mt-2">Add Staff Role</FormLabel>
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
                            Edit Staff Role
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
                            Delete Staff Role
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
                    System
                  </h3>
                </div>
                <div className="grid gap-4 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 py-6">
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">System Update</FormLabel>
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
                          <FormLabel className="mt-2">Server status</FormLabel>
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
                          <FormLabel className="mt-2">Manage Addons</FormLabel>
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
                          <FormLabel className="mt-2">Delete Staff</FormLabel>
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
                            Admin Dashboard
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
                    POS System
                  </h3>
                </div>
                <div className="grid gap-4 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 py-6">
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">POS Manager</FormLabel>
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
                            POS Configuration
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
                    Auction
                  </h3>
                </div>
                <div className="grid gap-4 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 py-6">
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            View All Auction Products
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
                            View Inhouse Auction Products
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
                            View Seller Auction Products
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
                            Add Auction Product
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
                            Edit Auction Product
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
                            Delete Auction Product
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
                            View Auction Product Bids
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
                            Delete Auction Product Bids
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
                            View Auction Product Orders
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
                    Wholesale
                  </h3>
                </div>
                <div className="grid gap-4 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 py-6">
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            View All Wholesale Products
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
                            View Inhouse Wholesale Products
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
                            View Sellers Wholesale Products
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
                            Add Wholesale Product
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
                            Edit Wholesale Product
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
                            Delete Wholesale Product
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
                    Delivery Boy
                  </h3>
                </div>
                <div className="grid gap-4 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 py-6">
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            View All Delivery Boy
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
                            Add Delivery Boy
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
                            Edit Delivery Boy
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
                            Ban Delivery Boy
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
                            Collect From Delivery Boy
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
                            Pay To Delivery Boy
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
                            Delivery Boy Payment History
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
                            Collected Histories From Delivery Boy
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
                            Order Cancle Request By Delivery Boy
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
                            Delivery Boy Configuration
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
                            Assign Delivery Boy For Orders
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
                    Refund Request
                  </h3>
                </div>
                <div className="grid gap-4 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 py-6">
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            View Refund Requests
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
                            Accept Refund Request
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
                            Reject Refund Request
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
                            View Approved Refund Requests
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
                            View Rejected Refund Requests
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
                            Refund Request Configuration
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
                    Affiliate System
                  </h3>
                </div>
                <div className="grid gap-4 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 py-6">
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Affiliate Registration Form Config
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
                            Affiliate Configurations
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
                            View Affiliate Users
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
                            Pay To Affiliate User
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
                            Affiliate Users Payment History
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
                            View All Referral Users
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
                            View Affiliate Withdraw Requests
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
                            Accept Affiliate Withdraw Requests
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
                            Reject Affiliate Withdraw Request
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
                            View Affiliate Logs
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
                    Offline payment
                  </h3>
                </div>
                <div className="grid gap-4 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 py-6">
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            View All Manual Payment Methods
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
                            Add Manual Payment Method
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
                            Edit Manual Payment Method
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
                            Delete Manual Payment Method
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
                            View All Offline Wallet Recharges
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
                            Approve Offline Wallet Recharge
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
                            View All Offline Customer Package Payments
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
                            Approve Offline Customer Package Payment
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
                            View All Offline Seller Package Payments
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
                            Approve Offline Seller Package Payment
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
                    Club Point
                  </h3>
                </div>
                <div className="grid gap-4 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 py-6">
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            Club Point Configurations
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
                            Set Club Points
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
                            View Users Club Points
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
                    OTP System
                  </h3>
                </div>
                <div className="grid gap-4 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 py-6">
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                            OTP Configurations
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
                          <FormLabel className="mt-2">SMS Templates</FormLabel>
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
                            Sms Providers Configurations
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
                          Send Bulk SMS
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
                  Seller Subscription
                  </h3>
                </div>
                <div className="grid gap-4 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 py-6">
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                          View All Seller Packages
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
                          <FormLabel className="mt-2">Add Seller Package</FormLabel>
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
                          Edit Seller Package
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
                          Delete Seller Package
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
                  Size Guide
                  </h3>
                </div>
                <div className="grid gap-4 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 py-6">
                  <div className="block max-w-sm p-2 rounded-md shadow hover:bg-slate-200 bg-slate-100 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-800">
                    <FormField
                      control={form.control}
                      name="qty_multi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-2">
                          View Size Charts
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
                          <FormLabel className="mt-2">Add Size Charts</FormLabel>
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
                          Edit Size Charts
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
                          Delete Size Charts
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
                          View Measurement Points
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
                          Add Measurement Points
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
                          Edit Measurement Points
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
                          Delete Measurement Points
                          </FormLabel>
                          <Switch />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
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
        </form>
      </Form>
    </div>
  );
}
