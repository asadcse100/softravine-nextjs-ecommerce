"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/admin/components/ui/select";

const formSchema = z.object({
  MAIL_DRIVER: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
  MAIL_HOST: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
  MAIL_PORT: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
  MAIL_USERNAME: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
  MAIL_PASSWORD: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
  MAIL_ENCRYPTION: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
  MAIL_FROM_ADDRESS: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
  MAIL_FROM_NAME: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
  email: z.string().min(1, {
    message: "Product Name must be at least 1 characters.",
  }),
});

export default function AddOrEdit() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      MAIL_DRIVER: "",
      MAIL_HOST: "",
      MAIL_PORT: "",
      MAIL_USERNAME: "",
      MAIL_PASSWORD: "",
      MAIL_ENCRYPTION: "",
      MAIL_FROM_ADDRESS: "",
      MAIL_FROM_NAME: "",
      email: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fetch data if editing an existing ticket
  useEffect(() => {
    if (id) {
      const fetchTicket = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
          const response = await fetch(`${apiUrl}/server/api/routes/admin/feature_setting/smtp/${id}`);
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
        ? `${apiUrl}/server/api/routes/admin/feature_setting/smtp/${id}`
        : `${apiUrl}/server/api/routes/admin/feature_setting/smtp`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to add site map. Please try again.");
      }

      const result = await response.json();

      showSuccessToast(result.message || "site map added successfully!");
      window.location.href = `${apiUrl}/admin/pages/blog_system/site map`;
    } catch (error) {
      showErrorToast("Error adding site map: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  const inputClass = "bg-zinc-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-900 dark:border-slate-700 dark:placeholder-slate-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-2 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mx-auto max-w-screen-2xl">
            <div className="mb-3 flex flex-row items-center justify-between gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Breadcrumb pageName="SMTP Setting" />
            </div>
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1">
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      {id ? "Edit SMTP Setting" : "Add SMTP Setting"}
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">

                      {[
                        { name: "MAIL_DRIVER", label: "Type" },
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
                                      <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                      >
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select Type" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem value="Apple">SMTP</SelectItem>
                                          <SelectItem value="m2@example.com">Send Mail</SelectItem>
                                          <SelectItem value="m22@example.com">Mail Gun</SelectItem>
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

                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">

                      {[
                        { name: "MAIL_HOST", label: "Mail Host" },
                        { name: "MAIL_PORT", label: "Mail Port" },
                        { name: "MAIL_USERNAME", label: "Mail Username" },
                        { name: "MAIL_PASSWORD", label: "Mail Password" },
                        { name: "MAIL_ENCRYPTION", label: "Mail Encription" },
                        { name: "MAIL_FROM_ADDRESS", label: "Mail From Address" },
                        { name: "MAIL_FROM_NAME", label: "Mail From Name" },
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
              <div className="grid grid-cols-1 gap-4 md:grid-cols-1 sm:grid-cols-2">
                <div className="flex flex-col gap-4">
                  <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Test SMTP configuration
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                      {[
                        { name: "email", label: "For Test SMTP Mail" },
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
                <div className="flex flex-col gap-4">
                  <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Instruction
                      </h3>
                    </div>
                    <div className="py-6">
                      <p className="text-red-500">
                        Please be carefull when you are configuring SMTP. For
                        incorrect configuration you will get error at the time
                        of order place, new registration, sending newsletter.
                      </p>
                      <div className="py-4 dark:text-slate-300">
                        <p className="text-xl">For Non-SSL</p>
                        <div className="border dark:border-slate-500 dark:text-slate-400 mt-2 p-3">
                          Select sendmail for Mail Driver if you face any issue
                          after configuring smtp as Mail Driver
                        </div>
                        <div className="border dark:border-slate-500 dark:text-slate-400 p-3">
                          Set Mail Host according to your server Mail Client
                          Manual Settings
                        </div>
                        <div className="border dark:border-slate-500 dark:text-slate-400 p-3">
                          Set Mail port as 587
                        </div>
                        <div className="border dark:border-slate-500 dark:text-slate-400 p-3">
                          Set Mail Encryption as ssl if you face issue with tls
                        </div>
                      </div>
                      <div className="py-4 dark:text-slate-300">
                        <p className="text-xl">For SSL</p>
                        <div className="border dark:border-slate-500 dark:text-slate-400 mt-2 p-3">
                          Select sendmail for Mail Driver if you face any issue
                          after configuring smtp as Mail Driver
                        </div>
                        <div className="border dark:border-slate-500 dark:text-slate-400 p-3">
                          Set Mail Host according to your server Mail Client
                          Manual Settings
                        </div>
                        <div className="border dark:border-slate-500 dark:text-slate-400 p-3">
                          Set Mail port as 465
                        </div>
                        <div className="border dark:border-slate-500 dark:text-slate-400 p-3">
                          Set Mail Encryption as ssl
                        </div>
                      </div>
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
