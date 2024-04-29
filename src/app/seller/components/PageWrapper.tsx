import { ReactNode } from "react";
import classNames from "classNames";
import { useSideBarToggle } from "@/hooks/use-sidebar-toggle";

export default function PageWrapper({ children }: { children: ReactNode})
{
    const { toggleCollapse } = useSideBarToggle();
    const pageStyle = classNames("bg-slate-50 flex-grow text-black mt-16 pl-[16.5rem]",
    {
        ["sm:pl-[18rem]"]:!toggleCollapse,
        ["sm:pl-[4rem]"]:toggleCollapse
    });
    return(
        <div className={pageStyle}>
            {children}
        </div>
    )
}