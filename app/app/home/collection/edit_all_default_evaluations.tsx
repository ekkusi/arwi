import { useMutation, useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, KeyboardEventListener, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { isClassParticipationCollection, isDefaultCollection } from "arwi-backend/src/types/typeGuards";
import LoadingIndicator from "../../../components/LoadingIndicator";
import CButton from "../../../components/primitives/CButton";
import CFlatList from "../../../components/primitives/CFlatList";
import CView from "../../../components/primitives/CView";
import { graphql } from "../../../gql";
import { getErrorMessage } from "../../../helpers/errorUtils";
import { useKeyboardListener } from "../../../hooks-and-providers/keyboard";
import { COLORS } from "../../../theme";
import { HomeStackParams } from "../types";
import CText from "../../../components/primitives/CText";
import { CARD_HEIGHT, DefaultEvaluationToUpdate, UpdateDefaultEvaluationCardMemoed } from "../../../components/DefaultEvaluationCard";

const DefaultCollectionEditAllEvaluationsView_GetCollection_Query = graphql(`
  query DefaultCollectionEditAllEvaluationsView_GetCollection($collectionId: ID!) {
    getCollection(id: $collectionId) {
      id
      date
      evaluations {
        id
        wasPresent
        __typename
        ... on DefaultEvaluation {
          rating
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

const DefaultCollectionEditAllEvaluationsView_UpdateCollection_Mutation = graphql(`
  mutation DefaultCollectionEditAllEvaluationsView_UpdateCollection($updateCollectionInput: UpdateDefaultCollectionInput!, $collectionId: ID!) {
    updateDefaultCollection(data: $updateCollectionInput, collectionId: $collectionId) {
      id
      evaluations {
        id
        wasPresent
        rating
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

export type DefaultEvaluationDataToUpdate = Omit<DefaultEvaluationToUpdate, "student"> & {
  student: { id: string; name: string } & DefaultEvaluationToUpdate["student"];
};

function DefaultCollectionEditAllEvaluationsContent({
  navigation,
  route,
  defaultEvaluations,
  date,
}: NativeStackScreenProps<HomeStackParams, "edit-all-default-evaluations"> & {
  defaultEvaluations: DefaultEvaluationDataToUpdate[];
  date: string;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [evaluations, setEvaluations] = useState<DefaultEvaluationDataToUpdate[]>(defaultEvaluations);
  const scrollRef = useRef<FlatList<DefaultEvaluationDataToUpdate> | null>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [updateCollection] = useMutation(DefaultCollectionEditAllEvaluationsView_UpdateCollection_Mutation);

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
              rating: it.wasPresent ? it.rating : undefined,
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

  const onEvaluationChanged = useCallback((evaluation: DefaultEvaluationDataToUpdate) => {
    setEvaluations((prev) => prev?.map((it) => (it.student.id === evaluation.student.id ? evaluation : it)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const scrollToCard = useCallback(() => {
    // Hack to make this not depend on the scrollOffset which causes renderers to all cards
    setScrollOffset((offset) => {
      scrollRef.current?.scrollToOffset({ animated: true, offset: offset + CARD_HEIGHT });
      return offset;
    });
  }, []);

  return (
    <CView style={{ flex: 1, backgroundColor: "white" }}>
      <CFlatList
        ref={scrollRef}
        data={evaluations}
        renderItem={({ item, index }) => (
          <UpdateDefaultEvaluationCardMemoed
            key={item.student.id}
            evaluation={item}
            date={date}
            onChanged={onEvaluationChanged}
            height={CARD_HEIGHT}
            hasArrowDown={index < evaluations.length - 1}
            onArrowDownPress={scrollToCard}
          />
        )}
        onScroll={onScroll}
        keyExtractor={(item) => item.student.id}
        snapToInterval={CARD_HEIGHT}
        decelerationRate="fast"
        snapToAlignment="center"
        directionalLockEnabled
        disableIntervalMomentum
        style={{ flex: 1, paddingHorizontal: "lg" }}
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

export default function DefaultCollectionEditAllEvaluationsView(props: NativeStackScreenProps<HomeStackParams, "edit-all-default-evaluations">) {
  const { route } = props;
  const { t } = useTranslation();
  const { data, loading } = useQuery(DefaultCollectionEditAllEvaluationsView_GetCollection_Query, {
    variables: { collectionId: route.params.collectionId },
  });

  if (loading || !data) return <LoadingIndicator />;

  return isDefaultCollection<WithTypename<typeof data.getCollection, "DefaultCollection">>(data.getCollection) ? (
    <DefaultCollectionEditAllEvaluationsContent defaultEvaluations={data.getCollection.evaluations} date={data.getCollection.date} {...props} />
  ) : (
    <CText>{t("this-view-not-implemented", "Tämä näkymä ei ole vielä implementoitu")}</CText>
  );
}
