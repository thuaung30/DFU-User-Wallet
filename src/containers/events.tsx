import { Stack } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import AlertCard from "../components/AlertCard";
import EventListCard from "../components/events/EventListCard";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { getCurrentAccountSelector } from "../features/account/select";
import { Account } from "../features/account/types";
import { fetchEvents } from "../features/events/eventSlice";
import { getEvents } from "../features/events/select";

const Events: React.FC = () => {
  const account: Account | {} = useAppSelector(getCurrentAccountSelector);

  const events = useAppSelector(getEvents);
  const loading = useAppSelector((state) => state.events.fetching);
  const error = useAppSelector((state) => state.events.error);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!account && isEmpty(account)) {
      navigate("/landing");
    } else {
      (async () => {
        dispatch(fetchEvents((account as Account).walletCredentials));
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <Stack mb={2}>
      <Header title="Events" fontSize="2xl" backButton={true} />
      {!isEmpty(events) ? (
        <EventListCard events={events} />
      ) : loading ? (
        <Loading />
      ) : (
        error && <AlertCard message="Something went wrong." />
      )}
    </Stack>
  );
};

export default Events;
