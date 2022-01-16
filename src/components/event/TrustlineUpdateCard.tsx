import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { NetworkTrustlineUpdateEvent } from "../../features/events/types";
import Header from "../Header";

interface TrustlineUpdateCardProps {
  event: NetworkTrustlineUpdateEvent;
}

const TrustlineUpdateCard: React.FC<TrustlineUpdateCardProps> = ({ event }) => {
  const given = event.from === event.user;
  return (
    <Stack mb={2}>
      <Header title={event.type} backButton={true} />
      <Box p={4} shadow="md" borderWidth="1px">
        <Text fontSize="md" color="grey">
          Partner
        </Text>
        <Text>{event.counterParty}</Text>
        <Text fontSize="md" color="grey">
          Currency Network
        </Text>
        <Text>MMK Burmese Kyats</Text>
        <Text fontSize="md" color="grey">
          Give Credit Line
        </Text>
        {given ? (
          <Text>{`${event.given} MMK`}</Text>
        ) : (
          <Text>{`${event.received} MMK`}</Text>
        )}
        <Text fontSize="md" color="grey">
          Receive Credit Line
        </Text>
        {given ? (
          <Text>{`${event.received} MMK`}</Text>
        ) : (
          <Text>{`${event.given} MMK`}</Text>
        )}
      </Box>
    </Stack>
  );
};

export default TrustlineUpdateCard;
