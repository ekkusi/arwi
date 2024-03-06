import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { useTranslation } from "react-i18next";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CButton from "../../../../../components/primitives/CButton";
import CText from "../../../../../components/primitives/CText";
import CView from "../../../../../components/primitives/CView";
import StudentParticipationList from "../../../../../components/StudentParticipationList";
import { COLORS } from "../../../../../theme";
import { useDefaultCollectionCreationContext } from "./DefaultCollectionCreationProvider";
import { DefaultCollectionCreationStackParams } from "./types";
import DefaultCollectionCreationLayout from "./_layout";

function DefaultCollectionParticipationsContent({
  navigation,
}: NativeStackScreenProps<DefaultCollectionCreationStackParams, "default-collection-create-participations">) {
  const { evaluations, setEvaluations } = useDefaultCollectionCreationContext();
  const { t } = useTranslation();

  return (
    <CView style={{ padding: "md", justifyContent: "space-between", flex: 1, backgroundColor: "white" }}>
      <CView style={{ flexGrow: 1, gap: "lg", paddingBottom: 60 }}>
        <CText style={{ fontSize: "title", fontWeight: "500" }}>{t("CollectionParticipationsView.participations", "Paikallaolot")}</CText>
        <StudentParticipationList
          initialParticipations={evaluations}
          onChange={(participations) => {
            setEvaluations(participations);
          }}
        />
      </CView>
      <CView
        style={{
          position: "absolute",
          bottom: 0,
          left: "md",
          right: "md",
          padding: "lg",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <CButton onPress={() => navigation.goBack()}>
          <MaterialCommunityIcon name="arrow-left" size={25} color={COLORS.white} />
        </CButton>
        <CButton onPress={() => navigation.navigate("default-collection-create-evaluations")}>
          <MaterialCommunityIcon name="arrow-right" size={25} color={COLORS.white} />
        </CButton>
      </CView>
    </CView>
  );
}

export default function DefaultCollectionParticipationsView(
  props: NativeStackScreenProps<DefaultCollectionCreationStackParams, "default-collection-create-participations">
) {
  return (
    <DefaultCollectionCreationLayout>
      <DefaultCollectionParticipationsContent {...props} />
    </DefaultCollectionCreationLayout>
  );
}
