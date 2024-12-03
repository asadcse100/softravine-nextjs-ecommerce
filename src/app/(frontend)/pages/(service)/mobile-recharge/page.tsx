"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/app/seller/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/seller/components/ui/form";
import Input from "@/shared/Input/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/admin/components/ui/select";
import { Switch } from "@/app/seller/components/ui/switch";

const formSchema = z.object({
  name: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  brand_id: z.string().min(3, {
    message: "Brand must be at least 3 characters.",
  }),
  unit: z.string().min(3, {
    message: "Unit must be at least 3 characters.",
  }),
});

export default function AccountPass() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      brand_id: "",
      unit: "",
      weight: "",
      min_qty: "",
      tag: "",
      barcode: "",
      refundable: "",
      photos: "",
      thumbnail_img: "",
      video_provider: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {

    console.log(values);
  }

  const inputClass = "bg-zinc-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-900 dark:border-slate-700 dark:placeholder-slate-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <div className="space-y-10 sm:space-y-12 bg-white dark:bg-slate-800 p-5 rounded-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className=" max-w-xl space-y-2">
            
            <div className="flex flex-col gap-5.5 p-6.5">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-1 md:grid-cols-12">
                      <div className="col-span-3 mt-3">
                        <FormLabel>Mobile Number</FormLabel>
                      </div>
                      <div className="col-span-8">
                        <FormControl>
                          <Input
                            className={inputClass}
                            placeholder="Mobile Number"
                            {...field}
                          />
                        </FormControl>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>


            <div className="flex flex-col gap-5.5 p-6.5">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-1 md:grid-cols-12">
                      <div className="col-span-3 mt-3">
                        <FormLabel>Amount</FormLabel>
                      </div>
                      <div className="col-span-8">
                        <FormControl>
                          <Input
                            className={inputClass}
                            placeholder="Amount"
                            {...field}
                          />
                        </FormControl>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-3 flex flex-col gap-5.5 p-6.5">
              <FormField
                control={form.control}
                name="product_ids[]"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-1 md:grid-cols-12">
                      <div className="col-span-3 mt-3">
                        <FormLabel>Mobile Operator</FormLabel>
                      </div>
                      <div className="col-span-8">
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Mobile Operator" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Grameen_Phone">Grameen Phone</SelectItem>
                              <SelectItem value="Robi">Robi</SelectItem>
                              <SelectItem value="Airtel">Airtel</SelectItem>
                              <SelectItem value="Banglalink">Banglalink</SelectItem>
                              <SelectItem value="Teletalk">Teletalk</SelectItem>
                              <SelectItem value="Siktto">Siktto</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-3 flex flex-col gap-5.5 p-6.5">
              <FormField
                control={form.control}
                name="product_ids[]"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-1 md:grid-cols-12">
                      <div className="col-span-3 mt-3">
                        <FormLabel>Pre/Post Paid</FormLabel>
                      </div>
                      <div className="col-span-8">
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Pre/Post Paid" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Pre_Paid">Pre_Paid</SelectItem>
                              <SelectItem value="Post_Paid">Post Paid</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

          </div>
        </form>
      </Form>
    </div>
  );
};

