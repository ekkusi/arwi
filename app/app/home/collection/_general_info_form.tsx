import { Environment, getEnvironments, getEvaluableLearningObjectivesMinimal, LearningObjectiveMinimal } from "arwi-backend/src/utils/subjectUtils";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import CDateTimePicker from "../../../components/form/CDateTimePicker";
import FormField from "../../../components/form/FormField";
import MultiSelectFormField from "../../../components/form/MultiSelectFormField";
import SelectFormField from "../../../components/form/SelectFormField";
import TextFormField from "../../../components/form/TextFormField";
import CButton from "../../../components/primitives/CButton";
import CTextInput from "../../../components/primitives/CTextInput";
import CTouchableOpacity from "../../../components/primitives/CTouchableOpacity";
import CView from "../../../components/primitives/CView";
import { ClassYearCode } from "../../../gql/graphql";
import { formatDate } from "../../../helpers/dateHelpers";

type CollectionGeneralInfoFormProps = {
  subjectCode: string;
  classYearCode: ClassYearCode;
  defaultEnvironment?: Environment;
  defaultLearningObjectives?: LearningObjectiveMinimal[];
  defaultDescription?: string;
  defaultDate?: Date;
  handleSubmit: (date: Date, environment: Environment, learningObjectives: LearningObjectiveMinimal[], description: string) => void;
  buttonIcon?: JSX.Element;
  buttonTitle?: string;
  buttonLoading?: boolean;
};

export default function CollectionGeneralInfoForm({
  subjectCode,
  classYearCode,
  defaultEnvironment,
  defaultLearningObjectives,
  defaultDescription,
  defaultDate,
  handleSubmit,
  buttonIcon,
  buttonTitle,
  buttonLoading = false,
}: CollectionGeneralInfoFormProps) {
  const { t } = useTranslation();

  const [selectedEnvironmentCode, setSelectedEnvironmentCode] = useState<Environment | undefined>(defaultEnvironment);
  const [selectedLearningObjectiveCode, setSelectedLearningObjectivesCode] = useState<LearningObjectiveMinimal[]>(defaultLearningObjectives || []);
  const [date, setDate] = useState(defaultDate || new Date());
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [description, setDescription] = useState(defaultDescription || "");

  const [environmentError, setEnvironmentError] = useState<string>();

  const learningObjectives = getEvaluableLearningObjectivesMinimal(subjectCode, classYearCode);
  const environments = getEnvironments(subjectCode);

  const handleGeneralSubmit = () => {
    if (!selectedEnvironmentCode) {
      setEnvironmentError(t("environment-is-obligatory", "Ympäristö on pakollinen"));
      return;
    }
    handleSubmit(date, selectedEnvironmentCode, selectedLearningObjectiveCode, description);
  };

  return (
    <CView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CView style={{ flex: 8, padding: "md", alignItems: "center", justifyContent: "center", gap: 30 }}>
          <SelectFormField
            title={t("environment", "Ympäristö")}
            error={environmentError}
            defaultValue={defaultEnvironment}
            onSelect={(item) => {
              setSelectedEnvironmentCode(item);
              setEnvironmentError(undefined);
            }}
            options={environments}
            getOptionValue={(item) => item.code}
            formatLabel={(item) => item.label}
          />
          <MultiSelectFormField
            title={t("learningObjectives", "Oppimistavoitteet")}
            defaultValue={defaultLearningObjectives || []}
            onSelect={(items) => setSelectedLearningObjectivesCode(items)}
            options={learningObjectives}
            formatLabel={(item) => `${item.code}: ${item.label}`}
            getOptionValue={(item) => item.code}
          />
          <FormField title={t("date", "Päivämäärä")}>
            <CTouchableOpacity onPress={() => setIsDateOpen(true)}>
              <CView pointerEvents="none">
                <CTextInput value={formatDate(date)} editable={false} />
              </CView>
            </CTouchableOpacity>
          </FormField>
          <CDateTimePicker
            value={date}
            isOpen={isDateOpen}
            onClose={() => setIsDateOpen(false)}
            onChange={(_, newDate) => newDate && setDate(newDate)}
          />
          {/* )} */}
          <TextFormField
            as="textarea"
            value={description}
            title={t("more-info", "Lisätietoa")}
            placeholder={`${t("more-info")}...`}
            onChange={(text) => setDescription(text)}
            style={{ paddingBottom: 20 }}
          />
        </CView>
      </ScrollView>
      <CView style={{ position: "absolute", justifyContent: "flex-end", bottom: "md", right: "md", padding: "lg" }}>
        <CView style={{ justifyContent: "flex-end", flexDirection: "row" }}>
          <CButton loading={buttonLoading} disabled={!!environmentError} onPress={handleGeneralSubmit} title={buttonTitle} leftIcon={buttonIcon} />
        </CView>
      </CView>
    </CView>
  );
}
