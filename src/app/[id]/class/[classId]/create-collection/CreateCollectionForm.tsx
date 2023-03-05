"use client";

import BorderedCard from "@/app/(server-components)/primitives/BorderedCard";
import { Button, Text } from "@/components/chakra";
import FormField from "@/components/FormField";
import LinkToHome from "@/components/LinkToHome";
import { FragmentType, graphql, useFragment } from "@/gql";
import graphqlClient from "@/graphql-client";
import { formatDate } from "@/utils/dateUtils";
import { getSessionClient } from "@/utils/session/client";
import { BoxProps } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import StudentParticipationList, {
  StudentParticipation,
} from "./StudentParticipationList";

type CreateCollectionFormProps = BoxProps & {
  class: FragmentType<typeof CreateCollectionForm_ClassFragment>;
};

const initialValues = {
  type: "",
  description: "",
  date: formatDate(new Date()),
};

const CreateCollectionForm_ClassFragment = graphql(`
  fragment CreateCollectionForm_Class on Class {
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
    $classId: ID!
  ) {
    createCollection(data: $createCollectionInput, classId: $classId) {
      id
    }
  }
`);

export default function CreateCollectionForm({
  class: classFragment,
  ...rest
}: CreateCollectionFormProps) {
  const classData = useFragment(
    CreateCollectionForm_ClassFragment,
    classFragment
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
    const session = await getSessionClient();
    setLoading(true);
    try {
      const { createCollection } = await graphqlClient.request(
        CreateCollectionForm_CreateCollectionMutation,
        {
          classId: classData.id,
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
      router.push(
        `/${session.user.id}/collection/${createCollection.id}/update-evaluations`
      );
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
            students={classData.students}
            onChange={onParticipationsChanged}
            isDisabled={loading}
          />
          <Button type="submit" marginTop="auto" isLoading={loading}>
            Siirry arvioimaan
          </Button>
          <LinkToHome
            color="gray.700"
            mt="3"
            textTransform="uppercase"
            textAlign="center"
          >
            Peruuta
          </LinkToHome>
        </BorderedCard>
      )}
    </Formik>
  );
}
