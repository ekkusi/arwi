import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../theme";
import CTouchableOpacity from "./primitives/CTouchableOpacity";

export default function InfoButton({ size = 36, onPress }: { size?: number; onPress: () => void }) {
  return (
    <CTouchableOpacity
      onPress={onPress}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 1,
        borderColor: "darkgray",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icon name="information" size={20} color={COLORS.darkgray} />
    </CTouchableOpacity>
  );
}
