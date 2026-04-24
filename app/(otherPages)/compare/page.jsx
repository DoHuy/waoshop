import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import Compare from "@/components/otherPages/Compare";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Compare",
  description: "Easily compare our products side by side to find the perfect fit for your needs. Our comparison tool allows you to evaluate features, prices, and customer reviews, helping you make an informed decision and choose the best product for you.",
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
                <span className="text">Compare Products</span>
              </li>
            </ul>
          </div>
        </div>
        <section className="s-title-page flat-spacing-2 pt-0">
          <div className="container">
            <h4 className="s-title letter-0 text-center">Compare Products</h4>
          </div>
        </section>
      </>
      <Compare />
      <Footer1 />
    </>
  );
}
