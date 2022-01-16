import { Address, WalletCredentials } from "../types";

export type Account = {
  address: Address;
  walletCredentials: WalletCredentials;
};

export type AccountsNormalized = {
  [address: string]: Account;
};
