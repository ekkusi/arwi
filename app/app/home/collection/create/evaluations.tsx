import { useMutation } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardEventListener, Platform } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import PagerView, { PagerViewOnPageSelectedEvent } from "react-native-pager-view";
import CButton from "../../../../components/primitives/CButton";
import CView from "../../../../components/primitives/CView";
import { CARD_HEIGHT, CreateClassParticipationEvaluationCardMemoed, Evaluation } from "../../../../components/ClassParticipationEvaluationCard";
import { graphql } from "@/graphql";
import { formatDate } from "../../../../helpers/dateHelpers";
import { getErrorMessage } from "../../../../helpers/errorUtils";
import { useKeyboardListener } from "../../../../hooks-and-providers/keyboard";
import { useToast } from "../../../../hooks-and-providers/ToastProvider";
import { COLORS } from "../../../../theme";
import { useCollectionCreationContext } from "./CollectionCreationProvider";
import { CollectionCreationStackParams } from "./types";
import CollectionCreationLayout from "./_layout";
import LazyLoadView from "../../../../components/LazyLoadView";
import {
  ClassParticipationCollectionUpdate_GeneralInfoFull_Fragment,
  ClassParticipationEvaluationUpdate_Info_Fragment,
  CollectionModuleCacheUpdate_Fragment,
} from "@/helpers/graphql/fragments";

const CollectionEvaluationsView_CreateCollection_Mutation = graphql(
  `
    mutation CollectionEvaluationsView_CreateCollection($createCollectionInput: CreateClassParticipationCollectionInput!, $moduleId: ID!) {
      createClassParticipationCollection(data: $createCollectionInput, moduleId: $moduleId) {
        ...ClassParticipationCollectionUpdate_GeneralInfoFull
        evaluations {
          ...ClassParticipationEvaluationUpdate_Info
          student {
            id
            currentModuleEvaluations {
              id
            }
          }
        }
        module {
          ...CollectionModuleCacheUpdate
        }
      }
    }
  `,
  [
    ClassParticipationCollectionUpdate_GeneralInfoFull_Fragment,
    CollectionModuleCacheUpdate_Fragment,
    ClassParticipationEvaluationUpdate_Info_Fragment,
  ]
);

function CollectionEvaluationsContent({ navigation }: NativeStackScreenProps<CollectionCreationStackParams, "collection-create-evaluations">) {
  const { t } = useTranslation();
  const { openToast } = useToast();
  const [createCollection] = useMutation(CollectionEvaluationsView_CreateCollection_Mutation);
  const pagerRef = useRef<PagerView>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const { generalData, collectionType, evaluations, groupInfo, setEvaluations } = useCollectionCreationContext();

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
    const { environmentCode, ...rest } = generalData;
    if (!environmentCode) throw new Error("Environment code or collection type id is missing, shouldn't happen at this point");

    try {
      await createCollection({
        variables: {
          moduleId: groupInfo.currentModule.id,
          createCollectionInput: {
            ...rest,
            environmentCode,
            date: formatDate(generalData.date, "yyyy-MM-dd"),
            typeId: collectionType.id,
            evaluations: evaluations.map((it) => ({
              wasPresent: it.wasPresent,
              skillsRating: it.skillsRating,
              behaviourRating: it.behaviourRating,
              notes: it.notes,
              studentId: it.student.id,
            })),
          },
        },
      });
      navigation.getParent()?.goBack();
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
        {presentEvaluations?.map((evaluation, index) => {
          return (
            <LazyLoadView key={evaluation.student.id} currentIndex={currentIndex} index={index} style={{ flex: 1 }}>
              <CreateClassParticipationEvaluationCardMemoed
                evaluation={evaluation}
                onChanged={onEvaluationChanged}
                height={CARD_HEIGHT}
                hasArrowDown={index < presentEvaluations.length - 1}
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
