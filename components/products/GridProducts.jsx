import React from "react";
import ProductCard1 from "../productCards/ProductCard1";

export default function GridProducts({
  products,
  cardStyleClass,
  tooltipDirection = "left",
}) {
  return (
    <>
      {products.map((product, i) => (
        <ProductCard1
          key={i}
          product={product}
          countdownStyleclass="style-3 bg-white text-primary line-primary"
          styleClass={cardStyleClass}
          tooltipDirection={tooltipDirection}
        />
      ))}
    </>
  );
}
