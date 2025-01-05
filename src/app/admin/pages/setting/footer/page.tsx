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
import Textarea from "@/shared/Textarea/Textarea";
import { Switch } from "@/app/admin/components/ui/switch";

const formSchema = z.object({
  footer_title: z.string().min(10, {
    message: "Footer title must be at least 10 characters.",
  }),
  footer_description: z.string().min(50, {
    message: "Footer description must be at least 50 characters.",
  }),
  footer_logo: z.string().min(10, {
    message: "Select footer logo",
  }),
});

export default function AddOrEdit() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      footer_title: "",
      footer_description: "",
      footer_logo: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fetch data if editing an existing ticket
  useEffect(() => {
    if (id) {
      const fetchTicket = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
          const response = await fetch(`${apiUrl}/server/api/routes/admin/setting/footer/${id}`);
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
        ? `${apiUrl}/server/api/routes/admin/setting/footer/${id}`
        : `${apiUrl}/server/api/routes/admin/setting/footer`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to add footer setting. Please try again.");
      }

      const result = await response.json();

      showSuccessToast(result.message || "footer setting added successfully!");
      // router.push("/admin/pages/blog_system/footer setting");
      window.location.href = `${apiUrl}/admin/pages/setting/footer`;
    } catch (error) {
      showErrorToast("Error adding footer setting: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  const inputClass = "bg-zinc-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-900 dark:border-slate-700 dark:placeholder-slate-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-2 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mx-auto max-w-screen-2xl">
            <div className="mb-3 flex flex-row items-center justify-between gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Breadcrumb pageName="Footer Setting" />
            </div>
            <div className="flex flex-col gap-4">
              <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    {id ? "Edit Footer Info Widget" : "Add Footer Info Widget"}
                  </h3>
                </div>
                <div className="py-6">
                  <div className="flex flex-col gap-5.5 p-6.5">
                    {[
                      { name: "footer_title", label: "Title (Translatable)" },
                      { name: "footer_description", label: "Footer description (Translatable)" },
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
                                    {field.name === "footer_title" ? (
                                      <Input
                                        className={inputClass}
                                        placeholder={field.label}
                                        {...fieldProps}
                                      />
                                    ) : field.name === "footer_description" ? (
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
                    >
                      Update
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-4 grid gap-4 md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1">
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-1 sm:grid-cols-2">
                  <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        About Widget
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        {[
                          { name: "footer_logo", label: "Footer Logo" },
                          { name: "about_us_description", label: "About description (Translatable)" },
                          { name: "play_store_link", label: "Play Store Link" },
                          { name: "app_store_link", label: "App Store Link" },
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
                                        {field.name === "footer_logo" ? (
                                          <Input type="file"
                                            className={inputClass}
                                            placeholder={field.label}
                                            {...fieldProps}
                                          />
                                        ) : field.name === "about_us_description" ? (
                                          <Textarea></Textarea>
                                        ) : field.name === "play_store_link" ? (
                                          <Input
                                            className={inputClass}
                                            placeholder={field.label}
                                            {...fieldProps}
                                          />
                                        ) : field.name === "app_store_link" ? (
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
                        Contact Info Widget
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        {[
                          { name: "contact_address", label: "Contact address (Translatable)" },
                          { name: "contact_phone", label: "Contact Phone" },
                          { name: "contact_email", label: "Contact Email" },
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
                                        {field.name === "contact_address" ? (
                                          <Textarea></Textarea>
                                        ) : field.name === "contact_phone" ? (
                                          <Input
                                            className={inputClass}
                                            placeholder={field.label}
                                            {...fieldProps}
                                          />
                                        ) : field.name === "contact_email" ? (
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
                        Copyright Widget
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        {[
                          { name: "frontend_copyright_text", label: "Copyright Text (Translatable)" },
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
                        Social Link Widget
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        {[
                          { name: "show_social_links", label: "Show Social Links?" },
                          { name: "facebook_link", label: "Facebook Link", place: "https://facebook.com/user_name" },
                          { name: "twitter_link", label: "Twitter Link", place: "https://twitter.com/user_name" },
                          { name: "instagram_link", label: "Instagram Link", place: "https://instagram.com/user_name" },
                          { name: "youtube_link", label: "Youtube Link", place: "https://youtube.com/user_name" },
                          { name: "linkedin_link", label: "Linkedin Link", place: "https://linkedin.com/user_name" },
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
                                        {field.name === "show_social_links" ? (
                                          <Switch />
                                        ) : field.name === "facebook_link" ? (
                                          <Input
                                            className={inputClass}
                                            placeholder={field.place}
                                            {...fieldProps}
                                          />
                                        ) : field.name === "twitter_link" ? (
                                          <Input
                                            className={inputClass}
                                            placeholder={field.place}
                                            {...fieldProps}
                                          />
                                        ) : field.name === "instagram_link" ? (
                                          <Input
                                            className={inputClass}
                                            placeholder={field.place}
                                            {...fieldProps}
                                          />
                                        ) : field.name === "youtube_link" ? (
                                          <Input
                                            className={inputClass}
                                            placeholder={field.place}
                                            {...fieldProps}
                                          />
                                        ) : field.name === "linkedin_link" ? (
                                          <Input
                                            className={inputClass}
                                            placeholder={field.place}
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
                        Download App Link
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        {[
                          { name: "seller_app_link", label: "Seller App Link" },
                          { name: "delivery_boy_app_link", label: "Delivery Boy App Link", }
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
                        Payment Methods Widget
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        {[
                          { name: "payment_method_images", label: "Payment Methods" },
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
