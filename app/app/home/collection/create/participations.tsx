import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { useTranslation } from "react-i18next";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CButton from "../../../../components/primitives/CButton";
import CText from "../../../../components/primitives/CText";
import CView from "../../../../components/primitives/CView";
import ProgressBar from "../../../../components/ProgressBar";
import StudentParticipationList from "../../../../components/StudentParticipationList";
import { graphql } from "../../../../gql";
import { COLORS } from "../../../../theme";
import { useCollectionCreationContext } from "./CollectionCreationProvider";
import { CollectionCreationStackParams } from "./types";
import CollectionCreationLayout from "./_layout";

const CollectionParticipationsView_Group_Fragment = graphql(`
  fragment CollectionParticipationsView_Group on Group {
    students {
      id
      name
    }
  }
`);

function CollectionParticipationsContent({ navigation }: NativeStackScreenProps<CollectionCreationStackParams, "participations">) {
  const { evaluations, setEvaluations } = useCollectionCreationContext();
  const { t } = useTranslation();

  return (
    <CView style={{ padding: "md", justifyContent: "space-between", flex: 1, backgroundColor: "white" }}>
      <CView style={{ flexGrow: 1, gap: "lg" }}>
        <CText style={{ fontSize: "title", fontWeight: "500" }}>{t("CollectionParticipationsView.participations", "Paikallaolot")}</CText>
        <CView style={{ flexGrow: 1 }}>
          <StudentParticipationList
            initialParticipations={evaluations}
            onChange={(participations) => {
              setEvaluations(participations);
            }}
          />
        </CView>
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
        <CButton onPress={() => navigation.navigate("evaluations")}>
          <MaterialCommunityIcon name="arrow-right" size={25} color={COLORS.white} />
        </CButton>
      </CView>
    </CView>
  );
}

export default function CollectionParticipationsView(props: NativeStackScreenProps<CollectionCreationStackParams, "participations">) {
  return (
    <CollectionCreationLayout>
      <CollectionParticipationsContent {...props} />
    </CollectionCreationLayout>
  );
}
