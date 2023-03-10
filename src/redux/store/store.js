import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../slices/category/categorySlice";
import comment from "../slices/comments/commentSlices";
import post from "../slices/posts/postSlices";
import usersReducer from "../slices/users/usersSlices";
import sendMail from "../slices/email/emailSlices";
import accountVerification from "../slices/accountVerification/accVerificationSlices";

const store = configureStore({
  reducer: {
    users: usersReducer,
    category: categoryReducer,
    post,
    comment,
    sendMail,
    accountVerification,
  },
});

export default store;
