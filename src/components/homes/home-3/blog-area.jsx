import blog_data from "@/src/data/blog-data";
import { client } from "@/src/sanity/lib/client";
import { urlFor } from "@/src/sanity/lib/image";
import { blogFetch } from "@/src/sanity/lib/queries";

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const BlogArea = () => {
  const { locale } = useRouter();

  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const query = blogFetch;
      const data = await client.fetch(query);
      setBlogData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      {blogData?.appear && (
        <div className="tp-blog-area pb-80">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-5">
                <div className="tp-blog-section-box text-center mb-50">
                  <h3 className="tp-section-title-3">
                    {blogData?.headerTitle?.[locale]}
                  </h3>
                </div>
              </div>
            </div>
            <div className="row">
              {blogData?.posts.slice(0, 3).map((item, i) => (
                <div key={i} className="col-xl-4 col-lg-4 col-md-6 mb-60">
                  <div className="tp-blog-item">
                    <div className="tp-blog-thumb fix">
                      <Link href={`/${locale}/blog/${item?.slug.current}`}>
                        <img
                          src={
                            item?.img?.asset?._ref
                              ? urlFor(item?.img).url()
                              : ""
                          }
                          alt={item?.title?.[locale]}
                        />
                      </Link>
                    </div>
                    <div className="tp-blog-meta d-flex align-items-center">
                      {locale === "ar" && (
                        <div className="tp-blog-date">
                          <span>{item.date}</span>
                        </div>
                      )}
                      <div className={`tp-blog-category category-color-3`}>
                        <span>{item.category?.[locale]}</span>
                      </div>
                      {locale === "en" && (
                        <div className="tp-blog-date">
                          <span>{item.date}</span>
                        </div>
                      )}
                    </div>
                    <div className="tp-blog-title-box">
                      <Link
                        className="tp-blog-title-sm"
                        href={`/${locale}/blog/${item?.slug.current}`}
                      >
                        {item.title?.[locale]}
                      </Link>
                    </div>
                    <div className="tp-blog-author-info-box d-flex align-items-center">
                      <div className="tp-blog-avata ">
                        <img
                          src={
                            item?.author_img?.asset?._ref
                              ? urlFor(item?.author_img).url()
                              : ""
                          }
                          alt={item.author_name?.[locale]}
                        />
                      </div>
                      <div className="tp-blog-author-info">
                        <h5>{item.author_name?.[locale]}</h5>
                        <span>{item.job_title?.[locale]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogArea;
