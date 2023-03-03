"use client";

import { Box, Button, Flex, NextLink, Text } from "@/components/chakra";
import { FragmentType, graphql, useFragment } from "@/gql";
import { ClassList_ClassFragmentFragment as ClassFragmentType } from "@/gql/graphql";
import { BoxProps, FlexProps, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import DrawerTemplate from "./DrawerTemplate";

const ClassList_ClassFragment = graphql(`
  fragment ClassList_ClassFragment on Class {
    id
    name
    teacher {
      id
    }
  }
`);

type ClassListItemProps = Omit<BoxProps, "onClick"> & {
  onClick(clickedClass: ClassFragmentType): void;
  class: ClassFragmentType;
};

function ClassListItem({
  class: classData,
  onClick,
  ...rest
}: ClassListItemProps) {
  return (
    <Box
      border="2px"
      borderRadius="lg"
      px="5"
      py="1"
      width="100%"
      bg="secondary-bg"
      onClick={() => onClick(classData)}
      _hover={{
        cursor: "pointer",
      }}
      _active={{
        transform: "scale(0.99, 0.95)",
      }}
      {...rest}
    >
      <Text textAlign="center" fontWeight="600">
        {classData.name}
      </Text>
    </Box>
  );
}

type ClassListProps = FlexProps & {
  classes: FragmentType<typeof ClassList_ClassFragment>[];
};

export default function ClassList({
  classes: classFragments,
  ...rest
}: ClassListProps) {
  const classes = useFragment(ClassList_ClassFragment, classFragments);
  const [selectedClass, setSelectedClass] = useState<
    ClassFragmentType | undefined
  >();
  const { onClose, isOpen } = useDisclosure({
    isOpen: !!selectedClass,
    onClose: () => {
      setSelectedClass(undefined);
    },
  });

  const openModal = (classData: ClassFragmentType) => {
    setSelectedClass(classData);
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
            href={`/${selectedClass?.teacher.id}/class/${selectedClass?.id}`}
            mb="3"
            colorScheme="yellow"
            onClick={() => {
              onClose();
            }}
          >
            Luokan tarkasteluun
          </Button>
          <Button
            as={NextLink}
            href={`/${selectedClass?.teacher.id}/class/${selectedClass?.id}/create-evaluations`}
            onClick={() => {
              onClose();
            }}
          >
            Uusi arviointi
          </Button>
        </Flex>
      </DrawerTemplate>
      <Flex flexDirection="column" {...rest}>
        {classes.map((it) => (
          <ClassListItem
            key={it.id}
            class={it}
            onClick={(clickedClass) => openModal(clickedClass)}
            _notLast={{ mb: 2 }}
          />
        ))}
      </Flex>
    </>
  );
}
