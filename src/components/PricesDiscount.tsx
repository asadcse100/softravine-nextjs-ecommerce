import React, { FC } from "react";

export interface PricesProps {
  className?: string;
  price?: number;
  contentClass?: string;
}

const PricesDiscount: FC<PricesProps> = ({
  className = "",
  price = 33,
  contentClass = "py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium",
}) => {
  return (
    <div className={`${className}`}>
      <div className={`flex items-center ${contentClass}`}>
        <span className="text-gray-300 text-sm !leading-none">${String(price)}</span>
        <span className="px-2">-20%</span>
      </div>
    </div>
  );
};

export default PricesDiscount;
