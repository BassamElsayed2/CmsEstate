import SEO from "@/src/common/seo";
import FooterThree from "@/src/layout/footers/footer-3";
import React, { useState, useEffect } from "react";
import HeaderThree from "@/src/layout/headers/header-3";

import { client } from "@/src/sanity/lib/client";

import { useRouter, useSearchParams } from "next/navigation";

import ApartmentCard from "@/src/common/ApartmentCard";
import FilterBar from "@/src/common/Filter";
import Suggestedresults from "@/src/common/Suggestedresults";

function Apartment() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [aptData, setAptData] = useState([]);

  const initialFilters = {
    operation: searchParams.get("operation") || "sale",
    location: searchParams.get("location") || "",
    priceMin: searchParams.get("priceMin") || "",
    priceMax: searchParams.get("priceMax") || "",
    propertyType: searchParams.get("propertyType") || "",
    bedrooms: searchParams.get("bedrooms") || "",
    bathrooms: searchParams.get("bathrooms") || "",
  };

  const [filters, setFilters] = useState(initialFilters);
  const [locationInput, setLocationInput] = useState(filters.location);

  useEffect(() => {
    const fetchData = async () => {
      const query = `*[_type == "apartmentUnit"
        && operation == $operation
        && (location.ar match $locationWithWildcard || location.en match $locationWithWildcard)
        && ($priceMin == "" || price >= $priceMin)
        && ($priceMax == "" || price <= $priceMax)
        && ($bedrooms == "" || bedrooms >= $bedrooms)
        && ($bathrooms == "" || bathrooms >= $bathrooms)
        && ($propertyType == "" || propertyType == $propertyType)
      ]{
        _id,
        _key,
        location,
        price,
        mainImage,
        bedrooms,
        bathrooms,
        area,
        propertyType,
        site,
        operation,
        slug
      }`;

      const params = {
        operation: filters.operation,
        locationWithWildcard: filters.location ? `*${filters.location}*` : "*",
        priceMin: filters.priceMin !== "" ? Number(filters.priceMin) : "",
        priceMax: filters.priceMax !== "" ? Number(filters.priceMax) : "",
        bedrooms: filters.bedrooms !== "" ? Number(filters.bedrooms) : "",
        bathrooms: filters.bathrooms !== "" ? Number(filters.bathrooms) : "",
        propertyType: filters.propertyType || "",
      };

      const data = await client.fetch(query, params);
      setAptData(data);
    };

    fetchData();
  }, [filters]);

  const handleFilterChange = (name, value) => {
    const newFilters = {
      ...filters,
      [name]: value,
    };
    setFilters(newFilters);

    const params = new URLSearchParams(
      Object.fromEntries(
        Object.entries(newFilters).filter(([_, val]) => val !== "")
      )
    );

    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <SEO />
      <HeaderThree />
      <div>
        <FilterBar
          searchParams={filters}
          handleChange={handleFilterChange}
          locationInput={locationInput}
          setLocationInput={setLocationInput}
        />
        <div className="d-flex justify-content-between">
          <div className="apartment-list">
            {aptData.length > 0 ? (
              aptData.map((apt) => <ApartmentCard key={apt._id} apt={apt} />)
            ) : (
              <p>لا توجد عقارات تتوافق مع الفلاتر الحالية.</p>
            )}
          </div>
          <div className="d-none d-xl-block">
            <Suggestedresults search="search" />
          </div>
        </div>
      </div>
      <FooterThree />
    </>
  );
}

export default Apartment;
