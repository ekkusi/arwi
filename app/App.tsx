import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ApolloProvider from "./ApolloProvider";
import LandingPage from "./containers/lander/LandingPage";
import LandingStack from "./containers/lander/LandingStack";
import MainStack from "./containers/MainStack";
import { COLORS } from "./theme";

export default function App() {
  const [teacherId, setTeacherId] = useState<string | undefined>(undefined);
  return (
    <ApolloProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor={COLORS.green} />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            {teacherId && <MainStack teacherId={teacherId} />}
            {!teacherId && <LandingStack setTeacherId={(newId: string) => setTeacherId(newId)} />}
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaView>
    </ApolloProvider>
  );
}
