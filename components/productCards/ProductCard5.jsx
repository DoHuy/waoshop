"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useContextElement } from "@/context/Context";
import Image from "next/image";
export default function ProductCard5({
  countdownStyleclass = "",
  product,
  styleClass = "",
  tooltipDirection = "left",
}) {
  const [currentImage, setCurrentImage] = useState(product.galleries?.[0]?.image_url);

  const {
    addToCompareItem,
    isAddedtoCompareItem,
    setQuickViewItem,
  } = useContextElement();

  useEffect(() => {
    setCurrentImage(product.galleries?.[0]?.image_url);
  }, [product]);

  return (
    <div
      className={`card-product card-product-size ${
        product.is_out_of_sale ? "out-of-stock" : ""
      } ${styleClass}`}
    >
      <div className="card-product-wrapper asp-ratio-0">
        <Link href={`/products/${product.slug}`} className="product-img">
          <Image
            className="img-product lazyload"
            alt="image-product"
            src={currentImage}
            width="684"
            height="972"
          />
          <Image
            className="img-hover lazyload"
            data-src={product.galleries?.[1]?.image_url}
            alt="image-product"
            src={product.galleries?.[1]?.image_url}
            width="684"
            height="972"
          />
        </Link>
        {product.sale_label && (
          <div className="on-sale-wrap">
            <span className="on-sale-item">{product.sale_label}</span>
          </div>
        )}
        {product.is_trending && (
          <div className="on-sale-wrap">
            <span className="on-sale-item trending">Trending</span>
          </div>
        )}
        {product.is_new && (
          <div className="on-sale-wrap">
            <span className="on-sale-item new">New</span>
          </div>
        )}
        {product.is_featured && (
          <div className="on-sale-wrap">
            <span className="on-sale-item featured">Featured</span>
          </div>
        )}
        {product.is_on_sale && (
          <div className="on-sale-wrap">
            <span className="on-sale-item on-sale">On Sale</span>
          </div>
        )}                        
        <ul className="list-product-btn">
          {/* <li>
            <a
              href="#shoppingCart"
              data-bs-toggle="offcanvas"
              onClick={() => addProductToCart(product)}
              className={`hover-tooltip tooltip-${tooltipDirection} box-icon`}
            >
              <span className="icon icon-cart2" />
              <span className="tooltip">
                {" "}
                {isAddedToCartProducts(product.id)
                  ? "Already Added"
                  : "Add to Cart"}
              </span>
            </a>
          </li> */}
          <li>
            <a
              href="#quickView"
              onClick={() => setQuickViewItem(product)}
              data-bs-toggle="modal"
              className={`hover-tooltip tooltip-${tooltipDirection} box-icon quickview`}
            >
              <span className="icon icon-view" />
              <span className="tooltip">Quick View</span>
            </a>
          </li>
          <li className="compare">
            <a
              href="#compare"
              data-bs-toggle="modal"
              onClick={() => addToCompareItem(product)}
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
        {/* {product.sizes?.length > 0 && (
          <ul className="size-box">
            {product.sizes.map((size, index) => (
              <li className="size-item text-xs text-white" key={index}>
                {size}
              </li>
            ))}
          </ul>
        )} */}
      </div>
      <div className="card-product-info text-center">
        <Link
          href={`/products/${product.slug}`}
          className="name-product link fw-medium text-md"
        >
          {product.name}
        </Link>
        <p className="price-wrap fw-medium">
          <span
            className={`price-new ${product.variants?.[0].compare_at_price ? "text-primary" : ""} `}
          >
            ${product.variants?.[0].price.toFixed(2)}
          </span>{" "}
          {product.variants?.[0].compare_at_price && (
            <span className="price-old text-dark">
              ${product.variants?.[0].compare_at_price.toFixed(2)}
            </span>
          )}{" "}
        </p>
        {/* {product.colors.length > 0 && (
          <ul className="list-color-product justify-content-center">
            {product.colors.map((color, index) => (
              <li
                className={`list-color-item color-swatch hover-tooltip tooltip-bot  ${
                  currentImage == color.img ? "active" : ""
                } ${color.value == "bg-white" ? "line" : ""}`}
                key={index}
                onMouseOver={() => setCurrentImage(color.img)}
              >
                <span className="tooltip color-filter">{color.label}</span>
                <span className={`swatch-value ${color.value}`} />
                <Image
                  className="lazyload"
                  data-src={color.img}
                  alt="image-product"
                  src={color.img}
                  width="684"
                  height="972"
                />
              </li>
            ))}
          </ul>
        )} */}
      </div>
    </div>
  );
}
