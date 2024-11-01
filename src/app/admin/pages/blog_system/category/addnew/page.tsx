"use client";
import { useRouter } from 'next/router';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { useEffect, useState } from 'react';
import { Button } from "@/app/admin/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/admin/components/ui/form";
import Input from "@/shared/Input/Input";

// Define the schema for form validation using Zod
const formSchema = z.object({
  category_name: z.string().min(3, {
    message: "Blog Category Name must be at least 3 characters.",
  }),
});

// Define TypeScript type for form data
type FormData = z.infer<typeof formSchema>;

export default function AddNewCategory() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  // Check if component is mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category_name: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

    try {
      const response = await fetch(`${apiUrl}/server/api/routes/admin/blogs/blogCategories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to add category. Please try again.');
      }

      const result = await response.json();
      toast.success(result.message || "Category added successfully!");

      if (isMounted) {
        router.push("/admin/pages/blog_system/category");
      }
    } catch (error) {
      toast.error("Error adding category: " + (error as Error).message);
    }
  };

  // Render only if mounted to avoid NextRouter errors
  if (!isMounted) return null;

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-2 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mx-auto max-w-screen-2xl">
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1">
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Blog Category Information
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="category_name"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-3 mt-2">
                                <FormLabel>Category Name</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
                                  <Input
                                    className="bg-zinc-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-900 dark:border-slate-800 dark:placeholder-slate-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Category Name"
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
                    <div className="grid mt-4 justify-items-end">
                      <Button
                        className="dark:text-slate-200"
                        variant="outline"
                        type="submit"
                        disabled={form.formState.isSubmitting}
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
