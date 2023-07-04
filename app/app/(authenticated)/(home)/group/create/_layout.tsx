import { Stack } from "expo-router";

export default function GroupCreationStack() {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        headerShown: false,
      }}
    />
  );
}
