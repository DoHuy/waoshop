import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import Contact from "@/components/otherPages/Contact";
import React from "react";
import Breadcumb from "@/components/common/Breadcumb";



export const metadata = {
  title: "Contact Us",
  description: "Contact us for any inquiries or support",
};


export default function page() {
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header1 />
      <Breadcumb pageName="Contact Us" pageTitle="Contact Us" />
      <Contact />
      <Footer1 />
    </>
  );
}
