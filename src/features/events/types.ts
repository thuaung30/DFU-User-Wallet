import { Amount } from "../types";

export type ProcessingStatus = "sent" | "pending" | "confirmed";
export type Direction = "sent" | "received";

export type TLEvent = {
  blockHash: string;
  blockNumber: number;
  counterParty: string;
  direction: Direction;
  from: string;
  logIndex: number;
  status: ProcessingStatus;
  timestamp: number;
  to: string;
  transactionHash: string;
  type: string;
  user: string;
  id?: string;
};

export type NetworkEvent = TLEvent & {
  networkAddress: string;
};

export type NetworkTransferEvent = NetworkEvent & {
  amount: Amount | string;
  extraData: string;
  paymentRequestId: string;
  remainingData: string;
  transferId: string;
};

export type NetworkTrustlineUpdateEvent = NetworkEvent & {
  given: Amount | string;
  interestRateGiven: Amount | string;
  interestRateReceived: Amount | string;
  isFrozen: boolean;
  received: Amount | string;
};

export type NetworkTrustlineBalanceUpdateEvent = NetworkEvent & {
  amount: Amount | string;
};

export type Event =
  | NetworkTransferEvent
  | NetworkTrustlineUpdateEvent
  | NetworkTrustlineBalanceUpdateEvent;

export type Events = Event[];

export type EventsNormalized = {
  [eventId: string]: Event;
};
