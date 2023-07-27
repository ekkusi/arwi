import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { useTranslation } from "react-i18next";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CButton from "../../../../components/primitives/CButton";
import CText from "../../../../components/primitives/CText";
import CView from "../../../../components/primitives/CView";
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
    <>
      <CText style={{ fontSize: "lg", fontWeight: "bold" }}>{t("CollectionParticipationsView.participations", "Paikallaolot")}</CText>
      <StudentParticipationList
        initialParticipations={evaluations}
        onChange={(participations) => {
          setEvaluations(participations);
        }}
      />
      <CView
        style={{
          flexGrow: 1,
          width: "100%",
          paddingHorizontal: 20,
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
    </>
  );
}

export default function CollectionParticipationsView(props: NativeStackScreenProps<CollectionCreationStackParams, "participations">) {
  return (
    <CollectionCreationLayout>
      <CollectionParticipationsContent {...props} />
    </CollectionCreationLayout>
  );
}
