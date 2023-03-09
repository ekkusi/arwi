"use client";

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  useDisclosure,
} from "@chakra-ui/react";

type ModalTemplateProps = Omit<ModalProps, "isOpen" | "onClose" | "onOpen"> & {
  headerLabel?: string;
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
};

export default function ModalTemplate({
  headerLabel,
  isOpen: customIsOpen,
  onClose: customOnClose,
  onOpen: customOnOpen,
  children,
  ...rest
}: ModalTemplateProps) {
  const disclosureProps = useDisclosure({
    isOpen: customIsOpen,
    onOpen: customOnOpen,
    onClose: customOnClose,
  });

  return (
    <Modal {...rest} {...disclosureProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        {headerLabel && <ModalHeader>{headerLabel}</ModalHeader>}
        <ModalBody px="5" pb="5" pt={headerLabel ? 0 : 5}>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
