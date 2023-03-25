import React from "react";

const PostPagination = ({
  postsPerPage,
  totalPosts,
  postPaginate,
  prePostPage,
  nextPostPage,
  currentPostPage,
}) => {
  const pageNumbers = [];

  let postsCount = Math.ceil(totalPosts / postsPerPage);

  for (let i = 1; i <= postsCount; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mb-2">
      <ul className="inline-flex -space-x-px">
        <li className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          <button
            className={`${currentPostPage === 1 ? "cursor-not-allowed" : ""}`}
            onClick={() => prePostPage()}
          >
            Prev
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`${
              currentPostPage === number ? "bg-violet-300" : ""
            } px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          >
            <button onClick={() => postPaginate(number)}>{number}</button>
          </li>
        ))}
        <li className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          <button
            className={`${
              currentPostPage === postsCount ? "cursor-not-allowed" : ""
            }`}
            onClick={() => nextPostPage()}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PostPagination;
