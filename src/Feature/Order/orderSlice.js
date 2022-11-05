import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";

const initialState = {
  selectedCoin: null,
  selectedOrderType: null,
  selectedMemo: null,
  selectedAvtar: null,
};

export const coinType = createAsyncThunk(
  "coin/type",
  async (type, thunkAPI) => {
    try {
      return orderService.coinType(type);
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

export const orderType = createAsyncThunk(
  "order/type",
  async (type, thunkAPI) => {
    try {
      return orderService.orderType(type);
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

export const memoType = createAsyncThunk(
  "memo/type",
  async (type, thunkAPI) => {
    try {
      return orderService.memoType(type);
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

export const avtarType = createAsyncThunk(
  "avtar/type",
  async (type, thunkAPI) => {
    try {
      return orderService.avtarType(type);
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

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reset: (state) => {
      state.selectedCoin = null;
      state.selectedOrderType = null;
      state.selectedMemo = null;
      state.selectedAvtar = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(coinType.pending, (state) => {
        state.selectedCoin = null;
      })
      .addCase(coinType.fulfilled, (state, action) => {
        state.selectedCoin = action.payload;
      })
      .addCase(coinType.rejected, (state) => {
        state.selectedCoin = null;
      })
      .addCase(orderType.pending, (state) => {
        state.selectedOrderType = null;
      })
      .addCase(orderType.fulfilled, (state, action) => {
        state.selectedOrderType = action.payload;
      })
      .addCase(orderType.rejected, (state) => {
        state.selectedOrderType = null;
      })
      .addCase(memoType.pending, (state) => {
        state.selectedMemo = null;
      })
      .addCase(memoType.fulfilled, (state, action) => {
        state.selectedMemo = action.payload;
      })
      .addCase(memoType.rejected, (state) => {
        state.selectedMemo = null;
      })
      .addCase(avtarType.pending, (state) => {
        state.selectedAvtar = null;
      })
      .addCase(avtarType.fulfilled, (state, action) => {
        state.selectedAvtar = action.payload;
      })
      .addCase(avtarType.rejected, (state) => {
        state.selectedAvtar = null;
      })
  },
});

export const { reset } = orderSlice.actions;

export default orderSlice.reducer;
