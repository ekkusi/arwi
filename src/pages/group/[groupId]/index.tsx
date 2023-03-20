import { graphql } from "@/gql";
import { serverRequest } from "@/pages/api/graphql";

import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { formatDate } from "@/utils/dateUtils";
import { FiEdit } from "react-icons/fi";
import { GetStaticPropsContext } from "next";
import PageWrapper from "@/components/server-components/PageWrapper";
import BorderedCard from "@/components/server-components/primitives/BorderedCard";
import { GroupOverviewPage_GetGroupQuery } from "@/gql/graphql";
import NoPrefetchLink from "@/components/general/NoPrefetchLink";

export const dynamic = "force-dynamic";

const GroupOverviewPage_GetGroup_Query = graphql(`
  query GroupOverviewPage_GetGroup($groupId: ID!) {
    getGroup(id: $groupId) {
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
  }
`);

type GroupOverviewPageProps = {
  data: GroupOverviewPage_GetGroupQuery;
};

export default function GroupOverviewPage({ data }: GroupOverviewPageProps) {
  const { getGroup: group } = data;
  return (
    <PageWrapper>
      <IconButton
        colorScheme="gray"
        size="lg"
        position="absolute"
        variant="link"
        top="6"
        right="5"
        as={NoPrefetchLink}
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
              as={NoPrefetchLink}
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
              <Text as={NoPrefetchLink} href={`/collection/${collection.id}`}>
                {collection.type}
              </Text>
            </Box>
          ))}
        </Box>
      ) : (
        <>
          <Text>Ei vielä arviointeja</Text>
          <Text
            as={NoPrefetchLink}
            href={`/group/${group.id}/create-collection`}
          >
            Siirry tekemään arviointi
          </Text>
        </>
      )}
    </PageWrapper>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ groupId: string }>) {
  if (!params) throw new Error("Unexpected error, no paramss");
  const data = await serverRequest(GroupOverviewPage_GetGroup_Query, {
    groupId: params.groupId,
  });
  return {
    props: {
      data,
    },
  };
}
