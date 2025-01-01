"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/router";
import Breadcrumb from "@/app/business/components/Breadcrumbs/Breadcrumb";
import { Button } from "@/app/business/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/business/components/ui/form";
import Input from "@/shared/Input/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/business/components/ui/select";
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

export default function AddOrEdit() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [isMounted, setIsMounted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // Fetch data if editing an existing ticket
  useEffect(() => {
    if (id) {
      const fetchTicket = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
          const response = await fetch(`${apiUrl}/server/api/routes/business/blog_system/all_blog/${id}`);
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

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
  //     try {
  //       const response = await fetch(`${apiUrl}/server/api/routes/admin/blogs/select/categories`);
  //       const data = await response.json();

  //       if (Array.isArray(data)) {
  //         setCategories(data);
  //       } else {
  //         console.error("Unexpected data format:", data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //     }
  //   };
  //   fetchCategories();
  // }, []);


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

  // const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (values) => {
  //   const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

  //   try {
  //     const response = await fetch(`${apiUrl}/server/api/routes/business/blog_system/all_blog`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(values),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to add category. Please try again.");
  //     }

  //     const result = await response.json();
  //     toast.success(result.message || "Category added successfully!");
  //     router.push("/admin/pages/blog_system/category");
  //   } catch (error) {
  //     toast.error("Error adding category: " + (error as Error).message);
  //   }
  // };


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
        ? `${apiUrl}/server/api/routes/business/blog_system/all_blog/${id}`
        : `${apiUrl}/server/api/routes/business/blog_system/all_blog`;

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
    <div className="min-h-screen mx-auto max-w-screen-2xl p-4 md:p-6 bg-slate-100 dark:bg-slate-900">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Blog Information Section */}
            <div>
              <h3 className="font-medium text-black dark:text-white">
                {id ? "Edit Blog Information" : "Add Blog Information"}
              </h3>
              <div className="space-y-4 mt-4">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input className={inputClass} placeholder="Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category */}
                <FormField
                  control={form.control}
                  name="category_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
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
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Banner */}
                <FormField
                  control={form.control}
                  name="banner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Banner</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          className={inputClass}
                          onChange={handleBannerChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Short Description */}
                <FormField
                  control={form.control}
                  name="short_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Description</FormLabel>
                      <FormControl>
                        <Textarea className={inputClass} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <EditorContent
                    editor={editor}
                    className="border p-4 rounded bg-white dark:bg-gray-800"
                    onChange={handleEditorContentChange}
                  />
                </FormItem>
              </div>
            </div>

            {/* SEO Section */}
            <div>
              <h3 className="font-medium text-black dark:text-white">SEO Section</h3>
              <div className="space-y-4 mt-4">
                {/* Meta Title */}
                <FormField
                  control={form.control}
                  name="meta_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Title</FormLabel>
                      <FormControl>
                        <Input className={inputClass} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Meta Image */}
                <FormField
                  control={form.control}
                  name="meta_img"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Image</FormLabel>
                      <FormControl>
                        <Input className={inputClass} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Meta Description */}
                <FormField
                  control={form.control}
                  name="meta_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Description</FormLabel>
                      <FormControl>
                        <Textarea className={inputClass} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            {/* <Button variant="outline" type="submit">
              Save as Draft
            </Button>
            <Button variant="solid" onClick={handleEditorContentChange} type="submit">
              Publish
            </Button> */}
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
