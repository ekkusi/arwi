import PageWrapper from "@/app/(server-components)/PageWrapper";
import { graphql } from "@/gql";
import { serverRequest } from "@/pages/api/graphql";
import CreateCollectionForm from "./CreateCollectionForm";

type CreateCollectionPageProps = {
  params: { classId: string };
};

const CreateCollectionPage_GetClassQuery = graphql(`
  query CreateCollectionPage_GetClass($classId: ID!) {
    getClass(id: $classId) {
      ...CreateCollectionForm_Class
    }
  }
`);

export default async function CreateCollectionPage({
  params,
}: CreateCollectionPageProps) {
  const { getClass } = await serverRequest(CreateCollectionPage_GetClassQuery, {
    classId: params.classId,
  });
  return (
    <PageWrapper display="flex" flexDirection="column" hasNavigation={false}>
      <CreateCollectionForm flex="1" class={getClass} />
    </PageWrapper>
  );
}
