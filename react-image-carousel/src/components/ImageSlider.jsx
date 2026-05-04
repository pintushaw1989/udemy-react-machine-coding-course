import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./ImageSlider.css";

const ImageSlider = ({ images }) => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const hasImages = images && images.length > 0;

  const prevSlide = () => {
    if (!hasImages) return;

    setIndex((currentIndex) =>
      currentIndex === 0 ? images.length - 1 : currentIndex - 1,
    );
  };

  const nextSlide = () => {
    if (!hasImages) return;

    setIndex((currentIndex) =>
      currentIndex === images.length - 1 ? 0 : currentIndex + 1,
    );
  };

  useEffect(() => {
    if (!hasImages || isHovered) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(timer);
  }, [isHovered, images.length, hasImages]);

  useEffect(() => {
    if (!hasImages) return;

    const handleKey = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [hasImages, images.length]);

  useEffect(() => {
    if (hasImages) setIndex(0);
  }, [hasImages, images]);

  return (
    <div
      className="container"
      role="region"
      aria-label="Image slider"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        className="slide-image"
        src={images[index].url}
        alt={images[index].alt || `Slide ${index + 1}`}
      />

      <div className="nav-buttons">
        <button
          aria-label="Previous Slide"
          onClick={prevSlide}
          className="prev"
        >
          <ChevronLeft size={24} />
        </button>

        <button aria-label="Next Slide" onClick={nextSlide} className="next">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="image-indicator">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={`indicator ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
