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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/admin/components/ui/select";

const formSchema = z.object({
  MAIL_DRIVER: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  MAIL_HOST: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  MAIL_PORT: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  MAIL_USERNAME: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  MAIL_PASSWORD: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  MAIL_ENCRYPTION: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  MAIL_FROM_ADDRESS: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  MAIL_FROM_NAME: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  email: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
});

export default function Addnew() {
  // ...
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      MAIL_DRIVER: "",
      MAIL_HOST: "",
      MAIL_PORT: "",
      MAIL_USERNAME: "",
      MAIL_PASSWORD: "",
      MAIL_ENCRYPTION: "",
      MAIL_FROM_ADDRESS: "",
      MAIL_FROM_NAME: "",
      email: "",
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
                      SMTP Setting
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="MAIL_DRIVER"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type</FormLabel>
                            <FormControl>
                              <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Apple">SMTP</SelectItem>
                                <SelectItem value="m2@example.com">Send Mail</SelectItem>
                                <SelectItem value="m22@example.com">Mail Gun</SelectItem>
                              </SelectContent>
                            </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="MAIL_HOST"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mail Host</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="123.45.34.435"
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
                        name="MAIL_PORT"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mail Port</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="587"
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
                        name="MAIL_USERNAME"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mail Username</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="test@mail.com"
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
                        name="MAIL_PASSWORD"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mail Password</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Password"
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
                        name="MAIL_ENCRYPTION"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mail Encription</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="SSL"
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
                        name="MAIL_FROM_ADDRESS"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mail From Address</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="test@softravine.com"
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
                        name="MAIL_FROM_NAME"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mail From Name</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="no-reply"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid mt-4 justify-items-end">
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
              <div className="grid grid-cols-1 gap-4 md:grid-cols-1 sm:grid-cols-2">
                <div className="flex flex-col gap-4">
                  <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Test SMTP configuration
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>For Test SMTP Mail</FormLabel>
                              <FormControl>
                                <Input
                                  className={inputClass}
                                  placeholder="your@mail.com"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid mt-4 justify-items-end">
                        <Button
                          className="dark:text-slate-200"
                          variant="outline"
                          type="submit"
                        >
                          Send
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Instruction
                      </h3>
                    </div>
                    <div className="py-6">
                      <p className="text-red-500">
                        Please be carefull when you are configuring SMTP. For
                        incorrect configuration you will get error at the time
                        of order place, new registration, sending newsletter.
                      </p>
                      <div className="py-4 dark:text-slate-300">
                        <p className="text-xl">For Non-SSL</p>
                        <div className="border dark:border-slate-500 dark:text-slate-400 mt-2 p-3">
                          Select sendmail for Mail Driver if you face any issue
                          after configuring smtp as Mail Driver
                        </div>
                        <div className="border dark:border-slate-500 dark:text-slate-400 p-3">
                          Set Mail Host according to your server Mail Client
                          Manual Settings
                        </div>
                        <div className="border dark:border-slate-500 dark:text-slate-400 p-3">
                          Set Mail port as 587
                        </div>
                        <div className="border dark:border-slate-500 dark:text-slate-400 p-3">
                          Set Mail Encryption as ssl if you face issue with tls
                        </div>
                      </div>
                      <div className="py-4 dark:text-slate-300">
                        <p className="text-xl">For SSL</p>
                        <div className="border dark:border-slate-500 dark:text-slate-400 mt-2 p-3">
                          Select sendmail for Mail Driver if you face any issue
                          after configuring smtp as Mail Driver
                        </div>
                        <div className="border dark:border-slate-500 dark:text-slate-400 p-3">
                          Set Mail Host according to your server Mail Client
                          Manual Settings
                        </div>
                        <div className="border dark:border-slate-500 dark:text-slate-400 p-3">
                          Set Mail port as 465
                        </div>
                        <div className="border dark:border-slate-500 dark:text-slate-400 p-3">
                          Set Mail Encryption as ssl
                        </div>
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
