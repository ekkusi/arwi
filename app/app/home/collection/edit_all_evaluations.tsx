import { useMutation, useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardEventListener } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import LoadingIndicator from "../../../components/LoadingIndicator";
import CButton from "../../../components/primitives/CButton";
import CFlatList from "../../../components/primitives/CFlatList";
import CView from "../../../components/primitives/CView";
import { UpdateEvaluationCard, EvaluationToUpdate } from "../../../components/UpdateEvaluationCard";
import { graphql } from "../../../gql";
import { getErrorMessage } from "../../../helpers/errorUtils";
import { useKeyboardListener } from "../../../hooks-and-providers/keyboardHooks";
import { COLORS } from "../../../theme";
import { HomeStackParams } from "../types";

const CollectionEditAllEvaluationsView_GetCollection_Query = graphql(`
  query CollectionEditAllEvaluationsView_GetCollection($collectionId: ID!) {
    getCollection(id: $collectionId) {
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
          currentClassEvaluations {
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
          currentClassEvaluations {
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
}: NativeStackScreenProps<HomeStackParams, "edit-all-evaluations"> & { defaultEvaluations: EvaluationDataToUpdate[] }) {
  const [submitting, setSubmitting] = useState(false);
  const [evaluations, setEvaluations] = useState<EvaluationDataToUpdate[]>(defaultEvaluations);
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

  const [cardHeight, setCardHeight] = useState(0);

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

  return (
    <CView style={{ flex: 1, padding: "md", backgroundColor: "white" }}>
      <CFlatList
        data={evaluations}
        renderItem={({ item, index }) => (
          <UpdateEvaluationCard
            key={item.student.id}
            onLayout={index === 0 ? (event) => setCardHeight(event.nativeEvent.layout.height) : undefined}
            evaluation={item}
            hasParticipationToggle
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

  return <CollectionEditAllEvaluationsContent defaultEvaluations={data.getCollection.evaluations} {...props} />;
}
