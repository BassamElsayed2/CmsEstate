import { useLocale } from "next-intl";
import React, { useState } from "react";

const FilterBar = ({
  searchParams,
  handleChange,
  locationInput,
  setLocationInput,
}) => {
  const locale = useLocale();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const salePrices = [
    { label: "500,000", value: "500000" },
    { label: "1,000,000", value: "1000000" },
    { label: "1,500,000", value: "1500000" },
    { label: "2,000,000", value: "2000000" },
    { label: "2,500,000", value: "2500000" },
    { label: "3,000,000", value: "3000000" },
    { label: "4,000,000", value: "4000000" },
    { label: "5,000,000", value: "5000000" },
    { label: "+10,000,000", value: "10000000" },
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
    { label: "+200,000", value: "200000" },
  ];

  const priceOptions =
    searchParams?.operation === "sale" ? salePrices : rentPrices;

  return (
    <div className="mb-3">
      {/* زرار يظهر فقط على الشاشات الصغيرة */}
      <div className="d-flex justify-content-around pt-20">
        <h3 className="d-flex d-md-none">
          {locale === "en" ? "Advancde Search" : "بحث متقدم"}
        </h3>
        {/* <button
          className="setting-btn d-flex d-md-none"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          aria-expanded={showMobileFilters}
          aria-controls="filtersCollapse"
        >
          <span class="bar bar1"></span>
          <span class="bar bar2"></span>
          <span class="bar bar1"></span>
        </button> */}
        <button
          title="filter"
          className="filter d-flex d-md-none"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <svg viewBox="0 0 512 512" height="1em">
            <path d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z"></path>
          </svg>
        </button>
      </div>

      <div
        id="filtersCollapse"
        className={`collapse d-md-block ${showMobileFilters ? "show" : ""}`}
      >
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
              {locale === "en" ? "Property Type" : "نوع العقار"}
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
              <option value="villa">
                {locale === "en" ? "Villa" : "فيلا"}
              </option>
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
                  {locale === "en" ? "Highest price" : "أعلى سعر"}
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
                <option value="">{locale === "en" ? "Any" : "أي عدد"}</option>
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
                <option value="">{locale === "en" ? "Any" : "أي عدد"}</option>
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
      </div>
    </div>
  );
};

export default FilterBar;
