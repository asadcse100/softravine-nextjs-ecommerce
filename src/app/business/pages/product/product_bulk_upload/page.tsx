"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import Breadcrumb from "@/app/business/components/Breadcrumbs/Breadcrumb"
import { Button } from "@/app/business/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/business/components/ui/form";
import Input from "@/shared/Input/Input";
import Textarea from "@/shared/Textarea/Textarea";
import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";

const formSchema = z.object({
  bulk_file: z.string().min(10, {
    message: "bulk_file must be at least 10 characters.",
  }),
});

export default function AddOrEdit() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bulk_file: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fetch data if editing an existing ticket
  useEffect(() => {
    if (id) {
      const fetchTicket = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
          const response = await fetch(`${apiUrl}/server/api/routes/business/digital_bulk_upload/${id}`);
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
        ? `${apiUrl}/server/api/routes/business/digital_bulk_upload/${id}`
        : `${apiUrl}/server/api/routes/business/digital_bulk_upload`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to add product bulk upload. Please try again.");
      }

      const result = await response.json();

      showSuccessToast(result.message || "product bulk upload added successfully!");
      // router.push("/admin/pages/blog_system/product bulk upload");
      window.location.href = `${apiUrl}/admin/pages/blog_system/product bulk upload`;
    } catch (error) {
      showErrorToast("Error adding product bulk upload: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

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
                      {id ? "Edit Brand Bulk Upload" : "Add Brand Bulk Upload"}
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="py-4 dark:text-slate-300">
                      <p className="text-xl">For Non-SSL</p>
                      <div className="border dark:border-slate-500 dark:text-slate-400 mt-2 p-3">
                        1. Download the skeleton file and fill it with proper data.
                      </div>
                      <div className="border dark:border-slate-500 dark:text-slate-400 p-3">
                        2. You can download the example file to understand how the data must be filled.
                      </div>
                      <div className="border dark:border-slate-500 dark:text-slate-400 p-3">
                        3. Once you have downloaded and filled the skeleton file, upload it in the form below and submit.
                      </div>
                    </div>
                    <div className="grid py-4 justify-items-start">
                      <Button
                        className="dark:text-slate-200"
                        variant="outline"
                        type="submit"
                      >
                        Download CSV
                      </Button>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="bulk_file"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Upload Brand File</FormLabel>
                            <FormControl>
                              <Input type="file"
                                className={inputClass}
                                placeholder="Name"
                                {...field}
                              />
                            </FormControl>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-3 mt-3">
                                <FormLabel>Upload Brand File</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
                                  <Input type="file"
                                    className={inputClass}
                                    placeholder="Upload Brand File"
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

                    <div className="grid mt-3 justify-items-end">
                      {/* <Button
                        className="dark:text-slate-200"
                        variant="outline"
                        type="submit"
                      >
                        Upload CSV
                      </Button> */}
                      <Button
                        className="dark:text-slate-200"
                        variant="outline"
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? "CSV Submitting..." : "Submit CSV"}
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
