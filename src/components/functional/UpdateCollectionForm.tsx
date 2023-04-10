import { FragmentType, getFragmentData, graphql } from "@/gql";
import { UpdateCollectionForm_EnvironmentFragmentDoc } from "@/gql/graphql";
import { formatDate } from "@/utils/dateUtils";
import { Button, Text, Textarea } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import FormField from "../general/FormField";
import Card from "../server-components/primitives/Card";
import EnvironmentSelect from "./EnvironmentSelect";
import StudentParticipationList, {
  StudentParticipation,
} from "./StudentParticipationList";

const UpdateCollectionForm_Environment_Fragment = graphql(`
  fragment UpdateCollectionForm_Environment on Environment {
    label
    code
    color
  }
`);

const UpdateCollectionForm_Group_Fragment = graphql(`
  fragment UpdateCollectionForm_Group on Group {
    subject {
      environments {
        ...UpdateCollectionForm_Environment
      }
    }
    students {
      id
      name
    }
  }
`);

const UpdateCollectionForm_Collection_Fragment = graphql(`
  fragment UpdateCollectionForm_Collection on EvaluationCollection {
    type
    date
    description
    environment {
      code
    }
    group {
      subject {
        environments {
          ...UpdateCollectionForm_Environment
        }
      }
    }
    evaluations {
      wasPresent
      student {
        id
        name
      }
    }
  }
`);

const defaultInitialValues = {
  description: "",
  date: formatDate(new Date(), "yyyy-MM-dd"),
  environmentCode: "",
};

export type FormData = typeof defaultInitialValues;

type UpdateCollectionFormProps = {
  onSubmit: (
    values: FormData,
    participations: StudentParticipation[]
  ) => Promise<void>;
  group?: FragmentType<typeof UpdateCollectionForm_Group_Fragment>;
  collection?: FragmentType<typeof UpdateCollectionForm_Collection_Fragment>;
};

export default function UpdateCollectionForm({
  onSubmit,
  group: groupFragment,
  collection: collectionFragment,
}: UpdateCollectionFormProps) {
  const group = getFragmentData(
    UpdateCollectionForm_Group_Fragment,
    groupFragment
  );
  const router = useRouter();

  const collection = getFragmentData(
    UpdateCollectionForm_Collection_Fragment,
    collectionFragment
  );

  if (!group && !collection)
    throw new Error("You have to pass either collection or group as a prop");

  const environmentFragments = collection
    ? collection.group.subject.environments
    : group?.subject.environments || [];
  const environments = environmentFragments.map((it) =>
    getFragmentData(UpdateCollectionForm_EnvironmentFragmentDoc, it)
  );

  const initialValues = collection
    ? {
        date: formatDate(new Date(collection.date), "yyyy-MM-dd"),
        description: collection.description || "",
        environmentCode: collection.environment.code || "",
      }
    : defaultInitialValues;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [participations, setParticipations] = useState<StudentParticipation[]>(
    () => {
      let initialParticipations: StudentParticipation[] = [];
      if (collection) initialParticipations = collection.evaluations;
      else if (group)
        initialParticipations = group.students.map((student) => ({
          wasPresent: true,
          student,
        }));
      return initialParticipations;
    }
  );

  const onParticipationsChanged = useCallback(
    (newParticipations: StudentParticipation[]) => {
      setParticipations(newParticipations);
    },
    []
  );

  const handleSubmit = async (values: FormData) => {
    setIsSubmitting(true);
    await onSubmit(values, participations);
    setIsSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues || defaultInitialValues}
      onSubmit={handleSubmit}
    >
      {() => (
        <Card as={Form} display="flex" flexDirection="column" flex="1">
          <Text as="h1" textAlign="center">
            {collection ? "Arvioinnin muokkaus" : "Uusi arviointi"}
          </Text>
          <FormField
            label="Ympäristö"
            name="environmentCode"
            validate={(value) =>
              value.length === 0 ? "Ympäristö pitää olla valittu" : ""
            }
            render={({
              field: { name },
              form: { setFieldValue, setFieldTouched },
            }) => (
              <EnvironmentSelect
                environments={environments}
                initialCode={initialValues.environmentCode}
                onChange={(newValue) => {
                  setFieldTouched(name, true);
                  setFieldValue(name, newValue?.code || null);
                }}
              />
            )}
          />
          <FormField name="date" type="date" label="Päivämäärä" />
          <FormField
            as={Textarea}
            label="Muita tietoja"
            name="description"
            placeholder="Muita tietoja arviointikertaan liittyen..."
          />
          <Text as="h2">Oppilaat</Text>
          <StudentParticipationList
            initialParticipations={participations}
            onChange={onParticipationsChanged}
            isDisabled={isSubmitting}
            mb="5"
          />
          <Button type="submit" marginTop="auto" isLoading={isSubmitting}>
            {collection ? "Tallenna" : "Siirry arvioimaan"}
          </Button>
          <Text
            as="a"
            color="gray.700"
            mt="3"
            textTransform="uppercase"
            textAlign="center"
            onClick={() => router.back()}
          >
            Peruuta
          </Text>
        </Card>
      )}
    </Formik>
  );
}
