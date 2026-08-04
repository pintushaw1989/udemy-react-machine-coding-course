import React from "react";
import "./Pagination.css";

const Pagination = ({
  productCount,
  currentPage,
  setCurrentPage,
  productPerPage,
}) => {
  const totalPages = Math.ceil((productCount || 0) / productPerPage);

  const getPages = () => {
    const pages = [];

    const start = Math.max(2, currentPage - 2);
    const end = Math.min(totalPages - 1, currentPage + 2);

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always include first Page
    pages.push(1);

    // Left dots
    if (start > 2) pages.push("...");

    // Middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Right dots
    if (end < totalPages - 1) pages.push("...");

    // Always include last Page
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const handlePageSelect = (newPage) => {
    if (newPage !== currentPage && newPage !== "...") {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="pagination">
      <button
        aria-label="Previous currentPage"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Prev
      </button>

      <div className="page-numbers">
        {getPages().map((p, index) => (
          <div
            key={index}
            className={`page ${currentPage === p ? "active" : ""} ${
              p === "..." ? "dots" : ""
            }`}
            onClick={() => handlePageSelect(p)}
          >
            {p}
          </div>
        ))}
      </div>

      <button
        aria-label="Next currentPage"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
