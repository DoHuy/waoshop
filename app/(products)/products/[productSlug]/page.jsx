import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import Breadcumb from "@/components/productDetails/Breadcumb";
import Description1 from "@/components/productDetails/Description1";
import Details11 from "@/components/productDetails/Details11";
import RecommendedProdtcts from "@/components/productDetails/RecommendedProdtcts";
import Cookie from "@/components/modals/Cookie";
import Newsletter3 from "@/components/modals/NewsLetterModal3";
import React from "react";
import { productService, interactionService, contentService } from "@/lib/services";
import { notFound } from "next/navigation";

// export const runtime = 'edge'
// export const preferredRegion = 'auto'


export default async function ProductDetailPage({ params }) {

  const { productSlug } = await params;
  let product = null;
  let socialProductVideos = null;
  let productFaqs = null;
  let productReview = null;
  let relatedProducts = null;
  let frequentlyProducts = null;

  try {

    const produdctResp = await productService.getBySlug(productSlug);
    product = produdctResp.data;


    const [socialProductVideosResp, relatedProductsResp, productReviewResp, frequentlyProductsResp] = await Promise.all([
      contentService.getSocialVideos(),
      productService.getRelated(product.id),
      interactionService.getReviews(product.id),
      productService.getFrequentlyBought(product.id)
    ]);

    socialProductVideos = socialProductVideosResp.data.galleries;
    productReview = productReviewResp.data;
    relatedProducts = relatedProductsResp.data.products;
    frequentlyProducts = frequentlyProductsResp.data.products;

  } catch (error) {
    console.error("Error fetching product details:", error);
    product = null;
  }
  if (!product) {
    notFound();
  }
  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-light-purple-2 topbar-bg" />
      <Header1 />
      <Breadcumb product={product} />
      <Details11 product={product} frequentlyProducts={frequentlyProducts}/>
      <Description1 product={product} socialProductVideos={socialProductVideos} productFaqs={productFaqs} productReview={productReview}/>
      <RecommendedProdtcts relatedProducts={relatedProducts}/>
      <Footer1 paddingBottom />
      <Cookie />
      <Newsletter3 />
    </>
  );
}
