// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseApiUrl, networkAddress } from "../config/config";
import { WalletCredentials } from "../features/types";

type SendPaymentRequest = {
  receiverAddress: string;
  value: string | number;
  wallet: WalletCredentials;
};

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseApiUrl}` }),
  endpoints: (builder) => ({
    sendPayment: builder.mutation<string, SendPaymentRequest>({
      query: ({ value, wallet, receiverAddress }) => ({
        url: "/payment",
        method: "POST",
        body: {
          networkAddress,
          receiverAddress,
          value,
          wallet,
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSendPaymentMutation } = api;
