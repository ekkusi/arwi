import { graphql } from "@/gql";
import { serverRequest } from "@/pages/api/graphql";

import {
  Button,
  Flex,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { formatDate } from "@/utils/dateUtils";
import { FiEdit } from "react-icons/fi";
import { GetStaticPropsContext } from "next";
import PageWrapper from "@/components/server-components/PageWrapper";
import Card from "@/components/server-components/primitives/Card";
import { GroupOverviewPage_GetGroupQuery } from "@/gql/graphql";
import Link from "next/link";
import useSWR, { SWRConfig } from "swr";
import graphqlClient from "@/graphql-client";
import { useRouter } from "next/router";
import LoadingIndicator from "@/components/general/LoadingIndicator";

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

function GroupOverviewPageContent() {
  const router = useRouter();
  const groupId = router.query.groupId as string;

  const { data } = useSWR<GroupOverviewPage_GetGroupQuery>(
    `group/${groupId}`,
    () => graphqlClient.request(GroupOverviewPage_GetGroup_Query, { groupId })
  );

  if (!data) return <LoadingIndicator />;
  const { getGroup: group } = data;

  const sortedStudents = group.students.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const sortedCollections = group.evaluationCollections.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <PageWrapper>
      <IconButton
        colorScheme="gray"
        size="lg"
        position="absolute"
        variant="link"
        top="6"
        right="5"
        as={Link}
        icon={<FiEdit />}
        aria-label="Ryhmän muokkaukseen"
        href={`/group/${group.id}/edit`}
      />
      <Text as="h1" mr="10" textAlign="center">
        {group.name}
      </Text>
      <Tabs isFitted>
        <TabList>
          <Tab>Oppilaat</Tab>
          <Tab>Arvioinnit</Tab>
          <Tab>Tavoitteet</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {sortedStudents.length > 0 ? (
              <Flex flexDirection="column">
                {sortedStudents.map((student) => (
                  <Card
                    as={Link}
                    key={student.id}
                    py="2"
                    href={`/student/${student.id}`}
                    _notLast={{ mb: 3 }}
                  >
                    {student.name}
                  </Card>
                ))}
              </Flex>
            ) : (
              <Text>Ei oppilaita</Text>
            )}
          </TabPanel>
          <TabPanel>
            {sortedCollections.length > 0 ? (
              <Flex flexDirection="column">
                {sortedCollections.map((collection) => (
                  <Card
                    key={collection.id}
                    as={Link}
                    href={`/collection/${collection.id}`}
                    py="2"
                    _notLast={{ mb: 3 }}
                  >
                    {formatDate(new Date(collection.date))}: {collection.type}
                  </Card>
                ))}
              </Flex>
            ) : (
              <>
                <Text mb="3">Arviointeja ryhmälle ei vielä olla tehty</Text>
                <Button
                  as={Link}
                  width="100%"
                  href={`/group/${group.id}/create-collection`}
                >
                  Tee arviointi
                </Button>
              </>
            )}
          </TabPanel>
          <TabPanel>
            <Text>Tavoitteet ovat toistaiseksi työnalla</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </PageWrapper>
  );
}

type GroupOverviewPageProps = {
  data: GroupOverviewPage_GetGroupQuery;
};

export default function GroupOverviewPage({ data }: GroupOverviewPageProps) {
  return (
    <SWRConfig value={{ fallback: data }}>
      <GroupOverviewPageContent />
    </SWRConfig>
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
