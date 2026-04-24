import React from 'react';

// 1. Dữ liệu hình ảnh được trích xuất từ HTML
const PRODUCT_IMAGES = [
  "https://ae01.alicdn.com/kf/S97699d1bad5745c7b647c64b09a808fdR.jpg?width=800&height=800&hash=1600",
  "https://ae01.alicdn.com/kf/Sef81a92ee3d64df684d1e8591e096093Q.jpg?width=790&height=1052&hash=1842",
  "https://ae01.alicdn.com/kf/S3f7dbe67254649778671a6092077dca3o.jpg?width=790&height=1102&hash=1892",
  "https://ae01.alicdn.com/kf/Sf33caddffd9a4cffaa5047e546e8fb4c0.jpg?width=790&height=1245&hash=2035",
  "https://ae01.alicdn.com/kf/S22ddce5c59624e279e65f27891c708c0E.jpg?width=790&height=1208&hash=1998",
  "https://ae01.alicdn.com/kf/Se6ebdb5e555f4c5e829d24208c5dbf0at.jpg?width=790&height=1011&hash=1801",
  "https://ae01.alicdn.com/kf/Sc6635082046d425b80dfb9a2fbe33b409.jpg?width=790&height=866&hash=1656",
  "https://ae01.alicdn.com/kf/Sc842b304c16e4437adf7450dfbc54fdaM.jpg?width=790&height=861&hash=1651",
  // Các hình ảnh bổ sung ở cuối
  "https://ae01.alicdn.com/kf/Sc14a0eb2fded47c1882a436f0e5a02a5o.jpg?width=790&height=697&hash=1487",
  "https://ae01.alicdn.com/kf/S50f76b4c73aa4a44b0b7f90c26409c56x.jpg?width=790&height=1165&hash=1955"
];

// 2. Dữ liệu FAQ
const FAQS = [
  {
    q: "What happens when you buy 1pcs wall sticker?",
    a: "A single wall sticker is like a huge piece of white paper and is easily broken during transport. Also, different batches may have color differences, so it is recommended to buy all at once."
  },
  {
    q: "How many pieces should I buy?",
    a: "One piece size is 70cm*1m (approx 0.7m²). Example: If your wall is 4m wide and 3m high (12m²), you calculate: 12 ÷ 0.7 ≈ 18 pieces. For safety, buy 2 extra pieces (Total 20)."
  },
  {
    q: "Can the sticker be cut?",
    a: "Yes, the wall sticker can be arbitrarily cut according to your request."
  },
  {
    q: "Can it be pasted on glass, ceramic tile, or latex paint?",
    a: "Yes, you can paste it on these surfaces."
  },
  {
    q: "Can it be used in the Bathroom, Kitchen, or Balcony?",
    a: "Yes. The product is waterproof, oil-proof, and mould-proof."
  },
  {
    q: "Why might there be a size error?",
    a: "Because the sticker is manually cut, there may be an error of 1-2cm, which is normal."
  }
];

const ProductDescription = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 font-sans text-gray-800">
      
      {/* --- Tiêu đề sản phẩm --- */}
      <h1 className="text-2xl font-bold mb-4 text-gray-900">
        3D Foam Brick Wall Stickers - Self Adhesive & Waterproof
      </h1>

      {/* --- Thông số kỹ thuật (Highlights) --- */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
        <h2 className="text-lg font-semibold mb-3">Specifications</h2>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li><strong>Material:</strong> XPE Foam (High quality)</li>
          <li><strong>Available Sizes:</strong> 70cm x 1m / 70cm x 5m / 70cm x 10m</li>
          <li><strong>Features:</strong> Self-adhesive back, waterproof, oil-proof, mould-proof.</li>
          <li><strong>Application:</strong> Living room, bedroom, bathroom, kitchen, balcony, etc.</li>
          <li><strong>Packing:</strong> Folded packing due to logistics (does not affect usage).</li>
        </ul>
      </div>

      {/* --- Hướng dẫn tính toán --- */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-blue-600 mb-2">
          How many rolls do you need?
        </h3>
        <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500 text-sm">
          <p className="mb-2">You generally calculate based on square meters (m²).</p>
          <p className="font-mono bg-white p-2 rounded inline-block mb-2">
            (Wall Width × Wall Height) ÷ 0.7 = Pieces needed
          </p>
          <p>
            <strong>Example:</strong> For a 12m² wall (4m × 3m): <br/>
            12 ÷ 0.7 ≈ 17.14. You should round up and add spares. <br/>
            <span className="text-red-500 font-bold">Recommendation: Buy 20 pieces to be safe.</span>
          </p>
        </div>
      </div>

      {/* --- Cảnh báo quan trọng --- */}
      <div className="mb-8 text-sm text-orange-700 bg-orange-50 p-3 rounded">
        <strong>Note:</strong> Since production batches update quickly, different batches may have slight color differences. 
        It is highly recommended to <u>buy the full amount required at once</u>.
      </div>

      {/* --- Phần hình ảnh (Gallery) --- */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Product Images</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRODUCT_IMAGES.map((imgUrl, index) => (
            <img 
              key={index} 
              src={imgUrl} 
              alt={`Product detail ${index + 1}`} 
              className="w-full h-auto rounded shadow-sm hover:shadow-md transition-shadow duration-300"
              loading="lazy"
            />
          ))}
        </div>
      </div>

      {/* --- Phần câu hỏi thường gặp (FAQ) --- */}
      <div className="border-t pt-6">
        <h3 className="text-xl font-bold mb-4 text-red-500">FAQ (Frequently Asked Questions)</h3>
        <div className="space-y-4">
          {FAQS.map((item, index) => (
            <div key={index} className="pb-4 border-b border-gray-100 last:border-0">
              <p className="font-semibold text-gray-900 mb-1">Q: {item.q}</p>
              <p className="text-gray-600 text-sm">A: {item.a}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ProductDescription;