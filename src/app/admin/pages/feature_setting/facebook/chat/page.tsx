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
import { Switch } from "@/app/admin/components/ui/switch";
import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const formSchema = z.object({
  FACEBOOK_PAGE_ID: z.string().min(10, {
    message: "Please give facebook page id.",
  }),
});

export default function AddOrEdit() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      FACEBOOK_PAGE_ID: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fetch data if editing an existing ticket
  useEffect(() => {
    if (id) {
      const fetchTicket = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
          const response = await fetch(`${apiUrl}/server/api/routes/admin/feature_setting/facebook/chat/${id}`);
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
        ? `${apiUrl}/server/api/routes/admin/feature-setting/facebook/chat/${id}`
        : `${apiUrl}/server/api/routes/admin/feature-setting/facebook/chat`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to add facebook chat setting. Please try again.");
      }

      const result = await response.json();

      showSuccessToast(result.message || "facebook chat setting added successfully!");
      // router.push("/admin/pages/blog_system/facebook chat setting");
      window.location.href = `${apiUrl}/admin/pages/blog_system/facebook chat setting`;
    } catch (error) {
      showErrorToast("Error adding facebook chat setting: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  const inputClass = "bg-zinc-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-900 dark:border-slate-700 dark:placeholder-slate-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-2 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mx-auto max-w-screen-2xl">
            <div className="mb-3 flex flex-row items-center justify-between gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Breadcrumb pageName="Facebook Chat" />
            </div>
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1">
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-slate-300">
                      {id ? "Edit Facebook Chat Setting" : "Add Facebook Chat Setting"}
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">

                      {[
                        { name: "facebook_chat", label: "Facebook Chat" },
                        { name: "FACEBOOK_PAGE_ID", label: "Facebook Page ID" },
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
                                      {field.name === "facebook_chat" ? (
                                        <Switch />
                                      ) : field.name === "FACEBOOK_PAGE_ID" ? (
                                        <Input type="text"
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

                    </div>
                    <div className="grid mt-3 justify-items-end">
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
                    <h3 className="font-medium text-black dark:text-slate-300">
                      Please be carefull when you are configuring Facebook chat.
                      For incorrect configuration you will not get messenger
                      icon on your user-end site.
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="dark:text-slate-300">
                      <div className="border dark:border-slate-500 dark:text-slate-400 mt-2 p-3">
                        1. Login into your facebook page
                      </div>
                      <div className="border dark:border-slate-500 dark:text-slate-400 p-3">
                        2. Find the About option of your facebook page.
                      </div>
                      <div className="border dark:border-slate-500 dark:text-slate-400 p-3">
                        3. At the very bottom, you can find the “Facebook Page
                        ID”.
                      </div>
                      <div className="border dark:border-slate-500 dark:text-slate-400 p-3">
                        4. Go to Settings of your page and find the option of
                        Advance Messaging.
                      </div>
                      <div className="border dark:border-slate-500 dark:text-slate-400 p-3">
                        5. Scroll down that page and you will get slate-300
                        listed domain.
                      </div>
                      <div className="border dark:border-slate-500 dark:text-slate-400 p-3">
                        6. Set your website domain name.
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
