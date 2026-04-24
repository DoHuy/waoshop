"use client";
import { useState } from "react";
import Slider1 from "./sliders/Slider7";
import Image from "next/image";
import Options from './Options';
import { useContextElement } from "@/context/Context";
import QuantitySelect from "../common/QuantitySelect";
import StickyProducts from "./StickyProducts";
import ProductHeading from "./ProductHeading";
import BoughtTogether from "./BoughtTogether";

export default function Details11({ product, frequentlyProducts }) {
  const [quantity, setQuantity] = useState(1);

  const [activeOptions, setActiveOptions] = useState(
    product.options.reduce((acc, item) => {
      acc[item.id] = item.optionValues[0].value;
      return acc;
    }, {})
  );

  const {
    addProductToCart,
    isAddedToCartProducts,
    cartProducts,
    updateQuantity,
  } = useContextElement();

  return (
    <section className="flat-single-product">
      <div className="tf-main-product section-image-zoom">
        <div className="container">
          <div className="row">
            {/* Product Images */}
            <div className="col-md-6">
              <div className="flat-wrap-frequently-bought-together sticky-top">
                <div className="product-thumbs-slider">
                  <Slider1 slideItems={product.galleries} />
                </div>
              </div>
            </div>
            {/* /Product Images */}
            
            {/* Product Info */}
            <div className="col-md-6">
              <div className="tf-zoom-main" />
              <div className="tf-product-info-wrap position-relative">
                <div className="tf-product-info-list other-image-zoom">
                  <ProductHeading product={product} />
                  
                  <div className="tf-product-variant">
                    <Options 
                      options={product.options} 
                      activeOptions={activeOptions} 
                      setActiveOptions={setActiveOptions}
                    />
                  </div>

                  <div className="tf-product-total-quantity">
                    <div className="group-btn">
                      <QuantitySelect
                        quantity={
                          isAddedToCartProducts(product.id, activeOptions)
                            ? cartProducts.filter(
                                (elm) => 
                                  elm.productId == product.id && 
                                  elm.options.every(opt => activeOptions[opt.optionId]?.trim() == opt.optionValue.trim())
                              )[0]?.quantity || 1 
                            : quantity
                        }
                        setQuantity={(qty) => {
                          if (isAddedToCartProducts(product.id, activeOptions)) {
                            updateQuantity(product.id, qty, activeOptions);
                          } else {
                            setQuantity(qty);
                          }
                        }}
                      />
                      <a
                        href="#shoppingCart"
                        data-bs-toggle="offcanvas"
                        onClick={() => addProductToCart(product, activeOptions, quantity)}
                        className="tf-btn hover-primary btn-add-to-cart"
                      >
                        Add to cart
                      </a>
                    </div>
                    <a
                      href="/checkout"
                      className="tf-btn btn-primary w-100 animate-btn"
                      onClick={() => addProductToCart(product, activeOptions, quantity)}
                    >
                      Buy it now
                    </a>
                  </div>

                  <div className="tf-product-trust-seal text-center">
                    <p className="text-md text-dark-2 text-seal fw-medium">
                      Guarantee Safe Checkout:
                    </p>
                    <ul className="list-card">
                      <li className="card-item">
                        <Image
                          alt="card"
                          src="/images/payment/Visa.png"
                          width={90}
                          height={64}
                        />
                      </li>
                      <li className="card-item">
                        <Image
                          alt="card"
                          src="/images/payment/DinersClub.png"
                          width={90}
                          height={64}
                        />
                      </li>
                      <li className="card-item">
                        <Image
                          alt="card"
                          src="/images/payment/Mastercard.png"
                          width={90}
                          height={64}
                        />
                      </li>
                      <li className="card-item">
                        <Image
                          alt="card"
                          src="/images/payment/PayPal.png"
                          width={90}
                          height={64}
                        />
                      </li>
                      <li className="card-item">
                        <Image
                          alt="card"
                          src="/images/payment/GooglePay.png"
                          width={90}
                          height={64}
                        />
                      </li>
                      <li className="card-item">
                        <Image
                          alt="card"
                          src="/images/payment/ApplePay.png"
                          width={90}
                          height={64}
                        />
                      </li>
                    </ul>  
                  </div>
                  <div className="tf-product-delivery-return">
                    <div className="product-delivery">
                      <div className="icon icon-car2" />
                      <p className="text-md">
                        Estimated delivery time:
                        <span className="fw-medium">
                          1-5 days
                        </span>
                      </p>
                    </div>
                    <div className="product-delivery">
                      <div className="icon icon-shipping3" />
                      <p className="text-md">
                        Free shipping
                      </p>
                    </div>
                  </div>                  
                  <div className="tf-product-fbt">
                    <div className="title text-xl fw-medium">
                      Frequently Bought Together
                    </div>
                    <BoughtTogether frequentlyProducts = {frequentlyProducts}/>
                  </div>
                </div>
              </div>
            </div>
            {/* /Product Info */}
          </div>
        </div>
      </div>
      <StickyProducts product={product} activeOptions={activeOptions} setActiveOptions={setActiveOptions}/>
    </section>
  );
}