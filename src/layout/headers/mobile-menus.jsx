import Link from "next/link";
import React, { useState } from "react";
// internal
import menu_data from "./menu-data";
import { useRouter } from "next/router";

const MobileMenus = ({ menuData }) => {
  const [navTitle, setNavTitle] = useState("");

  const router = useRouter();

  const { locale, pathname, query } = router;

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    router.push({ pathname, query }, undefined, { locale: newLocale });
  };

  //openMobileMenu
  const openMobileMenu = (menu) => {
    if (navTitle === menu) {
      setNavTitle("");
    } else {
      setNavTitle(menu);
    }
  };
  return (
    <>
      <nav className="mean-nav">
        <ul>
          {menuData?.map((menu, i) => (
            <React.Fragment key={i}>
              {!menu.has_dropdown && (
                <li>
                  <Link href={menu.url}>{menu.title?.[locale]}</Link>
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
        <button
          onClick={toggleLanguage}
          className="tp-btn-blue-sm tp-btn-hover alt-color-black tb-toggle"
        >
          {locale === "en" ? "العربية" : "English"}
        </button>
      </nav>
    </>
  );
};

export default MobileMenus;
