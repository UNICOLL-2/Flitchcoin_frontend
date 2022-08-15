import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  selectedType: null,
  userToken: null,
  user: null,
};

export const defaultType = createAsyncThunk(
  "auth/type",
  async (type, thunkAPI) => {
    try {
      return authService.defaultType(type);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      return authService.login(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginToken = createAsyncThunk(
  "auth/loginToken",
  async (data, thunkAPI) => {
    try {
      return authService.loginToken(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login-user",
  async (data, thunkAPI) => {
    try {
      return authService.userLogin();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logOutUser = createAsyncThunk(
  "auth/logout",
  async (data, thunkAPI) => {
    try {
      return authService.logOutUser();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signinUser = createAsyncThunk(
  "auth/sign-up",
  async (data, thunkAPI) => {
    try {
      return authService.signinUser(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.selectedType = null;
      state.userToken = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(defaultType.fulfilled, (state, action) => {
        state.selectedType = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.selectedType = action.payload;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.selectedType = action.payload;
      })
      .addCase(logOutUser.pending, (state, action) => {
        state.selectedType = null;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.selectedType = "accept";
        state.userToken = null;
        state.user = null;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.selectedType = null;
      })
      .addCase(loginToken.pending, (state) => {
        state.userToken = null;
      })
      .addCase(loginToken.fulfilled, (state, action) => {
        state.userToken = action.payload;
      })
      .addCase(loginToken.rejected, (state) => {
        state.userToken = null;
      })
      .addCase(userLogin.pending, (state) => {
        state.userToken = null;
        state.user = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.selectedType = action.payload.type;
        state.user = action.payload.data;
      })
      .addCase(userLogin.rejected, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
