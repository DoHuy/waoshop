import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import Features from "@/components/homes/home-skincare/Features";
import Products7 from "@/components/products/Products7";
import React from "react";
import Link from "next/link";
import ToastHandler from "@/components/utils/ToastHandler";
import { contentService, categoryService } from "@/lib/services";

export const metadata = {
  title: "Home Skincare",
  description: "Discover our curated selection of skincare products designed to nourish and revitalize your skin. From cleansers to serums, find everything you need for a radiant complexion.",
};

export default async function page( { searchParams }) {

  let products = [];
  let categoryFilteredData = [];
  let toastMessage = null;
  let isError = false;
  try {
    
      [products, categoryFilteredData] = await Promise.all([contentService.getShopInfo(searchParams), categoryService.getAll()]);

  } catch (err) {
    isError = true;
    toastMessage = `${err.message}`;
  }


  return (
    <>
      <ToastHandler message={toastMessage} isError={isError} />
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
                <span className="text">Shop</span>
              </li>
            </ul>
          </div>
        </div>      

      <Products7 products={products.data.products} filteredData={categoryFilteredData.data.categories} />
      <Features />
      <Footer1 />
    </>
  );
}
