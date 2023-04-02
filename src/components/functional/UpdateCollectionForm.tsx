import { FragmentType, getFragmentData, graphql } from "@/gql";
import { formatDate } from "@/utils/dateUtils";
import { Button, Link, Text, Textarea } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useCallback, useState } from "react";
import FormField from "../general/FormField";
import Card from "../server-components/primitives/Card";
import StudentParticipationList, {
  StudentParticipation,
} from "./StudentParticipationList";

const UpdateCollectionForm_Group_Fragment = graphql(`
  fragment UpdateCollectionForm_Group on Group {
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
  type: "",
  description: "",
  date: formatDate(new Date(), "yyyy-MM-dd"),
};

type UpdateCollectionFormProps = {
  onSubmit: (
    values: typeof defaultInitialValues,
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

  const collection = getFragmentData(
    UpdateCollectionForm_Collection_Fragment,
    collectionFragment
  );

  if (!group && !collection)
    throw new Error("You have to pass either collection or group as a prop");

  const initialValues = collection
    ? {
        type: collection.type,
        date: formatDate(new Date(collection.date), "yyyy-MM-dd"),
        description: collection.description || "",
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

  const validateType = (value: string) => {
    let error;
    if (value.length === 0) error = "Tyyppi ei voi olla tyhjä";
    return error;
  };

  const onParticipationsChanged = useCallback(
    (newParticipations: StudentParticipation[]) => {
      setParticipations(newParticipations);
    },
    []
  );

  const handleSubmit = async (values: typeof initialValues) => {
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
            Uusi arviointi
          </Text>
          <FormField
            name="type"
            label="Aihe"
            placeholder="Arvioinnin aihe"
            validate={validateType}
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
        </Card>
      )}
    </Formik>
  );
}
