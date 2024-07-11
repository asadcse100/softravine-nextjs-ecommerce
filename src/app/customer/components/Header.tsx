import { BsList } from "react-icons/bs";
import classNames from "classnames";
import { useSideBarToggle } from "@/hooks/use-sidebar-toggle";
import  ThemeSwitcher from "./theme-switcher";
import Link from "next/link";
import DropdownMessage from "@/app/seller/components/Header/DropdownMessage";
import DropdownNotification from "@/app/seller/components/Header/DropdownNotification";
import DropdownUser from "@/app/seller/components/Header//DropdownUser";
import Image from "next/image";

export default function Header() {
  const { toggleCollapse, invokeToggleCollapse } = useSideBarToggle();
  const sideBarToggle = () => {
    invokeToggleCollapse();
  };

  const headerStyle = classNames(
    "fixed dark:border-strokedark dark:bg-boxdark w-full z-0 px-4 shadow-sm shadow-slate-500/40 pl-[20rem]",
    {
      ["sm:pl-[20rem]"]: !toggleCollapse,
      ["sm:pl-[5.4rem]"]: toggleCollapse,
    }
  );

  return (
    <header className={headerStyle}>
      <div className="flex items-center justify-between h-20">
        <button
          onClick={sideBarToggle}
          className="order-2 sm:order-1 bg-slate-200 dark:bg-slate-700 text-[#6e768e] hover:bg-white ml-3 rounded-md h-[30px] w-[30px] shadow-md shadow-black/10 transition duration-300 ease-in-out flex items-center justify-center"
        >
          <BsList/>
        </button>

        <div className="gap-3 2xsm:gap-7 order-2 sm:order-1  text-[#6e768e] ml-3 rounded-md h-[30px]  transition duration-300 ease-in-out flex items-center justify-center">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            <ThemeSwitcher/>
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            <DropdownNotification />
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}
            <DropdownMessage />
            {/* <!-- Chat Notification Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>

      </div>
    </header>
  );
}
