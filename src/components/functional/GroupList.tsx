"use client";

import { Box, Button, Flex, NextLink, Text } from "@/components/chakra";
import { FragmentType, graphql, getFragmentData } from "@/gql";
import { GroupList_GroupFragmentFragment as GroupFragmentType } from "@/gql/graphql";
import { BoxProps, FlexProps, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import DrawerTemplate from "../general/DrawerTemplate";

const GroupList_GroupFragment = graphql(`
  fragment GroupList_GroupFragment on Group {
    id
    name
    teacher {
      id
    }
  }
`);

type GroupListItemProps = Omit<BoxProps, "onClick"> & {
  onClick(clickedGroup: GroupFragmentType): void;
  group: GroupFragmentType;
};

function GroupListItem({
  group: groupData,
  onClick,
  ...rest
}: GroupListItemProps) {
  return (
    <Box
      border="2px"
      borderRadius="lg"
      px="5"
      py="1"
      width="100%"
      bg="secondary-bg"
      onClick={() => onClick(groupData)}
      _hover={{
        cursor: "pointer",
      }}
      _active={{
        transform: "scale(0.99, 0.95)",
      }}
      {...rest}
    >
      <Text textAlign="center" fontWeight="600">
        {groupData.name}
      </Text>
    </Box>
  );
}

type GroupListProps = FlexProps & {
  groups: FragmentType<typeof GroupList_GroupFragment>[];
};

export default function GroupList({
  groups: groupFragments,
  ...rest
}: GroupListProps) {
  const groups = getFragmentData(GroupList_GroupFragment, groupFragments);
  const [selectedGroup, setSelectedGroup] = useState<
    GroupFragmentType | undefined
  >();
  const { onClose, isOpen } = useDisclosure({
    isOpen: !!selectedGroup,
    onClose: () => {
      setSelectedGroup(undefined);
    },
  });

  const openModal = (groupData: GroupFragmentType) => {
    setSelectedGroup(groupData);
  };

  return (
    <>
      <DrawerTemplate
        isOpen={isOpen}
        onClose={onClose}
        headerLabel="Mitä haluat tehdä?"
      >
        <Flex flexDirection="column">
          <Button
            as={NextLink}
            href={`/group/${selectedGroup?.id}`}
            mb="3"
            colorScheme="yellow"
            onClick={() => {
              onClose();
            }}
          >
            Ryhmän tarkasteluun
          </Button>
          <Button
            as={NextLink}
            href={`/group/${selectedGroup?.id}/create-collection`}
            onClick={() => {
              onClose();
            }}
          >
            Uusi arviointi
          </Button>
        </Flex>
      </DrawerTemplate>
      <Flex flexDirection="column" {...rest}>
        {groups.map((it) => (
          <GroupListItem
            key={it.id}
            group={it}
            onClick={(clickedGroup) => openModal(clickedGroup)}
            _notLast={{ mb: 2 }}
          />
        ))}
      </Flex>
    </>
  );
}
