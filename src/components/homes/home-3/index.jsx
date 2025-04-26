import FooterThree from "@/src/layout/footers/footer-3";
import HeaderThree from "@/src/layout/headers/header-3";
import React from "react";
import TestimonialArea from "../home-3/testimonial-area";
import BlogArea from "./blog-area";
import CardArea from "../../../common/card-area";
import CounterArea from "./counter-area";
import HeroArea from "./hero-area";
import IntegrationArea from "./integration-area";
import RatedArea from "./rated-area";
import SalesArea from "../../../common/sales-area";
import ServiceArea from "./service-area";
import GalleryArea from "./rated-area";
import HeroSection from "@/src/common/HeroSection";
import ApartmentSlider from "@/src/common/AptSlider";
import ApartmentRentSlider from "@/src/common/AptRentSlider";
import FeatureSection from "@/src/common/IconsCards";

const HomeThree = () => {
  return (
    <>
      <HeaderThree />
      <HeroSection />
      <ApartmentSlider />
      <ApartmentRentSlider />
      <FeatureSection />

      <FooterThree />
    </>
  );
};

export default HomeThree;
