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
import { Checkbox } from "@radix-ui/react-checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/admin/components/ui/select";


const formSchema = z.object({
  name: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
  category_id: z.string().min(10, {
    message: "Product category_id must be at least 10 characters.",
  }),
  photos: z.string().min(10, {
    message: "Product photos must be at least 10 characters.",
  }),
  description: z.string().min(10, {
    message: "Product description must be at least 10 characters.",
  }),
  fit_type: z.string().min(10, {
    message: "Product fit_type must be at least 10 characters.",
  }),
  stretch_type: z.string().min(10, {
    message: "Product stretch_type must be at least 10 characters.",
  }),
  measurement_points: z.string().min(10, {
    message: "Product measurement_points must be at least 10 characters.",
  }),
  size_options: z.string().min(10, {
    message: "Product size_options must be at least 10 characters.",
  }),
});

export default function Addnew() {
  // ...
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category_id: "",
      photos: "",
      description: "",
      fit_type: "",
      stretch_type: "",
      measurement_points: "",
      size_options: "",
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
                    Size Chart Information
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Chart Name</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="Product Name"
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
                        name="category_id"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Apple">Apple</SelectItem>
                                <SelectItem value="m2@example.com">Pran</SelectItem>
                                <SelectItem value="m22@example.com">Squre</SelectItem>
                                <SelectItem value="m3@example.com">ACI</SelectItem>
                                <SelectItem value="m4@example.com">SoftRavine</SelectItem>
                                <SelectItem value="m5@example.com">Samsung</SelectItem>
                                <SelectItem value="m6@example.com">LG</SelectItem>
                                <SelectItem value="m7@example.com">Logitech</SelectItem>
                                <SelectItem value="m8@example.com">A4tech</SelectItem>
                                <SelectItem value="m9@example.com">HP</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="photos"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                              <Input type="file"
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
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Size Description</FormLabel>
                            <FormControl>
                              <Textarea></Textarea>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                    Size Configuration
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="fit_type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fit Type</FormLabel>
       
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Fit Type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Apple">Slim Fit</SelectItem>
                                <SelectItem value="m2@example.com">Pran</SelectItem>
                                <SelectItem value="m22@example.com">Squre</SelectItem>
                                <SelectItem value="m3@example.com">ACI</SelectItem>
                                <SelectItem value="m4@example.com">SoftRavine</SelectItem>
                                <SelectItem value="m5@example.com">Samsung</SelectItem>
                                <SelectItem value="m6@example.com">LG</SelectItem>
                                <SelectItem value="m7@example.com">Logitech</SelectItem>
                                <SelectItem value="m8@example.com">A4tech</SelectItem>
                                <SelectItem value="m9@example.com">HP</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="stretch_type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Stretch Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Stretch Type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Apple">Slim Fit</SelectItem>
                                <SelectItem value="m2@example.com">Pran</SelectItem>
                                <SelectItem value="m22@example.com">Squre</SelectItem>
                                <SelectItem value="m3@example.com">ACI</SelectItem>
                                <SelectItem value="m4@example.com">SoftRavine</SelectItem>
                                <SelectItem value="m5@example.com">Samsung</SelectItem>
                                <SelectItem value="m6@example.com">LG</SelectItem>
                                <SelectItem value="m7@example.com">Logitech</SelectItem>
                                <SelectItem value="m8@example.com">A4tech</SelectItem>
                                <SelectItem value="m9@example.com">HP</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="measurement_points[]"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Measurement Points</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Stretch Type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Apple">Slim Fit</SelectItem>
                                <SelectItem value="m2@example.com">Pran</SelectItem>
                                <SelectItem value="m22@example.com">Squre</SelectItem>
                                <SelectItem value="m3@example.com">ACI</SelectItem>
                                <SelectItem value="m4@example.com">SoftRavine</SelectItem>
                                <SelectItem value="m5@example.com">Samsung</SelectItem>
                                <SelectItem value="m6@example.com">LG</SelectItem>
                                <SelectItem value="m7@example.com">Logitech</SelectItem>
                                <SelectItem value="m8@example.com">A4tech</SelectItem>
                                <SelectItem value="m9@example.com">HP</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="size_options[]"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Size Options</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Stretch Type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Apple">Slim Fit</SelectItem>
                                <SelectItem value="m2@example.com">Pran</SelectItem>
                                <SelectItem value="m22@example.com">Squre</SelectItem>
                                <SelectItem value="m3@example.com">ACI</SelectItem>
                                <SelectItem value="m4@example.com">SoftRavine</SelectItem>
                                <SelectItem value="m5@example.com">Samsung</SelectItem>
                                <SelectItem value="m6@example.com">LG</SelectItem>
                                <SelectItem value="m7@example.com">Logitech</SelectItem>
                                <SelectItem value="m8@example.com">A4tech</SelectItem>
                                <SelectItem value="m9@example.com">HP</SelectItem>
                              </SelectContent>
                            </Select>
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
                            <FormLabel>Measurement Type</FormLabel>
                            <Checkbox>Inch</Checkbox>
                            <Checkbox>Centimeter</Checkbox>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

              <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                    Size Combination
                    </h3>
                  </div>
                  <div className="py-6">

                  </div>
                </div>


          </div>
          </div>
          <div className="grid justify-items-end">
              <Button
                className="dark:text-slate-200"
                variant="outline"
                type="submit"
              >
                Save
              </Button>
            </div>
        </form>
      </Form>
    </div>
  );
}
