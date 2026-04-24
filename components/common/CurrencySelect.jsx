"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
// NOTE: removed CSS module to use global/theme classes

const optionsData = [
  {
    value: "uk",
    thumbnail: "/images/country/uk.png",
    text: "United Kingdom (GBP £)",
    selected: true,
  },
  {
    value: "fr",
    thumbnail: "/images/country/fr.png",
    text: "France (EUR €)",
  },
];

export default function CurrencySelect({ topStart = false, light = false }) {
  
  const [isDDOpen, setIsDDOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsDDOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      onClick={() => setIsDDOpen((pre) => !pre)}
      className={`dropdown bootstrap-select image-select center style-default type-currencies dropup ${
        light ? "color-white" : ""
      }`}
    >
      <button
        type="button"
        tabIndex={-1}
        className={`btn`}
        title={optionsData[0].text}
      >
        <div className="filter-option">
          <div className="filter-option-inner">
            <div className="filter-option-inner-inner">
              <Image src={optionsData[0].thumbnail} width={20} height={14} alt="flag" />
              {optionsData[0].text}
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
