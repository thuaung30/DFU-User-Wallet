import { createSelector } from "@reduxjs/toolkit";
import { get } from "lodash";
import { RootState } from "../../app/store";
import { Address } from "../types";
import { AccountsNormalized } from "./types";

export const getCurrentAccountAddress = (state: RootState): Address | null => {
  return get(state, "account.selectedAccountAddress", null);
};

const getAccountsData = (state: RootState): AccountsNormalized =>
  get(state, "account.data", {});

export const getCurrentAccountSelector = createSelector(
  getCurrentAccountAddress,
  getAccountsData,
  (selectedAccountAddress, accounts) => {
    if (!!selectedAccountAddress) {
      const account = get(accounts, selectedAccountAddress);
      return account;
    }
    return {};
  }
);
