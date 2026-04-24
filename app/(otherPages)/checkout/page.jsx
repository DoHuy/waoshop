import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import Checkout from "@/components/otherPages/Checkout";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Checkout",
  description: "Complete your purchase with our secure and user-friendly checkout process. Review your order, enter your shipping details, and choose your payment method to finalize your transaction. Enjoy a seamless shopping experience with us!",
};

export default function page() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-light-purple-2 topbar-bg" />
      <Header1 />
      <>
        <div className="tf-breadcrumb">
          <div className="container">
            <ul className="breadcrumb-list">
              <li className="item-breadcrumb">
                <Link href={`/`} className="text">
                  Home
                </Link>
              </li>
              <li className="item-breadcrumb dot">
                <span />
              </li>
              <li className="item-breadcrumb">
                <span className="text">Checkout</span>
              </li>
            </ul>
          </div>
        </div>
        <section className="page-title">
          <div className="container">
            <div className="box-title text-center justify-items-center">
              <h4 className="title mt-5">Express Checkout</h4>
            </div>
          </div>
        </section>
      </>
      <Checkout />
      <Footer1 />
    </>
  );
}
