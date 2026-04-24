"use client";
import { useContextElement } from "@/context/Context";
import Link from "next/link";
import React, { useState } from "react";
import QuantitySelect from "../common/QuantitySelect";
import Image from "next/image";

export default function CartModal() {

  const {
    cartProducts,    
    setCartProducts, 
    totalPrice,      
    totalDiscount,
    updateQuantityInCart,
  } = useContextElement();

  const removeItem = (id) => {
    setCartProducts((pre) => [...pre.filter((elm) => elm.id != id)]);
  };

  return (
    <div
      className="offcanvas offcanvas-end popup-style-1 popup-shopping-cart"
      id="shoppingCart" 
    >
      <div className="canvas-wrapper">
        
        <div className="popup-header">
          <span className="title">Shopping cart</span>
          <span
            className="icon-close icon-close-popup"
            data-bs-dismiss="offcanvas" 
          />
        </div>

        <div className="wrap">
          <div className="tf-mini-cart-threshold">
          </div>
          <div className="tf-mini-cart-wrap">
            <div className="tf-mini-cart-main">
              <div className="tf-mini-cart-sroll">
                
                {cartProducts && cartProducts.length > 0 ? (
                  <div className="tf-mini-cart-items">
                    {cartProducts.map((variant, i) => (
                      <div key={variant.id} className="tf-mini-cart-item file-delete">
                        
                        <div className="tf-mini-cart-image">
                          <Link href={`/products/${variant.slug}`}>
                            <Image
                              className="lazyload"
                              alt={variant.name || "product-image"}
                              src={variant?.imageUrl} 
                              width={190}
                              height={252}
                            />
                          </Link>
                        </div>

                        <div className="tf-mini-cart-info">
                          <div className="d-flex justify-content-between">
                            <Link
                              className="title link text-md fw-medium"
                              href={`/products/${variant.slug}`}
                            >
                              {variant.name}
                            </Link>
                            <i
                              className="icon icon-close remove fs-12"
                              onClick={() => removeItem(variant.id)}
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                          
                          <div className="d-flex gap-10">
                            {variant.options && variant.options.map( opt => opt.optionValue).join("/ ")}
                          </div>

                          <p className="price-wrap text-sm fw-medium">
                            <span className="new-price text-primary">
                              £ {(variant.price * variant.quantity).toFixed(2)}
                            </span>{" "}
                            {variant.compareAtPrice && (
                              <span className="old-price text-decoration-line-through text-dark-1">
                                
                                £ {(variant.compareAtPrice * variant.quantity).toFixed(2)}
                              </span>
                            )}
                          </p>

                          <QuantitySelect
                            styleClass="small"
                            quantity={variant.quantity}
                            setQuantity={(qty) => {
                              updateQuantityInCart(variant, qty);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    Your Cart is empty. Start adding favorite products to cart!{" "}
                    <Link
                      className="tf-btn btn-dark2 animate-btn mt-3"
                      href="/shop"
                    >
                      Explore Products
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="tf-mini-cart-bottom">
              
              <div className="tf-mini-cart-bottom-wrap p-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="text-sm fw-medium">Subtotal:</span>
                  <span className="text-sm fw-medium">£{(totalPrice + totalDiscount).toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="text-sm fw-medium">Discount:</span>
                  <span className="old-price text-decoration-line-through text-dark-1">£{totalDiscount.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center border-top pt-1 mt-1">
                  <span className="text-md fw-bold">Total:</span>
                  <span className="text-md fw-bold text-primary">£{totalPrice.toFixed(2)} GBP</span>
                </div>

                <div className="d-flex align-items-center gap-2 my-2">
                </div>

                <Link href="/checkout" className="tf-btn btn-sm bg-dark w-100 justify-content-center py-2 text-uppercase fw-bold" style={{ fontSize: "12px" }}>
                  Check out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}