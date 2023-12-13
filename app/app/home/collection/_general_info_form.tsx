import { CollectionTypeMinimal, LearningObjectiveMinimal, MinimalModuleInfo } from "arwi-backend/src/types/general";
import { getEnvironmentsByLevel, getEvaluableLearningObjectivesMinimal } from "arwi-backend/src/utils/subjectUtils";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { CollectionTypeCategory, EnvironmentInfo } from "arwi-backend/src/types";
import CDateTimePicker from "../../../components/form/CDateTimePicker";
import FormField from "../../../components/form/FormField";
import MultiSelectFormField from "../../../components/form/MultiSelectFormField";
import SelectFormField from "../../../components/form/SelectFormField";
import TextFormField from "../../../components/form/TextFormField";
import CButton from "../../../components/primitives/CButton";
import CTextInput from "../../../components/primitives/CTextInput";
import CTouchableOpacity from "../../../components/primitives/CTouchableOpacity";
import CView from "../../../components/primitives/CView";
import { formatDate } from "../../../helpers/dateHelpers";
import { getEnvironmentTranslation } from "../../../helpers/translation";

export type GeneralInfoData = {
  date: Date;
  environment: EnvironmentInfo;
  learningObjectives: LearningObjectiveMinimal[];
  description: string;
  collectionType: CollectionTypeMinimal;
};

type CollectionGeneralInfoFormProps = {
  subjectCode: string;
  moduleInfo: MinimalModuleInfo;
  collectionTypeOptions: CollectionTypeMinimal[];
  initialData?: Partial<GeneralInfoData>;
  handleSubmit: (data: GeneralInfoData) => void;
  buttonIcon?: JSX.Element;
  buttonTitle?: string;
  buttonLoading?: boolean;
};

export default function CollectionGeneralInfoForm({
  subjectCode,
  moduleInfo,
  collectionTypeOptions,
  initialData,
  handleSubmit,
  buttonIcon,
  buttonTitle,
  buttonLoading = false,
}: CollectionGeneralInfoFormProps) {
  const { t } = useTranslation();

  const [selectedEnvironment, setSelectedEnvironment] = useState<EnvironmentInfo | undefined>(initialData?.environment);
  const collectionInitialValue =
    initialData?.collectionType || collectionTypeOptions.find((item) => item.category === CollectionTypeCategory.CLASS_PARTICIPATION);
  const [selectedCollectionType, setSelectedCollectionType] = useState<CollectionTypeMinimal | undefined>(() => collectionInitialValue);
  const [selectedLearningObjectives, setSelectedLearningObjectives] = useState<LearningObjectiveMinimal[]>(initialData?.learningObjectives || []);
  const [date, setDate] = useState(initialData?.date || new Date());
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [description, setDescription] = useState(initialData?.description || "");

  const [environmentError, setEnvironmentError] = useState<string>();
  const [collectionTypeError, setCollectionTypeError] = useState<string>();

  const learningObjectives = getEvaluableLearningObjectivesMinimal(subjectCode, moduleInfo.educationLevel, moduleInfo.learningObjectiveGroupKey);
  const environments = getEnvironmentsByLevel(subjectCode, moduleInfo.educationLevel, moduleInfo.learningObjectiveGroupKey);

  const handleGeneralSubmit = () => {
    if (!selectedEnvironment) {
      setEnvironmentError(
        t("environment-is-obligatory", "{{environment_string}} on pakollinen", {
          environment_string: getEnvironmentTranslation(t, "environment", subjectCode),
        })
      );
      return;
    }
    if (!selectedCollectionType) {
      setCollectionTypeError(t("collection-type-is-obligatory", "Arvioinnin tyyppi on pakollinen"));
      return;
    }
    handleSubmit({
      date,
      environment: selectedEnvironment,
      learningObjectives: selectedLearningObjectives,
      description,
      collectionType: selectedCollectionType,
    });
  };

  return (
    <CView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CView style={{ flex: 8, padding: "md", alignItems: "center", justifyContent: "center", gap: 30 }}>
          <SelectFormField
            title={getEnvironmentTranslation(t, "environment", subjectCode)}
            error={environmentError}
            defaultValue={initialData?.environment}
            onSelect={(item) => {
              setSelectedEnvironment(item);
              setEnvironmentError(undefined);
            }}
            options={environments}
            getOptionValue={(item) => item.code}
            formatLabel={(item) => item.label.fi}
          />
          <SelectFormField
            title={t("collection-type", "Arvioinnin tyyppi")}
            error={collectionTypeError}
            defaultValue={collectionInitialValue}
            onSelect={(item) => {
              setSelectedCollectionType(item);
              setCollectionTypeError(undefined);
            }}
            options={collectionTypeOptions}
            getOptionValue={(item) => item.id}
            formatLabel={(item) => item.name}
          />
          <MultiSelectFormField
            title={t("learningObjectives", "Oppimistavoitteet")}
            defaultValue={initialData?.learningObjectives || []}
            onSelect={(items) => setSelectedLearningObjectives(items)}
            options={learningObjectives}
            formatLabel={(item) => `${item.code}: ${item.label.fi}`}
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
