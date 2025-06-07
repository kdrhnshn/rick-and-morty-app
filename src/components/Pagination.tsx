import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const renderPageNumbers = () => {
    const pages = [];
  
    // Always show first page
    pages.push(renderPage(1));
  
    // Show ellipsis if needed before currentPage - 1
    if (currentPage > 4) {
      pages.push(<span key="start-ellipsis">...</span>);
    }
  
    // Pages around current
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(renderPage(i));
      }
    }
  
    // Show ellipsis if needed after currentPage + 1
    if (currentPage < totalPages - 3) {
      pages.push(<span key="end-ellipsis">...</span>);
    }
  
    // Always show last page
    if (totalPages > 1) {
      pages.push(renderPage(totalPages));
    }
  
    return pages;
  };
  
  const renderPage = (page: number) => (
    <button
      key={page}
      onClick={() => onPageChange(page)}
      className={page === currentPage ? 'active-page' : ''}
    >
      {page}
    </button>
  );

  return (
    <div className="pagination">
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </button>
      {renderPageNumbers()}
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;