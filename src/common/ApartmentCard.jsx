import React from "react";
import Link from "next/link";
import { urlFor } from "@/src/sanity/lib/image";
import { formatPrice } from "@/src/utils/utils";
import { useLocale } from "next-intl";
import { TbBathFilled, TbBedFilled } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import { PiSquaresFourFill } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";

function ApartmentCard({ apt }) {
  const locale = useLocale();
  console.log(apt);
  return (
    <div className={`d-flex  mb-4`}>
      <div className={"apartmentCard"}>
        <Link href={`/apartment/${apt.slug.current}`} className="d-flex">
          <img
            src={apt.mainImage?.asset?._ref ? urlFor(apt.mainImage).url() : ""}
            alt={apt.location?.[locale]}
          />
          <div className={"cardBody"}>
            <h2 className="text-primary">
              {formatPrice(apt?.price, locale)}{" "}
              {locale === "en" ? "EGP" : "ج.م"}
              {apt.operation === "rent" && locale === "en"
                ? " /mo "
                : "  شهريا "}
            </h2>
            <h6>{apt.propertyType}</h6>
            <div className="d-flex justify-content-between pb-20 pt-20">
              <p className=" text-dark">
                <TbBedFilled className="mr-10 fs-4" />
                {apt.bedrooms} {locale === "en" ? "Beds" : "غرف"}
              </p>
              <p className=" text-dark">
                <FaLocationDot className="mr-10 fs-4" />
                {apt.site}
              </p>
              <p className="text-dark">
                <TbBathFilled className="mr-10 fs-4" />
                {apt.bathrooms} {locale === "en" ? "Bathrooms" : "حمامات"}
              </p>
              <p className="text-dark">
                <PiSquaresFourFill className="mr-10 fs-4" />
                {apt?.area}
                {locale === "en" ? "square meter" : "متر مربع"}
              </p>
            </div>
            <h3>
              <SlLocationPin className="ml-10 fs-4" />
              {apt.location?.[locale]}
            </h3>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ApartmentCard;
