"use client";

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalFooterProps,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  useDisclosure,
} from "@chakra-ui/react";

export type ModalTemplateProps = Omit<
  ModalProps,
  "isOpen" | "onClose" | "onOpen"
> & {
  headerLabel?: string;
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  modalFooter?: JSX.Element;
  modalFooterProps?: ModalFooterProps;
};

export default function ModalTemplate({
  headerLabel,
  isOpen: customIsOpen,
  onClose: customOnClose,
  onOpen: customOnOpen,
  modalFooter,
  modalFooterProps,
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
        {modalFooter && (
          <ModalFooter {...modalFooterProps}>{modalFooter}</ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
}
