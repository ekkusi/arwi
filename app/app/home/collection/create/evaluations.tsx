import { useMutation } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, KeyboardEventListener, NativeScrollEvent, NativeSyntheticEvent, Platform } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CButton from "../../../../components/primitives/CButton";
import CFlatList from "../../../../components/primitives/CFlatList";
import CView from "../../../../components/primitives/CView";
import { CARD_HEIGHT, CreateEvaluationCardMemoed, Evaluation } from "../../../../components/EvaluationCard";
import { graphql } from "../../../../gql";
import { formatDate } from "../../../../helpers/dateHelpers";
import { getErrorMessage } from "../../../../helpers/errorUtils";
import { useKeyboardListener } from "../../../../hooks-and-providers/keyboard";
import { useToast } from "../../../../hooks-and-providers/ToastProvider";
import { COLORS } from "../../../../theme";
import { EvaluationData, useCollectionCreationContext } from "./CollectionCreationProvider";
import { CollectionCreationStackParams } from "./types";
import CollectionCreationLayout from "./_layout";

const CollectionEvaluationsView_CreateCollection_Mutation = graphql(`
  mutation CollectionEvaluationsView_CreateCollection($createCollectionInput: CreateCollectionInput!, $moduleId: ID!) {
    createCollection(data: $createCollectionInput, moduleId: $moduleId) {
      id
      date
      description
      learningObjectives {
        code
        label {
          fi
        }
        description {
          fi
        }
        type
      }
      environment {
        label {
          fi
        }
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
          currentModuleEvaluations {
            id
          }
        }
      }
      module {
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

function CollectionEvaluationsContent({ navigation }: NativeStackScreenProps<CollectionCreationStackParams, "collection-create-evaluations">) {
  const { t } = useTranslation();
  const { openToast } = useToast();
  const [createCollection] = useMutation(CollectionEvaluationsView_CreateCollection_Mutation);
  const scrollRef = useRef<FlatList<EvaluationData> | null>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const { generalData, evaluations, groupInfo, setEvaluations } = useCollectionCreationContext();

  const presentEvaluations = useMemo(() => {
    return evaluations?.filter((it) => it.wasPresent) || [];
  }, [evaluations]);

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
    const { environmentCode, collectionTypeId, ...rest } = generalData;
    if (!environmentCode || !collectionTypeId) throw new Error("Environment code or collection type id is missing, shouldn't happen at this point");

    try {
      await createCollection({
        variables: {
          moduleId: groupInfo.currentModule.id,
          createCollectionInput: {
            ...rest,
            environmentCode,
            date: formatDate(generalData.date, "yyyy-MM-dd"),
            typeId: collectionTypeId,
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
      navigation.getParent()?.navigate("home");
      openToast(t("collection-created-succesfully", "Arviointi luotu onnistuneesti!"));
    } catch (e) {
      const msg = getErrorMessage(e);
      console.error(msg);
    }
    setSubmitting(false);
  };

  const onEvaluationChanged = useCallback((evaluation: Evaluation) => {
    setEvaluations((prev) => prev?.map((it) => (it.student.id === evaluation.student.id ? evaluation : it)));
    // NOTE: The dependencies array is empty because we don't want to re-render the whole screen when this changes. Hence eslint disables to remove the warning.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const scrollToCard = useCallback(() => {
    scrollRef.current?.scrollToOffset({ animated: true, offset: scrollOffset + CARD_HEIGHT });
  }, [scrollOffset]);

  return (
    <CView style={{ flex: 1, backgroundColor: "white" }}>
      <CFlatList
        ref={scrollRef}
        data={presentEvaluations}
        renderItem={({ item, index }) => (
          <CreateEvaluationCardMemoed
            evaluation={item}
            onChanged={onEvaluationChanged}
            height={CARD_HEIGHT}
            hasArrowDown={index < presentEvaluations.length - 1}
            onArrowDownPress={scrollToCard}
            isActive={Math.round(scrollOffset / CARD_HEIGHT) === index}
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
            paddingHorizontal: Platform.OS === "ios" ? "xl" : "lg",
            paddingBottom: Platform.OS === "ios" ? "xl" : "lg",
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

export default function CollectionEvaluationsView(props: NativeStackScreenProps<CollectionCreationStackParams, "collection-create-evaluations">) {
  return (
    <CollectionCreationLayout style={{ padding: 0 }}>
      <CollectionEvaluationsContent {...props} />
    </CollectionCreationLayout>
  );
}
