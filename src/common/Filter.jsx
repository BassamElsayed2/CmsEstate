import { useLocale } from "next-intl";
import React from "react";

const FilterBar = ({
  searchParams,
  handleChange,
  locationInput,
  setLocationInput,
}) => {
  const locale = useLocale();

  const salePrices = [
    { label: "500,000", value: "500000" },
    { label: "1,000,000", value: "1000000" },
    { label: "1,500,000", value: "1500000" },
    { label: "2,000,000", value: "2000000" },
    { label: "2,500,000", value: "2500000" },
    { label: "3,000,000", value: "3000000" },
    { label: "4,000,000", value: "4000000" },
    { label: "5,000,000", value: "5000000" },
    { label: " +10,000,000", value: "10000000" },
  ];

  const rentPrices = [
    { label: "10,000", value: "10000" },
    { label: "20,000", value: "20000" },
    { label: "30,000", value: "30000" },
    { label: "40,000", value: "40000" },
    { label: "50,000", value: "50000" },
    { label: "70,500", value: "75000" },
    { label: "100,000", value: "100000" },
    { label: "150,000", value: "150000" },
    { label: " +200,000", value: "200000" },
  ];

  const priceOptions =
    searchParams?.operation === "sale" ? salePrices : rentPrices;

  return (
    <div className="row g-3 filter-wrapper">
      {/* نوع العملية */}
      <div className="col-lg-2 col-md-4">
        <label className="form-label">
          {locale === "en" ? "Operation Type" : "العملية"}
        </label>
        <select
          className="form-select"
          value={searchParams?.operation || "sale"}
          onChange={(e) => handleChange("operation", e.target.value)}
        >
          <option value="sale">{locale === "en" ? "Sale" : "بيع"}</option>
          <option value="rent">{locale === "en" ? "Rent" : "ايجار"}</option>
        </select>
      </div>

      {/* المنطقة */}
      <div className="col-lg-2 col-md-4">
        <label className="form-label">
          {locale === "en" ? "Area" : "المنطقة"}
        </label>
        <input
          type="text"
          className="form-control"
          value={locationInput}
          placeholder={locale === "en" ? "Enter area" : "أبحث بالموقع"}
          onChange={(e) => setLocationInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleChange("location", locationInput);
            }
          }}
        />
      </div>

      {/* نوع العقار */}
      <div className="col-lg-2 col-md-4">
        <label className="form-label">
          {locale === "en" ? "Property Type" : "نوع العقار"}{" "}
        </label>
        <select
          className="form-select"
          value={searchParams?.propertyType || ""}
          onChange={(e) => handleChange("propertyType", e.target.value)}
        >
          <option value="">{locale === "en" ? "All" : "الكل"}</option>
          <option value="apartment">
            {locale === "en" ? "Apartment" : "شقة"}
          </option>
          <option value="villa">{locale === "en" ? "Villa" : "فيلا"}</option>
          <option value="duplex">
            {locale === "en" ? "Duplex" : "دوبليكس"}
          </option>
        </select>
      </div>

      {/* السعر */}
      <div className="col-lg-3 col-md-6">
        <label className="form-label">
          {locale === "en" ? "Price" : "السعر"}
        </label>
        <div className="d-flex gap-1">
          <select
            className="form-select"
            value={searchParams?.priceMin || ""}
            onChange={(e) => handleChange("priceMin", e.target.value)}
          >
            <option value="">
              {locale === "en" ? "Lowest price" : "أقل سعر"}
            </option>
            {priceOptions.map((price, idx) => (
              <option key={idx} value={price.value}>
                {price.label}
              </option>
            ))}
          </select>

          <select
            className="form-select"
            value={searchParams?.priceMax || ""}
            onChange={(e) => handleChange("priceMax", e.target.value)}
          >
            <option value="">
              {locale === "en" ? "Highest price" : "أعلي سعر"}{" "}
            </option>
            {priceOptions.map((price, idx) => (
              <option key={idx} value={price.value}>
                {price.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* عدد الغرف والحمامات */}
      <div className="col-lg-3 col-md-6">
        <label className="form-label">
          {locale === "en" ? "Beds & Bathrooms" : "عدد الغرف والحمامات"}
        </label>
        <div className="d-flex gap-1">
          <select
            className="form-select"
            value={searchParams?.bedrooms || ""}
            onChange={(e) => handleChange("bedrooms", e.target.value)}
          >
            <option value="">{locale === "en" ? "Any" : "أي عدد"} </option>
            {[...Array(8)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
            <option value="9">8+</option>
          </select>
          <select
            className="form-select"
            value={searchParams?.bathrooms || ""}
            onChange={(e) => handleChange("bathrooms", e.target.value)}
          >
            <option value=""> {locale === "en" ? "Any" : "أي عدد"} </option>
            {[...Array(6)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
            <option value="7">6+</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
