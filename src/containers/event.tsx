import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppSelector } from "../app/hooks";
import TransferCard from "../components/event/TransferCard";
import TrustlineUpdateCard from "../components/event/TrustlineUpdateCard";
import { getCurrentAccountSelector } from "../features/account/select";
import { Account } from "../features/account/types";
import {
  NetworkTransferEvent,
  NetworkTrustlineUpdateEvent,
} from "../features/events/types";

const Event: React.FC = () => {
  const account: Account | {} = useAppSelector(getCurrentAccountSelector);
  const { id } = useParams();
  const event = useAppSelector((state) => state.events.data[id]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEmpty(account)) {
      navigate("/landing");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  if (event.type === "TrustlineUpdate") {
    return <TrustlineUpdateCard event={event as NetworkTrustlineUpdateEvent} />;
  } else if (event.type === "TrustlineUpdateRequest") {
    return <TrustlineUpdateCard event={event as NetworkTrustlineUpdateEvent} />;
  } else if (event.type === "Transfer") {
    return <TransferCard event={event as NetworkTransferEvent} />;
  } else {
    return null;
  }
};

export default Event;
