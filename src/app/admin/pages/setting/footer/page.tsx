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
import Textarea from "@/shared/Textarea/Textarea";
import { Switch } from "@/app/admin/components/ui/switch";

const formSchema = z.object({
  footer_title: z.string().min(10, {
    message: "footer_title must be at least 10 characters.",
  }),
  footer_description: z.string().min(10, {
    message: "footer_description must be at least 10 characters.",
  }),
  footer_logo: z.string().min(10, {
    message: "footer_logo must be at least 10 characters.",
  }),
  about_us_description: z.string().min(10, {
    message: "about_us_description must be at least 10 characters.",
  }),
  play_store_link: z.string().min(10, {
    message: "play_store_link must be at least 10 characters.",
  }),
  app_store_link: z.string().min(10, {
    message: "app_store_link must be at least 10 characters.",
  }),
  contact_address: z.string().min(10, {
    message: "contact_address must be at least 10 characters.",
  }),
  contact_email: z.string().min(10, {
    message: "contact_email must be at least 10 characters.",
  }),
  widget_one: z.string().min(10, {
    message: "widget_one must be at least 10 characters.",
  }),
  frontend_copyright_text: z.string().min(10, {
    message: "frontend_copyright_text must be at least 10 characters.",
  }),
  show_social_links: z.string().min(10, {
    message: "show_social_links must be at least 10 characters.",
  }),
  facebook_link: z.string().min(10, {
    message: "facebook_link must be at least 10 characters.",
  }),
  twitter_link: z.string().min(10, {
    message: "twitter_link must be at least 10 characters.",
  }),
  instagram_link: z.string().min(10, {
    message: "instagram_link must be at least 10 characters.",
  }),
  youtube_link: z.string().min(10, {
    message: "youtube_link must be at least 10 characters.",
  }),
  seller_app_link: z.string().min(10, {
    message: "seller_app_link must be at least 10 characters.",
  }),
  delivery_boy_app_link: z.string().min(10, {
    message: "delivery_boy_app_link must be at least 10 characters.",
  }),
  payment_method_images: z.string().min(10, {
    message: "payment_method_images must be at least 10 characters.",
  }),
});

export default function Addnew() {
  // ...
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      footer_title: "",
      footer_description: "",
      footer_logo: "",
      about_us_description: "",
      play_store_link: "",
      app_store_link: "",
      contact_address: "",
      contact_email: "",
      widget_one: "",
      frontend_copyright_text: "",
      show_social_links: "",
      facebook_link: "",
      twitter_link: "",
      instagram_link: "",
      youtube_link: "",
      seller_app_link: "",
      delivery_boy_app_link: "",
      payment_method_images: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const inputClass = "bg-zinc-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-900 dark:border-slate-800 dark:placeholder-slate-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-4 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mx-auto max-w-screen-2xl">
            <div className="flex flex-col gap-4">
              <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Footer Info Widget
                  </h3>
                </div>
                <div className="py-6">
                  <div className="flex flex-col gap-5.5 p-6.5">
                    <FormField
                      control={form.control}
                      name="footer_title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title (Translatable)</FormLabel>
                          <FormControl>
                            <Input
                              className={inputClass}
                              placeholder="Title (Translatable)"
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
                      name="footer_description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Footer description (Translatable)
                          </FormLabel>
                          <FormControl>
                            <Textarea></Textarea>
                            {/* <Input
                                className={inputClass}
                                placeholder="Brand"
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
                        <FormField
                          control={form.control}
                          name="footer_logo"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Footer Logo</FormLabel>
                              <FormControl>
                                <Input
                                  type="file"
                                  className={inputClass}
                                  placeholder="Footer Logo"
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
                          name="about_us_description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                About description (Translatable)
                              </FormLabel>
                              <FormControl>
                                <Textarea></Textarea>
                                {/* <Input
                                  className={inputClass}
                                  placeholder="About description (Translatable)"
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
                          name="play_store_link"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Play Store Link</FormLabel>
                              <FormControl>
                                <Input
                                  className={inputClass}
                                  placeholder="https://play.google.com/store/apps"
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
                          name="app_store_link"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>App Store Link</FormLabel>
                              <FormControl>
                                <Input
                                  className={inputClass}
                                  placeholder="https://www.apple.com/app-store/"
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
                        Contact Info Widget
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name="contact_address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Contact address (Translatable)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className={inputClass}
                                  placeholder="Contact address"
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
                          name="contact_email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact phone</FormLabel>
                              <FormControl>
                                <Input
                                  className={inputClass}
                                  placeholder="123456789"
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
                          name="widget_one"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact email</FormLabel>
                              <FormControl>
                                <Input
                                  className={inputClass}
                                  placeholder="demo.example@gmail.com"
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
                        Copyright Widget
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name="frontend_copyright_text"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Copyright Text (Translatable)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className={inputClass}
                                  placeholder="Copyright Text (Translatable)"
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
                        Social Link Widget
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name="show_social_links"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center space-x-12">
                                <FormLabel className="mt-2">
                                Show Social Links?
                                </FormLabel>
                                <Switch />
                              </div>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <h3 className="font-medium text-black dark:text-white">
                        Social Links
                      </h3>
                        <FormField
                          control={form.control}
                          name="facebook_link"
                          render={({ field }) => (
                            <FormItem>
                              {/* <FormLabel>Social Links</FormLabel> */}
                              <FormControl>
                                <Input
                                  className={inputClass}
                                  placeholder="https://facebook.com/"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="twitter_link"
                          render={({ field }) => (
                            <FormItem>
                              {/* <FormLabel>Social Links</FormLabel> */}
                              <FormControl>
                                <Input
                                  className={inputClass}
                                  placeholder="https://www.instagram.com/"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="instagram_link"
                          render={({ field }) => (
                            <FormItem>
                              {/* <FormLabel>Social Links</FormLabel> */}
                              <FormControl>
                                <Input
                                  className={inputClass}
                                  placeholder="https://youtube.com/"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="youtube_link"
                          render={({ field }) => (
                            <FormItem>
                              {/* <FormLabel>Social Links</FormLabel> */}
                              <FormControl>
                                <Input
                                  className={inputClass}
                                  placeholder="https://linkedin.com/"
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
                        Download App Link
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name="seller_app_link"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Seller App Link</FormLabel>
                              <FormControl>
                                <Input
                                  className={inputClass}
                                  placeholder="https://play.google.com/store/apps"
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
                          name="delivery_boy_app_link"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Delivery Boy App Link</FormLabel>
                              <FormControl>
                                <Input
                                  className={inputClass}
                                  placeholder="https://play.google.com/store/apps"
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
                        Payment Methods Widget
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name="payment_method_images"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Payment Methods</FormLabel>
                              <FormControl>
                                <Input
                                  type="file"
                                  className={inputClass}
                                  placeholder=""
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
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
