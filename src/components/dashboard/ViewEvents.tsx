import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Tag, TagLabel, TagRightIcon, Center } from "@chakra-ui/react";
import React from "react";

interface ViewEventsProps {
  onClick?: () => void;
}

const ViewEvents: React.FC<ViewEventsProps> = ({ onClick }) => {
  return (
    <Center>
      <Tag
        _hover={{ cursor: "pointer" }}
        my={2}
        size="sm"
        variant="outline"
        colorScheme="blue"
        onClick={onClick}
      >
        <TagLabel>View more events</TagLabel>
        <TagRightIcon as={ArrowForwardIcon} />
      </Tag>
    </Center>
  );
};

export default ViewEvents;
