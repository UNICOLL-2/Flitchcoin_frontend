import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";

const initialState = {
  selectedCoin: null,
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

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reset: (state) => {
      state.selectedCoin = null;
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
      });
  },
});

export const { reset } = orderSlice.actions;

export default orderSlice.reducer;
