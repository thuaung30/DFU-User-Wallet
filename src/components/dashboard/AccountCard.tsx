import { Box, Heading, Button, Text, chakra, Divider } from "@chakra-ui/react";
import React from "react";
import { Account } from "../../features/account/types";
import { NetworkUserData } from "../../features/networkUserData/types";

interface AccountCardProps {
  account: Account;
  networkUserData: NetworkUserData;
  onClickExport: () => Promise<void>;
}

const AccountCard: React.FC<AccountCardProps> = ({
  onClickExport,
  account,
  networkUserData,
}) => {
  return (
    <Box p={4} shadow="md" borderWidth="1px">
      <Heading size="md">Wallet Address</Heading>
      <Text color="grey" fontSize="md">
        {account.address}
      </Text>
      <Box fontSize="lg">
        <chakra.span fontWeight="bold">{`${networkUserData?.leftReceived} MMK`}</chakra.span>
        <chakra.span color="grey"> Available</chakra.span>
      </Box>
      <Text
        color="grey"
        fontSize="sm"
      >{`${networkUserData?.balance} MMK`}</Text>
      <Divider my={2} />
      <Button onClick={onClickExport} size="xs" colorScheme="gray">
        Export private key
      </Button>
    </Box>
  );
};

export default AccountCard;
