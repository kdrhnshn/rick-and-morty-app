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

    pages.push(renderPage(1));

    if (currentPage > 4) {
      pages.push(<span key="start-ellipsis" className="text-gray-400 px-2">...</span>);
    }

    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(renderPage(i));
      }
    }

    if (currentPage < totalPages - 3) {
      pages.push(<span key="end-ellipsis" className="text-gray-400 px-2">...</span>);
    }

    if (totalPages > 1) {
      pages.push(renderPage(totalPages));
    }

    return pages;
  };

  const renderPage = (page: number) => {
    const isActive = page === currentPage;

    return (
      <button
        key={page}
        onClick={() => onPageChange(page)}
        className={`px-4 py-2 mx-1 rounded-md font-medium transition duration-200 
          ${isActive
            ? "bg-grey-600 text-white ring-2 ring-blue-300 shadow-lg "
            : "bg-slate-700 text-grey-100 hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"}
        `}
      >
        {page}
      </button>
    );
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-8 bg-slate-800 p-4 rounded-xl">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md font-medium transition duration-200
          ${currentPage === 1
            ? "bg-slate-600 text-slate-400 cursor-not-allowed"
            : "bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"}
        `}
      >
        Previous
      </button>

      {renderPageNumbers()}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md font-medium transition duration-200
          ${currentPage === totalPages
            ? "bg-slate-600 text-slate-400 cursor-not-allowed"
            : "bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"}
        `}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;