import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import MR from "@/images/MR.png";
import DO from "@/images/DO.png";
import AT from "@/images/AT.png";
import NP from "@/images/NP.png";
import LT from "@/images/LT.png";
import BB from "@/images/BB.png";
import MSP from "@/images/MSP.png";
import OS from "@/images/OS.png";
import OD from "@/images/OD.png";
import MORE from "@/images/MORE.png";
import VectorImg from "@/images/VectorHIW.svg";
import Badge from "@/shared/Badge/Badge";
import Image from "next/image";
import Link from "next/link";
import { Route } from "@/routers/types";
import { usePathname } from "next/navigation";
import { CustomLink } from "@/data/types";

export interface SectionOurServiceProps {
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
    title: "Mobile Recharge ",
    link : "/frontend/pages/mobile-recharge",
  },
  {
    id: 2,
    img: DO,
    imgDark: DO,
    title: "Drive Offer",
    link : "/frontend/pages/drive-offer/operator",
  },
  {
    id: 3,
    img: AT,
    imgDark: AT,
    title: "Air Ticket",
    link : "/frontend/pages/air-ticket/flight/one-way",
  },
  {
    id: 4,
    img: NP,
    imgDark: NP,
    title: "News Paper",
    link : "/frontend/pages/news-paper",
  },
  {
    id: 5,
    img: LT,
    imgDark: LT,
    title: "Live TV",
    link : "/frontend/pages/live-tv",
  },
  {
    id: 6,
    img: BB,
    imgDark: BB,
    title: "Blood Bank",
    link : "/frontend/pages/blood-bank",
  },
  {
    id: 7,
    img: MSP,
    imgDark: MSP,
    title: "MS Products",
    link : "/frontend/pages/ms-products",
  },
  {
    id: 8,
    img: OS,
    imgDark: OS,
    title: "Online Shop",
    link : "/frontend/pages/online-shop",
  },
  {
    id: 9,
    img: OD,
    imgDark: OD,
    title: "Online Doctor",
    link : "/frontend/pages/online-doctor",
  },
  {
    id: 10,
    img: MORE,
    imgDark: MORE,
    title: "More",
    link : "/frontend/pages/more",
  },
];

const SectionOurService: FC<SectionOurServiceProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  return (
    <div className={`nc-SectionHowItWork ${className}`}>
      <div className="relative grid xxs:grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2 sm:gap-2 xl:gap-2">
        {data.map((item: (typeof DEMO_DATA)[number], index: number) => (
            <Link key={index} href={item.link}>
              <div className="relative flex flex-col items-center max-w-xs mx-auto">
                <NcImage
                  containerClassName="mb-4 sm:mb-2 max-w-[100px] mx-auto"
                  className="rounded-full"
                  src={item.img}
                  sizes="150px"
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
  );
};

export default SectionOurService;
