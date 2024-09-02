"use client";
import Link from "next/link";
interface BreadcrumbProps {
  pageName: string;
}
import { usePathname } from 'next/navigation';

const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const lastValue = segments[segments.length - 2];
  
  return (
    <>
      <nav>
        <ol className="flex items-center gap-1">
          <li>
            <Link className="font-medium dark:text-slate-300" href="/admin">
             Dashboard /
            </Link>
          </li>
          <li className="font-medium dark:text-slate-400">{lastValue}</li>
        </ol>
      </nav>
      <h2 className="text-title-sm font-semibold text-black dark:text-slate-400 sm:justify-center">
        {pageName}
      </h2>
    </>
  );
};

export default Breadcrumb;
