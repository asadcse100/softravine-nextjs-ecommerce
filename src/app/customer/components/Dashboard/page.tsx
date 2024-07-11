"use client";
import React from "react";
import ChartOne from "../Charts/ChartOne";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";
import MapOne from "../Maps/MapOne";

const ECommerce: React.FC = () => {
  return (
    <>   
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Wallet Balance" total="$3.456K" rate="">
          <button className="dark:text-slate-300">Recharge Wallet</button>
        </CardDataStats>
        <CardDataStats title="Total Expenditure" total="$3.456K" rate="">
          <button className="dark:text-slate-300">View Order History</button>
        </CardDataStats>
        <CardDataStats title="Total Club Points" total="$3.456K" rate="">
          <button className="dark:text-slate-300">Convert Club Points</button>
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <ChartOne />
        <ChartThree /> */}
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default ECommerce;
