import axios from "axios";
import {
  baseApiUrl,
  clGiven,
  clReceived,
  contactAddress,
  networkAddress,
  __DEV__,
} from "../../config/config";
import { WalletCredentials } from "../types";

type TrustlineUpdateRequest = {
  networkAddress: string;
  contactAddress: string;
  clGiven: number | string;
  clReceived: number | string;
  wallet: WalletCredentials;
};

export async function createUserAndTrustline() {
  return new Promise<WalletCredentials>(async (resolve, reject) => {
    try {
      const { data } = await axios.get<WalletCredentials>(`${baseApiUrl}/user`);
      const request: TrustlineUpdateRequest = {
        networkAddress,
        contactAddress,
        clGiven,
        clReceived,
        wallet: data,
      };
      await axios.post(`${baseApiUrl}/trustline/update`, request);
      resolve(data);
    } catch (err) {
      __DEV__ && console.error(err);
      if (err instanceof Error) {
        reject(new Error(err.message));
      }
    }
  });
}

export async function recoverFromPrivateKey(key: string) {
  return new Promise<WalletCredentials>(async (resolve, reject) => {
    try {
      const { data } = await axios.post<WalletCredentials>(
        `${baseApiUrl}/user/recoverFromPrivateKey`,
        { key }
      );
      resolve(data);
    } catch (err) {
      reject(new Error((err as Error).message));
    }
  });
}

export async function recoverFromSeed(seed: string) {
  return new Promise<WalletCredentials>(async (resolve, reject) => {
    try {
      const { data } = await axios.post<WalletCredentials>(
        `${baseApiUrl}/user/recoverFromSeed`,
        { seed }
      );
      resolve(data);
    } catch (err) {
      reject(new Error((err as Error).message));
    }
  });
}
