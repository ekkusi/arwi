import { Button, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import ModalTemplate, { ModalTemplateProps } from "./ModalTemplate";

export type ConfirmationModalProps = Omit<ModalTemplateProps, "openButton"> & {
  onAccept: () => Promise<void> | void;
  awaitBeforeClose?: boolean;
  variant?: "regular" | "delete";
  acceptLabel?: string;
  cancelLabel?: string;
};

function ConfirmationModal({
  onAccept,
  onClose,
  awaitBeforeClose = false,
  variant = "delete",
  acceptLabel = "Poista",
  cancelLabel = "Peruuta",
  isOpen,
  ...modalTemplateProps
}: ConfirmationModalProps): JSX.Element {
  const [loading, setLoading] = useState(false);

  const disclosureProps = useDisclosure({
    isOpen,
    onClose,
  });

  const acceptAndClose = async () => {
    if (awaitBeforeClose) {
      setLoading(true);
      await onAccept();
      setLoading(false);
    } else {
      onAccept();
    }
  };

  return (
    <ModalTemplate
      headerLabel="Oletko varma?"
      modalFooter={
        <>
          <Button
            variant={variant === "delete" ? "alert" : "solid"}
            isLoading={loading}
            onClick={acceptAndClose}
            mr="3"
          >
            {acceptLabel}
          </Button>
          <Button
            variant="ghost"
            colorScheme="gray"
            isDisabled={loading}
            onClick={() => disclosureProps.onClose()}
          >
            {cancelLabel}
          </Button>
        </>
      }
      {...modalTemplateProps}
      {...disclosureProps}
    />
  );
}

export default ConfirmationModal;
