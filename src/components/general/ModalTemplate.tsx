import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalFooterProps,
  ModalHeader,
  ModalHeaderProps,
  ModalOverlay,
  ModalProps,
  useDisclosure,
} from "@chakra-ui/react";

export type ModalTemplateProps = Omit<
  ModalProps,
  "isOpen" | "onClose" | "onOpen"
> & {
  headerLabel?: string;
  headerProps?: ModalHeaderProps;
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  modalFooter?: JSX.Element;
  modalFooterProps?: ModalFooterProps;
  isClosable?: boolean;
};

export default function ModalTemplate({
  headerLabel,
  headerProps,
  isOpen: customIsOpen,
  onClose: customOnClose,
  onOpen: customOnOpen,
  modalFooter,
  modalFooterProps,
  isClosable = true,
  children,
  ...rest
}: ModalTemplateProps) {
  const disclosureProps = useDisclosure({
    isOpen: customIsOpen,
    onOpen: customOnOpen,
    onClose: customOnClose,
  });

  return (
    <Modal
      closeOnEsc={isClosable}
      closeOnOverlayClick={isClosable}
      {...rest}
      {...disclosureProps}
    >
      <ModalOverlay />
      <ModalContent>
        {isClosable && <ModalCloseButton />}
        {headerLabel && (
          <ModalHeader px={5} pb={1} {...headerProps}>
            {headerLabel}
          </ModalHeader>
        )}
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
