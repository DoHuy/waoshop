"use client";
import React, { useEffect } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { useContextElement } from "@/context/Context";
export default function SocialVideoSlider({ socialProductVideos }) {
  const { setQuickViewItem } = useContextElement();

  useEffect(() => {
    // Play video on mouseenter for .hover-video
    const hoverVideos = document.querySelectorAll(".hover-video");
    hoverVideos.forEach((video) => {
      video.addEventListener("mouseenter", () => {
        video.muted = true; // Mute the video
        video.play();
      });
    });

    // Handle mouseenter and mouseleave for .cls-video
    const clsVideos = document.querySelectorAll(".cls-video");
    clsVideos.forEach((container) => {
      const video = container.querySelector("video");
      const poster = container.querySelector(".poster");

      const handleMouseEnter = () => {
        poster.classList.add("hide");
        video.muted = true; // Mute the video
        video.play();
      };

      const handleMouseLeave = () => {
        video.pause();
        poster.classList.remove("hide");
      };

      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);

      // Cleanup event listeners on unmount
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    });

    // Cleanup hover-video event listeners on unmount
    return () => {
      hoverVideos.forEach((video) => {
        video.removeEventListener("mouseenter", () => {
          video.play();
        });
      });
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <section className="flat-spacing-0 pb-0">
      <div className="container">
        <div className="flat-title wow fadeInUp mt-4">
          <h4 className="title"></h4>
        </div>
        <div className="hover-sw-nav">
          <Swiper
            dir="ltr"
            className="swiper tf-swiper"
            {...{
              slidesPerView: 1,
              spaceBetween: 12,
              speed: 800,
              observer: true,
              observeParents: true,
              slidesPerGroup: 1,
              navigation: {
                clickable: true,
                nextEl: ".nav-next-video",
                prevEl: ".nav-prev-video",
              },
              pagination: { el: ".sw-pagination-video", clickable: true },
              breakpoints: {
                577: { slidesPerView: 2, spaceBetween: 10, slidesPerGroup: 2 },
                1200: { slidesPerView: 3, spaceBetween: 20, slidesPerGroup: 4 },
              },
            }}
            modules={[Pagination, Navigation]}
          >
            {socialProductVideos.map((social, index) => (
              <SwiperSlide className="swiper-slide" key={index}>
                <div className="cls-video">
                  <Image
                    src={social.image_url}
                    alt="poster"
                    className="poster lazyload"
                    width={464}
                    height={649}
                  />
                  <video
                    className="hover-video"
                    width={464}
                    height={649}
                    playsInline
                    muted
                    loop
                  >
                    <source src={social.video_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </SwiperSlide>
            ))}
            <div className="d-flex d-xl-none sw-dot-default sw-pagination-video justify-content-center" />
          </Swiper>
        </div>
      </div>
    </section>
  );
}
