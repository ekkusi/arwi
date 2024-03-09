import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { hasRequiredField } from "arwi-backend/src/types/typeGuards";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import CText from "../../../../components/primitives/CText";
import { HomeStackParams } from "../../types";
import { graphql } from "@/graphql";
import LoadingIndicator from "../../../../components/ui/LoadingIndicator";
import CFlatList from "../../../../components/layout/CFlatList";
import Layout from "../../../../components/layout/Layout";
import FinalFeedbackItem, { FinalFeedbackItem_Student_Fragment } from "../components/FinalFeedbackItem";
import CScrollView from "@/components/layout/CScrollView";
import CView from "../../../../components/primitives/CView";
import CButton from "../../../../components/primitives/CButton";
import Card from "../../../../components/ui/Card";
import { COLORS } from "../../../../theme";
import { useGenerateFeedback } from "../../../../hooks-and-providers/GenerateFeedbacksProvider";
import { useToggleTokenUseWarning } from "../../../../hooks-and-providers/monthlyTokenUseWarning";
import { useToast } from "../../../../hooks-and-providers/ToastProvider";

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

function TopToast({ count, action, isGenerating }: { count: number; action: () => void; isGenerating: boolean }) {
  const { t } = useTranslation();
  const translateY = useDerivedValue(() => (count > 0 ? withTiming(0, { duration: 200 }) : withTiming(-200, { duration: 200 })), [count]);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={[animatedStyle, { position: "absolute", backgroundColor: "white", zIndex: 10 }]}>
      <Card
        style={{
          borderBottomWidth: 1,
          borderColor: "gray",
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
        }}
      >
        <CText style={{ fontSize: "sm2", fontWeight: "300" }}>
          {t(
            "students-without-final-feedback-info",
            "Ryhmässä on {{count}} oppilasta, joille on mahdollista luoda sanallinen palaute, mutta sitä ei ole vielä luotu.",
            { count }
          )}
        </CText>
        <CView style={{ alignItems: "flex-end" }}>
          <CButton size="small" title="Luo palautteet" onPress={action} loading={isGenerating} />
        </CView>
      </Card>
    </Animated.View>
  );
}

export default function FinalFeedbackResults({ route, navigation }: NativeStackScreenProps<HomeStackParams, "final-feedback-results">) {
  const { groupId } = route.params;
  const { isGenerating, generateFeedbacks } = useGenerateFeedback(groupId, true);
  const toggleTokenUseWarning = useToggleTokenUseWarning();
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

  if (studentsWithFeedback.length === 0) navigation.replace("final-feedback", { groupId });

  const generateMissingFeedbacks = () => {
    generateFeedbacks(
      (res) => {
        const warning = res.data?.generateGroupFeedback.usageData?.warning;
        if (warning) toggleTokenUseWarning(warning);
        openToast(
          t("final-feedback-finished", "Loppupalaute on luotu ryhmälle {{groupName}}", { groupName: group.name }),
          { closeTimeout: 10000 },
          {
            action: () => navigation.navigate("final-feedback", { groupId: group.id }),
            label: t("inspect", "Tarkastele"),
          }
        );
      },
      (err) => {
        openToast(
          t("final-feedback-generation-failed", "Loppupalautteen luonti epäonnistui: {{error}}", { error: err.message }),
          {
            type: "error",
          },
          {
            action: () => navigation.navigate("profile"),
            label: t("inspect-in-profile", "Tarkastele profiilissa"),
          }
        );
      }
    );
  };

  return (
    <Layout style={{ backgroundColor: "white" }}>
      <TopToast count={studentsWithoutFeedbackToGenerate.length} action={generateMissingFeedbacks} isGenerating={isGenerating} />
      <CScrollView style={{ paddingHorizontal: "md", paddingVertical: "lg" }}>
        <CFlatList
          data={group.students}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            return (
              <FinalFeedbackItem
                student={item}
                moduleId={group.currentModule.id}
                style={{ borderBottomWidth: index !== group.students.length - 1 ? 1 : 0, borderBottomColor: "gray", paddingVertical: "3xl" }}
              />
            );
          }}
        />
      </CScrollView>
    </Layout>
  );
}
