"use client";

import { useEffect, useRef, useState } from "react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import Image from "next/image";
import Drift from "drift-zoom";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "photoswipe/style.css";

export default function Slider7({
  slideItems = [],
}) {

  const items = [...slideItems];
  const [thumbSwiper, setThumbSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);

  useEffect(() => {
    if (window.innerWidth >= 1200) {
      const pane = document.querySelector(".tf-zoom-main");
      document.querySelectorAll(".tf-image-zoom").forEach((el) => {
         if (pane) {
             new Drift(el, {
              zoomFactor: 2, paneContainer: pane, inlinePane: false,
              handleTouch: false, hoverBoundingBox: true, containInline: true,
            });
         }
      });
    }
    
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery-swiper-started",
      children: ".item",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();
    return () => lightbox.destroy();
  }, []);

  useEffect(() => {
    if (mainSwiper) {
        const timer = setTimeout(() => {
            mainSwiper.update();
        }, 300);
        return () => clearTimeout(timer);
    }
  }, [mainSwiper]);

  return (
    <div className="gallery-container">
      <style jsx global>{`
        .gallery-container {
          width: 105%;
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: relative;
        }

        @media (max-width: 991px) {
            .gallery-container {
                width: 100%;
                margin-left: 0;
            }
        }

        .tf-product-media-main img, 
        .tf-product-media-main video {
            border-radius: 8px;
            width: 100%;
            height: auto;
            display: block;
        }

        /* --- FIX: Quan trọng cho iOS --- */
        .tf-product-media-main .swiper-slide {
            height: auto !important; /* Đảm bảo slide co giãn theo ảnh */
            display: flex;           /* Loại bỏ khoảng trắng do inline-block */
            align-items: flex-start;
        }
        
        /* Đảm bảo wrapper của swiper không bị cứng chiều cao */
        .tf-product-media-main .swiper-wrapper {
            align-items: flex-start;
            transition-property: transform, height !important; /* Smooth height change */
        }

        /* 3. Thumbnail Swiper */
        .swiper.tf-product-media-thumbs {
          width: 100% !important;
          padding: 2px 0;
        }

        .tf-product-media-thumbs .swiper-slide {
          height: auto !important;
          opacity: 0.5;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .tf-product-media-thumbs .swiper-slide-thumb-active {
          opacity: 1;
          transform: translateY(-2px);
        }
        
        .tf-product-media-thumbs .swiper-slide-thumb-active img {
           border: 1px solid #000;
        }

        .tf-product-media-thumbs img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 6px;
        }

        .nav-swiper {
          background: rgba(255, 255, 255, 0.9);
          width: 36px; height: 36px;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15); 
          opacity: 0; 
          transition: all 0.3s ease;
          color: #333;
        }
        .flat-wrap-media-product:hover .nav-swiper { opacity: 1; }
        .swiper-button-next.snbn1 { right: 10px; }
        .swiper-button-prev.snbp1 { left: 10px; }
        
        .zoom-badge {
            position: absolute; bottom: 10px; right: 10px;
            background: rgba(0,0,0,0.6); color: white;
            padding: 4px 10px;
            border-radius: 4px; font-size: 11px; text-transform: uppercase;
            letter-spacing: 0.5px; pointer-events: none;
            z-index: 5;
            backdrop-filter: blur(2px);
        }

        @media (max-width: 768px) {
           .nav-swiper, .zoom-badge { display: none; }
        }
      `}</style>

      <div className="flat-wrap-media-product position-relative">
        <Swiper
          modules={[Thumbs, Navigation]}
          className="swiper tf-product-media-main"
          id="gallery-swiper-started"
          onSwiper={setMainSwiper} 
          thumbs={{ swiper: thumbSwiper && !thumbSwiper.destroyed ? thumbSwiper : null }}
          navigation={{ prevEl: ".snbp1", nextEl: ".snbn1" }}
          spaceBetween={0}
          slidesPerView={1}
          autoHeight={true} 
        >
          {items.map((elm, i) => (
            <SwiperSlide key={i}>
              {!elm.videoUrl ? (
                <div className="item">
                   <video playsInline autoPlay muted loop controls src={elm.videoUrl} />
                </div>
              ) : (
                <a href={elm.imageUrl} target="_blank" className="item" data-pswp-width="800" data-pswp-height="1200">
                  <Image 
                    className="tf-image-zoom" 
                    data-zoom={elm.imageUrl} 
                    src={elm.imageUrl} 
                    alt="product" 
                    width={800} height={1200} 
                    priority={i===0}
                    
                    onLoad={() => mainSwiper && mainSwiper.update()}
                  />
                   <div className="zoom-badge">Hover to Zoom</div>
                </a>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-button-next nav-swiper snbn1"></div>
        <div className="swiper-button-prev nav-swiper snbp1"></div>
      </div>

      {/* --- 2. THUMBNAIL SWIPER --- */}
      <Swiper
        onSwiper={setThumbSwiper}
        modules={[Thumbs, FreeMode]}
        watchSlidesProgress
        freeMode
        className="swiper tf-product-media-thumbs"
        breakpoints={{
          0: { 
             slidesPerView: 5, 
             spaceBetween: 8,
          },
          768: { 
             slidesPerView: 6, 
             spaceBetween: 12,
          }
        }}
      >
        {items.map((elm, index) => (
          <SwiperSlide key={index}>
            <div className="item-thumb" style={{position: 'relative'}}>
                <Image 
                    src={elm.imageUrl} 
                    alt="thumb" 
                    width={100} height={150} 
                    style={{width:'100%', height:'auto', objectFit:'cover'}} 
                />
                {elm.videoUrl && (
                    <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', color:'white', fontSize:'12px'}}>▶</div>
                )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}