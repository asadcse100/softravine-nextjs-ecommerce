"use client";

import { Route } from "@/routers/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FC } from "react";
import { z } from "zod";
import NcImage from "@/shared/NcImage/NcImage";
import MR from "@/images/MR.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { showErrorToast, showSuccessToast} from "@/app/admin/components/Toast";

const formSchema = z.object({
  code: z.string().min(10, {
    message: "code must be at least 10 characters.",
  }),
  product_ids: z.string().min(10, {
    message: "product_ids must be at least 10 characters.",
  }),
});
export interface CommonLayoutProps {
  children?: React.ReactNode;
}

const pages: {
  name: string;
  link: Route;
  img: object;
  imgDark: object;
}[] = [
  {
    img: MR,
    imgDark: MR,
    name: "Prothom Alo",
    link: "/frontend",
  },
  {
    img: MR,
    imgDark: MR,
    name: "Bangladesh protidin",
    link: "/frontend",
  },
  {
    img: MR,
    imgDark: MR,
    name: "Noya digonto",
    link: "/frontend",
  },
  {
    img: MR,
    imgDark: MR,
    name: "Noya digonto",
    link: "/frontend",
  },
  {
    img: MR,
    imgDark: MR,
    name: "Noya digonto",
    link: "/frontend",
  },
  {
    img: MR,
    imgDark: MR,
    name: "Noya digonto",
    link: "/frontend", 
  },
];

const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (values) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

  try {
    const response = await fetch(`${apiUrl}/server/api/routes/admin/blogs/blogCategories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error("Failed to add ecommerce. Please try again.");
    }

    const result = await response.json();

    showSuccessToast(result.message || "ecommerce added successfully!");
    // router.push("/admin/pages/blog_system/ecommerce");
    window.location.href = `${apiUrl}/admin/pages/blog_system/ecommerce`;
  } catch (error) {
    showErrorToast("Error adding ecommerce: " + (error instanceof Error ? error.message : "Unknown error"));
  }
};

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="nc-AccountCommonLayout container">
      <div className="mt-5 sm:mt-5">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-2xl">
            <h2 className="text-3xl xl:text-4xl font-semibold">Live TV Channel</h2>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto pt-5 sm:pt-5 pb-10 lg:pb-10">
        <div className="space-y-10 sm:space-y-12 bg-white dark:bg-slate-700 p-5 rounded-xl">
          <div className="overflow-x-auto grid sm:grid-cols-3 md:grid-cols-4 gap-4">
            {pages.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.link}
                  className={`block py-2 md:py-2 border-b-2 flex-shrink-0 text-sm sm:text-base ${
                    pathname === item.link
                      ? "border-primary-500 font-medium text-slate-900 dark:text-slate-200"
                      : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  
                  <div className="max-w-sm p-6 bg-white border border-slate-200 rounded-lg shadow dark:bg-slate-800 dark:border-slate-700">
                    <a href="/frontend">
                    <NcImage
                    containerClassName="mb-4 sm:mb-2 max-w-[80px] mx-auto"
                    className="rounded-full"
                    src={item.img}
                    sizes="150px"
                    alt="HIW"
                  />
                      <h5 className="text-center mb-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                      <h3 className="text-base font-semibold">{item.name}</h3>
                      </h5>
                    </a>
                  </div>

                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonLayout;
