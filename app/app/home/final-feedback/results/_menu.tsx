import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { MenuOption } from "react-native-popup-menu";
import ViewMenuBase from "@/components/common/ViewMenuBase";
import CText from "@/components/primitives/CText";
import { HomeStackParams } from "../../types";
import { useModal } from "@/hooks-and-providers/ModalProvider";
import ExportPDF from "./components/ExportPDF";

export type FinalFeedbackResultsMenuProps = NativeStackScreenProps<HomeStackParams, "final-feedback-results">;

export default function FinalFeedbackResultsMenu({ route, navigation }: FinalFeedbackResultsMenuProps) {
  const { groupId } = route.params;
  const { openModal, closeModal } = useModal();
  const { t } = useTranslation();

  return (
    <ViewMenuBase>
      <MenuOption onSelect={() => navigation.replace("final-feedback", { groupId, noRedirect: true })}>
        <CText>{t("generate-again", "Luo uudelleen")}</CText>
      </MenuOption>
      <MenuOption
        onSelect={() =>
          openModal({
            title: t("export-pdf", "Vie PDF"),
            children: <ExportPDF groupId={groupId} onError={closeModal} onCompleted={closeModal} />,
          })
        }
      >
        <CText>{t("export-pdf", "Vie PDF")}</CText>
      </MenuOption>
    </ViewMenuBase>
  );
}
