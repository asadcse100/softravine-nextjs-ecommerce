"use client";
import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";

const formSchema = z.object({
  name: z.string().min(4, {
    message: "Employe Name must be at least 4 characters.",
  }),
  email: z.string().min(4, {
    message: "Employe email must be at least 4 characters.",
  }),
  mobile: z.string().min(11, {
    message: "Employe mobile must be at least 11 characters.",
  }),
  password: z.string().min(4, {
    message: "Employe password must be at least 4 characters.",
  }),
  role_id: z.string().min(1, {
    message: "Please select role",
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
      mobile: "",
      password: "",
      role_id: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fetch data if editing an existing ticket
  useEffect(() => {
    if (id) {
      const fetchTicket = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
          const response = await fetch(`${apiUrl}/server/api/routes/admin/staff/staffs/${id}`);
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
        ? `${apiUrl}/server/api/routes/admin/staff/staffs/${id}`
        : `${apiUrl}/server/api/routes/admin/staff/staffs`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to add saff. Please try again.");
      }

      const result = await response.json();

      showSuccessToast(result.message || "saff added successfully!");
      // router.push("/admin/pages/blog_system/saff");
      window.location.href = `${apiUrl}/admin/pages/staff/staffs`;
    } catch (error) {
      showErrorToast("Error adding saff: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  //   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  //   if (!apiUrl) {
  //     showErrorToast("API URL is not configured.");
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`${apiUrl}/server/api/routes/admin/staff/staffs`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || "Failed to add category. Please try again.");
  //     }

  //     const result = await response.json();

  //     showSuccessToast(result.message || "Category added successfully!");
  //     router.push("/admin/pages/staff/staffs");
  //   } catch (error) {
  //     showErrorToast("Error adding category: " + (error instanceof Error ? error.message : "Unknown error"));
  //   }
  // }

  const [roles, setRoles] = useState<{ id: number; name: string }[]>([]) // Adjust the type according to your data structure

  // Fetch data from an API
  useEffect(() => {
    const fetchRoles = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''
      try {
        const response = await fetch(`${apiUrl}/server/api/routes/admin/staffs/roles`) // Replace with your API endpoint
        const data = await response.json()

        // Check if the response has the 'roles' property and it's an array
        if (data && Array.isArray(data)) {
          setRoles(data)
        } else {
          console.error('Unexpected data format:', data)
        }
      } catch (error) {
        console.error('Error fetching roles:', error)
      }
    }

    fetchRoles()
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
                      {id ? "Edit Staff Information" : "Add Staff Information"}
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      {[
                        { name: "name", label: "name" },
                        { name: "email", label: "Employe Email" },
                        { name: "phone", label: "Add Phone" },
                        { name: "password", label: "Password" },
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
                      {/* 
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <div className="grid grid-cols-1 md:grid-cols-12">
                            <div className="col-span-3 mt-2">
                              <FormLabel>Employe Name</FormLabel>
                            </div>
                            <div className="col-span-8">
                              <FormControl>
                                <Input
                                  className={inputClass}
                                  placeholder="Employe Name"
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
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <div className="grid grid-cols-1 md:grid-cols-12">
                            <div className="col-span-3 mt-2">
                              <FormLabel>Employe Email</FormLabel>
                            </div>
                            <div className="col-span-8">
                              <FormControl>
                                <Input
                                  className={inputClass}
                                  placeholder="Employe Email"
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
                      name="mobile"
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
                                  placeholder="Phone"
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
                  </div> */}
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      {[
                        { name: "role_id", label: "Role" },
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
                                      <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                      >
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select Role" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          {roles.map((role) => (
                                            <SelectItem key={role.id} value={role.name}>
                                              {role.name}
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
                      ))}

                      {/* <FormField
                        control={form.control}
                        name="role_id"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-3 mt-2">
                                <FormLabel>Role</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select Role" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {roles.map((role) => (
                                        <SelectItem key={role.id} value={role.name}>
                                          {role.name}
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
                    <div className="grid mt-4 justify-items-end px-10">
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
