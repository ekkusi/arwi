"use client";

import { Button, Text } from "@/components/chakra";
import ConfirmationModal from "@/components/general/ConfirmationModal";
import { FragmentType, graphql, getFragmentData } from "@/gql";
import graphqlClient from "@/graphql-client";
import { ButtonProps, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteGroupButton_DeleteGroupMutation = graphql(`
  mutation DeleteGroupButton_DeleteGroup($groupId: ID!) {
    deleteGroup(groupId: $groupId)
  }
`);
const DeleteGroupButton_GroupFragment = graphql(`
  fragment DeleteGroupButton_Group on Group {
    id
    name
  }
`);

type DeleteGroupButtonProps = Omit<ButtonProps, "onClick"> & {
  group: FragmentType<typeof DeleteGroupButton_GroupFragment>;
};

export default function DeleteGroupButton({
  group: groupFragment,
  ...rest
}: DeleteGroupButtonProps) {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const group = getFragmentData(DeleteGroupButton_GroupFragment, groupFragment);

  const deleteGroup = async () => {
    setLoading(true);
    setIsModalOpen(false);
    await graphqlClient.request(DeleteGroupButton_DeleteGroupMutation, {
      groupId: group.id,
    });
    setLoading(false);
    router.push("/");
    toast({
      title: `Ryhmä '${group.name}' poistettu onnistuneesti.`,
      status: "success",
      isClosable: true,
    });
  };

  return (
    <>
      <Button
        colorScheme="red"
        variant="alert"
        isLoading={loading}
        onClick={() => setIsModalOpen(true)}
        {...rest}
      >
        Poista ryhmä
      </Button>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAccept={() => deleteGroup()}
      >
        <Text>
          Oletko varma, että haluat poistaa ryhmän? Kaikken ryhmän oppilaiden
          sekä heidän arviointien tiedot poistuvat samalla lopullisesti.
        </Text>
      </ConfirmationModal>
    </>
  );
}
