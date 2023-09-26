import { useMutation, useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, FlatList, KeyboardEventListener, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Constants from "expo-constants";
import LoadingIndicator from "../../../components/LoadingIndicator";
import CButton from "../../../components/primitives/CButton";
import CFlatList from "../../../components/primitives/CFlatList";
import CView from "../../../components/primitives/CView";
import { UpdateEvaluationCard, EvaluationToUpdate } from "../../../components/EvaluationCard";
import { graphql } from "../../../gql";
import { getErrorMessage } from "../../../helpers/errorUtils";
import { useKeyboardListener } from "../../../hooks-and-providers/keyboardHooks";
import { COLORS } from "../../../theme";
import { HomeStackParams } from "../types";

const CollectionEditAllEvaluationsView_GetCollection_Query = graphql(`
  query CollectionEditAllEvaluationsView_GetCollection($collectionId: ID!) {
    getCollection(id: $collectionId) {
      id
      date
      environment {
        code
        label {
          fi
        }
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
  mutation CollectionEvaluationsView_UpdateCollection($updateCollectionInput: UpdateCollectionInput!, $collectionId: ID!) {
    updateCollection(data: $updateCollectionInput, collectionId: $collectionId) {
      id
      evaluations {
        id
        wasPresent
        skillsRating
        behaviourRating
        notes
        isStellar
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

const WINDOW_HEIGHT = Dimensions.get("window").height;
const STATUS_BAR_HEIGHT = Constants.statusBarHeight;
// NOTE: This is calculated manually and tested in a few devices. If the evaluation view UI gets broken on some devices, this might be the culprit.
const CARD_HEIGHT = WINDOW_HEIGHT - STATUS_BAR_HEIGHT;

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
  const scrollRef = useRef<FlatList<EvaluationDataToUpdate> | null>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
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
              isStellar: it.wasPresent ? it.isStellar : undefined,
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

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const scrollToCard = useCallback(() => {
    scrollRef.current?.scrollToOffset({ animated: true, offset: scrollOffset + CARD_HEIGHT });
  }, [scrollOffset]);

  return (
    <CView style={{ flex: 1, padding: "md", backgroundColor: "white" }}>
      <CFlatList
        ref={scrollRef}
        data={evaluations}
        renderItem={({ item, index }) => (
          <UpdateEvaluationCard
            key={item.student.id}
            evaluation={item}
            date={date}
            environment={environmentLabel}
            envColor={envColor}
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
  const { data, loading } = useQuery(CollectionEditAllEvaluationsView_GetCollection_Query, {
    variables: { collectionId: route.params.collectionId },
  });

  if (loading || !data) return <LoadingIndicator />;

  return (
    <CollectionEditAllEvaluationsContent
      defaultEvaluations={data.getCollection.evaluations}
      envColor={data.getCollection.environment.color}
      environmentLabel={data.getCollection.environment.label.fi}
      date={data.getCollection.date}
      {...props}
    />
  );
}
