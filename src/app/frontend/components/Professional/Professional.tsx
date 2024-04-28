import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import MR from "@/images/2.png";
import DO from "@/images/DO.png";
import AT from "@/images/AT.png";
import NP from "@/images/NP.png";
import LT from "@/images/LT.png";
import VectorImg from "@/images/VectorHIW.svg";
import Badge from "@/shared/Badge/Badge";
import Image from "next/image";
import Link from "next/link";
import { Route } from "@/routers/types";
import { usePathname } from "next/navigation";
import { CustomLink } from "@/data/types";

export interface SectionProfessionalProps {
  className?: string;
  data?: (typeof DEMO_DATA)[0][];
}

const DEMO_DATA: {
  id: number;
  img: object;
  imgDark: object;
  title: string;
  link: Route;
}[] = [
  {
    id: 1,
    img: MR,
    imgDark: MR,
    title: "Local Outlet",
    link: "/frontend/pages/localoutlet",
  },
  {
    id: 2,
    img: DO,
    imgDark: DO,
    title: "eCommerce Vendor ship",
    link: "/frontend/pages/ecommerce-vendor",
  },
  {
    id: 3,
    img: AT,
    imgDark: AT,
    title: "Drive Pack Agent",
    link: "/frontend/pages/drive-pack-agent",
  },
  {
    id: 4,
    img: NP,
    imgDark: NP,
    title: "Doctor",
    link: "/frontend/pages/doctor",
  },
  {
    id: 5,
    img: LT,
    imgDark: LT,
    title: "Tution Agency",
    link: "/frontend/pages/tution-agency",
  },
];

const SectionProfessional: FC<SectionProfessionalProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  return (
    <div className={`nc-SectionHowItWork ${className}`}>
      <div className="flex flex-col items-center">
        <div className="grid xxs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-10 gap-2 sm:gap-2 xl:gap-2">
          {data.map((item: (typeof DEMO_DATA)[number], index: number) => (
            <Link key={index} href={item.link}>
              <div className="relative max-w-xs mx-auto">
                <NcImage
                  containerClassName="mb-4 sm:mb-2 max-w-[300px] mx-auto"
                  className="rounded-2xl"
                  src={item.img}
                  sizes="350px"
                  alt="HIW"
                />
                <div className="text-center">
                  <h3 className="text-base font-semibold">{item.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionProfessional;
