import { Stack, Text } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import React, { useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import AlertCard from "../components/AlertCard";
import RoundButton from "../components/RoundButton";
import { signUp } from "../features/account/accountSlice";

const Landing: React.FC = () => {
  const accountAddress = useAppSelector(
    (state) => state.account.selectedAccountAddress
  );
  const account = useAppSelector(
    (state) => state.account.data[accountAddress!]
  );

  const loading = useAppSelector((state) => state.account.fetching);
  const error = useAppSelector((state) => state.account.error);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClickSignUp = useCallback(() => {
    dispatch(signUp());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!!account && !isEmpty(account)) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <>
      <Text my={16} align="center" color="blue.500" fontSize="6xl">
        DFU Wallet
      </Text>
      <Text color="grey" align="center">
        To make payments, you first need to create a trustline with a partner.
      </Text>
      <Text color="grey" mb={8} align="center">
        Each trustline also connects you to friends of friends so you can pay
        anyone in your network.
      </Text>
      <Stack mb={2}>
        {error && <AlertCard message="Something went wrong." />}
        <RoundButton isLoading={loading} onClick={onClickSignUp}>
          Sign up
        </RoundButton>
        <Link to="/login">
          <Text align="center" color="blue.500">
            Login
          </Text>
        </Link>
      </Stack>
    </>
  );
};

export default Landing;
