"use client";
import ProductCard from "@/app/(frontend)/components/ProductCard";
import Breadcrumb from "@/app/customer/components/Breadcrumbs/Breadcrumb";
import { PRODUCTS } from "@/data/data";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { showErrorToast, showSuccessToast} from "@/app/admin/components/Toast";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const formSchema = z.object({
  code: z.string().min(10, {
    message: "code must be at least 10 characters.",
  }),
  product_ids: z.string().min(10, {
    message: "product_ids must be at least 10 characters.",
  }),
  date_range: z.string().min(10, {
    message: "date_range must be at least 10 characters.",
  }),
  discount: z.string().min(10, {
    message: "discount must be at least 10 characters.",
  }),
  min_buy: z.string().min(10, {
    message: "discount must be at least 10 characters.",
  }),
  max_discount: z.string().min(10, {
    message: "max_discount must be at least 10 characters.",
  }),
});

export default function AddOrEdit() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [isLoading, setIsLoading] = useState(false);

  // Fetch data if editing an existing ticket
  useEffect(() => {
    if (id) {
      const fetchTicket = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
          const response = await fetch(`${apiUrl}/server/api/routes/customer/favoritelist/${id}`);
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
        ? `${apiUrl}/server/api/routes/customer/favoritelist/${id}`
        : `${apiUrl}/server/api/routes/customer/favoritelist`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      if (!response.ok) {
        throw new Error("Failed to favoritelist. Please try again.");
      }
  
      const result = await response.json();
  
      showSuccessToast(result.message || "favoritelist added successfully!");
      // router.push("/admin/pages/blog_system/favoritelist");
      window.location.href = `${apiUrl}/admin/pages/blog_system/favoritelist`;
    } catch (error) {
      showErrorToast("Error adding favoritelist: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  const renderSection1 = () => {
    return (
      <div className="space-y-10 sm:space-y-12 bg-gray-300 dark:bg-gray-700 p-4 rounded-xl mt-2">
        <div className="mb-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Breadcrumb pageName="Favorite List" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.filter((_, i) => i < 6).map((stay) => (
            <ProductCard key={stay.id} data={stay} />
          ))}
        </div>
        <div className="flex !mt-20 justify-center items-center">
          <ButtonSecondary loading>Show me more</ButtonSecondary>
        </div>
      </div>
    );
  };

  return renderSection1();
};

