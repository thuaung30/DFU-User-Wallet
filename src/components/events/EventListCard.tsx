import { Box, Center } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import { Event } from "../../features/events/types";
import EventListItem from "./EventListItem";

interface EventListCardProps {
  events: Event[];
  rightArrow?: boolean;
}

const EventListCard: React.FC<EventListCardProps> = ({
  events,
  rightArrow = false,
}) => {
  if (isEmpty(events)) {
    return <Center>No events.</Center>;
  }

  return (
    <Box shadow="md" borderWidth="1px">
      {events.map((event, index) => (
        <EventListItem key={index} event={event} rightArrow={rightArrow} />
      ))}
    </Box>
  );
};

export default EventListCard;
