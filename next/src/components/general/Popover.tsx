import {
  Flex,
  FlexProps,
  forwardRef,
  Icon,
  IconButton,
  IconButtonProps,
  Popover as ChakraPopover,
  PopoverContent,
  PopoverProps,
  PopoverTrigger,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { BsThreeDots } from "react-icons/bs";

type EditPopoverProps = Omit<PopoverProps, "children"> & {
  children: React.ReactNode;
  openButtonProps?: IconButtonProps;
  openButton?: React.ReactNode;
};

export default function Popover({
  children,
  openButtonProps,
  openButton,
  ...rest
}: EditPopoverProps) {
  return (
    <ChakraPopover placement="bottom-start" {...rest}>
      <PopoverTrigger>
        <Flex>
          {openButton || (
            <IconButton
              color="green.500"
              variant="link"
              icon={<BsThreeDots />}
              aria-label="Muokkaa"
              {...openButtonProps}
            />
          )}
        </Flex>
      </PopoverTrigger>
      <PopoverContent
        minWidth="44"
        width="auto"
        maxWidth="100%"
        boxShadow="md"
        color="light-text"
        fontSize="sm"
        p="2"
      >
        {children}
      </PopoverContent>
    </ChakraPopover>
  );
}

export type PopoverItemProps = FlexProps & {
  icon?: IconType;
};

export const PopoverItem = forwardRef<PopoverItemProps, "div">(
  ({ icon, children, ...rest }, ref) => {
    return (
      <Flex
        ref={ref}
        color="inherit"
        px="2"
        py="2"
        borderRadius="md"
        alignItems="center"
        _hover={{
          cursor: "pointer",
          bg: "gray.100",
        }}
        fontWeight="semibold"
        {...rest}
      >
        {icon && <Icon as={icon} mr="2" />}
        {children}
      </Flex>
    );
  }
);
