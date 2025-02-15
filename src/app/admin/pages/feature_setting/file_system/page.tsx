"use client";

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
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import { Switch } from "@/app/admin/components/ui/switch";
import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const formSchema = z.object({
  AWS_ACCESS_KEY_ID: z.string().min(1, {
    message: "aws access key id required!",
  }),
  AWS_SECRET_ACCESS_KEY: z.string().min(1, {
    message: "aws secret key required!",
  }),
  AWS_DEFAULT_REGION: z.string().min(1, {
    message: "aws default region required!",
  }),
  AWS_BUCKET: z.string().min(1, {
    message: "aws bucket required!",
  }),
  AWS_URL: z.string().min(1, {
    message: "aws url required!",
  }),
  BACKBLAZE_ACCESS_KEY_ID: z.string().min(1, {
    message: "backblaze access key id required!",
  }),
  BACKBLAZE_SECRET_ACCESS_KEY: z.string().min(1, {
    message: "backblaze secret access key required!",
  }),
  BACKBLAZE_DEFAULT_REGION: z.string().min(1, {
    message: "backblaze secret access key required!",
  }),
  BACKBLAZE_BUCKET: z.string().min(1, {
    message: "backblaze bucket required!",
  }),
  BACKBLAZE_ENDPOINT: z.string().min(1, {
    message: "backblaze endpoint required!",
  }),
  BACKBLAZE_URL: z.string().min(1, {
    message: "backblaze url required!",
  }),
  FILESYSTEM_DRIVER: z.string().min(1, {
    message: "backblaze bucket required!",
  }),
});

export default function AddOrEdit() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      AWS_ACCESS_KEY_ID: "",
      AWS_SECRET_ACCESS_KEY: "",
      AWS_DEFAULT_REGION: "",
      AWS_BUCKET: "",
      AWS_URL: "",
      BACKBLAZE_ACCESS_KEY_ID: "",
      BACKBLAZE_SECRET_ACCESS_KEY: "",
      BACKBLAZE_DEFAULT_REGION: "",
      BACKBLAZE_BUCKET: "",
      BACKBLAZE_ENDPOINT: "",
      BACKBLAZE_URL: "",
      FILESYSTEM_DRIVER: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fetch data if editing an existing ticket
  useEffect(() => {
    if (id) {
      const fetchTicket = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
          const response = await fetch(`${apiUrl}/server/api/routes/admin/feature_setting/file_system/${id}`);
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
        ? `${apiUrl}/server/api/routes/admin/feature_setting/file_system/${id}`
        : `${apiUrl}/server/api/routes/admin/feature_setting/file_system`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to add file system. Please try again.");
      }

      const result = await response.json();

      showSuccessToast(result.message || "file system added successfully!");
      // router.push("/admin/pages/blog_system/file system");
      window.location.href = `${apiUrl}/admin/pages/blog_system/file system`;
    } catch (error) {
      showErrorToast("Error adding file system: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  const inputClass = "bg-zinc-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-900 dark:border-slate-700 dark:placeholder-slate-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-2 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mx-auto max-w-screen-2xl">
            <div className="mb-3 flex flex-row items-center justify-between gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Breadcrumb pageName="File Systems" />
            </div>
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1">
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      {id ? "Edit S3 File System Credentials" : "Add S3 File System Credentials"}
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      {[
                        { name: "AWS_ACCESS_KEY_ID", label: "AWS ACCESS KEY ID" },
                        { name: "AWS_SECRET_ACCESS_KEY", label: "AWS SECRET ACCESS KEY" },
                        { name: "AWS_DEFAULT_REGION", label: "AWS DEFAULT REGION" },
                        { name: "AWS_BUCKET", label: "AWS BUCKET" },
                        { name: "AWS_URL", label: "AWS URL", url: "https://bucket-name.s3.region.amazonaws.com" },
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
                                  <div className="col-span-4 mt-2">
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

                    <div className="grid mt-3 justify-items-end">
                      <Button
                        className="dark:text-slate-300"
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
                        Backblaze File System Credentials
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        {[
                          { name: "BACKBLAZE_ACCESS_KEY_ID", label: "BACKBLAZE ACCESS KEY ID" },
                          { name: "BACKBLAZE_SECRET_ACCESS_KEY", label: "BACKBLAZE SECRET ACCESS KEY" },
                          { name: "BACKBLAZE_DEFAULT_REGION", label: "BACKBLAZE SECRET ACCESS KEY" },
                          { name: "BACKBLAZE_BUCKET", label: "BACKBLAZE BUCKET" },
                          { name: "BACKBLAZE_ENDPOINT", label: "BACKBLAZE ENDPOINT" },
                          { name: "BACKBLAZE_URL", label: "BACKBLAZE URL" },
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
                                    <div className="col-span-4 mt-2">
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
                      <div className="grid mt-3 justify-items-end">
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

              <div className="grid grid-cols-1 gap-4 md:grid-cols-1 sm:grid-cols-2">
                <div className="flex flex-col gap-4">
                  <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        AWS S3 File System Activation
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name="FILESYSTEM_DRIVER"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center">
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
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-1 sm:grid-cols-2">
                <div className="flex flex-col gap-4">
                  <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Backblaze File System Activation
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name="FILESYSTEM_DRIVER"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center">
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
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-1 sm:grid-cols-2">
                <div className="flex flex-col gap-4">
                  <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Local File System Activation
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name="FILESYSTEM_DRIVER"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center">
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
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
