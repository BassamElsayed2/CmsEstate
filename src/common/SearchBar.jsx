import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const SearchBar = () => {
  const router = useRouter();
  const locale = useLocale();

  const [operation, setOperation] = useState("sale");
  const [locationInput, setLocationInput] = useState("");
  const [activeFilter, setActiveFilter] = useState(null);
  const [filterType, setFilterType] = useState("room");

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedBath, setSelectedBath] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // لفتح/إغلاق الفلاتر

  const typeMapping = {
    apartment: { en: "Apartment", ar: "شقة" },
    villa: { en: "Villa", ar: "فيلا" },
    duplex: { en: "Duplex", ar: "دوبلكس" }
  };

  const toggleFilter = (filter) => {
    setActiveFilter(activeFilter === filter ? null : filter);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams();

    if (operation) queryParams.append("operation", operation);
    if (minPrice) queryParams.append("priceMin", minPrice);
    if (maxPrice) queryParams.append("priceMax", maxPrice);
    if (selectedType) queryParams.append("propertyType", selectedType);
    if (selectedRoom) queryParams.append("bedrooms", selectedRoom);
    if (selectedBath) queryParams.append("bathrooms", selectedBath);

    router.push(`/apartment?${queryParams.toString()}`);
  };

  const renderRoomsBathText = () => {
    if (selectedRoom && selectedBath) {
      return locale === "en" 
        ? `${selectedRoom} Rooms / ${selectedBath} Baths`
        : `${selectedRoom} غرف / ${selectedBath} حمام`;
    }
    return locale === "en"
      ? selectedRoom
        ? `${selectedRoom} Rooms`
        : selectedBath
          ? `${selectedBath} Baths`
          : "Rooms & Bathrooms"
      : selectedRoom
        ? `${selectedRoom} غرف`
        : selectedBath
          ? `${selectedBath} حمام`
          : "عدد الغرف والحمامات";
  };

  const renderPriceText = () => {
    return minPrice && maxPrice 
      ? `${minPrice} ${locale === "en" ? "EGP" : "ج.م"} - ${maxPrice} ${locale === "en" ? "EGP" : "ج.م"}`
      : locale === "en" ? "Price" : "السعر";
  };

  const renderTypeText = () => {
    const selectedTypeKey = Object.keys(typeMapping).find(key => key === selectedType);
    return selectedTypeKey
      ? typeMapping[selectedTypeKey][locale]
      : locale === "en" ? "Property Type" : "نوع العقار";
  };

  return (
    <div className="search-bar-container p-3 rounded-4 shadow-sm">
      <div className="d-flex flex-wrap align-items-center gap-2">
        <div className="operation-toggle d-flex border overflow-hidden">
          <button
            className={`btn btn-light flex-grow-1 ${operation === "sale" ? "active" : ""}`}
            onClick={() => setOperation("sale")}
          >
            {locale === "en" ? "For Sale" : "للبيع"}
          </button>
          <button
            className={`btn btn-light flex-grow-1 ${operation === "rent" ? "active" : ""}`}
            onClick={() => setOperation("rent")}
          >
            {locale === "en" ? "For Rent" : "للإيجار"}
          </button>
        </div>

        <div className="flex-grow-1">
          <input
            type="text"
            className="form-control"
            placeholder={locale === "en" ? "Search location, city or area" : "ابحث عن موقع، مدينة أو منطقة"}
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
          />
        </div>

        <button className="btn btn-primary px-4" onClick={handleSearch}>
          {locale === "en" ? "Search" : "بحث"}
        </button>
      </div>

      <div className="filters-group d-flex flex-wrap gap-2">
        <div className="position-relative">
          <button
            className="btn d-flex justify-content-between btn-light filter-btn"
            onClick={() => toggleFilter("rooms")}
          >
            {renderRoomsBathText()}
            <span className={`dropBtn ms-2 ${isDropdownOpen && activeFilter === "rooms" ? "rotate-180" : ""}`}>
              &#9660;
            </span>
          </button>

          {activeFilter === "rooms" && (
            <div className="filter-dropdown p-3 rounded-4 shadow bg-white position-absolute">
              <div className="d-flex gap-2 mb-3">
                <button
                  className={`btn btn-outline-primary flex-grow-1 ${filterType === "room" ? "active" : ""}`}
                  onClick={() => setFilterType("room")}
                >
                  {locale === "en" ? "Rooms" : "عدد الغرف"}
                </button>
                <button
                  className={`btn btn-outline-primary flex-grow-1 ${filterType === "bath" ? "active" : ""}`}
                  onClick={() => setFilterType("bath")}
                >
                  {locale === "en" ? "Bathrooms" : "عدد الحمامات"}
                </button>
              </div>

              <div className="d-flex flex-wrap gap-2">
                {(filterType === "room"
                  ? [1, 2, 3, 4, 5, 6, 7, "+8"]
                  : [1, 2, 3, 4, 5, "+6"]
                ).map((item) => (
                  <button
                    key={item}
                    className={`circle-btn ${
                      (filterType === "room" && selectedRoom === item) ||
                      (filterType === "bath" && selectedBath === item)
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      filterType === "room"
                        ? setSelectedRoom(item)
                        : setSelectedBath(item)
                    }
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="d-flex justify-content-center mt-3">
                <button
                  className="btn btn-primary rounded-pill"
                  onClick={() => setActiveFilter(null)}
                >
                  {locale === "en" ? "Done" : "تم"}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="position-relative">
          <button
            className="btn btn-light d-flex justify-content-between filter-btn"
            onClick={() => toggleFilter("price")}
          >
            {renderPriceText()}
            <span className={`dropBtn ms-2 ${isDropdownOpen && activeFilter === "price" ? "rotate-180" : ""}`}>
              &#9660;
            </span>
          </button>

          {activeFilter === "price" && (
            <div className="filter-dropdown p-3 rounded-4 shadow bg-white position-absolute">
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder={locale === "en" ? "Minimum Price" : "السعر الأدنى"}
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder={locale === "en" ? "Maximum Price" : "السعر الأعلى"}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>

              <div className="d-flex justify-content-center mt-3">
                <button
                  className="btn btn-primary rounded-pill"
                  onClick={() => setActiveFilter(null)}
                >
                  {locale === "en" ? "Done" : "تم"}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="position-relative">
          <button
            className="btn btn-light d-flex justify-content-between filter-btn"
            onClick={() => toggleFilter("type")}
          >
            {renderTypeText()}
            <span className={`dropBtn ms-2 ${isDropdownOpen && activeFilter === "type" ? "rotate-180" : ""}`}>
              &#9660;
            </span>
          </button>

          {activeFilter === "type" && (
            <div className="filter-dropdown p-3 rounded-4 shadow bg-white position-absolute">
              <div className="d-flex justify-content-center flex-wrap gap-2">
                {Object.keys(typeMapping).map((type) => (
                  <button
                    key={type}
                    className={`btn btn-outline-primary rounded-pill ${selectedType === type ? "active" : ""}`}
                    onClick={() => setSelectedType(type)}
                  >
                    {typeMapping[type][locale]}
                  </button>
                ))}
              </div>

              <div className="d-flex justify-content-center mt-3">
                <button
                  className="btn btn-primary"
                  onClick={() => setActiveFilter(null)}
                >
                  {locale === "en" ? "Done" : "تم"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
