import useSticky from "@/src/hooks/use-sticky";
import Offcanvus from "@/src/common/offcanvus";
import UserIcon from "@/src/svg/user-icon";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import NavMenu from "./nav-menu";

import logo_black from "../../../public/assets/img/logo/logo-black.png";
import logo_white from "../../../public/assets/img/logo/logo-white.png";
import { useRouter } from "next/router";
import { navMenuFetch } from "@/src/sanity/lib/queries";
import { client } from "@/src/sanity/lib/client";
import { urlFor } from "@/src/sanity/lib/image";

const HeaderSix = ({ style_2 = false }) => {
  const { sticky } = useSticky();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [navData, setNavData] = useState(null);

  const router = useRouter();
  const { locale, pathname, query } = router;

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    router.push({ pathname, query }, undefined, { locale: newLocale });
  };

  useEffect(() => {
    const fetchData = async () => {
      const query = navMenuFetch;
      const data = await client.fetch(query);
      setNavData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <header>
        <div
          id="header-sticky"
          className={`header-bottom__area header-sticky-bg-2 header-bottom__transparent header-bottom__bdr z-index-5 ${style_2 ? "inner-header-2" : ""} ${sticky ? "header-sticky" : ""}`}
        >
          <div className="container">
            <div className="row g-0 align-items-center">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-4 col-6">
                <div className="header-bottom__logo">
                  {style_2 ? (
                    <Link href="/">
                      <img
                        src={
                          navData?.blacklogo?.asset?._ref
                            ? urlFor(navData?.blacklogo).url()
                            : ""
                        }
                        alt="Logo"
                      />
                    </Link>
                  ) : (
                    <>
                      <Link className="white-logo" href="/">
                        <img
                          src={
                            navData?.whitelogo?.asset?._ref
                              ? urlFor(navData?.whitelogo).url()
                              : ""
                          }
                          alt="Logo"
                        />
                      </Link>
                      <Link className="black-logo" href="/">
                        <img
                          src={
                            navData?.blacklogo?.asset?._ref
                              ? urlFor(navData?.blacklogo).url()
                              : ""
                          }
                          alt="Logo"
                        />
                      </Link>
                    </>
                  )}
                </div>
              </div>
              <div className="col-xxl-7 col-xl-7 col-lg-7 d-none d-lg-block">
                <div className="header-bottom__main-menu header-bottom__main-menu-4 header-bottom__main-menu-inner">
                  <nav id="mobile-menu">
                    <NavMenu links={navData?.links} />
                  </nav>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-8 col-6">
                <div className="header-bottom__right d-flex align-items-center justify-content-end">
                   <div className="header-bottom__action header-bottom__action-4 d-none d-xl-block">
                     
                   </div>
                   <div className="header-bottom__btn d-flex align-items-center">
                    
                     <a
                       className="header-bottom__bar tp-menu-bar d-lg-none"
                       onClick={() => setSidebarOpen(true)}
                     >
                       <i className="fal fa-bars"></i>
                     </a>
                   </div>
                   <button
                  onClick={toggleLanguage}
                  className="tp-btn-blue-sm d-none d-md-inline-block tp-btn-hover alt-color-black"
                >
                  {locale === "en" ? "العربية" : "English"}
                </button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Offcanvus sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} menuData={navData} />
    </>
  );
};

export default HeaderSix;
