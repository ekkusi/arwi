import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import CDateTimePicker from "../../../components/form/CDateTimePicker";
import FormField from "../../../components/form/FormField";
import TextFormField from "../../../components/form/TextFormField";
import CButton from "../../../components/primitives/CButton";
import CTextInput from "../../../components/primitives/CTextInput";
import CTouchableOpacity from "../../../components/primitives/CTouchableOpacity";
import CView from "../../../components/primitives/CView";
import { formatDate } from "../../../helpers/dateHelpers";

export type DefaultGeneralInfoData = {
  date: Date;
  description: string;
};

type DefaultCollectionGeneralInfoFormProps = {
  initialData?: Partial<DefaultGeneralInfoData>;
  handleSubmit: (data: DefaultGeneralInfoData) => void;
  buttonIcon?: JSX.Element;
  buttonTitle?: string;
  buttonLoading?: boolean;
};

export default function DefaultCollectionGeneralInfoForm({
  initialData,
  handleSubmit,
  buttonIcon,
  buttonTitle,
  buttonLoading = false,
}: DefaultCollectionGeneralInfoFormProps) {
  const { t } = useTranslation();

  const [date, setDate] = useState(initialData?.date || new Date());
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [description, setDescription] = useState(initialData?.description || "");

  const handleGeneralSubmit = () => {
    handleSubmit({
      date,
      description,
    });
  };

  return (
    <CView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CView style={{ flex: 8, padding: "md", alignItems: "center", justifyContent: "center", gap: 30 }}>
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
          <CButton loading={buttonLoading} onPress={handleGeneralSubmit} title={buttonTitle} leftIcon={buttonIcon} />
        </CView>
      </CView>
    </CView>
  );
}
