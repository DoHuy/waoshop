"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useContextElement } from "@/context/Context";

export default function Compare() {
  const { compareItem, removeFromCompareItem, addProductToCart } = useContextElement();

  if (!compareItem || compareItem.length === 0) {
    return (
      <section className="flat-spacing-15">
        <div className="container">
          <div className="text-center">
            <h3>No items to compare</h3>
            <p className="text-muted">Browse products and add them to compare list.</p>
            <Link href="/shop" className="tf-btn btn-fill animate-btn-style btn-md radius-3 mt-4">
              Return to Shop
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flat-spacing-15 pt-0">
      <div className="container">
        <div className="tf-compare-table">
          
          <div className="tf-compare-row tf-compare-grid">
            <div className="tf-compare-col d-md-block d-none" />
            
            {compareItem.map((product) => (
              <div className="tf-compare-col" key={product.id}>
                <div className="tf-compare-item">
                  
                  <Link className="tf-compare-image" href={`/products/${product.slug}`}>
                    <Image
                      className="lazyload"
                      src={product.galleries[0].imageUrl}
                      alt={product.name}
                      width={320}
                      height={407}
                    />
                  </Link>

                  <div className="content">
                    <Link
                      className="tf-compare-title link text-md fw-medium"
                      href={`/products/${product.slug}`}
                    >
                      {product.name}
                    </Link>
                    
                    <p className="price-wrap fw-medium text-md">
                      <span className="price-new text-primary">
                        £{product.variants[0].price.toFixed(2)}
                      </span>
                      {product.variants[0].compareAtPrice && (
                         <span className="price-old text-dark ms-2">
                           £{product.variants[0].compareAtPrice.toFixed(2)}
                         </span>
                      )}
                    </p>

                    <div className="tf-compare-btn">
                      <a
                        href="#shoppingCart"
                        data-bs-toggle="offcanvas"
                        className="tf-btn animate-btn w-100"
                        onClick={() => addProductToCart(product,  product.options.reduce((acc, item) => {
      acc[`${item.id}`] = item.optionValues[0].value.trim();
      return acc;
    }, {}))}
                      >
                        Add to Cart
                      </a>
                    </div>
                  </div>

                  <div className="tf-compare-remove">
                    <span 
                      className="tf-btn-icon line d-inline-flex cursor-pointer"
                      onClick={() => removeFromCompareItem(product.id)}
                    >
                      <i className="icon-close" />
                    </span>
                  </div>

                </div>
              </div>
            ))}
          </div>

          <div className="tf-compare-row">
            <div className="tf-compare-col tf-compare-field d-md-block d-none">
              <p className="text-md fw-medium">Availability</p>
            </div>
            
            {compareItem.map((product) => (
              <div className="tf-compare-col tf-compare-field tf-compare-stock" key={product.id}>
                
                {!product.inStock ? (
                  <div className="text-red d-flex align-items-center justify-content-center gap-2">
                    <div className="icon">
                       <svg width={15} height={15} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_1_34903)">
                            <path d="M7.5 14.4955C11.366 14.4955 14.5 11.3635 14.5 7.50004C14.5 3.63659 11.366 0.504639 7.5 0.504639C3.63401 0.504639 0.5 3.63659 0.5 7.50004C0.5 11.3635 3.63401 14.4955 7.5 14.4955Z" fill="#E21B1B" />
                            <path d="M5.28008 4.19648L4.19751 5.27905L9.72085 10.8024L10.8034 9.71982L5.28008 4.19648Z" fill="white" />
                            <path d="M9.72036 4.19602L4.19702 9.71936L5.27959 10.8019L10.8029 5.27859L9.72036 4.19602Z" fill="white" />
                          </g>
                          <defs>
                            <clipPath id="clip0_1_34903">
                              <rect width={14} height={14} fill="white" transform="translate(0.5 0.5)" />
                            </clipPath>
                          </defs>
                        </svg>
                    </div>
                    <span>Out of Stock</span>
                  </div>
                ) : (
                  <>
                    <div className="icon">
                      <i className="icon-fill-check-circle" />
                    </div>
                    <span>In Stock</span>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="tf-compare-row">
            <div className="tf-compare-col tf-compare-field d-md-block d-none">
              <p className="text-md fw-medium">Vendor</p>
            </div>
            {compareItem.map((product) => (
              <div className="tf-compare-col tf-compare-value text-center" key={product.id}>
                <p className="text-sm">{product.vendor || "Ecomus"}</p>
              </div>
            ))}
          </div>


        </div>
      </div>
    </section>
  );
} 