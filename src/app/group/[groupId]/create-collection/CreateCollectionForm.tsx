"use client";

import BorderedCard from "@/app/(server-components)/primitives/BorderedCard";
import { Button, NextLink, Text } from "@/components/chakra";
import FormField from "@/components/FormField";
import { FragmentType, graphql, useFragment } from "@/gql";
import graphqlClient from "@/graphql-client";
import { formatDate } from "@/utils/dateUtils";
import { BoxProps } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import StudentParticipationList, {
  StudentParticipation,
} from "./StudentParticipationList";

type CreateCollectionFormProps = BoxProps & {
  group: FragmentType<typeof CreateCollectionForm_GroupFragment>;
};

const initialValues = {
  type: "",
  description: "",
  date: formatDate(new Date()),
};

const CreateCollectionForm_GroupFragment = graphql(`
  fragment CreateCollectionForm_Group on Group {
    id
    evaluationTypes
    students {
      ...StudentParticipationList_Student
    }
  }
`);

const CreateCollectionForm_CreateCollectionMutation = graphql(`
  mutation CreateCollectionForm_CreateCollection(
    $createCollectionInput: CreateCollectionInput!
    $groupId: ID!
  ) {
    createCollection(data: $createCollectionInput, groupId: $groupId) {
      id
    }
  }
`);

export default function CreateCollectionForm({
  group: groupFragment,
  ...rest
}: CreateCollectionFormProps) {
  const groupData = useFragment(
    CreateCollectionForm_GroupFragment,
    groupFragment
  );
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
        CreateCollectionForm_CreateCollectionMutation,
        {
          groupId: groupData.id,
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
      router.push(`/collection/${createCollection.id}/update-evaluations`);
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
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <BorderedCard as={Form} display="flex" flexDirection="column" {...rest}>
          <Text as="h1" textAlign="center">
            Uusi arviointi
          </Text>
          <FormField name="type" label="Tyyppi" validate={validateType} />
          <FormField name="date" type="date" label="Päivämäärä" />
          <Text as="h2">Oppilaat</Text>
          <StudentParticipationList
            students={groupData.students}
            onChange={onParticipationsChanged}
            isDisabled={loading}
          />
          <Button type="submit" marginTop="auto" isLoading={loading}>
            Siirry arvioimaan
          </Button>
          <NextLink
            href="/"
            color="gray.700"
            mt="3"
            textTransform="uppercase"
            textAlign="center"
          >
            Peruuta
          </NextLink>
        </BorderedCard>
      )}
    </Formik>
  );
}
