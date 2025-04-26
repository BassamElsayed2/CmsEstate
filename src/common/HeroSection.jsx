import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { client } from "../sanity/lib/client";
import { heroFetch } from "../sanity/lib/queries";
import Image from "next/image";
import { urlFor } from "../sanity/lib/image";

const HeroSection = () => {
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

  return (
    <section className="hero-section">
      {/* <img
        src="/assets/img/vedio/vedio-img.png"
        alt="Hero background"
        className="hero-background"
      /> */}
      <Image
        src={heroData?.image?.asset?._ref ? urlFor(heroData.image).url() : ""}
        alt="Hero Image"
        width={1200}
        height={630}
        priority
        className="hero-background"
      />

      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="hero-text">
          <h1>{heroData?.headerTitle?.[locale]}</h1>
          <p>{heroData?.paragraph?.[locale]}</p>
        </div>
        <input type="text" placeholder="ابحث هنا..." className="hero-search" />
      </div>
    </section>
  );
};

export default HeroSection;
