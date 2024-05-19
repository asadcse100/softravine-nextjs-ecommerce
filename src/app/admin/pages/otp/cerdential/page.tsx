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

const formSchema = z.object({
  NEXMO_KEY: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  NEXMO_SECRET: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  NEXMO_SENDER_ID: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  TWILIO_SID: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  TWILIO_AUTH_TOKEN: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  VALID_TWILLO_NUMBER: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  TWILLO_TYPE: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  SSL_SMS_API_TOKEN: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  SSL_SMS_SID: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  SSL_SMS_URL: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  AUTH_KEY: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  ENTITY_ID: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  ROUTE: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  LANGUAGE: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  SENDER_ID: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  MIMO_USERNAME: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  MIMO_PASSWORD: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  MIMO_SENDER_ID: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  MIM_USER_NAME: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  MIM_API_KEY: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  MIM_SENDER_ID: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  MSEGAT_API_KEY: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  MSEGAT_USERNAME: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  MSEGAT_USER_SENDER: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  ZENDER_SITEURL: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  ZENDER_APIKEY: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  ZENDER_SERVICE: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  ZENDER_WHATSAPP: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  ZENDER_DEVICE: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  ZENDER_GATEWAY: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  ZENDER_SIM: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
});

export default function Addnew() {
  // ...
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      NEXMO_KEY: "",
      NEXMO_SECRET: "",
      NEXMO_SENDER_ID: "",
      TWILIO_SID: "",
      TWILIO_AUTH_TOKEN: "",
      VALID_TWILLO_NUMBER: "",
      TWILLO_TYPE: "",
      SSL_SMS_API_TOKEN: "",
      SSL_SMS_SID: "",
      SSL_SMS_URL: "",
      AUTH_KEY: "",
      ENTITY_ID: "",
      ROUTE: "",
      LANGUAGE: "",
      SENDER_ID: "",
      MIMO_USERNAME: "",
      MIMO_PASSWORD: "",
      MIMO_SENDER_ID: "",
      MIM_USER_NAME: "",
      MIM_API_KEY: "",
      MIM_SENDER_ID: "",
      MSEGAT_API_KEY: "",
      MSEGAT_USERNAME: "",
      MSEGAT_USER_SENDER: "",
      ZENDER_SITEURL: "",
      ZENDER_APIKEY: "",
      ZENDER_SERVICE: "",
      ZENDER_WHATSAPP: "",
      ZENDER_DEVICE: "",
      ZENDER_GATEWAY: "",
      ZENDER_SIM: "",
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
                      Nexmo Credential
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="NEXMO_KEY"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>NEXMO KEY</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="NEXMO KEY"
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
                        name="NEXMO_SECRET"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>NEXMO SECRET</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="NEXMO SECRET"
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
                        name="NEXMO_SENDER_ID"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>NEXMO SENDER ID</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="NEXMO SENDER ID"
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
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Twilio Credential
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="TWILIO_SID"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>TWILIO SID</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="TWILIO SID"
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
                        name="TWILIO_AUTH_TOKEN"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>TWILIO AUTH TOKEN</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="TWILIO AUTH TOKEN"
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
                        name="VALID_TWILLO_NUMBER"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>VALID TWILIO NUMBER</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="VALID TWILIO NUMBER"
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
                        name="TWILLO_TYPE"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>TWILIO TYPE</FormLabel>
                            <FormControl>
                              <Select>
                                <option>SMS</option>
                                <option>What App</option>
                              </Select>
                              {/* <Input
                                className={inputClass}
                                placeholder="VALID TWILIO NUMBER"
                                {...field}
                              /> */}
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
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      SSL Wireless Credential
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="SSL_SMS_API_TOKEN"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SSL SMS API TOKEN</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="SSL SMS API TOKEN"
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
                        name="SSL_SMS_SID"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SSL SMS SID</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="SSL SMS SID"
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
                        name="SSL_SMS_URL"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SSL SMS URL</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="SSL SMS URL"
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
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Fast2SMS Credential
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="AUTH_KEY"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>AUTH KEY</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="AUTH KEY"
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
                        name="ENTITY_ID"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ENTITY ID</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="ENTITY ID"
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
                        name="ROUTE"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ROUTE</FormLabel>
                            <FormControl>
                              <Select>
                                <option>Transactional Use</option>
                                <option>DLT Manual</option>
                                <option>Promotional Use</option>
                              </Select>
                              {/* <Input
                                className={inputClass}
                                placeholder="ROUTE"
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
                        name="LANGUAGE"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Language</FormLabel>
                            <FormControl>
                              <Select>
                                <option>English</option>
                                <option>Unicode</option>
                              </Select>
                              {/* <Input
                                className={inputClass}
                                placeholder="ROUTE"
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
                        name="SENDER_ID"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SENDER ID</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="ROUTE"
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
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      MIMO Credential
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="MIMO_USERNAME"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>MIMO_USERNAME</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="MIMO_USERNAME"
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
                        name="MIMO_PASSWORD"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>MIMO_PASSWORD</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="MIMO_PASSWORD"
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
                        name="MIMO_SENDER_ID"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>MIMO_SENDER_ID</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="FSTSMS"
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
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      MIMSMS Credential
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="MIM_USER_NAME"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>User Name</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="User Name"
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
                        name="MIM_API_KEY"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>API KEY</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="API KEY"
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
                        name="MIM_SENDER_ID"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SENDER ID</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="SENDER ID"
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
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      MSEGAT Credential
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="MSEGAT_API_KEY"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>MSEGAT_API_KEY</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="MSEGAT_API_KEY"
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
                        name="MSEGAT_USERNAME"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>MSEGAT_USERNAME</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="MSEGAT_USERNAME"
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
                        name="MSEGAT_USER_SENDER"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>MSEGAT_USER_SENDER</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="MSEGAT_USER_SENDER
"
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
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Zender Credential
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="ZENDER_SITEURL"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZENDER_SITEURL</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="ZENDER_SITEURL"
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
                        name="ZENDER_APIKEY"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZENDER_APIKEY</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="ZENDER_APIKEY"
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
                        name="ZENDER_SERVICE"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZENDER_SERVICE</FormLabel>
                            <FormControl>
                              <Select>
                                <option>SMS</option>
                                <option>Whats App</option>
                              </Select>
                              {/* <Input
                                className={inputClass}
                                placeholder="ZENDER_SERVICE"
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
                        name="ZENDER_WHATSAPP"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZENDER_WHATSAPP</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="ZENDER_WHATSAPP"
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
                        name="ZENDER_DEVICE"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZENDER_DEVICE</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="ZENDER_DEVICE"
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
                        name="ZENDER_GATEWAY"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZENDER_GATEWAY</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="ZENDER_GATEWAY"
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
                        name="ZENDER_SIM"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZENDER_SIM</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="ZENDER_SIM"
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
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
