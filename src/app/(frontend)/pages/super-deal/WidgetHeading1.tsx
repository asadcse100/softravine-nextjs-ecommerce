import { CustomLink } from "@/data/types";
import Link from "next/link";
import React, { FC } from "react";

export interface WidgetHeading1Props {
  className?: string;
  title: string;
  viewAll: CustomLink;
}

const WidgetHeading1: FC<WidgetHeading1Props> = ({
  className = "",
  title,
  viewAll,
}) => {
  return (
    <div
      className={`nc-WidgetHeading1 flex items-center justify-between p-4 xl:p-5 border-b border-slate-200 dark:border-slate-700 ${className}`}
    >
      <h2 className="text-lg text-slate-900 dark:text-slate-100 font-semibold flex-grow">
        {title}
      </h2>
      {!!viewAll.href && (
        <Link
          className="flex-shrink-0 block text-primary-700 dark:text-primary-500 font-semibold text-sm"
          href={viewAll.href}
        >
          {viewAll.label}
        </Link>
      )}
    </div>
  );
};

export default WidgetHeading1;
