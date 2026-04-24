"use client";

import ListProducts from "./ListProducts";
import GridProducts from "./GridProducts";
import FilterModal from "./FilterModal";
import LayoutHandler from "./LayoutHandler";
import { useEffect, useReducer, useRef, useState } from "react";
import { initialState, reducer } from "@/reducer/filterReducer";

export default function Products7({ products = [], fullWidth = false, filteredData = [] }) {
  const [activeLayout, setActiveLayout] = useState(4);
  const [state, dispatch] = useReducer(reducer, initialState);

  const [loading, setLoading] = useState(false);
  const [loadedItems, setLoadedItems] = useState([]);

  const {
    price,
    availability,
    filtered,
    sortingOption,
    sorted,
  } = state;

  const allProps = {
    ...state,
    setPrice: (value) => dispatch({ type: "SET_PRICE", payload: value }),
    setCurrentPage: (value) =>
      dispatch({ type: "SET_CURRENT_PAGE", payload: value }),
    setItemPerPage: (value) => {
      dispatch({ type: "SET_CURRENT_PAGE", payload: 1 }),
        dispatch({ type: "SET_ITEM_PER_PAGE", payload: value });
    },
    setSortingOption: (value) =>
      dispatch({ type: "SET_SORTING_OPTION", payload: value }),

    clearFilter: () => {
      dispatch({ type: "CLEAR_FILTER" });
    },

    filteredData,
  };

  useEffect(() => {
    const safeProducts = Array.isArray(products) ? products : [];
    
    let filteredArrays = [];

    if (availability !== "All") {
      const filteredByavailability = safeProducts.filter(
        (elm) => availability === elm.in_stock
      );
      filteredArrays = [...filteredArrays, filteredByavailability];
    }
    
    const filteredByPrice = safeProducts.filter((elm) => {
      const productPrice = elm?.variants?.[0]?.price || 0; 
      return productPrice >= price[0] && productPrice <= price[1];
    });
    
    filteredArrays = [...filteredArrays, filteredByPrice];

    const commonItems = safeProducts.filter((item) =>
      filteredArrays.every((array) => array.includes(item))
    );
    
    dispatch({ type: "SET_FILTERED", payload: commonItems });
  }, [price, availability, products]);

  useEffect(() => {
    if (sortingOption === "Price Ascending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => {
          const priceA = a?.variants?.[0]?.price || 0;
          const priceB = b?.variants?.[0]?.price || 0;
          return priceA - priceB;
        }),
      });
    } else if (sortingOption === "Price Descending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => {
          const priceA = a?.variants?.[0]?.price || 0;
          const priceB = b?.variants?.[0]?.price || 0;
          return priceB - priceA;
        }),
      });
    } else if (sortingOption === "Title Ascending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => (a?.name || "").localeCompare(b?.name || "")),
      });
    } else if (sortingOption === "Title Descending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => (b?.name || "").localeCompare(a?.name || "")),
      });
    } else {
      dispatch({ type: "SET_SORTED", payload: filtered });
    }
    dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
  }, [filtered, sortingOption]);

  useEffect(() => {
    setLoadedItems(sorted.slice(0, 8));
  }, [sorted]);

  const handleLoad = () => {
    if (loading || loadedItems.length >= sorted.length) return;

    setLoading(true);
    setTimeout(() => {
      setLoadedItems((pre) => [
        ...pre,
        ...sorted.slice(pre.length, pre.length + 4),
      ]);
      setLoading(false);
    }, 1000);
  };

  const elementRef = useRef(null);
  const elementRef2 = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleLoad();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current && activeLayout === 1) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [loading, sorted, loadedItems, activeLayout]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleLoad();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef2.current && activeLayout !== 1) {
      observer.observe(elementRef2.current);
    }

    return () => {
      if (elementRef2.current) {
        observer.unobserve(elementRef2.current);
      }
    };
  }, [loading, sorted, loadedItems, activeLayout]);

  return (
    <>
      <section className="flat-spacing-24">
        <div className={fullWidth ? "container-full" : "container"}>
          <div className="tf-shop-control">
            <div className="tf-group-filter">
              <a
                href="#filterShop"
                data-bs-toggle="offcanvas"
                aria-controls="filterShop"
                className="tf-btn-filter"
              >
                <span className="icon icon-filter" />
                <span className="text">Filter</span>
              </a>
              <div className="tf-dropdown-sort" data-bs-toggle="dropdown">
                <div className="btn-select">
                  <span className="text-sort-value">{sortingOption}</span>
                  <span className="icon icon-arr-down" />
                </div>
                <div className="dropdown-menu">
                  {[
                    "Sort by (Default)",
                    "Title Ascending",
                    "Title Descending",
                    "Price Ascending",
                    "Price Descending",
                  ].map((elm, i) => (
                    <div
                      key={i}
                      className={`select-item ${
                        sortingOption == elm ? "active" : ""
                      }`}
                      onClick={() => allProps.setSortingOption(elm)}
                      data-sort-value="best-selling"
                    >
                      <span className="text-value-item">{elm}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <ul className="tf-control-layout">
              <LayoutHandler
                setActiveLayout={setActiveLayout}
                activeLayout={activeLayout}
              />
            </ul>
          </div>
          <div className="wrapper-control-shop">
            {(availability != "All" ||
              price.join("-") != [5, 300].join("-")) && (
              <div className="meta-filter-shop" style={{}}>
                <div id="product-count-grid" className="count-text">
                  <span className="count">{sorted.length}</span>Product
                  {sorted.length > 1 ? "s" : ""} found
                </div>

                <div id="applied-filters">
                  {availability != "All" ? (
                    <span
                      className="filter-tag"
                      onClick={() => allProps.setAvailability("All")}
                    >
                      <span className="remove-tag icon-close"></span>{" "}
                      Availability: {availability ? "In Stock" : "Unavailable"}
                    </span>
                  ) : (
                    ""
                  )}
                  {price.join("-") != [5, 300].join("-") ? (
                    <span
                      className="filter-tag"
                      onClick={() => allProps.setPrice([5, 300])}
                    >
                      <span
                        className="remove-tag icon-close"
                        data-filter="price"
                      />
                      Price: ${price[0]} - ${price[1]}
                    </span>
                  ) : (
                    ""
                  )}
                  
                </div>
                {availability != "All" ||
                price.join("-") != [5, 300].join("-")
                ? (
                  <button
                    id="remove-all"
                    className="remove-all-filters"
                    onClick={allProps.clearFilter}
                  >
                    <i className="icon icon-close" /> Clear all filter
                  </button>
                ) : (
                  ""
                )}
              </div>
            )}

            {activeLayout == 1 ? (
              <div className="tf-list-layout wrapper-shop" id="listLayout">
                <ListProducts products={loadedItems} />
                {/* Pagination Logic for List View */}
                {loadedItems.length < sorted.length && (
                  <div className="wd-load" ref={elementRef}>
                    <button
                      id="loadMoreListBtn"
                      className={`tf-btn btn-out-line-dark2 tf-loading loadmore  ${
                        loading ? "loading" : ""
                      } `}
                      onClick={handleLoad} 
                    >
                      <span className="text">Load more</span>
                      <div className="spinner-circle">
                        <span className="spinner-circle1 spinner-child" />
                        <span className="spinner-circle2 spinner-child" />
                        <span className="spinner-circle3 spinner-child" />
                        <span className="spinner-circle4 spinner-child" />
                        <span className="spinner-circle5 spinner-child" />
                        <span className="spinner-circle6 spinner-child" />
                        <span className="spinner-circle7 spinner-child" />
                        <span className="spinner-circle8 spinner-child" />
                        <span className="spinner-circle9 spinner-child" />
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div
                className={`wrapper-shop tf-grid-layout tf-col-${activeLayout}`}
                id="gridLayout"
              >
                <GridProducts products={loadedItems} />
                
                {loadedItems.length < sorted.length && (
                  <div
                    className="wd-load d-flex justify-content-center"
                    ref={elementRef2}
                  >
                    <button
                      id="loadMoreGridBtn"
                      className={`tf-btn btn-out-line-dark2 tf-loading loadmore  ${
                        loading ? "loading" : ""
                      } `}
                      onClick={handleLoad}
                    >
                      <span className="text">Load more</span>
                      <div className="spinner-circle">
                        <span className="spinner-circle1 spinner-child" />
                        <span className="spinner-circle2 spinner-child" />
                        <span className="spinner-circle3 spinner-child" />
                        <span className="spinner-circle4 spinner-child" />
                        <span className="spinner-circle5 spinner-child" />
                        <span className="spinner-circle6 spinner-child" />
                        <span className="spinner-circle7 spinner-child" />
                        <span className="spinner-circle8 spinner-child" />
                        <span className="spinner-circle9 spinner-child" />
                      </div>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      <FilterModal allProps={allProps}/>
    </>
  );
}