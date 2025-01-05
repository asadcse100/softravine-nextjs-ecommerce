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
import Textarea from "@/shared/Textarea/Textarea";
import { Switch } from "@/app/admin/components/ui/switch";

const formSchema = z.object({
  site_name: z.string().min(1, {
    message: "site_name must be at least 1 characters.",
  }),
  website_name: z.string().min(1, {
    message: "website_name must be at least 1 characters.",
  }),
  site_motto: z.string().min(1, {
    message: "site_motto must be at least 1 characters.",
  }),
  site_icon: z.string().min(1, {
    message: "site_icon must be at least 1 characters.",
  }),
  system_logo_white: z.string().min(1, {
    message: "system_logo_white must be at least 1 characters.",
  }),
  system_logo_black: z.string().min(1, {
    message: "system_logo_black must be at least 1 characters.",
  }),
  timezone: z.string().min(1, {
    message: "timezone must be at least 1 characters.",
  }),
  base_color: z.string().min(1, {
    message: "base_color must be at least 1 characters.",
  }),
  base_hov_color: z.string().min(1, {
    message: "base_hov_color must be at least 1 characters.",
  }),
  secondary_base_color: z.string().min(1, {
    message: "secondary_base_color must be at least 1 characters.",
  }),
  secondary_base_hov_color: z.string().min(1, {
    message: "secondary_base_hov_color must be at least 10 characters.",
  }),
  flash_deal_banner: z.string().min(1, {
    message: "flash_deal_banner must be at least 1 characters.",
  }),
  flash_deal_banner_small: z.string().min(1, {
    message: "flash_deal_banner_small must be at least 1 characters.",
  }),
  meta_title: z.string().min(1, {
    message: "meta_title must be at least 1 characters.",
  }),
  meta_description: z.string().min(1, {
    message: "meta_description must be at least 1 characters.",
  }),
  meta_keywords: z.string().min(1, {
    message: "meta_keywords must be at least 1 characters.",
  }),
  meta_image: z.string().min(1, {
    message: "meta_image must be at least 1 characters.",
  }),
  cookies_agreement_text: z.string().min(1, {
    message: "cookies_agreement_text must be at least 1 characters.",
  }),
  show_cookies_agreement: z.string().min(1, {
    message: "show_cookies_agreement must be at least 1 characters.",
  }),
  show_website_popup: z.string().min(1, {
    message: "show_website_popup must be at least 1 characters.",
  }),
  website_popup_content: z.string().min(1, {
    message: "website_popup_content must be at least 1 characters.",
  }),
  show_subscribe_form: z.string().min(1, {
    message: "show_subscribe_form must be at least 1 characters.",
  }),
  header_script: z.string().min(1, {
    message: "header_script must be at least 1 characters.",
  }),
  footer_script: z.string().min(1, {
    message: "footer_script must be at least 1 characters.",
  }),
});

