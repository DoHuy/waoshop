"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useContextElement } from "@/context/Context";
import CountdownTimer from "../common/Countdown";
import Image from "next/image";

export default function ProductCard1({
  product,
  styleClass = "style-1",
  tooltipDirection = "left",
  textCenter = false,
  ratioClass = "",
}) {
  const firstGallery = product.galleries?.[0];

  const [currentImage, setCurrentImage] = useState(firstGallery?.imageUrl);

  const {
    addToCompareItem,
    isAddedtoCompareItem,
    setQuickViewItem,
  } = useContextElement();

  useEffect(() => {
    setCurrentImage(firstGallery?.imageUrl);
  }, [product, firstGallery?.imageUrl]);

  const firstVariant = product.variants?.[0];

  return (
    <div
      className={`card-product ${
        !product.inStock ? "out-of-stock" : ""
      } ${styleClass}`}
    >
      <div className={`card-product-wrapper ${ratioClass} `}>
        <Link href={`/products/${product.slug}`} className="product-img">
          
          {currentImage ? (
            <Image
              className="img-product lazyload"
              alt="image-product"
              src={currentImage}
              width={513}
              height={729}
              unoptimized
            />
          ) : (
             <div className="img-product-placeholder w-full h-full bg-gray-200" />
          )}

          {product.galleries?.[0].imageUrl && (
            <Image
              className="img-hover lazyload"
              data-src={product.galleries?.[0].imageUrl}
              alt="image-product"
              src={product.galleries?.[0].imageUrl}
              width={513}
              height={729}
              unoptimized
            />
          )}
        </Link>

        {product.saleLabel && (
          <div className="on-sale-wrap">
            <span className="on-sale-item">{product.saleLabel}</span>
          </div>
        )}
        {product.isTrending && (
          <div className="on-sale-wrap">
            <span className="on-sale-item trending">Trending</span>
          </div>
        )}

        {product.countdownTimer && (
          <div className="countdown-box">
            <span className="js-countdown">
              <CountdownTimer style={1} />
            </span>
          </div>
        )}

        {product.inStock && (
          <>
            <ul className="list-product-btn">
              <li>
                <a
                  href="#quickView"
                  onClick={(e) => {
                    e.preventDefault();
                    setQuickViewItem(product);
                  }}
                  className={`hover-tooltip tooltip-${tooltipDirection} box-icon quickview`}
                >
                  <span className="icon icon-view" />
                  <span className="tooltip">Quick View</span>
                </a>
              </li>

              <li className="compare">
                <a
                  href="#compare"
                  onClick={() => addToCompareItem(product)}
                  data-bs-toggle="modal"
                  className={`hover-tooltip tooltip-${tooltipDirection} box-icon`}
                >
                  <span className="icon icon-compare" />
                  <span className="tooltip">
                    {" "}
                    {isAddedtoCompareItem(product.id)
                      ? "Already compared"
                      : "Add to Compare"}
                  </span>
                </a>
              </li>
            </ul>
          </>
        )}
      </div>

      <div className={`card-product-info ${textCenter ? "text-center" : ""} `}>
        <Link
          href={`/products/${product.slug}`}
          className="name-product link fw-medium text-md"
        >
          {product.name}
        </Link>

        {firstVariant ? (
          <p className="price-wrap fw-medium">
            <span
              className={`price-new ${
                firstVariant.compareAtPrice ? "text-primary" : ""
              } `}
            >
              £{firstVariant.price?.toFixed(2)}
            </span>{" "}
            {firstVariant.compareAtPrice && (
              <span className="price-old text-dark">
                £{firstVariant.compareAtPrice.toFixed(2)}
              </span>
            )}{" "}
          </p>
        ) : (
          <p className="price-wrap fw-medium">
            <span className="price-new">Contact for Price</span>
          </p>
        )}
      </div>
    </div>
  );
}