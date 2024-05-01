import { BsList } from "react-icons/bs";
import classNames from "classNames";
import { useSideBarToggle } from "@/hooks/use-sidebar-toggle";
import  ThemeSwitcher from "./theme-switcher";

export default function Header() {
  const { toggleCollapse, invokeToggleCollapse } = useSideBarToggle();
  const sideBarToggle = () => {
    invokeToggleCollapse();
  };

  const headerStyle = classNames(
    "fixed dark:border-strokedark dark:bg-boxdark w-full z-0 px-4 shadow-sm shadow-slate-500/40 pl-[20rem]",
    {
      ["sm:pl-[20rem]"]: !toggleCollapse,
      ["sm:pl-[5.6rem]"]: toggleCollapse,
    }
  );

  return (
    <header className={headerStyle}>
      <div className="flex items-center justify-between h-20">
        <button
          onClick={sideBarToggle}
          className="order-2 sm:order-1 bg-[#3a3f48] text-[#6e768e] hover:bg-white ml-3 rounded-md h-[30px] shadow-md shadow-black/10 transition duration-300 ease-in-out flex items-center justify-center"
        >
          <BsList/>
        </button>
        <div className="flex items-center justify-between">
          <ThemeSwitcher/>
        </div>
        <div className="order-1 sm:order-2 h-10 w-10 rounded-full dark:bg-[#3a3f48] flex items-center justify-center text-center">
          <span className="font-semibold text-sm">AR</span>
        </div>
      </div>
    </header>
  );
}
