import { CheckIcon } from "@heroicons/react/24/solid";
import React, { FC } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { showErrorToast, showSuccessToast} from "@/app/admin/components/Toast";
import { useState, useEffect } from 'react';

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
export interface PricingItem {
  isPopular: boolean;
  name: string;
  pricing: string;
  desc: string;
  per: string;
  features: string[];
}

const pricings: PricingItem[] = [
  {
    isPopular: false,
    name: "Starter",
    pricing: "$5",
    per: "/mo",
    features: ["Automated Reporting", "Faster Processing", "Customizations"],
    desc: ` Literally you probably haven't heard of them jean shorts.`,
  },
  {
    isPopular: true,
    name: "Basic",
    pricing: "$15",
    per: "/mo",
    features: [
      "Everything in Starter",
      "100 Builds",
      "Progress Reports",
      "Premium Support",
    ],
    desc: ` Literally you probably haven't heard of them jean shorts.`,
  },
  {
    isPopular: false,
    name: "Plus",
    pricing: "$25",
    per: "/mo",
    features: [
      "Everything in Basic",
      "Unlimited Builds",
      "Advanced Analytics",
      "Company Evaluations",
    ],
    desc: ` Literally you probably haven't heard of them jean shorts.`,
  },
];

const [isLoading, setIsLoading] = useState(false);

// Fetch data if editing an existing ticket
useEffect(() => {
  if (id) {
    const fetchTicket = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
        const response = await fetch(`${apiUrl}/server/api/routes/customer/package/${id}`);
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
      ? `${apiUrl}/server/api/routes/customer/package/${id}`
      : `${apiUrl}/server/api/routes/customer/package`;

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error("Failed to package purchase. Please try again.");
    }

    const result = await response.json();

    showSuccessToast(result.message || "package purchase added successfully!");
    // router.push("/admin/pages/blog_system/package purchase");
    window.location.href = `${apiUrl}/admin/pages/blog_system/package purchase`;
  } catch (error) {
    showErrorToast("Error adding package purchase: " + (error instanceof Error ? error.message : "Unknown error"));
  }
};

const PageSubcription = ({}) => {
  const renderPricingItem = (pricing: PricingItem, index: number) => {
    return (
      <div
        key={index}
        className={`h-full relative px-6 py-8 rounded-3xl border-2 flex flex-col overflow-hidden ${
          pricing.isPopular
            ? "border-primary-500"
            : "border-slate-100 dark:border-slate-700"
        }`}
      >
        {pricing.isPopular && (
          <span className="bg-primary-500 text-white px-3 py-1 tracking-widest text-xs absolute right-3 top-3 rounded-full z-10">
            {id ? "Edit POPULAR" : "Add POPULAR"}
          </span>
        )}
        <div className="mb-8">
          <h3 className="block text-sm uppercase tracking-widest text-slate-6000 dark:text-slate-300 mb-2 font-medium">
            {pricing.name}
          </h3>
          <h2 className="text-5xl leading-none flex items-center text-slate-800 dark:text-slate-200">
            <span>{pricing.pricing}</span>
            <span className="text-lg ml-1 font-normal text-slate-500">
              {pricing.per}
            </span>
          </h2>
        </div>
        <nav className="space-y-4 mb-8">
          {pricing.features.map((item, index) => (
            <li className="flex items-center" key={index}>
              <span className="mr-4 inline-flex flex-shrink-0 text-primary-6000">
                <CheckIcon className="w-5 h-5" aria-hidden="true" />
              </span>
              <span className="text-slate-700 dark:text-slate-300">
                {item}
              </span>
            </li>
          ))}
        </nav>
        <div className="flex flex-col mt-auto">
          {pricing.isPopular ? (
            <ButtonPrimary>Submit</ButtonPrimary>
          ) : (
            <ButtonSecondary>
              <span className="font-medium">Submit</span>
            </ButtonSecondary>
          )}
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
            {pricing.desc}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-PageSubcription container pb-24 lg:pb-32 `}>
      <header className="text-center max-w-2xl mx-auto my-20">
        <h2 className="flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-slate-900 dark:text-slate-100 justify-center">
          <span className="mr-4 text-3xl md:text-4xl leading-none">💎</span>
          Subscription
        </h2>
        <span className="block text-sm mt-2 text-slate-700 sm:text-base dark:text-slate-200">
          Pricing to fit the needs of any companie size.
        </span>
      </header>
      <section className="text-slate-600 text-sm md:text-base overflow-hidden">
        <div className="grid lg:grid-cols-3 gap-5 xl:gap-8">
          {pricings.map(renderPricingItem)}
        </div>
      </section>
    </div>
  );
};

export default PageSubcription;
