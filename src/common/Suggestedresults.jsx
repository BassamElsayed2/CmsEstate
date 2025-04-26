import { useLocale } from "next-intl";
import Link from "next/link";
import React from "react";

function Suggestedresults({ search }) {
  const locale = useLocale();

  return (
    <div className="Suggestedresults">
      {search && <img src="/assets/img/map.jpg" alt="map" />}

      <div className="Suggestedresults_content">
        <h4>نتائج مقترحة</h4>
        <div className="d-flex">
          <Link href="http://localhost:3000/apartment?operation=rent">
            {locale === "en" ? "Properties for rent" : "عقارات للأيجار"}
          </Link>
          <Link href="http://localhost:3000/apartment?operation=rent&propertyType=apartment&bedrooms=1">
            {locale === "en"
              ? "1 bedroom apartment for rent in Egypt"
              : "عقارات شقة 1 غرفة للايجار نوم في مصر"}
          </Link>
          <Link href="http://localhost:3000/apartment?operation=rent&propertyType=apartment&bedrooms=2">
            {locale === "en"
              ? "2 bedroom apartment for rent in Egypt"
              : "عقارات شقة 2 غرفة للايجار نوم في مصر"}
          </Link>
          <Link href="http://localhost:3000/apartment?operation=rent&propertyType=apartment&bedrooms=3">
            {locale === "en"
              ? "3 bedroom apartment for rent in Egypt"
              : "عقارات شقة 3 غرفة للايجار نوم في مصر"}
          </Link>
          <Link href="http://localhost:3000/apartment?operation=rent&propertyType=apartment&bedrooms=4">
            {locale === "en"
              ? "4 bedroom apartment for rent in Egypt"
              : "عقارات شقة 4 غرفة للايجار نوم في مصر"}
          </Link>
          <Link href="http://localhost:3000/apartment?operation=rent&propertyType=villa">
            {locale === "en"
              ? "Villa properties for rent"
              : "عقارات فيلا للأيجار"}
          </Link>
          <Link href="http://localhost:3000/apartment?operation=rent&propertyType=duplex">
            {locale === "en"
              ? "Duplex properties for rent"
              : "عقارات دوبلايكس للأيجار"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Suggestedresults;
