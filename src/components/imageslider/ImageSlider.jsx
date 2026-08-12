import React, { useState } from "react";
import "./ImageSlider.css";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log("images",images);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  if (!images || images.length === 0) {
    return (
      <div className="image-slider-empty">
        <p>No images available</p>
      </div>
    );
  }

  return (
    <div className="image-slider">
      {/* Images */}
      <div
        className="image-slider-track"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div className="image-slide" key={image.id || index}>
            <img
              src={image.image}
              alt={`Property ${index + 1}`}
              className="slider-image"
            />
          </div>
        ))}
      </div>

      {/* Previous Button */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={prevSlide}
          className="slider-button slider-button-prev"
        >
          &#10094;
        </button>
      )}

      {/* Next Button */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={nextSlide}
          className="slider-button slider-button-next"
        >
          &#10095;
        </button>
      )}

      {/* Indicators */}
      {images.length > 1 && (
        <div className="slider-indicators">
          {images.map((_, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`slider-indicator ${
                currentIndex === index ? "active" : ""
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;