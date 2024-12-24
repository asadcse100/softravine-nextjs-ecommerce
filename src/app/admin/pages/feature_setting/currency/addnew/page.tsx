"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import Breadcrumb from "@/app/admin/components/Breadcrumbs/Breadcrumb";
import { Button } from "@/app/admin/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/admin/components/ui/form";
import Input from "@/shared/Input/Input";
import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";
import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";


const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters." }),
  price: z.string().min(1, { message: "Price is required." }),
  category: z.string().min(1, { message: "Please select a category." }),
});

const categories = [
  { value: "", label: "Select a category" },
  { value: "electronics", label: "Electronics" },
  { value: "fashion", label: "Fashion" },
  { value: "home_appliances", label: "Home Appliances" },
];

export default function AddOrEditCurrency() {
  const router = useRouter();
  const { productId } = router.query;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      category: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // Watch category and update title dynamically
  const selectedCategory = form.watch("category");

  useEffect(() => {
    if (selectedCategory) {
      const categoryLabel =
        categories.find((cat) => cat.value === selectedCategory)?.label || "";
      form.setValue("title", `${categoryLabel} Product`);
    }
  }, [selectedCategory, form]);

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
          const response = await fetch(`${apiUrl}/server/api/routes/admin/feature_setting/currency/${productId}`);
          const data = await response.json();
          form.reset(data);
        } catch (error) {
          showErrorToast("Failed to fetch product data.");
        }
      };
      fetchProduct();
    }
  }, [productId]);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (values) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

    if (!apiUrl) {
      showErrorToast("API URL is not configured.");
      return;
    }

    setIsLoading(true);

    try {
      const method = productId ? "PUT" : "POST";
      const url = productId
        ? `${apiUrl}/server/api/routes/admin/feature_setting/currency/${productId}`
        : `${apiUrl}/server/api/routes/admin/feature_setting/currency`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to save product. Please try again.");
      }

      const result = await response.json();
      showSuccessToast(result.message || "Product saved successfully!");
      router.push("/products");
    } catch (error) {
      showErrorToast(
        "Error saving product: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "bg-zinc-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-900 dark:border-slate-700 dark:placeholder-slate-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-2 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <Breadcrumb />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mx-auto max-w-screen-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="col-span-7">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      {productId ? "Edit Product" : "Add Product"}
                    </h3>
                  </div>
                  <div className="py-6">
                    {[
                      { name: "title", label: "Product Title" },
                      { name: "description", label: "Description" },
                      { name: "price", label: "Price" },
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
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-3 mt-2">
                                <FormLabel>Category</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
                                  <select
                                    {...field}
                                    className={inputClass}
                                  >
                                    {categories.map((option) => (
                                      <option
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </option>
                                    ))}
                                  </select>
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
