import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import MR from "@/images/2.png";
import DO from "@/images/3.png";
import AT from "@/images/4.png";
import NP from "@/images/5.png";
import LT from "@/images/6.png";
import VectorImg from "@/images/VectorHIW.svg";
import Badge from "@/shared/Badge/Badge";
import Image from "next/image";
import Link from "next/link";
import { Route } from "@/routers/types";
import { usePathname } from "next/navigation";
import { CustomLink } from "@/data/types";

export interface SectionProfessionalProps {
  className?: string;
  // data?: (typeof DEMO_DATA)[0][];
}

// const DEMO_DATA: {
//   id: number;
//   img: string;
//   imgDark: object;
//   title: string;
//   link: Route;
// }[] = [
//     {
//       id: 1,
//       img: MR,
//       imgDark: MR,
//       title: "Local Outlet",
//       link: "/seller/pages/localoutlet",
//     },
//     {
//       id: 2,
//       img: DO,
//       imgDark: DO,
//       title: "eCommerce Vendor ship",
//       link: "/seller/pages/ecommerce-vendor",
//     },
//     {
//       id: 3,
//       img: AT,
//       imgDark: AT,
//       title: "Drive Pack Agent",
//       link: "/seller/pages/drive-pack-agent",
//     },
//     {
//       id: 4,
//       img: NP,
//       imgDark: NP,
//       title: "Doctor",
//       link: "/seller/pages/doctor",
//     },
//     {
//       id: 5,
//       img: LT,
//       imgDark: LT,
//       title: "Tuition Agency",
//       link: "/seller/pages/tuition-agency",
//     },
//   ];

const SectionProfessional: FC<SectionProfessionalProps> = ({
  className = "",
}) => {
  return (
    <div className={`nc-SectionHowItWork ${className}`}>
      <div className="flex flex-col items-center gap-1">
        <div className="py-4 grid xxs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 sm:gap-5 md:grid-5 xl:gap-5">
          {/* {data.map((item: (typeof DEMO_DATA)[number], index: number) => (
            <Link key={index} href={item.link}>
              <div className="relative max-w-xs mx-auto">
                <NcImage
                  containerClassName="max-w-[300px] mx-auto"
                  className="rounded-sm"
                  src={item.img}
                  sizes="350px"
                  alt="HIW"
                />
              </div>
            </Link>
          ))} */}

          <Link key={1} href={'/seller/pages/localoutlet'}>
            <NcImage
              containerClassName="max-w-[300px] mx-auto"
              className="rounded-sm"
              src={MR}
              sizes="350px"
              alt="HIW"
            />
          </Link>

          <Link key={2} href={'/seller/pages/ecommerce-vendor'}>
            <NcImage
              containerClassName="max-w-[300px] mx-auto"
              className="rounded-sm"
              src={DO}
              sizes="350px"
              alt="HIW"
            />
          </Link>
          <Link key={3} href={'/seller/pages/drive-pack-agent'}>
          <NcImage
            containerClassName="max-w-[300px] mx-auto"
            className="rounded-sm"
            src={AT}
            sizes="350px"
            alt="HIW"
          />
          </Link>
          <Link key={4} href={'/seller/pages/doctor'}>
          <NcImage
            containerClassName="max-w-[300px] mx-auto"
            className="rounded-sm"
            src={NP}
            sizes="350px"
            alt="HIW"
          />
          </Link>
          <Link key={5} href={'/seller/pages/tuition-agency'}>
          <NcImage
            containerClassName="max-w-[300px] mx-auto"
            className="rounded-sm"
            src={LT}
            sizes="350px"
            alt="HIW"
          />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SectionProfessional;
