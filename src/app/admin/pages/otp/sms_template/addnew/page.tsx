"use client";
import * as React from "react"
import { useState, useEffect } from 'react';
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
});

export default function Addnew() {
  // ...
  // 1. Define your form.
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

  // 2. Define a submit handler.
  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   // Do something with the form values.
  //   // ✅ This will be type-safe and validated.
  //   console.log(values);
  // }

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (values) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

    if (!apiUrl) {
      showErrorToast("API URL is not configured.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/server/api/routes/admin/otp/sms_template`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to add sms template. Please try again.");
      }

      const result = await response.json();

      showSuccessToast(result.message || "sms template added successfully!");
      // router.push("/admin/pages/blog_system/sms template");
      window.location.href = `${apiUrl}/admin/pages/blog_system/sms template`;
    } catch (error) {
      showErrorToast("Error adding sms template: " + (error instanceof Error ? error.message : "Unknown error"));
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
                      Delivery Boy Information
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-3 mt-2">
                                <FormLabel>Name</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
                                  <Input
                                    className={inputClass}
                                    placeholder="Delivery Boy Name"
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
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-3 mt-2">
                                <FormLabel>Email</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
                                  <Input
                                    className={inputClass}
                                    placeholder="Delivery Boy Email"
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
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-3 mt-2">
                                <FormLabel>Phone</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
                                  <Input
                                    className={inputClass}
                                    placeholder="Delivery Boy Phone"
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
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-3 mt-2">
                                <FormLabel>Password</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
                                  <Input
                                    className={inputClass}
                                    placeholder="Password"
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
                        name="country_id"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-3 mt-2">
                                <FormLabel>Country</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
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
                        name="state_id"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-3 mt-2">
                                <FormLabel>State</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
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
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="city_id"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-3 mt-2">
                                <FormLabel>City</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select City" />
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
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="avatar_original"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-3 mt-2">
                                <FormLabel>Image</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
                                  <Input type="file"
                                    className={inputClass}
                                    placeholder="Image"
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
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Textarea></Textarea>
                            </FormControl>
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
          </div>
        </form>
      </Form>
    </div>
  );
}
