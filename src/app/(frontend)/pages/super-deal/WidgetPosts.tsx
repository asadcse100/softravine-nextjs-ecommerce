import React, { FC } from "react";
import Card3Small from "./Card3Small";
import WidgetHeading1 from "./WidgetHeading1";

export interface WidgetPostsProps {
  className?: string;
}

const WidgetPosts: FC<WidgetPostsProps> = ({
  className = "bg-white dark:bg-slate-700",
}) => {
  return (
    <div
      className={`nc-WidgetPosts rounded-3xl overflow-hidden ${className}`}
      data-nc-id="WidgetPosts"
    >
      <WidgetHeading1
        title="🎯 Popular Posts"
        viewAll={{ label: "View all", href: "/#" }}
      />
      <div className="flex flex-col divide-y divide-slate-200 dark:divide-slate-600">
        {[1, 1, 1, 1, 1, 1].map((_, index) => (
          <Card3Small
            className="p-4 xl:px-5 xl:py-6 hover:bg-slate-200 dark:hover:bg-slate-800"
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default WidgetPosts;
