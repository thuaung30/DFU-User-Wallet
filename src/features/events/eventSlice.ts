import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EventsNormalized } from "./types";
import * as eventApi from "./eventApi";
import { WalletCredentials } from "../types";
import { isEmpty, isEqual, merge } from "lodash";

interface EventState {
  data: EventsNormalized;
  fetching: boolean;
  error: boolean;
}

const initialState: EventState = {
  data: {},
  fetching: false,
  error: false,
};

export const fetchEvents = createAsyncThunk(
  "event/fetch",
  async (wallet: WalletCredentials) => {
    return await eventApi.fetchEvents(wallet);
  }
);

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.fulfilled, (draft, action) => {
      const payload = action.payload;
      if (isEmpty(payload)) {
      } else {
        const mergedEvents = merge({}, draft.data, action.payload);
        if (isEqual(draft.data, mergedEvents)) {
        } else {
          draft.data = mergedEvents;
        }
      }
      draft.fetching = false;
      draft.error = false;
    });
    builder.addCase(fetchEvents.pending, (draft) => {
      draft.fetching = true;
      draft.error = false;
    });
    builder.addCase(fetchEvents.rejected, (draft) => {
      draft.fetching = false;
      draft.error = true;
    });
  },
});

export default eventSlice.reducer;
