export type Address = string;

export type WalletCredentials = {
  address: Address;
  version: number;
  type: string;
  meta: {
    signingKey: {
      privateKey?: string;
      mnemonic?: string;
    };
  };
};

export type Currency = {
  address: string;
  abbreviation: string;
  name: string;
  decimals: number;
  [key: string]: any;
};

export type Amount = {
  value: string;
  raw: string;
  decimals: number;
};

export type NetworkUserDataFromLib = {
  balance: Amount;
  frozenBalance: Amount;
  given: Amount;
  received: Amount;
  leftGiven: Amount;
  leftReceived: Amount;
};
