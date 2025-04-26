export const animationCreate = () => {
  if (typeof window !== "undefined") {
    window.WOW = require("wowjs");
  }
  new WOW.WOW({ live: false }).init();
};

export const formatPrice = (price, locale) => {
  return new Intl.NumberFormat(locale === "en" ? "en-EG" : "ar-EG", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(price);
};
