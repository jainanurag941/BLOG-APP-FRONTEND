import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

//action
export const sendMailAction = createAsyncThunk(
  "mail/sent",
  async (email, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/email`,
        {
          to: email?.recipientEmail,
          subject: email?.subject,
          message: email?.message,
        },
        config
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

// slices
const sendMailSlices = createSlice({
  name: "mail",
  initialState: {},
  extraReducers: (builder) => {
    //create
    builder.addCase(sendMailAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(sendMailAction.fulfilled, (state, action) => {
      state.loading = false;
      state.mailSent = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(sendMailAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default sendMailSlices.reducer;