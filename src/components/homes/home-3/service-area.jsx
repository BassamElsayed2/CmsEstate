import service_data from "@/src/data/service-data";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import service_img_1 from "../../../../public/assets/img/service/sv-icon-3-1.png";
import service_img_2 from "../../../../public/assets/img/service/service-shape-3-1.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { client } from "@/src/sanity/lib/client";

import { urlFor } from "@/src/sanity/lib/image";
// import { serviceFetch } from "@/src/sanity/lib/queries";

const service_content = {
  title: (
    <>
      Accounting Software <br /> That <span>Handles it All.</span>
    </>
  ),
  btn_text: <>See All Features</>,

  bg_img: "/assets/img/service/service-3-bg.png",
  service_title: "CRM Management",
  service_info: (
    <>
      Generate, Manage, and Convert leads <br /> into Customers. Automatically
    </>
  ),
};
const { title, btn_text, bg_img, service_title, service_info } =
  service_content;

const ServiceArea = () => {
  // const [serviceData, setServiceData] = useState(null);

  // const { locale } = useRouter();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const query = serviceFetch;
  //     const data = await client.fetch(query);
  //     setServiceData(data);
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      {/* <div className="tp-service-area pb-90 z-index">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-service-section-wrapper mb-60 d-flex justify-content-between align-items-end">
                <h3
                  className="tp-section-title-3 wow tpfadeLeft"
                  data-wow-duration=".9s"
                  data-wow-delay=".3s"
                >
                  {serviceData?.headerTitle?.[locale]}
                </h3>
                <Link
                  className="tp-btn-blue-lg tp-btn-hover mb-10 alt-color-black wow tpfadeRight"
                  data-wow-duration=".9s"
                  data-wow-delay=".5s"
                  href={
                    serviceData?.button.url
                      ? `/${locale}${serviceData?.button.url}`
                      : " #"
                  }
                >
                  <span> {serviceData?.button.text?.[locale]}</span>
                  <b></b>
                </Link>
              </div>
            </div>
          </div>

          <div className="row">
            <div
              className="col-xl-8 wow tpfadeLeft"
              data-wow-duration=".9s"
              data-wow-delay=".5s"
            >
              <div
                className="tp-service-3-item mb-30 p-relative z-index"
                style={{ backgroundImage: `url(${bg_img})` }}
              >
                <div className="tp-service-3-icon">
                  <img
                    src={
                      serviceData?.mainCard.icon?.asset?._ref
                        ? urlFor(serviceData?.mainCard.icon).url()
                        : ""
                    }
                    alt="theme-pure"
                  />
                </div>
                <div className="tp-service-3-content">
                  <span>{serviceData?.mainCard.title?.[locale]}</span>
                  <h4 className="tp-service-3-title-sm">
                    <Link href={`/${locale}/service`}>
                      {serviceData?.mainCard.description?.[locale]}
                    </Link>
                  </h4>
                </div>
                <div className="tp-service-3-btn">
                  <Link
                    className="tp-btn-white-solid"
                    href={serviceData?.button.url ? `/${locale}/service` : " #"}
                  >
                    {serviceData?.mainCard.button.text?.[locale]}
                  </Link>
                </div>
                <div className="tp-service-3-shape">
                  <Image src={service_img_2} alt="theme-pure" />
                </div>
              </div>
            </div>

            {serviceData?.featureCards.slice(0, 4).map((item, i) => (
              <div
                key={i}
                className="col-xl-4 col-lg-6 col-md-6 wow tpfadeUp"
                data-wow-duration=".9s"
                data-wow-delay=".5s"
              >
                <div className="tp-service-sm-item mb-30 d-flex flex-column justify-content-between">
                  <div className="tp-service-sm-icon">
                    <img
                      src={
                        item.icon?.asset?._ref ? urlFor(item.icon).url() : ""
                      }
                      alt={item.title.en}
                    />
                  </div>

                  <div className="tp-service-sm-content">
                    <span>
                      {locale === "en" ? item.title.en : item.title.ar}
                    </span>
                    <h3 className="tp-service-sm-title">
                      <Link
                        href={
                          serviceData?.button.url
                            ? `/${locale}/service/${item?.slug.current}`
                            : " #"
                        }
                      >
                        {item.header?.[locale]}
                      </Link>
                    </h3>
                    <div className="tp-service-sm-link">
                      <Link
                        href={
                          serviceData?.button.url ? `/${locale}/service` : " #"
                        }
                      >
                        {serviceData?.button?.text?.[locale]}
                        <i className="far fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </>
  );
};

export default ServiceArea;
