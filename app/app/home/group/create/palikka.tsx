import Animated, { useAnimatedStyle, useDerivedValue } from "react-native-reanimated";
import { StyleProp, ViewStyle } from "react-native";
import CView from "../../../../components/primitives/CView";

export type PalikkaProps = { style: StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>> };
export default function Palikka({ style }: PalikkaProps) {
  return (
    <CView style={{ width: 100, height: 50, borderWidth: 1, borderColor: "black" }}>
      <Animated.View style={style} />
    </CView>
  );
}
