import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import HomeStack from "./containers/home/HomeStack";
import ProfileStack from "./containers/profile/ProfileStack";
import DesignStack from "./containers/design/DesignStack";
import ApolloProvider from "./ApolloProvider";

const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    <ApolloProvider>
      <NavigationContainer>
        <BottomTab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              switch (route.name) {
                case "HomeStack":
                  return <MaterialCommunityIcon name="home-outline" size={size} color={color} />;
                case "ProfileStack":
                  return <MaterialCommunityIcon name="account-circle-outline" size={size} color={color} />;
                case "DesignStack":
                  return <MaterialCommunityIcon name="pencil-ruler" size={size} color={color} />;

                default:
                  return null;
              }
              // You can return any component that you like here!
            },
            tabBarActiveTintColor: "green",
            tabBarInactiveTintColor: "white",
            headerShown: false,
            tabBarStyle: { backgroundColor: "white" },
          })}
        >
          <BottomTab.Screen name="HomeStack" component={HomeStack} options={{ title: "Koti" }} />
          <BottomTab.Screen name="ProfileStack" component={ProfileStack} options={{ title: "Profiili" }} />
          <BottomTab.Screen name="DesignStack" component={DesignStack} options={{ title: "Design" }} />
        </BottomTab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
