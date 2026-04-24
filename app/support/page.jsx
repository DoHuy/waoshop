import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import React from "react";
import Link from "next/link";
import ChatWidget from "@/components/common/ChatWidget"; 

export const metadata = {
  title: "Chat with Us",
  description: "Chat with our support team for assistance with your orders, products, or any inquiries you may have. We're here to help you 24/7!",
};

export default async function page() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-light-purple-2 topbar-bg" />
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
              <span className="text">Chat with Us</span>
            </li>
          </ul>
        </div>
      </div>      
      <section className="flat-spacing-1">
        <div className="container">
          <ChatWidget />
        </div>
      </section>

      <Footer1 />
    </>
  );
}