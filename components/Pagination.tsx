import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center space-x-4 mt-4">
      <button
        onClick={handlePrevPage}
        className={`p-2 ${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="p-2">{currentPage} of {totalPages}</span>
      <button
        onClick={handleNextPage}
        className={`p-2 ${currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
