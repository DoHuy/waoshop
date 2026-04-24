"use client";
import React from "react";
import Nav from "./Nav";
import Link from "next/link";
import CartLength from "../common/CartLength";
import Image from "next/image";
import { usePathname } from "next/navigation";
export default function Header1({
  parentClass = "header-default",
  fullWidth = false,
}) {
  const pathname = usePathname();
  return (
    <header id="header" className={parentClass}>
      <div className={fullWidth ? "container-full" : "container"}>
        <div className="row wrapper-header align-items-center">
          <div className="col-md-4 col-3 d-xl-none">
            <a
              href="#mobileMenu"
              className="mobile-menu"
              data-bs-toggle="offcanvas"
              aria-controls="mobileMenu"
            >
              <i className="icon icon-categories1" />
            </a>
          </div>
          <div className="col-xl-2 col-md-4 col-6">
            <Link href={`/`} className="logo-header">
              <Image
                alt="logo"
                className="logo"
                src="/images/logo/logo.svg"
                width={160}
                height={50}
              />
            </Link>
          </div>
          <div className="col-xl-8 d-none d-xl-block">
            <nav className="box-navigation text-center">
              <ul className="box-nav-menu">
                <Nav />
              </ul>
            </nav>
          </div>
          <div className="col-xl-2 col-md-4 col-3">
            <ul className="nav-icon d-flex justify-content-end align-items-center">
              <li className="nav-cart">
                <a
                  href="#shoppingCart"
                  data-bs-toggle={`${
                    pathname == "/cart-drawer-v2" ? "modal" : "offcanvas"
                  }`}
                  className="nav-icon-item"
                >
                  <i className="icon icon-cart" />
                  <span className="count-box">
                    <CartLength />
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
