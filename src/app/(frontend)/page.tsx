import React from "react";
import SectionHowItWork from "@/app/(frontend)/components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "@/app/(frontend)/components/BackgroundSection/BackgroundSection";
import SectionPromo1 from "@/app/(frontend)/components/SectionPromo1";
import SectionHero2 from "@/app/(frontend)/components/SectionHero/SectionHero2";
import SectionSliderLargeProduct from "@/app/(frontend)/components/SectionSliderLargeProduct";
import SectionSliderProductCard from "@/app/(frontend)/components/SectionSliderProductCard";
import DiscoverMoreSlider from "@/app/(frontend)/components/DiscoverMoreSlider";
import SectionGridMoreExplore from "@/app/(frontend)/components/SectionGridMoreExplore/SectionGridMoreExplore";
import SectionPromo2 from "@/app/(frontend)/components/SectionPromo2";
import SectionSliderCategories from "@/app/(frontend)/components/SectionSliderCategories/SectionSliderCategories";
import SectionPromo3 from "@/app/(frontend)/components/SectionPromo3";
import SectionClientSay from "@/app/(frontend)/components/SectionClientSay/SectionClientSay";
import Heading from "@/app/(frontend)/components/Heading/Heading";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { PRODUCTS, SPORT_PRODUCTS } from "@/data/data";
import SectionGridFeatureItems from "@/app/(frontend)/components/SectionGridFeatureItems";
import SectionMagazine5 from "@/app/(frontend)/pages/blog/SectionMagazine5";
import OurServices from "@/app/(frontend)/components/OurServices/OurServices";


function PageHome() {
  return (
    <div className="nc-PageHome relative overflow-hidden">

      <SectionHero2 />

      <div className="py-10 lg:py-20 border-t border-b border-slate-400 dark:border-slate-700">
        <SectionHowItWork />
      </div>

      <div className="py-10 lg:py-20 border-t border-b dark:border-slate-700">
        <OurServices />
      </div>

      <div className="mt-10 lg:mt-10">
        <DiscoverMoreSlider />
      </div>

      <div className="container relative space-y-10 my-10 lg:space-y-15 lg:my-15">
        <SectionSliderProductCard
          data={[
            PRODUCTS[4],
            SPORT_PRODUCTS[5],
            PRODUCTS[7],
            SPORT_PRODUCTS[1],
            PRODUCTS[6],
          ]}
        />

        <div className="relative py-10 lg:py-10">
          <BackgroundSection />
          <SectionGridMoreExplore />
        </div>

        {/* <SectionPromo2 /> */}

        <SectionSliderLargeProduct cardStyle="style2" />

        <SectionSliderCategories />

        <SectionSliderProductCard
          heading="Best Sellers"
          subHeading="Best selling of the month"
        />
        
        {/* <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <div>
            <Heading rightDescText="From the Ciseco blog">
              The latest news
            </Heading>
            <SectionMagazine5 />
            <div className="flex mt-16 justify-center">
              <ButtonSecondary>Show all blog articles</ButtonSecondary>
            </div>
          </div>
        </div> */}
        {/* <SectionClientSay /> */}
        {/* <SectionPromo3 /> */}
      </div>
    </div>
  );
}

export default PageHome;