export default function AddOrEdit() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      site_name: "",
      website_name: "",
      site_motto: "",
      site_icon: "",
      system_logo_white: "",
      system_logo_black: "",
      timezone: "",
      base_color: "",
      base_hov_color: "",
      secondary_base_color: "",
      secondary_base_hov_color: "",
      flash_deal_banner: "",
      flash_deal_banner_small: "",
      meta_title: "",
      meta_description: "",
      meta_keywords: "",
      meta_image: "",
      cookies_agreement_text: "",
      show_cookies_agreement: "",
      show_website_popup: "",
      website_popup_content: "",
      show_subscribe_form: "",
      header_script: "",
      footer_script: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fetch data if editing an existing ticket
  useEffect(() => {
    if (id) {
      const fetchTicket = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
          const response = await fetch(`${apiUrl}/server/api/routes/admin/setting/appearance/${id}`);
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
        ? `${apiUrl}/server/api/routes/admin/setting/appearance/${id}`
        : `${apiUrl}/server/api/routes/admin/setting/appearance`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to add appearance setting. Please try again.");
      }

      const result = await response.json();

      showSuccessToast(result.message || "appearance setting added successfully!");
      // router.push("/admin/pages/blog_system/appearance setting");
      window.location.href = `${apiUrl}/admin/pages/setting/appearance`;
    } catch (error) {
      showErrorToast("Error adding appearance setting: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  const inputClass = "bg-zinc-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-900 dark:border-slate-700 dark:placeholder-slate-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-2 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mx-auto max-w-screen-2xl">
            <div className="mb-3 flex flex-row items-center justify-between gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Breadcrumb pageName="Website Appearance" />
            </div>
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1">
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      {id ? "Edit Sytem Settings" : "Add Sytem Settings"}
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      {[
                        { name: "site_name", label: "System Name" },
                        { name: "website_name", label: "Frontend Website Name" },
                        { name: "site_motto", label: "Site Motto" },
                        { name: "site_icon", label: "Site Icon" },
                        { name: "system_logo_white", label: "System Logo - White" },
                        { name: "system_logo_black", label: "System Logo - Black" },
                        { name: "timezone", label: "System Timezone" },
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
                                      {field.name === "site_name" ? (
                                        <Input
                                          className={inputClass}
                                          placeholder={field.label}
                                          {...fieldProps}
                                        />
                                      ) : field.name === "website_name" ? (
                                        <Input
                                          className={inputClass}
                                          placeholder={field.label}
                                          {...fieldProps}
                                        />
                                      ) : field.name === "site_motto" ? (
                                        <Input
                                          className={inputClass}
                                          placeholder={field.label}
                                          {...fieldProps}
                                        />
                                      ) : field.name === "site_icon" ? (
                                        <Input type="file"
                                          className={inputClass}
                                          placeholder={field.label}
                                          {...fieldProps}
                                        />
                                      ) : field.name === "system_logo_white" ? (
                                        <Input type="file"
                                          className={inputClass}
                                          placeholder={field.label}
                                          {...fieldProps}
                                        />
                                      ) : field.name === "system_logo_black" ? (
                                        <Input type="file"
                                          className={inputClass}
                                          placeholder={field.label}
                                          {...fieldProps}
                                        />
                                      ) : field.name === "timezone" ? (
                                        <Select
                                          onValueChange={field.onChange}
                                          defaultValue={field.value}
                                        >
                                          <FormControl>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select Timezone" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            <SelectItem value="Apple">Apple</SelectItem>
                                            <SelectItem value="m2@example.com">Pran</SelectItem>
                                            <SelectItem value="m22@example.com">Squre</SelectItem>
                                            <SelectItem value="m3@example.com">ACI</SelectItem>
                                            <SelectItem value="m4@example.com">SoftRavine</SelectItem>
                                            <SelectItem value="m5@example.com">Samsung</SelectItem>
                                          </SelectContent>
                                        </Select>
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
                      >
                        Update
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
                        General Settings
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        {[
                          { name: "base_color", label: "Website Base Color" },
                          { name: "base_hov_color", label: "Website Base Hover Color" },
                          { name: "secondary_base_color", label: "Website Secondary Base Color" },
                          { name: "secondary_base_hov_color", label: "Website Secondary Base Hover Color" },
                          { name: "flash_deal_banner", label: "Flash Deal Page Banner - Large" },
                          { name: "flash_deal_banner_small", label: "Flash Deal Page Banner - Large" },
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
                                        {field.name === "base_color" ? (
                                          <Input
                                            className={inputClass}
                                            placeholder={field.label}
                                            {...fieldProps}
                                          />
                                        ) : field.name === "base_hov_color" ? (
                                          <Input
                                            className={inputClass}
                                            placeholder={field.label}
                                            {...fieldProps}
                                          />
                                        ) : field.name === "secondary_base_color" ? (
                                          <Input
                                            className={inputClass}
                                            placeholder={field.label}
                                            {...fieldProps}
                                          />
                                        ) : field.name === "secondary_base_hov_color" ? (
                                          <Input
                                            className={inputClass}
                                            placeholder={field.label}
                                            {...fieldProps}
                                          />
                                        ) : field.name === "flash_deal_banner" ? (
                                          <Input type="file"
                                            className={inputClass}
                                            placeholder={field.label}
                                            {...fieldProps}
                                          />
                                        ) : field.name === "flash_deal_banner_small" ? (
                                          <Input type="file"
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
                        >
                          Update
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
                        Global SEO
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        {[
                          { name: "meta_title", label: "Global SEO" },
                          { name: "meta_description", label: "Meta Description" },
                          { name: "meta_keywords", label: "Keywords" },
                          { name: "meta_image", label: "Meta Image" },
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
                                        {field.name === "meta_title" ? (
                                          <Input
                                            className={inputClass}
                                            placeholder={field.label}
                                            {...fieldProps}
                                          />
                                        ) : field.name === "meta_description" ? (
                                          <Input
                                            className={inputClass}
                                            placeholder={field.label}
                                            {...fieldProps}
                                          />
                                        ) : field.name === "meta_keywords" ? (
                                          <Input
                                            className={inputClass}
                                            placeholder={field.label}
                                            {...fieldProps}
                                          />
                                        ) : field.name === "meta_image" ? (
                                          <Input type="file"
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
                        >
                          Update
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
                        Cookies Agreement
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        {[
                          { name: "cookies_agreement_text", label: "Cookies Agreement Text" },
                          { name: "show_cookies_agreement", label: "Show Cookies Agreement?" },
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
                                        {field.name === "cookies_agreement_text" ? (
                                          <Textarea></Textarea>
                                        ) : field.name === "show_cookies_agreement" ? (
                                          <Switch />
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
                        >
                          Update
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
                        Website Popup
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        {[
                          { name: "show_website_popup", label: "Show website popup?" },
                          { name: "website_popup_content", label: "Popup content" },
                          { name: "show_subscribe_form", label: "Show Subscriber form?" },
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
                                        {field.name === "show_website_popup" ? (
                                          <Switch />
                                        ) : field.name === "website_popup_content" ? (
                                          <Textarea></Textarea>
                                        ) : field.name === "show_subscribe_form" ? (
                                          <Switch />
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
                        >
                          Update
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
                        Custom Script
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        {[
                          { name: "header_script", label: "Header custom script" },
                          { name: "footer_script", label: "Footer custom script" },
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
                                        {field.name === "header_script" ? (
                                          <Input
                                            className={inputClass}
                                            placeholder={field.label}
                                            {...fieldProps}
                                          />
                                        ) : field.name === "footer_script" ? (
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
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
