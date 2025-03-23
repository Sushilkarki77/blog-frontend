import React, { JSX } from "react";

type PaginationProps = {
  page: number;
  totalResult: number;
  numberPerPage: number;
  handleClick: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ page, totalResult, numberPerPage, handleClick }) => {
  const totalPages = Math.ceil(totalResult / numberPerPage);
  const elements: JSX.Element[] = [];

  let startPage = Math.max(1, page - 2);
  const endPage = Math.min(totalPages, startPage + 4);

  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }

  for (let i = startPage; i <= endPage; i++) {
    elements.push(
      <button
        key={i}
        onClick={() => handleClick(i)}
        className={`px-3 py-1 ${page === i ? 'text-yellow-600' : ''} font-bold rounded bg-gray-200`}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="flex items-center justify-center space-x-2 bg-white p-3 rounded-lg border border-gray-300 shadow-md">
      <button
        aria-disabled={page === 1}
        onClick={() => handleClick(page - 1)}
        className={`p-2 text-gray-400 rounded-full ${page === 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer opacity-100 hover:bg-gray-200'}`}
        disabled={page === 1}
      >
        &larr;
      </button>

      {elements}

      <button
        aria-disabled={page === totalPages}
        onClick={() => handleClick(page + 1)}
        className={`p-2 text-gray-400 rounded-full ${page === totalPages ? 'cursor-not-allowed opacity-50' : 'cursor-pointer opacity-100 hover:bg-gray-200'}`}
        disabled={page === totalPages}
      >
        &rarr;
      </button>
    </div>
  );
};

export default Pagination;
