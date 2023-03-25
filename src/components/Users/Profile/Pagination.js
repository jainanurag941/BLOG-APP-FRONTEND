import React from "react";

const Pagination = ({ viewersPerPage, totalViewers, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalViewers / viewersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center">
      <ul className="inline-flex -space-x-px">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
