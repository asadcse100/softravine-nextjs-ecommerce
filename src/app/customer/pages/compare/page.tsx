import ProductCard from "@/app/(frontend)/components/ProductCard";
import { PRODUCTS } from "@/data/data";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { showErrorToast, showSuccessToast} from "@/app/admin/components/Toast";

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

const AccountSavelists = () => {

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (values) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
    
    if (!apiUrl) {
      showErrorToast("API URL is not configured.");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await fetch(`${apiUrl}/server/api/routes/admin/blogs/blogCategories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      if (!response.ok) {
        throw new Error("Failed to compare. Please try again.");
      }
  
      const result = await response.json();
  
      showSuccessToast(result.message || "compare added successfully!");
      // router.push("/admin/pages/blog_system/compare");
      window.location.href = `${apiUrl}/admin/pages/blog_system/compare`;
    } catch (error) {
      showErrorToast("Error adding compare: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  const renderSection1 = () => {
    return (
      <div className="space-y-10 sm:space-y-12 bg-gray-300 dark:bg-gray-700 p-5 rounded-xl">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            List of Favorite products
          </h2>
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

export default AccountSavelists;
