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
  product_name: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  brand: z.string().min(3, {
    message: "Brand must be at least 3 characters.",
  }),
  unit: z.string().min(3, {
    message: "Unit must be at least 3 characters.",
  }),
  weight: z.string().min(3, {
    message: "Weight must be at least 3 characters.",
  }),
  minimum_purchase_qty: z.string().min(3, {
    message: "Minimum Purchase Qty must be at least 3 characters.",
  }),
  tag: z.string().min(3, {
    message: "Tag Purchase Qty must be at least 3 characters.",
  }),
  barcode: z.string().min(3, {
    message: "Barcode Purchase Qty must be at least 3 characters.",
  }),
  thumbnail_image: z.string().min(3, {
    message: "thumbnail_image Purchase Qty must be at least 3 characters.",
  }),
  gallery_images: z.string().min(3, {
    message: "gallery_images Purchase Qty must be at least 3 characters.",
  }),
  video_provider: z.string().min(3, {
    message: "Video Provider Purchase Qty must be at least 3 characters.",
  }),
  video_link: z.string().min(3, {
    message: "Video Link Purchase Qty must be at least 3 characters.",
  }),
});

export default function Addnew() {
  // ...
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_name: "",
      brand: "",
      unit: "",
      weight: "",
      minimum_purchase_qty: "",
      tag: "",
      barcode: "",
      thumbnail_image: "",
      gallery_images: "",
      video_provider: "",
      video_link: "",
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
                      Minimum Order Amount Settings
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="product_name"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center space-x-12">
                              <FormLabel className="mt-2">
                                Minimum Order Amount Check
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
                        name="brand"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Set Minimum Order Amount</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Minimum Order Amount"
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
