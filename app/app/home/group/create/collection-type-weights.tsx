import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { runOnJS, useAnimatedStyle, useDerivedValue, useSharedValue } from "react-native-reanimated";
import { Alert, Dimensions } from "react-native";
import { ReText } from "react-native-redash";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CView from "../../../../components/primitives/CView";
import { useGroupCreationContext } from "./GroupCreationProvider";
import { GroupCreationStackParams } from "./types";
import GroupCreationBody, { SCROLL_TO_INPUT_EXTRA_HEIGHT } from "./_body";
import CText from "../../../../components/primitives/CText";
import CKeyboardAwareScrollView from "../../../../components/primitives/CKeyboardAwareScrollView";
import { COLORS, FONT_SIZES } from "../../../../theme";
import { Slider } from "../../../../components/Slider";
import CTouchableOpacity from "../../../../components/primitives/CTouchableOpacity";

const windowWidth = Dimensions.get("window").width;
const DEFAULT_SLIDER_HORIZONTAL_MARGIN = 10;
const DEFAULT_SLIDER_WIDTH = windowWidth - DEFAULT_SLIDER_HORIZONTAL_MARGIN * 2;
const SLIDER_MIN = 0;
const SLIDER_MAX = 100;

export default function GroupCollectionTypeWeightsView({
  navigation,
}: NativeStackScreenProps<GroupCreationStackParams, "group-create-collection-type-weights", "home-stack">) {
  const { t } = useTranslation();

  const { group, setGroup } = useGroupCreationContext();
  const isModified = useSharedValue<boolean[]>(group.collectionTypes.map((_) => false));
  const weights = useSharedValue<number[]>(group.collectionTypes.map((obj) => obj.weight));
  const [forwardDisabled, setForwardDisabled] = useState(false);
  const roundedWeights = useDerivedValue(() => {
    const newWeights = weights.value.map((val) => Math.round(val));
    const remainder = 100 - newWeights.reduce((prev, cur) => prev + cur, 0);
    const remainderIndex = isModified.value.findIndex((val) => !val);
    if (remainder !== 0) {
      newWeights[remainderIndex] += 1 * (remainder < 0 ? -1 : 1);
    }
    return newWeights;
  });
  const sum = useDerivedValue(() => roundedWeights.value.reduce((acc, curr) => acc + curr, 0));
  const translates = useDerivedValue(() =>
    roundedWeights.value.map((value) => ((value - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) * DEFAULT_SLIDER_WIDTH)
  );
  const [startTranslateValues, setStartTranslateValues] = useState(translates.value);

  const types = group.collectionTypes;

  const sumString = useDerivedValue(() => `${sum.value} %`);

  const changeWeightByOne = (increase: boolean, index: number) => {
    const newWeight = weights.value[index] + (increase ? 1 : -1);
    const newSum = onWeightChanged(newWeight, index);
    if (newSum && newSum === 100) {
      setForwardDisabled(false);
    } else {
      setForwardDisabled(true);
    }
    setStartTranslateValues(translates.value);
  };

  const onWeightChanged = (weight: number, index: number) => {
    "worklet";

    if (Number.isNaN(weight)) {
      return;
    }

    let residSum = 0;
    isModified.value.forEach((val, idx) => {
      if (!val && idx !== index) {
        residSum += weights.value[idx];
      }
    });
    const nonDirtyCount = isModified.value.filter((val, idx) => !val && idx !== index).length;
    const weightResid = weights.value[index] - weight;

    const newWeights = weights.value.map((val, idx) => {
      if (!isModified.value[idx] && residSum !== 0 && idx !== index) {
        const resVal = val + (1 / nonDirtyCount) * weightResid;
        if (resVal < 0) {
          return 0;
        }
        return resVal;
      }
      if (idx === index) {
        return weight;
      }
      return val;
    });

    const newIsModified = [...isModified.value];
    newIsModified[index] = true;
    isModified.value = newIsModified;

    weights.value = newWeights;

    return newWeights.reduce((acc, curr) => acc + curr, 0);
    // setGroup((prev) => ({ ...prev, collectionTypes: newTypes }));
  };
  const onEndDrag = () => {
    "worklet";

    if (sum.value === 100) {
      runOnJS(setForwardDisabled)(false);
    } else {
      runOnJS(setForwardDisabled)(true);
    }
    runOnJS(setStartTranslateValues)(translates.value);
  };

  const animatedColor = useDerivedValue(() => (sum.value !== 100 ? COLORS.error : COLORS.darkgray));

  const sumAnimatedStyle = useAnimatedStyle(() => {
    return {
      color: animatedColor.value,
      fontWeight: "500",
    };
  });

  const onMoveBack = () => {
    setGroup({
      ...group,
      collectionTypes: group.collectionTypes.map((item, i) => ({ category: item.category, name: item.name, weight: weights.value[i] })),
    });
    navigation.goBack();
  };

  const onMoveForward = () => {
    if (sum.value !== 100) {
      return;
    }

    setGroup({
      ...group,
      collectionTypes: group.collectionTypes.map((item, i) => ({ category: item.category, name: item.name, weight: weights.value[i] })),
    });
    navigation.navigate("group-create-students");
  };

  return (
    <GroupCreationBody
      navigation={navigation}
      progressState={4}
      moveForwardDisabled={forwardDisabled}
      onMoveBack={onMoveBack}
      onMoveForward={onMoveForward}
    >
      <CKeyboardAwareScrollView androidKeyboardAvoidProps={{ keyboardVerticalOffset: SCROLL_TO_INPUT_EXTRA_HEIGHT }}>
        <CView style={{ gap: "xl" }}>
          <CText style={{ fontSize: "title" }}>{t("select-collection-type-weights", "Valitse arviointikohteiden painoarvot")}</CText>
          <CView>
            {types.map((type, index) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const thumbAnimatedStyle = useAnimatedStyle(() => {
                return {
                  transform: [{ translateX: translates.value[index] }],
                };
              });

              // eslint-disable-next-line react-hooks/rules-of-hooks
              const maxTrackAnimatedStyle = useAnimatedStyle(() => {
                return {
                  width: translates.value[index],
                };
              });

              // eslint-disable-next-line react-hooks/rules-of-hooks
              const weightString = useDerivedValue(() => `${roundedWeights.value[index].toString()} %`);

              return (
                <CView key={`${type.category}-${index}`}>
                  <CView style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <CText style={{ fontSize: "sm", fontWeight: "500" }}>{type.name}</CText>
                    <CView style={{ gap: 2, alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                      <CTouchableOpacity onPress={() => changeWeightByOne(false, index)}>
                        <CView style={{ width: 30, height: 30, justifyContent: "center", alignItems: "center" }}>
                          <MaterialCommunityIcon name="minus" size={25} color={COLORS.primary} />
                        </CView>
                      </CTouchableOpacity>
                      <ReText style={{ fontWeight: "500", fontSize: FONT_SIZES.sm }} text={weightString} />
                      <CTouchableOpacity onPress={() => changeWeightByOne(true, index)}>
                        <CView style={{ width: 30, height: 30, justifyContent: "center", alignItems: "center" }}>
                          <MaterialCommunityIcon name="plus" size={25} color={COLORS.primary} />
                        </CView>
                      </CTouchableOpacity>
                    </CView>
                  </CView>
                  <Slider
                    minValue={0}
                    maxValue={100}
                    step={1}
                    initialTranslateX={startTranslateValues[index]}
                    thumbAnimatedStyle={thumbAnimatedStyle}
                    maxTrackAnimatedStyle={maxTrackAnimatedStyle}
                    onUpdate={(value) => {
                      "worklet";

                      onWeightChanged(value, index);
                    }}
                    onEnd={onEndDrag}
                  />
                </CView>
              );
            })}
          </CView>
          <CView style={{ width: "100%", flexDirection: "row", marginTop: "lg" }}>
            <CText style={{ color: "darkgray", fontWeight: "300", flex: 1 }}>{t("total", "Yhteensä")}</CText>
            <ReText style={[sumAnimatedStyle]} text={sumString} />
          </CView>
        </CView>
      </CKeyboardAwareScrollView>
    </GroupCreationBody>
  );
}
