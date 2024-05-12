"use client";
import Breadcrumb from "@/app/seller/components/Breadcrumbs/Breadcrumb";
import dynamic from "next/dynamic";
import React from "react";

const ChartOne = dynamic(() => import("@/app/seller/components/Charts/ChartOne"), {
  ssr: false // Do not render during server-side rendering
});

const ChartTwo = dynamic(() => import("@/app/seller/components/Charts/ChartTwo"), {
  ssr: false // Do not render during server-side rendering
});

const ChartThree = dynamic(() => import("@/app/seller/components/Charts/ChartThree"), {
  ssr: false // Do not render during server-side rendering
});

const Chart: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div>
    </>
  );
};

export default Chart;
