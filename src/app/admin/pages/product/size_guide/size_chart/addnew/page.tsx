"use client";
import * as React from "react"
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";
import { z } from "zod";
import Breadcrumb from "@/app/admin/components/Breadcrumbs/Breadcrumb"
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
  name: z.string().min(1, {
    message: "Chart Name must be required!",
  }),
  category_id: z.string().min(1, {
    message: "Select Product category",
  }),
  photos: z.string().min(1, {
    message: "Upload photos",
  }),
  // description: z.string().min(10, {
  //   message: "Product description must be at least 10 characters.",
  // }),
  fit_type: z.string().min(1, {
    message: "Select fit type",
  }),
  stretch_type: z.string().min(1, {
    message: "Select stretch type",
  }),
  measurement_points: z.string().min(1, {
    message: "Select measurement points",
  }),
  size_options: z.string().min(1, {
    message: "Select size options",
  }),
});

export default function AddOrEdit() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category_id: "",
      photos: "",
      // description: "",
      fit_type: "",
      stretch_type: "",
      measurement_points: "",
      size_options: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fetch data if editing an existing ticket
  useEffect(() => {
    if (id) {
      const fetchTicket = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
          const response = await fetch(`${apiUrl}/server/api/routes/admin/product/size_chart/${id}`);
          const data = await response.json();
          form.reset(data); // Populate form with existing data
        } catch (error) {
          showErrorToast("Failed to fetch blog category data.");
        }
      };
      fetchTicket();
    }
  }, [id, form]);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (values) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

    if (!apiUrl) {
      showErrorToast("API URL is not configured.");
      return;
    }

    setIsLoading(true);

    try {
      const method = id ? "PUT" : "POST";
      const url = id
        ? `${apiUrl}/server/api/routes/admin/product/size_chart/${id}`
        : `${apiUrl}/server/api/routes/admin/product/size_chart`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to add size chart. Please try again.");
      }

      const result = await response.json();

      showSuccessToast(result.message || "size chart added successfully!");
      // router.push("/admin/pages/blog_system/size chart");
      window.location.href = `${apiUrl}/admin/pages/blog_system/size chart`;
    } catch (error) {
      showErrorToast("Error adding size chart: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]) // Adjust the type according to your data structure
  // Fetch data from an API
  useEffect(() => {
    const fetchCategories = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''
      try {
        const response = await fetch(`${apiUrl}/server/api/routes/admin/pos/select/categories`) // Replace with your API endpoint
        const data = await response.json()

        // Check if the response has the 'roles' property and it's an array
        if (data && Array.isArray(data)) {
          setCategories(data)
        } else {
          console.error('Unexpected data format:', data)
        }
      } catch (error) {
        console.error('Error fetching Categories:', error)
      }
    }

    fetchCategories()
  }, [])

  const inputClass = "bg-zinc-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-900 dark:border-slate-700 dark:placeholder-slate-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-2 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mx-auto max-w-screen-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="col-span-7 p-2">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      {id ? "Edit Size Chart Information" : "Add Size Chart Information"}
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      {[
                        { name: "name", label: "Chart Name" },
                        { name: "category_id", label: "Category" },
                        { name: "photos", label: "Image" },
                        { name: "description", label: "Description" },
                      ].map((field) => (
                        <div
                          key={field.name}
                          className="mt-3 flex flex-col gap-5.5 p-6.5"
                        >
                          <FormField
                            control={form.control}
                            name={field.name}
                            render={({ field: fieldProps }) => (
                              <FormItem>
                                <div className="grid grid-cols-1 md:grid-cols-12">
                                  <div className="col-span-3 mt-1">
                                    <FormLabel>{field.label}</FormLabel>
                                  </div>
                                  <div className="col-span-8">
                                    <FormControl>
                                      {field.name === "name" ? (
                                        <Input
                                          className={inputClass}
                                          placeholder={field.label}
                                          {...fieldProps}
                                        />
                                      ) : field.name === "category_id" ? (
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
                                            {categories.map((category) => (
                                              <SelectItem key={category.id} value={category.name}>
                                                {category.name}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      ) : field.name === "photos" ? (
                                        <Input type="file"
                                          className={inputClass}
                                          placeholder={field.label}
                                          {...fieldProps}
                                        />
                                      ) : field.name === "description" ? (
                                        <Textarea></Textarea>
                                      ) : null}

                                    </FormControl>
                                  </div>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}

                      {/* <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-3 mt-2">
                                <FormLabel>Chart Name</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
                                  <Input
                                    className={inputClass}
                                    placeholder="Chart Name"
                                    {...field}
                                  />
                                </FormControl>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      /> */}
                    </div>
                    {/* <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="category_id"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-3 mt-2">
                                <FormLabel>Category</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
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
                                      {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.name}>
                                          {category.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                              </div>
                            </div>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div> */}
                    {/* <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="photos"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-3 mt-2">
                                <FormLabel>Image</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
                                  <Input type="file"
                                    className={inputClass}
                                    placeholder="Image"
                                    {...field}
                                  />
                                </FormControl>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div> */}
                    {/* <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-3 mt-2">
                                <FormLabel>Size Description</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
                                  <Textarea></Textarea>
                                </FormControl>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="col-span-5 p-2">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Size Configuration
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      {[
                        { name: "fit_type", label: "Fit Type" },
                        { name: "stretch_type", label: "Stretch Type" },
                        { name: "measurement_points[]", label: "Measurement Points" },
                        { name: "size_options[]", label: "Size Options" },
                      ].map((field) => (
                        <div
                          key={field.name}
                          className="mt-3 flex flex-col gap-5.5 p-6.5"
                        >
                          <FormField
                            control={form.control}
                            name={field.name}
                            render={({ field: fieldProps }) => (
                              <FormItem>
                                <div className="grid grid-cols-1 md:grid-cols-12">
                                  <div className="col-span-4 mt-1">
                                    <FormLabel>{field.label}</FormLabel>
                                  </div>
                                  <div className="col-span-8">
                                    <FormControl>
                                      {field.name === "fit_type" ? (
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
                                      ) : field.name === "stretch_type" ? (
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
                                      ) : field.name === "measurement_points[]" ? (
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
                                      ) : field.name === "size_options[]" ? (
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
                                      ) : field.name === "photos" ? (
                                        <Input type="file"
                                          className={inputClass}
                                          placeholder={field.label}
                                          {...fieldProps}
                                        />
                                      ) : field.name === "description" ? (
                                        <Textarea></Textarea>
                                      ) : null}

                                    </FormControl>
                                  </div>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}


                      {/* <FormField
                        control={form.control}
                        name="fit_type"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-4 mt-2">
                                <FormLabel>Fit Type</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
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
                                </FormControl>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      /> */}
                    </div>
                    {/* <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="stretch_type"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-4 mt-2">
                                <FormLabel>Stretch Type</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
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
                                </FormControl>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div> */}
                    {/* <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="measurement_points[]"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-4 mt-2">
                                <FormLabel>Measurement Points</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select Measurement Points" />
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
                                </FormControl>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div> */}
                    {/* <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="size_options[]"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-4 mt-2">
                                <FormLabel>Size Options</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select Size Options" />
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
                                </FormControl>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div> */}
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

                <div className="mt-3">
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

            </div>
          </div>
          <div className="grid justify-items-end">
            <Button
              className="dark:text-slate-200"
              variant="outline"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
