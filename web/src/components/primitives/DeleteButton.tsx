import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";

type DeleteButtonProps = IconButtonProps;

export default function DeleteButton(props: DeleteButtonProps) {
  return <IconButton colorScheme="red" variant="ghost" color="red.600" icon={<AiFillDelete />} {...props} />;
}
