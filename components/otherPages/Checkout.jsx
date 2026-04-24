"use client";

import React, { useState } from "react";
import { useContextElement } from "@/context/Context";
import Link from "next/link";
import Image from "next/image";
import PaypalBtn from "../payments/PaypalBtn";

export default function Checkout() {
  const { cartProducts, totalPrice, totalDiscount } = useContextElement();
  
  const [isMobileSummaryOpen, setMobileSummaryOpen] = useState(false);

  const [couponCode, setCouponCode] = useState("");
  const [couponAmount, setCouponAmount] = useState(0); 
  const [couponMessage, setCouponMessage] = useState({ type: "", text: "" });

  const shippingFee = 0;
  const taxFee = 0;

  const totalAfterFees = totalPrice ? (totalPrice + shippingFee + taxFee - couponAmount) : 0;
  const finalAmount = totalAfterFees > 0 ? totalAfterFees.toFixed(2) : "0.00";

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "SALE2026") {
      setCouponAmount(20);
      setCouponMessage({ type: "success", text: "Coupon 'SALE20' applied: -$20.00" });
    } else if (couponCode.trim() === "") {
        setCouponMessage({ type: "error", text: "Please enter a coupon." });
    } else {
      setCouponAmount(0);
      setCouponMessage({ type: "error", text: "Invalid coupon." });
    }
  };

  const handlePaypalSuccess = (detail) => {
    console.log("PayPal Success:", detail);
    alert(detail.message);
  };

  const handlePaypalError = (detail) => {
    console.log("PayPal Error:", detail);
    alert(`Payment failed: ${detail.message || 'An error occurred during payment.'}`);
  };

  const renderOrderSummary = () => (
    <>
      <div className="title text-lg fw-medium d-none d-xl-block">In your cart</div>
      
      {cartProducts.length ? (
        <>
          <ul
            className="product-list-container"
            style={{
              maxHeight: "450px",
              overflowY: "auto",
              padding: "10px",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              marginBottom: "20px",
              border: "1px solid #eee",
            }}
          >
            {cartProducts.map((product, i) => (
              <li
                key={product.id}
                className="order-item"
                style={{
                  display: "flex",
                  gap: "15px",
                  padding: "15px 0",
                  borderBottom: i === cartProducts.length - 1 ? "none" : "1px solid #eee",
                }}
              >
                <figure className="img-product" style={{ flexShrink: 0, margin: 0, position: 'relative' }}>
                  <Image
                    alt={product.name}
                    src={product.imageUrl}
                    width={65}
                    height={80}
                    style={{ objectFit: "cover", borderRadius: "8px", border: "1px solid #e1e1e1" }}
                  />
                  <span
                    className="quantity"
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                      background: "#666",
                      color: "#fff",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {product.quantity}
                  </span>
                </figure>
                <div className="content" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="info d-flex justify-content-between align-items-start">
                    <div>
                        <p className="name text-sm fw-medium" style={{ marginBottom: "4px" }}>
                        {product.name}
                        </p>
                        <span className="variant text-xs text-muted">{ product.options.map(item => item.optionValue).join("/ ")}</span>
                    </div>
                    <span className="price text-sm fw-medium">
                        {(product.price * product.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="p-4 text-center">
          Your Cart is empty.
          <Link className="tf-btn btn-dark2 animate-btn mt-3" href="/shop">
            Explore Products
          </Link>
        </div>
      )}

      <div className="discount-section" style={{ paddingBottom: "20px", borderBottom: "1px solid #eee", marginBottom: "20px" }}>
        <div className="d-flex gap-2">
            <input 
                type="text" 
                className="form-control" 
                placeholder="Discount code or gift card"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                style={{ height: "45px", fontSize: "14px" }}
            />
            <button 
                className="tf-btn btn-dark" 
                onClick={handleApplyCoupon}
                style={{ height: "45px", padding: "0 20px", whiteSpace: "nowrap" }}
            >
                Apply
            </button>
        </div>
        {couponMessage.text && (
            <div 
                className={`text-xs mt-2 fw-medium ${couponMessage.type === 'success' ? 'text-success' : 'text-danger'}`}
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
                {couponMessage.type === 'success' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                )}
                {couponMessage.text}
            </div>
        )}
      </div>

      <ul className="list-total">
        <li className="total-item text-sm d-flex justify-content-between">
          <span>Subtotal:</span>
          <span className="price-sub fw-medium">£{(totalPrice + totalDiscount).toFixed(2)} GBP</span>
        </li>
        <li className="total-item text-sm d-flex justify-content-between">
          <span>Discount:</span>
          <span className="old-price text-decoration-line-through text-dark-1">£{totalDiscount.toFixed(2)} GBP</span>
        </li>
        
        {couponAmount > 0 && (
           <li className="total-item text-sm d-flex justify-content-between">
            <span className="d-flex align-items-center gap-1">
                Coupon <span className="text-xs text-muted">({couponCode})</span>:
                <span 
                    style={{ cursor: "pointer", marginLeft: "5px" }} 
                    onClick={() => { setCouponAmount(0); setCouponCode(""); setCouponMessage({type:"", text:""}); }}
                    title="Remove coupon"
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </span>
            </span>
            <span className="old-price text-decoration-line-through text-dark-1">£{couponAmount.toFixed(2)} GBP</span>
          </li>
        )}

        <li className="total-item text-sm d-flex justify-content-between">
          <span>Shipping:</span>
          <span className="price-ship fw-medium">£{shippingFee.toFixed(2)} GBP</span>
        </li>
        <li className="total-item text-sm d-flex justify-content-between">
          <span>Tax:</span>
          <span className="price-tax fw-medium">£{taxFee.toFixed(2)} GBP</span>
        </li>
      </ul>
      <div
        className="subtotal text-lg fw-medium d-flex justify-content-between align-items-center"
        style={{ borderTop: "1px solid #eee", paddingTop: "15px", marginTop: "10px" }}
      >
        <span>Total:</span>
        <span className="total-price-order" style={{ fontSize: "20px" }}>
            <span className="text-lg fw-bold text-primary">£{finalAmount} GBP</span>
        </span>
      </div>
    </>
  );

  return (
    <div className="flat-spacing-25">
      
      <div className="d-block d-xl-none mb-4 border-bottom border-top" style={{ backgroundColor: "#fafafa" }}>
        <div className="container">
            <div 
                onClick={() => setMobileSummaryOpen(!isMobileSummaryOpen)}
                style={{ 
                    padding: "18px 0", 
                    cursor: "pointer", 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    userSelect: "none"
                }}
            >
                <div className="d-flex align-items-center text-main gap-2">
                    <span className="text-sm fw-medium" style={{ color: "#007bff" }}>
                        {isMobileSummaryOpen ? "Hide order summary" : "Show order summary"}
                    </span>
                    <svg 
                        width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#007bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        style={{ 
                            transform: isMobileSummaryOpen ? "rotate(180deg)" : "rotate(0deg)", 
                            transition: "transform 0.3s ease"
                        }}
                    >
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
                <div className="text-lg fw-bold text-primary">
                    £{finalAmount} GBP
                </div>
            </div>

            <div 
                style={{
                    maxHeight: isMobileSummaryOpen ? "2000px" : "0px",
                    opacity: isMobileSummaryOpen ? 1 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.4s ease-in-out, opacity 0.4s ease-in-out"
                }}
            >
                <div style={{ paddingBottom: "20px", borderTop: "1px solid #e1e1e1", paddingTop: "20px" }}>
                   
                    {renderOrderSummary()} 
                </div>
            </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          
          <div className="col-xl-8">
            <div className="box-ip-checkout" style={{ height: "100%" }}>
              <div className="express-checkout-container mb_32">
                <p className="text-sm text-main mb_16">
                  Complete your purchase securely with the payment methods listed below. Your shipping address will be imported automatically by using them.
                </p>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <div style={{ width: "100%", maxWidth: "500px", position: "relative", zIndex: 1 }}>
                    <PaypalBtn cartItems={cartProducts} onSuccess={handlePaypalSuccess} onError={handlePaypalError}/>
                  </div>
                </div>
              </div>

              <div className="text-center mt-4">
                <p className="text-sm text-muted">
                  By proceeding, you agree to our{" "}
                  <Link href="/term-and-condition" className="text-decoration-underline">Terms of Service</Link>.
                </p>
              </div>
            </div>
          </div>

          <div className="col-xl-4 d-none d-xl-block">
            <div className="tf-page-cart-sidebar">
              <div className="cart-box order-box">
                {renderOrderSummary()}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}