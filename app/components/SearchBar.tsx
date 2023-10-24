import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInput } from "react-native";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useKeyboardListener } from "../hooks-and-providers/keyboardHooks";
import { COLORS } from "../theme";
import CView from "./primitives/CView";

const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcon);

export default function SearchBar({
  searchText,
  setSearchText,
  onChangeSearchState,
}: {
  searchText: string;
  setSearchText: (text: string) => void;
  onChangeSearchState: (open: boolean) => void;
}) {
  const { t } = useTranslation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [width, setWidth] = useState(48);
  const inputRef = useRef<TextInput>(null);

  const onHideKeyboard = useCallback(() => {
    if (searchText.length <= 0) {
      setSearchOpen(false);
      onChangeSearchState(false);
    }
    inputRef.current?.blur();
  }, [onChangeSearchState, searchText.length]);

  useKeyboardListener({
    onHide: onHideKeyboard,
  });
  const colorProgress = useDerivedValue(() => {
    return withTiming(searchOpen ? 1 : 0, { duration: 300 });
  });

  const iconAnimatedProps = useAnimatedProps(() => {
    const color = interpolateColor(colorProgress.value, [0, 1], [COLORS.white, COLORS.darkgray]);
    return { color };
  });

  const searchBarWidth = useSharedValue(48);
  const searchBarAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(colorProgress.value, [0, 1], [COLORS.primary, COLORS.white]);
    return {
      width: withTiming(searchBarWidth.value, { duration: 300, easing: Easing.inOut(Easing.ease) }),
      backgroundColor,
    };
  });
  useEffect(() => {
    if (width !== 0) {
      searchBarWidth.value = searchOpen ? width : 48;
    }
  }, [searchOpen, searchBarWidth, width]);

  return (
    <CView style={{ width: "100%", alignItems: "flex-end" }} onLayout={(ev) => setWidth(ev.nativeEvent.layout.width)} pointerEvents="box-none">
      <Animated.View style={[{ height: 48, borderRadius: 24, borderWidth: 1, borderColor: COLORS.gray, overflow: "hidden" }, searchBarAnimatedStyle]}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (inputRef.current) inputRef.current.focus();
            setSearchOpen(true);
            onChangeSearchState(true);
          }}
          disabled={searchOpen}
        >
          <CView pointerEvents={searchOpen ? undefined : "none"}>
            <TextInput
              ref={inputRef}
              showSoftInputOnFocus
              placeholder={t("find-by-name", "Etsi nimellä...")}
              onChange={(e) => setSearchText(e.nativeEvent.text)}
              onEndEditing={() => {
                if (searchText.length <= 0) setSearchOpen(false);
              }}
              style={{
                height: 48,
                width,
                paddingLeft: 48,
              }}
            />
            <CView style={{ position: "absolute", left: 0, width: 48, height: 48, justifyContent: "center", alignItems: "center" }}>
              <AnimatedIcon name="magnify" size={25} animatedProps={iconAnimatedProps} />
            </CView>
          </CView>
        </TouchableWithoutFeedback>
      </Animated.View>
    </CView>
  );
}
