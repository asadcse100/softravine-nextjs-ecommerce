"use client";
import { useSideBarToggle } from "@/hooks/use-sidebar-toggle";
import { SideNavItem } from "@/../types/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { useState } from "react";
import { BsChevronRight } from "react-icons/bs";

export const SideBarMenuItem = ({ item }: { item: SideNavItem }) => {
  const { toggleCollapse } = useSideBarToggle();

  const pathname = usePathname();

  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  const inactiveLink = classNames(
    "flex items-center min-h-[40px] h-full text-slate-700 dark:text-slate-400 py-2 px-4 hover:text-slate-400 rounded-md transition duration-200",
    { ["justify-center"]: toggleCollapse }
  );

  const activeLink = classNames(
    "rounded-md text-slate-700 dark:text-slate-400 dark:border-strokedark dark:bg-boxdark"
  );

  const navMenuDropdownItem =
    "text-slate-300 py-2 px-4 hover:text-slate-400 transition duration-200";

  const dropdownMenuHeaderLink = classNames(inactiveLink, {
    ["bg-sidebar-muted rounded-b-none"]: subMenuOpen,
  });
  
  return (
    <>
      {item.submenu ? (
        <div className="rounded-md min-w-[18px]">
          <a
            href="#"
            className={`${dropdownMenuHeaderLink} ${
              pathname.includes(item.path) ? activeLink : ""
            }`}
            onClick={toggleSubMenu}
          >
            <div className="min-w-[20px]">{item.icon}</div>
            {!toggleCollapse && (
              <>
                <span className="ml-3 text-base leading-6 font-semibold">
                  {item.title}
                </span>
                <BsChevronRight
                  className={`${
                    subMenuOpen ? "rotate-90" : ""
                  } ml-auto stroke-2 text-xs`}
                />
              </>
            )}
          </a>
          {subMenuOpen && !toggleCollapse && (
            <div className="bg-slate-200 dark:bg-slate-800 border-l-4">
              <div className="grid gap-y-2 px-10 leading-5 py-3">
                {item.subMenuItems?.map((subItem, idx) => {
                  return (
                    <a
                      key={idx}
                      href={subItem.path}
                      className={`${navMenuDropdownItem} ${
                        subItem.path === pathname
                          ? "dark:bg-slate-700 bg-slate-600"
                          : "text-slate-500"
                      }`}
                    >
                      <span>{subItem.title}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <a
          href={item.path}
          className={`${inactiveLink} ${
            item.path === pathname ? activeLink : "dark:text-slate-200"
          }`}
        >
          <div className="min-w-[20px]">{item.icon}</div>
          {!toggleCollapse && (
            <span className="ml-3 leading-6 font-semibold">{item.title}</span>
          )}
        </a>
      )}
    </>
  );
};