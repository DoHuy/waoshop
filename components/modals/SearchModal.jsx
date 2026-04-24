"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard1 from "../productCards/ProductCard1";
import { productService } from "@/lib/services";

export default function SearchModal() {

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    productService.getFeatured().then((res) => {
      if (!cancelled && Array.isArray(res.data)) setFeaturedProducts(res.data);
    }).catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);
  
  return (
    <div className="modal popup-search fade" id="search">
      <div className="modal-dialog modal-fullscreen">
        <div className="modal-content">
          <div className="header">
            <button
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="looking-for-wrap">
                  <div className="heading">What are you looking for?</div>
                  <form
                    className="form-search"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const q = (searchText || "").trim() || "abx";
                      router.push(`/shop?text=${encodeURIComponent(q)}`);
                    }}
                  >
                    <fieldset className="text">
                      <input
                        type="text"
                        placeholder="Search"
                        className=""
                        name="text"
                        tabIndex={0}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        aria-required="true"
                        required
                      />
                    </fieldset>
                    <button className="btn-search" type="submit">
                      <i className="icon icon-search" />
                    </button>
                  </form>
                  <div className="popular-searches justify-content-md-center">
                    <div className="text fw-medium">Popular searches:</div>
                    <ul>
                      <li>
                        <a className="link" href="/shop?is_featured=true">
                          Featured
                        </a>
                      </li>
                      <li>
                        <a className="link" href="/shop?is_trending=true">
                          Trendy
                        </a>
                      </li>
                      <li>
                        <a className="link" href="/shop?is_new=true">
                          New
                        </a>
                      </li>
                      <li>
                        <a className="link" href="/shop?is_on_sale=true">
                          Sale
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-10">
                <div className="featured-product">
                  <div className="text-xl-2 fw-medium featured-product-heading">
                    Featured product
                  </div>
                  <Swiper
                    dir="ltr"
                    className="swiper tf-swiper wrap-sw-over"
                    {...{
                      slidesPerView: 2,
                      spaceBetween: 12,
                      speed: 1000,
                      observer: true,
                      observeParents: true,
                      slidesPerGroup: 2,
                      pagination: {
                        el: ".sw-pagination-search",
                        clickable: true,
                      },
                      breakpoints: {
                        768: {
                          slidesPerView: 3,
                          spaceBetween: 12,
                          slidesPerGroup: 3,
                        },
                        1200: {
                          slidesPerView: 4,
                          spaceBetween: 24,
                          slidesPerGroup: 4,
                        },
                      },
                    }}
                    modules={[Pagination]}
                  >
                    {(featuredProducts.length ? featuredProducts : []).map((product, i) => (
                      <SwiperSlide key={i} className="swiper-slide">
                        <ProductCard1 product={product} />
                      </SwiperSlide>
                    ))}
                    <div className="d-flex d-xl-none sw-dot-default sw-pagination-search justify-content-center" />
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}
