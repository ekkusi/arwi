import { graphql } from "@/gql";
import { serverRequest } from "@/pages/api/graphql";

import { Button, Text, BoxProps } from "@chakra-ui/react";
import FormField from "@/components/general/FormField";
import graphqlClient from "@/graphql-client";
import { formatDate } from "@/utils/dateUtils";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { GetStaticPropsContext } from "next";
import Link from "next/link";
import PageWrapper from "@/components/server-components/PageWrapper";
import BorderedCard from "@/components/server-components/primitives/BorderedCard";
import { CreateCollectionPage_GetGroupQuery } from "@/gql/graphql";
import StudentParticipationList, {
  StudentParticipation,
} from "@/components/functional/StudentParticipationList";

const CreateCollectionPage_GetGroup_Query = graphql(`
  query CreateCollectionPage_GetGroup($groupId: ID!) {
    getGroup(id: $groupId) {
      id
      evaluationTypes
      students {
        ...StudentParticipationList_Student
      }
    }
  }
`);

const CreateCollectionPage_CreateCollection_Mutation = graphql(`
  mutation CreateCollectionPage_CreateCollection(
    $createCollectionInput: CreateCollectionInput!
    $groupId: ID!
  ) {
    createCollection(data: $createCollectionInput, groupId: $groupId) {
      id
    }
  }
`);

type CreateCollectionPageProps = BoxProps & {
  data: CreateCollectionPage_GetGroupQuery;
};

const initialValues = {
  type: "",
  description: "",
  date: formatDate(new Date()),
};

export default function CreateCollectionPage({
  data,
}: CreateCollectionPageProps) {
  const { getGroup: group } = data;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [participations, setParticipations] = useState<StudentParticipation[]>(
    []
  );

  const validateType = (value: string) => {
    let error;
    if (value.length === 0) error = "Tyyppi ei voi olla tyhjä";
    return error;
  };

  const handleSubmit = async (values: typeof initialValues) => {
    setLoading(true);
    try {
      const { createCollection } = await graphqlClient.request(
        CreateCollectionPage_CreateCollection_Mutation,
        {
          groupId: group.id,
          createCollectionInput: {
            ...values,
            evaluations: participations.map((it) => ({
              studentId: it.student.id,
              wasPresent: it.wasPresent,
            })),
          },
        }
      );
      setLoading(false);
      router.push(`/collection/${createCollection.id}/edit`);
    } catch (error) {
      setLoading(false);
      console.error("Error happened:", error);
    }
  };

  const onParticipationsChanged = useCallback(
    (newParticipations: StudentParticipation[]) => {
      setParticipations(newParticipations);
    },
    []
  );

  return (
    <PageWrapper display="flex" flexDirection="column">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => (
          <BorderedCard
            as={Form}
            display="flex"
            flexDirection="column"
            flex="1"
          >
            <Text as="h1" textAlign="center">
              Uusi arviointi
            </Text>
            <FormField name="type" label="Tyyppi" validate={validateType} />
            <FormField name="date" type="date" label="Päivämäärä" />
            <Text as="h2">Oppilaat</Text>
            <StudentParticipationList
              students={group.students}
              onChange={onParticipationsChanged}
              isDisabled={loading}
              mb="5"
            />
            <Button type="submit" marginTop="auto" isLoading={loading}>
              Siirry arvioimaan
            </Button>
            <Text
              as={Link}
              href="/"
              color="gray.700"
              mt="3"
              textTransform="uppercase"
              textAlign="center"
            >
              Peruuta
            </Text>
          </BorderedCard>
        )}
      </Formik>
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
  if (!params) throw new Error("Unexpected error, no params");
  const data = await serverRequest(CreateCollectionPage_GetGroup_Query, {
    groupId: params.groupId,
  });
  return {
    props: {
      data,
    },
  };
}
