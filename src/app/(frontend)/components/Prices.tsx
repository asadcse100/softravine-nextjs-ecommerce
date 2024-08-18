import React, { FC } from "react";

export interface PricesProps {
  className?: string;
  price?: number;
  contentClass?: string;
}

const Prices: FC<PricesProps> = ({
  className = "",
  price = 33,
  contentClass = "py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium",
}) => {
  return (
    <div className={`${className}`}>
      <div className={`flex items-center ${contentClass}`}>
        <span className="text-green-500 text-3xl !leading-none">${String(price)}</span>
      </div>
    </div>
  );
};

export default Prices;
