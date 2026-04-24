"use client";
import { useState, useEffect } from "react";



export default function Reviews({ reviews = [] }) {
  console.log("Reviews component received reviews:", reviews);
  const [visibleCount, setVisibleCount] = useState(2); 

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentMedia, setCurrentMedia] = useState(null);
  const [mediaType, setMediaType] = useState("image");
  const [avatarPreview, setAvatarPreview] = useState(null);

  const openLightbox = (url, type) => {
    setCurrentMedia(url);
    setMediaType(type);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentMedia(null);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setAvatarPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 2);
  };

  return (
    <>
      <style jsx>{`
        /* --- RESPONSIVE LAYOUT (Mobile giữ nguyên, Desktop co lại) --- */
        
        /* Mặc định cho Mobile */
        .review-section, .review-heading {
            width: 100%;
        }

        /* Áp dụng cho màn hình từ 768px trở lên (Tablet/Desktop) */
        @media (min-width: 768px) {
            .review-section, .review-heading {
                width: 85%;       /* Co lại còn 85% */
                margin-left: auto; /* Căn giữa */
                margin-right: auto;
            }
        }

        /* --- CÁC CSS KHÁC --- */
        .review-media-gallery { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 15px; }
        .review-media-item { width: 80px; height: 80px; border-radius: 8px; overflow: hidden; border: 1px solid #e5e5e5; cursor: pointer; position: relative; transition: transform 0.2s; }
        .review-media-item:hover { transform: scale(1.05); border-color: #000; }
        .review-media-item img, .review-media-item video { width: 100%; height: 100%; object-fit: cover; }
        .video-indicator { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.5); color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; pointer-events: none; }
        .lightbox-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0, 0, 0, 0.9); z-index: 9999; display: flex; justify-content: center; align-items: center; padding: 20px; }
        .lightbox-content { max-width: 90%; max-height: 90vh; position: relative; }
        .lightbox-content img, .lightbox-content video { max-width: 100%; max-height: 90vh; object-fit: contain; border-radius: 4px; box-shadow: 0 0 20px rgba(255,255,255,0.1); }
        .close-btn { position: absolute; top: 20px; right: 30px; color: white; font-size: 40px; cursor: pointer; z-index: 10000; background: none; border: none; }
        .avatar-upload-container { display: flex; align-items: center; gap: 20px; margin-bottom: 20px; }
        .avatar-preview { width: 80px; height: 80px; border-radius: 50%; border: 2px dashed #ccc; display: flex; justify-content: center; align-items: center; overflow: hidden; background-color: #f9f9f9; cursor: pointer; transition: all 0.3s ease; }
        .avatar-preview:hover { border-color: #000; background-color: #eee; }
        .avatar-preview img { width: 100%; height: 100%; object-fit: cover; }
        .upload-text { display: flex; flex-direction: column; }
        .upload-text span { font-weight: 500; margin-bottom: 4px; }
        .upload-text small { color: #888; font-size: 12px; }
        #avatar-input { display: none; }
        .view-more-container { display: flex; justify-content: center; margin-top: 30px; margin-bottom: 20px; }
        .btn-view-more { padding: 10px 30px; border: 1px solid #e5e5e5; background: #f59494; border-radius: 4px; font-weight: 500; cursor: pointer; transition: all 0.3s; }
        .btn-view-more:hover { background: #000; color: #fff; border-color: #000; }
        .btn-centered-container { display: flex; justify-content: center; width: 100%; margin-top: 20px; margin-bottom: 20px; }    

        .verified-badge {
            display: inline-flex;
            align-items: center;
            gap: 3px;
            color: #22c55e;
            font-size: 12px;
            margin-left: 8px;
            font-weight: 500;
            background: rgba(34, 197, 94, 0.1);
            padding: 2px 6px;
            border-radius: 4px;
            vertical-align: middle;
        }
      `}</style>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="close-btn" onClick={closeLightbox}>&times;</button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {mediaType === "image" ? (
              <img src={currentMedia} alt="Full size review" />
            ) : (
              <video controls autoPlay>
                <source src={currentMedia} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      )}

      <div>
      <div className="review-heading">
        <h6 className="title">Customer review</h6>
        <div className="box-rate-review">
          <div className="rating-summary">
            <ul className="list-star">
              <li>
                <i className="icon icon-star" />
              </li>
              <li>
                <i className="icon icon-star" />
              </li>
              <li>
                <i className="icon icon-star" />
              </li>
              <li>
                <i className="icon icon-star" />
              </li>
              <li>
                <i className="icon icon-star" />
              </li>
              <li>
                <span className="count-star text-md">(3)</span>
              </li>
            </ul>
            <span className="text-md rating-average">4.5/5.0</span>
          </div>
          <div className="rating-breakdown">
            <div className="rating-breakdown-item">
              <div className="rating-score">
                5 <i className="icon icon-star" />
              </div>
              <div className="rating-bar">
                <div className="value" style={{ width: "100%" }} />
              </div>
              <span className="rating-count">10</span>
            </div>
            <div className="rating-breakdown-item">
              <div className="rating-score">
                4 <i className="icon icon-star" />
              </div>
              <div className="rating-bar">
                <div className="value" style={{ width: "50%" }} />
              </div>
              <span className="rating-count">5</span>
            </div>
            <div className="rating-breakdown-item">
              <div className="rating-score">
                3 <i className="icon icon-star" />
              </div>
              <div className="rating-bar">
                <div className="value" style={{ width: "0%" }} />
              </div>
              <span className="rating-count">3</span>
            </div>
            <div className="rating-breakdown-item">
              <div className="rating-score">
                2 <i className="icon icon-star" />
              </div>
              <div className="rating-bar">
                <div className="value" style={{ width: "0%" }} />
              </div>
              <span className="rating-count">3</span>
            </div>
            <div className="rating-breakdown-item">
              <div className="rating-score">
                1 <i className="icon icon-star" />
              </div>
              <div className="rating-bar">
                <div className="value" style={{ width: "0%" }} />
              </div>
              <span className="rating-count">3</span>
            </div>
          </div>
        </div>
        <a href="#form-review" className="tf-btn btn-dark2 animate-btn mb-4">
          Write a review
        </a>
      </div>

        <div className="review-section">
          <ul className="review-list">
            {reviews.slice(0, visibleCount).map((review) => (
              <li className="review-item" key={review.id}>
                <div className="review-avt">
                  <img alt="avt" src={review.avatar} width={100} height={100} />
                </div>
                <div className="review-content">
                  <div className="review-info">
                    <div className="review-meta">
                      <span className="review-author fw-medium text-md">
                        {review.name}
                        {review.verified && (
                            <span className="verified-badge" title="Verified Purchase">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                                Verified
                            </span>
                        )}
                      </span>
                      <span className="review-date text-sm">{review.date}</span>
                    </div>
                    <div className={`list-star ${review.rating === 4 ? "star-4" : ""}`}>
                      {[...Array(5)].map((_, index) => (
                        <i className="icon icon-star" key={index} />
                      ))}
                    </div>
                  </div>
                  <p className="text text-sm text-main-4">{review.comment}</p>
                  <div className="review-media-gallery">
                    {review.images && review.images.map((img, index) => (
                        <div className="review-media-item" key={`img-${index}`} onClick={() => openLightbox(img, "image")}>
                          <img src={img} alt={`evidence-${index}`} loading="lazy" />
                        </div>
                      ))}
                    {review.videos && review.videos.map((vid, index) => (
                        <div className="review-media-item" key={`vid-${index}`} onClick={() => openLightbox(vid, "video")}>
                          <video muted><source src={vid} type="video/mp4" /></video>
                          <div className="video-indicator">▶</div>
                        </div>
                      ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          
          {visibleCount < reviews.length && (
              <div className="view-more-container">
                  <button className="btn-view-more" onClick={handleViewMore}>
                      View More Discusions 
                  </button>
              </div>
          )}

          <form id="form-review" onSubmit={(e) => e.preventDefault()} className="form-review">
             <h6 className="title">Write a Discusion</h6>
            <p className="note text-md text-main-4">
              Your email address will not be published.&nbsp;Required fields are marked&nbsp;*
            </p>
            
            <div className="box-rating">
              <span className="text-md">Your rating *</span>
              <div className="list-rating-check">
                <input type="radio" id="star5" name="rate" defaultValue={5} />
                <label htmlFor="star5" title="text" />
                <input type="radio" id="star4" name="rate" defaultValue={4} />
                <label htmlFor="star4" title="text" />
                <input type="radio" id="star3" name="rate" defaultValue={3} />
                <label htmlFor="star3" title="text" />
                <input type="radio" id="star2" name="rate" defaultValue={2} />
                <label htmlFor="star2" title="text" />
                <input type="radio" id="star1" name="rate" defaultValue={1} />
                <label htmlFor="star1" title="text" />
              </div>
            </div>

            <div className="avatar-upload-container">
                <label htmlFor="avatar-input" className="avatar-preview">
                    {avatarPreview ? (
                        <img src={avatarPreview} alt="Avatar Preview" />
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                            <circle cx="12" cy="13" r="4"></circle>
                        </svg>
                    )}
                </label>
                <input type="file" id="avatar-input" accept="image/*" onChange={handleAvatarChange} />
                <div className="upload-text">
                    <span className="text-md">Profile Picture</span>
                    <label htmlFor="avatar-input" className="tf-btn-link text-sm" style={{cursor: 'pointer', textDecoration: 'underline'}}>
                        {avatarPreview ? "Change Photo" : "Upload Photo"}
                    </label>
                </div>
            </div>

            <div className="group-2-ip">
              <input type="text" className="" placeholder="Name *" />
              <input type="email" className="" placeholder="Email *" />
            </div>
            
            <div className="group-upload" style={{marginBottom: "20px"}}>
                 <label className="text-md" style={{display:'block', marginBottom:'5px'}}>Add Evidence (Photos/Videos)</label>
                 <input type="file" accept="image/*,video/*" multiple className="form-control" />
            </div>

            <textarea name="note" id="note" placeholder="Your discussion *" defaultValue={""} />
            {/* <button type="submit" className="tf-btn animate-btn">
              Submit
            </button> */}
            <div className="view-more-container">
                  <button className="tf-btn animate-btn">
                      Submit
                  </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}