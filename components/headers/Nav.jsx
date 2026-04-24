"use client";
import React from "react";

export default function Nav() {
  return (
    <>
      <li className="menu-item">
        <a href="/shop" className={`item-link`}>
          Shop
          <i className="icon" />
        </a>
      </li>
      <li className="menu-item position-relative">
        <a href="/support" className={`item-link`}>
          Chat with Us
          <i className="icon" />
        </a>
      </li>
    </>
  );
}
