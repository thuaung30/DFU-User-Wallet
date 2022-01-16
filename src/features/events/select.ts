import { isEmpty, keys } from "lodash";
import { RootState } from "../../app/store";
import { Event } from "./types";
import { event as eventsSchema } from "./schema";
import { createSelector } from "@reduxjs/toolkit";
import { denormalize } from "normalizr";
import { sortEvents } from "../../helper/helper";

export const getEventsData = (state: RootState): { [eventId: string]: Event } =>
  state.events.data;

const emptyArray: Event[] = [];

export const getEvents = createSelector(getEventsData, (events) => {
  if (isEmpty(events)) return emptyArray;
  const denormalizedData = denormalize(
    { events: keys(events) },
    { events: [eventsSchema] },
    {
      events: events,
    }
  );
  const denormalizedEvents = denormalizedData.events;

  if (!denormalizedEvents.length) {
    return emptyArray;
  }

  return sortEvents(denormalizedEvents);
});
