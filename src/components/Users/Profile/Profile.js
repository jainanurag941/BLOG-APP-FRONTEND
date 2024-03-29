import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  HeartIcon,
  EmojiSadIcon,
  UploadIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { MailIcon, EyeIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  followUserAction,
  unfollowUserAction,
  userProfileAction,
} from "../../../redux/slices/users/usersSlices";
import DateFormatter from "../../../utils/DateFormatter";
import LoadingComponent from "../../../utils/LoadingComponent";
// import Pagination from "./Pagination";
// import PostPagination from "./PostPagination";
import ReactPaginate from "react-paginate";
import "./viewerPaginate.css";

export default function Profile(props) {
  const dispatch = useDispatch();
  const id = props?.computedMatch?.params?.id;

  const users = useSelector((state) => state?.users);
  const {
    profile,
    profileLoading,
    profileAppErr,
    profileServerErr,
    followed,
    unFollowed,
    userAuth,
  } = users;

  useEffect(() => {
    dispatch(userProfileAction(id));
  }, [id, dispatch, followed, unFollowed]);

  // --------------Pagination Profile Viewer functionality---------------

  // const [currentPage, setCurrentPage] = useState(1);
  // const [viewersPerPage] = useState(5);

  // Get current posts
  // const indexOfLastViewer = currentPage * viewersPerPage;
  // const indexOfFirstViewer = indexOfLastViewer - viewersPerPage;
  // const currentPageViewers = profile?.viewedBy?.slice(
  //   indexOfFirstViewer,
  //   indexOfLastViewer
  // );

  // const nViewers = Math.ceil(profile?.viewedBy?.length / viewersPerPage);

  // Change page
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // const prePage = () => {
  //   if (currentPage !== 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };
  // const nextPage = () => {
  //   if (currentPage !== nViewers) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // ---------------------------------------------------------------------

  // --------------Pagination Post functionality---------------

  // const [currentPostPage, setCurrentPostPage] = useState(1);
  // const [postsPerPage] = useState(3);

  // Get current posts
  // const indexOfLastPost = currentPostPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPagePosts = profile?.posts?.slice(
  //   indexOfFirstPost,
  //   indexOfLastPost
  // );

  // const nPosts = Math.ceil(profile?.posts?.length / postsPerPage);

  // Change page
  // const prePostPage = () => {
  //   if (currentPostPage !== 1) {
  //     setCurrentPostPage(currentPostPage - 1);
  //   }
  // };

  // const postPaginate = (pageNumber) => setCurrentPostPage(pageNumber);

  // const nextPostPage = () => {
  //   if (currentPostPage !== nPosts) {
  //     setCurrentPostPage(currentPostPage + 1);
  //   }
  // };

  // ---------------------------------------------------------------------

  //---------------React Paginate-----------------------------------------

  //Profile Viewers
  const [pageNumber, setPageNumber] = useState(0);

  const viewersPerPage = 5;
  const pagesVisited = pageNumber * viewersPerPage;
  const pageCount = Math.ceil(profile?.viewedBy?.length / viewersPerPage);

  const handlePageClick = ({ selected: selectedPage }) => {
    setPageNumber(selectedPage);
  };

  //Number of posts
  const [postPageNumber, setPostPageNumber] = useState(0);

  const postsPerPage = 3;
  const offset = postPageNumber * postsPerPage;
  const pagePostCount = Math.ceil(profile?.posts?.length / postsPerPage);

  const changePage = ({ selected: selectedPage }) => {
    setPostPageNumber(selectedPage);
  };

  //----------------------------------------------------------------------

  const history = useHistory();
  const sendMailNavigate = () => {
    history.push({
      pathname: "/send-email",
      state: {
        email: profile?.email,
        id: profile?._id,
      },
    });
  };

  //isLogin
  const isLoginUser = userAuth?._id === profile?._id;

  return (
    <>
      <div>
        {profileLoading ? (
          <LoadingComponent />
        ) : profileAppErr || profileServerErr ? (
          <div className="min-h-screen bg-green-600 flex justify-center items-center">
            <h2 className="text-yellow-400 text-2xl">
              {profileServerErr} {profileAppErr}
            </h2>
          </div>
        ) : (
          <div className="flex flex-col min-w-0 flex-1 overflow-hidden bg-gray-50">
            <div className="flex-1 relative z-0 flex overflow-hidden">
              <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
                <article>
                  {/* Profile header */}
                  <div>
                    <div>
                      <img
                        className="h-32 w-full object-cover lg:h-48"
                        src={profile?.profilePhoto}
                        alt={profile?.firstName}
                      />
                    </div>
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                        <div className="flex -mt-20">
                          <img
                            className="h-24 w-24 rounded-full  ring-4 ring-white sm:h-32 sm:w-32"
                            src={profile?.profilePhoto}
                            alt={profile?.firstName}
                          />
                        </div>
                        <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                          <div className=" flex flex-col 2xl:block mt-10 min-w-0 flex-1">
                            <h1 className="text-2xl font-bold text-gray-900 ">
                              {profile?.firstName} {profile?.lastName}
                              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                                {profile?.accountType}
                              </span>
                              {/* Display if verified or not */}
                              {profile?.isAccountVerified ? (
                                <span className="inline-flex ml-2 items-center px-3 py-0.5  rounded-lg text-sm font-medium bg-green-600 text-gray-300">
                                  Account Verified
                                </span>
                              ) : (
                                <span className="inline-flex ml-2 items-center px-3 py-0.5  rounded-lg text-sm font-medium bg-red-600 text-gray-300">
                                  Unverified Account
                                </span>
                              )}
                            </h1>
                            <p className="m-3 text-lg">
                              Date Joined: {""}
                              <DateFormatter date={profile?.createdAt} />{" "}
                            </p>
                            <p className="text-green-600 mt-2 mb-2">
                              {profile?.posts?.length} posts{" "}
                              {profile?.followers?.length} followers{" "}
                              {profile?.following?.length} following
                            </p>
                            {/* Who view my profile */}
                            <div className="flex items-center  mb-2">
                              <EyeIcon className="h-5 w-5 " />
                              <div className="pl-2">
                                {/* {profile?.viewedBy?.length}{" "} */}
                                <span className="text-indigo-400 cursor-pointer">
                                  Number of viewers {profile?.viewedBy?.length}
                                </span>
                              </div>
                            </div>

                            {/* is login user */}
                            {/* Upload profile photo */}
                            {isLoginUser && (
                              <Link
                                to={`/upload-profile-photo`}
                                className="inline-flex justify-center w-48 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                              >
                                <UploadIcon
                                  className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span>Upload Photo</span>
                              </Link>
                            )}
                          </div>

                          <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                            {/* // Hide follow button from the same */}

                            {!isLoginUser && (
                              <div>
                                {profile?.isFollowing ? (
                                  <button
                                    onClick={() =>
                                      dispatch(unfollowUserAction(id))
                                    }
                                    className="mr-2 inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                  >
                                    <EmojiSadIcon
                                      className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                    <span>Unfollow</span>
                                  </button>
                                ) : (
                                  <button
                                    onClick={() =>
                                      dispatch(followUserAction(id))
                                    }
                                    type="button"
                                    className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                  >
                                    <HeartIcon
                                      className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                    <span>Follow </span>
                                    <span className="pl-2">
                                      {profile?.followers?.length}
                                    </span>
                                  </button>
                                )}
                              </div>
                            )}

                            {/* Update Profile */}

                            <>
                              {isLoginUser && (
                                <Link
                                  to={`/update-profile/${profile?._id}`}
                                  className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                >
                                  <UserIcon
                                    className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <span>Update Profile</span>
                                </Link>
                              )}
                            </>
                            {/* Send Mail */}
                            {!isLoginUser && (
                              <button
                                onClick={sendMailNavigate}
                                className="inline-flex justify-center bg-indigo-900 px-4 py-2 border border-yellow-700 shadow-sm text-sm font-medium rounded-md text-gray-700  hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                              >
                                <MailIcon
                                  className="-ml-1 mr-2 h-5 w-5 text-gray-200"
                                  aria-hidden="true"
                                />
                                <span className="text-base mr-2  text-bold text-yellow-500">
                                  Send Message
                                </span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
                        <h1 className="text-2xl font-bold text-gray-900 truncate">
                          {profile?.firstName} {profile?.lastName}
                        </h1>
                      </div>
                    </div>
                  </div>
                  {/* Tabs */}
                  <div className="mt-6 sm:mt-2 2xl:mt-5">
                    <div className="border-b border-red-900">
                      <div className="max-w-5xl mx-auto "></div>
                    </div>
                  </div>
                  <div className="flex justify-center place-items-start flex-wrap  md:mb-0">
                    <div className="w-full md:w-1/3 px-4 mb-4 md:mb-0">
                      <h1 className="text-center text-xl border-gray-500 mb-2 border-b-2">
                        Who viewed my profile : {profile?.viewedBy?.length}
                      </h1>

                      {/* Who view my post */}
                      <ul className="divide-y-2 divide-indigo-200 divide-opacity-25">
                        {profile?.viewedBy?.length <= 0 ? (
                          <h1>No Viewer</h1>
                        ) : (
                          profile?.viewedBy
                            ?.slice(pagesVisited, pagesVisited + viewersPerPage)
                            ?.map((user) => (
                              <li key={user?._id} className="py-2 px-4">
                                <Link to={`/profile/${user?._id}`}>
                                  <div className="flex mb-2 items-center space-x-4 lg:space-x-6">
                                    <img
                                      className="w-16 h-16 rounded-full lg:w-20 lg:h-20"
                                      src={user?.profilePhoto}
                                      alt={user?.firstName}
                                    />
                                    <div className="font-medium text-lg leading-6 space-y-1">
                                      <h3>
                                        {user?.firstName} {user?.lastName}
                                      </h3>
                                      <p className="text-indigo-600">
                                        {user?.accountType}
                                      </p>
                                    </div>
                                  </div>
                                </Link>
                              </li>
                            ))
                        )}
                        {profile?.viewedBy?.slice(
                          pagesVisited,
                          pagesVisited + viewersPerPage
                        )?.length > 0 && (
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
                              activeClassName={
                                "bg-violet-300  hover:bg-gray-300"
                              }
                            />
                          </div>
                        )}
                        {/* {currentPageViewers?.length > 0 && (
                          <Pagination
                            viewersPerPage={viewersPerPage}
                            totalViewers={profile?.viewedBy?.length}
                            paginate={paginate}
                            prePage={prePage}
                            nextPage={nextPage}
                            currentPage={currentPage}
                          />
                        )} */}
                      </ul>
                    </div>
                    {/* All my Post */}
                    <div className="w-full md:w-2/3 px-4 mb-4 md:mb-0">
                      <h1 className="text-center text-xl border-gray-500 mb-2 border-b-2">
                        My Post - {profile?.posts?.length}
                      </h1>
                      {/* Loop here */}
                      <ul className="divide-y-2 divide-indigo-200 divide-opacity-25">
                        {profile?.posts?.length <= 0 ? (
                          <h2 className="text-center text-xl">No Post Found</h2>
                        ) : (
                          profile?.posts
                            ?.slice(offset, offset + postsPerPage)
                            ?.map((post) => (
                              <li
                                key={post?._id}
                                className="flex flex-wrap -mx-3 mt-3 lg:mb-6 py-2"
                              >
                                <div className="mb-2   w-full lg:w-1/4 px-3">
                                  <Link to={`/posts/${post?._id}`}>
                                    <img
                                      className="object-cover h-40 rounded"
                                      src={post?.image}
                                      alt="poster"
                                    />
                                  </Link>
                                </div>
                                <div className="w-full lg:w-3/4 px-3">
                                  <Link
                                    to={`/posts/${post?._id}`}
                                    className="hover:underline"
                                  >
                                    <h3 className="mb-1 text-2xl text-green-600 font-bold font-heading">
                                      {/* {capitalizeWord(post?.title)} */}
                                      {post?.title}
                                    </h3>
                                  </Link>
                                  <p className="text-gray-600 truncate">
                                    {post?.description}
                                  </p>

                                  <Link
                                    className="text-indigo-500 hover:underline"
                                    to={`/posts/${post?._id}`}
                                  >
                                    Read more
                                  </Link>
                                </div>
                              </li>
                            ))
                        )}
                        {profile?.posts?.slice(offset, offset + postsPerPage)
                          ?.length > 0 && (
                          <div className="toCenter">
                            <ReactPaginate
                              previousLabel={"Prev"}
                              nextLabel={"Next"}
                              breakLabel={".."}
                              pageCount={pagePostCount}
                              marginPagesDisplayed={2}
                              onPageChange={changePage}
                              containerClassName={
                                "inline-flex items-center -space-x-px mb-6 mt-2 pagination"
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
                              activeClassName={
                                "bg-violet-300 hover:bg-gray-300"
                              }
                            />
                          </div>
                        )}
                        {/* {currentPagePosts?.length > 0 && (
                        <PostPagination
                          postsPerPage={postsPerPage}
                          totalPosts={profile?.posts?.length}
                          postPaginate={postPaginate}
                          prePostPage={prePostPage}
                          nextPostPage={nextPostPage}
                          currentPostPage={currentPostPage}
                        />
                      )} */}
                      </ul>
                    </div>
                  </div>
                </article>
              </main>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
