import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import Faqs from "@/components/otherPages/Faqs";
import React from "react";
import Link from "next/link";


export const metadata = {
  title: "Faqs",
  description: "Frequently asked questions about our products and services.",
};
export default function page() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-green topbar-bg" />
      <Header1 />
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
                <span className="text">FAQs</span>
              </li>
            </ul>
          </div>
        </div>       

      <Faqs />
      <Footer1 />
    </>
  );
}
