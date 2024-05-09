"use client";
import Breadcrumb from "@/app/seller/components/Breadcrumbs/Breadcrumb";
import ChartOne from "@/app/seller/components/Charts/ChartOne";
import ChartTwo from "@/app/seller/components/Charts/ChartTwo";
import ChartThree from "@/app/seller/components/Charts/ChartThree";
import React from "react";

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
