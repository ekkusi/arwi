import { useMutation } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardEventListener } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CButton from "../../../../components/primitives/CButton";
import CFlatList from "../../../../components/primitives/CFlatList";
import CView from "../../../../components/primitives/CView";
import { CreateEvaluationCard } from "../../../../components/UpdateEvaluationCard";
import { graphql } from "../../../../gql";
import { formatDate } from "../../../../helpers/dateHelpers";
import { getErrorMessage } from "../../../../helpers/errorUtils";
import { useKeyboardListener } from "../../../../hooks-and-providers/keyboardHooks";
import { useToast } from "../../../../hooks-and-providers/ToastProvider";
import { COLORS } from "../../../../theme";
import { useCollectionCreationContext } from "./CollectionCreationProvider";
import { CollectionCreationStackParams } from "./types";
import CollectionCreationLayout from "./_layout";

const CollectionEvaluationsView_CreateCollection_Mutation = graphql(`
  mutation CollectionEvaluationsView_CreateCollection($createCollectionInput: CreateCollectionInput!, $classYearId: ID!) {
    createCollection(data: $createCollectionInput, classYearId: $classYearId) {
      id
      date
      description
      learningObjectives {
        code
        label
        description
        type
      }
      environment {
        label
        code
        color
      }
      evaluations {
        id
        wasPresent
        skillsRating
        behaviourRating
        notes
        isStellar
        student {
          id
          currentClassEvaluations {
            id
          }
        }
      }
      classYear {
        id
        evaluationCollections {
          id
        }
        group {
          id
          updatedAt
        }
      }
    }
  }
`);

function CollectionEvaluationsContent({ navigation }: NativeStackScreenProps<CollectionCreationStackParams, "evaluations">) {
  const { t } = useTranslation();
  const { openToast } = useToast();
  const [createCollection] = useMutation(CollectionEvaluationsView_CreateCollection_Mutation);
  const [cardHeight, setCardHeight] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const { generalData, evaluations, groupInfo, setEvaluations } = useCollectionCreationContext();

  const presentEvaluations = useMemo(() => evaluations.filter((it) => it.wasPresent), [evaluations]);

  const offsetButtons = useSharedValue(0);

  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(offsetButtons.value, {
            duration: 300,
            easing: Easing.inOut(Easing.ease),
          }),
        },
      ],
    };
  });

  const keyboardShows = useCallback<KeyboardEventListener>(() => {
    offsetButtons.value = 100;
  }, [offsetButtons]);

  const keyboardHides = useCallback<KeyboardEventListener>(() => {
    offsetButtons.value = 0;
  }, [offsetButtons]);

  useKeyboardListener({ onHide: keyboardHides, onShow: keyboardShows });

  const handleSubmit = async () => {
    setSubmitting(true);
    const { environmentCode } = generalData;
    if (!environmentCode) throw new Error("Environment code is missing, shouldn't happen at this point");

    try {
      await createCollection({
        variables: {
          classYearId: groupInfo.currentClassYear.id,
          createCollectionInput: {
            ...generalData,
            environmentCode,
            date: formatDate(generalData.date, "yyyy-MM-dd"),
            evaluations: evaluations.map((it) => ({
              wasPresent: it.wasPresent,
              skillsRating: it.skillsRating,
              behaviourRating: it.behaviourRating,
              notes: it.notes,
              isStellar: it.isStellar,
              studentId: it.student.id,
            })),
          },
        },
      });
      navigation.getParent()?.navigate("index");
      openToast(t("collection-created-succesfully", "Arviointi luotu onnistuneesti!"));
    } catch (e) {
      const msg = getErrorMessage(e);
      console.error(msg);
    }
    setSubmitting(false);
  };
  return (
    <CView style={{ flex: 1, padding: "md", backgroundColor: "white" }}>
      <CFlatList
        data={presentEvaluations}
        renderItem={({ item, index }) => (
          <CreateEvaluationCard
            key={item.student.id}
            onLayout={index === 0 ? (event) => setCardHeight(event.nativeEvent.layout.height) : undefined}
            evaluation={item}
            hasParticipationToggle={false}
            onChanged={(value) => {
              setEvaluations(evaluations.map((it) => (it.student.id === value.student.id ? value : it)));
            }}
            style={{ marginBottom: index === evaluations.length - 1 ? 80 : "lg" }}
          />
        )}
        snapToInterval={cardHeight}
        decelerationRate={0.8}
        snapToAlignment="center"
        style={{ flex: 1, padding: "lg" }}
      />
      <Animated.View
        style={[{ justifyContent: "flex-end", position: "absolute", bottom: 0, left: 0, right: 0, width: "100%" }, buttonsAnimatedStyle]}
      >
        <CView
          style={{
            width: "100%",
            padding: "lg",
            backgroundColor: "transparent",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <CButton onPress={() => navigation.goBack()}>
            <MaterialCommunityIcon name="arrow-left" size={25} color={COLORS.white} />
          </CButton>
          <CButton
            loading={submitting}
            style={{ marginRight: 0 }}
            title={t("save", "Tallenna")}
            onPress={() => handleSubmit()}
            leftIcon={<MaterialCommunityIcon name="check" size={25} color={COLORS.white} />}
          />
        </CView>
      </Animated.View>
    </CView>
  );
}

export default function CollectionEvaluationsView(props: NativeStackScreenProps<CollectionCreationStackParams, "evaluations">) {
  return (
    <CollectionCreationLayout style={{ padding: 0 }}>
      <CollectionEvaluationsContent {...props} />
    </CollectionCreationLayout>
  );
}
