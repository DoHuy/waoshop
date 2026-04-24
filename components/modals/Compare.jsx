"use client";
import { useContextElement } from "@/context/Context";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Compare() {

  const { 
    removeFromCompareItem, 
    compareItem,           
    setCompareItem         
  } = useContextElement();

  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems([...compareItem]);
  }, [compareItem]);

  return (
    <div className="modal modalCentered fade modal-compare" id="compare">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          
          <span
            className="icon icon-close btn-hide-popup"
            data-bs-dismiss="modal"
          />

          <div className="modal-compare-wrap list-file-delete">
            <h6 className="title text-center">Compare Products</h6>
            
            <div className="tf-compare-inner">
              {items.length ? (
                <>
                  <div className="tf-compare-list">
                    {items.map((product, i) => (
                      <div key={i} className="tf-compare-item file-delete">
                        <span
                          className="icon-close remove"
                          onClick={() => removeFromCompareItem(product.id)}
                        />
                        
                        <Link
                          href={`/products/${product.slug}`}
                          className="image"
                        >
                          <Image
                            className="lazyload"
                            alt="Product Image"
                            src={product.galleries[0].imageUrl}
                            width={1000}
                            height={1421}
                            unoptimized
                          />
                        </Link>

                        <div className="content">
                          <div className="text-title">
                            <Link
                              className="link text-line-clamp-2"
                              href={`/products/${product.slug}`}
                            >
                              {product.name}
                            </Link>
                          </div>
                          
                          <p className="price-wrap">
                            <span className="new-price text-primary">
                              £{product.variants[0].price.toFixed(2)}
                            </span>{" "}
                            {product.variants[0].compareAtPrice && (
                              <span className="old-price text-decoration-line-through text-dark-1">
                                £{product.variants[0].compareAtPrice.toFixed(2)}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="tf-compare-inner">
                  <div className="text-center">
                    No items added to compare yet. Browse Products to find items
                    you’d like to compare.
                  </div>
                </div>
              )}
            </div>

            <div className="tf-compare-buttons justify-content-center">
             
              <Link
                href={`/compare`}
                className="tf-btn animate-btn justify-content-center"
              >
                Compare
              </Link>
              
              <div
                className="tf-btn btn-out-line-dark justify-content-center clear-file-delete cursor-pointer"
                onClick={() => setCompareItem([])} 
              >
                <span>Clear All</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}