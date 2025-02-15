"use client";
import * as React from "react"
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";

import { z } from "zod";
import { Button } from "@/app/business/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/business/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/business/components/ui/select";
import Input from "@/shared/Input/Input";

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

  const [isLoading, setIsLoading] = useState(false);

  // Fetch data if editing an existing ticket
  useEffect(() => {
    if (id) {
      const fetchTicket = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
          const response = await fetch(`${apiUrl}/server/api/routes/business/pos/${id}`);
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
      // const response = await fetch(`${apiUrl}/server/api/routes/business/blogs/blogCategories`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(values),
      // });
      const method = id ? "PUT" : "POST";
      const url = id
        ? `${apiUrl}/server/api/routes/business/pos/${id}`
        : `${apiUrl}/server/api/routes/business/pos`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to add pos. Please try again.");
      }

      const result = await response.json();

      showSuccessToast(result.message || "pos added successfully!");
      // router.push("/business/pages/blog_system/pos");
      window.location.href = `${apiUrl}/business/pages/blog_system/pos`;
    } catch (error) {
      showErrorToast("Error adding pos: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]) // Adjust the type according to your data structure

  // Fetch data from an API
  useEffect(() => {
    const fetchCategories = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''
      try {
        const response = await fetch(`${apiUrl}/server/api/routes/business/pos/select/categories`) // Replace with your API endpoint
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

  const [brands, setBrands] = useState<{ id: string; name: string }[]>([]) // Adjust the type according to your data structure

  // Fetch data from an API
  useEffect(() => {
    const fetchBrands = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''
      try {
        const response = await fetch(`${apiUrl}/server/api/routes/business/pos/select/brands`) // Replace with your API endpoint
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

  const [customers, setCustomers] = useState<{ id: string; name: string }[]>([]) // Adjust the type according to your data structure

  // Fetch data from an API
  useEffect(() => {
    const fetchCustomers = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''
      try {
        const response = await fetch(`${apiUrl}/server/api/routes/business/pos/select/customers`) // Replace with your API endpoint
        const data = await response.json()

        // Check if the response has the 'roles' property and it's an array
        if (data && Array.isArray(data)) {
          setCustomers(data)
        } else {
          console.error('Unexpected data format:', data)
        }
      } catch (error) {
        console.error('Error fetching Customer:', error)
      }
    }

    fetchCustomers()
  }, [])


  const inputClass = "bg-zinc-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-900 dark:border-slate-700 dark:placeholder-slate-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-4 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mx-auto max-w-screen-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="col-span-8">
                <div className="p-2">
                  <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name="product_name"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-6">
                                  <div className="p-2">
                                    <FormControl>
                                      <Input
                                        className={inputClass}
                                        placeholder="Search by Product Name/Barcode"
                                        {...field}
                                      />
                                    </FormControl>
                                  </div>
                                </div>
                                <div className="col-span-3 mt-2">
                                  <div className="col-span-6">
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="All Categories" />
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
                                  </div>
                                </div>
                                <div className="col-span-3 mt-2">
                                  <div className="col-span-6">
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="All Brands" />
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
                                  </div>
                                </div>
                              </div>


                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-3 p-1">
                                  <div className="relative m-2 w-full max-w-xs overflow-hidden bg-white shadow-md">
                                    <a href="#">
                                      <img className="h-40 object-cover" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />
                                    </a>
                                    <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">Sale</span>
                                    <div className="mt-4 px-5 pb-5">
                                      <a href="#">
                                        <h5 className="text-xl font-semibold tracking-tight text-slate-900">Nike Air MX Super 5000</h5>
                                      </a>
                                      <div className="flex items-center justify-between">
                                        <p>
                                          <span className="text-3xl font-bold text-slate-900">$249</span>
                                          <span className="text-sm text-slate-900 line-through">$299</span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-span-3 p-1">
                                  <div className="relative m-2 w-full max-w-xs overflow-hidden bg-white shadow-md">
                                    <a href="#">
                                      <img className="h-40 object-cover" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />
                                    </a>
                                    <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">Sale</span>
                                    <div className="mt-4 px-5 pb-5">
                                      <a href="#">
                                        <h5 className="text-xl font-semibold tracking-tight text-slate-900">Nike Air MX Super 5000</h5>
                                      </a>
                                      <div className="flex items-center justify-between">
                                        <p>
                                          <span className="text-3xl font-bold text-slate-900">$249</span>
                                          <span className="text-sm text-slate-900 line-through">$299</span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-span-3 p-1">
                                  <div className="relative m-2 w-full max-w-xs overflow-hidden bg-white shadow-md">
                                    <a href="#">
                                      <img className="h-40 object-cover" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />
                                    </a>
                                    <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">Sale</span>
                                    <div className="mt-4 px-5 pb-5">
                                      <a href="#">
                                        <h5 className="text-xl font-semibold tracking-tight text-slate-900">Nike Air MX Super 5000</h5>
                                      </a>
                                      <div className="flex items-center justify-between">
                                        <p>
                                          <span className="text-3xl font-bold text-slate-900">$249</span>
                                          <span className="text-sm text-slate-900 line-through">$299</span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-span-3 p-1">
                                  <div className="relative m-2 w-full max-w-xs overflow-hidden bg-white shadow-md">
                                    <a href="#">
                                      <img className="h-40 object-cover" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />
                                    </a>
                                    <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">Sale</span>
                                    <div className="mt-4 px-5 pb-5">
                                      <a href="#">
                                        <h5 className="text-xl font-semibold tracking-tight text-slate-900">Nike Air MX Super 5000</h5>
                                      </a>
                                      <div className="flex items-center justify-between">
                                        <p>
                                          <span className="text-3xl font-bold text-slate-900">$249</span>
                                          <span className="text-sm text-slate-900 line-through">$299</span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-span-3 p-1">
                                  <div className="relative m-2 w-full max-w-xs overflow-hidden bg-white shadow-md">
                                    <a href="#">
                                      <img className="h-40 object-cover" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />
                                    </a>
                                    <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">Sale</span>
                                    <div className="mt-4 px-5 pb-5">
                                      <a href="#">
                                        <h5 className="text-xl font-semibold tracking-tight text-slate-900">Nike Air MX Super 5000</h5>
                                      </a>
                                      <div className="flex items-center justify-between">
                                        <p>
                                          <span className="text-3xl font-bold text-slate-900">$249</span>
                                          <span className="text-sm text-slate-900 line-through">$299</span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-span-3 p-1">
                                  <div className="relative m-2 w-full max-w-xs overflow-hidden bg-white shadow-md">
                                    <a href="#">
                                      <img className="h-40 object-cover" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />
                                    </a>
                                    <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">Sale</span>
                                    <div className="mt-4 px-5 pb-5">
                                      <a href="#">
                                        <h5 className="text-xl font-semibold tracking-tight text-slate-900">Nike Air MX Super 5000</h5>
                                      </a>
                                      <div className="flex items-center justify-between">
                                        <p>
                                          <span className="text-3xl font-bold text-slate-900">$249</span>
                                          <span className="text-sm text-slate-900 line-through">$299</span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-span-3 p-1">
                                  <div className="relative m-2 w-full max-w-xs overflow-hidden bg-white shadow-md">
                                    <a href="#">
                                      <img className="h-40 object-cover" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />
                                    </a>
                                    <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">Sale</span>
                                    <div className="mt-4 px-5 pb-5">
                                      <a href="#">
                                        <h5 className="text-xl font-semibold tracking-tight text-slate-900">Nike Air MX Super 5000</h5>
                                      </a>
                                      <div className="flex items-center justify-between">
                                        <p>
                                          <span className="text-3xl font-bold text-slate-900">$249</span>
                                          <span className="text-sm text-slate-900 line-through">$299</span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-span-3 p-1">
                                  <div className="relative m-2 w-full max-w-xs overflow-hidden bg-white shadow-md">
                                    <a href="#">
                                      <img className="h-40 object-cover" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />
                                    </a>
                                    <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">Sale</span>
                                    <div className="mt-4 px-5 pb-5">
                                      <a href="#">
                                        <h5 className="text-xl font-semibold tracking-tight text-slate-900">Nike Air MX Super 5000</h5>
                                      </a>
                                      <div className="flex items-center justify-between">
                                        <p>
                                          <span className="text-3xl font-bold text-slate-900">$249</span>
                                          <span className="text-sm text-slate-900 line-through">$299</span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
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
                          Save
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

              </div>

              <div className="col-span-4">
                <div className="p-2">
                  <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name="product_name"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-10">
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Walk in Customer" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {customers.map((customer) => (
                                        <SelectItem key={customer.id} value={customer.name}>
                                          {customer.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="col-span-2">
                                  <Button
                                    className="dark:text-slate-200"
                                    variant="outline"
                                    type="submit"
                                  >
                                    Save
                                  </Button>
                                </div>

                              </div>

                              <div className="grid grid-cols-12 text-white">
                                <div className="col-span-12 min-h-96">
                                  <p>No Product Added</p>
                                </div>

                                <div className="col-span-6">
                                  <span>Sub Total</span>
                                </div>
                                <div className="col-span-6">
                                  <span>$ 0.00</span>
                                </div>
                                <div className="col-span-6">
                                  <span>Tax</span>
                                </div>
                                <div className="col-span-6">
                                  <span>$ 0.00</span>
                                </div>
                                <div className="col-span-6">
                                  <span>Shipping</span>
                                </div>
                                <div className="col-span-6">
                                  <span>$ 0.00</span>
                                </div>
                                <div className="col-span-6">
                                  <span>Discount</span>
                                </div>
                                <div className="col-span-6">
                                  <span>$ 0.00</span>
                                </div>
                                <div className="col-span-6">
                                  <span>Total</span>
                                </div>
                                <div className="col-span-6">
                                  <span>$ 0.00</span>
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
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div >
  );
}
