import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { get, isEqual } from "lodash";
import { Address } from "../types";
import * as accountApi from "./accountApi";
import { Account, AccountsNormalized } from "./types";

export type AccountState = {
  data: AccountsNormalized;
  selectedAccountAddress: Address | null;
  fetching: boolean;
  error: boolean;
};

const initialState: AccountState = {
  data: {},
  selectedAccountAddress: null,
  fetching: false,
  error: false,
};

const isAccountInStateEqual = (state: AccountState, account: Account) => {
  const accountInState = get(state.data, account.walletCredentials.address);

  if (isEqual(accountInState, account)) {
    return true;
  }

  return false;
};

export const signUp = createAsyncThunk("users/createUser", async () => {
  return await accountApi.createUserAndTrustline();
});

export const recoverFromPrivateKey = createAsyncThunk(
  "users/recoverFromPrivateKey",
  async (key: string) => {
    const walletCredentials = await accountApi.recoverFromPrivateKey(key);
    return {
      address: walletCredentials.address,
      walletCredentials,
    } as Account;
  }
);

const recoverFromSeed = createAsyncThunk(
  "users/recoverFromSeed",
  async (seed: string) => {
    const walletCredentials = await accountApi.recoverFromSeed(seed);
    return {
      address: walletCredentials.address,
      walletCredentials,
    } as Account;
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    logOut: (draft, _action: PayloadAction<void>) => {
      draft.selectedAccountAddress = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (draft, action) => {
      draft.fetching = false;
      draft.error = false;
      draft.selectedAccountAddress = action.payload.address;
      draft.data = {
        ...draft.data,
        [action.payload.address]: {
          address: action.payload.address,
          walletCredentials: action.payload,
        },
      };
    });
    builder.addCase(recoverFromSeed.fulfilled, (draft, action) => {
      if (!isAccountInStateEqual(draft, action.payload)) {
        draft.data = {
          ...draft.data,
          [action.payload.address]: {
            address: action.payload.address,
            walletCredentials: action.payload.walletCredentials,
          },
        };
      }
      draft.fetching = false;
      draft.error = false;
      draft.selectedAccountAddress = action.payload.address;
    });
    builder.addCase(recoverFromPrivateKey.fulfilled, (draft, action) => {
      if (!isAccountInStateEqual(draft, action.payload)) {
        draft.data = {
          ...draft.data,
          [action.payload.address]: {
            address: action.payload.address,
            walletCredentials: action.payload.walletCredentials,
          },
        };
      }
      draft.fetching = false;
      draft.error = false;
      draft.selectedAccountAddress = action.payload.address;
    });
    builder.addCase(signUp.pending, (draft) => {
      draft.fetching = true;
      draft.error = false;
    });
    builder.addCase(recoverFromPrivateKey.pending, (draft) => {
      draft.fetching = true;
      draft.error = false;
    });
    builder.addCase(recoverFromSeed.pending, (draft) => {
      draft.fetching = true;
      draft.error = false;
    });
    builder.addCase(signUp.rejected, (draft) => {
      draft.fetching = false;
      draft.error = true;
    });
    builder.addCase(recoverFromSeed.rejected, (draft) => {
      draft.fetching = false;
      draft.error = true;
    });
    builder.addCase(recoverFromPrivateKey.rejected, (draft) => {
      draft.fetching = false;
      draft.error = true;
    });
  },
});

export const { logOut } = accountSlice.actions;

export default accountSlice.reducer;
