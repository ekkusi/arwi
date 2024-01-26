import { useMutation, useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardEventListener } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { isClassParticipationCollection } from "arwi-backend/src/types/typeGuards";
import PagerView, { PagerViewOnPageSelectedEvent } from "react-native-pager-view";
import LoadingIndicator from "../../../components/LoadingIndicator";
import CButton from "../../../components/primitives/CButton";
import CView from "../../../components/primitives/CView";
import { EvaluationToUpdate, CARD_HEIGHT, UpdateClassParticipationEvaluationCardMemoed } from "../../../components/ClassParticipationEvaluationCard";
import { graphql } from "../../../gql";
import { getErrorMessage } from "../../../helpers/errorUtils";
import { useKeyboardListener } from "../../../hooks-and-providers/keyboard";
import { COLORS } from "../../../theme";
import { HomeStackParams } from "../types";
import CText from "../../../components/primitives/CText";
import LazyLoadView from "../../../components/LazyLoadView";

const CollectionEditAllEvaluationsView_GetCollection_Query = graphql(`
  query CollectionEditAllEvaluationsView_GetCollection($collectionId: ID!) {
    getCollection(id: $collectionId) {
      id
      date
      __typename
      ... on ClassParticipationCollection {
        environment {
          code
          label {
            fi
          }
          color
        }
      }
      evaluations {
        id
        wasPresent
        __typename
        ... on ClassParticipationEvaluation {
          skillsRating
          behaviourRating
        }
        notes
        student {
          id
          name
          currentModuleEvaluations {
            id
            notes
          }
        }
      }
    }
  }
`);

const CollectionEditAllEvaluationsView_UpdateCollection_Mutation = graphql(`
  mutation CollectionEvaluationsView_UpdateCollection($updateCollectionInput: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {
    updateClassParticipationCollection(data: $updateCollectionInput, collectionId: $collectionId) {
      id
      evaluations {
        id
        wasPresent
        skillsRating
        behaviourRating
        notes
        student {
          id
          name
          currentModuleEvaluations {
            id
            notes
          }
        }
      }
    }
  }
`);

export type EvaluationDataToUpdate = Omit<EvaluationToUpdate, "student"> & {
  student: { id: string; name: string } & EvaluationToUpdate["student"];
};

function CollectionEditAllEvaluationsContent({
  navigation,
  route,
  defaultEvaluations,
  date,
  environmentLabel,
  envColor,
}: NativeStackScreenProps<HomeStackParams, "edit-all-evaluations"> & {
  defaultEvaluations: EvaluationDataToUpdate[];
  date: string;
  environmentLabel: string;
  envColor: string;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [evaluations, setEvaluations] = useState<EvaluationDataToUpdate[]>(defaultEvaluations);
  const pagerRef = useRef<PagerView>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [updateCollection] = useMutation(CollectionEditAllEvaluationsView_UpdateCollection_Mutation);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await updateCollection({
        variables: {
          collectionId: route.params.collectionId,
          updateCollectionInput: {
            evaluations: evaluations.map((it) => ({
              id: it.id,
              wasPresent: it.wasPresent,
              skillsRating: it.wasPresent ? it.skillsRating : undefined,
              behaviourRating: it.wasPresent ? it.behaviourRating : undefined,
              notes: it.wasPresent ? it.notes : undefined,
            })),
          },
        },
      });
      navigation.goBack();
    } catch (e) {
      const msg = getErrorMessage(e);
      console.error(msg);
    }
    setSubmitting(false);
  };
  const { t } = useTranslation();

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

  const onEvaluationChanged = useCallback((evaluation: EvaluationDataToUpdate) => {
    setEvaluations((prev) => prev?.map((it) => (it.student.id === evaluation.student.id ? evaluation : it)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPageSelected = (event: PagerViewOnPageSelectedEvent) => {
    setCurrentIndex(event.nativeEvent.position);
  };

  const scrollToCard = useCallback(() => {
    // Hack to make this not depend on the scrollOffset which causes renderers to all cards
    setCurrentIndex((index) => {
      pagerRef.current?.setPage(index + 1);
      return index;
    });
  }, []);

  return (
    <CView style={{ flex: 1, backgroundColor: "white", paddingHorizontal: "lg" }}>
      <PagerView
        ref={pagerRef}
        orientation="vertical"
        scrollEnabled
        initialPage={0}
        style={{ flex: 1, width: "100%" }}
        onPageSelected={onPageSelected}
      >
        {evaluations?.map((evaluation, index) => {
          return (
            <LazyLoadView key={evaluation.student.id} currentIndex={currentIndex} index={index} style={{ flex: 1 }}>
              <UpdateClassParticipationEvaluationCardMemoed
                evaluation={evaluation}
                date={date}
                environment={environmentLabel}
                envColor={envColor}
                onChanged={onEvaluationChanged}
                height={CARD_HEIGHT}
                hasArrowDown={index < evaluations.length - 1}
                onArrowDownPress={scrollToCard}
                isActive={currentIndex === index}
              />
            </LazyLoadView>
          );
        })}
      </PagerView>
      <Animated.View
        style={[{ justifyContent: "flex-end", position: "absolute", bottom: 0, left: 0, right: 0, width: "100%" }, buttonsAnimatedStyle]}
      >
        <CView
          style={{
            width: "100%",
            padding: "lg",
            backgroundColor: "transparent",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
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

export default function CollectionEditAllEvaluationsView(props: NativeStackScreenProps<HomeStackParams, "edit-all-evaluations">) {
  const { route } = props;
  const { t } = useTranslation();
  const { data, loading } = useQuery(CollectionEditAllEvaluationsView_GetCollection_Query, {
    variables: { collectionId: route.params.collectionId },
  });

  if (loading || !data) return <LoadingIndicator />;

  return isClassParticipationCollection<WithTypename<typeof data.getCollection, "ClassParticipationCollection">>(data.getCollection) ? (
    <CollectionEditAllEvaluationsContent
      defaultEvaluations={data.getCollection.evaluations}
      envColor={data.getCollection.environment.color}
      environmentLabel={data.getCollection.environment.label.fi}
      date={data.getCollection.date}
      {...props}
    />
  ) : (
    <CText>{t("this-view-not-implemented", "Tämä näkymä ei ole vielä implementoitu")}</CText>
  );
}
