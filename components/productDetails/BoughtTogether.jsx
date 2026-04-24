"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useContextElement } from "@/context/Context";

export default function BoughtTogether({frequentlyProducts}) {


  const products = frequentlyProducts.map((p) => {
    const flatOptions = p.options.flatMap((option) => option.optionValues);
    return {
      ...p,
      checked: false,
      selectedOptionValueId: flatOptions.length > 0 ? flatOptions[0].value : "",
    };
  });

  const {
    addProductsToCartByFrequentlyBought,
  } = useContextElement();  

  const [selectedProducts, setSelectedProducts] = useState(products);

  const toggleCheckbox = (id) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, checked: !product.checked } : product
      )
    );
  };

  // Calculate total price dynamically
  const totalPrice = selectedProducts
    .filter((product) => product.checked)
    .reduce((sum, product) => sum + product.price, 0)
    .toFixed(2);

  // 2. Handler for dropdown changes
  const handleOptionChange = (id, newOptionValueId) => {

    setSelectedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, selectedOptionValueId: newOptionValueId } : product
      )
    );
  };  

  const handleAddToCart = () => {
    const itemsToAdd = selectedProducts.filter(p => p.checked);

    addProductsToCartByFrequentlyBought(itemsToAdd)
    
  };

  return (
    <form
      className="tf-product-form-bundle"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="tf-bundle-products">
        {selectedProducts.map((product) => (
          <div
            key={product.id}
            className={`tf-bundle-product-item item-has-checkbox ${
              product.checked ? "check" : ""
            }`}
          >
            <div className="bundle-check">
              <input
                type="checkbox"
                className="tf-check"
                checked={product.checked}
                onChange={() => toggleCheckbox(product.id)}
              />
            </div>
            <a href="#" className="bundle-image">
              <Image
                alt="img-product"
                src={product.galleries[0].imageUrl}
                width={828}
                height={1241}
              />
            </a>
            <div className="bundle-info">
              <div className="bundle-title text-sm fw-medium">
                {product.name}
              </div>
              <div className="bundle-price text-md fw-medium">
                <span className="new-price">£{product.price.toFixed(2)}</span>{" "}
                
              </div>
              <div className="bundle-variant tf-select">
                <select
                  value={product.selectedOptionValueId}
                  onChange={(e) => handleOptionChange(product.id, e.target.value)}
                >
                  {product.options.flatMap(option => option.optionValues).map( option_value => (
                    <option key={option_value.id}>{option_value.value}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bundle-total-submit">
        <div className="text">Total price:</div>
        <span className="total-price">£{totalPrice} GBP</span>{" "}
      </div>
      <a
        href="#shoppingCart"
        data-bs-toggle="offcanvas"
        onClick={handleAddToCart}
        className="btn-submit-total tf-btn btn-out-line-primary"
      >
        Add selected to cart
      </a>      
    </form>
  );
}
