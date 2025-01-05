"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import Breadcrumb from "@/app/admin/components/Breadcrumbs/Breadcrumb";
import { toast } from "@/app/admin/components/ui/use-toast";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/admin/components/ui/select";
import Textarea from "@/shared/Textarea/Textarea";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";

const formSchema = z.object({
  title: z.string().min(10, { message: "Title must be at least 10 characters." }),
  category_id: z.string(),
  slug: z.string(),
  banner: z.any(),
  short_description: z.string().min(5, {
    message: "Short description must be at least 5 characters.",
  }),
  description: z.string().min(100, {
    message: "Description must be at least 100 characters.",
  }),
  meta_title: z.string(),
  meta_img: z.string(),
  meta_description: z.string(),
});

export default function AddNew() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  // const [isMounted, setIsMounted] = useState(false);
  // const router = useRouter();

  const [isLoading, setIsLoading, isMounted, setIsMounted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category_id: "",
      slug: "",
      short_description: "",
      description: "",
      meta_title: "",
      meta_img: "",
      meta_description: "",
    },
  });

  // Fetch data if editing an existing ticket
  useEffect(() => {
    if (id) {
      const fetchTicket = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
          const response = await fetch(`${apiUrl}/server/api/routes/admin/blogs/${id}`);
          const data = await response.json();
          form.reset(data); // Populate form with existing data
        } catch (error) {
          showErrorToast("Failed to fetch blog category data.");
        }
      };
      fetchTicket();
    }
  }, [id, form]);

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: "<p>Start writing here...</p>",
  });

  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      try {
        const response = await fetch(`${apiUrl}/server/api/routes/admin/blogs/select/categories`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);


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
        ? `${apiUrl}/server/api/routes/admin/blogs/${id}`
        : `${apiUrl}/server/api/routes/admin/blogs`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to add blog. Please try again.");
      }

      const result = await response.json();

      showSuccessToast(result.message || "blog added successfully!");
      // router.push("/admin/pages/blog_system/blog");
      window.location.href = `${apiUrl}/admin/pages/blog_system/blog`;
    } catch (error) {
      showErrorToast("Error adding blog: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  const handleEditorContentChange = () => {
    const content = editor?.getHTML() || "";
    form.setValue("description", content);
  };

  const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    form.setValue("banner", file || null);
  };

  const inputClass = "bg-zinc-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-900 dark:border-slate-700 dark:placeholder-slate-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-2 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2 ">
            {/* Blog Information Section */}
            <div className="px-6 py-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <h3 className="font-medium text-black dark:text-white">
                {id ? "Edit Blog Information" : "Add Blog Information"}
              </h3>
              <div className="space-y-4 mt-4">

                {[
                  { name: "title", label: "Title" },
                  { name: "category_id", label: "Select Category" },
                  { name: "banner", label: "Banner" },
                  { name: "short_description", label: "Short Description" },
                  { name: "description", label: "Description" },
                ].map((field) => (
                  <div key={field.name} className="mt-3 flex flex-col gap-5.5 p-6.5">
                    <FormField
                      control={form.control}
                      name={field.name}
                      render={({ field: fieldProps }) => (
                        <FormItem>
                          <div className="grid grid-cols-1 md:grid-cols-12">
                            <div className="col-span-3 mt-3">
                              <FormLabel>{field.label}</FormLabel>
                            </div>
                            <div className="col-span-8">
                              <FormControl>
                                {field.name === "title" ? (
                                  <Input
                                    className={inputClass}
                                    placeholder={field.label}
                                    {...fieldProps}
                                  />
                                ) : field.name === "category_id" ? (
                                  <Select onValueChange={field.onChange}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id}>
                                          {category.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                ) : field.name === "banner" ? (
                                  <Input type="file" onChange={handleBannerChange} className={inputClass} placeholder={field.label} {...fieldProps} />
                                ) : field.name === "short_description" ? (
                                  <Textarea className={inputClass} {...field} />
                                ) : field.name === "description" ? (
                                  <EditorContent
                                    editor={editor}
                                    className="border p-4 rounded bg-white dark:bg-gray-800"
                                    onChange={handleEditorContentChange}
                                  />
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

              </div>
            </div>

            {/* SEO Section */}
            <div className="px-6 py-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <h3 className="font-medium text-black dark:text-white">SEO Section</h3>
              <div className="space-y-4 mt-4">
                {[
                  { name: "meta_title", label: "Meta Title" },
                  { name: "meta_img", label: "Meta Image" },
                  { name: "meta_description", label: "Meta Description" },
                ].map((field) => (
                  <div key={field.name} className="mt-3 flex flex-col gap-5.5 p-6.5">
                    <FormField
                      control={form.control}
                      name={field.name}
                      render={({ field: fieldProps }) => (
                        <FormItem>
                          <div className="grid grid-cols-1 md:grid-cols-12">
                            <div className="col-span-3 mt-2">
                              <FormLabel>{field.label}</FormLabel>
                            </div>
                            <div className="col-span-8">
                              {/* <FormControl> */}
                              <FormControl>
                                {field.name === "meta_title" ? (
                                  <Input
                                    className={inputClass}
                                    placeholder={field.label}
                                    {...fieldProps}
                                  />
                                ) : field.name === "meta_img" ? (
                                  <Input
                                    type="file"
                                    onChange={handleBannerChange}
                                    className={inputClass}
                                    placeholder={field.label}
                                    {...fieldProps}
                                  />
                                ) : field.name === "meta_description" ? (
                                  <Textarea
                                    className={inputClass}
                                    placeholder={field.label}
                                    {...fieldProps}
                                  />
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
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
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
