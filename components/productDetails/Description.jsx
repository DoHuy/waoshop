import React from "react";
import parse from 'html-react-parser';

export default function Description({product}) {
  const PRODUCT_IMAGES = [
    "https://ae01.alicdn.com/kf/S97699d1bad5745c7b647c64b09a808fdR.jpg?width=800&height=800&hash=1600",
    "https://ae01.alicdn.com/kf/Sef81a92ee3d64df684d1e8591e096093Q.jpg?width=790&height=1052&hash=1842"
  ];
  
  return (
    <>
      <style>
        {`
          

          .gallery-grid {
            display: grid;
            grid-template-columns: 1fr; /* 1 Ảnh 1 dòng */
            gap: 10px; 
            width: 100%;      
            margin: 0 auto; 
          }


          .gallery-image {
            width: auto;       /* Dùng kích thước thật của ảnh */
            max-width: 100%;   /* Giới hạn không vượt quá khung chứa (cho mobile) */
            height: auto;      /* Giữ nguyên tỷ lệ ảnh */
            display: block;
            margin: 0 auto;    /* Canh giữa ảnh trong khung */
          }

          /* Typography */
          .section-title {
            font-size: 36px;
            font-weight: 800;
            margin-bottom: 50px;
            text-align: center;
            color: #111;
            letter-spacing: -0.5px;
          }
          
          /* Text Layout */
          .text-layout-desktop {
             display: grid;
             grid-template-columns: 1fr 1fr;
             gap: 5px;
             margin-bottom: 80px; 
             align-items: start;
             width: 100%;
             margin-left: auto;
             margin-right: auto;
          }

          .text-block h4 {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 15px;
            color: #2c3e50;
          }

          .text-block p {
            font-size: 16px;
            color: #555;
            margin-bottom: 20px;
            text-align: justify;
          }

          /* --- MOBILE RESPONSIVE --- */
          @media (max-width: 900px) {
            

            .gallery-grid {
              gap: 30px;
              width: 100%; 
            }
            
            .text-layout-desktop {
                display: block;
                width: 100%;
                margin-bottom: 40px;
            }
            
            .text-block {
                margin-bottom: 30px;
            }

            .section-title {
              font-size: 24px;
              margin-bottom: 30px;
            }
            
            .gallery-item {
              border-radius: 12px;
              box-shadow: 0 4px 15px rgba(0,0,0,0.08);
              padding: 10px; /* Giảm padding trên mobile */
            }
          }
        `}
      </style>

      <div className="product-wrapper">
        
        {/* --- PHẦN TIÊU ĐỀ --- */}
        <div className="flat-title wow fadeInUp mt-4">
          <h4 className="title">{product.meta_title}</h4>
        </div>

        {/* --- PHẦN HÌNH ẢNH --- */}
        <div className="product-gallery">
          <div className="gallery-grid">
              {product.descriptionImages.map((item, index) => (
                  <div key={index} >
                    <img 
                        src={item.imageUrl} 
                        alt={item.altText} 
                        loading="lazy"
                    />
                  </div>
              ))}
          </div>
        </div>

      </div>
    </>
  );
}