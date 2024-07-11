import { ReactNode } from "react";
import classNames from "classnames";
import { useSideBarToggle } from "@/hooks/use-sidebar-toggle";

export default function PageWrapper({ children }: { children: ReactNode})
{
    const { toggleCollapse } = useSideBarToggle();
    const pageStyle = classNames("bg-slate-100 dark:bg-slate-900 flex-grow text-black mt-16 pl-[16rem]",
    {
        ["sm:pl-[20rem]"]:!toggleCollapse,
        ["sm:pl-[5.4rem]"]:toggleCollapse
    });
    return(
        <div className={pageStyle}>
            {children}
        </div>
    )
}