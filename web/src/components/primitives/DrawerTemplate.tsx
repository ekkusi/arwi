import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, DrawerProps, useDisclosure } from "@chakra-ui/react";

type DrawerTemplateProps = Omit<DrawerProps, "isOpen" | "onClose" | "onOpen"> & {
  headerLabel?: string;
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
};

export default function DrawerTemplate({
  headerLabel,
  isOpen: customIsOpen,
  onClose: customOnClose,
  onOpen: customOnOpen,
  children,
  ...rest
}: DrawerTemplateProps) {
  const disclosureProps = useDisclosure({
    isOpen: customIsOpen,
    onOpen: customOnOpen,
    onClose: customOnClose,
  });

  return (
    <Drawer placement="bottom" {...rest} {...disclosureProps}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        {headerLabel && <DrawerHeader>{headerLabel}</DrawerHeader>}
        <DrawerBody px="5" pb="5" pt={headerLabel ? 0 : 5}>
          {children}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
