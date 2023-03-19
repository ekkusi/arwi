"use client";

import BorderedCard from "@/app/(server-components)/primitives/BorderedCard";
import { Box, Flex, IconButton, NextLink, Text } from "@/components/chakra";
import { FragmentType, graphql, getFragmentData } from "@/gql";
import { formatDate } from "@/utils/dateUtils";
import { FiEdit } from "react-icons/fi";

const GroupOverviewPageContent_GroupFragment = graphql(`
  fragment GroupOverviewPageContent_Group on Group {
    id
    name
    students {
      id
      name
    }
    evaluationCollections {
      id
      date
      type
    }
  }
`);

type GroupOverviewPageContentProps = {
  group: FragmentType<typeof GroupOverviewPageContent_GroupFragment>;
};

export default function GroupOverviewPageContent({
  group: groupFragment,
}: GroupOverviewPageContentProps) {
  const group = getFragmentData(
    GroupOverviewPageContent_GroupFragment,
    groupFragment
  );
  return (
    <>
      <IconButton
        colorScheme="gray"
        size="lg"
        position="absolute"
        variant="link"
        top="6"
        right="5"
        as={NextLink}
        icon={<FiEdit />}
        aria-label="Ryhmän muokkaukseen"
        href={`/group/${group.id}/edit`}
      />
      <Text as="h1" mr="10">
        Ryhmä: {group.name}
      </Text>
      <Text as="h2" mb="5">
        Oppilaat:
      </Text>
      {group.students.length > 0 ? (
        <Flex flexDirection="column" mb="5">
          {group.students.map((student) => (
            <BorderedCard
              key={student.id}
              border="none"
              borderRadius="lg"
              px="5"
              py="2"
              width="100%"
              as={NextLink}
              href={`/student/${student.id}`}
              _notLast={{ mb: 3 }}
            >
              {student.name}
            </BorderedCard>
          ))}
        </Flex>
      ) : (
        <Box mb="5">
          <Text>Ei oppilaita</Text>
        </Box>
      )}
      <Text as="h2" mt="5">
        Arvioinnit:
      </Text>
      {group.evaluationCollections.length > 0 ? (
        <Box>
          {group.evaluationCollections.map((collection) => (
            <Box key={collection.id}>
              <Text as="span" textStyle="italic" mr="1">
                {formatDate(new Date(collection.date), "dd.MM.yyyy")}:
              </Text>
              <NextLink href={`/collection/${collection.id}`}>
                {collection.type}
              </NextLink>
            </Box>
          ))}
        </Box>
      ) : (
        <>
          <Text>Ei vielä arviointeja</Text>
          <NextLink href={`/group/${group.id}/create-collection`}>
            Siirry tekemään arviointi
          </NextLink>
        </>
      )}
    </>
  );
}