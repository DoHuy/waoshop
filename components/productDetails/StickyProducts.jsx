"use client";
import { useContextElement } from "@/context/Context";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import QuantitySelect from "../common/QuantitySelect";

export default function StickyProducts({
  product: stickyProduct,
  activeOptions,
  setActiveOptions,
}) {
  const [quantity, setQuantity] = useState(1);

  const {
    addProductToCart,
    isAddedToCartProducts,
    cartProducts,
    updateQuantity,
  } = useContextElement();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const myElement = document.querySelector(".tf-sticky-btn-atc");

      if (myElement) {
        if (scrollPosition >= 500) {
          myElement.classList.add("show");
        } else {
          myElement.classList.remove("show");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSelectChange = (optionCode, value) => {
    const newOptions = { ...activeOptions, [optionCode]: value };
    setActiveOptions(newOptions);
  };

  return (
    <div className="tf-sticky-btn-atc">
      <div className="container">
        <div className="tf-height-observer w-100 d-flex align-items-center justify-content-between">
          
          <div className="tf-sticky-atc-product d-flex align-items-center">
            <div className="tf-sticky-atc-img d-none d-md-block">
              <Image
                className="lazyload"
                alt={stickyProduct.name || "Product Image"}
                src={stickyProduct.galleries?.[0]?.imageUrl || "/placeholder.jpg"}
                width={828}
                height={1241}
              />
            </div>
            <div className="tf-sticky-atc-title fw-5 d-xl-block d-none">
              {stickyProduct.name}
            </div>
          </div>

          <div className="tf-sticky-atc-infos w-100 w-md-auto">
         
            <div className="d-flex align-items-center gap-2 flex-wrap justify-content-center justify-content-md-end w-100">
              
              {stickyProduct.options.map((option, index) => (
                <div
                  key={index}
                  className="tf-sticky-atc-variant-price text-center tf-select"
                  
                >
                  <select
                    style={{maxWidth: 'auto'}}
                    value={activeOptions[option.id] || ""}
                    onChange={(e) =>
                      handleSelectChange(option.id, e.target.value)
                    }
                  >
                    {option.optionValues.map((opt_value, subIndex) => (
                      <option key={subIndex} value={opt_value.value}>
                        {opt_value.value}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              <div className="tf-sticky-atc-btns d-flex align-items-center gap-3">
                <div className="tf-product-info-quantity">
                      <QuantitySelect
                        quantity={
                          isAddedToCartProducts(stickyProduct.id, activeOptions)
                            ? cartProducts.filter(
                                (elm) => 
                                  elm.product_id == stickyProduct.id && 
                                  elm.options.every(opt => activeOptions[opt.option_code] == opt.option_value)
                              )[0]?.quantity || 1 
                            : quantity
                        }
                        setQuantity={(qty) => {
                          if (isAddedToCartProducts(stickyProduct.id, activeOptions)) {
                            updateQuantity(stickyProduct.id, qty, activeOptions);
                          } else {
                            setQuantity(qty);
                          }
                        }}
                      />
                </div>
                <a
                  href="#shoppingCart"
                  data-bs-toggle="offcanvas"
                  onClick={() =>
                    addProductToCart(stickyProduct, activeOptions, quantity)
                  }
                  // THAY ĐỔI 4: white-space-nowrap để chữ "Add to cart" không bị ngắt dòng xấu
                  className="tf-btn animate-btn d-inline-flex justify-content-center text-nowrap"
                >
                Add to cart
                </a>
              </div>
            </div> 
          </div>
        </div>
      </div>
    </div>
  );
}