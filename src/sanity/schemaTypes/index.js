import aboutSection from "./aboutSection";
import blogSection from "./blogSection";
import cardSection from "./cardSection";
import contactSection from "./contactSection";
import ctaSection from "./ctaSection";
import faqSection from "./faqSection";
import footerSection from "./footerSection";
import gallerySection from "./gallerySection";
import heroSchema from "./heroSchema";
import navMenu from "./navMenu";
import productSection from "./productSection";
import salesSection from "./salesSection";
import seo from "./seo";
import aptSales from "./aptSales";

import featureschema from "./featureschema";
import SallerInfo from "./SallerInfo";

export const schema = {
  types: [
    seo,
    navMenu,
    heroSchema,
    SallerInfo,
    aptSales,
    featureschema,
    contactSection,
    footerSection,
    aboutSection,
  ],
};
