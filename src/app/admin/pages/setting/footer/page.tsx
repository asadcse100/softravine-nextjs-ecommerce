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
  product_name: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
});

export default function Addnew() {
  // ...
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_name: "",
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
                      name="product_name"
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
                      name="brand"
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
                          name="gallery_images"
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
                          name="thumbnail_image"
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
                          name="thumbnail_image"
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
                          name="thumbnail_image"
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
                          name="video_provider"
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
                          name="video_link"
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
                          name="video_link"
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
                          name="color"
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
                          name="unit_price"
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
                        <FormField
                          control={form.control}
                          name="discount_date_range"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Social Links</FormLabel>
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
                          name="discount_date_range"
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
                          name="discount_date_range"
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
                          name="discount_date_range"
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
                          name="discount_date_range"
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
                          name="unit_price"
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
                          name="discount_date_range"
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
                      <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name="quantity"
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
