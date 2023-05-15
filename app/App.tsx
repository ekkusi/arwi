import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ApolloProvider from "./ApolloProvider";
import MainStack from "./containers/MainStack";

export default function App() {
  return (
    <ApolloProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </GestureHandlerRootView>
    </ApolloProvider>
  );
}
