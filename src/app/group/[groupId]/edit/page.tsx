import PageWrapper from "@/app/(server-components)/PageWrapper";
import { graphql } from "@/gql";
import { serverRequest } from "@/pages/api/graphql";
import EditGroupPageContent from "./EditGroupPageContent";

// Necessary for revalidation to work
export const dynamic = "force-dynamic";

type EditGroupPageProps = {
  params: {
    groupId: string;
  };
};

const EditGroupPage_GetGroupQuery = graphql(`
  query EditGroupPage_GetGroup($groupId: ID!) {
    getGroup(id: $groupId) {
      ...EditGroupPageContent_Group
    }
  }
`);

export default async function EditGroupPage({ params }: EditGroupPageProps) {
  // const session = await getSessionOrRedirect();
  const { getGroup: group } = await serverRequest(EditGroupPage_GetGroupQuery, {
    groupId: params.groupId,
  });
  return (
    <PageWrapper>
      <EditGroupPageContent group={group} />
    </PageWrapper>
  );
}
