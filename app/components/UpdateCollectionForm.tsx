import { getEnvironments, getLearningObjectives, getSubject } from "arwi-backend/src/utils/subjectUtils";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ClassYearCode } from "arwi-backend/src/types";
import { FragmentType, getFragmentData, graphql } from "../gql";
import { formatDate } from "../helpers/dateHelpers";
import { COLORS } from "../theme";
import FormField from "./form/FormField";
import SelectFormField from "./form/SelectFormField";
import CButton from "./primitives/CButton";
import CTextInput from "./primitives/CTextInput";
import CTouchableOpacity from "./primitives/CTouchableOpacity";
import CView from "./primitives/CView";
import StudentParticipationList, { StudentParticipation } from "./StudentParticipationList";
import TextFormField from "./form/TextFormField";

const UpdateCollectionForm_Group_Fragment = graphql(`
  fragment UpdateCollectionForm_Group on Group {
    subject {
      code
    }
    currentClassYear {
      info {
        code
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
    date
    type
    description
    environment {
      code
      label
      color
    }
    classYear {
      info {
        code
      }
      group {
        subject {
          code
        }
      }
    }
    learningObjectives {
      code
      label
      type
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

type UpdateCollectionFormDataProps =
  | {
      group: FragmentType<typeof UpdateCollectionForm_Group_Fragment>;
      collection?: never;
    }
  | {
      group?: never;
      collection: FragmentType<typeof UpdateCollectionForm_Collection_Fragment>;
    };

export type UpdateCollectionFormData = {
  description: string;
  date: string;
  environmentCode: string;
  learningObjectiveCodes: string[];
};

export type UpdateCollectionFormProps = UpdateCollectionFormDataProps & {
  onSubmit: (values: UpdateCollectionFormData, participations: StudentParticipation[]) => Promise<void>;
};

export default function UpdateCollectionForm({ onSubmit, group: groupFragment, collection: collectionFragment }: UpdateCollectionFormProps) {
  const group = getFragmentData(UpdateCollectionForm_Group_Fragment, groupFragment);
  const collection = getFragmentData(UpdateCollectionForm_Collection_Fragment, collectionFragment);

  if (!group && !collection) throw new Error("You have to pass either collection or group as a prop");

  const { t } = useTranslation();

  const [selectedEnvironmentCode, setSelectedEnvironmentCode] = useState<string | undefined>(collection?.environment.code || undefined);
  const [selectedLearningObjectiveCode, setSelectedLearningObjectivesCode] = useState<string[]>(
    collection?.learningObjectives.map((it) => it.code) || []
  );
  const [date, setDate] = useState(collection?.date ? new Date(collection?.date) : new Date());
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [description, setDescription] = useState(collection?.description || "");

  const [environmentError, setEnvironmentError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);

  const subjectCode = collection ? collection.classYear.group.subject.code : (group?.subject.code as string);
  const classYearCode = collection ? collection.classYear.info.code : (group?.currentClassYear.info.code as ClassYearCode);
  const learningObjectives = getLearningObjectives(subjectCode, classYearCode);
  const environments = getEnvironments(subjectCode);

  const [participations, setParticipations] = useState<StudentParticipation[]>(() => {
    let initialParticipations: StudentParticipation[] = [];
    if (collection) initialParticipations = collection.evaluations;
    else if (group)
      initialParticipations = group.students.map((student) => ({
        wasPresent: true,
        student,
      }));
    return initialParticipations.sort((a, b) => a.student.name.localeCompare(b.student.name));
  });

  const onParticipationsChanged = useCallback((newParticipations: StudentParticipation[]) => {
    setParticipations(newParticipations);
  }, []);

  const handleSubmit = async () => {
    if (!selectedEnvironmentCode) {
      setEnvironmentError(t("CollectionCreationView.environmentError", "Valitse ympäristö"));
      return;
    }
    setSubmitting(true);

    await onSubmit(
      {
        date: formatDate(date, "yyyy-MM-dd"),
        description,
        environmentCode: selectedEnvironmentCode,
        learningObjectiveCodes: selectedLearningObjectiveCode,
      },
      participations
    );
    setSubmitting(false);
  };

  return (
    <CView style={{ flex: 1, paddingHorizontal: 10, paddingTop: 20, gap: 20 }}>
      <SelectFormField
        error={environmentError}
        onSelect={(item) => {
          setSelectedEnvironmentCode(item.value);
          setEnvironmentError(undefined);
        }}
        title={t("environment", "Ympäristö")}
        options={environments.map((it) => ({ value: it.code, label: it.label }))}
      />
      <SelectFormField
        onSelect={(item) => setSelectedLearningObjectivesCode([item.value])}
        title={t("learningObjectives", "Oppimistavoitteet")}
        options={learningObjectives.map((obj) => ({ value: obj.code, label: obj.label }))}
      />
      <FormField title={t("date", "Päivämäärä")}>
        <CTouchableOpacity onPress={() => setIsDateOpen(true)}>
          <CView pointerEvents="none">
            <CTextInput value={formatDate(date)} editable={false} />
          </CView>
        </CTouchableOpacity>
      </FormField>
      {isDateOpen && (
        <DateTimePicker
          textColor={COLORS.primary}
          value={date}
          onChange={(_, newDate) => {
            setIsDateOpen(false);
            if (newDate) setDate(newDate);
          }}
        />
      )}
      <TextFormField title={t("components.UpdateCollectionForm.moreInfo", "Lisätietoa")} onChange={(text) => setDescription(text)} />
      <StudentParticipationList initialParticipations={participations} onChange={onParticipationsChanged} />
      <CButton
        disabled={!!environmentError}
        loading={submitting}
        title={t("CollectionCreationView.startEvaluation", "Aloita arviointi")}
        onPress={() => handleSubmit()}
      />
    </CView>
  );
}
