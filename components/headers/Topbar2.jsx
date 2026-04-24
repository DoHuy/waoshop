import React from "react";
import CurrencySelect from "../common/CurrencySelect";

export default function Topbar2({
  parentClass = "tf-topbar bg-light-green topbar-bg",
  fullWidth = false,
}) {
  return (
    <div className={parentClass}>
      <div className={fullWidth ? "container-full" : "container"}>
        <div className="topbar-wraper">
          <div className="d-none d-xl-block flex-shrink-0">
            <ul className="topbar-left tf-social-icon">
              <li>
                <a
                  href="https://www.fb.com/"
                  className="social-item social-facebook"
                >
                  <i className="icon icon-fb" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/"
                  className="social-item social-instagram"
                >
                  <i className="icon icon-instagram" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/"
                  className="social-item social-tiktok"
                >
                  <i className="icon icon-tiktok" />
                </a>
              </li>
            </ul>
          </div>
          <div className="overflow-hidden">
            <div className="topbar-center marquee-wrapper">
              <div className="initial-child-container">
                <div className="marquee-child-item">
                  <p>Return extended to 14 days</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                <div className="marquee-child-item">
                  <p>Life-time Guarantes</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                <div className="marquee-child-item">
                  <p>Limited-Time Offer</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                {/* 2 */}
                <div className="marquee-child-item">
                  <p>Return extended to 14 days</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                <div className="marquee-child-item">
                  <p>Life-time Guarantes</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                <div className="marquee-child-item">
                  <p>Limited-Time Offer</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                {/* 3 */}
                <div className="marquee-child-item">
                  <p>Return extended to 14 days</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                <div className="marquee-child-item">
                  <p>Life-time Guarantes</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                <div className="marquee-child-item">
                  <p>Limited-Time Offer</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                {/* 4 */}
                <div className="marquee-child-item">
                  <p>Return extended to 14 days</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                <div className="marquee-child-item">
                  <p>Life-time Guarantes</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                <div className="marquee-child-item">
                  <p>Limited-Time Offer</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                {/* 5 */}
                <div className="marquee-child-item">
                  <p>Return extended to 14 days</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                <div className="marquee-child-item">
                  <p>Life-time Guarantes</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
                <div className="marquee-child-item">
                  <p>Limited-Time Offer</p>
                </div>
                <div className="marquee-child-item">
                  <span className="dot" />
                </div>
              </div>
            </div>
          </div>
          <div className="d-none d-xl-block flex-shrink-0">
            <div className="topbar-right">
              {/* <div className="tf-languages">
                <LanguageSelect topStart />
              </div> */}
              <div className="tf-currencies">
                <CurrencySelect topStart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
