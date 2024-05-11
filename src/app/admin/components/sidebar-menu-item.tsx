"use client";
import { SideNavItem } from "@/../types/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BsChevronRight } from "react-icons/bs";

export const SideBarMenuItem = ({
  item,
  toggleCollapse,
}: {
  item: SideNavItem;
  toggleCollapse: boolean;
}) => {
  const linkStyle =
    "flex items-center min-h-[40px] h-full text-slate-700 dark:text-slate-400 py-2 px-4 hover:text-slate-400 rounded-md transition duration-200";
  const activeLinkStyle =
    "rounded-md text-slate-700 dark:text-slate-400 dark:border-strokedark dark:bg-boxdark";
  const ddlinkStyle = linkStyle;
  const navMenuDropdownItem =
    "text-slate-300 py-2 px-4 hover:text-slate-400 transition duration-200";
  const pathName = usePathname();
  const [subMenuOpen, setMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setMenuOpen(!subMenuOpen);
  };

  return (
    <>
      {item.submenu ? (
        <div className="rounded-md min-w-[18px]">
          <a
            className={`${ddlinkStyle} ${
              pathName.includes(item.path) ? activeLinkStyle : ""
            }`}
            onClick={toggleSubMenu}
          >
            {item.icon}
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
              <div className="grid gap-y-2 px-10 py-3 leading-5">
                {item.subMenuItems.map((subItem, index) => {
                  return (
                    <Link
                      key={index}
                      href={subItem.path}
                      className={`${navMenuDropdownItem} ${
                        subItem.path === pathName ? "dark:bg-slate-700 bg-slate-600" : "text-slate-500"
                      }`}
                    >
                      <span>{subItem.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link
          href={item.path}
          className={`${linkStyle} ${
            item.path === pathName ? activeLinkStyle : "dark:text-slate-200"
          }`}
        >
          {item.icon}
          {!toggleCollapse && (
            <span className="ml-3 leading-6 font-semibold">{item.title}</span>
          )}
        </Link>
      )}
    </>
  );
};
