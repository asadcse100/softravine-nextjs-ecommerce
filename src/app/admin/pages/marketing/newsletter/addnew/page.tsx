"use client";
import * as React from "react"
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";
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
import Textarea from "@/shared/Textarea/Textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/admin/components/ui/select";

const formSchema = z.object({
  user_emails: z.string().min(4, {
    message: "Employe Name must be at least 4 characters.",
  }),
  subscriber_emails: z.string().min(1, {
    message: "Select users.",
  }),
  subject: z.string().min(10, {
    message: "Newsletter subject required!",
  }),
  content: z.string().min(10, {
    message: "Newsletter descripion required!",
  }),
});

export default function AddOrEdit() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_emails: "",
      subscriber_emails: "",
      subject: "",
      content: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fetch data if editing an existing ticket
  useEffect(() => {
    if (id) {
      const fetchTicket = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
          const response = await fetch(`${apiUrl}/server/api/routes/admin/blogs/blogCategories/${id}`);
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
      const response = await fetch(`${apiUrl}/server/api/routes/admin/marketing/newsletter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to add flash deal. Please try again.");
      }

      const result = await response.json();

      showSuccessToast(result.message || "flash deal added successfully!");
      // router.push("/admin/pages/blog_system/flash deal");
      window.location.href = `${apiUrl}/admin/pages/blog_system/flash deal`;
    } catch (error) {
      showErrorToast("Error adding flash deal: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  const [emails, setemails] = useState<{ id: string; name: string }[]>([]) // Adjust the type according to your data structure
  // Fetch data from an API
  useEffect(() => {
    const fetchemails = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''
      try {
        const response = await fetch(`${apiUrl}/server/api/routes/admin/newsletter/select/emails`) // Replace with your API endpoint
        const data = await response.json()

        // Check if the response has the 'roles' property and it's an array
        if (data && Array.isArray(data)) {
          setemails(data)
        } else {
          showSuccessToast(result.message || "newsletter added successfully!");
        }
      } catch (error) {
        showErrorToast("Error adding newsletter: " + (error instanceof Error ? error.message : "Unknown error"));
      }
    }

    fetchemails()
  }, [])


  const inputClass = "bg-zinc-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-900 dark:border-slate-700 dark:placeholder-slate-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-2 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mx-auto max-w-screen-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="col-span-7">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      {id ? "Edit Send Newsletter" : "Add Send Newsletter"}
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      {[
                        { name: "user_emails", label: "Employe Name" },
                        { name: "subscriber_emails", label: "Emails (Users)" },
                        { name: "subject", label: "Newsletter subject" },
                        { name: "content", label: "Newsletter content" },
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
                                      {field.name === "user_emails" ? (
                                        <Input
                                          className={inputClass}
                                          placeholder={field.label}
                                          {...fieldProps}
                                        />
                                      ) : field.name === "subscriber_emails" ? (
                                        <Select
                                          onValueChange={field.onChange}
                                          defaultValue={field.value}
                                        >
                                          <FormControl>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select Emails" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            {emails.map((email) => (
                                              <SelectItem key={email.id} value={email.email}>
                                                {email.email}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      ) : field.name === "subject" ? (
                                        <Input
                                          className={inputClass}
                                          placeholder={field.label}
                                          {...fieldProps}
                                        />
                                      ) : field.name === "content" ? (
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
                      {/* <FormField
                        control={form.control}
                        name="user_emails[]"
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
                        name="subscriber_emails[]"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-3 mt-2">
                                <FormLabel>Emails (Users)</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select Emails" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {emails.map((email) => (
                                        <SelectItem key={email.id} value={email.email}>
                                          {email.email}
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
                    </div> */}
                    {/* <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-3 mt-2">
                                <FormLabel>Newsletter subject</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
                                  <Input
                                    className={inputClass}
                                    placeholder="Newsletter subject"
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
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-3 mt-2">
                                <FormLabel>Newsletter content</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
                                  <Textarea></Textarea>
                                </FormControl>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div> */}
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
