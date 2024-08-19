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
import { Switch } from "@/app/admin/components/ui/switch";

const formSchema = z.object({
  header_logo: z.string().min(10, {
    message: "header_logo must be at least 10 characters.",
  }),
  show_language_switcher: z.string().min(10, {
    message: "show_language_switcher must be at least 10 characters.",
  }),
  show_currency_switcher: z.string().min(10, {
    message: "show_currency_switcher must be at least 10 characters.",
  }),
  header_stikcy: z.string().min(10, {
    message: "header_stikcy must be at least 10 characters.",
  }),
  topbar_banner: z.string().min(10, {
    message: "topbar_banner must be at least 10 characters.",
  }),
  topbar_banner_link: z.string().min(10, {
    message: "topbar_banner_link must be at least 10 characters.",
  }),
  helpline_number: z.string().min(10, {
    message: "helpline_number must be at least 10 characters.",
  }),
  header_menu_labels: z.string().min(10, {
    message: "header_menu_labels must be at least 10 characters.",
  }),
  header_menu_links: z.string().min(10, {
    message: "header_menu_links must be at least 10 characters.",
  }),
});

export default function Addnew() {
  // ...
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      header_logo: "",
      show_language_switcher: "",
      show_currency_switcher: "",
      header_stikcy: "",
      topbar_banner: "",
      topbar_banner_link: "",
      helpline_number: "",
      header_menu_labels: "",
      header_menu_links: "",
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
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1">
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Header Setting
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="header_logo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Header Logo</FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                className={inputClass}
                                placeholder="Header Logo"
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
                        name="show_language_switcher"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center space-x-12">
                                <FormLabel className="mt-2">
                                Show Language Switcher?
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
                        name="show_currency_switcher"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center space-x-12">
                                <FormLabel className="mt-2">
                                Show Currency Switcher?
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
                        name="header_stikcy"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center space-x-12">
                                <FormLabel className="mt-2">
                                Enable stikcy header?
                                </FormLabel>
                                <Switch />
                              </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <hr />
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="topbar_banner"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Topbar Banner</FormLabel>
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
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="topbar_banner_link"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Topbar Banner Link</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Link"
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
                        name="helpline_number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Help line number</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="+021324323"
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
              
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                    Header Nav Menu
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="header_menu_labels[]"
                        render={({ field }) => (
                          <FormItem>
                            {/* <FormLabel>Home</FormLabel> */}
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Home"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="header_menu_links[]"
                        render={({ field }) => (
                          <FormItem>
                            {/* <FormLabel>Home</FormLabel> */}
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="https://demo.softravine.com/ecommerce/"
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
                        name="barcode"
                        render={({ field }) => (
                          <FormItem>
                            {/* <FormLabel>Flash Sale</FormLabel> */}
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Flash Sale"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="barcode"
                        render={({ field }) => (
                          <FormItem>
                            {/* <FormLabel>Home</FormLabel> */}
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="https://demo.softravine.com/ecommerce/"
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
                        name="barcode"
                        render={({ field }) => (
                          <FormItem>
                            {/* <FormLabel>Home</FormLabel> */}
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Blogs"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="barcode"
                        render={({ field }) => (
                          <FormItem>
                            {/* <FormLabel>Home</FormLabel> */}
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="https://demo.softravine.com/ecommerce/"
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
                        name="barcode"
                        render={({ field }) => (
                          <FormItem>
                            {/* <FormLabel>Home</FormLabel> */}
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="All Brands"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="barcode"
                        render={({ field }) => (
                          <FormItem>
                            {/* <FormLabel>Home</FormLabel> */}
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="https://demo.softravine.com/ecommerce/"
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
                        name="barcode"
                        render={({ field }) => (
                          <FormItem>
                            {/* <FormLabel>Home</FormLabel> */}
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="All Categories"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="barcode"
                        render={({ field }) => (
                          <FormItem>
                            {/* <FormLabel>Home</FormLabel> */}
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="https://demo.softravine.com/ecommerce/"
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
                        name="barcode"
                        render={({ field }) => (
                          <FormItem>
                            {/* <FormLabel>Home</FormLabel> */}
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="All Sellers"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="barcode"
                        render={({ field }) => (
                          <FormItem>
                            {/* <FormLabel>Home</FormLabel> */}
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="https://demo.softravine.com/ecommerce/"
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
                        name="barcode"
                        render={({ field }) => (
                          <FormItem>
                            {/* <FormLabel>Home</FormLabel> */}
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Coupons"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="barcode"
                        render={({ field }) => (
                          <FormItem>
                            {/* <FormLabel>Home</FormLabel> */}
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="https://demo.softravine.com/ecommerce/"
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
                        name="barcode"
                        render={({ field }) => (
                          <FormItem>
                            {/* <FormLabel>Home</FormLabel> */}
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Today's Deal"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="barcode"
                        render={({ field }) => (
                          <FormItem>
                            {/* <FormLabel>Home</FormLabel> */}
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="https://demo.softravine.com/ecommerce/"
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
        </form>
      </Form>
    </div>
  );
}
