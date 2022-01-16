import { createSelector } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";
import { RootState } from "../../app/store";
import { networkAddress } from "../../config/config";
import { getCurrentAccountAddress } from "../account/select";
import { NetworkUserDataNormalized } from "./types";

const emptyObject = {};

export const getNetworksUserData = (
  state: RootState
): { [accountAddress: string]: NetworkUserDataNormalized } =>
  state.networkUserData.data;

export const getNetworkUserDataForCurrentAccountSelector = createSelector(
  [getNetworksUserData, getCurrentAccountAddress],
  (data, address) => {
    if (isEmpty(data) || isEmpty(data[address]) || !address) {
      return emptyObject;
    }
    return data[address][networkAddress] || emptyObject;
  }
);
