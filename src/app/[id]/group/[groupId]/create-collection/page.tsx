import PageWrapper from "@/app/(server-components)/PageWrapper";
import { graphql } from "@/gql";
import { serverRequest } from "@/pages/api/graphql";
import CreateCollectionForm from "./CreateCollectionForm";

type CreateCollectionPageProps = {
  params: { groupId: string };
};

const CreateCollectionPage_GetGroupQuery = graphql(`
  query CreateCollectionPage_GetGroup($groupId: ID!) {
    getGroup(id: $groupId) {
      ...CreateCollectionForm_Group
    }
  }
`);

export default async function CreateCollectionPage({
  params,
}: CreateCollectionPageProps) {
  const { getGroup } = await serverRequest(CreateCollectionPage_GetGroupQuery, {
    groupId: params.groupId,
  });
  return (
    <PageWrapper display="flex" flexDirection="column" hasNavigation={false}>
      <CreateCollectionForm flex="1" group={getGroup} />
    </PageWrapper>
  );
}
