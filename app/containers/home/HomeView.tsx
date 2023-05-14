import { useQuery } from "@apollo/client";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, Text, View } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import GroupListItem from "../../components/GroupListItem";
import LoadingIndicator from "../../components/LoadingIndicator";
import { graphql } from "../../gql";
import { Group, Teacher } from "../../mikanlelutyypit";
import { COLORS, FONT_SIZES } from "../../theme";
import { HomeStackParamList } from "./types";

const MainPage_GetTeacher_Query = graphql(`
  query MainPage_GetTeacher($teacherId: ID!) {
    getTeacher(id: $teacherId) {
      email
      id
      groups {
        id
        name
        subject {
          label
        }
      }
    }
  }
`);
//
// type MainPageProps = {
//  data: MainPage_GetTeacherQuery;
// };

const teacher: Teacher = {
  groups: [
    {
      id: "1",
      name: "8A",
      type: "liikunta",
    },
    {
      id: "2",
      name: "8A",
      type: "art",
    },
    {
      id: "3",
      name: "9A",
      type: "class",
    },
  ],
};

type HomeViewProps = NativeStackScreenProps<HomeStackParamList, "Home">;
const onGroupListItemPress = (group: Group, navigation: NativeStackNavigationProp<HomeStackParamList, "Home", undefined>) => {
  navigation.navigate("GroupView", { group });
};

// eslint-disable-next-line react/prop-types
export default function HomePage({ navigation }: HomeViewProps) {
  const { data, loading } = useQuery(MainPage_GetTeacher_Query, {
    variables: {
      teacherId: "357d5bd3-e865-48ee-b96d-acf36834c481",
    },
  });

  if (loading || !data) return <LoadingIndicator />;

  if (!teacher) throw new Error("Unexpected error, no teacher");

  return (
    <View style={{ flex: 1 }}>
      <Text>Kirjautunut käyttäjä: {data.getTeacher.email}</Text>
      <View style={{ height: 80, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontSize: FONT_SIZES.large }}>Omat ryhmät:</Text>
        <MaterialCommunityIcon name="plus-thick" size={20} color={COLORS.green} />
      </View>
      <FlatList
        data={teacher.groups}
        // eslint-disable-next-line react/no-unused-prop-types
        renderItem={({ item }: { item: Group }) => <GroupListItem group={item} onListItemPress={() => onGroupListItemPress(item, navigation)} />}
        keyExtractor={(group) => group.id}
      />
    </View>
    // <PageWrapper display="flex" flexDirection="column">
    //  <Box bg={`${DEFAULT_COLOR_SCHEME}.400`} boxShadow="lg" position="absolute" top="0" left="0" right="0" py="3">
    //    <Text as="h1" mb="0" fontSize="xl" fontStyle="italic" fontWeight="normal" textAlign="center" color="light-gray">
    //      ARWI
    //    </Text>
    //  </Box>
    //  <Flex mt="14" mb="2" justifyContent="space-between" alignItems="center">
    //    <Text as="h2" fontSize="lg" mb="0">
    //      Omat ryhmät:
    //    </Text>
    //    <IconButton
    //      variant="link"
    //      size="lg"
    //      as={Link}
    //      color={`${DEFAULT_COLOR_SCHEME}.500`}
    //      icon={<IoAddSharp />}
    //      href="/group/create"
    //      ml="auto"
    //      aria-label="Luo uusi luokka"
    //    />
    //  </Flex>
    //  {teacher.groups.length > 0 ? (
    //    <GroupList groups={teacher.groups} mb="5" />
    //  ) : (
    //    <>
    //      <Text mb="3" mt="5">
    //        Sinulla ei vielä ole ryhmiä
    //      </Text>
    //      <Button as={Link} href="/group/create" width="100%">
    //        Luo ensimmäinen ryhmä
    //      </Button>
    //    </>
    //  )}
    // </PageWrapper>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//  const session = await getServerSession(context.req, context.res, authOptions);
//  if (!session) throw new Error("Unexpected error, no session");
//
//  const data = await serverRequest(MainPage_GetTeacher_Query, {
//    teacherId: session.user.id,
//  });
//
//  // Pass data to the page via props
//  return { props: { data } };
// };
