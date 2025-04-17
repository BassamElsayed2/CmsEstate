import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import BounceLine from "@/src/svg/bounce-line";

import left_shape from "../../../../public/assets/img/hero/hero-left-shape-3-1.png";
import gradient_bg from "../../../../public/assets/img/hero/hero-gradient-3.jpg";

import { useIsomorphicLayoutEffect } from "@/src/hooks/useIsomorphicEffect";
import { useRouter } from "next/router";
import { client } from "@/src/sanity/lib/client";

import { urlFor } from "@/src/sanity/lib/image";
import { heroFetch } from "@/src/sanity/lib/queries";

const HeroArea = () => {
  const { locale } = useRouter();

  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = heroFetch;
        const data = await client.fetch(query);
        setHeroData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (heroData) {
      let tl = gsap.timeline({ defaults: { ease: "SlowMo.easeOut" } });
      tl.to(".hero-text-anim i.child-1", {
        y: "0px",
        duration: 1,
        opacity: 1,
        stagger: 0.3,
        delay: 0.5,
      });
    }
  }, [heroData]);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <>
      <div className="tp-hero-area tp-hero-pt pt-170 pb-70 p-relative">
        <div className="tp-hero-left-shape">
          <Image src={left_shape} alt="them-pure" />
        </div>
        <div className="tp-hero-gradient-bg">
          <Image src={gradient_bg} alt="them-pure" />
        </div>
        <div className="container">
          <div className="row justify-content-center z-index-3">
            <div className="col-xl-11">
              <div className="tp-hero-title-box text-center clamb-2">
                <h2 className="tp-hero-title-3 hero-text-anim pb-5">
                  <i>
                    <i className="child-1 ">
                      {heroData?.headerTitle?.[locale]}
                    </i>
                  </i>
                </h2>
                <p
                  className="tp-char-animation-2 wow tpfadeUp"
                  data-wow-duration=".9s"
                  data-wow-delay=".7s"
                >
                  {heroData?.paragraph?.[locale]}
                </p>
              </div>
              <div
                className="tp-hero-btn-3 text-center wow tpfadeUp"
                data-wow-duration="1s"
                data-wow-delay=".9s"
              >
                {heroData?.buttons?.[0]?.url && (
                  <Link
                    className="tp-btn-blue-lg tp-btn-hover alt-color-black"
                    href={`${locale}${heroData?.buttons[0].url}`}
                  >
                    <span>{heroData.buttons[0].text[locale]}</span>
                    <b></b>
                  </Link>
                )}

                {heroData?.buttons?.[1]?.url && (
                  <Link
                    className="tp-btn-border tp-btn-hover alt-color-black"
                    href={`${locale}${heroData?.buttons[1].url}`}
                  >
                    <span>{heroData.buttons[1].text[locale]}</span>
                    <b></b>
                  </Link>
                )}
              </div>
              <div
                className="tp-hero-browser-wrapper d-flex align-items-center justify-content-center wow tpfadeUp"
                data-wow-duration=".9s"
                data-wow-delay=".9s"
              >
                {/* <Brwoser /> */}
              </div>
              <div className="tp-hero-3-wrapper p-relative">
                <div className="tp-hero-3-border-wrap d-none d-md-block">
                  <span className="redius-shape-1"></span>
                  <span className="redius-shape-2"></span>
                  <span className="redius-shape-3"></span>
                </div>
                <div className="tp-hero-3-main-thumb z-index-5">
                  <Image
                    src={
                      heroData?.image?.asset?._ref
                        ? urlFor(heroData.image).url()
                        : ""
                    }
                    alt="Hero Image"
                    width={1200}
                    height={630}
                    priority
                  />
                </div>
                <div className="tp-hero-3-shape-5 d-none d-lg-block wow frist-img animated">
                  {heroData?.image_animation && (
                    <Image
                      src={
                        heroData?.image_animation?.asset?._ref
                          ? urlFor(heroData?.image_animation).url()
                          : ""
                      }
                      alt="Animation Image"
                      width={200}
                      height={200}
                      quality={70}
                      priority
                    />
                  )}
                </div>
                <div className="tp-hero-3-shape-6 d-none d-lg-block">
                  <span>
                    {" "}
                    <BounceLine />{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroArea;
