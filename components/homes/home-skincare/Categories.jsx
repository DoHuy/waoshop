"use client";
import { categories7 } from "@/data/collections";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
export default function Categories() {
  return (
    <section className="flat-spacing-6">
      <div className="container">
        <div className="flat-title wow fadeInUp">
          <h4 className="title">Categories</h4>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper wow fadeInUp"
          {...{
            slidesPerView: 2,
            spaceBetween: 12,
            speed: 1000,
            observer: true,
            observeParents: true,
            slidesPerGroup: 2,
            navigation: {
              clickable: true,
              nextEl: ".nav-next-women",
              prevEl: ".nav-prev-women",
            },
            pagination: { el: ".sw-pagination-women", clickable: true },
            breakpoints: {
              575: { slidesPerView: 3, spaceBetween: 12, slidesPerGroup: 2 },
              768: { slidesPerView: 4, spaceBetween: 24, slidesPerGroup: 3 },
              1200: { slidesPerView: 6, spaceBetween: 64, slidesPerGroup: 3 },
            },
          }}
          modules={[Pagination, Navigation]}
        >
          {categories7.map((category, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <div className="wg-cls style-circle hover-img">
                <Link
                  href={`/shop`}
                  className="image img-style d-block"
                >
                  <Image
                    src={category.imgSrc}
                    alt={category.altText}
                    className="lazyload"
                    width={534}
                    height={534}
                  />
                </Link>
                <div className="cls-content text-center">
                  <Link
                    href={`/shop`}
                    className="link text-md fw-medium"
                  >
                    {category.categoryName}
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <span className="d-flex d-xl-none sw-dot-default sw-pagination-women justify-content-center" />
        </Swiper>
      </div>
    </section>
  );
}
