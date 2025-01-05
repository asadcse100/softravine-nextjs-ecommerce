"use client";
import * as React from "react"
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/admin/components/ui/select";
import Input from "@/shared/Input/Input";
import Textarea from "@/shared/Textarea/Textarea";
import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";

const formSchema = z.object({
  name: z.string().min(4, {
    message: "Delivery Boy Name must be at least 4 characters.",
  }),
  email: z.string().min(4, {
    message: "Email must be at least 4 characters.",
  }),
  phone: z.string().min(11, {
    message: "Phone must be at least 11 characters.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
  country_id: z.string().min(1, {
    message: "Must be select country",
  }),
  state_id: z.string().min(1, {
    message: "Must be select state",
  }),
  city_id: z.string().min(1, {
    message: "Must be select city",
  }),
  avatar_original: z.string().min(1, {
    message: "Please Upload a image of delivery boy",
  }),
  address: z.string().min(10, {
    message: "Please give address of Delivery Boy",
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
      email: "",
      phone: "",
      password: "",
      country_id: "",
      state_id: "",
      city_id: "",
      avatar_original: "",
      address: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fetch data if editing an existing ticket
  useEffect(() => {
    if (id) {
      const fetchTicket = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
          const response = await fetch(`${apiUrl}/server/api/routes/admin/deiliveryboy/${id}`);
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
        ? `${apiUrl}/server/api/routes/admin/deiliveryboy/${id}`
        : `${apiUrl}/server/api/routes/admin/deiliveryboy`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to add deliveryboy. Please try again.");
      }

      const result = await response.json();

      showSuccessToast(result.message || "deliveryboy added successfully!");
      // router.push("/admin/pages/blog_system/deliveryboy");
      window.location.href = `${apiUrl}/admin/pages/blog_system/deliveryboy`;
    } catch (error) {
      showErrorToast("Error adding deliveryboy: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  const [countries, setcountries] = useState<{ id: string; name: string }[]>([]) // Adjust the type according to your data structure
  // Fetch data from an API
  useEffect(() => {
    const fetchcountries = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''
      try {
        const response = await fetch(`${apiUrl}/server/api/routes/admin/deliveryboy/select/countries`) // Replace with your API endpoint
        const data = await response.json()

        // Check if the response has the 'roles' property and it's an array
        if (data && Array.isArray(data)) {
          setcountries(data)
        } else {
          console.error('Unexpected data format:', data)
        }
      } catch (error) {
        console.error('Error fetching Brand:', error)
      }
    }

    fetchcountries()
  }, [])

  const inputClass = "bg-zinc-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-900 dark:border-slate-700 dark:placeholder-slate-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-2 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mx-auto max-w-screen-2xl">
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1">
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      {id ? "Edit Delivery Boy Information" : "Add Delivery Boy Information"}
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">

                      {[
                        { name: "name", label: "Name" },
                        { name: "email", label: "Email" },
                        { name: "phone", label: "Phone" },
                        { name: "password", label: "Password", password: "******" },
                        { name: "country_id", label: "Country" },
                        { name: "state_id", label: "State" },
                        { name: "city_id", label: "City" },
                        { name: "avatar_original", label: "Image" },
                        { name: "address", label: "Address" },
                      ].map((field) => (
                        <div key={field.name} className="mt-3 flex flex-col gap-5.5 p-6.5">
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
                                    {/* <FormControl> */}
                                    <FormControl>
                                      {field.name === "name" ? (
                                        <Input
                                          className={inputClass}
                                          placeholder={field.label}
                                          {...fieldProps}
                                        />
                                      ) : field.name === "email" ? (
                                        <Input
                                          className={inputClass}
                                          placeholder={field.label}
                                          {...fieldProps}
                                        />
                                      ) : field.name === "phone" ? (
                                        <Input
                                          className={inputClass}
                                          placeholder={field.label}
                                          {...fieldProps}
                                        />
                                      ) : field.name === "password" ? (
                                        <Input
                                          className={inputClass}
                                          placeholder={field.password}
                                          {...fieldProps}
                                        />
                                      ) : field.name === "country_id" ? (
                                        <Select
                                          onValueChange={field.onChange}
                                          defaultValue={field.value}
                                        >
                                          <FormControl>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select Country" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            {countries.map((country) => (
                                              <SelectItem key={country.id} value={country.name}>
                                                {country.name}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      ) : field.name === "state_id" ? (
                                        <Select
                                          onValueChange={field.onChange}
                                          defaultValue={field.value}
                                        >
                                          <FormControl>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select State" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            <SelectItem value="Apple">Apple</SelectItem>
                                            <SelectItem value="m2@example.com">Pran</SelectItem>
                                            <SelectItem value="m22@example.com">Squre</SelectItem>
                                            <SelectItem value="m3@example.com">ACI</SelectItem>
                                            <SelectItem value="m4@example.com">SoftRavine</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      ) : field.name === "city_id" ? (
                                        <Select
                                          onValueChange={field.onChange}
                                          defaultValue={field.value}
                                        >
                                          <FormControl>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select State" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            <SelectItem value="Apple">Apple</SelectItem>
                                            <SelectItem value="m2@example.com">Pran</SelectItem>
                                            <SelectItem value="m22@example.com">Squre</SelectItem>
                                            <SelectItem value="m3@example.com">ACI</SelectItem>
                                            <SelectItem value="m4@example.com">SoftRavine</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      ) : field.name === "avatar_original" ? (
                                        <Input type="file"
                                          className={inputClass}
                                          placeholder="Image"
                                          {...field}
                                        />
                                      ) : field.name === "address" ? (
                                        <Textarea></Textarea>
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
