import CardCategory1 from "@/app/(frontend)/components/CardCategories/CardCategory1";
import React, { FC } from "react";
import WidgetHeading1 from "./WidgetHeading1";

export interface WidgetCategoriesProps {
  className?: string;
}

const WidgetCategories: FC<WidgetCategoriesProps> = ({
  className = "bg-white dark:bg-slate-700",
}) => {
  return (
    <div
      className={`nc-WidgetCategories rounded-3xl overflow-hidden ${className}`}
      data-nc-id="WidgetCategories"
    >
      <WidgetHeading1
        title="✨ Trending topic"
        viewAll={{ label: "View all", href: "/#" }}
      />
      <div className="flow-root">
        <div className="flex flex-col divide-y divide-slate-200 dark:divide-slate-600">
          {[1, 1, 1, 1, 1, 1].map((_, index) => (
            <CardCategory1
              className="p-4 xl:p-5 hover:bg-slate-200 dark:hover:bg-slate-800"
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WidgetCategories;
