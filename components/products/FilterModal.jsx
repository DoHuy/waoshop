"use client";
import React from "react";
import Slider from "rc-slider";
import Link from "next/link";
import Image from "next/image";
export default function FilterModal({ allProps }) {
  const { filteredData = [] } = allProps;
  return (
    <div
      className="offcanvas offcanvas-start canvas-sidebar canvas-filter"
      id="filterShop"
    >
      <div className="canvas-wrapper">
        <div className="canvas-header">
          <span className="title">Filter</span>
          <button
            className="icon-close icon-close-popup"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="canvas-body">
          <div className="widget-facet">
            <ul className="list-categories current-scrollbar">
              {filteredData.length > 0 &&
                filteredData.map(category => (
                  <li key={category.id} className="cate-item">
                    <Link className="text-sm link" href={`/shop/${category.slug}`}>
                      <span>{category.name}</span> <span className="count">({category.items})</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className="widget-facet">
            <div
              className="facet-title text-xl fw-medium"
              data-bs-target="#price"
              role="button"
              data-bs-toggle="collapse"
              aria-expanded="true"
              aria-controls="price"
            >
              <span>Price</span>
              <span className="icon icon-arrow-up" />
            </div>
            <div id="price" className="collapse show">
              <div className="collapse-body widget-price filter-price">
                <div
                  className="price-val-range"
                  id="price-value-range"
                  data-min={0}
                  data-max={500}
                >
                  <Slider
                    value={allProps.price}
                    onChange={(price) => allProps.setPrice(price)}
                    range
                    min={0}
                    max={500}
                  />
                </div>
                <div className="box-value-price">
                  <span className="text-sm">Price:</span>
                  <div className="price-box">
                    <div
                      className="price-val"
                      id="price-min-value"
                      data-currency="$"
                    >
                      {allProps.price[0]}
                    </div>
                    <span>-</span>
                    <div
                      className="price-val"
                      id="price-max-value"
                      data-currency="$"
                    >
                      {allProps.price[1]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="widget-facet">
            <div className="sb-banner hover-img">
              <div className="image img-style">
                <Image
                  src="/images/blog/sb-banner.jpg"
                  alt="banner"
                  className="lazyload"
                  width={732}
                  height={1036}
                />
              </div>
              <div className="banner-content">
                <p className="title">
                  Elevate <br />
                  Your Style
                </p>
                <Link className="tf-btn btn-white hover-primary" href={`/shop`}>
                  <span>Shop Now</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
