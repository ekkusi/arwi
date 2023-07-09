import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeView from ".";
import { formatDate } from "../../helpers/dateHelpers";
import { defaultHeaderStyles } from "../config";
import CollectionView from "./collection";
import CollectionCreation from "./collection/create";
import Evaluation from "./evaluation";
import GroupView from "./group";
import GroupCreationStack from "./group/create/_stack";
import StudentView from "./student";
import { HomeStackParams } from "./types";

const HomeStackNavigator = createNativeStackNavigator<HomeStackParams>();

export default function HomeStack() {
  return (
    <HomeStackNavigator.Navigator initialRouteName="index" screenOptions={defaultHeaderStyles}>
      <HomeStackNavigator.Screen name="index" component={HomeView} options={{ title: "Omat ryhmät" }} />
      <HomeStackNavigator.Screen name="group" component={GroupView} options={({ route }) => ({ title: route.params.name })} />
      <HomeStackNavigator.Screen name="student" component={StudentView} options={({ route }) => ({ title: route.params.name })} />
      <HomeStackNavigator.Screen
        name="collection"
        component={CollectionView}
        options={({ route }) => ({ title: `${formatDate(route.params.date)}: ${route.params.environmentLabel}` })}
      />
      <HomeStackNavigator.Screen name="group-create" component={GroupCreationStack} options={{ title: "Uusi ryhmä", headerShown: false }} />
      <HomeStackNavigator.Screen name="collectionCreation" component={CollectionCreation} options={{ title: "Uusi arviointi" }} />
      <HomeStackNavigator.Screen name="evaluation" component={Evaluation} options={{ title: "Uusi arviointi" }} />
    </HomeStackNavigator.Navigator>
  );
}
