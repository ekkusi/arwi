import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { hasRequiredField } from "arwi-backend/src/types/typeGuards";
import CText from "../../../../components/primitives/CText";
import { HomeStackParams } from "../../types";
import { graphql } from "@/graphql";
import LoadingIndicator from "../../../../components/ui/LoadingIndicator";
import CFlatList from "../../../../components/layout/CFlatList";
import Layout from "../../../../components/layout/Layout";
import FinalFeedbackItem, { FinalFeedbackItem_Student_Fragment } from "../components/FinalFeedbackItem";
import CScrollView from "@/components/layout/CScrollView";

const FinalFeedbackResults_GetGroup_Query = graphql(
  `
    query FinalFeedbackResults_GetGroup($groupId: ID!) {
      getGroup(id: $groupId) {
        id
        students {
          id
          latestFeedback {
            id
          }
          ...FinalFeedbackItem_Student
        }
        currentModule {
          id
        }
      }
    }
  `,
  [FinalFeedbackItem_Student_Fragment]
);

export default function FinalFeedbackResults({ route, navigation }: NativeStackScreenProps<HomeStackParams, "final-feedback-results">) {
  const { groupId } = route.params;
  const { t } = useTranslation();

  const { data } = useQuery(FinalFeedbackResults_GetGroup_Query, {
    variables: { groupId },
  });

  if (!data) return <LoadingIndicator />;

  const group = data.getGroup;

  const studentsWithFeedback = group.students.filter((student) => hasRequiredField(student, "latestFeedback")) as WithRequiredNonNull<
    (typeof group.students)[number],
    "latestFeedback"
  >[];

  if (studentsWithFeedback.length === 0) navigation.replace("final-feedback", { groupId });

  return (
    <Layout style={{ backgroundColor: "white" }}>
      <CScrollView style={{ paddingHorizontal: "md", paddingVertical: "lg" }}>
        <CText style={{ fontSize: "title", fontWeight: "500", textAlign: "center" }}>{t("final-feedbacks", "Loppuarvioinnit")}</CText>
        <CFlatList
          data={studentsWithFeedback}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            return (
              <FinalFeedbackItem
                student={item}
                moduleId={group.currentModule.id}
                style={{ borderBottomWidth: index !== studentsWithFeedback.length - 1 ? 1 : 0, borderBottomColor: "gray", paddingVertical: "3xl" }}
              />
            );
          }}
        />
      </CScrollView>
    </Layout>
  );
}
