"use client";
import React, { useEffect, useContext, useState } from "react";
import {keyBy} from 'lodash';

const dataContext = React.createContext();

export const useContextElement = () => {
  return useContext(dataContext);
};

export default function Context({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);     
  const [totalDiscount, setTotalDiscount] = useState(0);
  
  const [quickViewItem, setQuickViewItem] = useState({}); 
  const [quickAddItem, setQuickAddItem] = useState(1);

  const [wishList, setWishList] = useState([]);

  const [compareItem, setCompareItem] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCompare = localStorage.getItem("compareItems");
      if (savedCompare) {
        setCompareItem(JSON.parse(savedCompare));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("compareItems", JSON.stringify(compareItem));
    }
  }, [compareItem]);

  const [locale, setLocale] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("locale") || "en";
    }
    return "en";
  });
  
  const [translations, setTranslations] = useState({}); 

  useEffect(() => {
    async function loadTranslations() {
      try {
        const res = await fetch(`/lang/${locale}.json`);
        if (!res.ok) {
          setTranslations({});
          return;
        }
        const json = await res.json();
        setTranslations(json);
      } catch (e) {
        console.error("Failed to load translations", e);
        setTranslations({});
      }
    }
    loadTranslations();
  }, [locale]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", locale);
    }
  }, [locale]);

  const t = (key, fallback = "") => {
    if (!key) return fallback || "";
    const parts = key.split(".");
    let cur = translations;
    
    for (const p of parts) {
      if (cur && Object.prototype.hasOwnProperty.call(cur, p)) {
        cur = cur[p];
      } else {
        return fallback || key;
      }
    }
    return cur ?? fallback ?? key;
  };

  useEffect(() => {
    const oldTotalPrice = cartProducts.reduce((accumulator, product) => {
      return accumulator + product.quantity * product.price;
    }, 0);

    const discountMapByProductID = getDiscountPriceByProductID(cartProducts)
    const discountTotalPrice = cartProducts.reduce((accumulator, variant) => {
      const discount = discountMapByProductID.has(variant.productId) ? discountMapByProductID.get(variant.productId)?.discount : 0
      return accumulator + variant.quantity * variant.price * discount 
    }, 0)
    setTotalPrice(oldTotalPrice - discountTotalPrice);
    setTotalDiscount(discountTotalPrice);
  }, [cartProducts]);

  const isAddedToCartProducts = (id, activedOptions) => {
    if(activedOptions) {
      const items = [...cartProducts]
      const variant = items.find( item => item.productId == id && item.options.every( opt => activedOptions[opt.optionId].trim() == opt.optionValue.trim()))
      return variant ? true : false
    }
    return false
  };


  const getDiscountPriceByProductID = (cartProducts) => {
    const discountMapByProductID = new Map();
    for (let index = 0; index < cartProducts.length; index++) {
      const variant = cartProducts[index];
      const variants = cartProducts.filter( item => item.productId == variant.productId)
      if(!variants) continue 
      const discountByQuantity = keyBy(variant.productPriceTiers, 'qty');

      const quantity = variants.reduce((result, item) => {
        return result + item.quantity
      }, 0)

      if(quantity == 1) {
        discountMapByProductID.set(variant.productId, discountByQuantity[1])
      } else if (quantity == 2 && discountByQuantity[2]) {
        discountMapByProductID.set(variant.productId, discountByQuantity[2]) 
      } else if (quantity >= 3 && discountByQuantity[3]) {
        discountMapByProductID.set(variant.productId, discountByQuantity[3]) 
      }
      
    }

    return discountMapByProductID;
  }

  const addProductToCart = (product, activedOptions, qty = 1) => {

    if (!isAddedToCartProducts(product.id, activedOptions)) {
      const variant = product.variants.find( item => {
        return item.options.every( opt => activedOptions[opt.optionId].trim() == opt.optionValue.trim())
      })
      if(variant) {
      const item = {
        ...variant,
        slug: product.slug,
        name: product.name,
        productPriceTiers: product.productPriceTiers,
        quantity: qty ? qty : 1,
      };

      setCartProducts((pre) => [...pre, item]);
      }
    }
  };

  const addProductsToCartByFrequentlyBought = (products) => {
    for(let product of products) {
      const variant = product.variants.find( item => item.options.every( opt => opt.optionValue == product.selectedOptionValueId))
      if(variant) {
        // check duplicate product in cart
        if(cartProducts.find( item => item.id == variant.id)) continue;    
        const item = {
          ...variant,
          slug: product.slug,
          name: product.name,
          productPriceTiers: product.productPriceTiers,
          quantity: 1,
        };

        setCartProducts((pre) => [...pre, item]);
      }
    }
    
  };

  const addProductToCartFromDeal = (variants, isModal = true) => {
    const items = [...cartProducts];
    for(const variant of variants) {
      const existedItemInCartIndex = items.findIndex( e => variant.id == e.id)
      if(existedItemInCartIndex > -1) {
        items[existedItemInCartIndex] = { ...items[existedItemInCartIndex], quantity: items[existedItemInCartIndex]?.quantity + 1}
      } else {
        items.push({...variant, quantity: 1})
      }
    }
    setCartProducts(items);

  };

  const updateQuantity = (id, qty, activedOptions) => {
    if (isAddedToCartProducts(id, activedOptions)) {
      let items = [...cartProducts];
      
      const itemIndex = items.findIndex((elm) => elm.productId == id && elm.options.every( opt => activedOptions[opt.optionId].trim() == opt.optionValue.trim()));
      
      if (itemIndex > -1) {
        let item = { ...items[itemIndex] };
        item.quantity = Number(qty);
        items[itemIndex] = item;
        setCartProducts(items);
      }
    }
  };

  const updateQuantityInCart = (variant, qty) => {
    let items = [...cartProducts];

    const itemIndex = items.findIndex((elm) => elm.id == variant.id);
      
    if (itemIndex > -1) {
        let item = { ...items[itemIndex] };
        item.quantity = Number(qty);
        items[itemIndex] = item;
        setCartProducts(items);    
    }
  };

  const addToCompareItem = (product) => {
    const isAlreadyAdded = compareItem.some((item) => item.id === product.id);
    if (!isAlreadyAdded) {
      setCompareItem((prev) => [...prev, product]);
    }
  };

  const removeFromCompareItem = (productId) => {
    setCompareItem((prev) => prev.filter((item) => item.id !== productId));
  };

  const isAddedtoCompareItem = (productId) => {
    return compareItem.some((item) => item.id === productId);
  };


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const items = JSON.parse(localStorage.getItem("cartList"));
      if (items?.length) {
        setCartProducts(items);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("cartList", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);


  const addToWishlist = (product) => {
    if (!wishList.includes(id)) {
      setWishList((pre) => [...pre, product]);
      
    } else {
      setWishList((pre) => pre.filter((elm) => elm != product.id));
    }
  };

  const removeFromWishlist = (product) => {
    if (wishList.includes(product.id)) {
      setWishList((pre) => [...pre.filter((elm) => elm != product.id)]);
    }
  };

  const isAddedtoWishlist = (id) => {
    if (wishList.includes(id)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("wishlist"));
    if (items?.length) {
      setWishList(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  // =========================================================
  // 7. EXPORT CONTEXT
  // =========================================================
  const contextElement = {
    // Cart
    cartProducts,
    setCartProducts,
    totalPrice,
    totalDiscount,
    addProductToCart,
    isAddedToCartProducts,
    updateQuantity,
    updateQuantityInCart,
    addProductToCartFromDeal,
    addProductsToCartByFrequentlyBought,
    
    // Quick View
    quickViewItem,
    setQuickViewItem,
    quickAddItem,
    setQuickAddItem,
    
    // Compare
    compareItem,
    setCompareItem,
    addToCompareItem,
    isAddedtoCompareItem,
    removeFromCompareItem,
    
    // i18n
    locale,
    setLocale,
    t,

    // wishlist
    removeFromWishlist,
    addToWishlist,
    isAddedtoWishlist,
    wishList,
  };

  return (
    <dataContext.Provider value={contextElement}>
      {children}
    </dataContext.Provider>
  );
}