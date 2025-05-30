import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

// slider img import here
import slider_img_1_1 from "../../../../public/assets/img/integration/integration-1.png";
import slider_img_1_2 from "../../../../public/assets/img/integration/integration-2.png";
import slider_img_1_3 from "../../../../public/assets/img/integration/integration-3.png";
import slider_img_1_4 from "../../../../public/assets/img/integration/integration-4.png";
import slider_img_2_1 from "../../../../public/assets/img/integration/integration-5.png";
import slider_img_2_2 from "../../../../public/assets/img/integration/integration-6.png";
import slider_img_2_3 from "../../../../public/assets/img/integration/integration-7.png";
import slider_img_2_4 from "../../../../public/assets/img/integration/integration-8.png";
import { useRouter } from "next/router";
import { productFetch } from "@/src/sanity/lib/queries";
import { client } from "@/src/sanity/lib/client";
import { urlFor } from "@/src/sanity/lib/image";

const integration_content = {
  sub_title: "Integration",
  title: (
    <>
      Integrated with Your <span>Favourite Apps</span>
    </>
  ),
  int_title: <>Integrated with Your Favourite Apps</>,
  btn_text: "See all Integrations",
  bg_img: "/assets/img/integration/integration-bg.jpg",
};
const { sub_title, title, int_title, btn_text, bg_img } = integration_content;

const slider_one_data = [
  slider_img_1_1,
  slider_img_1_2,
  slider_img_1_3,
  slider_img_1_4,
];
const slider_two_data = [
  slider_img_2_1,
  slider_img_2_2,
  slider_img_2_3,
  slider_img_2_4,
];

// slider one setting
const setting_one = {
  speed: 12000,
  autoplay: true,
  autoplaySpeed: 0,

  cssEase: "linear",
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true,
  infinite: true,
  initialSlide: 1,
  arrows: false,
  buttons: false,
  responsive: [
    {
      breakpoint: 1200,
      settings: {},
    },
    {
      breakpoint: 992,
      settings: {},
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

// slider two setting
const setting_two = {
  speed: 12000,
  autoplay: true,
  autoplaySpeed: 0,

  cssEase: "linear",
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true,
  infinite: true,
  initialSlide: 1,
  arrows: false,
  buttons: false,
  rtl: true,
  responsive: [
    {
      breakpoint: 1200,
      settings: {},
    },
    {
      breakpoint: 992,
      settings: {},
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const IntegrationArea = ({ style_integraton }) => {
  const { locale } = useRouter();

  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const query = productFetch;
      const data = await client.fetch(query);
      setProductData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      {productData?.appear && (
        <div className="tp-integration-area pb-110 tp-integration-mlr">
          <div className="container">
            <div className="row align-items-end tp-integration-section-space">
              <div
                className="col-xl-6 col-lg-8 wow tpfadeLeft"
                data-wow-duration=".9s"
                data-wow-delay=".5s"
              >
                <div className="tp-integration-section-box">
                  {style_integraton ? (
                    <>
                      <h5 className="tp-integration-subtitle">
                        {productData?.subTitle?.[locale]}
                      </h5>
                      <h3 className="tp-section-title-3">
                        {productData?.headerTitle?.[locale]}
                      </h3>
                    </>
                  ) : (
                    <>
                      <h5 className="tp-integration-subtitle">
                        {productData?.subTitle?.[locale]}
                      </h5>
                      <h3 className="tp-section-title-3">
                        {productData?.headerTitle?.[locale]}
                      </h3>
                    </>
                  )}
                </div>
              </div>
              <div
                className="col-xl-6 col-lg-4 wow tpfadeRight"
                data-wow-duration=".9s"
                data-wow-delay=".7s"
              >
                <div className="tp-integration-btn text-lg-end text-start">
                  <Link
                    className="tp-btn-blue-lg tp-btn-hover alt-color-black"
                    href={`/${locale}${productData?.button?.url}`}
                  >
                    <span> {productData?.button?.text?.[locale]}</span>
                    <b></b>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            className="tp-integration-slider-wrapper pt-50 pb-50"
            style={{ backgroundImage: `url(${bg_img})` }}
          >
            <Slider {...setting_one} className="tp-integration-slider-active">
              {productData?.slideOne.slice(0, 5).map((item, i) => (
                <Link
                  key={i}
                  href={`/${locale}/products/${item.slug.current}`}
                  className="tp-integration-slider-main slick-slide"
                >
                  <div className="tp-integration-slider-item">
                    <div className="integration-card">
                      <div className="integration-icon">
                        <img
                          src={
                            item.smallImage?.asset?._ref
                              ? urlFor(item.smallImage).url()
                              : ""
                          }
                          alt={item.text?.[locale]}
                        />
                      </div>
                      <div className="integration-content">
                        <h4>{item.text?.[locale]}</h4>
                        <p>{item.smallDescription?.[locale]}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </Slider>
            <Slider
              {...setting_two}
              className="tp-integration-slider-active-2 carousel-rtl"
              dir="rtl"
            >
              {productData?.slideTwo.slice(0, 5).map((item, i) => (
                <Link
                  key={i}
                  href={`/${locale}/products/${item.slug.current}`}
                  className="tp-integration-slider-main slick-slide"
                >
                  <div className="tp-integration-slider-item">
                    <div className="integration-card">
                      <div className="integration-icon">
                        {item?.smallImage.asset?._ref && (
                          <img
                            src={urlFor(item.smallImage).url()}
                            alt={item.text?.[locale]}
                          />
                        )}
                      </div>
                      <div className="integration-content">
                        <h4>{item.text?.[locale]}</h4>
                        <p>{item.smallDescription?.[locale]}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </>
  );
};

export default IntegrationArea;
