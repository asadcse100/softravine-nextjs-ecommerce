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
  carrier_name: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  transit_time: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  logo: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  shipping_type: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  billing_type: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  delimiter1: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  delimiter2: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  zones: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  carrier_price: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
});

export default function Addnew() {
  // ...
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      carrier_name: "",
      transit_time: "",
      logo: "",
      shipping_type: "",
      billing_type: "",
      delimiter1: "",
      delimiter2: "",
      zones: "",
      carrier_price: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const inputClass =
    "w-full rounded-lg border-[1px] border-primary bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-slate-300r dark:bg-form-input dark:text-slate-300";

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-4 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mx-auto max-w-screen-2xl">
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1">
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-slate-300">
                      Carrier Information
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="carrier_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Carrier Name</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Carrier Name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="transit_time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Transit Time</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Transit Time"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="logo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Logo</FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                className={inputClass}
                                placeholder="Logo"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="shipping_type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Free Shipping ?</FormLabel>
                            <FormControl>
                              {/* <Input type="file"
                                className={inputClass}
                                placeholder="Logo"
                                {...field}
                              /> */}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="billing_type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Billing Type</FormLabel>
                            <FormControl>
                              <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Billing Type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Apple">According to Weight</SelectItem>
                                <SelectItem value="m2@example.com">According to Price</SelectItem>
                              </SelectContent>
                            </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <hr className="mt-3" />
                    <p className="text-xl dark:text-slate-300 py-3">
                      Weight based carrier price range
                    </p>
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="delimiter1[]"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Will be applied when the weight is{" "}
                            </FormLabel>
                            <FormControl>
                              {/* <Select>
                                <option>According to Weight</option>
                                <option>According to Price</option>
                              </Select> */}
                              <Input
                                className={inputClass}
                                placeholder="0.00"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="delimiter2[]"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Will be applied when the weight is{" "}
                            </FormLabel>
                            <FormControl>
                              {/* <Select>
                                <option>According to Weight</option>
                                <option>According to Price</option>
                              </Select> */}
                              <Input
                                className={inputClass}
                                placeholder="0.00"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="zones[]"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Asia</FormLabel>
                            <FormControl>
                              {/* <Select>
                                <option>According to Weight</option>
                                <option>According to Price</option>
                              </Select> */}
                              <Input
                                className={inputClass}
                                placeholder="cost"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="carrier_price[1][]"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Europe</FormLabel>
                            <FormControl>
                              {/* <Select>
                                <option>According to Weight</option>
                                <option>According to Price</option>
                              </Select> */}
                              <Input
                                className={inputClass}
                                placeholder="cost"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="zones[]"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Africa</FormLabel>
                            <FormControl>
                              {/* <Select>
                                <option>According to Weight</option>
                                <option>According to Price</option>
                              </Select> */}
                              <Input
                                className={inputClass}
                                placeholder="cost"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="mt-3">
                        <Button
                          className="dark:text-slate-200"
                          variant="outline"
                          type="submit"
                        >
                          New Range
                        </Button>
                      </div>
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
          </div>
        </form>
      </Form>
    </div>
  );
}
