import { useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getEnvironment, getLearningObjectives } from "arwi-backend/src/utils/subjectUtils";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Select from "../../../components/Select";
import LoadingIndicator from "../../../components/LoadingIndicator";
import CText from "../../../components/primitives/CText";
import CView from "../../../components/primitives/CView";
import { getFragmentData, graphql } from "../../../gql";
import { HomeStackParams } from "../types";
import { COLORS } from "../../../theme";

const UpdateCollectionForm_Group_Fragment = graphql(`
  fragment UpdateCollectionForm_Group on Group {
    subject {
      code
    }
    currentClassYear {
      info {
        code
      }
    }
    students {
      id
      name
    }
  }
`);

const CreateCollectionPage_GetGroup_Query = graphql(`
  query CreateCollectionPage_GetGroup($groupId: ID!) {
    getGroup(id: $groupId) {
      id
      currentClassYear {
        id
      }
      ...UpdateCollectionForm_Group
    }
  }
`);

const CreateCollectionPage_CreateCollection_Mutation = graphql(`
  mutation CreateCollectionPage_CreateCollection($createCollectionInput: CreateCollectionInput!, $classYearId: ID!) {
    createCollection(data: $createCollectionInput, classYearId: $classYearId) {
      id
    }
  }
`);

export default function CollectionCreation({ navigation, route }: NativeStackScreenProps<HomeStackParams, "collectionCreation">) {
  const { id } = route.params;
  const { data, loading } = useQuery(CreateCollectionPage_GetGroup_Query, {
    variables: {
      groupId: id,
    },
  });

  const [date, setDate] = useState(new Date());
  const [isDateOpen, setIsDateOpen] = useState(false);

  if (loading || !data) return <LoadingIndicator />;

  const group = getFragmentData(UpdateCollectionForm_Group_Fragment, data.getGroup);

  const learningObjectives = getLearningObjectives(group.subject.code, group.currentClassYear.info.code);

  return (
    <CView style={{ flex: 1, paddingHorizontal: 10, paddingTop: 20, gap: 20 }}>
      <Select title="Ympäristö" options={[]} />
      <Select title="Oppimistavoitteet" options={learningObjectives.map((obj) => obj.label)} />
      <TouchableOpacity
        style={{ width: "100%", height: 60, borderBottomWidth: 1, borderBottomColor: "darkgray" }}
        onPress={() => setIsDateOpen(true)}
      >
        <CText>{date.toDateString()}</CText>
      </TouchableOpacity>
      {isDateOpen && (
        <DateTimePicker
          textColor={COLORS.primary}
          value={date}
          onChange={(_, newDate) => {
            setIsDateOpen(false);
            if (newDate) setDate(newDate);
          }}
        />
      )}
    </CView>
  );
}
