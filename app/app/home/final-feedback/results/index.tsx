import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { hasRequiredField } from "arwi-backend/src/types/typeGuards";
import Animated, { LinearTransition, SlideInUp, SlideOutUp } from "react-native-reanimated";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import CText from "../../../../components/primitives/CText";
import { HomeStackParams } from "../../types";
import { graphql } from "@/graphql";
import LoadingIndicator from "../../../../components/ui/LoadingIndicator";
import CFlatList from "../../../../components/layout/CFlatList";
import Layout from "../../../../components/layout/Layout";
import FinalFeedbackItem, { FinalFeedbackItem_Student_Fragment } from "./components/FinalFeedbackItem";
import CView from "../../../../components/primitives/CView";
import CButton from "../../../../components/primitives/CButton";
import Card from "../../../../components/ui/Card";
import { useGenerateFeedback } from "../../../../hooks-and-providers/GenerateFeedbacksProvider";
import CAnimatedView from "@/components/primitives/CAnimatedView";
import { COLORS } from "@/theme";
import { createViewStyles } from "@/theme/utils";
import { useToast } from "@/hooks-and-providers/ToastProvider";

const FinalFeedbackResults_GetGroup_Query = graphql(
  `
    query FinalFeedbackResults_GetGroup($groupId: ID!) {
      getGroup(id: $groupId) {
        id
        name
        students {
          id
          latestFeedback {
            id
          }
          currentModuleEvaluations {
            id
            wasPresent
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
  const { groupId, noRedirect = false } = route.params;
  const { isGenerating, generateFeedbacks } = useGenerateFeedback(groupId, true);
  const { t } = useTranslation();
  const { openToast } = useToast();

  const { data } = useQuery(FinalFeedbackResults_GetGroup_Query, {
    variables: { groupId },
  });

  if (!data) return <LoadingIndicator />;

  const group = data.getGroup;

  const studentsWithFeedback = group.students.filter((student) => hasRequiredField(student, "latestFeedback")) as WithRequiredNonNull<
    (typeof group.students)[number],
    "latestFeedback"
  >[];

  const studentsWithoutFeedback = group.students.filter((student) => !hasRequiredField(student, "latestFeedback"));
  const studentsWithoutFeedbackToGenerate = studentsWithoutFeedback.filter(
    (student) => student.currentModuleEvaluations.filter((ev) => ev.wasPresent).length >= 3
  );

  const isGenerateAvailable = studentsWithoutFeedbackToGenerate.length > 0;

  if (!noRedirect && studentsWithFeedback.length === 0) navigation.replace("final-feedback", { groupId });

  const generateMissingFeedbacks = () => {
    generateFeedbacks(() => {
      openToast(t("feedbacks-generated", "Loppupalautteet päivitetty onnistuneesti!"));
    });
  };

  return (
    <Layout style={{ backgroundColor: "white" }}>
      {isGenerateAvailable && (
        <CAnimatedView entering={SlideInUp} exiting={SlideOutUp}>
          <Card
            style={{
              borderColor: "gray",
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 7,
              borderBottomRightRadius: 7,
              shadowRadius: 4,
              marginHorizontal: 0,
              padding: "md",
              paddingBottom: "lg",
            }}
          >
            <CView style={{ flexDirection: "row", alignItems: "center", marginBottom: "sm", gap: "sm" }}>
              <AntDesignIcon name="exclamationcircleo" size={26} color={COLORS.darkgray} />
              <CText style={{ fontWeight: "300" }}>{t("missing-feedbacks", "Puuttuvia palautteita")}!</CText>
            </CView>
            <CText style={{ fontSize: "sm2", fontWeight: "300", marginBottom: "md" }}>
              {t(
                "students-without-final-feedback-info",
                "Ryhmässä on {{count}} oppilasta, joille on mahdollista luoda sanallinen palaute, mutta sitä ei ole vielä luotu.",
                { count: studentsWithoutFeedbackToGenerate.length }
              )}
            </CText>
            <CView style={{ alignItems: "center" }}>
              <CButton size="small" title="Luo palautteet" onPress={generateMissingFeedbacks} loading={isGenerating} />
            </CView>
          </Card>
        </CAnimatedView>
      )}
      <Animated.ScrollView layout={LinearTransition} style={createViewStyles({ flex: 1, paddingHorizontal: "md" })}>
        <CFlatList
          data={group.students}
          keyExtractor={(item) => item.id}
          style={{ paddingBottom: "lg" }}
          renderItem={({ item, index }) => {
            return (
              <FinalFeedbackItem
                navigation={navigation}
                student={item}
                moduleId={group.currentModule.id}
                generatingFeedback={studentsWithoutFeedbackToGenerate.find((s) => s.id === item.id) ? isGenerating : false}
                style={{ borderBottomWidth: index !== group.students.length - 1 ? 1 : 0, borderBottomColor: "lightgray", paddingVertical: "3xl" }}
              />
            );
          }}
        />
      </Animated.ScrollView>
    </Layout>
  );
}
