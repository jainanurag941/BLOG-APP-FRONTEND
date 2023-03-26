import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAction } from "../../../redux/slices/users/usersSlices";
import LoadingComponent from "../../../utils/LoadingComponent";
import UsersListHeader from "./UsersListHeader";
import UsersListItem from "./UsersListItem";
import ReactPaginate from "react-paginate";
import "../Profile/viewerPaginate.css";

const UsersList = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state?.users);
  const { usersList, appErr, serverErr, loading, block, unblock } = users;

  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [block, unblock]);

  //---------------React Paginate-----------------------------------------

  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 7;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(usersList?.length / usersPerPage);

  const handlePageClick = ({ selected: selectedPage }) => {
    setPageNumber(selectedPage);
  };

  // ---------------------------------------------------------------------

  return (
    <>
      <section className="py-8 bg-gray-900 min-h-screen">
        {loading ? (
          <LoadingComponent />
        ) : appErr || serverErr ? (
          <h2 className="text-yellow-600 text-center text-lg">
            {serverErr} {appErr}
          </h2>
        ) : usersList?.length <= 0 ? (
          <h2>No User Found</h2>
        ) : (
          usersList
            ?.slice(pagesVisited, pagesVisited + usersPerPage)
            ?.map((user) => (
              <div key={user?._id}>
                <UsersListItem user={user} />
              </div>
            ))
        )}
        {usersList?.slice(pagesVisited, pagesVisited + usersPerPage)?.length >
          0 && (
          <div className="toCenter">
            <ReactPaginate
              previousLabel={"Prev"}
              nextLabel={"Next"}
              breakLabel={".."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              onPageChange={handlePageClick}
              containerClassName={
                "inline-flex items-center -space-x-px m-7 justify-center"
              }
              pageClassName={
                "px-3 py-2 leading-tight text-gray-500 bg-white border-2 border-indigo-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }
              pageLinkClassName={"paginationlink"}
              previousClassName={
                "px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border-2 border-indigo-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }
              previousLinkClassName={"paginationlink"}
              nextClassName={
                "px-3 py-2 leading-tight text-gray-500 bg-white border-2 border-indigo-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }
              nextLinkClassName={"paginationlink"}
              breakClassName={
                "px-3 py-2 leading-tight text-gray-500 bg-white border-2 border-indigo-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }
              breakLinkClassName={"paginationlink"}
              disabledClassName={"paginationlinkdisabled"}
              activeClassName={"bg-violet-300  hover:bg-gray-300"}
            />
          </div>
        )}
      </section>
    </>
  );
};

export default UsersList;
