"use client";
import React from "react";

export default function ProductFaq({ productFaqs }) {
  return (
    <section className="s-faq flat-spacing-0">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8">
            <ul className="faq-list">
              <li className="faq-item">
                <div className="faq-wrap" id="accordionShoping">
                  {productFaqs?.map((faq, index) => (
                    <div className="widget-accordion" key={index}>
                      <div
                        className={`accordion-title ${index !== 0 ? "collapsed" : ""}`}
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${index}`}
                        aria-expanded={index === 0 ? "true" : "false"}
                        aria-controls={`collapse-${index}`}
                        role="button"
                      >
                        <span>{faq.question}</span>
                        <span className="icon icon-arrow-down" />
                      </div>
                      <div
                        id={`collapse-${index}`}
                        className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                        aria-labelledby={`heading-${index}`}
                        data-bs-parent="#accordionShoping"
                      >
                        <div className="accordion-body widget-desc">
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}