import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

const resetPostAction = createAction("post/reset");

//create post action
export const createPostAction = createAsyncThunk(
  "post/created",
  async (post, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };

    try {
      const formData = new FormData();
      formData.append("title", post?.title);
      formData.append("description", post?.description);
      formData.append("category", post?.category);
      formData.append("image", post?.image);

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/posts`,
        formData,
        config
      );

      dispatch(resetPostAction());

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch all post action
export const fetchPostsAction = createAsyncThunk(
  "post/list",
  async (category, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/posts?category=${category}`
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//slice
const postSlice = createSlice({
  name: "post",
  initialState: {},
  extraReducers: (builder) => {
    //create post
    builder.addCase(createPostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetPostAction, (state, action) => {
      state.isCreated = true;
    });
    builder.addCase(createPostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.postCreated = action?.payload;
      state.isCreated = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createPostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //fetch post
    builder.addCase(fetchPostsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPostsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.postLists = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchPostsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default postSlice.reducer;
