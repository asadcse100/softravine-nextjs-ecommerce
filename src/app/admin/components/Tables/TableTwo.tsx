import { BRAND } from "@/app/admin/types/brand";
import { CUSTOMER } from "@/app/admin/types/customer";
import Image from "next/image";

const brandData: CUSTOMER[] = [
  {
    name: "Google",
    visitors: 3.5,
  },
  {
    name: "Twitter",
    visitors: 2.2,
  },
  {
    name: "Github",
    visitors: 2.1,
  },
  {
    name: "Vimeo",
    visitors: 1.5,
  },
  {
    name: "Facebook",
    visitors: 3.5,
  },
];

const TableOne = () => {
  return (
    <div className="rounded-sm border border-stroke bg-slate-300 px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-slate-300">
        Recent Customer(s)
      </h4>

      <div className="flex flex-col dark:text-slate-400">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Joined
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Action
            </h5>
          </div>
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${key === brandData.length - 1
              ? ""
              : "border-b border-stroke dark:border-strokedark"
              }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-slate-300 sm:block">
                {brand.name}
              </p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-slate-300">{brand.visitors}K</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-slate-300">{brand.sales}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <button className="text-meta-5">Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
