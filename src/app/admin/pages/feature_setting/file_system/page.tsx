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
import { Switch } from "@/app/admin/components/ui/switch";

const formSchema = z.object({
  AWS_ACCESS_KEY_ID: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  AWS_SECRET_ACCESS_KEY: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  AWS_DEFAULT_REGION: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  AWS_BUCKET: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  AWS_URL: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  BACKBLAZE_ACCESS_KEY_ID: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  BACKBLAZE_SECRET_ACCESS_KEY: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  BACKBLAZE_DEFAULT_REGION: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  BACKBLAZE_BUCKET: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  BACKBLAZE_ENDPOINT: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  BACKBLAZE_URL: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  FILESYSTEM_DRIVER: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
});

export default function Addnew() {
  // ...
  // 1. Define your form.
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
                      S3 File System Credentials
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="AWS_ACCESS_KEY_ID"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>AWS_ACCESS_KEY_ID</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="AWS_ACCESS_KEY_ID"
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
                        name="AWS_SECRET_ACCESS_KEY"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>AWS_SECRET_ACCESS_KEY</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="AWS_SECRET_ACCESS_KEY"
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
                        name="AWS_DEFAULT_REGION"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>AWS_DEFAULT_REGION</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="AWS_DEFAULT_REGION"
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
                        name="AWS_BUCKET"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>AWS_BUCKET</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="AWS_BUCKET"
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
                        name="AWS_URL"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>AWS_URL</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="https://bucket-name.s3.region.amazonaws.com"
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
                        <FormField
                          control={form.control}
                          name="BACKBLAZE_ACCESS_KEY_ID"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>BACKBLAZE_ACCESS_KEY_ID</FormLabel>
                              <FormControl>
                                <Input
                                  className={inputClass}
                                  placeholder="BACKBLAZE_ACCESS_KEY_ID"
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
                          name="BACKBLAZE_SECRET_ACCESS_KEY"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>BACKBLAZE_SECRET_ACCESS_KEY</FormLabel>
                              <FormControl>
                                <Input
                                  className={inputClass}
                                  placeholder="BACKBLAZE_SECRET_ACCESS_KEY"
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
                          name="BACKBLAZE_DEFAULT_REGION"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>BACKBLAZE_SECRET_ACCESS_KEY</FormLabel>
                              <FormControl>
                                <Input
                                  className={inputClass}
                                  placeholder="BACKBLAZE_SECRET_ACCESS_KEY"
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
                          name="BACKBLAZE_BUCKET"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>BACKBLAZE_BUCKET</FormLabel>
                              <FormControl>
                                <Input
                                  className={inputClass}
                                  placeholder="BACKBLAZE_BUCKET"
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
                          name="BACKBLAZE_ENDPOINT"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>BACKBLAZE_ENDPOINT</FormLabel>
                              <FormControl>
                                <Input
                                  className={inputClass}
                                  placeholder="BACKBLAZE_ENDPOINT"
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
                          name="BACKBLAZE_URL"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>BACKBLAZE_URL</FormLabel>
                              <FormControl>
                                <Input
                                  className={inputClass}
                                  placeholder="BACKBLAZE_URL"
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
