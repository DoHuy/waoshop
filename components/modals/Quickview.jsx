"use client";
import { useContextElement } from "@/context/Context";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import QuantitySelect from "../common/QuantitySelect";
import Image from "next/image";
import parse from 'html-react-parser';

export default function Quickview() {
  const [quantity, setQuantity] = useState(1);
  const {
    quickViewItem,
    setQuickViewItem,
    addProductToCart,
    isAddedToCartProducts,
    cartProducts,
    updateQuantity,
  } = useContextElement();

  const [activeOptions, setActiveOptions] = useState({});

  useEffect(() => {
    if (quickViewItem && quickViewItem.id) {
      setQuantity(1);

      setActiveOptions(
        quickViewItem.options.reduce((acc, item) => {
          acc[item.id] = item.optionValues[0].value;
          return acc;
        }, {})
      );

      import("bootstrap/dist/js/bootstrap.min.js").then((Bootstrap) => {
        const modalElement = document.getElementById("quickView");
        if (modalElement) {
          const myModal = new Bootstrap.Modal(modalElement);
          myModal.show();
          
          const handleHidden = () => {
            if (typeof setQuickViewItem === "function") {
              setQuickViewItem(null); 
            }
          };

          modalElement.addEventListener("hidden.bs.modal", handleHidden);

          return () => {
            modalElement.removeEventListener("hidden.bs.modal", handleHidden);
          };
        }
      });
    }
  }, [quickViewItem]);

  const closeQuickView = () => {
    const modalElement = document.getElementById("quickView");
    if (modalElement) {
      const closeBtn = modalElement.querySelector('.icon-close-popup');
      if (closeBtn) {
        closeBtn.click();
      }
    }
  };

  return (
    <div className="modal fade modalCentered modal-quick-view" id="quickView">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <span
            className="icon-close icon-close-popup"
            data-bs-dismiss="modal"
          />

          {quickViewItem && quickViewItem.id ? (
            <>
              <div className="tf-product-media-wrap">
                <Swiper
                  dir="ltr"
                  className="swiper tf-single-slide"
                  modules={[Navigation]}
                  navigation={{
                    prevEl: ".qvsnp1",
                    nextEl: ".qvsnn1",
                  }}
                >
                  <SwiperSlide className="swiper-slide" data-color="orange">
                    <div className="item">
                      <Image
                        className="lazyload"
                        alt={quickViewItem.name || "Product Image"}
                        src={quickViewItem.galleries?.[0].imageUrl || ""}
                        width={513}
                        height={729}
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide" data-color="orange">
                    <div className="item">
                      <Image
                        className="lazyload"
                        alt={quickViewItem.name || "Product Image Hover"}
                        src={
                          quickViewItem.galleries?.[0].imageUrl
                            ? quickViewItem.galleries[0].imageUrl
                            : quickViewItem.galleries[0].imageUrl || ""
                        }
                        width={513}
                        height={729}
                      />
                    </div>
                  </SwiperSlide>

                  <div className="swiper-button-prev nav-swiper arrow-1 nav-prev-cls single-slide-prev qvsnp1" />
                  <div className="swiper-button-next nav-swiper arrow-1 nav-next-cls single-slide-next qvsnn1" />
                </Swiper>
              </div>
              <div className="tf-product-info-wrap">
                <div className="tf-product-info-inner">
                  <div className="tf-product-heading">
                    <h6 className="product-name">
                      <Link
                        href={`/products/${quickViewItem.slug}`}
                        className="link"
                        onClick={closeQuickView}
                      >
                        {quickViewItem.name}
                      </Link>
                    </h6>
                    <div className="product-rate">
                      <div className="list-star">
                      {Array.from({ length: 5 }, (_, index) => {
                          const starValue = index + 1;
          
                          let iconClass = "icon-star-empty";

                          if (quickViewItem.rating >= starValue) {
                            iconClass = "icon-star";
                          } else if (quickViewItem.rating >= starValue - 0.5) {
                            iconClass = "icon-star-half";
                          }
                          return <i key={index} className={`icon ${iconClass}`} />;
                      })}
                      </div>
                      <span className="count-review"><strong>{quickViewItem.rating}</strong> ({quickViewItem.reviewCount})</span>
                    </div>
                    <div className="product-price">
                      <h6 className="price-new price-on-sale">
                        £{quickViewItem.variants?.[0].price?.toFixed(2)}
                      </h6>
                      {quickViewItem.variants?.[0].compareAtPrice && (
                        <h6 className="price-old">
                          £{quickViewItem.variants?.[0].compareAtPrice?.toFixed(2)}
                        </h6>
                      )}
                    </div>
                    <p className="text">
                      {parse(quickViewItem.description)}
                    </p>
                  </div>

                  <div className="tf-product-total-quantity">
                    <div className="group-btn">
                      <QuantitySelect
                        quantity={
                          isAddedToCartProducts(quickViewItem.id)
                            ? cartProducts.find(
                                (elm) => elm.id == quickViewItem.id
                              )?.quantity || 1
                            : quantity
                        }
                        setQuantity={(qty) => {
                          if (isAddedToCartProducts(quickViewItem.id)) {
                            updateQuantity(quickViewItem.id, qty, activeOptions);
                          } else {
                            setQuantity(qty);
                          }
                        }}
                      />
                      <a
                        href="#shoppingCart"
                        data-bs-toggle="offcanvas"
                        className="tf-btn hover-primary"
                        onClick={() =>
                          addProductToCart(quickViewItem, activeOptions, quantity)
                        }
                      >
                      Add to cart
                      </a>
                    </div>
                    <a
                      href="/checkout"
                      className="tf-btn w-100 animate-btn paypal btn-primary"
                      onClick={() =>
                          addProductToCart(quickViewItem, activeOptions, quantity)
                      }
                    >
                      Buy It Now
                    </a>
                  </div>
                  
                  <Link
                    href={`/products/${quickViewItem.slug}`}
                    className="view-details link"
                    onClick={closeQuickView}
                  >
                    View full details <i className="icon icon-arrow-right" />
                  </Link>

                </div>
              </div>
            </>
          ) : (
            <div className="d-flex justify-content-center align-items-center" style={{minHeight: "200px"}}>
               <span>Loading...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}