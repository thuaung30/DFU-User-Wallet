import { Input, Stack, Text } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import AlertCard from "../components/AlertCard";
import RoundButton from "../components/RoundButton";
import { recoverFromPrivateKey } from "../features/account/accountSlice";

const Login = () => {
  const accountAddress = useAppSelector(
    (state) => state.account.selectedAccountAddress
  );
  const account = useAppSelector(
    (state) => state.account.data[accountAddress!]
  );
  const loading = useAppSelector((state) => state.account.fetching);
  const error = useAppSelector((state) => state.account.error);
  const privateKeyRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const recover = useCallback(() => {
    if (privateKeyRef.current?.value) {
      dispatch(recoverFromPrivateKey(privateKeyRef.current!.value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!!account && !isEmpty(account)) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <Stack mb={2}>
      <Text fontSize="xl">Enter your private key.</Text>
      <Input ref={privateKeyRef} placeholder="0x..." />
      {error && <AlertCard message="Something went wrong." />}
      <RoundButton isLoading={loading} onClick={recover}>
        Login
      </RoundButton>
    </Stack>
  );
};

export default Login;
