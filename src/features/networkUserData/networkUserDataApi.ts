import axios from "axios";
import { baseApiUrl, networkAddress } from "../../config/config";
import { formatNetworkUserData } from "../../helper/helper";
import { NetworkUserDataFromLib } from "../types";
import { NetworkUserData } from "./types";

export async function fetchNetworkUserData(userAddress: string) {
  return new Promise<NetworkUserData>(async (resolve, reject) => {
    try {
      const { data } = await axios.post<NetworkUserDataFromLib>(
        `${baseApiUrl}/network/user`,
        {
          networkAddress,
          userAddress,
        }
      );

      const enrichedNetworkUserData = {
        ...data,
        networkAddress,
        accountAddress: userAddress,
      };

      const transformedNetworkUserData: NetworkUserData = formatNetworkUserData(
        enrichedNetworkUserData
      );
      resolve(transformedNetworkUserData);
    } catch (err) {
      if (err instanceof Error) {
        reject(new Error(err.message));
      }
    }
  });
}
