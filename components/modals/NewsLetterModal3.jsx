"use client";
import React, { useEffect, useRef, useState } from "react";
import CountdownTimer from "../common/Countdown";

export default function Newsletter3({ coupon }) {
  const modalElement = useRef();
  // 1. Tạo thêm ref để lưu trữ đối tượng Bootstrap Modal
  const modalInstance = useRef(null); 
  const [isCopied, setIsCopied] = useState(false);
  
  const couponCode = coupon || "SALE2026"; 

  useEffect(() => {
    const showModal = async () => {
      const bootstrap = await import("bootstrap");
      const myModal = new bootstrap.Modal(
        document.getElementById("newsletterPopup"),
        {
          keyboard: false,
        }
      );

      // 2. Lưu instance vào ref để dùng ở chỗ khác
      modalInstance.current = myModal;

      if (!coupon) { 
        await new Promise((resolve) => setTimeout(resolve, 2000));
        myModal.show();
      }

      modalElement.current?.addEventListener("hidden.bs.modal", () => {
        myModal.hide();
      });
    };

    showModal();
  }, [coupon]);

  // --- HÀM COPY ĐÃ TỐI ƯU CHO MOBILE ---
  const handleCopy = async () => {
    const textToCopy = couponCode;
    
    const triggerSuccess = () => {
      setIsCopied(true);
      
      // 3. Đợi 1 chút cho người dùng thấy chữ "COPIED" rồi mới đóng
      setTimeout(() => {
        if (modalInstance.current) {
            modalInstance.current.hide(); // Gọi lệnh đóng modal
        }
        setIsCopied(false);
      }, 500); // Đợi 1000ms (0.5 giây)
    };

    // ... (Phần logic copy giữ nguyên như cũ) ...
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        triggerSuccess();
        return;
      } catch (err) {}
    }

    try {
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      textArea.setAttribute("readonly", "");
      textArea.style.contain = "strict";
      textArea.style.position = "absolute";
      textArea.style.left = "-9999px";
      textArea.style.fontSize = "12pt";

      document.body.appendChild(textArea);
      
      const range = document.createRange();
      range.selectNodeContents(textArea);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      textArea.setSelectionRange(0, 999999);

      const successful = document.execCommand('copy');
      
      document.body.removeChild(textArea);
      
      if (successful) triggerSuccess();
    } catch (err) {
      console.error("Unable to copy", err);
    }
  };

  return (
    // ... (Phần JSX giữ nguyên không thay đổi) ...
    <div
      className="modal modalCentered auto-popup fade modal-newsletter style-absolute"
      id="newsletterPopup"
      ref={modalElement}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-top">
            <img
              className="lazyload"
              data-src="/images/section/newsletter-1.jpg"
              src="/images/section/newsletter-1.jpg"
              alt="images"
            />
            <span
              className="icon icon-close btn-hide-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="modal-bottom text-center">
            <div className="product-info-countdown">
              <div className="countdown-title">
                {/* SVG Icon giữ nguyên */}
                <svg
                  className="tf-ani-tada"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                    {/* ... path svg ... */}
                  <g clipPath="url(#clip0_2579_1618)">
                    <path d="M4.68555 3.17525L3.7513 2.23906C3.53458 2.02191 3.2463 1.90234 2.93952 1.90234C2.63273 1.90234 2.34445 2.02194 2.12777 2.23906L1.45055 2.91775C1.00477 3.36441 1.00477 4.09122 1.45055 4.53791L2.38677 5.47606C2.47833 5.56781 2.59842 5.61369 2.71858 5.61369C2.83836 5.61369 2.9582 5.56803 3.0497 5.47675C3.23295 5.29388 4.50189 4.02078 4.68489 3.83816C4.86811 3.65531 4.86842 3.35853 4.68555 3.17525Z" fill="#105C6E" />
                    <path d="M8 0.09375C7.74112 0.09375 7.53125 0.303625 7.53125 0.5625V2.0625C7.53125 2.32137 7.74112 2.53125 8 2.53125C8.25888 2.53125 8.46875 2.32137 8.46875 2.0625V0.5625C8.46875 0.303625 8.25888 0.09375 8 0.09375Z" fill="#26879C" />
                    <path d="M9.15625 0H6.84375C6.58487 0 6.375 0.209875 6.375 0.46875C6.375 0.727625 6.58487 0.9375 6.84375 0.9375H9.15625C9.41512 0.9375 9.625 0.727625 9.625 0.46875C9.625 0.209875 9.41512 0 9.15625 0Z" fill="#DE513C" />
                    <path d="M8 0H6.84375C6.58487 0 6.375 0.209875 6.375 0.46875C6.375 0.727625 6.58487 0.9375 6.84375 0.9375H8V0Z" fill="#FC6249" />
                    <path d="M13.0826 3.70676C11.7251 2.34639 9.92 1.59717 7.99997 1.59717C6.07994 1.59717 4.27488 2.34639 2.91731 3.70676C1.56 5.06689 0.8125 6.87523 0.8125 8.7986C0.8125 10.722 1.56 12.5303 2.91731 13.8904C4.27488 15.2508 6.07994 16 7.99997 16C9.92 16 11.7251 15.2508 13.0826 13.8904C14.4399 12.5303 15.1874 10.722 15.1874 8.7986C15.1874 6.87523 14.4399 5.06689 13.0826 3.70676Z" fill="#DE513C" />
                    <path d="M7.99997 1.59717C6.07994 1.59717 4.27488 2.34639 2.91731 3.70676C1.56 5.06689 0.8125 6.87523 0.8125 8.7986C0.8125 10.722 1.56 12.5303 2.91731 13.8904C4.27488 15.2508 6.07994 16 7.99997 16V1.59717Z" fill="#FC6249" />
                    <path d="M7.99989 3.39185C5.02433 3.39185 2.60352 5.81728 2.60352 8.79856C2.60352 11.7798 5.02433 14.2053 7.99989 14.2053C10.9755 14.2053 13.3963 11.7798 13.3963 8.79856C13.3963 5.81728 10.9755 3.39185 7.99989 3.39185Z" fill="#96D1D9" />
                    <path d="M7.99989 3.39185C5.02433 3.39185 2.60352 5.81728 2.60352 8.79856C2.60352 11.7798 5.02433 14.2053 7.99989 14.2053V3.39185Z" fill="#F4F2E6" />
                    <path d="M8 4.56272C8.25888 4.56272 8.46875 4.35285 8.46875 4.09397V3.41247C8.31422 3.3991 8.15794 3.39185 8 3.39185C7.84206 3.39185 7.68578 3.3991 7.53125 3.41247V4.09397C7.53125 4.35285 7.74112 4.56272 8 4.56272Z" fill="#105C6E" />
                    <path d="M8 13.0344C7.74112 13.0344 7.53125 13.2443 7.53125 13.5032V14.1847C7.68578 14.198 7.84206 14.2053 8 14.2053C8.15794 14.2053 8.31422 14.198 8.46875 14.1847V13.5032C8.46875 13.2443 8.25888 13.0344 8 13.0344Z" fill="#105C6E" />
                    <path d="M13.3754 8.32983H12.7041C12.4452 8.32983 12.2354 8.53971 12.2354 8.79858C12.2354 9.05746 12.4452 9.26733 12.7041 9.26733H13.3754C13.3887 9.1128 13.3959 8.95652 13.3959 8.79858C13.3959 8.64065 13.3887 8.48437 13.3754 8.32983Z" fill="#105C6E" />
                    <path d="M3.76405 8.79858C3.76405 8.53971 3.55417 8.32983 3.2953 8.32983H2.62402C2.6107 8.48437 2.60352 8.64065 2.60352 8.79858C2.60352 8.95652 2.6107 9.1128 2.62402 9.26733H3.2953C3.55417 9.26733 3.76405 9.05746 3.76405 8.79858Z" fill="#105C6E" />
                    <path d="M9.15643 8.52792H8.49512V6.63208C8.49512 6.37321 8.28524 6.16333 8.02637 6.16333C7.76749 6.16333 7.55762 6.37321 7.55762 6.63208V8.99667C7.55762 9.25555 7.76749 9.46542 8.02637 9.46542H9.15643C9.4153 9.46542 9.62518 9.25555 9.62518 8.99667C9.62518 8.7378 9.4153 8.52792 9.15643 8.52792Z" fill="#105C6E" />
                  </g>
                  <defs>
                    <clipPath id="clip0_2579_1618">
                      <rect width={16} height={16} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <h5 className="title">
                  <span className="text-primary fw-normal">HURRY UP!</span> Sale
                  ends in:
                  <div
                    className="js-countdown countdown-box"
                    data-timer={1007500}
                    data-labels="D,H,M,S"
                  >
                    <CountdownTimer
                      style={5}
                      targetDate="2026/06/30 23:59:59"
                    />
                  </div>
                </h5>
              </div>
            </div>

            <div className="form-newsletter">
              <div className="mb_20">
                <div 
                    onClick={handleCopy}
                    className="position-relative d-flex align-items-center justify-content-center"
                    style={{ 
                        cursor: "pointer",
                        border: "2px dashed #105C6E", 
                        borderRadius: "8px",
                        padding: "12px 15px",
                        backgroundColor: isCopied ? "#e6ffed" : "#f8f9fa", 
                        transition: "all 0.3s ease",
                        minHeight: "50px",
                        userSelect: "none", 
                        WebkitUserSelect: "none"
                    }}
                    title="Click to copy code"
                >
                    {isCopied ? (
                        <div className="d-flex align-items-center animate-fade-in">
                            <i className="icon icon-check text-success me-2" style={{fontSize: '18px'}}/>
                            <span className="fw-bold text-success" style={{fontSize: '16px'}}>
                                COPIED!
                            </span>
                        </div>
                    ) : (
                        <div className="d-flex align-items-center justify-content-between w-100 px-3">
                            <span className="fw-bold" style={{fontSize: '18px', letterSpacing: '2px', color: '#105C6E'}}>
                                {couponCode}
                            </span>
                            <div className="d-flex align-items-center text-muted" style={{fontSize: '12px'}}>
                                <span className="me-2">COPY</span>
                                <i className="icon icon-copy" style={{fontSize: '16px'}}/> 
                            </div>
                        </div>
                    )}
                </div>
              </div>
              
              <p className="text-center text-muted" style={{fontSize: '14px'}}>
                  {isCopied ? "Coupon copied to clipboard." : "Click the box above to copy the coupon."}
              </p>
            </div>

            <ul className="tf-social-icon style-default justify-content-center">
              <li>
                <a href="https://www.facebook.com/" className="social-facebook">
                  <i className="icon icon-fb2" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/"
                  className="social-instagram"
                >
                  <i className="icon icon-instagram" />
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/" className="social-tiktok">
                  <i className="icon icon-tiktok" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}