import { Stack, useToast } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import AccountCard from "../components/dashboard/AccountCard";
import AlertCard from "../components/AlertCard";
import Header from "../components/Header";
import Loading from "../components/Loading";
import ViewEvents from "../components/dashboard/ViewEvents";
import { getCurrentAccountSelector } from "../features/account/select";
import { Account } from "../features/account/types";
import { fetchNetworkUserData } from "../features/networkUserData/networkUserDataSlice";
import { getNetworkUserDataForCurrentAccountSelector } from "../features/networkUserData/select";
import { NetworkUserData } from "../features/networkUserData/types";
import RoundButton from "../components/RoundButton";
import { logOut } from "../features/account/accountSlice";
import SendModal from "../components/dashboard/SendModal";
import { useSendPaymentMutation } from "../api/api";

const Dashboard = () => {
  const account: Account | {} = useAppSelector(getCurrentAccountSelector);
  const networkUserData: NetworkUserData | {} = useAppSelector(
    getNetworkUserDataForCurrentAccountSelector
  );
  const loading = useAppSelector((state) => state.networkUserData.fetching);
  const error = useAppSelector((state) => state.networkUserData.error);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [sendPayment, { isSuccess, isLoading, isError }] =
    useSendPaymentMutation();
  const toast = useToast();

  const onClickExport = useCallback(
    async () => {
      await navigator.clipboard.writeText(
        (account as Account).walletCredentials.meta.signingKey.privateKey
      );
      toast({
        title: "Exported private key.",
        description: "Your private key was exported and copied to clipboard.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [account]
  );

  const onClickViewEvents = useCallback(() => {
    navigate("/events");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickSend = useCallback(
    async (receiverAddress: string, value: string) => {
      if (!isEmpty(account)) {
        await sendPayment({
          receiverAddress,
          value,
          wallet: (account as Account).walletCredentials,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [account]
  );

  const onClickLogOut = useCallback(() => {
    dispatch(logOut());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isEmpty(account)) {
      navigate("/landing");
    } else {
      dispatch(fetchNetworkUserData((account as Account).address));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, isSuccess]);

  return (
    <Stack mb={2}>
      <Header title="Dashboard" fontSize="2xl" />
      {!isEmpty(account) && !isEmpty(networkUserData) ? (
        <AccountCard
          account={account as Account}
          networkUserData={networkUserData as NetworkUserData}
          onClickExport={onClickExport}
        />
      ) : loading ? (
        <Loading />
      ) : (
        error && <AlertCard message="Something went wrong." />
      )}
      <ViewEvents onClick={onClickViewEvents} />
      <SendModal loading={isLoading} error={isError} send={onClickSend} />
      <RoundButton onClick={onClickLogOut}>Logout</RoundButton>
    </Stack>
  );
};

export default Dashboard;
