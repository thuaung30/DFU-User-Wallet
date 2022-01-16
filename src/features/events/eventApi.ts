import axios from "axios";
import { normalize } from "normalizr";
import { baseApiUrl } from "../../config/config";
import { formatEventFromLib } from "../../helper/helper";
import { WalletCredentials } from "../types";
import { Events, EventsNormalized } from "./types";
import { event as eventSchema } from "./schema";

export async function fetchEvents(request: WalletCredentials) {
  return new Promise<EventsNormalized>(async (resolve, reject) => {
    try {
      const { data } = await axios.post<Events>(`${baseApiUrl}/event`, request);
      const formattedEvents = data.map(formatEventFromLib);
      const { events } = normalize(formattedEvents, [eventSchema]).entities;
      resolve(events);
    } catch (err) {
      if (err instanceof Error) {
        reject(new Error(err.message));
      }
    }
  });
}
