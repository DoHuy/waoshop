"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useContextElement } from "@/context/Context";
import Image from "next/image";

export default function ProductCard10({ product }) {
  const [currentImage, setCurrentImage] = useState(product.galleries[0].imageUrl);

  const {
    addToCompareItem,
    isAddedtoCompareItem,
    setQuickViewItem,
    addProductToCart,
    isAddedToCartProducts,
  } = useContextElement();

  useEffect(() => {
    setCurrentImage(product.galleries[0].imageUrl);
  }, [product]);

  return (
    <div className="card-product style-2 card-product-size">
      <div className="card-product-wrapper">
        <Link href={`/products/${product.slug}`} className="product-img">
          
          <Image
            className="img-product lazyload"
            alt="image-product"
            src={currentImage}
            width={684}
            height={972}
          />
          <Image
            className="img-hover lazyload"
            data-src={product.galleries[0].imageUrl}
            alt="image-product"
            src={product.galleries[0].imageUrl}
            width={684}
            height={972}
          />
        </Link>

        <ul className="list-product-btn">
          <li>
            <a
              href="#shoppingCart"
              onClick={() => addProductToCart(product)}
              data-bs-toggle="offcanvas"
              className="box-icon hover-tooltip"
            >
              <span className="icon icon-cart2" />
              <span className="tooltip">
                {isAddedToCartProducts(product.id)
                  ? "Already Added"
                  : "Add to Cart"}
              </span>
            </a>
          </li>

          <li>
            <a
              href="#quickView"
              data-bs-toggle="modal"
              onClick={() => setQuickViewItem(product)}
              className="box-icon quickview hover-tooltip"
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
              aria-controls="compare"
              className="box-icon hover-tooltip"
            >
              <span className="icon icon-compare" />
              <span className="tooltip">
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
          className="name-product link fw-medium text-md"
        >
          {product.name}
        </Link>

        <p className="price-wrap fw-medium">
          <span
            className={`price-new ${product.compareAtPrice ? "text-primary" : ""} `}
          >
            £{product.price.toFixed(2)}
          </span>{" "}
          {product.compareAtPrice && (
            <span className="price-old">£{product.compareAtPrice.toFixed(2)}</span>
          )}
        </p>

      </div>
    </div>
  );
}