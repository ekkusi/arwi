import Card from "@/components/server-components/primitives/Card";
import { Button, Flex, Text, BoxProps, FlexProps, useDisclosure } from "@chakra-ui/react";
import { FragmentType, graphql, getFragmentData } from "@/gql";
import { GroupList_GroupFragmentFragment as GroupFragmentType } from "@/gql/graphql";
import { useState } from "react";
import Link from "next/link";
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

function GroupListItem({ group: groupData, onClick, ...rest }: GroupListItemProps) {
  return (
    <Card
      py="2"
      onClick={() => onClick(groupData)}
      _hover={{
        cursor: "pointer",
      }}
      _active={{
        transform: "scale(0.99, 0.95)",
      }}
      {...rest}
    >
      <Text fontWeight="600">{groupData.name}</Text>
    </Card>
  );
}

type GroupListProps = FlexProps & {
  groups: FragmentType<typeof GroupList_GroupFragment>[];
};

export default function GroupList({ groups: groupFragments, ...rest }: GroupListProps) {
  const groups = getFragmentData(GroupList_GroupFragment, groupFragments);

  const sortedGroups = [...groups].sort((a, b) => a.name.localeCompare(b.name));

  const [selectedGroup, setSelectedGroup] = useState<GroupFragmentType | undefined>();
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
      <DrawerTemplate isOpen={isOpen} onClose={onClose} headerLabel="Mitä haluat tehdä?">
        <Flex flexDirection="column" pb="3">
          <Button
            as={Link}
            href={`/group/${selectedGroup?.id}`}
            mb="3"
            colorScheme="blue"
            onClick={() => {
              onClose();
            }}
          >
            Ryhmän tarkasteluun
          </Button>
          <Button
            as={Link}
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
        {sortedGroups.map((it) => (
          <GroupListItem key={it.id} group={it} onClick={(clickedGroup) => openModal(clickedGroup)} _notLast={{ mb: 2 }} />
        ))}
      </Flex>
    </>
  );
}