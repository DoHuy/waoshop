"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useContextElement } from "@/context/Context";
import CountdownTimer from "../common/Countdown";
import Image from "next/image";
export default function ProductCard4({
    countdownStyleclass = "",
    product,
    styleClass = "",
    tooltipDirection = "left",
}) {

  const [currentImage, setCurrentImage] = useState(product.galleries?.[0]?.image_url);
  
  const {
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
    setQuickViewItem,
    addProductToCart,
    isAddedToCartProducts,
  } = useContextElement();

  useEffect(() => {
    setCurrentImage(product.galleries?.[0]?.image_url);
  }, [product]);  

  const [activeSize, setActiveSize] = useState("50ml");

  return (
    <div className="card-product style-5 text-center">
      <div className="card-product-wrapper asp-ratio-0">
        <Link href={`/products/${product.slug}`} className="product-img">
          <Image
            className="img-product lazyload"
            data-src={currentImage}
            alt="image-product"
            src={currentImage}
            width={513}
            height={518}
          />
          <Image
            className="img-hover lazyload"
            data-src={product.galleries?.[1]?.image_url}
            alt="image-product"
            src={product.galleries?.[1]?.image_url}
            width={513}
            height={518}
          />
        </Link>
        {product.is_on_sale && (
          <div className="on-sale-wrap">
            { product.is_trending && (
              <span
              className={`on-sale-item ${
                product.is_trending === true ? "trending" : ""
              }`}
              >
                {product.sale_label}
            </span>
            )}
            { product.is_new && (
              <span
              className={`on-sale-item ${
                product.is_new === true ? "new" : ""
              }`}
              >
                {product.sale_label}
            </span>
            )}
            { product.is_featured && (
              <span
              className={`on-sale-item ${
                product.is_featured === true ? "featured" : ""
              }`}
              >
                {product.sale_label}
            </span>
            )}                                    

          </div>
        )}
        
        <ul className="list-product-btn">
          <li
            className={`wishlist ${
              isAddedtoWishlist(product.id) ? "addwishlist" : ""
            }`}
          >
            <a
              onClick={() => addToWishlist(product)}
              className="box-icon bg-surface hover-tooltip tooltip-left"
            >
              <span
                className={`icon ${
                  isAddedtoWishlist(product.id) ? "icon-trash" : "icon-heart2"
                } `}
              />
              <span className="tooltip">
                {isAddedtoWishlist(product.id)
                  ? "Remove Wishlist"
                  : "Add to Wishlist"}
              </span>
            </a>
          </li>
          <li>
            <a
              href="#quickView"
              onClick={() => setQuickViewItem(product)}
              data-bs-toggle="modal"
              className="box-icon bg-surface quickview hover-tooltip tooltip-left"
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
              className="box-icon bg-surface hover-tooltip tooltip-left"
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
      </div>
      <div className="card-product-info">
        <Link
          href={`/products/${product.slug}`}
          className="name-product link fw-medium body-text"
        >
          {product.name}
        </Link>
        <p className="price-wrap fw-medium">
          <span
            className={`price-new ${product.oldPrice ? "text-primary" : ""} `}
          >
            ${product.price.toFixed(2)}
          </span>{" "}
          {product.oldPrice && (
            <span className="price-old">${product.oldPrice.toFixed(2)}</span>
          )}
        </p>
        <ul className="list-color-product list-capacity-product justify-content-center">
          <li
            className={`list-color-item color-swatch ${
              activeSize == "50ml" ? "active" : ""
            }`}
            onMouseOver={() => setActiveSize("50ml")}
          >
            <span className="text-quantity">50ml</span>
            <Image
              className="lazyload"
              data-src={product.imgHover}
              alt="image-product"
              src={product.imgHover}
              width={513}
              height={518}
            />
          </li>
          <li
            className={`list-color-item color-swatch ${
              activeSize == "100ml" ? "active" : ""
            }`}
            onMouseOver={() => setActiveSize("100ml")}
          >
            <span className="text-quantity">100ml</span>
            <Image
              className="lazyload"
              data-src={product.imgHover}
              alt="image-product"
              src={product.imgHover}
              width={513}
              height={518}
            />
          </li>
        </ul>
        <div className="btn-addcart">
          <a
            href="#shoppingCart"
            data-bs-toggle="offcanvas"
            onClick={() => {
              if (!product.isSoldOut) {
                addProductToCart(product);
              }
            }}
            className={`tf-btn btn-dark3 fw-normal hover-primary ${
              product.isSoldOut ? "disabled" : ""
            }`}
          >
            {product.isSoldOut
              ? "Sold out"
              : isAddedToCartProducts(product.id)
              ? "Already Added"
              : "Add to Cart"}
          </a>
        </div>
        <div
          className={`${
            product.isSoldOut ? "out-stock" : "in-stock"
          } stock text-line-clamp-1`}
        >
          <span className="dot" /> {product.stockStatus}
        </div>
      </div>
    </div>
  );
}
