import { orderBy } from "lodash";
import { Event } from "../features/events/types";
import { Amount, NetworkUserDataFromLib } from "../features/types";

export type EnrichedNetworkUserData = NetworkUserDataFromLib & {
  accountAddress: string;
  networkAddress: string;
};

export type SortDirection = "asc" | "desc";

export const formatValue = (valueObject: Amount | string) => {
  if (
    valueObject &&
    Object.prototype.hasOwnProperty.call(valueObject, "value") &&
    typeof valueObject !== "string"
  ) {
    return parseFloat(valueObject.value);
  } else {
    return parseFloat(valueObject as string);
  }
};

export function formatNetworkUserData(
  networkUserData: EnrichedNetworkUserData
) {
  return {
    ...networkUserData,
    networkAddress: networkUserData.networkAddress,
    accountAddress: networkUserData.accountAddress,
    balance: networkUserData.balance ? formatValue(networkUserData.balance) : 0,
    frozenBalance: networkUserData.frozenBalance
      ? formatValue(networkUserData.frozenBalance)
      : 0,
    given: networkUserData.given ? formatValue(networkUserData.given) : 0,
    received: networkUserData.received
      ? formatValue(networkUserData.received)
      : 0,
    leftGiven: networkUserData.leftGiven
      ? formatValue(networkUserData.leftGiven)
      : 0,
    leftReceived: networkUserData.leftReceived
      ? formatValue(networkUserData.leftReceived)
      : 0,
  };
}

export function formatEventFromLib(event: Event): Event {
  const enrichedEvent = {
    ...event,
    id: event.transactionHash,
  };
  for (const key of Object.keys(enrichedEvent)) {
    if (
      [
        "amount",
        "given",
        "received",
        "interestRateGiven",
        "interestRateReceived",
      ].includes(key)
    ) {
      enrichedEvent[key] = formatValue(enrichedEvent[key]);
    }
  }

  return enrichedEvent;
}

export const sortEvents = (
  events: Array<Event>,
  sortDirection: SortDirection = "desc"
): Array<Event> => {
  return orderBy<Event>(
    events,
    ["timestamp", "blockNumber", "logIndex"],
    [sortDirection, sortDirection, sortDirection]
  );
};
