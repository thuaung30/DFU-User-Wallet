import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as networkUserDataApi from "./networkUserDataApi";
import { NetworkUserDataNormalized } from "./types";

type NetworkUserDataState = {
  data: {
    [accountAddress: string]: NetworkUserDataNormalized;
  };
  fetching: boolean;
  error: boolean;
};

export const fetchNetworkUserData = createAsyncThunk(
  "/network/user",
  async (userAddress: string) => {
    return await networkUserDataApi.fetchNetworkUserData(userAddress);
  }
);

const initialState: NetworkUserDataState = {
  data: {},
  fetching: false,
  error: false,
};

const networkUserDataSlice = createSlice({
  name: "networkUserData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNetworkUserData.fulfilled, (draft, action) => {
      draft.data[action.payload.accountAddress] = {
        [action.payload.networkAddress]: action.payload,
      };
      draft.fetching = false;
      draft.error = false;
    });
    builder.addCase(fetchNetworkUserData.pending, (draft) => {
      draft.fetching = true;
      draft.error = false;
    });
    builder.addCase(fetchNetworkUserData.rejected, (draft) => {
      draft.fetching = false;
      draft.error = true;
    });
  },
});

export default networkUserDataSlice.reducer;
