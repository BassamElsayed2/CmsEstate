import { FaBed, FaBath, FaMapMarkerAlt, FaHome } from "react-icons/fa"; // أو أي أيقونات تفضلها
import {
  TbHeadphonesFilled,
  TbHomeCheck,
  TbPercentage,
  TbSearch,
} from "react-icons/tb";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { featuresFetch } from "../sanity/lib/queries";
import { client } from "../sanity/lib/client";
import { urlFor } from "../sanity/lib/image";

const FeatureSection = () => {
  const features = [
    {
      id: 1,
      icon: <TbHomeCheck />,
      title: "عقارات ",
      description: "غرف نوم واسعة ومريحة",
    },
    {
      id: 2,
      icon: <TbHeadphonesFilled />,
      title: "خدمة عملاء",
      description: "حمام عصري مع كل وسائل الراحة",
    },
    {
      id: 3,
      icon: <TbPercentage />,
      title: "خصومات",
      description: "موقع متميز في قلب المدينة",
    },
    {
      id: 4,
      icon: <TbSearch />,
      title: "جميع المواقع",
      description: "منازل بمواصفات عالية وخدمات فاخرة",
    },
  ];

  const { locale } = useRouter();

  const [featuresData, setFeaturesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = featuresFetch;
        const data = await client.fetch(query);
        setFeaturesData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container my-5">
      <div className="feature-section">
        {featuresData?.features.map((feature) => (
          <div key={feature._id} className="feature-card">
            <div className="feature-card-inner">
              <div className="feature-card-front">
                <div className="feature-card-icon ">
                  {" "}
                  <img
                    src={
                      feature?.image?.asset?._ref
                        ? urlFor(feature.image).url()
                        : ""
                    }
                    alt="icon"
                  />
                </div>
              </div>
              <div className="feature-card-back">
                <h5 className="feature-card-title">
                  {feature.title?.[locale]}
                </h5>
                <p className="feature-card-description">
                  {feature.paragraph?.[locale]}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
