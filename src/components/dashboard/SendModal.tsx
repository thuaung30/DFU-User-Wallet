import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  ModalFooter,
  Box,
  Divider,
  useDisclosure,
  Alert,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import RoundButton from "../RoundButton";

type SendModalProps = {
  send: (receiverAddress: string, value: string | number) => Promise<void>;
  loading: boolean;
  error: boolean;
};

const SendModal: React.FC<SendModalProps> = ({ send, loading, error }) => {
  const receiverAddress = useRef<HTMLInputElement>(null);
  const sendValue = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClickSend = async () => {
    try {
      if (
        receiverAddress.current?.value != null &&
        sendValue.current?.value != null
      ) {
        await send(receiverAddress.current.value, sendValue.current.value);
        onClose();
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <RoundButton onClick={onOpen}>Send</RoundButton>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Send Payment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {error && (
              <Alert status="error">
                {`There was an error processing your request.`}
              </Alert>
            )}

            <Input mb={2} ref={receiverAddress} placeholder="0x..." />
            <Input ref={sendValue} placeholder="eg. 1000" />
          </ModalBody>

          <ModalFooter>
            <RoundButton
              isLoading={loading}
              colorScheme="blue"
              onClick={onClickSend}
            >
              Send
            </RoundButton>
            <Box mr={4} height="20px">
              <Divider orientation="vertical" />
            </Box>
            <RoundButton colorScheme="red" onClick={onClose}>
              Close
            </RoundButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SendModal;
