import { schema } from "normalizr";
import { Event } from "./types";

export const event: schema.Entity<Event> = new schema.Entity("events", {
  idAttribute: (entity) => entity.transactionHash,
  processStrategy: (entity) => ({
    ...entity,
    id: getEventID(entity),
  }),
});

function getEventID(event: any) {
  if (event.id !== undefined) {
    return event.id;
  }
  return event.transactionHash;
}
