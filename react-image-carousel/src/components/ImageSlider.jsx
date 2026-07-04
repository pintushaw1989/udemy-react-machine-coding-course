import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./ImageSlider.css";

const ImageSlider = ({ images }) => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Validate images prop
  const hasImages = Array.isArray(images) && images.length > 0;
  const isValidImage = (img) => img && typeof img === "object" && "url" in img;

  const prevSlide = useCallback(() => {
    if (!hasImages) return;
    setIndex((currentIndex) =>
      currentIndex === 0 ? images.length - 1 : currentIndex - 1,
    );
  }, [hasImages, images.length]);

  const nextSlide = useCallback(() => {
    if (!hasImages) return;
    setIndex((currentIndex) =>
      currentIndex === images.length - 1 ? 0 : currentIndex + 1,
    );
  }, [hasImages, images.length]);

  // Auto-play with pause on hover
  useEffect(() => {
    if (!hasImages || isHovered) return;

    const timer = setInterval(nextSlide, 3000);
    return () => clearInterval(timer);
  }, [isHovered, hasImages, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    if (!hasImages) return;

    const handleKey = (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [hasImages, prevSlide, nextSlide]);

  // Reset to first slide when images array changes (optional)
  useEffect(() => {
    if (hasImages) {
      setIndex(0);
    }
  }, [hasImages, images]); // Only depend on images, not hasImages

  // Don't render if no valid images
  if (!hasImages) {
    return (
      <div className="container" role="region" aria-label="Image slider">
        <p>No images available</p>
      </div>
    );
  }

  const currentImage = images[index];

  // Handle invalid current image
  if (!isValidImage(currentImage)) {
    return (
      <div className="container" role="region" aria-label="Image slider">
        <p>Image data is invalid</p>
      </div>
    );
  }

  return (
    <div
      className="container"
      role="region"
      aria-label="Image slider"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <img
        className="slide-image"
        src={currentImage.url}
        alt={currentImage.alt || `Slide ${index + 1}`}
        aria-live="polite"
      />

      <div className="nav-buttons">
        <button
          aria-label="Previous Slide"
          onClick={prevSlide}
          className="prev"
          type="button"
        >
          <ChevronLeft size={24} aria-hidden="true" />
        </button>

        <button
          aria-label="Next Slide"
          onClick={nextSlide}
          className="next"
          type="button"
        >
          <ChevronRight size={24} aria-hidden="true" />
        </button>
      </div>

      <div className="image-indicator" role="tablist">
        {images.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-label={`Go to slide ${i + 1}`}
            aria-selected={i === index}
            aria-current={i === index ? "step" : undefined}
            className={`indicator ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
            type="button"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
