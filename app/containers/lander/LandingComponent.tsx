/* eslint-disable global-require */
import { View } from "react-native";
import { COLORS } from "../../theme";

export default function LandingComponent({ bottomChildren, topChildren }: { bottomChildren?: JSX.Element; topChildren?: JSX.Element }) {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          borderBottomLeftRadius: 100,
          backgroundColor: COLORS.green,
          width: "100%",
        }}
      >
        {topChildren}
      </View>
      <View style={{ flex: 1, alignItems: "center", width: "100%", justifyContent: "center", gap: 10, backgroundColor: COLORS.white }}>
        <View style={{ position: "absolute", top: 0, right: 0, width: 100, height: 100, backgroundColor: COLORS.green }} />
        <View style={{ position: "absolute", top: 0, right: 0, width: 100, height: 100, backgroundColor: COLORS.white, borderTopRightRadius: 100 }} />
        {bottomChildren}
      </View>
    </View>
  );
}
