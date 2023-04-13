import { graphql } from "@/gql";
import { serverRequest } from "@/pages/api/graphql";

import {
  Button,
  Divider,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
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
import Popover, { PopoverItem } from "@/components/general/Popover";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmationModal from "@/components/general/ConfirmationModal";
import { useState } from "react";
import TopNavigationBar from "@/components/functional/TopNavigationBar";
import CollectionsChart from "@/components/functional/CollectionsChart";

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
        environment {
          label
        }
        ...CollectionsChart_EvaluationCollection
      }
    }
  }
`);

const GroupOverviewPage_DeleteGroup_Mutation = graphql(`
  mutation GroupOverviewPage_DeleteGroup($groupId: ID!) {
    deleteGroup(groupId: $groupId)
  }
`);

function GroupOverviewPageContent() {
  const router = useRouter();
  const groupId = router.query.groupId as string;
  const toast = useToast();

  const { data } = useSWR<GroupOverviewPage_GetGroupQuery>(
    `group/${groupId}`,
    () => graphqlClient.request(GroupOverviewPage_GetGroup_Query, { groupId })
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!data) return <LoadingIndicator />;
  const { getGroup: group } = data;

  const sortedStudents = group.students.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const sortedCollections = group.evaluationCollections.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const deleteGroup = async () => {
    await graphqlClient.request(GroupOverviewPage_DeleteGroup_Mutation, {
      groupId: group.id,
    });
    setIsModalOpen(false);
    router.push("/");
    toast({
      title: `Ryhmä '${group.name}' poistettu onnistuneesti.`,
      status: "success",
      isClosable: true,
      position: "top",
    });
  };

  return (
    <PageWrapper>
      <TopNavigationBar>
        <Popover>
          <PopoverItem icon={FiEdit} as={Link} href={`/group/${group.id}/edit`}>
            Muokkaa
          </PopoverItem>
          <Divider />
          <PopoverItem
            icon={RiDeleteBin6Line}
            color="error"
            onClick={() => setIsModalOpen(true)}
          >
            Poista
          </PopoverItem>
        </Popover>
      </TopNavigationBar>
      <ConfirmationModal
        isOpen={isModalOpen}
        awaitBeforeClose
        onClose={() => setIsModalOpen(false)}
        onAccept={() => deleteGroup()}
      >
        <Text>
          Haluatko varmasti poistaa ryhmän? Kaikki ryhmän oppilaiden sekä heidän
          arviointien tiedot poistuvat samalla.
        </Text>
      </ConfirmationModal>
      <Text as="h1" mt="5" textAlign="center">
        {group.name}
      </Text>
      <CollectionsChart collections={group.evaluationCollections} />
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
                    {formatDate(new Date(collection.date))}:{" "}
                    {collection.environment.label}
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
            <Text>Tavoitteet ovat vielä työn alla</Text>
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
