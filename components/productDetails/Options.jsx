"use client";

import React, { useState } from "react";

export default function Options({
  options = [],
  activeOptions = {}, 
  setActiveOptions,
}) {
  const [internalOptions, setInternalOptions] = useState(activeOptions);

  const currentOptions = setActiveOptions ? activeOptions : internalOptions;

  const handleSelectOptions = (id, value) => {
    const newOptions = { ...currentOptions, [id]: value };
    if (setActiveOptions) {
      
      setActiveOptions(newOptions);
    } else {
      
      setInternalOptions(newOptions);
    }
  };

  return (
    <>
      {options.map((option) => (
        <div
          key={option.id}
          className="variant-picker-item"
        >
          <div className="variant-picker-label">
            {option.name}:
            { (
              <span className="variant-picker-label-value">
                {currentOptions[option.id]}
              </span>
            )}
          </div>
          
          <div className="tf-variant-dropdown full" data-bs-toggle="dropdown">
              <div className="btn-select">
                <span className="text-sort-value">
                  {currentOptions[option.id]}
                </span>
                <span className="icon icon-arrow-down" />
              </div>
              <div className="dropdown-menu">
                {option.optionValues.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectOptions(option.id, item.value)}
                    className={`select-item ${
                      currentOptions[option.id] == item.value ? "active" : ""
                    }`}
                  >
                    <span className="text-value-item">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
        </div>
      ))}
    </>
  );
}