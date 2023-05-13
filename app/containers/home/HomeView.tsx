import { Text, View } from "react-native";
import { useQuery } from "@apollo/client";
import { graphql } from "../../gql";

const MainPage_GetTeacher_Query = graphql(`
  query MainPage_GetTeacher($teacherId: ID!) {
    getTeacher(id: $teacherId) {
      email
      id
      groups {
        id
      }
    }
  }
`);

export default function HomeView() {
  const { data, loading } = useQuery(MainPage_GetTeacher_Query, {
    variables: {
      teacherId: "357d5bd3-e865-48ee-b96d-acf36834c481",
    },
  });

  if (loading || !data) return <Text>Ladataan...</Text>;

  const { getTeacher: teacher } = data;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Koti</Text>
      <Text>Kirjautunut käyttäjä: {teacher.email}</Text>
    </View>
  );
}
