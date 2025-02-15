import Button, { ButtonProps } from "@/shared/Button/Button";
import React from "react";

export interface ButtonSecondaryProps extends ButtonProps {}

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
  className = " border border-slate-300 dark:border-slate-700 ",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonSecondary bg-red-200 hover:bg-red-400 dark:bg-red-500 dark:text-slate-300  dark:hover:bg-red-800 ${className}`}
      {...args}
    />
  );
};

export default ButtonSecondary;
