
import { SIDENAV_ITEMS } from '@/app/admin/menu_contants';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react'
import { useSideBarToggle } from '@/hooks/use-sidebar-toggle';
import { SideBarMenuItem } from "./sidebar-menu-item";
import { SideBarLogo } from './sidebar-logo';


export const SideBar = () => {
    const [mounted, setMounted] = useState(false);
    const { toggleCollapse } = useSideBarToggle();

    const asideStyle = classNames("fixed sidebar overflow-y-auto border-stroke bg-white px-7.5 dark:border-strokedark dark:bg-boxdark text-slate-500 z-50 h-full shadow-lg shadow-gray-900/20 transition duration-300 ease-in-out w-[16rem] z-[99999]",
        {
            ["w-[20rem]"]: !toggleCollapse,
            ["sm:w-[5.4rem] sm:left-0 left-[-100%]"]: toggleCollapse,
        });

    useEffect(() => setMounted(true), []);

    return (
        <aside className={asideStyle}>
            <div className="sidebar-top relative flex items-center px-3.5 py-5">
                {mounted && <SideBarLogo />}
                <h3 className={classNames("pl-2 font-bold text-2xl min-w-max text-sidebar-foreground",
                    { hidden: toggleCollapse })}>
                    MY- BIS</h3>
            </div>
            <nav className="flex flex-col gap-2 transition duration-300 ease-in-out">
                <div className="flex flex-col gap-2 px-4">
                    {SIDENAV_ITEMS.map((item, idx) => {
                        return <SideBarMenuItem key={idx} item={item} />;
                    })}
                </div>
            </nav>
        </aside>
    )
}