import React from "react";
import Description from "./Description";
import Reviews from "./Reviews";

export default function Description1({ productFaqs, product, socialProductVideos, productReview, relatedProducts }) {

  return (
    <section>
      <div className="container">
        <div className="widget-accordion wd-product-descriptions">
          <div
            className="accordion-title collapsed"
            data-bs-target="#description"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="description"
            role="button"
          >
            <span>Descriptions</span>
            <span className="icon icon-arrow-down" />
          </div>
          <div id="description" className="collapse">
            <div className="accordion-body widget-desc">
              <Description product={product}/>
            </div>
          </div>
        </div>
        <div className="widget-accordion wd-product-descriptions">
          <div
            className="accordion-title collapsed"
            data-bs-target="#reviews"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="reviews"
            role="button"
          >
            <span>Reviews</span>
            <span className="icon icon-arrow-down" />
          </div>
          <div id="reviews" className="collapse">
            <div className="accordion-body wd-customer-review">
              <Reviews reviews={productReview.reviews}/>
            </div>
          </div>
        </div>       
      </div>
    </section>
  );
}