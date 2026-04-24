import React from "react";

/**
 * OceanWave Component
 * @param {string} color - Mã màu dạng 'R, G, B' (Ví dụ: '0, 150, 255')
 * @param {string} background - Màu nền phía sau sóng (nếu cần blend)
 * @param {string} height - Chiều cao của sóng (Ví dụ: '100px', '15vh')
 * @param {boolean} isReversed - Lật ngược sóng (dùng cho phần chuyển tiếp từ header xuống)
 */
const OceanWave = ({ 
  color = "0, 150, 255", 
  height = "120px", 
  isReversed = false 
}) => {
  
  // Tạo object chứa biến CSS để điều khiển màu sắc động
  const waveStyles = {
    "--wave-color": color,
    height: height,
    transform: isReversed ? "rotate(180deg)" : "none",
  };

  return (
    <div className="ocean-wave-container" style={waveStyles}>
      <style>
        {`
          .ocean-wave-container {
            width: 100%;
            overflow: hidden;
            line-height: 0;
            margin: 0;
            padding: 0;
          }
          
          .waves {
            position: relative;
            width: 100%;
            height: 100%; /* Theo height của container */
            margin-bottom: -7px; /* Fix lỗi khoảng trắng nhỏ ở dưới cùng trên 1 số màn hình */
          }

          /* Animation */
          .parallax > use {
            animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
          }
          
          /* Layer 1: Đậm nhất, gần nhất, chạy nhanh nhất */
          .parallax > use:nth-child(1) {
            animation-delay: -2s;
            animation-duration: 7s;
            fill: rgba(var(--wave-color), 0.7);
          }
          
          /* Layer 2 */
          .parallax > use:nth-child(2) {
            animation-delay: -3s;
            animation-duration: 10s;
            fill: rgba(var(--wave-color), 0.5);
          }
          
          /* Layer 3 */
          .parallax > use:nth-child(3) {
            animation-delay: -4s;
            animation-duration: 13s;
            fill: rgba(var(--wave-color), 0.3);
          }
          
          /* Layer 4: Nhạt nhất, xa nhất, chạy chậm nhất */
          .parallax > use:nth-child(4) {
            animation-delay: -5s;
            animation-duration: 20s;
            fill: rgba(var(--wave-color), 0.1);
          }

          @keyframes move-forever {
            0% { transform: translate3d(-90px,0,0); }
            100% { transform: translate3d(85px,0,0); }
          }

          /* Responsive */
          @media (max-width: 768px) {
            .ocean-wave-container {
              height: 60px !important; /* Force height nhỏ hơn trên mobile */
            }
          }
        `}
      </style>

      <svg
        className="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className="parallax">
          {/* 4 lớp sóng xếp chồng lên nhau */}
          <use xlinkHref="#gentle-wave" x="48" y="0" />
          <use xlinkHref="#gentle-wave" x="48" y="3" />
          <use xlinkHref="#gentle-wave" x="48" y="5" />
          <use xlinkHref="#gentle-wave" x="48" y="7" />
        </g>
      </svg>
    </div>
  );
};

export default OceanWave;