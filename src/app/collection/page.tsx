import React, { FC } from "react";
import Pagination from "@/shared/Pagination/Pagination";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import SectionSliderCollections from "@/components/SectionSliderLargeProduct";
import SectionPromo1 from "@/components/SectionPromo1";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/data";
import TabFilters from "@/components/TabFilters";

const PageCollection = ({}) => {
  return (
    <div className={`nc-PageCollection`}>
      <div className="container py-8 lg:pb-10 lg:pt-10 space-y-8 sm:space-y-10 lg:space-y-7">
        <div className="space-y-5 lg:space-y-5">
          {/* HEADING */}
          <div className="max-w-screen-sm">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              Man collection
            </h2>
          </div>

          <hr className="border-slate-500 dark:border-slate-700" />
          <main>
            {/* TABS FILTER */}
            <TabFilters />

            {/* LOOP ITEMS */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
              {PRODUCTS.map((item, index) => (
                <ProductCard data={item} key={index} />
              ))}
            </div>

            {/* PAGINATION */}
            <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
              <Pagination />
              <ButtonPrimary loading>Show me more</ButtonPrimary>
            </div>
          </main>
        </div>

        {/* === SECTION 5 === */}
        <hr className="border-slate-500 dark:border-slate-700" />

        <SectionSliderCollections />
        <hr className="border-slate-500 dark:border-slate-700" />
      </div>
    </div>
  );
};

export default PageCollection;
