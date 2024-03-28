import { useState } from "react";
import { useTranslation } from "react-i18next";
import * as Clipboard from "expo-clipboard";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMutation, useQuery } from "@apollo/client";
import { useMatomo } from "matomo-tracker-react-native";
import { isClassParticipationEvaluation, isDefaultEvaluation } from "arwi-backend/src/types/typeGuards";
import { analyzeEvaluations } from "arwi-shared";
import Animated, { LinearTransition } from "react-native-reanimated";
import Layout from "../../../components/layout/Layout";
import CText from "../../../components/primitives/CText";
import CView from "../../../components/primitives/CView";
import CButton from "../../../components/primitives/CButton";
import { COLORS, SPACING } from "../../../theme";
import { HomeStackParams } from "../types";
import GradeSuggestionView from "./components/GradeSuggestionView";
import { graphql } from "@/graphql";
import LoadingIndicator from "../../../components/ui/LoadingIndicator";
import { useAuthenticatedUser } from "../../../hooks-and-providers/AuthProvider";
import { useToggleTokenUseWarning } from "../../../hooks-and-providers/monthlyTokenUseWarning";
import { FeedbackCacheUpdate_Fragment } from "@/helpers/graphql/fragments";
import { useHandleOpenAIError } from "@/hooks-and-providers/openAI";
import FinalFeedbackItem, { FinalFeedbackItem_Student_Fragment } from "../final-feedback/results/components/FinalFeedbackItem";
import { createViewStyles } from "../../../theme/utils";

const StudentFeedbackView_GetStudent_Query = graphql(
  `
    query StudentFeedbackView_GetStudent($id: ID!) {
      getStudent(id: $id) {
        group {
          currentModule {
            id
          }
        }
        ...FinalFeedbackItem_Student
      }
    }
  `,
  [FinalFeedbackItem_Student_Fragment]
);

const StudentFeedbackView_GenerateFeedback_Mutation = graphql(
  `
    mutation StudentFeedbackView_GenerateFeedback($studentId: ID!, $moduleId: ID!) {
      generateStudentFeedback(studentId: $studentId, moduleId: $moduleId) {
        feedback {
          text
          ...FeedbackCacheUpdate
        }
        usageData {
          id
          monthlyTokensUsed
          warning {
            warning
            threshhold
          }
        }
      }
    }
  `,
  [FeedbackCacheUpdate_Fragment]
);

export default function StudentFeedbackView({ route, navigation }: NativeStackScreenProps<HomeStackParams, "student-feedback">) {
  const { data, loading } = useQuery(StudentFeedbackView_GetStudent_Query, {
    variables: { id: route.params.id },
  });
  if (!data || loading) {
    return <LoadingIndicator />;
  }
  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Animated.ScrollView layout={LinearTransition} style={createViewStyles({ flex: 1, paddingHorizontal: "md" })}>
        <CView style={{ paddingVertical: "2xl" }}>
          <FinalFeedbackItem student={data.getStudent} moduleId={data.getStudent.group.currentModule.id} navigation={navigation} hideSeeMoreButton />
        </CView>
      </Animated.ScrollView>
    </Layout>
  );
}
