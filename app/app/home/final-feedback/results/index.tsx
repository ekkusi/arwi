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
import { CViewStyle } from "@/theme/types";

function FinalFeedbackTopInfoWrapper({ children, style }: React.PropsWithChildren<{ style?: CViewStyle }>) {
  return (
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
          ...style,
        }}
      >
        {children}
      </Card>
    </CAnimatedView>
  );
}

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
            updatedAt
          }
          currentModuleEvaluations {
            id
            wasPresent
            updatedAt
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
  const { isGenerating, generateFeedbacks } = useGenerateFeedback(groupId);
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
  const studentsWithoutFeedbackToGenerateIds = studentsWithoutFeedbackToGenerate.map((s) => s.id);

  // Students that have evaluations updated after the latest feedback
  const studentsWithOutdatedFeedback = studentsWithFeedback.filter((student) => {
    const { latestFeedback } = student;
    const latestEvaluation = student.currentModuleEvaluations.reduce((acc, ev) =>
      new Date(ev.updatedAt).getTime() > new Date(acc.updatedAt).getTime() ? ev : acc
    );
    return latestEvaluation.updatedAt > latestFeedback.updatedAt;
  });
  const studentsWithOutdatedFeedbackIds = studentsWithOutdatedFeedback.map((s) => s.id);

  const isGenerateAvailable = studentsWithoutFeedbackToGenerate.length > 0;
  const hasOutdatedFeedbacks = studentsWithOutdatedFeedback.length > 0;

  if (!noRedirect && studentsWithFeedback.length === 0) navigation.replace("final-feedback", { groupId });

  const generateMissingFeedbacks = () => {
    generateFeedbacks(
      () => {
        openToast(t("feedbacks-generated", "Loppupalautteet päivitetty onnistuneesti!"));
      },
      undefined,
      studentsWithoutFeedbackToGenerateIds
    );
  };

  const updateOutdatedFeedbacks = () => {
    generateFeedbacks(
      () => {
        openToast(t("feedbacks-updated", "Loppupalautteet päivitetty onnistuneesti!"));
      },
      undefined,
      studentsWithOutdatedFeedbackIds
    );
  };

  return (
    <Layout style={{ backgroundColor: "white" }}>
      {isGenerateAvailable && (
        <FinalFeedbackTopInfoWrapper>
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
            <CButton size="small" title={t("generate-feedbacks", "Luo palautteet")} onPress={generateMissingFeedbacks} loading={isGenerating} />
          </CView>
        </FinalFeedbackTopInfoWrapper>
      )}
      {hasOutdatedFeedbacks && (
        <FinalFeedbackTopInfoWrapper
          style={
            isGenerateAvailable
              ? {
                  marginTop: "md",
                  borderTopRightRadius: 7,
                  borderTopLeftRadius: 7,
                }
              : undefined
          }
        >
          <CView style={{ flexDirection: "row", alignItems: "center", marginBottom: "sm", gap: "sm" }}>
            <AntDesignIcon name="exclamationcircleo" size={26} color={COLORS.darkgray} />
            <CText style={{ fontWeight: "300" }}>{t("outdated-feedbacks", "Päivitettäviä palautteita")}!</CText>
          </CView>
          <CText style={{ fontSize: "sm2", fontWeight: "300", marginBottom: "md" }}>
            {t(
              "students-with-outdated-feedback-info",
              "Ryhmässä on {{count}} oppilasta, joiden arviointeja on päivitetty viimeisimmän palautteen generoinnin jälkeen.",
              { count: studentsWithOutdatedFeedback.length }
            )}
          </CText>
          <CView style={{ alignItems: "center" }}>
            <CButton size="small" title={t("update-feedbacks", "Päivitä palautteet")} onPress={updateOutdatedFeedbacks} loading={isGenerating} />
          </CView>
        </FinalFeedbackTopInfoWrapper>
      )}
      <Animated.FlatList
        layout={LinearTransition}
        data={group.students}
        keyExtractor={(item) => item.id}
        style={createViewStyles({ flex: 1, paddingHorizontal: "md", paddingBottom: "lg" })}
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
    </Layout>
  );
}
