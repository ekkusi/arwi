import PageWrapper from "@/app/(server-components)/PageWrapper";
import { graphql } from "@/gql";
import { serverRequest } from "@/pages/api/graphql";
import GroupOverviewPageContent from "./GroupOverviewPageContent";

export const dynamic = "force-dynamic";

type GroupOverviewPageProps = {
  params: {
    groupId: string;
  };
};

const GroupOverviewPage_GetGroupQuery = graphql(`
  query GroupOverviewPage_GetGroup($groupId: ID!) {
    getGroup(id: $groupId) {
      ...GroupOverviewPageContent_Group
    }
  }
`);

export default async function GroupOverviewPage({
  params,
}: GroupOverviewPageProps) {
  // const session = await getSessionOrRedirect();
  const { getGroup: group } = await serverRequest(
    GroupOverviewPage_GetGroupQuery,
    {
      groupId: params.groupId,
    }
  );
  return (
    <PageWrapper>
      <GroupOverviewPageContent group={group} />
    </PageWrapper>
  );
}
