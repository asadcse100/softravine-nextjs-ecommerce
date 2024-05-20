"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import Textarea from "@/shared/Textarea/Textarea";
import { Switch } from "@/app/admin/components/ui/switch";

const formSchema = z.object({
  site_name: z.string().min(10, {
    message: "site_name must be at least 10 characters.",
  }),
  website_name: z.string().min(10, {
    message: "website_name must be at least 10 characters.",
  }),
  site_motto: z.string().min(10, {
    message: "site_motto must be at least 10 characters.",
  }),
  site_icon: z.string().min(10, {
    message: "site_icon must be at least 10 characters.",
  }),
  system_logo_white: z.string().min(10, {
    message: "system_logo_white must be at least 10 characters.",
  }),
  system_logo_black: z.string().min(10, {
    message: "system_logo_black must be at least 10 characters.",
  }),
  timezone: z.string().min(10, {
    message: "timezone must be at least 10 characters.",
  }),
  base_color: z.string().min(10, {
    message: "base_color must be at least 10 characters.",
  }),
  base_hov_color: z.string().min(10, {
    message: "base_hov_color must be at least 10 characters.",
  }),
  secondary_base_color: z.string().min(10, {
    message: "secondary_base_color must be at least 10 characters.",
  }),
  secondary_base_hov_color: z.string().min(10, {
    message: "secondary_base_hov_color must be at least 10 characters.",
  }),
  flash_deal_banner: z.string().min(10, {
    message: "flash_deal_banner must be at least 10 characters.",
  }),
  flash_deal_banner_small: z.string().min(10, {
    message: "flash_deal_banner_small must be at least 10 characters.",
  }),
  meta_title: z.string().min(10, {
    message: "meta_title must be at least 10 characters.",
  }),
  meta_description: z.string().min(10, {
    message: "meta_description must be at least 10 characters.",
  }),
  meta_keywords: z.string().min(10, {
    message: "meta_keywords must be at least 10 characters.",
  }),
  meta_image: z.string().min(10, {
    message: "meta_image must be at least 10 characters.",
  }),
  cookies_agreement_text: z.string().min(10, {
    message: "cookies_agreement_text must be at least 10 characters.",
  }),
  show_cookies_agreement: z.string().min(10, {
    message: "show_cookies_agreement must be at least 10 characters.",
  }),
  show_website_popup: z.string().min(10, {
    message: "show_website_popup must be at least 10 characters.",
  }),
  website_popup_content: z.string().min(10, {
    message: "website_popup_content must be at least 10 characters.",
  }),
  show_subscribe_form: z.string().min(10, {
    message: "show_subscribe_form must be at least 10 characters.",
  }),
  header_script: z.string().min(10, {
    message: "header_script must be at least 10 characters.",
  }),
  footer_script: z.string().min(10, {
    message: "footer_script must be at least 10 characters.",
  }),
});

export default function Addnew() {
  // ...
  // 1. Define your form.
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

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const inputClass =
    "w-full rounded-lg border-[1px] border-primary bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white";

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
                      Sytem Settings
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="site_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>System Name</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="System Name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="website_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Frontend Website Name</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Frontend Website Name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="site_motto"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Site Motto</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Site Motto"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="site_icon"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Site Icon</FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                className={inputClass}
                                placeholder="Site Icon"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="system_logo_white"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>System Logo - White</FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                className={inputClass}
                                placeholder="System Logo - White"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="system_logo_black"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>System Logo - Black</FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                className={inputClass}
                                placeholder="System Logo - Black"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="timezone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>System Timezone</FormLabel>
                            <FormControl>
                              <Select>
                                <option value="">(GMT) UTC</option>
                                <option value="">(GMT) London</option>
                              </Select>
                              {/* <Input
                                className={inputClass}
                                placeholder="barcode"
                                {...field}
                              /> */}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
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
                        <FormField
                          control={form.control}
                          name="base_color"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Website Base Color</FormLabel>
                              <FormControl>
                                <Input
                                  className={inputClass}
                                  placeholder="#D42D2A"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name="base_hov_color"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Website Base Hover Color</FormLabel>
                              <FormControl>
                                <Input
                                  className={inputClass}
                                  placeholder="#D62400"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name="secondary_base_color"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Website Secondary Base Color
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className={inputClass}
                                  placeholder="#FFBA00"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name="secondary_base_hov_color"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Website Secondary Base Hover Color
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className={inputClass}
                                  placeholder="#FBE8E5"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name="flash_deal_banner"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Flash Deal Page Banner - Large
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="file"
                                  className={inputClass}
                                  placeholder="#FBE8E5"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name="flash_deal_banner_small"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Flash Deal Page Banner - Small
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="file"
                                  className={inputClass}
                                  placeholder="#FBE8E5"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
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
                        <FormField
                          control={form.control}
                          name="meta_title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Meta Title</FormLabel>
                              <FormControl>
                                <Input
                                  className={inputClass}
                                  placeholder="Meta Title"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name="meta_description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Meta Description</FormLabel>
                              <FormControl>
                                <Input
                                  className={inputClass}
                                  placeholder="Meta Description"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name="meta_keywords"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Keywords</FormLabel>
                              <FormControl>
                                <Input
                                  className={inputClass}
                                  placeholder="Keywords"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name="meta_image"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Meta Image</FormLabel>
                              <FormControl>
                                <Input
                                  type="file"
                                  className={inputClass}
                                  placeholder="Meta Image"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
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
                        <FormField
                          control={form.control}
                          name="cookies_agreement_text"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cookies Agreement Text</FormLabel>
                              <FormControl>
                                <Textarea></Textarea>
                                {/* <Input
                                className={inputClass}
                                placeholder="Select Color"
                                {...field}
                              /> */}
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name="show_cookies_agreement"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center space-x-12">
                                <FormLabel className="mt-2">
                                  Show Cookies Agreement?
                                </FormLabel>
                                <Switch />
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
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
                        <FormField
                          control={form.control}
                          name="show_website_popup"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center space-x-12">
                                <FormLabel className="mt-2">
                                  Show website popup?
                                </FormLabel>
                                <Switch />
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name="website_popup_content"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Popup content</FormLabel>
                              <FormControl>
                                <Textarea></Textarea>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name="show_subscribe_form"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center space-x-12">
                                <FormLabel className="mt-2">
                                  Show Subscriber form?
                                </FormLabel>
                                <Switch />
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
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
                        <FormField
                          control={form.control}
                          name="header_script"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Header custom script</FormLabel>
                              <FormControl>
                                <Textarea></Textarea>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name="footer_script"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Footer custom script</FormLabel>
                              <FormControl>
                                <Textarea></Textarea>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
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
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
