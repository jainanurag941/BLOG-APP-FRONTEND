import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../slices/category/categorySlice";
import comment from "../slices/comments/commentSlices";
import post from "../slices/posts/postSlices";
import usersReducer from "../slices/users/usersSlices";

const store = configureStore({
  reducer: {
    users: usersReducer,
    category: categoryReducer,
    post,
    comment,
  },
});

export default store;
