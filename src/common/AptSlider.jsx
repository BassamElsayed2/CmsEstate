import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { apartmentSalesFetch } from "../sanity/lib/queries";
import { client } from "../sanity/lib/client";
import { urlFor } from "../sanity/lib/image";
import { formatPrice } from "../utils/utils";
import { TbBathFilled, TbBedFilled } from "react-icons/tb";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";

// أسهم مخصصة
const NextArrow = ({ onClick }) => (
  <div className="custom-arrow next" onClick={onClick}>
    ❯
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="custom-arrow prev" onClick={onClick}>
    ❮
  </div>
);

const ApartmentSlider = () => {
  const { locale } = useRouter();

  const [aptData, setAptData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const query = `
  *[_type == "apartmentUnit" && operation == "sale"]{
    _id,
    _key,
    slug,
    mainImage,
    price,
    fees,
    location,
    bedrooms,
    bathrooms,
    area,
    site,
    operation,
    googleMap
  } | order(_createdAt desc)
`;
      const data = await client.fetch(query);
      setAptData(data);
    };

    fetchData();
  }, []);

  console.log(aptData);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    rtl: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="container my-5 pt-100 pb-50">
      <div className="slider-header text-center mb-4">
        <h2 className="section-title">عقارات للبيع</h2>
        <p className="section-subtitle">افضل العقارات</p>
      </div>
      <Slider {...settings}>
        {aptData?.slice(0, 6).map((apt) => (
          <div key={apt._key} className="px-3">
            <Link
              href={`${locale}/apartment/${apt?.slug?.current}`}
              className="card apartment-card h-100"
            >
              {/* <img src={apt.image} className="card-img-top" alt={apt.title} /> */}
              <img
                src={
                  apt?.mainImage?.asset?._ref ? urlFor(apt.mainImage).url() : ""
                }
                className="card-img-top"
                alt={apt.title}
              />
              <div className="card-body">
                <h5 className="card-title">{apt.location?.[locale]}</h5>
                <p className="card-text text-primary fw-bold">
                  {formatPrice(apt.price, locale)}{" "}
                  {locale === "en" ? "EGP" : "جنيه"}
                </p>
                <div className="d-flex justify-content-between">
                  <p className=" text-dark">
                    <TbBedFilled className="mr-5 fs-4" />
                    {apt.bedrooms} {locale === "en" ? "Beds" : "غرف"}
                  </p>
                  <p className=" text-dark">
                    <FaLocationDot className="mr-5 fs-4" />
                    {apt.site}
                  </p>
                  <p className="text-dark">
                    <TbBathFilled className="mr-5 fs-4" />
                    {apt.bathrooms} {locale === "en" ? "Bathrooms" : "حمامات"}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ApartmentSlider;
