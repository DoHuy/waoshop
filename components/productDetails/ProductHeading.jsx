import React from "react";

export default function ProductHeading({ product }) {
  return (
    <div className={`tf-product-heading`}>
      <h5 className="product-name fw-medium">{product.name}</h5>
      <div className="product-rate">
      <div className="list-star">
        {Array.from({ length: 5 }, (_, index) => {
          const starValue = index + 1;
          
          let iconClass = "icon-star-empty";

          if (product.rating >= starValue) {
            iconClass = "icon-star";
          } else if (product.rating >= starValue - 0.5) {
            iconClass = "icon-star-half";
          }
          return <i key={index} className={`icon ${iconClass}`} />;
        })}
      </div>
        <span className="count-review"><strong>{product.rating}</strong> ({product.reviewCount})</span>
      </div>      
      <div className="product-price">
        <div className="display-sm price-new price-on-sale">${product.variants[0].price}</div>
        <div className="display-sm price-old">${product.variants[0].compareAtPrice}</div>
        <span className="badge-sale">{`${Math.round((Number(product.variants[0].compareAtPrice) - Number(product.variants[0].price)) * 100 / Number(product.variants[0].compareAtPrice))}%`}</span>
      </div>
      {product.inStock ? (
        <div className="product-stock">
        </div>
      ) : (
        <>
          <div className="product-stock">
            <span className="stock out-stock">Out of Stock</span>
          </div>
          <button className="tf-btn btn-out-stock">
            This product is currently unavailable
          </button>
        </>
      )}
      <ul className="tf-product-cate-sku text-md">
                          <li className="item-cate-sku">
                            <span className="label">Categories:</span>
                            <span className="value">{product.categories.map( item => item.name).join(", ")}</span>
                          </li>
                          <li className="item-cate-sku">
                            <span className="label">✅</span>
                            <span className="value">Payment security 100%</span>
                          </li>
                          <li className="item-cate-sku">
                            <span className="label">🚚</span>
                            <span className="value">Shipping with real-time tracking</span>
                          </li>
                          <li className="item-cate-sku">
                            <span className="label">💌</span>
                            <span className="value">Personalized gift wrapping</span>
                          </li>
      </ul>
    </div>
  );
}