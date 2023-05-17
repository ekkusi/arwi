import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ApolloProvider from "./ApolloProvider";
import MainStack from "./containers/MainStack";
import { COLORS } from "./theme";

export default function App() {
  return (
    <ApolloProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor={COLORS.green} />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <MainStack />
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaView>
    </ApolloProvider>
  );
}
