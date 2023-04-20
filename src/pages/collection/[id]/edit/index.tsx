import { graphql } from "@/gql";
import useSWR, { SWRConfig } from "swr";
import PageWrapper from "@/components/server-components/PageWrapper";
import graphqlClient from "@/graphql-client";
import { EditCollectionPageQuery } from "@/gql/graphql";
import { useRouter } from "next/router";
import { serverRequest } from "@/pages/api/graphql";
import { GetStaticPropsContext } from "next";
import LoadingIndicator from "@/components/general/LoadingIndicator";
import UpdateCollectionForm, {
  FormData,
} from "@/components/functional/UpdateCollectionForm";
import { StudentParticipation } from "@/components/functional/StudentParticipationList";

const EditCollectionPage_Query = graphql(`
  query EditCollectionPage($id: ID!) {
    getCollection(id: $id) {
      id
      evaluations {
        id
        student {
          id
        }
      }
      ...UpdateCollectionForm_Collection
    }
  }
`);

const EditCollectionPage_UpdateCollection_Mutation = graphql(`
  mutation EditCollectionPage_UpdateCollection(
    $input: UpdateCollectionInput!
    $id: ID!
  ) {
    updateCollection(data: $input, collectionId: $id) {
      id
    }
  }
`);

function EditCollectionPageContent() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data } = useSWR<EditCollectionPageQuery>(
    `collection/${id}/edit`,
    () => graphqlClient.request(EditCollectionPage_Query, { id })
  );

  if (!data) return <LoadingIndicator />;

  const { getCollection: collection } = data;

  const handleSubmit = async (
    values: FormData,
    participations: StudentParticipation[]
  ) => {
    const { description, ...rest } = values;
    try {
      // TODO: This is a bit ugly, but it works for now
      // Map the participations to the evaluations input, find matching id from original evaluations
      const evaluationsInput = participations
        .map((it) => {
          const matchingEvaluation = collection.evaluations.find(
            (evaluation) => it.student.id === evaluation.student.id
          );
          if (!matchingEvaluation) return undefined;
          return {
            id: matchingEvaluation.id,
            wasPresent: it.wasPresent,
          };
        })
        .flatMap((f) => (f ? [f] : []));
      await graphqlClient.request(
        EditCollectionPage_UpdateCollection_Mutation,
        {
          id: collection.id,
          input: {
            description: description.length > 0 ? description : null,
            ...rest,
            evaluations: evaluationsInput,
          },
        }
      );
      router.back();
      // router.push(`/collection/${updateCollection.id}`);
    } catch (error) {
      console.error("Error happened:", error);
    }
  };

  return (
    <PageWrapper>
      <UpdateCollectionForm
        onSubmit={handleSubmit}
        collection={data.getCollection}
      />
    </PageWrapper>
  );
}

type EditCollectionPageProps = {
  data: EditCollectionPageQuery;
};

export default function EditCollectionPage({ data }: EditCollectionPageProps) {
  return (
    <SWRConfig value={{ fallback: data }}>
      <EditCollectionPageContent />
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
}: GetStaticPropsContext<{ id: string }>) {
  if (!params) throw new Error("Unexpected error, no params");
  const data = await serverRequest(EditCollectionPage_Query, {
    id: params.id,
  });

  // Pass data to the page via props
  return { props: { data } };
}
