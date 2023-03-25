import React from "react";

const Pagination = ({
  viewersPerPage,
  totalViewers,
  paginate,
  prePage,
  nextPage,
  currentPage,
}) => {
  const pageNumbers = [];

  let viewersCount = Math.ceil(totalViewers / viewersPerPage);

  for (let i = 1; i <= viewersCount; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mb-2">
      <ul className="inline-flex -space-x-px">
        <li className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          <button
            className={`${currentPage === 1 ? "cursor-not-allowed" : ""}`}
            onClick={() => prePage()}
          >
            Prev
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`${
              currentPage === number ? "bg-violet-300" : ""
            } px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          >
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
        <li className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          <button
            className={`${
              currentPage === viewersCount ? "cursor-not-allowed" : ""
            }`}
            onClick={() => nextPage()}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
