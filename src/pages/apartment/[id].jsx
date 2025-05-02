import LoadingPage from "@/src/common/LoadingPage";
import SEO from "@/src/common/seo";
import HeaderThree from "@/src/layout/headers/header-3";
import { client } from "@/src/sanity/lib/client";
import { urlFor } from "@/src/sanity/lib/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { marked } from "marked";
import { Modal, Tabs, Tab } from "react-bootstrap"; // استيراد التابات من react-bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import {
  TbBathFilled,
  TbBedFilled,
  TbBrandWhatsappFilled,
  TbMailFilled,
  TbPhoneFilled,
} from "react-icons/tb";
import { useLocale } from "next-intl";
import { formatPrice } from "@/src/utils/utils";
import { PiSquaresFour, PiSquaresFourFill } from "react-icons/pi";
import { FaMoneyBills } from "react-icons/fa6";
import ApartmentSlider from "@/src/common/AptSlider";
import FooterThree from "@/src/layout/footers/footer-3";
import Link from "next/link";
import Suggestedresults from "@/src/common/Suggestedresults";

function ApartmentDetails() {
  const router = useRouter();
  const { id } = router.query;
  const locale = useLocale();

  const [aptDetails, setAptDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [key, setKey] = useState("images");
  const [showContactModal, setShowContactModal] = useState(false);

  const handleContactModalOpen = () => setShowContactModal(true);
  const handleContactModalClose = () => setShowContactModal(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [zoomedImage, setZoomedImage] = useState(null);
  const handleZoomClose = () => setZoomedImage(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // البحث باستخدام slug.current
        const query = `*[_type == "apartmentUnit" && slug.current == $id][0] {
        mainImage,
        gallery,
        price,
        fees,
        location,
        bedrooms,
        bathrooms,
        area,
        site,
        slug,
        saller-> {
          title,
          phone,
          email
        },
        details {
          ar,
          en
        },
        operation,
        propertyType,
        googleMap
      }`;

        const data = await client.fetch(query, { id });

        // التحقق من البيانات المسترجعة
        const aptData = data;

        setAptDetails(aptData);
        if (aptData?.gallery?.length) {
          setSelectedImage(aptData.gallery[0]);
        }
      } catch (error) {
        console.error("Error fetching apt details:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) return <LoadingPage />;

  const gallery = aptDetails?.gallery || [];

  return (
    <>
      <SEO />
      <HeaderThree />
      <div className="d-flex align-items-center justify-content-start mr-20 pt-30 pb-30">
        <Link href={`/${locale}/apartment`} className="fw-bold ml-40">
          {locale === "en" ? "< Back to Search" : "< العودة للبحث"}
        </Link>
        {locale === "en" ? "For Sale:" : "للبيع:"}
        <Link href={`/${locale}/apartment`} className="ml-5 mr-10">
          {locale === "en" ? "Properties" : "العقارات"}
        </Link>
        {">"}
        <Link
          href={`/${locale}/apartment?operation=sale&location=%D9%85%D8%B5%D8%B1`}
          className="mr-5"
        >
          {locale === "en" ? "Apartment in egypt" : "شقق مصر"}
        </Link>
      </div>
      <div className="row apartment-gallery">
        <div className="col-md-8 main-image">
          {selectedImage && (
            <img
              src={urlFor(selectedImage).url()}
              alt="Apartment"
              className="img-fluid rounded shadow"
            />
          )}
        </div>

        <div className="col-md-2 thumbnails d-flex flex-md-column flex-row flex-wrap gap-2 mt-3 mt-md-0">
          {gallery.slice(0, 3).map((img, index) => (
            <img
              key={index}
              src={urlFor(img).width(150).height(100).url()}
              alt={`thumb-${index}`}
              onClick={() => setSelectedImage(img)}
              className={`img-thumbnail thumb ${
                selectedImage === img ? "active" : ""
              }`}
            />
          ))}

          {gallery.length > 3 && (
            <div
              onClick={handleShow}
              className="img-thumbnail thumb d-flex align-items-center justify-content-center"
              style={{
                cursor: "pointer",
                width: 150,
                height: 100,
                background: "#f8f9fa",
              }}
            >
              <span className="fw-bold">+{gallery.length - 3}</span>
            </div>
          )}
        </div>
      </div>
      <div className="d-flex  flex-lg-row flex-column justify-content-between pt-50 pb-50 aptInfo">
        <div className="aptDetails">
          <div className="d-flex justify-content-around pb-20">
            <h2>
              {formatPrice(aptDetails?.price, locale)}{" "}
              {locale === "en" ? "EGP" : "ج.م"}
            </h2>
            <div className="d-flex align-items-center justify-content-center fees">
              <FaMoneyBills />
              <p className="mr-5">
                {locale === "en" ? "Down Payment " : "مقدم "}
                {aptDetails?.fees}%
              </p>
            </div>
          </div>
          <h3>{aptDetails?.location?.[locale]}</h3>
          <div className="d-flex justify-content-between pt-20">
            {aptDetails?.bedrooms && (
              <p className=" text-dark">
                <TbBedFilled className="mr-5 fs-4" />
                {aptDetails?.bedrooms} {locale === "en" ? "Beds" : "غرف"}
              </p>
            )}
            {aptDetails?.bathrooms && (
              <p className="text-dark">
                <TbBathFilled className="mr-5 fs-4" />
                {aptDetails?.bathrooms}{" "}
                {locale === "en" ? "Bathrooms" : "حمامات"}
              </p>
            )}
            <p className="text-dark">
              <PiSquaresFourFill className="mr-5 fs-4" />
              {aptDetails?.area} {locale === "en" ? "square meter" : "متر مربع"}
            </p>
          </div>
          {aptDetails?.details?.[locale] && (
            <article
              className="container pr-50"
              dangerouslySetInnerHTML={{
                __html: marked(aptDetails.details[locale]), // حول markdown إلى HTML
              }}
            />
          )}
        </div>
        <div>
          <div>
            <div className="cardInfo">
              <div className="avatarInfo">
                <img src="/assets/img/avata/avata-1.png" alt="avata" />
                <h2>{aptDetails?.saller?.title?.[locale]}</h2>
              </div>
              <div className="contactInfo">
                <div onClick={handleContactModalOpen}>
                  <TbBrandWhatsappFilled />
                </div>
                <div onClick={handleContactModalOpen}>
                  <TbPhoneFilled />
                </div>
                <div onClick={handleContactModalOpen}>
                  <TbMailFilled />
                </div>
              </div>
            </div>
          </div>
          <Suggestedresults />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <iframe
          title="Google Map"
          width="100%"
          height="400"
          src={`https://www.google.com/maps?q=${aptDetails?.googleMap?.latitude},${aptDetails?.googleMap?.longitude}&hl=es;z=14&output=embed`}
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
      <ApartmentSlider />
      <FooterThree />
      {/* Modal لعرض الصور والخريطة */}
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header>
          <div className="w-100 d-flex justify-content-between align-items-center">
            <Modal.Title>
              {locale === "en" ? "Photo Gallery" : "معرض الصور"}
            </Modal.Title>
            <button
              type="button"
              className="btn-close ms-3"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
        </Modal.Header>

        <Modal.Body>
          <Tabs
            activeKey={key}
            onSelect={(k) => setKey(k)}
            id="modal-tabs"
            className="mb-3"
          >
            <Tab eventKey="images" title={locale === "en" ? "Photos" : "الصور"}>
              <div className="d-flex flex-wrap gap-3 justify-content-center">
                {gallery.map((img, index) => (
                  <img
                    key={index}
                    src={urlFor(img).width(200).height(150).url()}
                    alt={`popup-${index}`}
                    onClick={() => setZoomedImage(img)}
                    className="img-thumbnail"
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </div>
            </Tab>
            <Tab eventKey="map" title={locale === "en" ? "Map" : "الخريطة"}>
              <div className="d-flex justify-content-center">
                <iframe
                  title="Google Map"
                  width="100%"
                  height="400"
                  src={`https://www.google.com/maps?q=${aptDetails?.googleMap?.latitude},${aptDetails?.googleMap?.longitude}&hl=es;z=14&output=embed`}
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
      <Modal show={!!zoomedImage} onHide={handleZoomClose} size="xl" centered>
        <Modal.Body className="p-0">
          <button
            type="button"
            className="btn-close position-absolute top-0 end-0 m-3"
            aria-label="Close"
            onClick={handleZoomClose}
            style={{ zIndex: 10 }}
          ></button>
          {zoomedImage && (
            <img
              src={urlFor(zoomedImage).width(1200).url()}
              alt="Zoomed"
              className="img-fluid w-100"
              style={{ maxHeight: "90vh", objectFit: "contain" }}
            />
          )}
        </Modal.Body>
      </Modal>
      <Modal show={showContactModal} onHide={handleContactModalClose} centered>
        <Modal.Header closeButton>
          <div className="w-100 d-flex justify-content-between align-items-center">
            <Modal.Title>
              {locale === "en" ? "Contact Details" : "تفاصيل التواصل"}
            </Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>{locale === "en" ? "Name:" : "الاسم:"}</strong>{" "}
            {aptDetails?.saller?.title?.[locale]}
          </p>
          <p>
            <strong>{locale === "en" ? "Phone:" : "رقم الهاتف:"}</strong>{" "}
            {aptDetails?.saller?.phone}
          </p>
          <p>
            <strong>{locale === "en" ? "Email:" : "البريد الإلكتروني:"}</strong>{" "}
            {aptDetails?.saller?.email}
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ApartmentDetails;
